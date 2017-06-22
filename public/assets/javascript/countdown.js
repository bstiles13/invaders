function Countdown(level) {

    this.view = true;
    this.count = 4;

    this.show = function() {
      text("Level " + level, width / 2 - 15, height / 2 - 20, 100, 100);
      text(this.count, width / 2, height / 2, 100, 100);
    }
}