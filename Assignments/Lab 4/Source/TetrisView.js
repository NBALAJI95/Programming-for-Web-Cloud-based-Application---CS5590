var view = {

  init: function() {
    this.blockSize = 36;
    var canvas_m = "<canvas id='canvasTetris' width='" + (TetrisModel.model.width * this.blockSize) + "' height='" + ((TetrisModel.model.height - 4) * this.blockSize) + "'></canvas>";
    $('.game-board').append(canvas_m);
    this.canvas = $('#canvasTetris');
    this.context = this.canvas[0].getContext('2d');
    this.eachMoveListener();
  },

  drawBlock: function(row, col, colour) {
    var blockXStart = col * this.blockSize;
    var blockYStart = (row - 4) * this.blockSize;
    this.context.fillStyle = colour;
    this.context.strokeStyle = "#000";
    this.context.lineWidth = 5;
    this.context.lineJoin="round";
    this.context.lineCap="round";
    this.context.fillRect(blockXStart, blockYStart, this.blockSize, this.blockSize);
    this.context.strokeRect(blockXStart, blockYStart, this.blockSize, this.blockSize);
  },

  blockColors: function(type) {
    var colour = "#000";
    switch (type) {
      case 1:
        colour = "#43AEC7";
        break;
      case 2:
        colour = "#C364D7";
        break;
      case 3:
        colour = "#BDC234";
        break;
      case 4:
        colour = "#DB2947";
        break;
      case 5:
        colour = "#F9A247";
        break;
      case 6:
        colour = "#F77320";
        break;
      case 7:
        colour = "#FCCC2F";
        break;
      case 8:
        colour = "#EE6599";
        break;
      case 9:
        colour = "#FEE590";
        break;
    }
    return colour;
  },

  drawBlocks: function(board, block) {
    for ( var row = 4; row < board.length; row++ ) {
      for( var col = 0; col < board[row].length; col++ ) {
        if ( board[row][col] ) {
          this.drawBlock( row, col, this.blockColors(board[row][col]) );
        }
      }
    }

    for ( var row = 0; row < block.layoutGrid.length; row++) {
      for (var col = 0; col < block.layoutGrid[row].length; col++) {
        if( block.layoutGrid[row][col] ) {
          var b_x = block.left + col;
          var b_y = block.top + row;
          this.drawBlock( b_y, b_x, this.blockColors(block.layoutGrid[row][col]) )
        }
      }
    }
  },

  update: function(board, block, score) {
    this.context.clearRect(0, 0, TetrisModel.model.width * this.blockSize, TetrisModel.model.height * this.blockSize);
    this.context.fillStyle = "#eee";
    this.context.fillRect(0, 0, TetrisModel.model.width * this.blockSize, TetrisModel.model.height * this.blockSize);
    this.drawBlocks(board, block);
    this.drawScore(score);
  },

  drawScore: function(score) {
    $("#score-box").html("<h3>Score: <span id='score'>" + score + "</span></h3>");
  },

  LostMsg: function(score) {
    $("#loss-message").html("<h3>Game Over!</h3>");
    $("#loss-message").append("<h3>Click anywhere to play again!</h3>")
    $(window).on('click', function() {
      location.reload();
    });
  },

  eachMoveListener: function() {
    $(window).on('keydown', function(event) {
      event.preventDefault();
      switch (event.which) {
        case 37:
          controller.moveLeft();
          break;
        case 39:
          controller.moveRight();
          break;
        case 38:
          controller.rotate();
          break
        case 40:
          controller.moveDown();
          break;
        default:
          break;
      }
    })
  }
}
