let img;
let x;
let y;
let scale;
let meters = 250;
let input;
let button;
const points = [];
const vpoints = [];
let id = 0;
let selectedPoint;
let sensNumIn;
let sensNum = 5;

let switchMode = false;   
/*
x -> position x
y -> position y
d -> radius
n -> sensor quantity
id -> identificator by creation order
*/

class VPoint{
 constructor(x,y){
 this.x = x
 this.y = y
 }
}
class Point {
  constructor(x, y, d, n, id) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.n = n;
    this.id = id;
    this.button = createButton('' + this.id);
    this.button.position(this.x - 10, this.y - 10);
    this.button.style('width', '20px');
    this.button.style('height', '20px');
    this.button.mousePressed(() => {
      selectedPoint = this;   
      console.log('Selected', this.id);
    });
  }
}


function preload() {
  img = loadImage('Fotos/FotoMapa2.png');
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
  
  sensNumIn = createInput(5);
  sensNumIn.position(250, 50);
  sensNumIn.size(100);
  sensNumIn.attribute("type", "number");
  sensNumIn.attribute("min", "1");
  sensNumIn.attribute("max", "10");

  input.elt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") validateMeters();
  });
  
  sensNumIn.elt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") validateSensNum();
  });

  button = createButton("Validar");
  button.position(360, 20);
  button.mousePressed(validateMeters);


  let switchModeBtn = createButton('Cambiar Modo');
  switchModeBtn.position(500, 20);
  switchModeBtn.mousePressed(SwitchMode);
  angleMode(DEGREES);
}

function validateSensNum() {
let val = int(sensNumIn.value());
val = constrain(val, 1, 10);
sensNum = val;

if (selectedPoint) {
selectedPoint.n = sensNum
}

sensNumIn.value(val);
drawPoints();
}

function SwitchMode() {
  switchMode = !switchMode;     
  deletePoint();
}

function getPoint(a){
 selectedPoint = points[a] 
}

function validateMeters() {
let val = int(input.value());
val = constrain(val, 250, 1000);
meters = val;

if (selectedPoint) {
selectedPoint.d = scale * (meters / 1000);
}

input.value(val);
drawPoints();
}

function deletePoint() {

  //delete selected point

  
}
function moveSelected(){
 if (selectedPoint) {
    x = mouseX
    y = mouseY
    selectedPoint.x = x
    selectedPoint.y = y
 }
}
function SaveImg() {
  saveCanvas('MyMap.png');
}

function keyPressed() {
  if (key == 'd') deletePoint();
  if (key == 's') SaveImg();
  if (key == 'f') create();
  if (key == 'p') visualPoint();
  if (key == 'm') moveSelected();
}

function placeSensor(inx,iny) {
  fill(255,0,0)
  circle(inx, iny, 10);
}

function create() {
  x = mouseX;
  y = mouseY;
  //deletePoint();
  registerPoint();
}

function registerPoint() {
  id++;
  let radius = scale * (meters / 1000);
  let point = new Point(x, y, radius, sensNum, id);
  selectedPoint = point;
  points.push(point);
  drawPoints();
}
function visualPoint(){
  x = mouseX;
  y = mouseY;
  
  vp = new VPoint(x,y)
  vpoints.push(vp)
  drawPoints()
  
}

function drawPoints() {
  clear();
  image(img, 0, 0);
  noFill();
  stroke(0);
  for (let i = 0; i < points.length; i++) {
    circle(points[i].x, points[i].y, points[i].d);
    points[i].button.position(points[i].x - 10, points[i].y - 10);
    drawNSensors(points[i])
    fill(0,0,255);
    circle(points[i].x,points[i].y, 10);
    noFill()
  }
  for (let i = 0; i < vpoints.length; i++) {
    fill(0,255,0)
    circle(vpoints[i].x, vpoints[i].y,10)
    noFill()
  }
  
}
function drawNSensors(point){
  //radio
  d = point.d/2
  //num sensores
  n = point.n
 let spread = 360/n


  for (let i = 0; i < n; i++) {
    let ix = point.x;
    let iy = point.y;
    ix += d * cos(i * spread)
    iy += d * sin(i * spread)
    placeSensor(ix, iy);

  }
  
   noFill();
  stroke(0);
}
