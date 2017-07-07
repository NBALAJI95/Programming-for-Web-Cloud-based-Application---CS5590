var TetrisModel = TetrisModel || {};

TetrisModel.Block = function() {
  var type = TetrisModel.SymbolTypes[ Math.floor( Math.random() * TetrisModel.SymbolTypes.length ) ];
  this.layoutGrid = [];
  for ( var i = 0; i < TetrisModel.Symbols[type].length; i++ ) {
    this.layoutGrid[i] = TetrisModel.Symbols[type][i];
  }

  this.top = 0;
  this.left = Math.floor( Math.random() * 7 + 1 );

  var rotations = Math.floor(Math.random() * 4)

  for ( var r = 0; r < rotations; r++ ) {
    this.rotate();
  }

};

TetrisModel.Block.prototype.emptyGridLayout = function(rows) {
  var emptyGridLayout = [];
  for ( var row = 0; row < rows; row++) {
    emptyGridLayout[row] = [];
  }
  return emptyGridLayout;
};

TetrisModel.Block.prototype.cleanLayoutGrid = function() {
  for ( var row = this.layoutGrid.length - 1; row >= 0; row-- ) {
    if ( this.layoutGrid[row] === undefined ) {
      this.layoutGrid.pop();
      continue;
    }
  }
};

TetrisModel.Block.prototype.rotate = function() {
  var newLayoutGrid = this.emptyGridLayout( this.layoutGrid[0].length );
  for ( var row = 0; row < this.layoutGrid.length; row++ ) {
    for ( var col = 0; col < this.layoutGrid[row].length; col++ ) {
      newLayoutGrid[col][row] = this.layoutGrid[row][(this.layoutGrid[0].length - 1)-col];
    }
  }
  for ( var i = 0; i < this.layoutGrid.length; i++ ) {
    this.layoutGrid[i] = newLayoutGrid[i];
  }
  this.cleanLayoutGrid();
};

TetrisModel.Block.prototype.rotateReverse = function() {
  var newLayoutGrid = this.emptyGridLayout( this.layoutGrid[0].length );
  for ( var row = 0; row < this.layoutGrid.length; row++ ) {
    for ( var col = 0; col < this.layoutGrid[row].length; col++ ) {
      newLayoutGrid[col][row] = this.layoutGrid[(this.layoutGrid.length - 1)-row][col];
    }
  }
  for ( var i = 0; i < this.layoutGrid.length; i++ ) {
    this.layoutGrid[i] = newLayoutGrid[i];
  }
  this.cleanLayoutGrid();
};

TetrisModel.Block.prototype.moveDown = function() {

};

TetrisModel.SymbolTypes = [ "Sqr", "Line", "rightLow", "leftLow", "leftSShape", "rightSShape", "tShape", "Point", "Doubl", "TripleStraight", "miniLar", "bigLarg", "bigTUpsideDown", "plusSymbol", "bigCSymbol", "leftGSymbol", "rightGSymbol" ];

TetrisModel.Symbols = {

  Sqr: [ [1,1],
            [1,1] ],

  Line: [   [0,0,2,0],
            [0,0,2,0],
            [0,0,2,0],
            [0,0,2,0],],

  rightLow: [ [0,3,0],
            [0,3,0],
            [0,3,3] ],

  leftLow: [  [0,4,0],
            [0,4,0],
            [4,4,0] ],

  leftSShape:  [ [5,0,0],
            [5,5,0],
            [0,5,0] ],

  rightSShape: [ [0,0,6],
            [0,6,6],
            [0,6,0] ],

  tShape: [ [0,7,0],
            [7,7,7],
            [0,0,0] ],

  Point: [ [8] ],

  Doubl: [ [0,9],
            [0,9] ],

  TripleStraight: [ [0,1,0],
            [0,1,0],
            [0,1,0] ],

  miniLar:  [ [2,0],
            [2,2] ],

  bigLarg:   [ [3,0,0],
            [3,0,0],
            [3,3,3] ],

  bigTUpsideDown:   [ [0,4,0],
            [0,4,0],
            [4,4,4] ],

  plusSymbol:   [ [0,5,0],
            [5,5,5],
            [0,5,0] ],

  bigCSymbol:   [ [6,6,0],
            [6,0,0],
            [6,6,0] ],

  leftGSymbol:  [ [0,7,0],
            [7,7,0],
            [7,7,0] ],

  rightGSymbol: [ [0,8,0],
            [0,8,8],
            [0,8,8] ]
};
