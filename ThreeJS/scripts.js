console.log(THREE);
console.log("Test");

//Scene
const canvas = document.querySelector(".result");
const scene = new THREE.Scene();

const sizes = {
   width: 800,
   height: 800,
};

//Camera
const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height);
camera.position.z = 4;
camera.position.x = 0;
camera.position.y = 0;

const rendering = new THREE.WebGLRenderer({
   canvas: canvas,
});

rendering.setSize(sizes.width, sizes.height);

const geometry = new THREE.BoxGeometry(2, 1, 2);
const geometry2 = new THREE.BoxGeometry(0.1, 0.5, 0.1);
const material = new THREE.MeshBasicMaterial({ color: "blue" });
const material2 = new THREE.MeshBasicMaterial({ color: "red" });
const edges = new THREE.EdgesGeometry(geometry, 55);
const line = new THREE.LineSegments(
   edges,
   new THREE.LineBasicMaterial({ color: "red" })
);

const cubeA = new THREE.Mesh(geometry, material);
cubeA.position.set(0, 0, 0);

const cubeB = new THREE.Mesh(geometry2, material2);
cubeB.position.set(0, 0.75, 0);

//create a group and add the two cubes2
//These cubes can now be rotated / scaled etc as a group
const group = new THREE.Group();
group.add(cubeA);
group.add(cubeB);
group.add(line);

camera.lookAt(group.position);
scene.add(group);

rendering.setSize(sizes.height, sizes.width);
testX = 0;
testY = 0;
rendering.render(scene, camera);
function testAnimate() {
   testX += 1;
   group.rotation.x = testX;

   rendering.render(scene, camera);
}

function testAnimateY() {
   testY += 1;
   group.rotation.y = testY;

   rendering.render(scene, camera);
}

const clock = new THREE.Clock();
var isAnimate = false;

function animate() {
   requestAnimationFrame(animate);
   const elapsed = clock.getElapsedTime();
   console.log(elapsed);

   // group.position.x = Math.cos(elapsed);
   // group.position.y = Math.sin(elapsed);
   if (isAnimate) {
      group.rotation.x += 0.025;
      group.rotation.y += 0.025;
   }

   rendering.render(scene, camera);
}

function stopAnimate() {
   if (isAnimate) {
      isAnimate = false;
   } else {
      isAnimate = true;
   }
   // isAnimate = false;

   console.log(isAnimate);
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
animate();
