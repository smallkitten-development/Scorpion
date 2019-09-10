// Scorpion game engine! Made by nathan.

console.log('scorpion-engine version 1');

var stats = new Stats();
stats.showPanel(0);

function spnStats() {
	document.body.appendChild(stats.dom);
}

var dynamic = false; // set to false by default unless stated otherwise by the scene creator.
var basic = "basic";
var lambert = "lambert";
var ambient = "ambient";
var directional = "directional";

var animateBaiscCubeObject = false;
var animateLambertCubeObject = false;

var basicCubeAnimationX;
var basicCubeAnimationY;
var lambertCubeAnimationX;
var lambertCubeAnimationY;

var spnBasicCubeGlobal;
var spnLambertCubeGlobal;

function spnLoadThree(location) { // loads three.js into the current page
	three = document.createElement("script");
	three.src = location;
	document.head.appendChild(three);
}

// ^^ loads three too late

window.addEventListener('resize', resizeScene, false); // event lister for resizing the scene

function exampleScene() { // this renders a cube and a light
	spnScene(true, true, 80, 0, 0, 0);
	spnCube(lambert, 0xffffff, 5, 5, 5, 0, 0, -10, false);
	spnLight(directional, 0xffffff, 0, 0, 1, 1, true);
	spnAnimate('spnLambertCube', 0.025, 0.025);

	console.warn('example scene has been created');
}

function animate() {
	stats.begin(); // start fps monitor
	
	requestAnimationFrame(animate);
	spnRenderer.render(spnCreateScene, spnCamera); // render camera and scene

	if (animateBaiscCubeObject == true) {
		spnBasicCubeGlobal.rotation.x += basicCubeAnimationX;
		spnBasicCubeGlobal.rotation.y += basicCubeAnimationY;
	}

	if (animateLambertCubeObject == true) {
		spnLambertCubeGlobal.rotation.x += lambertCubeAnimationX;
		spnLambertCubeGlobal.rotation.y += lambertCubeAnimationY;
	}

	stats.end(); // end fps monitor per frame
}

function spnAnimate(object, x, y) { // adds animation to created objects
	if (object == 'spnBasicCube') {
		animateBaiscCubeObject = true;

		basicCubeAnimationX = x;
		basicCubeAnimationY = y;

		console.log('animation added to ' + object + ' with an X axis rotation of ' + basicCubeAnimationX + ' and a Y axis rotation of ' + basicCubeAnimationY + ' per frame.');
	} else if (object == 'spnLambertCube') {
		animateLambertCubeObject = true;

		lambertCubeAnimationX = x;
		lambertCubeAnimationY = y;
	}
}

function spnScene(alias, dyn, fov, x, y, z) {
	window.spnCreateScene = new THREE.Scene();
	var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;

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
		spnAmbientLightGlobal = spnAmbientLight; // these are made into global variables so they can be changed via animate();
	} else if (type == directional) {
		var spnDirectionalLight = new THREE.DirectionalLight(color, intensity);
		spnDirectionalLight.position.set(x, y, z);
		spnDirectionalLight.castShadow = shadow;
		spnCreateScene.add(spnDirectionalLight);

		console.log('%cscorpion has created an directional light object sucessfully.', 'background: green; color: white; display: block;');

		console.log(spnDirectionalLight);
		spnDirectionalLightGlobal = spnDirectionalLight;
	}
}

function spnCube(material, clr, l, w, depth, x, y, z, wirefrm) { // draw a basic cube and render it
	if (material == "basic") {
		var spnBasicCube = new THREE.Mesh(new THREE.CubeGeometry(l, w, depth), new THREE.MeshBasicMaterial({color: clr, wireframe: wirefrm}));
		spnBasicCube.position.x = x;
		spnBasicCube.position.y = y;
		spnBasicCube.position.z = z;
		spnCreateScene.add(spnBasicCube);

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

		console.log('%cscorpion has created a lambert cube object sucessfully.', 'background: green; color: white; display: block;');

		console.log(spnLambertCube);
		spnLambertCubeGlobal = spnLambertCube;
	}
}