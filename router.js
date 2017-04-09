var lastMessage = "";
var IGline = [];

// Map routes to controller functions
module.exports = function(app) {
    // Twilio SMS webhook route
    // app.post('/message', webhook);

    //send IG handle to IG script
    app.get('/instagram', testFunction);

};

function testFunction(){

  console.log('inside test function'); 
}

//----------INSTAGRAM CODE---------------
var hitIG = function(request, response) {
    // make get request to instagram using lastmessage
    //for debugging purposes
    // response.send("hello")
    // console.log('received request for handle');
    //
    // console.log('IGline length is: ' + IGline.length);
    // if (IGline.length > 0) {
    //
    //     var next = IGline[0];
    //     console.log('next is: ' + next);
    //     IGline.shift();
    // 	// send instagram back to wip in response
    //     response.json({ "handle" : next });
    //
    // }

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

    regexArray.push(reg1);
    regexArray.push(reg2);
    regexArray.push(reg3);
    regexArray.push(reg4);
    regexArray.push(reg5);
    regexArray.push(reg6);
    regexArray.push(reg7);


    // function triggerSubmit() {

    console.log("load");

    var url;
    var nextURL;
    var id = "";
    var foundPic = false;

    var isFirstOpenEye = true
    var isDrawing = false
    var myImage = document.getElementById("result");
    var eyeIsClosed = false;


    //grab the IG handle from twilio

    //setID = function() {

    //$.getJSON('/instagram', function (data) {

    console.log(IGhandle)

    //id = data.handle; //input value from text box

    console.log("SetId: id is " + IGhandle);

    if (id != null) {

        var IGhandle = $('input[name="usrname"]').val();

        _url = "https://www.instagram.com/" + IGhandle + "/media/";
        //socket.emit('closeEye');
        callMethod(grabImage, _url);

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


    //this gives you the whole page as a JSON
    function grabImage(result) {

        //console.log(result);

        // get the last url to take me to the next page
        // items.caption.text
        if (result.items != null && result.items != undefined) {
            var lastURL = result.items.length - 1;

            //loop through to get the image source

            console.log(result.items.length);

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
                        brunchImgs.push(standRes);
                        foundPic = true;
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
                console.log(nextURL)

                //console.log("attempt grabImage");
                callMethod(nextURL, grabImage);
                //console.log("done grabImage");


            }

            drawImage(0);

        }
    }

    function drawImage(imageCounter) {
        if (brunchImgs.length > 0) {
            //add image source to div in order to draw it on html page
            myImage.src = brunchImgs[0];
            //console.log('brunchImgs: ' + brunchImgs[0]);
        }

        //add refresh
        if (foundPic) {
            console.log('calling getColor()');
            //getColor();
        }


    }

    window.drawImage = drawImage;

}
