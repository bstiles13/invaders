var playing = false;
var life;
var lives = 3;
var img;
var score;
var fighter;
var rain;
var stars = [];
var enemies = [];
var walls = [];
var missiles = [];
var rainArray = [];
var gameOver = {};

function preload() {
  mySound = loadSound("../app/shootsound.mp3");
  mySound1 = loadSound("../app/shootsound1.mp3");

}

function startSetup() {
  var canvas = createCanvas(800, 600);
  canvas.parent('canvas');


  for (var i = 0; i < 100; i++) {
    stars[i] = new Star();
  }

  fighter = new Fighter();
  score = new Score();
  life = new Life();
  gameOver = {
    show: function () {
      text('GAME OVER', width / 2, height / 2, 100, 100);
    }
  };

  for (var i = 0; i < 33; i++) {
    if (i < 11) {
      enemies[i] = new Enemy(i * 60 + 80, 40);
    } else if (i < 22) {
      enemies[i] = new Enemy((i - 11) * 60 + 80, 100);
    } else if (i < 33) {
      enemies[i] = new Enemy((i - 22) * 60 + 80, 160);
    }
  }
  for (var i = 0; i < 3; i++) {
    walls[i] = new Wall(i * 300 + 20, height - 200);
  }
}

function startDraw() {
    background(0);
  var edge = false;

  // ellipse(50, 50, 80, 80);
  // image(img, 0, height/2, img.width/2, img.height/2);
  // rect(width/2, height - 20, 20, 20);
  for (var i = 0; i < stars.length; i++) {
    stars[i].show();
  }
  lives > 0 ? true : gameOver.show();
  score.show();
  life.show(lives);
  fighter.show();
  fighter.move();
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].show();
    lives > 0 ? enemies[i].move() : false;
    if (enemies[i].x + (enemies[i].radius * 2) >= width || enemies[i].x <= 0) {
      edge = true;
    }
  }

  if (edge) {
    for (var i = 0; i < enemies.length; i++) {
      enemies[i].reverse();
    }
  }

  for (var i = 0; i < missiles.length; i++) {
    missiles[i].show();
    // mySound1.play();
    lives > 0 ? missiles[i].move() : false;
    for (var z = enemies.length - 1; z >= 0; z--) {
      if (missiles[i].hits(enemies[z])) {
        missiles[i].kill();
        enemies.splice(z, 1);
        score.count += 20;
      }
    }
    for (var z = walls.length - 1; z >= 0; z--) {
      if (missiles[i].hitsWall(walls[z])) {
        missiles[i].kill();
      }
    }
  }

  for (var i = 0; i < missiles.length; i++) {
    if (missiles[i].toggle === true) {
      if (i % 2 === 0) {
        missiles.splice(i, 2);
      } else {
        missiles.splice(i - 1, 1);
      }
    }
  }

  for (var i = 0; i < rainArray.length; i++) {
    rainArray[i].show();
    lives > 0 ? rainArray[i].move() : false;
    // console.log(fighter);
    if (rainArray[i].hits(fighter)) {
      console.log('hit');
      rainArray[i].kill();
      lives--;
    }
    for (var z = walls.length - 1; z >= 0; z--) {
      if (rainArray[i].hitsWall(walls[z])) {
        rainArray[i].kill();
      }
    }
  }

  for (var i = 0; i < rainArray.length; i++) {
    if (rainArray[i].toggle === true) {
      rainArray.splice(i, 1);
    }
  }

  for (var i = 0; i < walls.length; i++) {
    walls[i].show();
  }

}

function setup() {
  startSetup();

}



function draw() {
  playing ? startDraw() : false;

}

function keyReleased() {
  if (keyCode != 32) {
    fighter.set(0);
  }

}

function keyPressed() {

  switch (keyCode) {
    case LEFT_ARROW:
      fighter.set(-1)
      break;
    case 39:
      fighter.set(1)
      break;
    case 32:
      console.log('yes');
      var missile = new Missile(fighter.x + 0, fighter.y, 1);
      missiles.push(missile);
      var missile = new Missile(fighter.x + 55, fighter.y, -1);
      missiles.push(missile);
      mySound.play();
      break;
  }
}

function letItRain() {
  if (enemies.length > 0) {
    var random = parseInt(Math.floor(Math.random() * (enemies.length)));
    var rain = new Rain(enemies[random].x, enemies[random].y);
    // console.log(rain);
    rainArray.push(rain);
  }
}

setInterval(function () {
  lives > 0 ? letItRain() : false;

}, 500);
