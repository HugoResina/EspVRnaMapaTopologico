let img;
let x;
let y;
let scale;
let meters = 250;
let input;
let button;

let switchMode = false;   

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


  let switchModeBtn = createButton('Cambiar Modo');
  switchModeBtn.position(500, 20);
  switchModeBtn.mousePressed(SwitchMode);
}

function SwitchMode() {
  switchMode = !switchMode;     
  redrawCanvas();
}

function validateMeters() {
  let val = int(input.value());
  val = constrain(val, 250, 1000);
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
  if (key == 'p') placeSensor();
}

function placeSensor() {
  fill(255,0,0)
  circle(mouseX, mouseY, 10);
}

function create() {
  x = mouseX;
  y = mouseY;
  redrawCanvas();
}

function drawCircle() {
  if (!switchMode) {
    fill(255, 0, 0);
    circle(x, y, 5);

    noFill();
    stroke(0);

    for (let i = 1; i < 15 / (meters / 1000); i++) {
      circle(x, y, i * scale * 2 * (meters / 1000));
    }
  } else {

    stroke(0);

    let spacing = scale * (meters / 1000);


    for (let i = 0; i < width / spacing; i++) {
      line(i * spacing, 0, i * spacing, height);
    }


    for (let j = 0; j < height / spacing; j++) {
      line(0, j * spacing, width, j * spacing);
    }
  }
}

function draw() {}
