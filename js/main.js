import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import { GLTFLoader } from './GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
let stars, starGeo;

lighting();
particles();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 6400);
camera.position.set( 2000, 1000, -800); // Adjusted camera position

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x2a2a35);
document.body.appendChild(renderer.domElement);

//Create Particle
function particles() {
    const points = [];
  
    for (let i = 0; i < 10000; i++) {
      let star = new THREE.Vector3(
        Math.random() * 6400 - 4000,
        Math.random() * 6400 - 4000,
        Math.random() * 6400 - 4000
      );
      points.push(star);
    }
  
    starGeo = new THREE.BufferGeometry().setFromPoints(points);
  
    let sprite = new THREE.TextureLoader().load("Assets/Texture/star.png");
    let starMaterial = new THREE.PointsMaterial({
      color: 352628,
      size: 4,
      map: sprite,
    });
  
    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);
    
  }

// Create textures
const floorTexture = new THREE.TextureLoader().load('Assets/Texture/floor.jpg');
const wallTexture = new THREE.TextureLoader().load('Assets/Texture/floor.jpg');
const doorTexture = new THREE.TextureLoader().load('Assets/Texture/Wall-Door.png');
const pillarTexture = new THREE.TextureLoader().load('Assets/Texture/pillar.jpg');
const stageTexture = new THREE.TextureLoader().load('Assets/Texture/stage.jpg');
  
// Add lights

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(1, 1, 1).normalize(); // Normalize directional light position
scene.add(directionalLight);

// Create and add a light source within the lamp model
const lampLight = new THREE.PointLight(0xffffff, 1.5, 100); // Adjust light parameters as needed
lampLight.position.set(100, 370, 720); // Adjust light position relative to the lamp model


// Lighting for particle
function lighting() {
    const light = new THREE.HemisphereLight(0xffffff, 0x1c3020, 1);
    scene.add(light);


  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(0, 0, 15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;
  scene.add(spotLight);
}
 
// Animate Particle
function animateParticles() {
    starGeo.verticesNeedUpdate = true;
    stars.position.y -= 1;

    if(stars.position.y < -300) {
      stars.position.y = 100;
    }
  }

// Create floor
const floorGeometry = new THREE.BoxGeometry(3000, 800, 50);
const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat
scene.add(floorMesh);


// Create walls
const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });

// Middle wall
const middleWallGeometry = new THREE.BoxGeometry(3000, 800, 90);
const middleWallMesh = new THREE.Mesh(middleWallGeometry, wallMaterial);
middleWallMesh.position.set(0, 374, 445);
scene.add(middleWallMesh);

//Window Like Door
const doorGeometry = new THREE.BoxGeometry(80, 40, 20);
const doorMaterial = new THREE.MeshStandardMaterial({ map: doorTexture });
const doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);
doorMesh.position.set(270, 84, 409);
scene.add(doorMesh);

//Mini Stage
const miniStageGeometry = new THREE.BoxGeometry(90, 40, 10);
const miniStageMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
const miniStageMesh = new THREE.Mesh(miniStageGeometry, miniStageMaterial);
miniStageMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat
miniStageMesh.position.set(270, 24, 380);
scene.add(miniStageMesh);

//First Pillar
const firstPillargeometry = new THREE.CylinderGeometry(120, 50, 778, 3, undefined, false, .8, 4.8003535746852); 
const firstPillarmaterial = new THREE.MeshBasicMaterial({ map: pillarTexture });
const firstPillarMesh = new THREE.Mesh(firstPillargeometry, firstPillarmaterial);

// Position the pillar
firstPillarMesh.position.set(1390, 374, 385);

// Rotate the pillar to face the wall
firstPillarMesh.rotation.x = Math.PI / 1; // Rotate 90 degrees around the x-axis
firstPillarMesh.rotation.y = Math.PI;
scene.add(firstPillarMesh);

//Second Pillar
const secondpillargeometry = new THREE.CylinderGeometry(120, 50, 778, 3, undefined, false, .8, 4.8003535746852); 
const secondpillarmaterial = new THREE.MeshBasicMaterial({ map: pillarTexture });
const secondpillarMesh = new THREE.Mesh(secondpillargeometry, secondpillarmaterial);

// Position the pillar
secondpillarMesh.position.set(550, 374, 385);

// Rotate the pillar to face the wall
secondpillarMesh.rotation.x = Math.PI / 1; // Rotate 90 degrees around the x-axis
secondpillarMesh.rotation.y = Math.PI;
scene.add(secondpillarMesh);

//Third Pillar
const thirdpillargeometry = new THREE.CylinderGeometry(120, 50, 778, 3, undefined, false, .8, 4.8003535746852); 
const thirdpillarmaterial = new THREE.MeshBasicMaterial({ map: pillarTexture });
const thirdpillarMesh = new THREE.Mesh(thirdpillargeometry, thirdpillarmaterial);

// Position the pillar
thirdpillarMesh.position.set(-550, 374, 385);

// Rotate the pillar to face the wall
thirdpillarMesh.rotation.x = Math.PI / 1; // Rotate 90 degrees around the x-axis
thirdpillarMesh.rotation.y = Math.PI;
scene.add(thirdpillarMesh);

//Fourth Pillar
const fourthpillargeometry = new THREE.CylinderGeometry(120, 50, 778, 3, undefined, false, .8, 4.8003535746852); 
const fourthpillarmaterial = new THREE.MeshBasicMaterial({ map: pillarTexture });
const fourthpillarMesh = new THREE.Mesh(fourthpillargeometry, fourthpillarmaterial);

// Position the pillar
fourthpillarMesh.position.set(-1390, 374, 385);

// Rotate the pillar to face the wall
fourthpillarMesh.rotation.x = Math.PI / 1; // Rotate 90 degrees around the x-axis
fourthpillarMesh.rotation.y = Math.PI;
scene.add(fourthpillarMesh);


// Create Stage
const stageGeometry = new THREE.BoxGeometry(200, 240, 30);
const stageMaterial = new THREE.MeshStandardMaterial({ map: stageTexture });
const stageMesh = new THREE.Mesh(stageGeometry, stageMaterial);
stageMesh .position.set(-220, 23, -235);
stageMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat
scene.add(stageMesh);

// Create Stair
const stairGeometry = new THREE.BoxGeometry(30, 70, 30);
const stairMaterial = new THREE.MeshStandardMaterial({ map: stageTexture });
const stairMesh = new THREE.Mesh(stairGeometry, stairMaterial);
stairMesh .position.set(-105, 23, -320);
stairMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat
scene.add(stairMesh);

// Create First Riser
const firstRiserGeometry = new THREE.BoxGeometry(30, 10, 30);
const firstRiserMaterial = new THREE.MeshStandardMaterial({ map: stageTexture });
const firstRiserMesh = new THREE.Mesh(firstRiserGeometry, firstRiserMaterial);
firstRiserMesh .position.set(-105, 20, -280);
firstRiserMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat
scene.add(firstRiserMesh);

// Create Second Riser
const secondRiserGeometry = new THREE.BoxGeometry(30, 10, 30);
const secondRiserMaterial = new THREE.MeshStandardMaterial({ map: stageTexture });
const secondRiserMesh = new THREE.Mesh(secondRiserGeometry, secondRiserMaterial);
secondRiserMesh .position.set(-105, 17, -270);
secondRiserMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat
scene.add(secondRiserMesh);

//Create Wall 

// Create 3D Model Character
const stageLoader = new GLTFLoader();

stageLoader.load( 'Assets/model/character/scene.gltf', function ( gltf )  {
    const character = gltf.scene;
    character.scale.set(3, 3, 3); // Adjust scale as needed
    character.position.set(-100, 22, -120);

	scene.add( gltf.scene );

});

stageLoader.load( 'Assets/model/character/scene.gltf', function ( gltf )  {
    const character = gltf.scene;
    character.scale.set(3, 3, 3); // Adjust scale as needed
    character.position.set(100, 22, 100);
    character.rotation.set(0, 0.5, 0)
    
	scene.add( gltf.scene );

});

// Create 3D Model Ship
const shipLoader = new GLTFLoader();

shipLoader.load( 'Assets/model/ship/scene.gltf', function ( gltf )  {
    const object = gltf.scene;
    object.scale.set(1.8, 1.5, 1.8); // Adjust scale as needed
    object.position.set(-230, 65, -150);

	scene.add( gltf.scene );

});

// Create 3D Model Ship
const metalBarLoader = new GLTFLoader();

metalBarLoader.load( 'Assets/model/bar/scene.gltf', function ( gltf )  {
    const object = gltf.scene;
    object.scale.set(55, 40, 30); // Adjust scale as needed
    object.position.set(50, 15, -780);

	scene.add( gltf.scene );

});

// Create 3D Model crate
const crateLoader = new GLTFLoader();

crateLoader.load( 'Assets/model/crate/scene.gltf', function ( gltf )  {
    const object = gltf.scene;
    object.scale.set(31, 30, 20); // Adjust scale as needed
    object.position.set(-100, 35, -80);

	scene.add( gltf.scene );

});

// Create 3D Model Lamps
const lampLoader = new GLTFLoader();

lampLoader.load( 'Assets/model/light/scene.gltf', function ( gltf )  {
    const lampModel = gltf.scene;

    // Adjust scale as needed
    lampModel.scale.set(25, 30, 20);

    // Position of the lamp model
    lampModel.position.set(100, 370, 720);

    // Add lamp model to the scene
    scene.add(lampModel);
    lampModel.add(lampLight);
});

// Add orbital camera control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Render loop
function animate() {
  animateParticles();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();