// this is a demo for animating a created object using Scorpion

// SCENE SETUP:

spnScene(true, true, 80, 0, 0, 0, black); // create a scene with a renderer and camera

// OBJECT SETUP:

spnCube('basic', white, 1, 1, 1, 0, 0, -2.5, true, 'BasicCube');

// ANIMATION:

spnRotationAnimation(globalBasicCube, 0.01, 2, 0.01, 3, 'RotationAnimationDemo'); // a one liner for adding a rotation animation to an object!