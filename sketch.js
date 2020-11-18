var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score =0;
var particle;
var turn = 5;

var PLAY=1;
var END=0;

var gameState = PLAY;
function setup() {
  createCanvas(800, 800);

  //------------------------Basic Things
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);
  //-------------------------Basic Things

    mousePressed();

    //----------------------------------------------PLINKOS
   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }
    for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,75));
    }
    for (var j = 50; j <=width-10; j=j+50){
       plinkos.push(new Plinko(j,175));
    }
     for (var j = 75; j <=width; j=j+50){    
       plinkos.push(new Plinko(j,275));
    }
     for (var j = 50; j <=width-10; j=j+50){
       plinkos.push(new Plinko(j,375));
    }   
    //-----------------------------------------------PLINKOS

}

 
function draw() {

  background("black");
  console.log(mouseX,mouseY);
  textSize(20)
  text("Score : "+score,20,30);
  text("Turns Left: ",+turn ,70,30)

  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
  
 if(particle !== null){
    particle.display();
    if(particle.body.position.y<600){
    
      if(particle.body.position.x < 300){
        score = score + 500;
        //particle = null
    }

    if(particle.body.position.x > 301 && particle.body.position.x < 600){
      score = score+100;
     // particle = null;
    }

    if(particle.body.position.x < 900){
      score = score + 200;
     //particle = null;
    }
  }
 }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
   //console.log(turn);
   text("Turns Left " + turn , 680,30)

   if(gameState === "END"){

     push()
     fill("RED");
     textSize(100);
    text("Game Over", 160,height/2)
    pop();
    
   }
}

function mousePressed(){
  if(gameState !== "END"){
    turn--;
    particle = new Particle(mouseX ,10,10,10);
  }

  if(turn < 1){
    gameState = "END"
  }
}