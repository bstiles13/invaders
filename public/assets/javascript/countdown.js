function Countdown() {

    this.view = true;
    this.count = 4;

    this.show = function() {
      text(this.count, width / 2, height / 2, 100, 100);
    }
}