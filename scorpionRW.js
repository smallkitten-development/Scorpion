// Scorpion 3D engine built on three.js
// rewritten 10/4/19

log('_scorpion engine_ v0.1 -- *made by smallkitten development*');
log('rewritten from scratch on _10/4/19_');

var stats = new Stats(); // stats.js by mrdoob
stats.showPanel(0);

function spnStats(bool) {
	if (bool == true) {
		document.body.appendChild(stats.dom);
	}
}

// ---------------------------------------------------------
// DEBUGGING:
// using spnDebug() will cause some functions to give more verbose console output

var scorpionDebug = false;

function spnDebug(bool) {
	scorpionDebug = bool;

	log('_scorpion debugging_ is set to ' + bool);
}

//---------------------------------------------------------
// GENERAL SETTINGS AND VARIABLES:

var globalObject = 'global'; // for piggy packing dynamic global variables

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var textureLoader = new THREE.TextureLoader(); // set this here so the code in the material creator is easier to read

var isDynamic = false; // is the renderer dynamic?

window.addEventListener('resize', resizeRenderer, false); // resize renderer if the screen size changes

function resizeRenderer() {
	if (isDynamic == true) {
		spnRenderer.setSize(window.innerWidth, window.innerHeight);
	}

	// verbose debug logging could be added here
}

// ---------------------------------------------------------
// COLORS:

var white = 0xffffff;
var black = 0x000000;
var red = 0xff0000;
var orange = 0xffa500;
var yellow = 0xffff00;
var green = 0x008000;
var blue = 0x0000ff;
var purple = 0x800080;

// ^ these are variables that makes coloring things easier so you don't have to google hex codes
// ---------------------------------------------------------
// ANIMATION FRAME LOOP:
// this is the loop that is called to render the scene and camera

function animate() {
	stats.begin(); // call the fps monitor here

	requestAnimationFrame(animate);
	spnRenderer.render(spnScene, spnCamera);

	stats.end(); // end stats call here
}

// ---------------------------------------------------------
// CREATE SCENE/CAMERA:

function spnScene(alias, dyn, fov, x, y, z, backgroundColor) {
	window.spnScene = new THREE.Scene();
	spnScene.backgroundColor = new THREE.Color(backgroundColor);

	// ^ sets up scene (spnScene as of rewrite) with a background color

	spnRenderer = new THREE.WebGLRenderer({
		antialias: alias,
		shadowMap: true
	});

	// ^ sets up a renderer with antialiasing variable and a shadow map

	spnRenderer.setSize(windowWidth, windowHeight);
	document.body.appendChild(spnRenderer.domElement); // adds the renderer as a child to the body

	// CAMERA:

	spnCamera = new THREE.PerspectiveCamera(fov, windowWidth / windowHeight, 0.1, 2000); // adds a perspective camera with a near of 0.1 and a far of 2000
	spnCamera.position.set(x, y, z); // sets spnCamera position
	spnScene.add(spnCamera); // add camera to the scene

	// OTHER SETTING VARIABLES:

	isDynamic = dyn; // sets the global variable for resizing the renderer when the screen size changes

	animate(); // calls the start of the animation loop once all objects have been added to the scene
}

// ---------------------------------------------------------
// TEXTURE LOADER / CUSTOM MATERIALS
// this creates a texture loader for making custom materials and allows you to save them globally for applying to objects

function spnCustomMaterial(material, albedo, normal, specular, emissive, materialName) {
	// load texture maps using the texture loader:

	var loadedAlbedoMap = textureLoader.load(albedo);
	var loadedNormalMap = textureLoader.load(normal);
	var loadedSpecularMap = textureLoader.load(specular);
	var loadedEmissiveMap = textureLoader.load(emissive);

	albedoMap.encoding = THREE.sRGBEncoding; // set the color space to sRGB for the albedo map
	albedo.anistrophy = 16;

	// BASIC MATERIAL:

	if (material == 'basic') {
		this[globalObject + materialName] = new THREE.MeshBasicMaterial({ // creates a global stored material 'globalMaterialName'
			map: loadedAlbedoMap
		})
	}

	// LAMBERT MATERIAL:

	if (material == 'lambert') {
		this[globalObject + materialName] = new THREE.MeshLambertMaterial({
			map: loadedAlbedoMap,
			specularMap: loadedSpecularMap,
			emissiveMap: loadedEmissiveMap
		})
	}

	// PHONG MATERIAL:

	if (material == 'phong') {
		this[globalObject + materialName] = new THREE.MeshPhongMaterial({
			map: loadedAlbedoMap,
			normalMap: loadedNormalMap,
			emissiveMap: loadedEmissiveMap,
			specularMap: loadedSpecularMap
		})
	}
}

// ---------------------------------------------------------
// LIGHTS:

function spnLight(type, color, x, y, z, intensity, shadow, lightName) {
	if (type == 'ambient') {
		// CREATE AMBIENT LIGHT:

		var spnAmbientLight = new THREE.AmbientLight(color);
		spnScene.add(spnAmbientLight);

		this[globalObject + lightName] = spnAmbientLight;
	}

	if (type == 'directional') {
		// CREATE DIRECTIONAL LIGHT:

		var spnDirectionalLight = new THREE.DirectionalLight(color, intensity);
		spnDirectionalLight.position.set(x, y, z);
		spnDirectionalLight.castShadow = shadow;
		spnScene.add(spnAmbientLight);

		this[globalObject + lightName] = spnAmbientLight;
	}

	if (type == 'point') {
		// CREATE POINT LIGHT:

		var spnPointLight = new THREE.PointLight(color, intensity);
		spnPointLight.position.set(x, y, z);
		spnPointLight.castShadow = shadow;
		spnScene.add(spnPointLight);

		this[globalObject + lightName] = spnAmbientLight;
	}

	log('_scorpion_ has created a ' + type + ' light.');
}

// ---------------------------------------------------------
// CUBES:

function spnCube(material, clr, l, w, depth, x, y, z, wirefrm, objectName) {
	if (material == 'basic') {
		// CREATE BASIC CUBE MESH:

		var spnBasicCube = new THREE.Mesh(new THREE.CubeGeometry(l, w, depth), new THREE.MeshBasicMaterial({color: clr, wireframe: wirefrm}));
		spnBasicCube.position.x = x;
		spnBasicCube.position.y = y;
		spnBasicCube.position.z = z;
		spnBasicCube.castShadow = true;
		spnScene.add(spnBasicCube);

		// now we need to store the mesh data in a dynamic global variable

		this[globalObject + objectName] = spnBasicCube;
	}

	if (material == 'lambert') {
		// CREATE LAMBERT CUBE MESH:

		var spnLambertCube = new THREE.Mesh(new THREE.CubeGeometry(l, w, depth), new THREE.MeshLambertMaterial({color: clr, wireframe: wirefrm}));
		spnLambertCube.position.x = x;
		spnLambertCube.position.y = y;
		spnLambertCube.position.z = z;
		spnLambertCube.castShadow = true;
		spnScene.add(spnLambertCube);

		this[globalObject + objectName] = spnLambertCube;
	}

	if (material == 'phong') {
		// CREATE PHONG CUBE MESH:

		var spnPhongCube = new THREE.Mesh(new THREE.CubeGeometry(l, w, depth), new THREE.MeshPhongMaterial({color: clr, wireframe: wirefrm}));
		spnPhongCube.position.x = x;
		spnPhongCube.position.y = y;
		spnPhongCube.position.z = z;
		spnPhongCube.castShadow = true;
		spnScene.add(spnPhongCube);

		this[globalObject + objectName] = spnPhongCube;
	}

	log('_scorpion_ has created a ' + material + ' cube.');
}

// ---------------------------------------------------------
// SPHERES:

function spnSphere(material, radius, widthSegments, heightSegments, clr, x, y, z, wirefrm, objectName) {
	// CREATE BASIC SPHERE MESH

	if (material == 'basic') {
		var spnBasicSphere = new THREE.Mesh(new THREE.SphereGeometry(radius, widthSegments, heightSegments, 0, Math.PI * 2, 0, Math.PI * 2), new THREE.MeshBasicMaterial({color: clr, wireframe: wirefrm}));
		spnBasicSphere.position.x = x;
		spnBasicSphere.position.y = y;
		spnBasicSphere.position.z = z;
		spnBasicSphere.castShadow = true;
		spnCreateScene.add(spnBasicSphere);

		this[globalObject + objectName] = spnBasicSphere;
	}

	// CREATE LAMBERT SPHERE MESH

	if (material == 'lambert') {
		var spnLambertSphere = new THREE.Mesh(new THREE.SphereGeometry(radius, widthSegments, heightSegments, 0, Math.PI * 2, 0, Math.PI * 2), new THREE.MeshLambertMaterial({color: clr, wireframe: wirefrm}));
		spnLambertSphere.position.x = x;
		spnLambertSphere.position.y = y;
		spnLambertSphere.position.z = z;
		spnLambertSphere.castShadow = true;
		spnCreateScene.add(spnLambertSphere);

		this[globalObject + objectName] = spnLambertSphere;
	}

	// CREATE PHONG SPHERE MESH

	if (material == 'phong') {
		var spnPhongSphere = new THREE.Mesh(new THREE.SphereGeometry(radius, widthSegments, heightSegments, 0, Math.PI * 2, 0, Math.PI * 2), new THREE.MeshPhongMaterial({color: clr, wireframe: wirefrm}));
		spnPhongSphere.position.x = x;
		spnPhongSphere.position.y = y;
		spnPhongSphere.position.z = z;
		spnPhongSphere.castShadow = true;
		spnCreateScene.add(spnPhongSphere);

		this[globalObject + objectName] = spnPhongSphere;
	}

	log('_scorpion_ has created a ' + material + ' sphere.');
}
























