// Scorpion game engine! Made by nathan.

console.log("%cscorpion-engine version 1-1 beta", "text-shadow: 3px 2px red; font-size: 15px;");
console.log("%cmade \n %c by \n %c smallKitten development", "line-height: 0.8;", "line-height: 1.5;", "line-height: 1;")

var stats = new Stats();
stats.showPanel(0);

function spnStats() {
	document.body.appendChild(stats.dom);
}

// colors so you dont have to memorize a million hex codes

var white = 0xffffff;
var black = 0x000000;
var red = 0xff0000;
var orange = 0xffa500;
var yellow = 0xffff00;
var green = 0x008000;
var blue = 0x0000ff;
var purple = 0x800080;

var walkSpeed;
var lookSpeed;

var dynamic = false; // set to false by default unless stated otherwise by the scene creator.

// object material types

var basic = "basic";
var lambert = "lambert";
var phong = "phong";

// lighting types

var ambient = "ambient";
var directional = "directional";
var point = "point";

// animation variables

var animateBaiscCubeObject = false;
var animateLambertCubeObject = false;
var animatePhongCubeObject = false;
var animateDirectionalLightObject = false;
var animatePointLightObject = false;

var basicCubeAnimationX;
var basicCubeAnimationY;
var basicCubePositionAnimationX;
var basicCubePositionAnimationY;
var basicCubePositionAnimationZ;

var lambertCubeAnimationX;
var lambertCubeAnimationY;
var lambertCubePositionAnimationX;
var lambertCubePositionAnimationY;
var lambertCubePositionAnimationZ;

var phongCubeAnimationX;
var phongCubeAnimationY;
var phongCubePositionAnimationX;
var phongCubePositionAnimationY;
var phongCubePositionAnimationZ;

var directionalLightAnimationX;
var directionalLightAnimationY;
var directionalLightPositionAnimationX
var directionalLightPositionAnimationY;
var directionalLightPositionAnimationZ;

var pointLightAnimationX;
var pointLightAnimationY;
var pointLightPositionAnimationX
var pointLightPositionAnimationY;
var pointLightPositionAnimationZ;

// global objects

var spnBasicCubeGlobal;
var spnLambertCubeGlobal;
var spnPhongCubeGlobal;
var spnDirectionalLightGlobal;

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

var cameraControl = false;
var controlKeyboard = false;

var keyboard = 'keyboard';
var keyboardKey = {};

function spnLoadThree(location) { // loads three.js into the current page
	three = document.createElement("script");
	three.src = location;
	document.head.appendChild(three);
}

// ^^ loads three too late

window.addEventListener('resize', resizeScene, false); // event lister for resizing the scene

function exampleScene() { // this renders a cube and a light
	spnScene(true, true, 80, 0, 0, 0, 0xba55d3);
	spnCube(phong, 0xba55d3, 5, 5, 5, 0, 0, -10, true);
	spnLight(point, white, 0, 0, 1, 1, true);
	spnAnimate('spnPhongCube', 0.025, 0.025, 0, 0, 0);
	spnControl(true, keyboard, 0.1, 0.01);
	spnFloor(phong, 15, 15, 0, -5, -10, 42, white, true);
	spnWall(phong, 15, 15, 0, 2.5, -17.5, 0, 0, 42, white, true);
	spnWall(phong, 15, 15, -7.5, 2.5, -10, 0, Math.PI / 2, 42, white, true);
	spnWall(phong, 15, 15, 7.5, 2.5, -10, 0, -Math.PI / 2, 42, white, true);
	spnFloor(phong, 15, 15, 0, 10, -10, 42, white, true);

	console.log('example scene has been created');
}

function spnControl(enabled, type, wlkSpeed, lkSpeed) {
	if (enabled == true) {
		cameraControl = true;

		walkSpeed = wlkSpeed;
		lookSpeed = lkSpeed;
	}

	if (type == keyboard) {
		controlKeyboard = true;
	}
}

function keyDown(event) { // keyboard keyup/down controls
	keyboardKey[event.keyCode] = true;
	// console.log(keyboardKey);
}

function keyUp(event) {
	keyboardKey[event.keyCode] = false;
}

function animate() {
	stats.begin(); // start fps monitor
	
	requestAnimationFrame(animate);
	spnRenderer.render(spnCreateScene, spnCamera); // render camera and scene

	if (cameraControl == true && controlKeyboard == true) {
		if (keyboardKey[37]) { // left
			spnCamera.rotation.y += Math.PI * lookSpeed;
		}

		if (keyboardKey[39]) { // right
			spnCamera.rotation.y -= Math.PI * lookSpeed;
		}

		if (keyboardKey[38]) { // up
			spnCamera.rotation.x += Math.PI * lookSpeed;
		}

		if (keyboardKey[40]) { // down
			spnCamera.rotation.x -= Math.PI * lookSpeed;
		}

		if (keyboardKey[83]) { // backward
			spnCamera.position.z += Math.PI * walkSpeed;
		}

		if (keyboardKey[87]) { // forward
			spnCamera.position.z -= Math.PI * walkSpeed;
		}

		if (keyboardKey[65]) { // left
			spnCamera.position.x -= Math.PI * walkSpeed;
		}

		if (keyboardKey[68]) { // right
			spnCamera.position.x += Math.PI * walkSpeed;
		}
	}

	// ^^ movement controls for the camera enabled by spnControl();

	if (animateBaiscCubeObject == true) {
		spnBasicCubeGlobal.rotation.x += basicCubeAnimationX;
		spnBasicCubeGlobal.rotation.y += basicCubeAnimationY;

		spnBasicCubeGlobal.position.x += basicCubePositionAnimationX;
		spnBasicCubeGlobal.position.y += basicCubePositionAnimationY;
		spnBasicCubeGlobal.position.z += basicCubePositionAnimationZ;
	}

	if (animateLambertCubeObject == true) {
		spnLambertCubeGlobal.rotation.x += lambertCubeAnimationX;
		spnLambertCubeGlobal.rotation.y += lambertCubeAnimationY;

		spnLambertCubeGlobal.position.x += lambertCubePositionAnimationX;
		spnLambertCubeGlobal.position.y += lambertCubePositionAnimationY;
		spnLambertCubeGlobal.position.z += lambertCubePositionAnimationZ;
	}

	if (animatePhongCubeObject == true) {
		spnPhongCubeGlobal.rotation.x += phongCubeAnimationX;
		spnPhongCubeGlobal.rotation.y += phongCubeAnimationY;

		spnPhongCubeGlobal.position.x += phongCubePositionAnimationX;
		spnPhongCubeGlobal.position.y += phongCubePositionAnimationY;
		spnPhongCubeGlobal.position.z += phongCubePositionAnimationZ;
	}

	if (animateDirectionalLightObject == true) {
		spnDirectionalLightGlobal.rotation.x += directionalLightAnimationX;
		spnDirectionalLightGlobal.rotation.y += directionalLightAnimationY;

		spnDirectionalLightGlobal.position.x += directionalLightPositionAnimationX;
		spnDirectionalLightGlobal.position.y += directionalLightPositionAnimationY;
		spnDirectionalLightGlobal.position.z += spnDirectionalLightPositionAnimationZ;
	}

	if (animatePointLightObject == true) {
		spnPointLightGlobal.rotation.x += pointLightAnimationX;
		spnPointLightGlobal.rotation.y += pointLightAnimationY;

		spnPointLightGlobal.position.x += pointLightPositionAnimationX;
		spnPointLightGlobal.position.y += pointLightPositionAnimationY;
		spnPointLightGlobal.position.z += pointLightPositionAnimationZ;
	}

	stats.end(); // end fps monitor per frame
}

function spnAnimate(object, xRotate, yRotate, xPosition, yPosition, zPosition) { // adds animation to created objects
	if (object == 'spnBasicCube') {
		animateBaiscCubeObject = true;

		basicCubeAnimationX = xRotate;
		basicCubeAnimationY = yRotate;

		basicCubePositionAnimationX = xPosition;
		basicCubePositionAnimationY = yPosition;
		basicCubePositionAnimationZ = zPosition;

		console.log('animation added to ' + object + ' with an X axis rotation of ' + basicCubeAnimationX + ' and a Y axis rotation of ' + basicCubeAnimationY + ' per frame.');
	}

	if (object == 'spnLambertCube') {
		animateLambertCubeObject = true;

		lambertCubeAnimationX = xRotate;
		lambertCubeAnimationY = yRotate;

		lambertCubePositionAnimationX = xPosition;
		lambertCubePositionAnimationY = yPosition;
		lambertCubePositionAnimationZ = zPosition;

		console.log('animation added to ' + object + ' with an X axis rotation of ' + lambertCubeAnimationX + ' and a Y axis rotation of ' + lambertCubeAnimationY + ' per frame.');
	}

	if (object == 'spnPhongCube') {
		animatePhongCubeObject = true;

		phongCubeAnimationX = xRotate;
		phongCubeAnimationY = yRotate;

		phongCubePositionAnimationX = xPosition;
		phongCubePositionAnimationY = yPosition;
		phongCubePositionAnimationZ = zPosition;

		console.log('animation added to ' + object + ' with an X axis rotation of ' + phongCubeAnimationX + ' and a Y axis rotation of ' + phongCubeAnimationY + ' per frame.');
	}

	if (object == 'spnDirectionalLight') {
		animateDirectionalLightObject = true;

		directionalLightAnimationX = xRotate;
		directionalLightAnimationY = yRotate;

		directionalLightPositionAnimationX = xPosition;
		directionalLightPositionAnimationY = yPosition;
		directionalLightPositionAnimationZ = zPosition;
	}

	if (object == 'spnPointLight') {
		animatePointLightObject = true;

		pointLightAnimationX = xRotate;
		pointLightAnimationY = yRotate;

		pointLightPositionAnimationX = xPosition;
		pointLightPositionAnimationY = yPosition;
		pointLightPositionAnimationZ = zPosition;
	}
}

function spnScene(alias, dyn, fov, x, y, z, backgroundColor) {
	window.spnCreateScene = new THREE.Scene();
	var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
	spnCreateScene.background = new THREE.Color(backgroundColor);

	if (alias == false) {
		console.warn('spnRenderer scene antialias set to ' + alias + ". Please make sure you meant to disable this.");
	}

	spnRenderer = new THREE.WebGLRenderer({
		antialias: alias
	});
    spnRenderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(spnRenderer.domElement);

	// create camera

	spnCamera = new THREE.PerspectiveCamera(fov, WIDTH / HEIGHT, 0.1, 2000);
	spnCamera.position.set(x, y, z);
	spnCreateScene.add(spnCamera);

	if (dyn == true) {
		dynamic = true;
	} else {
		console.warn('dynamic scene scaling has been disabled. Any changes to window size will no longer affect the size of the scene.');
	}

	console.log('%cscorpion has created a scene sucessfully.', 'background: green; color: white; display: block;');

	animate();
}

function resizeScene() {
	if(dynamic == true) {
		spnRenderer.setSize(window.innerWidth, window.innerHeight);
	} else {
		return;
	}
}

// lighting 

function spnLight(type, color, x, y, z, intensity, shadow) {
	if (type == ambient) {
		var spnAmbientLight = new THREE.AmbientLight(color);
		spnCreateScene.add(spnAmbientLight);

		console.log('%cscorpion has created an abient light object sucessfully.', 'background: green; color: white; display: block;');

		console.log(spnAmbientLight);
	} else if (type == directional) {
		var spnDirectionalLight = new THREE.DirectionalLight(color, intensity);
		spnDirectionalLight.position.set(x, y, z);
		spnDirectionalLight.castShadow = shadow;
		spnCreateScene.add(spnDirectionalLight);

		console.log('%cscorpion has created an directional light object sucessfully.', 'background: green; color: white; display: block;');

		console.log(spnDirectionalLight);
		spnDirectionalLightGlobal = spnDirectionalLight;
	} else if (type == point) {
		var spnPointLight = new THREE.PointLight(color, intensity);
		spnPointLight.position.set(x, y, z);
		spnPointLight.castShadow = shadow;
		spnCreateScene.add(spnPointLight);

		console.log('%cscorpion has created an point light object sucessfully.', 'background: green; color: white; display: block;');

		console.log(spnPointLight);
		spnPointLightGlobal = spnPointLight;
	}
}

function spnCube(material, clr, l, w, depth, x, y, z, wirefrm) { // draw a cube and render it
	if (material == "basic") {
		var spnBasicCube = new THREE.Mesh(new THREE.CubeGeometry(l, w, depth), new THREE.MeshBasicMaterial({color: clr, wireframe: wirefrm}));
		spnBasicCube.position.x = x;
		spnBasicCube.position.y = y;
		spnBasicCube.position.z = z;
		spnCreateScene.add(spnBasicCube);

		spnBasicCube.castShadow = true;

		console.log('%cscorpion has created a basic cube object sucessfully.', 'background: green; color: white; display: block;');

		console.log(spnBasicCube);
		spnBasicCubeGlobal = spnBasicCube;
	}

	if (material == "lambert") {
		var spnLambertCube = new THREE.Mesh(new THREE.CubeGeometry(l, w, depth), new THREE.MeshLambertMaterial({color: clr, wireframe: wirefrm}));
		spnLambertCube.position.x = x;
		spnLambertCube.position.y = y;
		spnLambertCube.position.z = z;
		spnCreateScene.add(spnLambertCube);

		spnLambertCube.castShadow = true;

		console.log('%cscorpion has created a lambert cube object sucessfully.', 'background: green; color: white; display: block;');

		console.log(spnLambertCube);
		spnLambertCubeGlobal = spnLambertCube;
	}

	if (material == "phong") {
		var spnPhongCube = new THREE.Mesh(new THREE.CubeGeometry(l, w, depth), new THREE.MeshLambertMaterial({color: clr, wireframe: wirefrm}));
		spnPhongCube.position.x = x;
		spnPhongCube.position.y = y;
		spnPhongCube.position.z = z;
		spnCreateScene.add(spnPhongCube);

		spnPhongCube.castShadow = true;

		console.log('%cscorpion has created a phong cube object sucessfully.', 'background: green; color: white; display: block;');

		console.log(spnPhongCube);
		spnPhongCubeGlobal = spnPhongCube;
	}
}

function spnFloor(material, width, height, x, y, z, triangles, clr, wirefrm) {
	if (triangles > 100) {
		console.warn('the floor triangles is very high. you may want to lower this number to increase performance.');
	}

	if (material == "basic") {
		var spnBasicPlane = new THREE.Mesh(new THREE.PlaneGeometry(width, height, triangles, triangles), new THREE.MeshBasicMaterial({color: clr, opacity: 1, wireframe: wirefrm}));

		spnBasicPlane.position.x = x;
		spnBasicPlane.position.y = y;
		spnBasicPlane.position.z = z;

		spnBasicPlane.material.side = THREE.DoubleSide;

		spnBasicPlane.rotation.x = -Math.PI / 2;

		console.log(spnBasicPlane);
		spnCreateScene.add(spnBasicPlane);

		console.log('%cscorpion has created a basic floor sucessfully.', 'background: green; color: white; display: block;');
	}

	if (material == "lambert") {
		var spnLambertPlane = new THREE.Mesh(new THREE.PlaneGeometry(width, height, triangles, triangles), new THREE.MeshLambertMaterial({color: clr, opacity: 1, wireframe: wirefrm}));

		spnLambertPlane.position.x = x;
		spnLambertPlane.position.y = y;
		spnLambertPlane.position.z = z;

		spnLambertPlane.material.side = THREE.DoubleSide;
		spnLambertPlane.receiveShadow = true;

		spnLambertPlane.rotation.x = -Math.PI / 2;

		console.log(spnLambertPlane);
		spnCreateScene.add(spnLambertPlane);

		console.log('%cscorpion has created a lambert floor sucessfully.', 'background: green; color: white; display: block;');
	}

	if (material == "phong") {
		var spnPhongPlane = new THREE.Mesh(new THREE.PlaneGeometry(width, height, triangles, triangles), new THREE.MeshPhongMaterial({color: clr, opacity: 1, wireframe: wirefrm}));

		spnPhongPlane.position.x = x;
		spnPhongPlane.position.y = y;
		spnPhongPlane.position.z = z;

		spnPhongPlane.material.side = THREE.DoubleSide;
		spnPhongPlane.receiveShadow = true;

		spnPhongPlane.rotation.x = -Math.PI / 2;

		console.log(spnPhongPlane);
		spnCreateScene.add(spnPhongPlane);

		console.log('%cscorpion has created a phong floor sucessfully.', 'background: green; color: white; display: block;');
	}
}

function spnWall(material, width, height, x, y, z, xRotate, yRotate, triangles, clr, wirefrm) {
	if (triangles > 100) {
		console.warn('the wall triangles is very high. you may want to lower this number to increase performance.');
	}

	if (material == "basic") {
		var spnBasicWallPlane = new THREE.Mesh(new THREE.PlaneGeometry(width, height, triangles, triangles), new THREE.MeshBasicMaterial({color: clr, opacity: 1, wireframe: wirefrm}));

		spnBasicWallPlane.position.x = x;
		spnBasicWallPlane.position.y = y;
		spnBasicWallPlane.position.z = z;

		spnBasicWallPlane.material.side = THREE.DoubleSide;

		spnBasicWallPlane.rotation.x = xRotate;
		spnBasicWallPlane.rotation.y = yRotate;

		console.log(spnBasicWallPlane);
		spnCreateScene.add(spnBasicWallPlane);

		console.log('%cscorpion has created a basic wall sucessfully.', 'background: green; color: white; display: block;');
	}

	if (material == "lambert") {
		var spnLambertWallPlane = new THREE.Mesh(new THREE.PlaneGeometry(width, height, triangles, triangles), new THREE.MeshLambertMaterial({color: clr, opacity: 1, wireframe: wirefrm}));

		spnLambertWallPlane.position.x = x;
		spnLambertWallPlane.position.y = y;
		spnLambertWallPlane.position.z = z;

		spnLambertWallPlane.material.side = THREE.DoubleSide;
		spnLambertWallPlane.receiveShadow = true;

		spnLambertWallPlane.rotation.x = xRotate;
		spnLambertWallPlane.rotation.y = yRotate;

		console.log(spnLambertWallPlane);
		spnCreateScene.add(spnLambertWallPlane);

		console.log('%cscorpion has created a lambert wall sucessfully.', 'background: green; color: white; display: block;');
	}

	if (material == "phong") {
		var spnPhongWallPlane = new THREE.Mesh(new THREE.PlaneGeometry(width, height, triangles, triangles), new THREE.MeshPhongMaterial({color: clr, opacity: 1, wireframe: wirefrm}));

		spnPhongWallPlane.position.x = x;
		spnPhongWallPlane.position.y = y;
		spnPhongWallPlane.position.z = z;

		spnPhongWallPlane.material.side = THREE.DoubleSide;
		spnPhongWallPlane.receiveShadow = true;

		spnPhongWallPlane.rotation.x = xRotate;
		spnPhongWallPlane.rotation.y = yRotate;

		console.log(spnPhongWallPlane);
		spnCreateScene.add(spnPhongWallPlane);

		console.log('%cscorpion has created a phong wall sucessfully.', 'background: green; color: white; display: block;');
	}
}