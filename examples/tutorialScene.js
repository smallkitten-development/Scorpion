// this is a tutorial scene file, this will walk you through making a scene, an object, a light, floors, walls, and animating them.
// first we have to set up a scene

// spnScene(alias, dyn, fov, x, y, z, backgroundColor) 
spnScene(true, true, 90, 0, 0, 0, black);

// ^ makes a scene and a camera

// spnCube(material, clr, l, w, depth, x, y, z, wirefrm, objectName)
spnCube('phong', white, 2, 2, 2, 0, 0, -5, false, 'CubeOne');

// now we can make a light
// spnLight(type, color, x, y, z, intensity, shadow, lightName)
spnLight('point', white, 0, 0, -1, .8, true, 'LightOne');

// animate the cube with the built in object rotation script

spnRotationAnimation(globalCubeOne, 0.01, 2, 0, 3, 'CubeOneAnimationRotate'); 
spnScaleAnimation(globalCubeOne, 0.005, 2, 1, 3, 'CubeOneAnimationScale');

spnPositionAnimation(spnCamera, 0.01, 0, 0, -1, 'CameraAnimationMove');

// ^ this uses the new global dynamic variable implementation
// eg. global + whatever you set as the object name

// spnWall(material, width, height, x, y, z, xRotate, yRotate, triangles, clr, wirefrm, objectName)
spnWall('phong', 8, 8, 0, 0, -6, 0, 0, 12, orange, false, 'WallOne');
spnWall('phong', 8, 8, 4, 0, -6, 0, Math.PI / 2, 12, orange, false, 'WallTwo');
spnWall('phong', 8, 8, -4, 0, -6, 0, -Math.PI / 2, 12, orange, false, 'WallThree');

// spnFloor(material, width, height, x, y, z, triangles, clr, wirefrm, objectName)
spnFloor('phong', 8, 8, 0, -4, -2, 12, orange, false, 'FloorOne');
spnFloor('phong', 8, 8, 0, 4, -2, 12, orange, false, 'CelingOne');

// Adding cool animations to the floors

spnPositionAnimation(globalWallOne, 0.005, 0, 0, 1, 'WallOneMovementAnim');
spnPositionAnimation(globalWallTwo, 0.005, -1, 0, 0, 'WallTwoMovementAnim');
spnPositionAnimation(globalWallThree, 0.005, 1, 0, 0, 'WallThreeMovementAnim');

// floors

spnPositionAnimation(globalFloorOne, 0.0025, 0, 1, 0, 'FloorOneMovementAnim');
spnPositionAnimation(globalCelingOne, 0.0025, 0, -1, 0, 'CelingOneMovementAnim');