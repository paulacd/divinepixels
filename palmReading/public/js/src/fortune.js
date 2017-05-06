// use math.js
math.sqrt(-4); // 2i

var intersect;
var minX;
var maxX;
var minY;
var maxY;

function createReading() {

    pointDist();
    pointIntersect();

    $("#reading").show();

    $("#refreshButton").click(function() {
        console.log("clearing");
        location.reload();

      });

}

function pointIntersect() {
    console.log('inside pointIntersect function');
    // console.log(pointOneX);
    var oddInt = math.intersect([pointOneX, pointOneY], [pointTwoX, pointTwoY], [pointThreeX, pointThreeY], [pointFourX, pointFourY]);
    var evenInt = math.intersect([pointTwoX, pointTwoY], [pointThreeX, pointThreeY], [pointOneX, pointOneY], [pointFourX, pointFourY]);

    // var ex = math.intersect([0, 0], [10, 0], [0, 10], [10, 11]);

    console.log('oddInt: ' + oddInt);
    console.log('evenInt: ' + evenInt);
    // console.log(evenInt);

    minX = Math.min(pointOneX, pointTwoX, pointThreeX, pointFourX);
    maxX = Math.max(pointOneX, pointTwoX, pointThreeX, pointFourX);
    minY = Math.min(pointOneY, pointTwoY, pointThreeY, pointFourY);
    maxY = Math.max(pointOneY, pointTwoY, pointThreeY, pointFourY);

    console.log('minX: ' + minX);
    console.log('maxX: ' + maxX);
    console.log('minY: ' + minY);
    console.log('maxY: ' + maxY);

    var oddX = oddInt[0];
    var oddY = oddInt[1];
    var evenX = evenInt[0];
    var evenY = evenInt[1];

    intersect = false;

    if ((oddX >= minX && oddX <= maxX) && (oddY >= minY && oddY <= maxY) ||
        (evenX >= minX && evenX <= maxX) && (evenX >= minY && evenX <= maxY)) {
        intersect = true;
    }

    if (intersect) {
        $("#reading1").text("You're at a crossroads in your life right now. A decision needs to be made. You know this. Face the decision head on, in the long run, you'll thank yourself for it.");

    } else {
        $("#reading1").text("You seem to be on a steady path in your life right now. You have a goal and you should follow it. Remember to follow your gut, it usually lets on more than you know.");
    }

    // console.log(intersect);

}

function pointDist() {

    var distX = maxX - minX;
    var distY = maxY - minY;

    console.log(distX);
    console.log(distY);

    //x's range from 90 to 2000
    //y' range from 50 to 1400

    var farPoints = [
      "You have big plans for yourself! Work hard and keep your eye on the prize. Also, make sure you don’t lose sight of the details in your life that need attention as well while you work on your bigger plans. Towers are built stone by stone, so may sure to lay your foundation correctly.",
      "There’s something in the back of your mind nagging at you. Address it so that you can clean your slate and close a cycle in your life. That will allow you to put your eyes in the horizon and start working towards goals that will not only bring you fulfillment, but happiness too.",
      "A storm is coming. You can see it approaching in the sky and you need to brace yourself for it. Although there might be some rough times ahead, remember that this too shall pass, and while it happens, your true friends will rise to the surface and you will remember who really matters in your life. Remember that not all that glitters is gold."
    ]

    var nearPoints = [
      "There are a lot of things going on in your life right now and because of that, you might lose sight of the bigger picture. Remember to keep balance in all aspects of your life. In might feel like you’re juggling a lot right now, but in the long run it will be worth it to keep your eyes on the horizon.",
      "Life is good to you right now. Everything around you seems to be falling harmoniously into place.  Enjoy the moments and be present in your life. Remember not to focus too much on the little things, and instead keep the big picture in mind when you encounter hurdles in life. As someone wise once said, 'don’t focus so much on the leaves that you forget to see the forest.'",
      "The ground seems to be shifting under your feet. Things are moving and change can sometimes be painful. Find comfort in the discomfort and adapt to the changes as they flow through you. Learn to see things in a different perspective and you will come out of this a better stronger person for it. You’ll look back on this soon with a smile on your face."
    ]


    if (distX > 1000 && distY > 675){

    var randomSentence = farPoints[Math.floor(Math.random() * farPoints.length)];
    // document.getElementById('reading2').innerHTML = randomSentence;
    $("#reading2").text(randomSentence);

  } else if (distX <=1000 && distY <= 675){

    var randomSentence = nearPoints[Math.floor(Math.random() * nearPoints.length)];
    // document.getElementById('reading2').innerHTML = randomSentence;
    $("#reading2").text(randomSentence);

  } else {
    // $("#reading2").text("out of range");
    var randomSentence = farPoints[Math.floor(Math.random() * farPoints.length)];
    // document.getElementById('reading2').innerHTML = randomSentence;
    $("#reading2").text(randomSentence);
  }

}
