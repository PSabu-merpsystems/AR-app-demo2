
import { ARButton } from "https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js";
// import threeLoaders from 'https://cdn.jsdelivr.net/npm/three-loaders@1.0.9/+esm'
// import threeObjLoader from "https://cdn.jsdelivr.net/npm/three-obj-loader@1.1.3/+esm";
// import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three-gltf-loader@1.111.0/index.min.js';


import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/loaders/GLTFLoader.js';



console.log(ARButton);

let camera, scene, renderer, mesh;
let loader; // we need to create a variable for a gltf model loader


init();
animate();
// -----------------------------------------------------------------------init function Created----------------------------------------------------------------------------------------------------------------------------------------------------
function init() {
    // Add child to the DOM ......................................................................
    const container = document.createElement("div");
    document.body.appendChild(container);

    // Create a scene ............................................................................
    scene = new THREE.Scene();

    // Create a Camera ...........................................................................
    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        40
    );

    // Render webGL ..............................................................................
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Enable WebAR...............................................................................
    // This next line is important to to enable the renderer for WebXR
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    // Add light .................................................................................
    var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    // Add model (Icosahedron)....................................................................
    //   const geometry = new THREE.IcosahedronGeometry(0.1, 1);
    //   const material = new THREE.MeshPhongMaterial({
    //     color: new THREE.Color("rgb(2, 245, 15)"),
    //     shininess: 6,
    //     flatShading: true,
    //     transparent: 1,
    //     opacity: 0.8,
    //   });

    // mesh = new THREE.Mesh(geometry, material);
    // mesh.position.set(0, 0, -0.5);
    // scene.add(mesh);

    // Add AR Button .............................................................................
    document.body.appendChild(ARButton.createButton(renderer));
    window.addEventListener("resize", onWindowResize, false);

    // Add Custom model...........................................................................
    // glTF model........
    const modelURL =
        "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Sponza/glTF/Sponza.gltf";

    // loader object - GLTF Loader object
    loader = new GLTFLoader();
    console.log(loader);


    // loader 
    // loader(modelURL, onLoad callback, onProgress callback, onError callback)

    loader.load(
        modelURL,
        function (gltf) {
            console.log(gltf);
            const model = gltf.scene;
            console.log(model);
            scene.add(model)


        },
        function (event) {
            console.log(event);
        },
        function (error) {
            console.log(error);
        }
    );

}

//  Windo Resize  function --------------------------------------------------------------------------------------------------------------------------------------------
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation ----------------------------------------------------------------------------------------------------------------------------------------------------------
function animate() {
    renderer.setAnimationLoop(render);
}

// Render --------------------------------------------------------------------------------------------------------------------------------------------------------------
function render() {
    renderer.render(scene, camera);
}

console.log("All okey, till here ............  :)");
