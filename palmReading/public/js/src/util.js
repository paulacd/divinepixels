/*
Forever - Algorithmic Composition - Client side Util lib
Wrriten by juniorxsound (http://phenomenalabs.com)
*/

//Hello server, I am...
function introduction(socket, who){

	if(who == 'player'){

 		socket.emit('introduction', 'player');

 		console.log('Hi Player, you are connected to the server');

 	} else if (who == 'conductor'){

 		socket.emit('introduction', 'conductor');

 		console.log('Hi Conductor, you are connected to the server');

 	} else {

 		console.log('Error, user type not defined you are not connected to the server');

 	}

};

//Count users into users global variable
function userCounter(print, count, div){

  console.log('There are currently ' + count + ' users connected');

  users = count;

  	//Get the users paragraph and print the user to it
  	document.getElementById("userCount").innerHTML = count;


};

//Get the user's position and either print it or not
function getGeoPosition(print, div){

	if (navigator.geolocation) {

    var options;

    function success(pos) {

      socket.emit('geolocation', pos.coords.latitude + "," + pos.coords.longitude);

    }

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    navigator.geolocation.watchPosition(success, error);

      if(print){

        document.getElementById(div).innerHTML = 'Lat: ' + pos.coords.latitude + ' Long: ' + pos.coords.longitude;

      }

	} else {

	    document.getElementById('error').innerHTML = "Oops, Sorry but it seems your browser doesn't support Geo location, download Chrome?"

	}

};

//Just a handy degrees to radians function
function deg2rad(deg) {

   var rad = deg * Math.PI/180;

   return Math.tan(rad);

};

//Mercator projection calculationf function
//Thanks to Dan Shiffman for this
function mercator(lat) {

  return Math.log(Math.tan(Math.PI / 4 + lat / 2));

};

//Construct the gui parameters object
function initGuiParams() {

  //Mapping
  this.Xscaler = 1000;
  this.Yscaler = 1000;

  //Playback
  this.playSpeed = 0.5;

};

//Initialise dat.gui *and hide it
function initGui(){
      // DatGui Stuff
    window.onload = function(){

      //masterVolume(0);

      guiParams = new initGuiParams();

      var gui = new dat.GUI();

      var mapping = gui.addFolder('Mapping');

      mapping.add(guiParams, 'Xscaler', 500, 2000);

      mapping.add(guiParams, 'Yscaler', 500, 2000);

      // var playback = gui.addFolder('Playback');
			//
      // playback.add(guiParams, 'playSpeed', 0, 10);

      dat.GUI.toggleHide();

    }
}

//Initialise the mapbox API
function initMap(){

    //Mapbox API token
    mapboxgl.accessToken = 'pk.eyJ1IjoianVuaW9yeHNvdW5kIiwiYSI6ImNpdnlyMG9hZjAyamwydHRhNGRqZ3BhZGQifQ.hIDvif6XFSretP-RSqBtHQ';

    var mapParams = {};

    if( system == 'mobile' ){

			mapParams = {
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/dark-v9', //stylesheet location
      center: [-74,40.723],
      zoom: 10, // starting zoom
      zoomControl: true,
			//bearing: 26
      };

    } else if( system == 'desktop' ) {

      mapParams = {
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/dark-v9', //stylesheet location
      center: [-74,40.723],
      zoom: 12.5, // starting zoom
      zoomControl: true,
			//bearing: 26
      };

    }

		//Or's map: 'mapbox://styles/juniorxsound/ciwdqlveu00102pnatdlaaes0'
		//dark version: 'mapbox://styles/mapbox/dark-v9'
		//

		//Or's styling:
		// mapParams = {
		// container: 'map', // container id
		// style: 'mapbox://styles/juniorxsound/ciwdqlveu00102pnatdlaaes0', //stylesheet location
		// center: [-73.98, 40.74278],
		// zoom: 11, // starting zoom
		// zoomControl: false
		// };

    //Create a new map object
    mapboxmap = new mapboxgl.Map(mapParams);

    //Setup event listeners and invterval to refetch the users
    mapboxmap.on('load', function () {
			mapboxmap.setPaintProperty('road-main-case', 'line-color', '#000000');
      window.setInterval(function() {
          mapboxmap.getSource('drone').setData(mapboxusers);
      }, 2000);

      //Add the users layer to the map
      mapboxmap.addSource('drone', { type: 'geojson', data: mapboxusers });

			console.log(mapboxusers);

      //Instead of using the mapbox API to draw the users I amp these locations with p5.js and draw the users in the draw function
      // mapboxmap.addLayer({
      //     "id": "drone",
      //     "type": "symbol",
      //     "source": "drone",
      //     "layout": {
      //         "icon-image": "rocket-15"
      //     }
      // });
  });

};

$("#submitButton").click(function() {
	getCoords(geocoder, map);
});


function getCoords(geocoder, resultsMap) {
	var address = document.getElementById('home').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
}


//Is it devisable by two?
function isOdd(num) {

  return num % 2;

};

//A global function to determine wheter it's mobile or not
//written by Michael Zaporozhets
window.mobileAndTabletcheck = function() {

  var check = false;

  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

  return check;

};

//Return the deafult cursor
function defaultCursor() {

  document.body.style.cursor = 'default';

};

//Change to the drag corsur
function dragCursor(){

  document.body.style.cursor = 'col-resize';

};

//Initialise the start and end positions in pixels
function initStartEnd(start, end){

  relativeStart = start;

  relativeEnd = end;

};


function analyseServerGeoData(geodata){

    //Clean the array anytime the server sends over data
    // canvasLocations = [];

    //mapboxusers.features = [];

    //Assign this data globally
    serverGeo = geodata;

    //Dont start the transport before data has arrived and wait a little just to be safe
    if(serverGeo != 0 && start === false){

      setTimeout(function(){

        // start = true;

        // console.log('Cursor started');

      }, 2000);

    };

    //Iterate over the amount of clients and map the values to canvas
    for(var i = 0; i < Object.keys(geodata).length; i++){

      var latlong = serverGeo[Object.keys(serverGeo)[i]];

      //Map the boundbox LatLong to pixel space
      var mappedY = map(latlong[0], bBox._sw.lat,
bBox._ne.lat, height, 0);
      var mappedX = map(latlong[1], bBox._sw.lng, bBox._ne.lng, 0, width);


      //Store user pixel location for p5
      canvasLocations.push([mappedX, mappedY]);
			console.log("**********************");
			console.log(canvasLocations);
			console.log("**********************");

      //Store user location for MapBox
      var userGeoJson = {
        "type": "Feature",
        "geometry": {
              "type": "Point",
              "coordinates": [latlong[1], latlong[0]]
            }
      };

      //Add mapbox users
      mapboxusers.features.push(userGeoJson);

    };

    // if (start != true){
		//
    //   changeNote();
		//
    // };

};

//Make the streets change color on note hit
function streetHit(sustain){

          mapboxmap.setPaintProperty('road-main-case', 'line-color', '#000000');

        //  setTimeout(function(){
				 //
        //   mapboxmap.setPaintProperty('road-main-case', 'line-color', '#ffffff');
				 //
        //  }, sustain);

};

function waterHit(){

  if(cycleCounter != 0 && transportLine == relativeStart) {

    mapboxmap.setPaintProperty('water', 'fill-opacity', 1);

    setTimeout(function(){

      mapboxmap.setPaintProperty('water', 'fill-opacity', 0);

    }, 100);

  };

};
