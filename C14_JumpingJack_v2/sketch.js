var gap=0
var num=30
const PLAY = 1;
const END = 0;
const START = 2
var gameState = START;
var player,playerImage;
var ground, invisibleGround;
var platform1,platform2,platform3,platform4,platform5,platform6;

var platformGroup,newPlatformGroup;
var p, pImage, breakImage;

var bg, bgImage;


var score=0;
var jumpSound , checkPointSound, dieSound;
var gameOver, restart;


function preload(){
  
  playerImage=loadImage("images/jack2.png");
  pImage = loadImage("images/p1.png");
  bgImage = loadImage("images/download.jpeg");
  
  breakImage = loadImage("images/brokenPlatform.png");
  platform1 = loadImage("images/platform1.png");
  platform2 = loadImage("images/platform2.png");
  platform3 = loadImage("images/platform3.png");
  platform4 = loadImage("images/platform4.png");
  platform5 = loadImage("images/platform5.png");
  platform6 = loadImage("images/platform6.png");
  
  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(500, 600);
  
  bg = createSprite(250,300);
  bg.addImage(bgImage);
  bg.scale=4;

  player = createSprite(250,300,20,50);
  
  player.addImage(playerImage);
  player.scale = 1;
  player.depth=10000;
  
  p = createSprite(250,350);
  p.addImage(pImage);
  p.scale=0.15
  
  gameOver = createSprite(250,250);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(250,300);
  restart.addImage(restartImg);
  
  gameOver.visible = false;
  restart.visible = false;
  invisibleGround = createSprite(250,600,500,10);
  invisibleGround.visible = false;
  platformGroup = new Group();
  newPlatformGroup = new Group();
  
  score = 0;
}

function draw() {
  //player.debug = true;
  background('#F2F5B6');

  if(gameState===START){
    spawnplatforms();
    if(keyDown("space")) {
      p.y=700;
      player.velocityY = -16;
      jumpSound.play();
      invisibleGround.velocityY=4;
      gameState = PLAY;
    }
  }
   
  if (gameState===PLAY){
    spawnplatforms();
    player.collide(p)

    /*bg.velocityY = 5;
    if(bg.y>450){
      bg.y=bg.height/2;
    }*/

    // to restart the game frameCount can not be reset, so using frameRate
    score = score + Math.round(getFrameRate()/60)
  
    // //jump when the space key is pressed
    if(platformGroup.isTouching(player) && player.velocityY>5) {
      player.velocityY = -16;
       jumpSound.play();   
    }
    
 
    if(keyDown("left"))
      {
        player.x-=7
      }
    
    if(keyDown("right"))
      {
        player.x+=7
      }
    newHurdle();
    //add gravity
    player.velocityY = player.velocityY + 0.8
    player.collide(invisibleGround);
    
    for(var i =0;i<newPlatformGroup.length;i++){
    if(newPlatformGroup.get(i).isTouching(player)&& player.velocityY>5){
      newPlatformGroup.get(i).addImage(breakImage);
      newPlatformGroup.get(i).velocityY=10;
      //player.velocityY = 10;
    }
  }
  
    /*if(player.y>500){//C15 code
        gameState = END;
       dieSound.play();
    }*/
  }
  /*C15 Code
    else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    bg.velocityY=0;
    //set velcity of each game object to 0  
    player.velocityY = 2;
    platformGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    platformGroup.setLifetimeEach(-1);   

    //to restart the game click on restart
    if(mousePressedOver(restart)){
        reset();
    }
  }*/
  
  drawSprites();
  textSize(20);
  fill(0);
  text(" Score  :  " + score, 350,50);
  
}
/*C15 code
function reset(){
  player.x = 250;
  player.y=300;
  p.y=350;
  gameState = START;
  platformGroup.destroyEach();
  score = 0;
  restart.visible = false;
  gameOver.visible= false;
  player.velocityY = -5;
}*/



function spawnplatforms() {

  if(frameCount % 40 == 0) {
    xx=Math.round(random(50,450))
    var platform = createSprite(xx,-10,150,20);
    //platform.setCollider("rectangle",0,0,50,14);
    platform.velocityY = 4;

    var r = Math.round(random(1,5))
    switch(r){
      case 1 : platform.addImage(platform1);
      break;
      case 2 : platform.addImage(platform2);
      break;
      case 3 : platform.addImage(platform3);
      break;
      case 4 : platform.addImage(platform4);
      break;
      case 5 : platform.addImage(platform5);
      break;
      default: break;
    }
 
    //assign scale and lifetime to the platform           
    platform.scale = 0.1;
    //platform.setCollider("rectangle",30,-100,600,20);

    platform.lifetime = 200;
    
    //add each platform to the group
    platformGroup.add(platform);
   
}

}

function newHurdle(){
  if(frameCount % 100 == 0) {
    xx=Math.round(random(50,450))
    var plat = createSprite(xx,-10,150,20);
    //plat.setCollider("rectangle",0,0,50,14);
    plat.velocityY = 4;
    //platform.debug=true
    //plat.depth=0
    plat.addImage(platform6)
 
    //assign scale and lifetime to the platform           
    plat.scale = 0.1;
    //platform.setCollider("rectangle",30,-100,600,20);

    plat.lifetime = 200;
    plat.collide(player);
    
    //add each platform to the group
    newPlatformGroup.add(plat);  
}

}