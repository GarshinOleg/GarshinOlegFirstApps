function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background(220);
  translate(width / 2, height / 2);
  fractal(0, 0, 100);

}

function fractal(x, y, a) {
  if (a > 2) {
    ellipse(x, y, a);

    fractal(x - 2 * a, y, a / 2);
    fractal(x, y + 2 * a, a / 2);
    fractal(x + 2 * a, y, a / 2);
    fractal(x, y - 2 * a, a / 2);
  }
}