import { createMaterial } from 'materials/createMaterial';

import aoMap from './textures/cobblestone_floor_04_ao_2k.jpg';
import diffuseMap from './textures/cobblestone_floor_04_diff_2k.png';
import displacementMap from './textures/cobblestone_floor_04_disp_2k.png';
import normalMap from './textures/cobblestone_floor_04_nor_gl_2k.png';
import roughnessMap from './textures/cobblestone_floor_04_rough_2k.jpg';

export const cobblestoneMaterial = createMaterial({
  mapSrc: diffuseMap,
  normalMapSrc: normalMap,
  displacementMapSrc: displacementMap,
  displacementScale: 0.075,
  displacementBias: -0.03,
  roughnessMapSrc: roughnessMap,
  roughness: 0.8,
  aoMapSrc: aoMap,
  tileX: 2,
  tileY: 2,
});