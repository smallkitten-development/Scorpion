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
		spnCamera.aspect = window.innerWidth / window.innerHeight;
		spnCamera.updateProjectionMatrix();

		spnRenderer.setSize(window.innerWidth, window.innerHeight);
	}

	// verbose debug logging could be added here
}

// ---------------------------------------------------------
// ANIMATIONS:
// these animations cannot be stopped, however they can be applied to multiple objects.
// using scripts like these outside of scorpion works perfectly fine as long as you know the name of the object you want to apply it to

function spnRotationAnimation(object, speed, x, y, z, animationName) { // for rotation animations, makes a global variable for animation name
	this[globalObject + animationName] = window.setInterval(function(){
  		object.rotation.x -= speed * x;
		object.rotation.y -= speed * y;
		object.rotation.z -= speed * z;
	}, 16);

	log('added a rotation animation called global' + animationName + ' to a global object.');
}

function spnPositionAnimation(object, speed, x, y, z, animationName) {
	this[globalObject + animationName] = window.setInterval(function(){
  		object.position.x -= speed * x;
		object.position.y -= speed * y;
		object.position.z -= speed * z;
	}, 16);

	log('added a positional animation called global' + animationName + ' to a global object.');
}

function spnScaleAnimation(object, speed, width, height, depth, animationName) {
	this[globalObject + animationName] = window.setInterval(function(){
  		object.scale.x -= speed * width;
		object.scale.y -= speed * height;
		object.scale.z -= speed * depth;
	}, 16);
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

	spnRenderer = new THREE.WebGLRenderer({antialias: alias, shadowMapEnabled: true});

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

		this[globalObject + lightName] = spnDirectionalLight;
	}

	if (type == 'point') {
		// CREATE POINT LIGHT:

		var spnPointLight = new THREE.PointLight(color, intensity);
		spnPointLight.position.set(x, y, z);
		spnPointLight.castShadow = shadow;
		spnScene.add(spnPointLight);

		this[globalObject + lightName] = spnPointLight;
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
	if (material == 'basic') {
		// CREATE BASIC SPHERE MESH

		var spnBasicSphere = new THREE.Mesh(new THREE.SphereGeometry(radius, widthSegments, heightSegments, 0, Math.PI * 2, 0, Math.PI * 2), new THREE.MeshBasicMaterial({color: clr, wireframe: wirefrm}));
		spnBasicSphere.position.x = x;
		spnBasicSphere.position.y = y;
		spnBasicSphere.position.z = z;
		spnBasicSphere.castShadow = true;
		spnScene.add(spnBasicSphere);

		this[globalObject + objectName] = spnBasicSphere;
	}

	if (material == 'lambert') {
		// CREATE LAMBERT SPHERE MESH

		var spnLambertSphere = new THREE.Mesh(new THREE.SphereGeometry(radius, widthSegments, heightSegments, 0, Math.PI * 2, 0, Math.PI * 2), new THREE.MeshLambertMaterial({color: clr, wireframe: wirefrm}));
		spnLambertSphere.position.x = x;
		spnLambertSphere.position.y = y;
		spnLambertSphere.position.z = z;
		spnLambertSphere.castShadow = true;
		spnScene.add(spnLambertSphere);

		this[globalObject + objectName] = spnLambertSphere;
	}

	if (material == 'phong') {
		// CREATE PHONG SPHERE MESH

		var spnPhongSphere = new THREE.Mesh(new THREE.SphereGeometry(radius, widthSegments, heightSegments, 0, Math.PI * 2, 0, Math.PI * 2), new THREE.MeshPhongMaterial({color: clr, wireframe: wirefrm}));
		spnPhongSphere.position.x = x;
		spnPhongSphere.position.y = y;
		spnPhongSphere.position.z = z;
		spnPhongSphere.castShadow = true;
		spnScene.add(spnPhongSphere);

		this[globalObject + objectName] = spnPhongSphere;
	}

	log('_scorpion_ has created a ' + material + ' sphere.');
}

// ---------------------------------------------------------
// WALLS:

function spnWall(material, width, height, x, y, z, xRotate, yRotate, triangles, clr, wirefrm, objectName) {
	if (triangles > 100) {
		log('[c="color: red"]the triangles in this mesh are very high. you may want to lower this to maintain stable performance.[c]')
	}

	if (material == 'basic') {
		// CREATE BASIC WALL MESH:

		var spnBasicWallPlane = new THREE.Mesh(new THREE.PlaneGeometry(width, height, triangles, triangles), new THREE.MeshBasicMaterial({color: clr, opacity: 1, wireframe: wirefrm}));
		spnBasicWallPlane.position.x = x;
		spnBasicWallPlane.position.y = y;
		spnBasicWallPlane.position.z = z;
		spnBasicWallPlane.material.side = THREE.DoubleSide;
		spnBasicWallPlane.rotation.x = xRotate;
		spnBasicWallPlane.rotation.y = yRotate;
		spnScene.add(spnBasicWallPlane);

		this[globalObject + objectName] = spnBasicWallPlane;
	}

	if (material == 'lambert') {
		// CREATE LAMBERT WALL MESH:

		var spnLambertWallPlane = new THREE.Mesh(new THREE.PlaneGeometry(width, height, triangles, triangles), new THREE.MeshLambertMaterial({color: clr, opacity: 1, wireframe: wirefrm}));
		spnLambertWallPlane.position.x = x;
		spnLambertWallPlane.position.y = y;
		spnLambertWallPlane.position.z = z;
		spnLambertWallPlane.material.side = THREE.DoubleSide;
		spnLambertWallPlane.rotation.x = xRotate;
		spnLambertWallPlane.rotation.y = yRotate;
		spnLambertWallPlane.receiveShadow = true;
		spnScene.add(spnLambertWallPlane);

		this[globalObject + objectName] = spnLambertWallPlane;
	}

	if (material == 'phong') {
		// CREATE PHONG WALL MESH:

		var spnPhongWallPlane = new THREE.Mesh(new THREE.PlaneGeometry(width, height, triangles, triangles), new THREE.MeshPhongMaterial({color: clr, opacity: 1, wireframe: wirefrm}));
		spnPhongWallPlane.position.x = x;
		spnPhongWallPlane.position.y = y;
		spnPhongWallPlane.position.z = z;
		spnPhongWallPlane.material.side = THREE.DoubleSide;
		spnPhongWallPlane.rotation.x = xRotate;
		spnPhongWallPlane.rotation.y = yRotate;
		spnPhongWallPlane.receiveShadow = true;
		spnScene.add(spnPhongWallPlane);

		this[globalObject + objectName] = spnPhongWallPlane;
	}

	log('_scorpion_ has created a ' + material + ' wall.');
}

// ---------------------------------------------------------
// FLOORS:

function spnFloor(material, width, height, x, y, z, triangles, clr, wirefrm, objectName) {
	if (material == 'basic') {
		// CREATE BASIC FLOOR:

		var spnBasicFloorPlane = new THREE.Mesh(new THREE.PlaneGeometry(width, height, triangles, triangles), new THREE.MeshBasicMaterial({color: clr, opacity: 1, wireframe: wirefrm}));
		spnBasicFloorPlane.position.x = x;
		spnBasicFloorPlane.position.y = y;
		spnBasicFloorPlane.position.z = z;
		spnBasicFloorPlane.material.side = THREE.DoubleSide;
		spnBasicFloorPlane.rotation.x = -Math.PI / 2;
		spnScene.add(spnBasicFloorPlane);

		this[globalObject + objectName] = spnBasicFloorPlane;
	}

	if (material == 'lambert') {
		// CREATE LAMBERT FLOOR:

		var spnLambertFloorPlane = new THREE.Mesh(new THREE.PlaneGeometry(width, height, triangles, triangles), new THREE.MeshLambertMaterial({color: clr, opacity: 1, wireframe: wirefrm}));
		spnLambertFloorPlane.position.x = x;
		spnLambertFloorPlane.position.y = y;
		spnLambertFloorPlane.position.z = z;
		spnLambertFloorPlane.material.side = THREE.DoubleSide;
		spnLambertFloorPlane.rotation.x = -Math.PI / 2;
		spnLambertFloorPlane.receiveShadow = true;
		spnScene.add(spnLambertFloorPlane);

		this[globalObject + objectName] = spnLambertFloorPlane;
	}

	if (material == 'phong') {
		// CREATE PHONG FLOOR:

		var spnPhongFloorPlane = new THREE.Mesh(new THREE.PlaneGeometry(width, height, triangles, triangles), new THREE.MeshPhongMaterial({color: clr, opacity: 1, wireframe: wirefrm}));
		spnPhongFloorPlane.position.x = x;
		spnPhongFloorPlane.position.y = y;
		spnPhongFloorPlane.position.z = z;
		spnPhongFloorPlane.material.side = THREE.DoubleSide;
		spnPhongFloorPlane.rotation.x = -Math.PI / 2;
		spnPhongFloorPlane.receiveShadow = true;
		spnScene.add(spnPhongFloorPlane);

		this[globalObject + objectName] = spnPhongFloorPlane;
	}
}

// ---------------------------------------------------------
// OBJECT AND MATERIAL LOADER:

function spnObjectLoader(path, material, object, x, y, z, xRotate, yRotate, zRotate, objectName) {
	var spnMaterialLoader = new THREE.MTLLoader();
	spnMaterialLoader.setPath(path);
	spnMaterialLoader.load(material, function(importedMaterials) {
		importedMaterials.preload();

		// OBJECT LOADING:

		var spnObjectLoader = new THREE.OBJLoader();
		spnObjectLoader.setMaterials(importedMaterials);
		spnObjectLoader.setPath(path);
		spnObjectLoader.load(object, function(importedObject) {
			importedObject.position.x = x;
			importedObject.position.y = y;
			importedObject.position.z = z;

			importedObject.rotation.x = xRotate;
			importedObject.rotation.y = yRotate;
			importedObject.rotation.z = zRotate;

			spnScene.add(importedObject);
			this[globalObject + objectName] = importedObject;
		})
	})
}

// ^ this should load textures from a material and apply them to an imported mesh