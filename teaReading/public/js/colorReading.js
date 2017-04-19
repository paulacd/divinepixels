
function colorFortune() {

  console.log("domR: " + domR + ", " + "domG: " + domG + ", " + "domB: " + domB);

//-------------1: Dominant color HSV individual color reading-------------

  //set RGB color of dominant hue
  var color = tinycolor({r: domR, g: domG, b: domB});

  //transform RGB to HSV
  var returnHSV = color.toHsv();

  //Round the float returned to an integer
  var roundedH = Math.round(returnHSV.h);


//determine your reading based on the hue number from the dominant reading
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

  var secColor1 = tinycolor({r: secR1, g: secG1, b: secB1});
  var secColor2 = tinycolor({r: secR2, g: secG2, b: secB2});

  var secColorHSV1 = secColor1.toHsv();
  var secColorHSV2 = secColor2.toHsv();

  var roundedSecColH1 = Math.round(secColorHSV1.h);
  var roundedSecColH2 = Math.round(secColorHSV2.h);

  var cool = 0;

  //if dominant hue is cool, add +1 to the cool variable
  if (roundedH >= 120 && roundedH < 300){
    cool++
  }

  if (roundedSecColH1 >= 120 && roundedSecColH1 < 300){
    cool++
  }

  if (roundedSecColH2 >= 120 && roundedSecColH2 < 300){
    cool++
  }

  if (cool >=2){
    console.log("your life calls for action right now. Bring brightness and energy to everything you do. Remeber that although change might be painful, it's usually a good thing");
  } else {
    console.log("your life calls calmness right now. Take a second to sit with yourself and reflect on your life, peace of mind if needed at this time.");
  }





  //----------------------3: color scheme----------------------------
  //comprementary vs analogous vs tiradic










}
