var vertices = [];

function setup() {
  createCanvas(600, 400);
  //background(51);

  //----------------------额外加这个部分 会出现啥效果？
  for (var i = 0; i < 50; i++) {
    var v = createVector(random(width), random(height));
    vertices.push(v);
  }
  //----------------------
}

function mousePressed() {
  var v = createVector(mouseX, mouseY);
  vertices.push(v);
}

function draw() {
  background(51); //background 位置不一样 出现效果不一样

  //------------------------------PRIM'S ALGORITHM
  var reached = [];
  var unreached = [];

  //1.at start, all vertices are unreached to each other, there is no line to connected
  for (var i = 0; i < vertices.length; i++) {
    unreached.push(vertices[i]);
  }

  //2.check for one random vertice, is there any vertice that has least distance
  reached.push(unreached[0]);
  unreached.splice(0, 1); //remove one element from the unreached group
  //-----------------------------------------------------------------------
  while (unreached.length > 0) {
    var record = 100000; //there are not any vertices that more than 100 thousand pixels from each other in a 640 by 360 window
    var rIndex; //reached index id
    var uIndex; //unreached index id

    //3.then check every single vertice with other unreached vertices and fine whichever pairing has least distance
    for (var i = 0; i < reached.length; i++) { //for every vertex in the reached array
      for (var j = 0; j < unreached.length; j++) { //check every unreached vertex in the array
        var v1 = reached[i];
        var v2 = unreached[j];
        var d = dist(v1.x, v1.y, v2.x, v2.y);
        if (d < record) {
          //i want to find what's the shortest distance between i and j
          //at the beginning, the shortest distance is 100000
          //and the first distance is like 300 (300<100000)
          //so, 300 is the record
          record = d;
          rIndex = i;
          uIndex = j;
        }
      }
    }

    //draw a line
    stroke(255);
    strokeWeight(1.5);
    line(reached[rIndex].x, reached[rIndex].y, unreached[uIndex].x, unreached[uIndex].y);

    reached.push(unreached[uIndex]);
    unreached.splice(uIndex, 1);
    //-----------------------------------------------------------------------
  } //while 循环looping


  for (var i = 0; i < vertices.length; i++) {
    fill(255);
    stroke(255);
    ellipse(vertices[i].x, vertices[i].y, 10, 10);
  }
  //endShape();

}
