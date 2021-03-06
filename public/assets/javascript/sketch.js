var playing = false;
var lives = 3;
var edge = false;
var alive = true;
var score = 0;
var missileCooldown = false;
var missileCount = 0;
var leftPressed = false;
var rightPressed = false;
var enemyFire;
var level = 1;
var levels = [
  {
    speed: 0.5,
    interval: 1000
  },
  {
    speed: 0.9,
    interval: 900
  },
  {
    speed: 1.1,
    interval: 800
  },
  {
    speed: 1.3,
    interval: 700
  },
  {
    speed: 1.5,
    interval: 600
  },
  {
    speed: 1.7,
    interval: 500
  },
  {
    speed: 1.9,
    interval: 400
  },
  {
    speed: 2.1,
    interval: 300
  },
  {
    speed: 2.3,
    interval: 200
  },
  {
    speed: 3,
    interval: 100
  }
]

//Canvas Components
var countdown;
var life;
var scorebox;
var img;
var fighter;
var volley;
var fire;
var stars = [];
var enemies = [];
var walls = [];
var missiles = [];
var volleyArray = [];
var fires = [];
var gameOver = {};


function preload() {
  mySound = loadSound("./assets/javascript/shootsound.mp3");
  mySound1 = loadSound("./assets/javascript/explode.mp3");
  mySound2 = loadSound("./assets/javascript/r2.mp3");
  mySound3 = loadSound("./assets/javascript/explode1.mp3");
  mySound4 = loadSound("./assets/javascript/muffled.mp3");
}

function setup() {
  var canvas = createCanvas(780, 580);
  canvas.parent('canvas');
  startSetup();
}

function draw() {
  background(0);
  textSize(15);
  fill(255, 254, 247);
  for (var i = 0; i < stars.length; i++) {
    stars[i].show();
  }
  enemies.length <= 0 ? (missiles = [], fires = [], volley = [], level++ , clearInterval(enemyFire), startSetup()) : false;
  playing ? drawObjects(drawMovement) : false;
  // countdown.count === 0 ? drawMovement() : false;
  // playing ? startDraw2() : false;
}

function startSetup() {

  for (var i = 0; i < 100; i++) {
    stars[i] = new Star();
  }

  countdown = new Countdown(level);
  fighter = new Fighter();
  scorebox = new Scorebox(score);
  life = new Life();
  gameOver = new GameOver();

  for (var i = 0; i < 33; i++) {
    if (i < 11) {
      enemies[i] = new Enemy(i * 50 + 80, 40, levels[level - 1].speed, 1);
    } else if (i < 22) {
      enemies[i] = new Enemy((i - 11) * 50 + 80, 100, levels[level - 1].speed, 0);
    } else if (i < 33) {
      enemies[i] = new Enemy((i - 22) * 50 + 80, 160, levels[level - 1].speed, 0);
    }
  }

  for (var i = 0; i < 3; i++) {
    walls[i] = new Wall(i * 240 + 80, height - 200);
  }

  enemyFire = setInterval(function () {
    lives > 0 && playing ? letItVolley() : false;
  }, levels[level - 1].interval);
}

function drawObjects(func) {

  edge = false;
  lives > 0 ? true : gameOver.show();
  if (countdown.view) {
    countdown.show();
  };
  scorebox.show();
  life.show(lives);
  fighter.show();

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].show();
  }

  for (var i = 0; i < walls.length; i++) {
    walls[i].show();
  }

  func && alive && countdown.view === false ? func() : false;
}


function drawMovement() {


  // ellipse(50, 50, 80, 80);
  // image(img, 0, height/2, img.width/2, img.height/2);
  // rect(width/2, height - 20, 20, 20);

  // fighter.move();
  if (leftPressed) {
    fighter.x = fighter.x - 4;
  }
  
  if (rightPressed) {
    fighter.x = fighter.x + 4;
  }

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].move();
    if (enemies[i].x + (enemies[i].radius * 2) >= width || enemies[i].x <= 0) {
      edge = true;
    }
    if (enemies[i].hits(fighter)) {
      lives--;
    }
  }

  if (edge) {
    for (var i = 0; i < enemies.length; i++) {
      enemies[i].reverse();
    }
  }

  for (var i = 0; i < missiles.length; i++) {
    missiles[i].show();
    missiles[i].move();
    for (var z = enemies.length - 1; z >= 0; z--) {
      if (missiles[i].hits(enemies[z])) {
        mySound3.play();
        missiles[i].killEnemy();
        enemies.splice(z, 1);
        score += 20;
        scorebox.updateScore(score);
      }
    }
    for (var z = walls.length - 1; z >= 0; z--) {
      if (missiles[i].hitsWall(walls[z])) {
        missiles[i].killWall();
      }
    }
  }

  for (var i = 0; i < missiles.length; i++) {
    if (missiles[i].toggleEnemy === true) {
      if (i % 2 === 0) {
        missiles.splice(i, 2);
      } else {
        missiles.splice(i - 1, 1);
      }
    }
  }

  for (var i = 0; i < missiles.length; i++) {
    if (missiles[i].toggleWall === true) {
      missiles.splice(i, 1);
    }
  }

  for (var i = 0; i < volleyArray.length; i++) {
    volleyArray[i].show();
    volleyArray[i].move();
    if (volleyArray[i].hits(fighter)) {
      volleyArray[i].kill();
      lives > 1 ? mySound1.play() : mySound2.play();
      lives--;
    }
    for (var z = walls.length - 1; z >= 0; z--) {
      if (volleyArray[i].hitsWall(walls[z])) {
        mySound4.play();
        walls[z].takeDamage();
        fire = new Fire(walls[z].x, walls[z].y);
        fires.push(fire);
        volleyArray[i].kill();
      }
    }
  }

  for (var i = 0; i < walls.length; i++) {
    if (walls[i].destroy === true) {
      for (var z = fires.length - 1; z >= 0; z--) {
        if (fires[z].proximity(walls[i])) {
          fires.splice(z, 1);
        }
      }
      walls.splice(i, 1);
    }
  }

  for (var i = 0; i < volleyArray.length; i++) {
    if (volleyArray[i].toggle === true) {
      volleyArray.splice(i, 1);
    }
  }

  for (var i = 0; i < fires.length; i++) {
    fires[i].show();
  }

  lives > 0 ? true : alive = false;

}

function keyReleased() {
  if (keyCode == 37) {
    leftPressed = false;
  }
  else if (keyCode == 39) {
    rightPressed = false;
  }
}

function keyPressed() {
  if (countdown.count <= 0) {
    switch (keyCode) {
      case 37:
        leftPressed = true;
        // fighter.set(-1)
        break;
      case 39:
        rightPressed = true;
        // fighter.set(1)
        break;
      case 32:
        if (!missileCooldown) {
          var missile = new Missile(fighter.x + 0, fighter.y, 1);
          missiles.push(missile);
          var missile = new Missile(fighter.x + 55, fighter.y, -1);
          missiles.push(missile);
          mySound.play();
          setTimeout(function () {
            var missile = new Missile(fighter.x + 0, fighter.y, 1);
            missiles.push(missile);
            var missile = new Missile(fighter.x + 55, fighter.y, -1);
            missiles.push(missile);
            mySound.play();
          }, 150);
          missileCooldown = true;
          cooldown();
        }
        break;
    }
  }
}

function letItVolley() {
  if (enemies.length > 0 && countdown.count <= 0) {
    var random = parseInt(Math.floor(Math.random() * (enemies.length)));
    var volley = new Volley(enemies[random].x + enemies[random].radius, enemies[random].y + 5);
    volleyArray.push(volley);
  }
}



setInterval(function () {
  if (countdown.count > 0 && playing) {
    countdown.count--;
  } else if (playing) {
    countdown.view = false;
  }
}, 1000);

function cooldown() {
  setTimeout(function () {
    missileCooldown = false;
  }, 1000);
}
