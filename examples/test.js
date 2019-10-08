// this is a benchmark

var materials = ['basic', 'lambert', 'phong'];
var colors = [0xffffff, 0x000000, 0xff0000, 0xffa500, 0xffff00, 0x008000, 0x0000ff, 0x800080];
var values = [1, 2, 3, 4, 5];
var xValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12];
var negValues = [-5, -6, -7, -8, -9, -10];

var meshes = 0;

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function getMaterial() {
	return materials[Math.floor(Math.random()*materials.length)];
}

function getColor() {
	return colors[Math.floor(Math.random()*colors.length)];
}

function getValue() {
	return values[Math.floor(Math.random()*values.length)];
}

function getNegValue() {
	return negValues[Math.floor(Math.random()*negValues.length)];
}

function xValuesFunc() {
	return xValues[Math.floor(Math.random()*xValues.length)];
}


spnScene(true, true, 120, 0, 0, 5, black);
spnLight('point', white, 0, 0, 1, 2, true, 'Light');

const interval = setInterval(function() {
   spnCube(getMaterial(), getColor(), getValue(), getValue(), getValue(), xValuesFunc(), xValuesFunc(), getNegValue(), false, makeid(10));
   meshes = meshes + 1;
   document.getElementById('meshes').innerHTML = "meshes: " + meshes;
 }, 0.1);