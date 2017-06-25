function Volley(x, y) {

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
        var distance = dist(this.x, this.y, fighter.x + fighter.radius, fighter.y + 10);
        if (distance <= fighter.radius + 15) {
            console.log('hit');
            return true;
        } else {
            return false;
        }
    }

    this.hitsWall = function(wall) {
        var distance = dist(this.x, this.y, wall.x + 77, wall.y + 65);
        if (distance <= this.radius + 70) {
            return true;
        } else {
            return false;
        }
    }

    this.kill = function() {
        this.toggle = true;
    }
}