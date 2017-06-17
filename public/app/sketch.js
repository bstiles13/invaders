var img;
var fighter;
var enemies = [];
var missiles = [];


function setup() {
  createCanvas(1000, 700);

  fighter = new Fighter();
  for (var i = 0; i < 33; i++) {
    if (i < 11) {
      enemies[i] = new Enemy(i*80+80, 40);
    } else if (i < 22) {
      enemies[i] = new Enemy((i - 11)*80+80, 100);
    } else if (i < 33) {
      enemies[i] = new Enemy((i - 22)*80+80, 160);
    }
  }
}

function draw() {
  background(0);
  // ellipse(50, 50, 80, 80);
  // image(img, 0, height/2, img.width/2, img.height/2);
  // rect(width/2, height - 20, 20, 20);
  fighter.show();
  fighter.move();
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].show();
  }

  for (var i = 0; i < missiles.length; i++) {
    missiles[i].show();
    missiles[i].move();
    for (var z = enemies.length - 1; z >= 0; z--) {
      if (missiles[i].hits(enemies[z])) {
        missiles[i].kill();
        enemies.splice(z, 1);
      }
    }
  }

  for (var i = 0; i < missiles.length; i++) {
    if (missiles[i].toggle === true) {
      missiles.splice(i, 1);
    }
  }

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
      var missile = new Missile(fighter.x + 40, height);
      missiles.push(missile);
    break;
  }
}
