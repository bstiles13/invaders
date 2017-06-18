function Fighter() {
    this.x = width/2;
    this.y = height - 60;
    this.radius = 20;
    img1 = loadImage("../app/xwing.png"); 
    this.direction = 0;


    this.show = function() {
        image(img1, this.x, this.y, this.radius * 3, this.radius * 3);
    }

    this.set = function (dir) {
        this.direction = dir;
    } 

    this.move = function() {
        this.x += this.direction * 4;
    }
}

