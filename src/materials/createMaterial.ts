import * as THREE from 'three';

export function createMaterial({
  mapSrc,
  normalMapSrc,
  displacementMapSrc,
  displacementScale,
  displacementBias,
  roughnessMapSrc,
  roughness,
  aoMapSrc,
  bumpMapSrc,
  tileX = 1,
  tileY = 1
} : {
  mapSrc?: string,
  normalMapSrc?: string,
  displacementMapSrc?: string,
  displacementScale?: number,
  displacementBias?: number,
  roughnessMapSrc?: string,
  roughness?: number,
  aoMapSrc?: string,
  bumpMapSrc?: string,
  tileX?: number,
  tileY?: number,
}) {
  const loader = new THREE.TextureLoader();
  let map, normalMap, displacementMap, roughnessMap, aoMap, bumpMap;
  if (mapSrc) {
    map = loader.load(mapSrc);
    map.encoding = THREE.sRGBEncoding;
    tileTexture(map, tileX, tileY);
  }
  if (normalMapSrc) {
    normalMap = loader.load(normalMapSrc);
    tileTexture(normalMap, tileX, tileY);
  }
  if (displacementMapSrc) {
    displacementMap = loader.load(displacementMapSrc);
    tileTexture(displacementMap, tileX, tileY);
  }
  if (roughnessMapSrc) {
    roughnessMap = loader.load(roughnessMapSrc);
    tileTexture(roughnessMap, tileX, tileY);
  }
  if (aoMapSrc) {
    aoMap = loader.load(aoMapSrc);
    tileTexture(aoMap, tileX, tileY);
  }
  if (bumpMapSrc) {
    bumpMap = loader.load(bumpMapSrc);
    tileTexture(bumpMap, tileX, tileY);
  }
  const material = new THREE.MeshPhysicalMaterial({
    map,
    normalMap,
    displacementMap,
    displacementScale,
    displacementBias,
    roughnessMap,
    roughness,
    aoMap,
    bumpMap
  });
  return material;
}

function tileTexture(texture: THREE.Texture, x: number, y: number) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(x, y);
}