function Enemy(x, y, where, type) {
      this.x = x;
      this.y = y;
      this.radius = 20;
      this.where = where;
      this.index = type;
      this.images = [
            "./assets/javascript/tie.png",
            "./assets/javascript/tie1.png"
      ]
      this.img = loadImage(this.images[this.index]);

    this.show = function() {
          image(this.img, this.x, this.y, this.radius * 2, this.radius * 2);

    }

    this.move = function() {
          this.x = this.x + this.where;
    }

    this.reverse = function() {
          this.where = this.where * -1;
          this.y = this.y + 10;
    }
    
    this.hits = function(fighter) {
        var distance = dist(this.x, this.y, fighter.x + fighter.radius, fighter.y + 10);
        if (distance <= fighter.radius + 15) {
            // console.log('hit');
            return true;
        } else {
            return false;
        }
    }

}

