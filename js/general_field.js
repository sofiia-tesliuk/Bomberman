class GeneralField{
  constructor(h, w){
    this.height = h;
    this.width = w;
    this.field = this._generateField();
    this.bonuses = this._generateBonuses();
    while (!this._fieldIsValid(this.field)){
      console.log('Regenerate');
      this.field = this._generateField();
    }
  }

  _randomCell(){
    let v = Math.random();
    if (v < 0.2){
      return marks.undestructive;
    } else if (v < 0.6){
      return marks.destructive;
    } else{
      return marks.empty;
    }
  }

  _randomBonusCell(){
    let v = Math.random();
    if (v < 0.05){
      return marks.bonus_bomb_plus;
    } else if (v < 0.1){
      return marks.bonus_speed_plus;
    } else{
      return null;
    }
  }

  // Checks if Player1 can reach Player2
  _fieldIsValid(field){
    let arr = new Array(this.height).fill(false).map((row) => new Array(this.width).fill(false));
    // Where Player1 starts
    arr[1][1] = true;
    for (let x = 2; x < this.width - 1; x++){
      arr[1][x] = arr[1][x - 1] && (field[1][x] != marks.undestructive);
    }
    for (let y = 2; y < this.height - 1; y++){
      for (let x = 1; x < this.width - 1; x++){
        arr[y][x] = (field[y][x] != marks.undestructive) &&
                    (arr[y][x - 1] || arr[y - 1][x]);
      }
    }
    // Player1 can reach Player2
    return arr[this.height - 2][this.width - 2];
  }

  _generateField(){
    let arr = new Array(this.height).fill(true).map((row) =>
    new Array(this.width).fill(true).map((cell) => this._randomCell()));

    // Undestructive borders
    for (let x = 0; x < this.width; x++){
      arr[0][x] = marks.undestructive;
      arr[this.height - 1][x] = marks.undestructive;
    }
    for (let y = 0; y < this.height; y++){
      arr[y][0] = marks.undestructive;
      arr[y][this.width - 1] = marks.undestructive;
    }

    // Empty cells for players initialization
    // Player 1
    arr[1][1] = marks.empty;
    arr[1][2] = marks.empty;
    arr[2][1] = marks.empty;

    // PLayer 2
    arr[this.height - 2][this.width - 2] = marks.empty;
    arr[this.height - 2][this.width - 3] = marks.empty;
    arr[this.height - 3][this.width - 2] = marks.empty;
    return arr;
  }

  _generateBonuses(){
    return  new Array(this.height).fill(true)
    .map(row => new Array(this.width).fill(true)
    .map(cell => this._randomBonusCell()));
  }
}
