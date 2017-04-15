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
		drawUsers();

};

function draw(){

		//Yes it means clear
		//clear();

		//Logic for drawing and controlling the users
		// drawUsers();

		//Control the filter over time
		//controlFilter();

		//Water color hit to signify new bar
		// waterHit();

};

//Draw users
function drawUsers(){
	if(start === true){
		//Iterate over the array that stores users pixel postions
		console.log(canvasLocations);
		
		for(var i = 0; i < canvasLocations.length; i++){
			locations = canvasLocations[i];
			console.log('inside canvasLocation array. canvasLocations is: ' + canvasLocations[i]);

			//Draw a rect for each user
			noStroke();
			fill(255, 0, 0);
			ellipse(locations[0], locations[1], 100, 100);
			// fill(0,0,0, 25);
			// ellipse(locations[0], locations[1], 50 + (sin(angle) * diameter/2) + diameter/2, 50 + (sin(angle) * diameter/2) + diameter/2);
			// noFill();
			// strokeWeight(1);
			// stroke(0);
			// ellipse(locations[0], locations[1], (cos(angle) * diameter/2) + diameter/2, (cos(angle) * diameter/2) + diameter/2);
			// ellipse(locations[0], locations[1], (cos(angle + 0.5) * diameter), (cos(angle + 0.5) * diameter));
			// ellipse(locations[0], locations[1], (cos(angle + 1) * diameter) - diameter, (cos(angle + 1) * diameter) - diameter);

			//If you hover over the user icon
			if(playerClick === true){
				noStroke();
				fill(0);
				if(isOdd(i+1) == true){
					text(i + 1, locations[0] - 15, locations[1] - 15);
				} else {
					text(i + 1, locations[0] + 15, locations[1] - 15);
				}

			}

			//If you hover over the scale icon
			if(scaleClick === true){
			  var colorMult = 200;
				for(var scaleSqr = 0; scaleSqr <= height; scaleSqr += height/5){
					colorMult -= 25;
					stroke(0,0,0,100);
					strokeWeight(1)
					fill(colorMult,colorMult,colorMult, 50);
					rect(0,scaleSqr - height/5, width, scaleSqr);
				}

			}

		}

	}

	angle += 0.01;

	// console.log((sin(angle) * diameter/2) + diameter/2);
};

function mousePressed(){
	canvasLocations.push([mouseX, mouseY]);
}


	//Resize Canvas to Fit the Screen
	window.onresize = function() {

	  var w = window.innerWidth;

	  var h = window.innerHeight

	  resizeCanvas(w,h);

	  //Get the new bounding box for the map
	  bBox = mapboxmap.getBounds();

	};
