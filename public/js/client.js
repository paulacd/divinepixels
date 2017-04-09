var IGhandle;

$(document).ready(function() {

    //write your code here
    //when you click submit button, trigger function
    $('#submitButton').click(function() {
        //use the value of text box and pass it to callIG(),
        //the second argument is the callback with the img we got back from IG

        IGhandle = $('input[name="usrname"]').val();
        console.log(IGhandle);
        hitIG(IGhandle);
    })

});


function hitIG(IGhandle) {

var data = {
  handle: IGhandle
}

console.log(data);

function successCallback(data){
  console.log(data);
}

  $.ajax({
      url: '/instagram/' + IGhandle, // this should look like url: 'yourroute/goes here'
      type: 'GET',
      success: successCallback,
      error: function(xhr, textStatus, errorThrown) {
          console.dir(xhr);
          // console.dir(textStatus);
          // console.dir(errorThrown);
          //console.log(errorThrown);
          //evokeEmergencySolution();
      }

  });

}



//----------------------UTIL----------------//


function getColor() {

    var colorThief = new ColorThief();
    var test = colorThief.getColor(document.getElementById("result"));
    var palette = colorThief.getPalette(document.getElementById("scream"), 2);
    console.log(test);
    console.log(palette);

}
