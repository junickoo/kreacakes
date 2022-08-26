console.log(THREE);
console.log("Test");

//Scene
const canvas = document.querySelector(".result");
const scene = new THREE.Scene();

const sizes = {
   width: 500,
   height: 1000,
};

//Camera
const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height);
camera.position.z = 6;
camera.position.x = 1;
camera.position.y = 1;

const rendering = new THREE.WebGLRenderer({
   canvas: canvas,
});

rendering.setSize(sizes.width, sizes.height);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const geometry2 = new THREE.BoxGeometry(0.5, 0.5, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const material2 = new THREE.MeshBasicMaterial({ color: "red" });

const cubeA = new THREE.Mesh(geometry, material);
cubeA.position.set(1, 1, 0);

const cubeB = new THREE.Mesh(geometry2, material2);
cubeB.position.set(1, 1.8, 0);

//create a group and add the two cubes2
//These cubes can now be rotated / scaled etc as a group
const group = new THREE.Group();
group.add(cubeA);
group.add(cubeB);

scene.add(group);

rendering.setSize(sizes.height, sizes.width);
testX = 0;
testY = 0;
rendering.render(scene, camera);
function testAnimate() {
   testX += 0.5;
   group.rotation.x = testX;

   rendering.render(scene, camera);
}

function testAnimateY() {
   testY += 0.5;
   group.rotation.y = testY;

   rendering.render(scene, camera);
}

function animate() {
   requestAnimationFrame(animate);

   group.rotation.x += testX;

   rendering.render(scene, camera);
}

levels = true;
function addLevel() {
   console.log(group);
   if (levels) {
      console.log("ada");
      levels = false;
      cubeB.removeFromParent();
   } else {
      levels = true;
      console.log("test");
      group.add(cubeB);
   }
   rendering.render(scene, camera);
}
// animate();
