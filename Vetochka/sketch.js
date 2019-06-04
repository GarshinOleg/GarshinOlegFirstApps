let i = 200,
  di = 5,
  du = 1,
  u = 10;

function setup() {
  createCanvas(500, 500);
  //noLoop();
  frameRate(20);
}

function draw() {
  background(255, 69, 0);
  translate(width / 2, height / 2 + 245);
  scale(1, -1);
  i = i + di;
  u = u + du;
  if ((u > 65) || (u < 5)) du = -du;
  if ((i > 480) || (i < 200)) di = -di;
  stroke(0, i, 0);
  fractal(0, 0, i, u);
}

function fractal(x, y, a, u) {
  if (a > 3) {
    line(x, y, x, a);
    fractal(x, y, a / 3, u);
    push();
    translate(0, a / 3);
    fractal(x, y, a / 3, u);
    pop();
    push();
    translate(0, a * (2 / 3));
    fractal(x, y, a / 3, u);
    pop();
    push();
    translate(0, a / 3);
    rotate(radians(-u));
    fractal(x, y, a / 3, u);
    pop();
    push();
    translate(0, a * (2 / 3));
    rotate(radians(u));
    fractal(x, y, a / 3, u);
    pop();
  }
}