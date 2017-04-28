// use math.js
math.sqrt(-4); // 2i

function createReading (){

  pointIntersect();

  $("#reading").show();
  $("#readingP").text("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.");



}

function pointIntersect() {
  console.log('inside pointIntersect function');
  // console.log(pointOneX);
  var oddInt = math.intersect([pointOneX, pointOneY], [pointTwoX, pointTwoY], [pointThreeX, pointThreeY], [pointFourX, pointFourY]);
  var evenInt =  math.intersect([pointTwoX, pointTwoY], [pointThreeX, pointThreeY], [pointOneX, pointOneY], [pointFourX, pointFourY]);

  // var ex = math.intersect([0, 0], [10, 0], [0, 10], [10, 11]);

  console.log('oddInt: ' + oddInt);
  console.log('evenInt: ' + evenInt);
  // console.log(evenInt);

  var minX = Math.min(pointOneX, pointTwoX, pointThreeX, pointFourX);
  var maxX = Math.max(pointOneX, pointTwoX, pointThreeX, pointFourX);
  var minY = Math.min(pointOneY, pointTwoY, pointThreeY, pointFourY);
  var maxY = Math.max(pointOneY, pointTwoY, pointThreeY, pointFourY);

  console.log('minX: ' + minX);
  console.log('maxX: ' + maxX);

  var oddX = oddInt[0];
  var oddY = oddInt[1];
  var evenX = evenInt[0];
  var evenY = evenInt[1];

var intersect = false;

  if( (oddX >= minX && oddX <= maxX) && (oddY >= minY && oddY <= maxY) ||
  (evenX >= minX && evenX <= maxX) && (evenX >= minY && evenX <= maxY) ) {
    intersect = true;
  }

  console.log(intersect);






}
