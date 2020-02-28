// scorpion
// 2/28/20
// ray tracing build (?)

// goal: clean stuff up, add ray tracing renderer.

// misc:

function log(v) {
	console.log(v);
}

var stats = new Stats();
stats.showPanel(0);

function displayPerformanceGraph(v) {
	if (v == true) {
		document.body.appendChild(stats.dom);
	}
}

// --------------------------

// more organized variables:

var wWidth = window.innerWidth;
var wHeight = window.innerHeight;

// --------------------------

// global variables/storing functions:

var scorpionObject = "scpn";

function storeObject(objectName, object) {
	this[scorpionObject + objectName] = object;

	log(object);
}

