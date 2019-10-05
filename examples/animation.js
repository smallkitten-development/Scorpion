// this is a demo for animating a created object using Scorpion

// SCENE SETUP:

spnScene(true, true, 80, 0, 0, 0, black); // create a scene with a renderer and camera

// OBJECT SETUP:

spnCube('basic', white, 1, 1, 1, 0, 0, -2.5, true, 'BasicCube');

// ANIMATION:

var SPEED = 0.01;

function rotateCube() {
	globalBasicCube.rotation.x -= SPEED * 2;
	globalBasicCube.rotation.y -= SPEED;
	globalBasicCube.rotation.z -= SPEED * 3;
}

window.setInterval(function(){
  rotateCube();
}, 16);