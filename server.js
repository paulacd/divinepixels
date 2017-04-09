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

var pageCount; // this variable keeps track of the number of pages you've searched through

//------------------SERVER---------------------------//

'use strict'
var bodyParser = require('body-parser');
var requestify = require('requestify');
var request = require('request')
var fs = require('fs');
var path = require('path')

var short = require('shortid')
//Express
var https = require('https'),
    pem = require('pem'),
    express = require('express');

//HTTP
var port = process.env.PORT || 5555;

pem.createCertificate({days:1, selfSigned:true}, function(err, keys){

  var app = express();

  console.log("Our server is running on localhost:" + port);

  // var ejs = require('ejs');

  //Server setup
  // app.engine('.html', ejs.__express);
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
        console.log('main route');
    });

    app.get('/instagram/:handle', function(req, res) {
        console.log('in instagram router');
        console.log("Username is: " + req.params.handle);

        var IGhandle = req.params.handle;
        var firstPageUrl = "https://www.instagram.com/" + IGhandle + "/media/";

        // call the hitIG function().  This function returns a promise, which means that once
        // the async code has finished executing, the function resolves the image url.
        // this means that the function passed to the .then() method takes whatever gets
        // resolved by the original promise as an argument.  In this case, the image url 'bubbles up'
        // once the promise resolves so you can use it in the function passed to .then()
        // this allows us to send the image url to the front-end as the response to the front-end's
        // original request

        hitIG(IGhandle, firstPageUrl)
            .then( function(imgUrl) {
                console.log("Sending URL to front-end: ", imgUrl);

                var uniqueId = short.generate() // create a unique 6 char code for each images file name
                // res.send(imgUrl);
                var imgpath = path.join(__dirname, 'public', uniqueId+'.jpg')

                request.head(imgUrl, function(err, resp, body){
                  request(imgUrl).pipe(fs.createWriteStream(imgpath)).on('close', function(){
                    res.send(uniqueId+'.jpg');
                  })
                })

                // var writer = fs.WriteFile("imgimg.jpg", imgUrl, {encoding: 'base64'}, function(data){
                //     console.log(data);
                // });

                // var s = fs.createReadStream(imgUrl, { encoding: 'base64'});
                //
                // s.on('open', function () {
                //   console.log('opening read stream');
                //     res.set('Content-Type', 'image/jpeg');
                //     s.pipe(fs.createWriteStream("./imgimgimg.jpg", { encoding: 'base64'}));
                //     console.log(res);
                // });
                // s.on('error', function (err) {
                //     // something went wrong
                //     console.log('there was an error');
                //     console.log(err);
                // });

            }); //end of then



    }); //end of app.get


}); // end of pem



//-----------------UTIL------------------------------//

// The first promise in the promise-chain gets the response body
function hitIG(IGhandle, url) {

    console.log("hitting instagram");

    return new Promise( function(resolve, reject) {

        if (IGhandle != null){

            // make the request to the instagram server
            requestify.get(url).then(function(response) {

                // the findMatch function returns a promise where the data being
                // resolved is the image url
                findMatch(IGhandle, response.getBody()).then(function(data){

                    console.log('resolving hitIG');
                    resolve(data);

                }); // end of findMatch

            }); // end of requestify

        } // end of if-statement

    }); // end of promise

}

// this function takes in a page result as json object and searches through it.
//
function findMatch(IGhandle, result) {

    var nextURL;
    var id = "";
    var foundPic = false;

    console.log('searching for match');

    return new Promise( function(resolve, reject) {

        if (result.items != null && result.items != undefined) {

            var lastURL = result.items.length - 1;

            //loop through to get the image source

            //console.log(result.items.length);

            for (var i = 0; i < result.items.length; i++) {

                // check to see whether there is a caption assosciated with the picture
                if (result.items[i].caption != null) var caption = result.items[i].caption.text;
                else continue; // 'continue' skips to the next iteration of the loop

                // because we only need one picture, we can break out of the loop if we've found a picture already
                // It isn't necessary to keep looking because we resolve the promise as soon as we find
                // a result

                if(foundPic) break;

                // loop through the array of hashtags to match
                for (var j = 0; j < regexArray.length; j++) {

                    var found = caption.match(regexArray[j]);

                    console.log('trying to match hashtag: ' + regexArray[j]);

                    //if picture is found, put in an array and display
                    if (found) {

                        console.log(' found: ' + regexArray[j]);

                        var standRes = result.items[i].images.standard_resolution.url;
                        foundPic = true;

                        console.log('resolving findMatch');
                        resolve(standRes);
                        break;
                    }

                }

            }

            // If we fail to find a match, we need to check the next page, we do
            // this by recursively calling the findMatch function inside itself.
            // Note that if we get to this stage, we havent found a match yet so
            // the promise hasn't resolved yet - we only do this inside the .then()
            // of the recursive findMatch() call.
            if (result.more_available && foundPic == false) {
                console.log('checking more pages');
                //console.log(result.items[lastURL].id);

                nextURL = "https://www.instagram.com/" + IGhandle + "/media/?max_id=" + result.items[lastURL].id;
                //console.log(nextURL)

                requestify.get(nextURL).then(function(response) {

                    console.log('We didnt find a match, calling findMatch() recursively');

                    findMatch(IGhandle, response.getBody()).then(function(data){
                        console.log('inside findMatch(recursive): ' + data);
                        console.log('resolving recursive');
                        resolve(data);
                    });

                }); // end of requestify
            } // end of if statement
        }

    }); // end of promise return

}
