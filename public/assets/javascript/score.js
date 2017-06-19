function Score() {

    this.count = 0;

    this.show = function() {
        text('Score: ' + this.count, 10, 10, 100, 100);
    }
}