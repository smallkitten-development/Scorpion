spnScene(90, 0, 0, 0, black);

spnCube('phong', white, 2, 2, 2, 0, 0, -5, false, 'CubeOne');

spnLight('ambient', black, 0, 0, 0, 100, false, 'AMBLightOne');
spnLight('point', white, 0.28, 0, -1, .8, true, 'LightOne');

spnWall('phong', 8, 8, 0, 0, -6, 0, 0, 12, orange, false, 'WallOne');
spnWall('phong', 8, 8, 4, 0, -6, 0, Math.PI / 2, 12, orange, false, 'WallTwo');
spnWall('phong', 8, 8, -4, 0, -6, 0, -Math.PI / 2, 12, orange, false, 'WallThree');

// spnFloor(material, width, height, x, y, z, triangles, clr, wirefrm, objectName)
spnFloor('phong', 8, 8, 0, -4, -2, 12, orange, false, 'FloorOne');
spnFloor('phong', 8, 8, 0, 4, -2, 12, orange, false, 'CelingOne');