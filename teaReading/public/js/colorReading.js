

function colorFortune() {

  console.log("domR: " + domR + ", " + "domG: " + domG + ", " + "domB: " + domB);

//-------------1: Dominant color HSV individual color reading-------------

  //var color = tinycolor("rgb(domR, domG, domB)");
  var color = tinycolor({r: domR, g: domG, b: domB});
  //console.log(color.toHsv());
  var returnHSV = color.toHsv();
  //console.log(color.toHsvString());

    //console.log(Math.round(returnHSV.h));
    // Math.round(returnHSV.s);
    // Math.round(returnHSV.v);

  var roundedH = Math.round(returnHSV.h);

//if red (0 or 360)
if (roundedH >= 0 && roundedH < 20){
  //energy, war, danger, strength, power, determination, passion, desire, love

  console.log("you're a person full of power and determination, but beware! your passion might lead to some dangerous situations");

//if orange (30)
} else if (roundedH >= 20 && roundedH < 40){
  //joy, enthusiasm, fascination, happiness, creativity, determination, attraction
  //success, encouragement, stimulation

  console.log("joy and enthusiasm fill your life right now. It's a moment for you to explore your creativitiy and seek stimulation. Success will follow");

//if yellow (60)
} else if (roundedH >= 50 && roundedH < 70){
  //cheers, bright, honor, loyalty, cowardice, happiness, intellect, energy

  console.log("your are surrounded by a cheerfulness that cannot be denied. Your intellect is being energized and the loyalty of your friends is stronger than ever. Rejoice in this moment of your life");

//if green (120)
} else if(roundedH >= 110 && roundedH < 130){
  //growth, harmony, freshness, fertility, confidence, wisdom

  console.log("There is a wisdom to your actions lately that can't be denied. You are finding growth and harmony in your life and that will lead you to places were your confidence will shine");

//if blue (240)
} else if(roundedH >= 230 && roundedH < 250){
  //stability, healing, depth, trust, loyalty, faith, truth

  console.log("life is giving you a moment of stability and healing. Take it. Take the moment to regain your trust and faith in others and yourself. Only good things will come of that");

//if purple (270)
} else if (roundedH >= 260 && roundedH < 280){
  //power, nobility, luxury, ambition, dignity, mystery, magic

  console.log("There is power to your actions right now. A mysticism surrounds you that will power your ambition and lead you to new heights. Embrace it");

//if pink (300)
} else if (roundedH >= 290 && roundedH < 310){
  //playful, nice, sweet, romantic, tender

  console.log("life is giving a sweet tender kiss to you right now. Be playful, embrace the romance, smell the love in the air");

//if red
} else {
  //energy, war, danger, strength, power, determination, passion, desire, love

console.log("you're a person full of power and determination, but beware! your passion might lead to some dangerous situations");

}




  //---------------------2: warm vs cool-----------------------
  //warm: energy, brightness, action
  //cool: calm, peace, serenity




  //----------------------3: color scheme----------------------------
  //comprementary vs analogous vs tiradic










}
