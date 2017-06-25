function Wall(x, y) {

    this.x = x;
    this.y = y;
    this.damage = 0;
    this.destroy = false;
    this.images = [
        "./assets/javascript/battleship.png",
    ]
    this.img2 = loadImage(this.images[0]); 

    this.show = function() {
        image(this.img2, this.x, this.y, 160, 60 );
    }

    this.takeDamage = function() {
        this.damage < 10 ? this.damage++ : this.destroy = true;
    }
}