/*
Forever - Algorithmic Composition - Client side p5 canvas lib
Wrriten by juniorxsound (http://phenomenalabs.com)
*/

//Setup the canvas
function preload(){};

function setup(){

		//Setting up a canvas
		createCanvas(window.innerWidth, window.innerHeight);

		//Set the relative bounds on init
		initStartEnd(0, width);

		console.log('p5 Canvas Initialised');
		// drawUsers();

};

function draw(){

		//Yes it means clear
		//clear();

		//Logic for drawing and controlling the users
		if(canvasLocations.length > 0){
			//console.log("it exists");
			drawUsers();
		}
		else {
			//console.log("not yet");
		}
		// drawUsers();

		drawUserGeoLoc();
		//Control the filter over time
		//controlFilter();

		//drawUsersPoints();

		//Water color hit to signify new bar
		// waterHit();

};

function drawUserGeoLoc() {
	for(var i = 0; i < canvasLocations.length; i++){
		locations = canvasLocations[i];
		//console.log('inside canvasLocation array. canvasLocations is: ' + canvasLocations[i]);

		//Draw a rect for each user
		noStroke();
		fill(255, 0, 0);
		// ellipse(552,518,20,20);
		ellipse(locations[0], locations[1], 10, 10);
		// fill(0,0,0, 25);
		// ellipse(locations[0], locations[1], 50 + (sin(angle) * diameter/2) + diameter/2, 50 + (sin(angle) * diameter/2) + diameter/2);
		// noFill();
		// strokeWeight(1);
		// stroke(0);
		// ellipse(locations[0], locations[1], (cos(angle) * diameter/2) + diameter/2, (cos(angle) * diameter/2) + diameter/2);
		// ellipse(locations[0], locations[1], (cos(angle + 0.5) * diameter), (cos(angle + 0.5) * diameter));
		// ellipse(locations[0], locations[1], (cos(angle + 1) * diameter) - diameter, (cos(angle + 1) * diameter) - diameter);

	}

}

//Draw users
function drawUsers(){
	//console.log(canvasLocations);
	//console.log(canvasLocations.length);
	if(start === true){
		//Iterate over the array that stores users pixel postions


		for(var i = 0; i < canvasLocations.length; i++){
			locations = canvasLocations[i];
			//console.log('inside canvasLocation array. canvasLocations is: ' + canvasLocations[i]);
		}

	}

	angle += 0.01;

	// console.log((sin(angle) * diameter/2) + diameter/2);
};

function mousePressed(){

	console.log('length of locations array: ' + locations.length);
	if (locations.length < 5){
		locations.push([mouseX, mouseY]);
		fill(255, 0, 255);
		ellipse(mouseX,mouseY, 15, 15);
	} else if (locations.length == 5) {
		drawLines();
	}
	else {
		console.log('no more locations allowed');
		console.log(locations);
		//once you're done putting in the points, draw the lines
		//serve up the reading
	}
}

function drawLines() {
	strokeWeight(3);
	stroke(255, 0, 255);
	//line 1
	line(locations[0], locations[1], locations[2][0], locations[2][1]);
	//line 2
	line(locations[2][0], locations[2][1], locations[3][0], locations[3][1]);
	//line 3
	line(locations[3][0], locations[3][1], locations[4][0], locations[4][1]);
	//line 4
	line(locations[0], locations[1], locations[4][0], locations[4][1]);
}


	//Resize Canvas to Fit the Screen
	window.onresize = function() {

	  var w = window.innerWidth;

	  var h = window.innerHeight

	  resizeCanvas(w,h);

	  //Get the new bounding box for the map
	  bBox = mapboxmap.getBounds();

	};
