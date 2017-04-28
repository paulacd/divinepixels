/*
Forever - Algorithmic Composition - Global Variables
Wrriten by juniorxsound (http://phenomenalabs.com)
*/

//Mapbox
var bBox;
var mapboxmap;
var mapboxusers = {
  "type": "FeatureCollection",
  "features": []
};

//Sockets
var socket;
var users;
var id;
var userGeoPosition;
var serverGeo;
var selector;
var canvasLocations = [];
var locations = [];

//Oscillators
var SQRosc;
var SNosc;
var DRONEosc;

//Envelopes
var env1;
var env2;
var env3;

//Filter
var filter;
var filter2;

//UI
var transportLine = 0;
var cycleCounter = 0;
var start = false;

//User additional circles
var diameter = 30;
var angle = 0;

var playerClick = false;
var scaleClick = false;

var freq;

//Timeline
var relativeStart;
var relativeEnd;

//Dat.gui
var guiParams;

//Store the system logged in
var system = null;

var movingCursor = false;

//Musical Scales
var frequency;
var currentScale;
var pentatonicMin = [59, 62, 64, 67, 69, 71, 74, 76, 79, 81, 83, 86, 88, 91, 93];
var pentatonicLow = [31, 33, 35, 38, 40, 43, 45, 47, 50, 52, 55];
var pentaLowFreq = [];
var pentaFreq = [];

var isLoop = false;

//debug
var mapboxctx;

//points of lines
var pointOneX;
var pointOneY;
var pointTwoX;
var pointTwoY;
var pointThreeX;
var pointThreeY;
var pointFourX;
var pointFourY;
