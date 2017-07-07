var TetrisModel = TetrisModel || {};

TetrisModel.model = {
  height: 24,
  width: 10,
  board: [],

  init: function() {
    this.score = 0;
    for(var row=0; row < this.height; row++) {
      this.board.push(Array(this.width));
    };
    this.generateBlock();
    this.playing = true;
  },

  update: function() {
    if ( this.playing ) {
      this.moveDown();
      this.checkLines();
      this.checkLoss();
    }
  },

  stopBlock: function() {
    for(var row = 0; row < this.presentBlock.layoutGrid.length; row++) {
      for(var col = 0; col < this.presentBlock.layoutGrid[row].length; col++) {
        var b_x = this.presentBlock.left + col;
        var b_y = this.presentBlock.top + row;

        if (this.presentBlock.layoutGrid[row][col]) {
          this.board[b_y][b_x] = this.presentBlock.layoutGrid[row][col];
        }
      }
    }
  },

  generateBlock: function() {
    this.presentBlock = new TetrisModel.Block();
  },

  moveLeft: function() {
    var validMove = true;
    for(var row = 0; row < this.presentBlock.layoutGrid.length; row++) {
      for(var col = 0; col < this.presentBlock.layoutGrid[row].length; col++) {
        var b_x = this.presentBlock.left + col;
        var b_y = this.presentBlock.top + row;
        var leftBorder = this.board[b_y] ? this.board[b_y][b_x - 1] : false;
        if ( this.presentBlock.layoutGrid[row][col] && ( leftBorder || b_x - 1 < 0 ) ) {
          validMove = false;
        };
      }
    }

    if (validMove) {
      this.presentBlock.left--;
    };
  },

  moveRight: function() {
    var validMove = true;
    for(var row = 0; row < this.presentBlock.layoutGrid.length; row++) {
      for(var col = 0; col < this.presentBlock.layoutGrid[row].length; col++) {
        var b_x = this.presentBlock.left + col;
        var b_y = this.presentBlock.top + row;
        var rightBorder = this.board[b_y] ? this.board[b_y][b_x + 1] : false;
        if ( this.presentBlock.layoutGrid[row][col] && ( rightBorder || b_x + 1 > this.width - 1 ) ) {
          validMove = false;
        };
      }
    };

    if (validMove) {
      this.presentBlock.left++;
    };
  },

  moveDown: function() {
    if ( this.playing ) {
      for(var row = 0; row < this.presentBlock.layoutGrid.length; row++) {
        for(var col = 0; col < this.presentBlock.layoutGrid[row].length; col++) {
          var b_x = this.presentBlock.left + col;
          var b_y = this.presentBlock.top + row;
          if (  this.presentBlock.layoutGrid[row][col] && (
                this.presentAtBottom(b_y) || this.board[b_y + 1][b_x] ) ) {
            controller.reduceInterval();
            this.stopBlock();
            this.generateBlock();
            return true;
          }
        }
      }
      this.presentBlock.top++;
    }
  },

  checkLines: function() {
    for(var row = 4; row < this.height; row++) {
      var tally = 0;
      for(var col = 0; col < this.width; col++) {
        if (this.board[row][col]) {
          tally++;
        }
      }
      if ( tally === this.width ) {
        this.board.splice(row, 1);
        this.board.splice(0,0,[0,0,0,0,0,0,0,0,0,0]);
        this.score += 15;
      }
    }
  },

  checkLoss: function() {
    for ( var row = 0; row < 4; row++) {
      for ( var col = 0; col < this.width; col++ ) {
        if ( this.board[row][col] ) {
          this.playing = false;
          controller.lose();
        }
      }
    }
  },

  presentAtBottom: function(y) {
    return ( y + 1 ) >= ( this.height );
  },

  outOfReach: function(x,y) {
    return x >= this.width || x < 0 || y >= this.height || y < 0
  },

  rotate: function() {
    this.presentBlock.rotate();
    for(var row = 0; row < this.presentBlock.layoutGrid.length; row++) {
      for(var col = 0; col < this.presentBlock.layoutGrid[row].length; col++) {
        var b_x = this.presentBlock.left + col;
        var b_y = this.presentBlock.top + row;

        if ( this.presentBlock.layoutGrid[row][col] && ( this.board[b_y][b_x] || this.outOfReach(b_x,b_y) ) ) {
          this.presentBlock.rotateReverse();
        };
      }
    };
  },

  rotateReverse: function() {
    this.presentBlock.rotateReverse();
  },

}
