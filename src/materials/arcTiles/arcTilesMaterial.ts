import { createMaterial } from 'materials/createMaterial';

import aoMap from './textures/Arc_Pavement_001_ambientOcclusion.jpg';
import diffuseMap from './textures/Arc_Pavement_001_basecolor.jpg';
import displacementMap from './textures/Arc_Pavement_001_height.png';
import normalMap from './textures/Arc_Pavement_001_normal.jpg';
import roughnessMap from './textures/Arc_Pavement_001_roughness.jpg';

export const arcTilesMaterial = createMaterial({
  mapSrc: diffuseMap,
  normalMapSrc: normalMap,
  displacementMapSrc: displacementMap,
  displacementScale: 0.05,
  displacementBias: -0.03,
  roughnessMapSrc: roughnessMap,
  roughness: 0.75,
  aoMapSrc: aoMap,
  tileX: 2,
  tileY: 2,
});