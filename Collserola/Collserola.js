let img;
let x;
let y;
let scale;
let meters = 250;
let input;
let button;

function preload() {
  img = loadImage('Fotos/FotoMapa.png');
  scale = 1920 / 13.8;
}

function setup() {
  createCanvas(1920, 1080);

  image(img, 0, 0);


  input = createInput("250");
  input.position(250, 20);
  input.size(100);
  input.attribute("type", "number");
  input.attribute("min", "250");
  input.attribute("max", "1000");
  
   input.elt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") validateMeters();
  });


  button = createButton("Validar");
  button.position(360, 20);
  button.mousePressed(validateMeters);

}

function validateMeters() {
  let val = int(input.value());

  if (val < 250) val = 250;
  if (val > 1000) val = 1000;

  meters = val;
  input.value(val);

  redrawCanvas();
}

function redrawCanvas() {
  clear();
  image(img, 0, 0);


  if (x !== undefined && y !== undefined) drawCircle();
}

function SaveImg() {
  saveCanvas('MyMap.png');
}

function keyPressed() {
  if (key == 'd') redrawCanvas();
  if (key == 's') SaveImg();
  if (key == 'f') create();
 
}

function create() {
  x = mouseX;
  y = mouseY;
  redrawCanvas();
}

function drawCircle() {
  fill(255, 0, 0);
  circle(x, y, 5);

  noFill();
  stroke(0);

  for (let i = 1; i < 15 / (meters / 1000); i++) {
    circle(x, y, i * scale * 2 * (meters / 1000));
  }
}

function draw() {}
