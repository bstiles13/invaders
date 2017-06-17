function Missile(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.toggle = false;

    this.show = function() {
        fill(0, 255, 255);
        rect(this.x, this.y, 5, this.radius * 2);
    }

    this.move = function() {
        this.y = this.y - 5;
    }

    this.kill = function() {
        this.toggle = true;
    }

    this.hits = function(enemy) {
        // console.log(this.x);
        // console.log(this.y);
        // console.log(enemy.x);
        // console.log(enemy.y);

        var distance = dist(this.x, this.y, enemy.x + 10, enemy.y);
        // setInterval(function(){ console.log(distance); }, 1000);
        if (distance <= this.radius) {
            return true;
        } else {
            return false;
        }
    }
}