function Star() {
    
    this.radius = Math.floor(Math.random() * 3);
    this.x = Math.floor(Math.random() * width);
    this.y = Math.floor(Math.random() * height);


    this.show = function() {
        fill(255, 255, 255);
        ellipse(this.x, this.y, this.radius * 2);
    }
}