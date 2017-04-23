var colorWords = [];

function colorFortune() {

    //console.log("domR: " + domR + ", " + "domG: " + domG + ", " + "domB: " + domB);

    //-------------1: Dominant color HSV individual color reading-------------

    //set RGB color of dominant hue
    var color = tinycolor({
        r: domR,
        g: domG,
        b: domB
    });

    //transform RGB to HSV
    var returnHSV = color.toHsv();

    //Round the float returned to an integer
    var roundedH = Math.round(returnHSV.h);

    var finalColor = null


    //determine your reading based on the hue number from the dominant reading
    //if red (0 or 360)
    if (roundedH >= 0 && roundedH < 20) {
        //energy, war, danger, strength, power, determination, passion, desire, love

        //console.log("you're a person full of power and determination, but beware! your passion might lead to some dangerous situations");
        //random word from the red color
        //colorWord = words.red[Math.floor(Math.random() * words.red.length)];

        finalColor = 'red'

        //if orange (30)
    } else if (roundedH >= 20 && roundedH < 40) {
        //joy, enthusiasm, fascination, happiness, creativity, determination, attraction
        //success, encouragement, stimulation

        //console.log("joy and enthusiasm fill your life right now. It's a moment for you to explore your creativity and seek stimulation. Success will follow");

        //colorWord = words.orange[Math.floor(Math.random() * words.orange.length)];
        finalColor = 'orange'

        //if yellow (60)
    } else if (roundedH >= 50 && roundedH < 70) {
        //cheers, bright, honor, loyalty, cowardice, happiness, intellect, energy

        //console.log("your are surrounded by a cheerfulness that cannot be denied. Your intellect is being energized and the loyalty of your friends is stronger than ever. Rejoice in this moment of your life");

        //colorWord = words.yellow[Math.floor(Math.random() * words.yellow.length)];
        finalColor = 'yellow'

        //createSentence();

        //if green (120)
    } else if (roundedH >= 110 && roundedH < 130) {
        //growth, harmony, freshness, fertility, confidence, wisdom

        //console.log("There is a wisdom to your actions lately that can't be denied. You are finding growth and harmony in your life and that will lead you to places were your confidence will shine");

        //colorWord = words.green[Math.floor(Math.random() * words.green.length)];
        finalColor = 'green'

        //if blue (240)
    } else if (roundedH >= 230 && roundedH < 250) {
        //stability, healing, depth, trust, loyalty, faith, truth

        //console.log("life is giving you a moment of stability and healing. Take it. Take the moment to regain your trust and faith in others and yourself. Only good things will come of that");

        //colorWord = words.blue[Math.floor(Math.random() * words.blue.length)];
        finalColor = 'blue'

        //if purple (270)
    } else if (roundedH >= 260 && roundedH < 280) {
        //power, nobility, luxury, ambition, dignity, mystery, magic

        //console.log("There is power to your actions right now. A mysticism surrounds you that will power your ambition and lead you to new heights. Embrace it");

        //colorWord = words.purple[Math.floor(Math.random() * words.purple.length)];
        finalColor = 'purple'

        //if pink (300)
    } else if (roundedH >= 290 && roundedH < 310) {
        //playful, nice, sweet, romantic, tender

        //console.log("life is giving a sweet tender kiss to you right now. Be playful, embrace the romance, smell the love in the air");

        //colorWord = words.pink[Math.floor(Math.random() * words.pink.length)];
        finalColor = 'pink'

        //console.log(rosa);
        // console.log(Math.random() * words.pink.length);
        // console.log(words.pink.length);

        //if red
    } else {
        //energy, war, danger, strength, power, determination, passion, desire, love

        //console.log("you're a person full of power and determination, but beware! your passion might lead to some dangerous situations");

        //colorWord = words.red[Math.floor(Math.random() * words.red.length)];
        finalColor = 'red'
    }

    pickWords(finalColor)

    //---------------------2: warm vs cool-----------------------
    //warm: energy, brightness, action
    //cool: calm, peace, serenity

    var secColor1 = tinycolor({
        r: secR1,
        g: secG1,
        b: secB1
    });
    var secColor2 = tinycolor({
        r: secR2,
        g: secG2,
        b: secB2
    });

    var secColorHSV1 = secColor1.toHsv();
    var secColorHSV2 = secColor2.toHsv();

    var roundedSecColH1 = Math.round(secColorHSV1.h);
    var roundedSecColH2 = Math.round(secColorHSV2.h);

    var cool = 0;

    //if dominant hue is cool, add +1 to the cool variable
    if (roundedH >= 120 && roundedH < 300) {
        cool++
    }

    if (roundedSecColH1 >= 120 && roundedSecColH1 < 300) {
        cool++
    }

    if (roundedSecColH2 >= 120 && roundedSecColH2 < 300) {
        cool++
    }



    if (cool >= 2) {
        //console.log("your life calls for action right now. Bring brightness and energy to everything you do. Remember that although change might be painful, it's usually a good thing");
        var randWarm = warmSentence[Math.floor(Math.random() * warmSentence.length)];
        console.log(randWarm);
        document.getElementById('reading2').innerHTML = randWarm;

    } else {
        //console.log("your life calls for calmness right now. Take a second to sit with yourself and reflect on your life, peace of mind is needed at this time.");
        var randCool = coolSentence[Math.floor(Math.random() * coolSentence.length)];
        console.log(randCool);
        document.getElementById('reading2').innerHTML = randCool;
    }
}


function createSentence(arr) {

    String.prototype.format = function() {
        var i = 0,
            args = arguments;
        return this.replace(/{}/g, function() {
            return typeof args[i] != 'undefined' ? args[i++] : '';
        });
    };

    var randomSentence = sentences[Math.floor(Math.random() * sentences.length)];

    console.log(randomSentence.format(arr[0], arr[1], arr[2]));
    document.getElementById('reading1').innerHTML = randomSentence.format(arr[0], arr[1], arr[2]);
}

function pickWords(color) {

    var rands = []

    var wordsLength = words[color].length

    while (rands.length != 3) {
        var new_random = Math.floor(Math.random() * wordsLength)
        if (rands.indexOf(new_random) > -1) {
            continue
        } else {
            rands.push(new_random)
        }
      }
        var color_words = []
        color_words.push(words[color][rands[0]])
        color_words.push(words[color][rands[1]])
        color_words.push(words[color][rands[2]])

        createSentence(color_words)
    }

    $("#refreshButton").click(function() {
      console.log("clearing");
      $('#result').attr("src","");
      $('#reading1').html("")
      $('#reading2').html("")
      console.log("cleared");
      $("#ig").val('');
      $("#IGsubmit").show();
      $(".output").hide();
      // $(".colorDivs").hide();
      // $("#column2").empty();
      $("#dominant").css({background: 'transparent'});
      $("#secondary1").css({background: 'transparent'});
      $("#secondary2").css({background: 'transparent'});

    });
