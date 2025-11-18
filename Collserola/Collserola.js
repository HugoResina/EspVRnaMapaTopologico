let img;
let x;
let y;
let scale;
let slider;
let meters;

function preload(){
  
    inputed = false;
     img = loadImage('Fotos/FotoMapa.png');
    scale = 1920 / 13.8;
   
    slider = createSlider(0, 750)
  slider.position(250, 20)
  slider.size(750);
  slider.input(drawCircle);
}




function setup() {
  createCanvas(1920,1080)
 


  image(img,0,0);
  text(meters + ' metres', 250, 50)
 

}

function SaveImg(){
  saveCanvas('MyMap.png')
}
function keyPressed(){
 if(key == 'd'){
   setup()
 }
 else if(key == 's'){
     SaveImg()
 }
 else if(key == 'f'){
   create()
 }
}

function create(){
  //setup();
  x = mouseX;
  y = mouseY;
  
  drawCircle()
}
function drawCircle(){
    setup();
  meters = slider.value() + 250;
  stroke(0)
  noFill();
  
  circle(x,y,5)
  
  for(var i = 1; i < 15/(meters/1000) ; i++){
    circle(x,y, i*scale*2*(meters/1000))
  }
}

function draw() {


}
