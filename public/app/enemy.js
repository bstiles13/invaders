function Enemy(x, y) {
      img = loadImage("../app/tie.png");
      this.x = x;
      this.y = y;
      this.radius = 20; 


    this.show = function() {
          image(img, this.x, this.y, this.radius * 2, this.radius * 2);

    }

}

