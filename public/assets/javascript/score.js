function Scorebox(count) {

    this.count = count;

    this.show = function() {
        text('Score: ' + this.count, 10, 10, 100, 100);
    }

    this.updateScore = function(score) {
        this.count = score;
    }
}