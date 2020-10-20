var monkey,monkey_run ,monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  monkey_run=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_stop=loadImage("sprite_8.png");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("obstacle.png");
 
}
function setup() {
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("move",monkey_run);
  monkey.scale=0.1;
  

    ground = createSprite(400,350,900,10);
    ground.x = ground.width /2;
  
  obstacleGroup=createGroup();
  foodGroup=createGroup();
//monkey.debug=true;
}


function draw() {
  
  background("lightblue");
  monkey.collide(ground);
  fill("green");
  stroke("green");
  text("Survival time: "+ score, 200,50);
  if(gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
  if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  spawnObstacles();
    spawnBanana();
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
      console.log("hiuehewoh");
    }
    if(monkey.isTouching(foodGroup)){
     foodGroup.destroyEach();
    }
  }
  if(gameState===END){
    score=score+0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    ground.velocityX=0;
    monkey.velocityY=0;
    monkey.velocityX=0;
    monkey.addImage("move",monkey_stop);
  }
drawSprites();
  }
function spawnObstacles(){
  if (frameCount % 100 === 0){
  var obstacle = createSprite(600,328,10,40);
    obstacle.velocityX = -(6 + score/100);
  obstacle.addImage("barrier",obstacleImage);
  obstacle.scale = 0.095;  
    //obstacle.debug=true;
    obstacle.setCollider("circle",0,0);
  obstacleGroup.add(obstacle);
}}

function spawnBanana(){
  if (frameCount % 60 === 0){
  var banana = createSprite(600,208,10,0);
    banana.velocityX = -(6 + score/100);
  banana.addImage("barrier",bananaImage);
  banana.scale = 0.15;  
  foodGroup.add(banana);
}}





