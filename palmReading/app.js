/*
Forever - Algorithmic Composition - Server code (ES6)
Wrriten by juniorxsound (http://phenomenalabs.com)
*/

'use strict'

//////EXPRESS////////
const express = require('express');
const app = express();

////////HTTP/////////
const http = require('http').createServer(app);

//Port and server setup
let port = process.env.PORT || 5555;

//Server
let server = app.listen(port);

//Console the port
console.log('Server is running localhost on port: ' + port );

/////SOCKET.IO///////
const io = require('socket.io').listen(server);

////////EJS//////////
const ejs = require('ejs');

//GLOBAL VARIABLES///
let usersCounter;
let sockets = {};
let geolocations = {};
let userType;

//Setup the views folder
app.set("views", __dirname + '/views');

//Setup ejs, so I can write HTML(:
app.engine('.html', ejs.__express);
app.set('view-engine', 'html');

//Setup the public client folder
app.use(express.static(__dirname + '/public'));

//Socket setup
io.on('connection', client=>{

	//Players and conductors introduce yourself
	client.on('introduction', who=>{

		userType = who;

		if ( userType == 'conductor' ){

			//Conductor connected log to server
			console.log('A conductor connected');

		} else if ( userType == 'player' ){

				//Add the user to the identifiening object
				sockets[client.id] = client;

				usersCounter = Object.keys(sockets).length;

				//User connected log
				console.log('A player connected');
				console.log('There are currently ' + usersCounter + ' players connected');

				// Everytime a user connects notify all users and pass a number
				io.sockets.emit('user', usersCounter);

		} else {

				console.log('Error, unknowen user type');

		}

	});

	client.on('geolocation', geodata=>{

		//Split Lat and Long into a 2 slot array
		let processGeoData = geodata.split(',');

		//If there is geo data and the user is a player make magic
		if (geodata != null && userType == 'player'){

			geolocations[client.id] = processGeoData;

		}

		if(Object.keys(geolocations) != 0 ){

			io.sockets.emit('serverGeoData', geolocations);

		}

	});

		//Disconnecting a user
		client.on('disconnect',()=>{

			if ( userType == 'player' ){

				//Remove the user id from the userTable object
				delete sockets[client.id];

				//Delete the geodata stored by the client's ID
				delete geolocations[client.id];

				//Another one bites to dust
				usersCounter = Object.keys(sockets).length;

				if( usersCounter == 0 ){
					console.log('A player disconnected');
					console.log('There are currently no players connected');
				} else {

					//User disconnected log
					console.log('A player disconnected');
					console.log('there are currently ' + usersCounter + ' player connected');

				}

				userType == 'player';

			} else if ( userType == 'conductor' ) {

				console.log('A conductor dissconected');

				userType == 'conductor';

			}

			// //Everytime a user disconnects notify all users and pass a number
			io.sockets.emit('user', usersCounter);

		});

});

/////////////////////
//////ROUTER/////////
/////////////////////

//Client view
app.get('/', (req, res) => {

	res.render('index.html');

});

//Conductor view
app.get('/conductor.html', (req, res) => {

	res.render('conductor.html');

});

//404 view
app.get('/*', (req, res) => {

	res.render('404.html');

});

// setInterval(function(){
// // //Logs for data in the server
// // 	// console.log(usersCounter);
// // 	// console.log(sockets);
// // 	// console.log(geolocations);
// //
// // 	//If geolocations has geodata emit it to all users every minute
//
//
// }, 6000);
