var img = document.createElement('img');
img.setAttribute('src', 'IMG_2300.JPG');
console.log(img);

img.addEventListener('load', function() {

    //retrieve result image, which is the one retrieved from instagram
    var imageResult = document.getElementById("result");

    //add an event listener to it for interface with vibrantjs
    imageResult.addEventListener('load', function() {
        var vibrant = new Vibrant(img);
        var swatches = vibrant.swatches();
        console.log(swatches);
        console.log(swatches.length);
        console.log("it has just loaded, right");
        for (var swatch in swatches) {
            if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
                console.log(swatch, swatches[swatch].getHsl());
                //console.log(swatch);
                //console.log(swatches[swatch].getRgb());
                //console.log("success i guess");
            }
        }
    });
});
