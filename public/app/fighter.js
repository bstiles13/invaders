function Fighter() {
    this.x = width/2;
    img1 = loadImage("../app/xwing.png"); 
    this.direction = 0;


    this.show = function() {
        image(img1, this.x, height - 100, img1.width/8, img1.height/8);

    }

    this.set = function (dir) {
        this.direction = dir;
    } 

    this.move = function() {
        this.x += this.direction * 3;
    }
}

