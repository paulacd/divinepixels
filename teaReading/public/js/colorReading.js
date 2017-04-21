
function colorFortune() {

  //console.log("domR: " + domR + ", " + "domG: " + domG + ", " + "domB: " + domB);

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
//random word from the red color 
  words.red[Math.floor(Math.random(0, words.red.length))]

//if orange (30)
} else if (roundedH >= 20 && roundedH < 40){
  //joy, enthusiasm, fascination, happiness, creativity, determination, attraction
  //success, encouragement, stimulation

  console.log("joy and enthusiasm fill your life right now. It's a moment for you to explore your creativity and seek stimulation. Success will follow");

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
    console.log("your life calls for action right now. Bring brightness and energy to everything you do. Remember that although change might be painful, it's usually a good thing");
  } else {
    console.log("your life calls for calmness right now. Take a second to sit with yourself and reflect on your life, peace of mind is needed at this time.");
  }



  //----------------------3: color scheme----------------------------
  //complementary vs analogous vs tiradic

//COMPLEMENTARY
//Colors that are opposite each other on the color wheel are considered to be complementary colors (example: red and green).
//The high contrast of complementary colors creates a vibrant look especially when used at full saturation. This color scheme must be managed well so it is not jarring.
//Complementary colors are tricky to use in large doses, but work well when you want something to stand out.
//Complementary colors are really bad for text.

//The split-complementary color scheme is a variation of the complementary color scheme. In addition to the base color, it uses the two colors adjacent to its complement.
//This color scheme has the same strong visual contrast as the complementary color scheme, but has less tension.
//The split-complimentary color scheme is often a good choice for beginners, because it is difficult to mess up.

//CONTRAST, TENSION, EASY TO GET ALONG, STRONG SENSE

var largerNum = roundedSecColH1 > roundedSecColH2 ? roundedSecColH1 : roundedSecColH2
var smallerNum = roundedSecColH1 > roundedSecColH2 ? roundedSecColH2 : roundedSecColH1

console.log('largerNum: ' + largerNum + ' , smallerNum: ' + smallerNum);

if ((largerNum <= roundedH + 225 && largerNum >= roundedH + 195) &&
    (smallerNum <= roundedH + 165 && smallerNum >= roundedH + 135)) {
        console.log('You might be feeling some tension in your life right now. Either with people, sutiations or environments. Keep your cool. You have a strong sense of what needs to be done. Be extra mindful in how you come across to others and how your actions affect them. This could spare you many headhacjes (or cause some!)');
        console.log('complementary');
}



//ANALOGOUS
//Analogous color schemes use colors that are next to each other on the color wheel. They usually match well and create serene and comfortable designs.
//Analogous color schemes are often found in nature and are harmonious and pleasing to the eye.
//Make sure you have enough contrast when choosing an analogous color scheme.
//Choose one color to dominate, a second to support. The third color is used (along with black, white or gray) as an accent.

// MATCHED WELL, SERENE & COMFORTABLE SETTINGS. PLEASING TO THE EYE, NATURE.

if ((largerNum <= roundedH + 45 && largerNum >= roundedH + 15) &&
    (smallerNum <= roundedH - 15 && smallerNum >= roundedH - 45)) {
        console.log('Nature would do you well right now. Get out of the city, even for a day, and find serenity in nature and in yourself. A reinvigorating afternoon ');
        console.log('analogous');
    }



//TRIAD
//A triadic color scheme uses colors that are evenly spaced around the color wheel.
//Triadic color harmonies tend to be quite vibrant, even if you use pale or unsaturated versions of your hues.
//To use a triadic harmony successfully, the colors should be carefully balanced - let one color dominate and use the two others for accent.

//BALANCE, HARMONY, DELICATE, QUIET VIBRANCY

if ((largerNum <= roundedH + 135 && largerNum >= roundedH + 105) &&
    (smallerNum <= roundedH + 225 && smallerNum >= roundedH + 255)) {
      console.log();
      console.log('Triadic');
    }






}
