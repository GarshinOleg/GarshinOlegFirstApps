let i = 200,
  di = 5,
    du=1,
  u = 10;

function setup() {
  createCanvas(500, 500);
  //noLoop();
  frameRate(20);
}

function draw() {
  background(230, 230, 250);
  translate(width / 2, height / 2 );
  scale(1, -1);
  //strokeWeight(1);
  i = i + di;
  //u=u+du;
  //if ((u > 65) || (u < 5)) du = -du;
  if ((i > 240) || (i < 0)) di = -di;
  stroke(70, 130, 180);
  fractal(0, 0, i, 0);
  rotate(radians(90));
  fractal(0, 0, i, 0);
  rotate(radians(90));
  fractal(0, 0, i, 0);
  rotate(radians(90));
  fractal(0, 0, i, 0);
  rotate(radians(90));
  fractal(0, 0, i, 0);
  
  push();
  rotate(radians(45));
  fractal(0, 0, i, 0);
  pop();
  push();
  rotate(radians(-45));
  fractal(0, 0, i, 0);
  pop();
  push();
  rotate(radians(135));
  fractal(0, 0, i, 0);
  pop();
  push();
  rotate(radians(-135));
  fractal(0, 0, i, 0);
  pop();
}

function fractal(x, y, a,u) {
  if (a > 3) {
    rotate(radians(u));
    line(x, y, x, a);
    
    //нижние веточки
    push();
    translate(0, a / 4);
    rotate(radians(45));
    fractal(x, y, a / 6, u);
    pop();
    push();
    translate(0, a / 4);
    rotate(radians(-45));
    fractal(x, y, a / 6, u);
    pop();
    //средние веточки
    push();
    translate(0, a*0.5);
    rotate(radians(45));
    fractal(x, y, a / 3, u);
    pop();
    push();
    translate(0, a*0.5);
    rotate(radians(-45));
    fractal(x, y, a / 3, u);
    pop();
    //верхние веточки
    push();
    translate(0, a*0.75);
    rotate(radians(45));
    fractal(x, y, a / 4, u);
    pop();
    push();
    translate(0, a*0.75);
    rotate(radians(-45));
    fractal(x, y, a / 4, u);
    pop();
  }
}