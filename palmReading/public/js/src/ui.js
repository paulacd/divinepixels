/*
Forever - Algorithmic Composition - Client side UI lib
Wrriten by juniorxsound (http://phenomenalabs.com)
*/


//Functionality to determine which device

if(!window.mobileAndTabletcheck()){

	system = 'desktop';

	console.log('You are logging from a desktop, nice!');

} else {

	system = 'mobile';

	console.log('Your are logging from a mobile, YES!');

}

//Function for fading in & out the sound on tab focus and blur
window.onblur = function(){

	masterVolume(0, 0.5);

};

window.onfocus = function(){

	if(getMasterVolume() != 1){

		masterVolume(1.0, 0.5);

	}

};

function initInterface(){

	$(document).ready(function(){

		//Ui Intro
		//$('#explain').delay(1000).fadeIn(1000, function(){

			//$('#explain2').delay(500).fadeIn(1000, function(){

				//$('#explain2').delay(3000).fadeOut(500,function(){

					//$('#explain').fadeOut(500, function(){

						//$('#headphones').delay(250).fadeIn(500, function(){

							start = true;

							$('#headphones').delay(3000).fadeOut(500, function(){

								$('#intro-container').fadeOut(1000);

							});

						//});

					//});

				//});

			//});

		//});


		//Add the class to the info bar
		$('#info-bar').addClass('portrait');

		//Player hover&click effect
		$('#userIcon').click(function(){

			if(playerClick === false){

				playerClick = true;

				$('#userIcon').css({opacity: 1});

			} else {

				playerClick = false;

				$('#userIcon').css({opacity: 0.5});

			}

		});

		$('#userIcon').mouseenter(function(){

			$('#userCount').fadeIn(250);

			defaultCursor();

		});

		$('#userIcon').mouseleave(function(){

			$('#userCount').fadeOut(250);

		});

		//Scale hover effect
		// $('#scaleIcon').click(function(){
		//
		// 	if(scaleClick === false){
		//
		// 		scaleClick = true;
		//
		// 		$('#scaleIcon').css({opacity: 1});
		//
		// 	} else {
		//
		// 		scaleClick = false;
		//
		// 		$('#scaleIcon').css({opacity: 0.5});
		//
		// 	}
		//
		// });
		//
		// $('#scaleIcon').mouseenter(function(){
		//
		// 		$('#currentScale').fadeIn(250);
		//
		// 		defaultCursor();
		//
		// });
		//
		// $('#scaleIcon').mouseleave(function(){
		//
		// 	$('#currentScale').fadeOut(250);
		//
		// });
	});

}

// function assumeScale(){
//
// 	if(currentScale == pentaFreq){
//
// 		// console.log('pentatonic C');
// 		$('#currentScale').html("The current scale is Pentatonic C");
//
// 	}
// 	//Add other conditionals for other scales
// }

function assumeUsers(){
	if(users == 1){
		$('#userCount').html("You are all alone, invite some friends");
	} else if(users > 1){
		$('#userCount').html("There are currently " + users + " players connected");
	}
}
