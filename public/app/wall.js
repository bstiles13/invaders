function Wall(x, y) {

    this.x = x;
    this.y = y;
    img2 = loadImage("../app/battleship.png"); 

    this.show = function() {
        image(img2, this.x, this.y, 180, 80 );
    }
}