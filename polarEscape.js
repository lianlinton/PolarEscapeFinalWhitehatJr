var PLAY=1;
var END=0;
var gamestate= "PLAY";

var foxImage,iceCubeImgae, penguinImage, puddleImage, sealImage,gameoverimage;
var backImage,backgr;
var player, player_running, player_stopping;
var ground,ground_img;

var Group;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;
var count;


function preload(){
  backImage=loadImage("background.jpg");
  
  player_running = loadAnimation("p1.png","p2.png","p3.png","p4.png","p5.png","p6.png","p7.png","p8.png");
  
  player_stopping=loadImage("p1.png");
  
  foxImage = loadImage("fox.png");
  iceCubeImage = loadImage("iceCube.png");
  penguinImage = loadImage("penguin.png");
  puddleImage = loadImage("puddle.png");
  sealImage = loadImage("seal.png");
  gameoverimage = loadImage ("gameover.png");
  
}

function setup() {
  createCanvas(1000,500);
  
  backgr=createSprite(200,200,800,400);
  backgr.addImage(backImage);
  backgr.scale=3;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(125,450,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.75;
  
  ground = createSprite(200,450,400,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  
  gameOver = createSprite(500, 225);
  gameOver.addAnimation("gameOver", gameoverimage);
  gameOver.scale = 0.35;
  gameOver.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 00;
}

function draw() {
  
  background(173, 216, 230);
  
  if(gamestate=== "PLAY"){
     
    score = Math.round(frameCount/4);

    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    
    player.velocityY = player.velocityY + 0.8;
    spawnObstacles();
     
    if(ground.x<0) {
      ground.x=ground.width/2;
    }
    
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }

    if (score > 500 || player.isTouching(obstaclesGroup)){
      gamestate = "END";
      if (player.isTouching(obstaclesGroup)){
        count = true;
      }
    }
  }
  
  if (gamestate=== "END"){
    backgr.velocityX = 0;
    ground.velocityX = 0;
    player.velocityX = 0;
    player.addImage("player_stop", player_stopping);
    obstaclesGroup.setVelocityXEach(0);
    gameOver.visible = true;
    /*var GameOver=createSprite(300,120,40,10);
    GameOver.addImage(gameoverimage);
    GameOver.scale=0.2;
    */
  }
  
  player.collide(ground);
  
  drawSprites();
  
  textSize(20);
  stroke("blue");
  fill("blue");
  text("Score: "+ score, 600,50);
  if (score > 500){
    textSize(20);
    stroke("white");
    fill("white");
    text("You won! Congratulations!", 375,275);
    text("You saved the polar bear!", 375,300);
  }
  if (count === true){
    textSize(20);
    stroke("white");
    fill("white");
    text("Don't worry! Try again, next time!", 365,300);  
  }
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(800,400,10,40);
    obstacle.scale = 0.2;
    obstacle.setCollider("rectangle",2,2,4,4)  
    obstacle.velocityX = -4;
    
    var rand = Math.round(random(1,4));
     
    switch(rand) {
      case 1: obstacle.addImage(iceCubeImage);
              obstacle.scale = 0.15;
              break;
      case 2: obstacle.addImage(puddleImage);
              obstacle.scale = 0.5;
              break;
      case 3: obstacle.addImage(penguinImage);
              obstacle.scale = 0.75;
              break;
      case 4: obstacle.addImage(sealImage);
              obstacle.scale = 0.01;
              break;
      case 5: obstacle.addImage(foxImage);
              obstacle.scale = 0.01;
              break;
      default: break;
    }
     
    obstacle.lifetime = 5000;
     
    obstaclesGroup.add(obstacle);
  }
}
