import './styles.css';
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture';

// Skybox textures
import parkSrc from 'images/lilienstein_4k.hdr';
import gardenSrc from 'images/chinese_garden_4k.hdr';

// Materials
import { arcTilesMaterial } from 'materials/arcTiles/arcTilesMaterial';
import { smoothTilesMaterial } from 'materials/smoothTiles/smoothTilesMaterial';
import { cobblestoneMaterial } from 'materials/cobblestone/cobblestoneMaterial';


// loading manager
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log('Loading skybox textures.');
};
loadingManager.onLoad = () => {
  console.log('Skybox textures loaded.');
  animate();
}


// Prepare renderer
const canvas = document.querySelector('#js-canvas') as HTMLCanvasElement;
const pixelRatio = window.devicePixelRatio; // To convert css pixels to screen pixels
// const pixelRatio = 0.25;
const renderer = new THREE.WebGLRenderer({
  canvas,
  // antialias: true,
  powerPreference: 'high-performance'
});
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.setSize(
  Math.floor(canvas.clientWidth * pixelRatio),
  Math.floor(canvas.clientHeight * pixelRatio),
  false
);


// Prepare loaders
const rgbeLoader = new RGBELoader(loadingManager);

// Prepare scene
const scene = new THREE.Scene();

// Prepare camera
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
camera.position.z = 3;

// Prepare controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.enablePan = false;
controls.enableDamping = true;

// For skybox and environment maps
const dataTextures = {
  park: rgbeLoader.load(parkSrc, (dataTexture: THREE.DataTexture) => loadSceneTexture(dataTexture)),
  garden: rgbeLoader.load(gardenSrc, undefined)
}

// Prepare a texture for a custom normal map
const flakesTexture = new THREE.CanvasTexture(new FlakesTexture());
flakesTexture.wrapS = THREE.RepeatWrapping;
flakesTexture.wrapT = THREE.RepeatWrapping;
flakesTexture.repeat.x = 10;
flakesTexture.repeat.y = 6;

// Init materials
const materials = {

  // From texture maps
  arcTiles: arcTilesMaterial,
  smoothTiles: smoothTilesMaterial,
  cobblestone: cobblestoneMaterial,

  // Custom
  cool: new THREE.MeshPhysicalMaterial({
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    metalness: 0.9,
    roughness: 0.5,
    color: 0x3264ca,
    // color: 0x8418ca,
    normalMap: flakesTexture,
    normalScale: new THREE.Vector2(0.15, 0.15)
  }),

  glass: new THREE.MeshPhysicalMaterial({
    transmission: 1,
    roughness: 0.1,
  }),

  chrome: new THREE.MeshPhysicalMaterial({
    roughness: 0,
    metalness: 0.9,
  })

}

// Init geometry
const geometry = {
  sphere: new THREE.SphereGeometry(1, 256, 256),
  box: new THREE.BoxGeometry(2, 2, 2, 128, 128, 128),
  cone: new THREE.ConeGeometry(0.5, 1, 16),
  cylinder: new THREE.CylinderBufferGeometry(1, 1, 1, 16),
  dodecahedron: new THREE.DodecahedronBufferGeometry(),
  torus: new THREE.TorusGeometry(1, 0.5, 32, 64),
  knot: new THREE.TorusKnotGeometry(1, 0.4, 128, 64),
}

// Add a mesh into the scene
const mesh = new THREE.Mesh(geometry.sphere, materials.cobblestone);
scene.add(mesh);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  resizeCanvasToDisplaySize();
  controls.update();
  renderer.render(scene, camera);
}

// animate();


// Helpers

function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (canvas.width !== width || canvas.height !== height) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(
      Math.floor(width * pixelRatio),
      Math.floor(height * pixelRatio),
      false
    );
  }
}

function loadSceneTexture(dataTexture: any) {

  // Init background texture
  const renderTarget = new THREE.WebGLCubeRenderTarget(dataTexture.image.height);
  renderTarget.fromEquirectangularTexture(renderer, dataTexture);

  // Init environment map texture
  const envMap = new THREE.PMREMGenerator(renderer).fromEquirectangular(dataTexture);

  // Set scene properties
  scene.background = renderTarget.texture;
  scene.environment = envMap.texture;

}

{
  // Add GUI controls for mesh
  const gui = new GUI();
  gui.title('Scene controls');
  {
    // Mesh
    const meshFolder = gui.addFolder('Mesh');
    meshFolder.add(mesh, 'material', materials)
              .onChange((material: THREE.MeshPhysicalMaterial) => mesh.material = material);
    meshFolder.add(mesh, 'geometry', geometry)
              .onChange((geometry: any) => mesh.geometry = geometry);
  }
  {
    // Scene
    const sceneFolder = gui.addFolder('Scene');
    sceneFolder.add({ current: 'park' }, 'current', dataTextures)
               .onChange((dataTexture: THREE.DataTexture) => loadSceneTexture(dataTexture));
  }
  gui.add({reset: () => gui.reset()}, 'reset').name('Restore Default');
  gui.close();
  gui.foldersRecursive().forEach((folder: any) => folder.close());
}