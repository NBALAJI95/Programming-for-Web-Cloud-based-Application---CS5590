var controller = {
  init: function() {
    var d = new Date();
    this.latestTime = d.getTime();
    this.moveTimeGap = 700;
    TetrisModel.model.init();
    view.init();
  },

  reduceInterval: function() {
    if ( this.moveTimeGap > 100 ) {
      this.moveTimeGap--;
    }
  },

  update: function() {
    var d = new Date();
    var newTime = d.getTime();
    var timeDiff = newTime - this.latestTime;

    if ( timeDiff > this.moveTimeGap ) {
      this.latestTime = newTime;
      TetrisModel.model.update();
    }

    view.update( TetrisModel.model.board, TetrisModel.model.presentBlock, TetrisModel.model.score );

  },

  moveRight: function() {
    TetrisModel.model.moveRight();
  },

  moveLeft: function() {
    TetrisModel.model.moveLeft();
  },

  moveDown: function() { // accelerate upon down-arrow 
    TetrisModel.model.moveDown();
  },

  rotate: function() { // changing shape upon up-arrow 
    TetrisModel.model.rotate();
  },

  lose: function() { // to show lost message when game is over 
    view.LostMsg();
  },
}
