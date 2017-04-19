

function colorFortune() {

  console.log("domR: " + domR + ", " + "domG: " + domG + ", " + "domB: " + domB);

  //1: Dominant color HSV individual color reading

  //var color = tinycolor("rgb(domR, domG, domB)");
  var color = tinycolor({r: domR, g: domG, b: domB});
  console.log(color.toHsvString());


  if (domR > domG && domR > domB){
    //if red is dominant

  } else if (domG > domB && domG > domR) {
    //if green is Dominant

  } else {

  }


  //2: warm vs cool
  //warm: energy, brightness, action
  //cool: calm, peace, serenity




  //3: color scheme
  //comprementary vs analogous vs tiradic










}
