function setDynamicVariable (variableName) {
	var type = 'cube';
	this[type + '1'] = 1000;
	this[type + '2'] = 20;
	alert(cube1);
	console.log(cube2);
}

function spnCube(name) {
	var object = 'cube';
	this[object + name] = 'cube properties';
	console.log(cube + name)
}