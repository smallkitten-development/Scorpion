// Scorpion game engine! Made by nathan.

function spnLoadThree(location) { // loads three.js into the current page
	three = document.createElement("script");
	three.src = location;
	document.head.appendChild(three);
}

// ^^ loads three too late

function spnScene(alias, fov, x, y, z) {
	spnCreateScene = new THREE.Scene();
	var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;

	console.warn('spnRenderer scene antialias set to ' + alias);

	spnRenderer = new THREE.WebGLRenderer({
		antialias: alias
	});
    spnRenderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(spnRenderer.domElement);

	// create camera

	spnCamera = new THREE.PerspectiveCamera(fov, WIDTH / HEIGHT, 2000);
	spnCamera.position.set(x, y, z);
	spnCreateScene.add(spnCamera);
}