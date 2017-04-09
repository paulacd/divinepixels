//Our awasome boiler plate server

//global vars
var allImage = [];
var captions = [];
var regexArray = [];
var brunchImgs = [];

//find a picture based on a caption
var reg1 = /#brunch/;
var reg2 = /#brunching/;
var reg3 = /#breakfast/;
var reg4 = /#sundaybrunch/;
var reg5 = /#eggs/;
var reg6 = /#pancakes/;
var reg7 = /#bacon/;

//push all hashtags
regexArray.push(reg1);
regexArray.push(reg2);
regexArray.push(reg3);
regexArray.push(reg4);
regexArray.push(reg5);
regexArray.push(reg6);
regexArray.push(reg7);

//------------------SERVER---------------------------//

'use strict'

var bodyParser = require('body-parser');
var requestify = require('requestify');

//Express
var https = require('https'),
    pem = require('pem'),
    express = require('express');

//HTTP
var port = process.env.PORT || 5555;
pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
  var app = express();

  console.log("Our server is running on localhost:" + port);

  var ejs = require('ejs');

  //Server setup
  app.engine('.html', ejs.__express);
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.json());

  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Server
https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(port);



//------------------ROUTER---------------------------//

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/instagram/:handle', function(req, res) {
    console.log('in instagram router');
    //hitIG();
    console.log(req.params.handle);
    var IGhandle = req.params.handle;

    hitIG(IGhandle, function(path) {

      // make sure hitIG returns the image URL

      // use image code that Rune pasted below to respond with image

      res.send(path);

    });



});


});





//-----------------UTIL------------------------------//

function hitIG(IGhandle, callback) {


    console.log("load");

    var url;
    var nextURL;
    var id = "";
    var foundPic = false;

    //var isFirstOpenEye = true
    var isDrawing = false
    // var myImage = document.getElementById("result");
    var eyeIsClosed = false;

    //grab the IG handle from twilio

    //setID = function() {

    //$.getJSON('/instagram', function (data) {

    //console.log(IGhandle)

    //id = data.handle; //input value from text box

    console.log("SetId: id is " + IGhandle);

    if (id != null) {

        url = "https://www.instagram.com/" + IGhandle + "/media/";
        //socket.emit('closeEye');
        // callMethod(url, grabImage);

        callMethod(url);

          // callMethod('/instagram', function(res){
          //   console.log('response');
          // });

        // isDrawing = true;

    }

    function callMethod(url){
        requestify.get(url).then(function(response) {
    // Get the response body
            console.log(response.getBody());
            grabImage(response.getBody());
        });

    };

    function evokeEmergencySolution() {
        // drawing the alternative image
        //myImage.src = 'img/duck.gif';
        console.log("inside emergency solution");
    }

    //window.setID = setID;


    //this gives you the whole page as a JSON
    function grabImage(result) {

        //console.log(result);

        // get the last url to take me to the next page
        // items.caption.text
        if (result.items != null && result.items != undefined) {
            var lastURL = result.items.length - 1;

            //loop through to get the image source

            //console.log(result.items.length);

            for (var i = 0; i < result.items.length; i++) {

                if (result.items[i].caption != null) var caption = result.items[i].caption.text;
                else continue; // 'continue' skips to the next iteration of the loop

                // console.log(caption)
                //push to an array to draw
                //allImage.push(lowRes);
                captions.push(caption);
                //console.log(captions)
                // console.log(brunch)

                for (var j = 0; j < regexArray.length; j++) {

                    var found = caption.match(regexArray[j]);

                    //if picture is found, put in an array and display
                    if (found) {

                        console.log(' found: ' + regexArray[j]);

                        var standRes = result.items[i].images.standard_resolution.url;

                        // load image
                        // return image to client

    // var s = fs.createReadStream(IMAGEURL);
    // s.on('open', function () {
    //     res.set('Content-Type', 'image/jpeg');
    //     s.pipe(res);
    // });
    // s.on('error', function () {
    //     // something went wrong
    // });

                        saveImage(standRes, function(localUrl) {
                          //callback(result.items[i].images.standard_resolution.url);
                          callback(localUrl);

                          //brunchImgs.push(standRes);
                          brunchImgs.push(localUrl);
                          foundPic = true;

                        });
                    }


                }

                //console.log(found);

            }
            console.log(brunchImgs);

            //this is to go to the next page by using the last url
            if (result.more_available && foundPic == false) {
                console.log('checking more pages');
                //console.log(result.items[lastURL].id);

                nextURL = "https://www.instagram.com/" + IGhandle + "/media/?max_id=" + result.items[lastURL].id;
                //console.log(nextURL)

                //console.log("attempt grabImage");
                // callMethod(nextURL, grabImage);
                //console.log("done grabImage");
                callMethod(nextURL);


            }

            drawImage(0);

        }
    }

    function saveImage(url) {
      var localUrl = "";

      requestify.get(url).then(function(response) {
  // Get the response body
          // console.log(response.getBody());
          // grabImage(response.getBody());

          //write image to disk
          // var fs = require('fs');
          //
          // fs.writeFile('message.txt', 'Hello Node', function (err) {
          //   if (err) throw err;
          //   console.log('It\'s saved!');
});
          console.log(response);
      });

      return localUrl;
    }

    function drawImage(imageCounter) {
        if (brunchImgs.length > 0) {
            //add image source to div in order to draw it on html page
            // myImage.src = brunchImgs[0];
            console.log('length of images is: ' + brunchImgs.length);
            //console.log('brunchImgs: ' + brunchImgs[0]);
        }

        //add refresh
        if (foundPic) {
            console.log('calling getColor()');
            //getColor();
        }


    }

    //window.drawImage = drawImage;

    callback(brunchImgs[0]);


}
