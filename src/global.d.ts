// Declare vendor modules without types
declare module 'three/examples/jsm/libs/lil-gui.module.min.js';
declare module 'three/examples/jsm/textures/FlakesTexture';

/** 
 * Sets .glsl files to be typed as strings.
 */
declare module '*.gltf' {
  const content: string;
  export default content;
}

/** 
 * Sets .txt files to be typed as strings.
 */
declare module '*.txt' {
  const content: string;
  export default content;
}

/** 
 * Sets .jpg files to be typed as strings.
 */
declare module '*.jpg' {
  const content: string;
  export default content;
}

/** 
 * Sets .png files to be typed as strings.
 */
declare module '*.png' {
  const content: string;
  export default content;
}

/** 
 * Sets .hdr files to be typed as strings.
 */
declare module '*.hdr' {
  const content: string;
  export default content;
}