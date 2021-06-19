var appleImg, bananaImg, blueberryImg, cherriesImg, cutterImg, bgImg;
var score,cutter,fruitG;
const PLAY = 1;
const END = 0;
var gameState=PLAY, timer = 0;



function preload(){
  appleImg=loadImage("./images/apple.png")
  bananaImg=loadImage("./images/banana.png")
  blueberryImg=loadImage("./images/blueberry.png")
  cherriesImg=loadImage("./images/cherries.png")
  cutterImg=loadImage("./images/cutter.png")
  bgImg=loadImage("./images/bg.png")
}

function setup() {
  createCanvas(400,400);
  cutter = createSprite(width/2,height/2,30,30);
  cutter.debug = true;
  cutter.setCollider("rectangle", 0,0,cutter.width, cutter.height);
  cutter.rotation = -45;
  cutter.addImage(cutterImg);
  cutter.scale = 0.3;
  fruitG = createGroup();
  score = 0;
}

function draw() {
  background(bgImg);
  text("Score: "+ score, 300,50);
  text("Timer: "+ timer, 300,100);
  if (gameState === PLAY) {
    //timer = frameCount/getFrameRate()
    timer++;
    console.log(frameCount);
    console.log(getFrameRate())
    cutter.x = World.mouseX;
    cutter.y = World.mouseY;
    spawnFruits1(); // top to bottom
    spawnFruits2(); // left to right
    if (touches.length > 0) console.log("touches = " + touches[0].x + ", " + touches[0].y);
    for (var i = 0; i < fruitG.length; i++){
      console.log("x and y of fruit"+fruitG[i].x + ","+ fruitG[i])
      if (cutter.isTouching(fruitG[i])) {
        fruitG[i].destroy();
        score++;
      }  
    }
    if (timer > 1000) {
      gameState = END;
    }

  }
  else {
      text("Game Over! Come back later for more", 200,200);
      fruitG.setVelocityXEach(0);
      fruitG.setVelocityYEach(0);
      fruitG.setLifetimeEach(-1);
  }

  drawSprites();
}

function spawnFruits1() {
  if (World.frameCount%50===0){
    var fruit = createSprite(random(50,350), 0);
    fruit.addImage(appleImg);
    fruit.scale = 0.1;
    fruit.velocityY = 5+score/10;
    fruit.velocityX = random(-5,5);
    fruit.lifetime = 100;
    fruitG.add(fruit);
  }
}

function spawnFruits2() {
  if (World.frameCount%100===0){
    var fruit = createSprite(0, random(50,350));
    fruit.addImage(bananaImg);
    fruit.scale = 0.1;
    fruit.velocityX = 5;
    fruit.velocityY = random(-4,4)+ score/100;
    fruit.lifetime = 100;
    fruitG.add(fruit);
  }
}