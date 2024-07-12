
import { ARButton } from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';
    
let camera, scene, renderer;
let loader; // we need to create a variable for a gltf model loader

init();
animate();

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true; // we have to enable the renderer for webxr
    container.appendChild(renderer.domElement);

    var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

// specify a model URL
const modelUrl = 'https://raw.githubusercontent.com/immersive-web/webxr-samples/main/media/gltf/space/space.gltf';

    // create a GLTF loader object. GLTF is a 3D model format usually called the "JPEG of 3D" because it is
// fast and efficient to use, which is ideal for the web
    loader = new THREE.GLTFLoader();

// learn about other types of 3D model formats you can use here: 
// https://threejs.org/docs/#manual/en/introduction/Loading-3D-models

// load the model
// loader takes in a few arguments loader(model url, onLoad callback, onProgress callback, onError callback)
    loader.load(
        // model URL
        modelUrl,
        // onLoad callback: what get's called once the full model has loaded
        function (gltf) {
  // gltf.scene contains the Three.js object group that represents the 3d object of the model
            scene.add(gltf.scene);
  console.log("Model added to scene");
  
  // you can optionally change the position of the model
  // gltf.scene.position.z = -10; // negative Z moves the model in the opposite direction the camera is facing
  // gltf.scene.position.y = 5; // positive Y moves the model up
  // gltf.scene.position.x = 10; // positive X moves hte model to the right
        },
        // onProgress callback: optional function for showing progress on model load
        function (xhr) {
      // console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
  },
        // onError callback
        function (error) {
            console.error(error);
        }
    );

    document.body.appendChild(ARButton.createButton(renderer));

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
}
