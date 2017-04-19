var domR;
var domG;
var domB;

var secR1;
var secG1;
var secB1;

var secR2;
var secG2;
var secB2;

// A $( document ).ready() block.
$(document).ready(function() {
    console.log("script loaded!");

    var colorThief = new ColorThief();


    $("#submitButton").click(function() {

        var user = $("#ig").val();
        console.log('user: ', user);

        // do some basic error checking
        if (user != "undefined" && user.length > 0) {

            checkInstagram(user).then(function(response) {
                // The first runs when the promise resolves, with the request.reponse
                // specified within the resolve() method.

                // Get a reference to the body element, and create a new image object
                var body = document.querySelector('body');
                //var myImage = new Image();
                // Call the function with the URL we want to load, but then chain the
                // promise then() method on to the end of it. This contains two callbacks

                console.log(response);
                // myImage.src = response;
                var myImage = document.getElementById('result');
                myImage.src = response;

                // The second runs when the promise
                // is rejected, and logs the Error specified with the reject() method.
            }, function(Error) {
                console.log(Error);
            });

        }



    });

    function checkInstagram(username) {
        // Create new promise with the Promise() constructor;
        // This has as its argument a function
        // with two parameters, resolve and reject
        return new Promise(function(resolve, reject) {

            // Standard XHR to load an image
            var request = new XMLHttpRequest();
            request.open('GET', '/instagram/' + username);

            // When the request loads, check whether it was successful
            request.onload = function() {
                if (request.status === 200) {
                    // If successful, resolve the promise by passing back the request response
                    resolve(request.response);
                } else {
                    // If it fails, reject the promise with a error message
                    reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
                }
            };

            request.onerror = function() {
                // Also deal with the case when the entire request fails to begin with
                // This is probably a network error, so reject the promise with an appropriate message
                reject(Error('There was a network error.'));
            };
            // Send the request
            request.send();
        });
    }

    //call getColor() once it's finished loading
    $("#result").on('load', function() {
        getColor();
    });

    function getColor() {

        // var img = CanvasImage(uniqueId+'.jpg');
        // console.log(img);

        var dominant = colorThief.getColor(document.getElementById("result"));
        // var dominant = colorThief.getColor(img);
        var palette = colorThief.getPalette(document.getElementById("result"), 2);
        console.log(dominant);
        console.log(palette);

        //change div colors based on palette
        $('#dominant').css('background-color',
            'rgb(' + dominant[0] + ',' + dominant[1] + ',' + dominant[2] + ')');

            domR = dominant[0];
            domG = dominant[1];
            domB = dominant[2];

            var paletteColors = [];

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {


                paletteColors.push(palette[i][j]);
            }
        }

        //set secondary color palette
        $('#secondary1').css('background-color',
            'rgb(' + paletteColors[3] + ',' + paletteColors[4] + ',' + paletteColors[5] + ')');

        $('#secondary2').css('background-color',
            'rgb(' + paletteColors[6] + ',' + paletteColors[7] + ',' + paletteColors[8] + ')');


        console.log(paletteColors)

        console.log('div colors changed');

        secR1 = paletteColors[3];
        secG1 = paletteColors[4];
        secB1 = paletteColors[5];

        secR2 = paletteColors[6];
        secG2 = paletteColors[7];
        secB2 = paletteColors[8];

        colorFortune();
    }

});
