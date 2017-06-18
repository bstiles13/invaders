function Enemy(x, y) {
      img = loadImage("../app/tie.png");
      this.x = x;
      this.y = y;
      this.radius = 20;
      this.where = 1

    this.show = function() {
          image(img, this.x, this.y, this.radius * 2, this.radius * 2);

    }

    this.move = function() {
          this.x = this.x + this.where;
    }

    this.reverse = function() {
          this.where = this.where * -1;
          this.y = this.y + 10;
    }

}

