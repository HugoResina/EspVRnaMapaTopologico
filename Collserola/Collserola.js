let img;
let x;
let y;
let scale;

function preload(){
    img = loadImage('Fotos/FotoMapa.png');
    scale = 1920 / 13.8;
   
}




function setup() {
  createCanvas(1920,1080);


  image(img,0,0);
 

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
}

function mousePressed(){
  //setup();
  x = mouseX;
  y = mouseY;
  
  console.log( x  + '-')
  
  stroke(0)
  noFill();
  
  circle(x,y,5)
  
  for(var i = 1; i < 15; i++){
    circle(x,y, i*scale*2)
  }
  
  
}


function draw() {

}
