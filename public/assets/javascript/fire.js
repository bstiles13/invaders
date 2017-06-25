function Fire(x, y) {

    this.x = Math.floor(Math.random() * ((x + 120) - (x - 0) + 1)) + (x - 0);
    this.y = Math.floor(Math.random() * ((y + 20) - (y - 0) + 1)) + (y - 0);
    this.width = 40;
    this.height = 20;
    this.img5 = loadImage("./assets/javascript/fire.png"); 

    this.show = function() {
        image(this.img5, this.x, this.y, this.width, this.height);
    }

    this.proximity = function(wall) {
        var distance = dist(this.x, this.y, wall.x + 50, wall.y + 20);
        if (distance <= 150) {
            return true;
        } else {
            return false;
        }
    }
}