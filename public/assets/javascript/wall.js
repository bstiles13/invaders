function Wall(x, y) {

    this.x = x;
    this.y = y;
    this.destroy = false;
    this.index = 0;
    this.images = [
        "./assets/javascript/battleship.png",
        "./assets/javascript/battleship1.png",
        "./assets/javascript/battleship2.png",
        "./assets/javascript/battleship3.png",
        "./assets/javascript/battleship4.png",
        "./assets/javascript/battleship5.png",
        "./assets/javascript/battleship6.png",
        "./assets/javascript/battleship7.png",
        "./assets/javascript/battleship8.png",
    ]
    this.img2 = loadImage(this.images[0]); 

    this.show = function() {
        image(this.img2, this.x, this.y, 160, 60 );
    }

    this.changeImage = function() {
        this.index < this.images.length - 1 ? this.index++ : this.destroy = true;
        this.img2 = loadImage(this.images[this.index]); 
        console.log(this.index);
    }
}