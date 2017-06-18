function Rain(x, y) {

    this.x = x;
    this.y = y;
    this.radius = 15;
    this.toggle = false;


    this.show = function() {
    fill(255, 0, 0);
    rect(this.x, this.y, 5, this.radius * 2);
    }

    this.move = function() {
        this.y = this.y + 5;
    }

    this.hits = function(fighter) {
        var distance = dist(this.x, this.y, fighter.x + 10, fighter.y);
        if (distance <= this.radius + fighter.radius) {
            console.log('hit');
            return true;
        } else {
            // console.log(fighter.x);
            // console.log(d);
            // console.log('no');
            return false;
        }
    }

    this.kill = function() {
        this.toggle = true;
    }
}