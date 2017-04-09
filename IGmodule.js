module.exports = function() {

        var Q = require('q');
        var IGfetch = {};

        IGfetch.fetchIGurl = function(ig_handle) {

            return Q.promise(function(resolve, reject, notify) {

                var path = '';
                console.log("load");

                var url;
                var nextURL;
                var id = "";
                var foundPic = false;
                console.log("SetId: id is " + IGhandle);

                if (id != null) {
                    url = "https://www.instagram.com/" + IGhandle + "/media/";
                    callMethod(url);
                }

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
                                    brunchImgs.push(standRes);
                                    foundPic = true;
                                }
                            }

                        }
                        console.log(brunchImgs);

                        //this is to go to the next page by using the last url
                        if (result.more_available && foundPic == false) {
                            console.log('checking more pages');

                            nextURL = "https://www.instagram.com/" + IGhandle + "/media/?max_id=" + result.items[lastURL].id;

                            //console.log(nextURL)
                            callMethod(nextURL);

                        }
                    }
                }



            });

            return IGfetch;

        };

        function callMethod(url) {
            requestify.get(url).then(function(response) {
                // Get the response body
                console.log(response.getBody());
                grabImage(response.getBody());
            });

        };
