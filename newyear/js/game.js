'use strict';

var BASE_BALL_SPEED = 10;
var BRICKS_HORIZONTAL_COUNT = 10;
var BRICKS_VERTICAL_COUNT = 3;
var BRICKS_SPACE_RATIO = 0;
var BRICKS_SIZE_RATIO = 1;
var BALL_SIZE = 50;
var BOARD_WIDTH = 150;
var BOARD_HEIGHT = 120;

var brickWidth;
var brickHeight;

var gameStared = false;
var gameEnd = false;
var bricks;
var gifts = [];
var giftImages = [];

var playgroundWidth;
var palygroundHeight;

var imgBrick;
var imgBackground;
var imgBall;
var imgBoard;

var score = 0;

var Brick = function (i, j) {
  this.type = Math.floor(Math.random() * giftImages.length);
  this.i = i;
  this.j = j;
  this.x = i * brickWidth;
  this.y = j * brickHeight;

  console.log(this.x);
};

Brick.prototype.draw = function () {
  image(imgBrick, this.x, this.y, brickWidth, brickHeight);
};

var Gift = function (type, x, y) {
  this.x = x;
  this.y = y;
  this.type = type;
}

function initGame() {
  gameStared = false;
  gifts = [];
  gameEnd = false;

  bricks = new Array(BRICKS_HORIZONTAL_COUNT);
  for (var i = 0; i < BRICKS_HORIZONTAL_COUNT; i++) {
    bricks[i] = new Array(BRICKS_VERTICAL_COUNT);
  }

  for(var i = 0; i < BRICKS_HORIZONTAL_COUNT; i++) {
    for(var j = 0; j < BRICKS_VERTICAL_COUNT; j++){
      bricks[i][j] = new Brick(i, j);
      
    }
  }
};

function setup() {
  giftImages[0] = loadImage('img/cacke.png');
  giftImages[1] = loadImage('img/cars.png');
  giftImages[2] = loadImage('img/css.png');
  giftImages[3] = loadImage('img/html.png');
  giftImages[4] = loadImage('img/js.png');
  giftImages[5] = loadImage('img/heart.png');
  giftImages[6] = loadImage('img/keks.png');
  giftImages[7] = loadImage('img/money.png');

  imgBrick = loadImage('img/gift.png');
  imgBackground = loadImage('img/background4.jpg');
  imgBall = loadImage('img/snowball.png');
  imgBoard = loadImage('img/board.png');

  playgroundWidth = 800;
  palygroundHeight = 600;
  brickWidth = playgroundWidth / BRICKS_HORIZONTAL_COUNT;
  brickHeight = brickWidth / BRICKS_SIZE_RATIO;
  createCanvas(playgroundWidth, palygroundHeight);
  background(0);
  smooth();
  noStroke();
  initGame(); 
};
  
function drawBricks() {
  for(var i = 0; i < BRICKS_HORIZONTAL_COUNT; i++) {
    for(var j = 0; j < BRICKS_VERTICAL_COUNT; j++){
      if (bricks[i][j]) {
        bricks[i][j].draw();
      }
    }
  }
};

var boardX;
var boardY;

function drawBoard(x){
  fill(255,255,255);
  boardX = x - BOARD_WIDTH/2;
  if (boardX + BOARD_WIDTH > playgroundWidth) boardX = playgroundWidth - BOARD_WIDTH;
  boardY = palygroundHeight - BOARD_HEIGHT;
  image(imgBoard, boardX, boardY, BOARD_WIDTH, BOARD_HEIGHT);
}

function clearPlayground() {
  image(imgBackground, 0, 0, playgroundWidth, palygroundHeight);
}

var ballX;
var ballY;
var ballAngle;

function drawBall(){
  if (!gameStared) {
    ballAngle = 90;
    ballX = mouseX;
    ballY = boardY - BALL_SIZE / 2;
  } else {
    for (var i = 0; i < BASE_BALL_SPEED; i++) calc();
  }
  image(imgBall, ballX - BALL_SIZE / 2, ballY - BALL_SIZE / 2, BALL_SIZE, BALL_SIZE);
}

function dropBrick(i, j) {
  gifts.push(new Gift(bricks[i][j].type, bricks[i][j].x, bricks[i][j].y));
  bricks[i][j] = null;
  score += 1;
}

function checkKnock(x1, y1, x2, y2, w, h) {
  return ((x1 >= x2) && (x1 <= x2 + w) && (y1 >= y2) && (y1 <= y2 + h));
}

function calc() {
  if (ballY >= palygroundHeight) {
    initGame();
    return;
  }

  var boardKnock = checkKnock(ballX, ballY, boardX, boardY, BOARD_WIDTH, BOARD_HEIGHT);

  if (ballY + BALL_SIZE/2 <= 0) {
    ballAngle = 360 - ballAngle;
  } else if (ballX - BALL_SIZE/2 <= 0 || ballX + BALL_SIZE / 2 >= playgroundWidth) {
    ballAngle = 180 - ballAngle;
  } else if (boardKnock) {
    ballAngle = (mouseX - ballX) * 1.5 + 90;
  } else {
    for(var i=0; i < BRICKS_HORIZONTAL_COUNT; i++){
      for(var j=0; j < BRICKS_VERTICAL_COUNT; j++){
        if (bricks[i][j]){
          var brickKnock = checkKnock(ballX, ballY, bricks[i][j].x, 
                                      bricks[i][j].y, brickWidth, brickHeight);
          if (brickKnock) {
            dropBrick(i, j);
            ballAngle = 360 - ballAngle;
          }
        }
      }
    }
  }
 
  ballX = ballX + Math.cos(ballAngle / 180 * Math.PI);
  ballY = ballY - Math.sin(ballAngle / 180 * Math.PI);
};

var giftSpeed = 1;
function drawGifts() {
  for(var i = 0; i < gifts.length; i++){
    if (gifts[i]) {
      gifts[i].y += giftSpeed;
      image(giftImages[gifts[i].type], gifts[i].x, gifts[i].y, brickWidth, brickHeight);
      
      if (gifts[i].y > palygroundHeight) {
        gifts[i] = null;
      } else {
        var knock = checkKnock(gifts[i].x + BOARD_WIDTH/2, gifts[i].y + BOARD_HEIGHT / 2, 
                               boardX, boardY, BOARD_WIDTH, BOARD_HEIGHT);
        if (knock) {
          gifts[i] = null;
          score += 2;
        }
      }
    }
  }
}

function drawScore() {
  textSize(32);
  fill(255,255,255);
  textSize(32);
  text(score, playgroundWidth - 60, 30);
}

function checkGameEnd() {
  for(var i=0; i < BRICKS_HORIZONTAL_COUNT; i++){
    for(var j=0; j < BRICKS_VERTICAL_COUNT; j++){
      if (bricks[i][j]) return false;
    }
  }
  return true;
}

function drawWin() {
  var win = checkGameEnd();
  if (win) {
    textSize(100);
    fill('#002aff');
    textSize(100);
    var winText = 'YOU WIN!';
    text(winText, playgroundWidth/2 - textWidth(winText)/2, palygroundHeight/2);
  }
}

function draw() {
  clearPlayground();
  drawBricks();
  drawBoard(mouseX);
  drawGifts();
  gameEnd = checkGameEnd();
  if (!gameEnd) drawBall();
  else drawWin();
  drawScore();
};

function mouseClicked() {
  if (!gameStared) score = 0;
  if (gameEnd) initGame();
  else gameStared = true;
}