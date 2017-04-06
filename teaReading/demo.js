//$(document).ready(function () {

function getColor() {


    var colorThief = new ColorThief();
    var test = colorThief.getColor(document.getElementById("result"));
    var palette = colorThief.getPalette(document.getElementById("scream"), 2);
    console.log(test);
    console.log(palette);

}

 //});
