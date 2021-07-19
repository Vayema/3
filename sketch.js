var backgroundImage, background, bg;
var rocket, asteroid, asteriodImg;
var rocketimg;
var instructions;
var music;
var asteroidGroup, asteroidsGroup;

var gameOver, gameOverImg, restart, restartImg;
var score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  rocketimg = loadImage("Images/rocket.png")
  asteroidImg = loadImage("Images/asteroid.png")
  instructions = loadImage("Images/instructionss.jpg")
  backgroundImage = loadImage("Images/spacebg.png")
  gameOverImg = loadImage("Images/gameover.png")
  music = loadSound("Sounds/music.mp3")
}

function setup() {
  createCanvas(800, 300);

  edges = createEdgeSprites();

  bg = createSprite(800,100,800,300);
  bg.addImage(backgroundImage);
  bg.x = bg.width/2;
  bg.velocityX = -1;

  rocket = createSprite(150,150,20,20);
  rocket.addImage("rocketship", rocketimg);
  rocket.scale = 0.22
  rocket.rotation = rocket.rotation + 120
  // rocket.debug = true;

  asteroidGroup = new Group();
  asteroidsGroup = new Group();

  gameOver = createSprite(400,150,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.3;

  score = 0;

  music.play();
}

function draw(){

  background("black");

  if(gameState===PLAY){
    
    score = score + Math.round(getFrameRate()/60);
    
    textSize(100);
    fill("#ADD8E6");
    text("Score: "+ score, 750,50);

    if (bg.x < 300){
      bg.x=bg.width/2;
    }

    //Go up
    if(keyDown(UP_ARROW)) {
      rocket.velocityY = -1;
    }
    
    //Go left
    if(keyDown(LEFT_ARROW)) {
      rocket.velocityX = -1;
    }

    //Go right
    if(keyDown(RIGHT_ARROW)) {
      rocket.velocityX = 1;
    }

    //Go down
    if(keyDown(DOWN_ARROW)) {
      rocket.velocityY = 1;
    }

    gameOver.visible= false;

    if(asteroidsGroup.isTouching(rocket)){
        gameState = END;
    }
   
    if(asteroidGroup.isTouching(rocket)){
      gameState = END;
    }

    
    spawnAsteroid();
    spawnAsteroid1();
  }
  else if (gameState === END){
    
    gameOver.visible= true;

    bg.velocityX = 0;
    rocket.velocityX = 0;
    rocket.velocityY = 0;

    asteroidsGroup.setVelocityXEach(0);
    asteroidGroup.setVelocityXEach(0);

    asteroidsGroup.destroyEach();
    asteroidGroup.destroyEach();
  }

  drawSprites();  

}


function spawnAsteroid(){
 if (frameCount%160===0){
   asteroid = createSprite(800,100,10,10);
   asteroid.addImage("asteroid",asteroidImg);
   asteroid.velocityX = -4
   asteroid.velocityY = 4
   asteroid.scale = 0.3
  
  //  createEdgeSprites();
  //  asteroid.bounceOff(edges);

  // asteroid.y = Math.round(random(10,290));
   asteroid.x = Math.round(random(100,790));

   asteroid.lifetime = 80;
   asteroidGroup.add(asteroid);

   asteroid.setCollider("circle", 0, 0, 50);
  //  asteroid.debug = true;
  }
}

function spawnAsteroid1(){
  if (frameCount%220===0){
    asteroids = createSprite(800,100,10,10);
    asteroids.addImage("asteroid",asteroidImg);
    asteroids.velocityX = -4
    asteroids.velocityY = 4
    asteroids.scale = 0.25
   
   //  createEdgeSprites();
   //  asteroid.bounceOff(edges);
 
   // asteroid.y = Math.round(random(10,290));
    asteroids.x = Math.round(random(100,790));

    asteroids.lifetime = 80;
    asteroidsGroup.add(asteroids);

    asteroids.setCollider("circle", 0, 0, 50);   }
 }