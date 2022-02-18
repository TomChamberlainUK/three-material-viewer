import { createMaterial } from 'materials/createMaterial';

import aoMap from './textures/floor_tiles_04_ao_2k.jpg';
import bumpMap from './textures/floor_tiles_04_bump_2k.jpg';
import diffuseMap from './textures/floor_tiles_04_diff_2k.png';
import displacementMap from './textures/floor_tiles_04_disp_2k.jpg';
import normalMap from './textures/floor_tiles_04_nor_gl_2k.jpg';
import roughnessMap from './textures/floor_tiles_04_rough_2k.jpg';

export const smoothTilesMaterial = createMaterial({
  mapSrc: diffuseMap,
  normalMapSrc: normalMap,
  displacementMapSrc: displacementMap,
  displacementScale: 0.01,
  displacementBias: -0.005,
  roughnessMapSrc: roughnessMap,
  roughness: 0.75,
  aoMapSrc: aoMap,
  bumpMapSrc: bumpMap,
  tileX: 8,
  tileY: 8,
});