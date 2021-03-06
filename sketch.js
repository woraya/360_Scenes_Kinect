var objects = [];
var selectedObject;


// Three.js variables
var width = window.innerWidth;
var height = window.innerHeight;
var camera3D;  //be careful because p5.js might have something named camera
var scene;  //be careful because our sketch has something named scene
var renderer;

var camRot=0

//key pressed won't work unless you wake up p5 but we are using three.js's "init" funciton instead
function setup(){
}


function keyPressed(){
  if(selectedObject){
    if (keyCode == 37){
      selectedObject.rotation.y =   selectedObject.rotation.y  + Math.PI/18;
    }else if (keyCode == 39){
      selectedObject.rotation.y =   selectedObject.rotation.y  - Math.PI/18;
    }if (keyCode == 38){
      selectedObject.position.z =   selectedObject.position.z  + 10;
    }else if (keyCode == 40){
      selectedObject.position.z =   selectedObject.position.z - 10;
    }
    saveKeying(selectedObject);
  }

}

//Three.js version of p5's "setup"
function init() {
  scene = new THREE.Scene();
  camera3D = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, .1, 1000 );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.getElementById( 'container' ).appendChild( renderer.domElement );

  camera3D.position.z = 5;
  //create a sphere to put the panoramic video on
  var geometry = new THREE.SphereGeometry( 600, 60, 40 );	//500, 60, 40
  geometry.scale( -1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( {
    map: new THREE.TextureLoader().load('ruin.jpg')
  } );
  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );


  //video
  //  var vidObject = addVideo("sintel.mp4");
  //  scene.add(vidObject);
  //  objects.push(vidObject);

	var add_Video = addVideo('cloud.mp4');
	// 	console.log(add_Video);
		scene.add(add_Video);
		objects.push(add_Video);

 htmlInterface();
  //key
  var keyObject = setupKey(); //connect to kinectron an get a keyed image
  scene.add(keyObject );
  objects.push(keyObject );  //put it in the list of things that you check for mouse clicks on

  ///UI
  document.addEventListener( 'mousedown', onDocumentMouseDownCheckObject, false); //check for clicks
  activatePanoControl(camera3D); //field mouse dragggin to move camera
}

//Three.js version of p5's "draw"
// function animate() {
//   requestAnimationFrame(animate);
//   // Update the textures for each animate frame
//   animateVideo();
// 	animateKey();
// 	renderer.render(scene,   camera3D);
// }
//

//Three.js version of p5's "draw"
function animate() {
	requestAnimationFrame(animate);
	// removeEntity();
	camera3D.rotation.y =  Math.PI / 180*camRot/+(2.5);
	camRot = camRot+0.1;
	// Update the textures for each animate frame

	animateVideo();

	animateKey();
	renderer.render(scene, camera3D);
}

init();
animate();

//checks against the list of objects for what you have clicked on to make it the "selectedObject"
function onDocumentMouseDownCheckObject( e ) {
  console.log("clicked object", selectedObject);
  var raycaster = new THREE.Raycaster(); // create once
  var mouse = new THREE.Vector2(); // create once
  mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
  raycaster.setFromCamera( mouse, camera3D );
  var intersects = raycaster.intersectObjects( objects, true );
  var tempobj;
  for( var i = 0; i < intersects.length; i++ ) {
    var intersection = intersects[ i ],
    tempobj = intersection.object;
    //break;
  }
  if (tempobj) selectedObject = tempobj
  console.log("clicked object", selectedObject);

}

// var objects = [];
// var selectedObject;
//
//
// // Three.js variables
// var width = window.innerWidth;
// var height = window.innerHeight;
// var camera3D; //be careful because p5.js might have something named camera
// var scene; //be careful because our sketch has something named scene
// var renderer;
//
// var trapo;
// var camRot=0;
//
// //key pressed won't work unless you wake up p5 but we are using three.js's "init" funciton instead
// function setup() {}
//
//
// function keyPressed() {
// 	if (selectedObject) {
// 		if (keyCode == 37) {
// 			selectedObject.rotation.y = selectedObject.rotation.y + Math.PI / 18;
// 		} else if (keyCode == 39) {
// 			selectedObject.rotation.y = selectedObject.rotation.y - Math.PI / 18;
// 		}
// 		if (keyCode == 38) {
// 			selectedObject.position.z = selectedObject.position.z + 10;
// 		} else if (keyCode == 40) {
// 			selectedObject.position.z = selectedObject.position.z - 10;
// 		}
// 		//saveKeying(selectedObject);
// 	}
// }
//
// //Three.js version of p5's "setup"
// function init() {
// 	scene = new THREE.Scene();
//
// 	// var light = new THREE.DirectionalLight(0xffffff, 1);
// 	light = new THREE.HemisphereLight(0xffffff, 0xffffff, 2.6);
//
// 	light.position.set(0, 00, 0);
//
// 	light.position.set(1, 1, 1).normalize();
// 	scene.add(light);
//
// 	camera3D = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
// 	renderer = new THREE.WebGLRenderer();
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// 	document.getElementById('container').appendChild(renderer.domElement);
//
// 	camera3D.position.z = 5;
//
// 	//create a sphere to put the panoramic video on
// 	// var geometry = new THREE.SphereGeometry(500, 60, 40);
// 	// geometry.scale(-1, 1, 1);
// 	// var material = new THREE.MeshBasicMaterial({
// 	// 	map: new THREE.TextureLoader().load('dess.jpg')
// 	// });
//
// 	var add_Video = addVideo('cloud.mp4');
// 	console.log(add_Video);
// 	scene.add(add_Video);
// 	// var addVideo = new THREE.videoTexture( 'cloud.mp4' );
// 	// var texture = new THREE.VideoTexture( addVideo );
// 	// material.minFilter = THREE.LinearFilter;
// 	// texture.magFilter = THREE.LinearFilter;
// 	// texture.format = THREE.RGBFormat;
//
// 	// var mesh = new THREE.Mesh(geometry, material);
// 	// scene.add(mesh);
//
// 	var geoTrapo = new THREE.BoxBufferGeometry(20, 20, 20);
//
// 	//
// 	// 	var texture = new THREE.TextureLoader().load( "textures/water.jpg" );
// 	// texture.wrapS = THREE.RepeatWrapping;
// 	// texture.wrapT = THREE.RepeatWrapping;
// 	// texture.repeat.set( 4, 4 );
//
// 	//	var geometry = new THREE.SphereGeometry(15, 20, 10);
// 	trapo = new THREE.Mesh(function* () {

// }eoTrapo, new THREE.MeshLambertMaterial({
// 		color: 0xffffff
// 	}));
//
// 	scene.add(trapo);
//
// 	htmlInterface();
//
//
// 	//key
	// setupBodyTracked();
	// var keyObject = setupKey(); //connect to kinectron an get a keyed image
	// scene.add(keyObject);
	// objects.push(keyObject); //put it in the list of things that you check for mouse clicks on
//
// 	///UI
// 	document.addEventListener('mousedown', onDocumentMouseDownCheckObject, false); //check for clicks
// 	activatePanoControl(camera3D); //field mouse dragggin to move camera
// }
//
// //Three.js version of p5's "draw"
// function animate() {
// 	requestAnimationFrame(animate);
// 	removeEntity();
// 	// camera3D.rotateX=camRot;
// 	camera3D.rotation.y =  Math.PI / 180*camRot/-(5.5);
// 	camRot = camRot+0.10;
// 	// Update the textures for each animate frame
//
//
// 	animateKey();
//
//
// 	animateVideo();
// 	renderer.render(scene, camera3D);
// }
//
// init();
// animate();
//
//
// //checks against the list of objects for what you have clicked on to make it the "selectedObject"
// function onDocumentMouseDownCheckObject(e) {
// 	console.log("clicked object", selectedObject);
// 	var raycaster = new THREE.Raycaster(); // create once
// 	var mouse = new THREE.Vector2(); // create once
// 	mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
// 	mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
// 	raycaster.setFromCamera(mouse, camera3D);
// 	var intersects = raycaster.intersectObjects(objects, true);
// 	var tempobj;
// 	for (var i = 0; i < intersects.length; i++) {
// 		var intersection = intersects[i];
// 		tempobj = intersection.object;
// 		//break;
// 	}
// 	if (tempobj) selectedObject = tempobj
// 	console.log("clicked object", selectedObject);
// }
//
// function removeEntity() {
// 	var obj, i;
// 	for (i = scene.children.length - 1; i >= 0; i--) {
// 		obj = scene.children[i];
// 		if (obj.is_ob) {
// 			scene.remove(obj);
//
// 		}
// 	}
// }
