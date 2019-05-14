// Scorpion game engine! Made by nathan.

console.log('scorpion-engine 1.0');

var basic = "basic";

function spnLoadThree(location) { // loads three.js into the current page
	three = document.createElement("script");
	three.src = location;
	document.head.appendChild(three);
}

// ^^ loads three too late

function animate() {
	requestAnimationFrame(animate);
	spnRenderer.render(spnCreateScene, spnCamera); // render camera and scene

	// console.log("calling anim");
}

function spnScene(alias, fov, x, y, z) {
	window.spnCreateScene = new THREE.Scene();
	var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;

	if (alias == false) {
		console.warn('spnRenderer scene antialias set to ' + alias + ". Please check your code to make sure it's correct.");
	}

	spnRenderer = new THREE.WebGLRenderer({
		antialias: alias
	});
    spnRenderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(spnRenderer.domElement);

	// create camera

	spnCamera = new THREE.PerspectiveCamera(fov, WIDTH / HEIGHT, 2000);
	spnCamera.position.set(x, y, z);
	spnCreateScene.add(spnCamera);

	animate();
}

function spnCube(material, clr, l, w, depth, x, y, z) { // draw a basic cube and render it
	if (material == "basic") {
		var spnBasicCube = new THREE.Mesh(new THREE.CubeGeometry(l, w, depth), new THREE.MeshBasicMaterial({color: clr}));
		spnBasicCube.position.x = x;
		spnBasicCube.position.y = y;
		spnBasicCube.position.z = z;
		spnCreateScene.add(spnBasicCube);

		console.log(spnBasicCube);
	}
}