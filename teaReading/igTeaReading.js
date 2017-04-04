					var allImage = [];
					var captions = [];				

function triggerSubmit(){
				

				
					console.log("load");
				
					var url;
					var nextURL;
					var id = "";

					//var socket = io.connect();
					
					var isFirstOpenEye = true
					var isDrawing = false
					var myImage = document.getElementById("result");
					var eyeIsClosed = false;
					
		
					// setInterval(function () {
					
					// 	if (isDrawing == false) {
					// 		setID();
					// 	}
						
					// }, 1000)

					// setInterval(function () {
					// 	if (isDrawing == false) {
					// 		socket.emit('closeEye');
					// 	}
					// }, 300000)
		
					// socket.on('startdrawing', function () {

					// 	drawImage(0);
						
					// })
		
		//this is to tell the eye to open/close 
					// socket.on('donedrawing', function () {
					// 	isDrawing = false
					// 	//if(eyeIsClosed) {
					// 		myImage.src = '';
					// 		socket.emit('openEye', null);
					// 	//}
					// })

				//grab the IG handle from twilio
		
					//setID = function() {
					
					//$.getJSON('/instagram', function (data) {

							var IGhandle = $('input[name="usrname"]').val();
							console.log(IGhandle)
							
							//id = data.handle; //input value from text box
							
							console.log("SetId: id is " + IGhandle);
							
							if (id != null) {
							
								url = "https://www.instagram.com/" + IGhandle + "/media/";
								
								//socket.emit('closeEye');
								callMethod(url, grabImage);
								
								// isDrawing = true;
								
							} 
							// else {
							// 	evokeEmergencySolution();
							// }

						//});
					//}

					function evokeEmergencySolution() {
						// drawing the alternative image
						//myImage.src = 'img/duck.gif';
						console.log("inside emergency solution");
					}
					
					//window.setID = setID;
		
					function callMethod(url, successCallback) {

						console.log(url)

						$.ajax({
							url: url,
							type: 'GET',
							success: successCallback,
							error: function(xhr, textStatus, errorThrown) {
								console.dir(xhr);
								console.dir(textStatus);
								console.dir(errorThrown);
								//console.log(errorThrown);
								//evokeEmergencySolution();
							}

						});
						//alert("hey");
						
					}
		//this gives you the whole page as a JSON
				    function grabImage(result) {

				    	//console.log(result);

				    	// get the last url to take me to the next page
				    	// items.caption.text 
			 	    	if (result.items != null && result.items != undefined) {
					    	//var lastURL = result.items.length - 1;

							//loop through to get the image source
							for( var i = 0; i < result.items.length; i++) {
								//var lowRes = result.items[i].images.low_resolution.url;
								var caption = result.items[i].caption.text
										//push to an array to draw
					        	//allImage.push(lowRes);
					        	captions.push(caption);
					        	//console.log(captions)

					        	// var brunch = $('*:contains("#colombia")');

					        	// console.log(brunch)

					        	
										var re = /#colombia/;
										var found = caption.match(re);

										console.log(found);
		
							}

							//this is to go to the next page by using the last url 
							// if (result.more_available && allImage.length < 200) {
							// 	nextURL = "https://www.instagram.com/" + id + "/media/?max_id=" + result.items[lastURL].id;
		
							// 	callMethod(nextURL, grabImage);

							// } else {
							// 	//socket.emit('openEye', null);
							// 	console.log('i should draw image');
							// 	console.log(allImage.length);
							// 	// isFirstOpenEye = true;
							// 	drawImage(0);
							// 	isDrawing = true;
							// 	return
							// }
							
					  	}
				    }
		
				    drawImage = function(imageCounter){
							//add image source to div in order to draw it on html page 
							myImage.src = allImage[imageCounter];
						  	console.log(imageCounter);


						  //add refresh button 

						  	// //new stuff
						  	// var animationLength = 2000;
						  	// var counterEnd = allImage.length - 1;
						  	// var countInterval = animationLength / counterEnd;
						  	// // var a = 1.05;
						  	// var a = 1.09;
						  	// var summatory = 0;
		
						  	// if(imageCounter < allImage.length - 1){
						  	//   imageCounter++;

						  	//   //new stuff
						  	//   var newInterval = (animationLength-summatory) / ( (a-Math.pow(a, -(counterEnd-1))) / (a-1));

						  	//   summatory += newInterval;
						  	//   countInterval = newInterval;

						  	//   setTimeout(function(){
						  	//   	drawImage(imageCounter);
						  	//   },newInterval);

						  	//   // setTimeout(function(){
						  	//   // 	drawImage(imageCounter);
						  	//   // },41);
						  	// }
						  	// else{
						  	//   console.log("finished!");
						  	//   allImage = [];
						  	//   summatory = 0;
						  	  
						  	//   socket.emit('closeEye');
						  	//   eyeIsClosed = true;
						  	//   isDrawing = false;

						  	// }
				    
				    }
				    
				    window.drawImage = drawImage;
		
				};