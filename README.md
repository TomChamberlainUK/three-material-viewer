# Material Viewer

A simple application to view different materials and geometries in a basic THREE.js scene.

## Demonstration

> Please note that this is really poorly optimised and is not recommended for use on devices with limited bandwidth. Skybox textures are at 4k and material textures at 2k. This is not considered a practical web application and more a demonstration of what can be achieved on a browser when pushing the limits. Textures and geometry are not loaded asynchronously and so initial loading times can be really tedious.

Please read the above warning before visiting the page. This application is available to view [here](https://tomchamberlainuk.github.io/three-material-viewer/).

## Get Started

### Installation

> Ensure Node.js and npm are installed

Download or clone the repository, navigate to the root directory via the command line then enter:

```npm i```

npm will install all required dependencies

### Commands

#### Serve (with live update)

Navigate to the root directory then enter:

```npm run start```

Webpack will serve the files locally on port **8080**.

#### Build

Navigate to the root directory then enter:

```npm run build```

Webpack will build the files to `/dist/`.

#### Watch

Navigate to the root directory then enter:

```npm run watch```

Webpack will build the files to `/dist/`, and update on any changes.

## Credit

[THREE.js](https://threejs.org/)