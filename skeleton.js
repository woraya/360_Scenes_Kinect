function bodyTracked(body) {
	//background(255);
	// rotateY(2 * TWO_PI * mouseX / width);
	// rotateX(3 * TWO_PI * mouseY / width);

	// Draw all the joints
	kinectron.getJoints(drawJoint);

	// Get all the joints off the tracked body and do something with them

	// Mid-line
	var head = getPos(body.joints[kinectron.HEAD]);
	var neck = getPos(body.joints[kinectron.NECK]);
	var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
	var spineMid = getPos(body.joints[kinectron.SPINEMID]);
	var spineBase = getPos(body.joints[kinectron.SPINEBASE]);

	// Right Arm
	var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
	var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
	var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
	var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
	var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
	var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);

	// Left Arm
	var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
	var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
	var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
	var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
	var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
	var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);

	// Right Leg
	var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
	var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
	var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
	var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);

	// Left Leg
	var hipLeft = getPos(body.joints[kinectron.HIPLEFT]);
	var kneeLeft = getPos(body.joints[kinectron.KNEELEFT]);
	var ankleLeft = getPos(body.joints[kinectron.ANKLELEFT]);
	var footLeft = getPos(body.joints[kinectron.FOOTLEFT]);

	// push();
	// translate(spineBase.x, spineBase.y, spineBase.z);
	// sphere(10);
	// pop();

	//push();
	//translate(handLeft.x, handLeft.y, handLeft.z);
	// var hLGeometry = new THREE.BoxBufferGeometry(20, 20, 20);
	// var hl = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
	// 	color: Math.random() * 0xffffff
	// }));
	// hl.rotateY(2 * TWO_PI);
	// hl.rotateX(3 * TWO_PI);
	// hl.position.x = handLeft.x;
	// hl.position.y = handLeft.y;
	// hl.position.z = handLeft.z;

	// scene.add(hl);
	//sphere(50);
	//pop();

	// Put the head on the left hand as if it were the base of the spine
	// Make it a box
	var offset = head;
	//	push();
	//translate(offset.x, offset.y, offset.z);


// 	var geometry = new THREE.BoxBufferGeometry(20, 20, 20);

// //	var geometry = new THREE.SphereGeometry(15, 20, 10);
// 	var headBody = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
// 		color:  0xffffff
// 	}));
// 	// headBody.rotateY(2 * TWO_PI );
// 	//headBody.rotateX(3 * TWO_PI );
// 	headBody.position.x = -offset.x;
// 	headBody.position.y = -offset.y;
// 	headBody.position.z = offset.z;

// 	scene.add(headBody);
	// box(100);
	//	pop();
	trapo.position.x = -offset.x;
	trapo.position.y = -offset.y;
	trapo.position.z = -offset.z;

}

// Scale the data to fit the screen
// Return it as a vector
function getPos(joint) {
	return createVector(joint.cameraX * width / 4, -joint.cameraY * width / 4, joint.cameraZ * 100);
}

// Draw skeleton
function drawJoint(joint) {

	//console.log("JOINT OBJECT", joint);
	var pos = getPos(joint);

	//Kinect location data needs to be normalized to canvas size
	// push();
	// translate(pos.x, pos.y, pos.z);
	// sphere(5);
	// pop();
}
