class Bomb{
  constructor(x, y, power){
    this.timeLeft = 300;
    this.x = x;
    this.y = y;
    this.power = power;
  }

  checkState(players, general_field){
    this.timeLeft -= 1;
    if (this.timeLeft == 50) this._fire(players, general_field)
    else if (this.timeLeft == 0){
      this._cleanFire(general_field.field);
      return true;
    };
    return false;
  }

  _burnCell(players, general_field, x, y){
      players.forEach(player => {if ((player.actualX() == x) && (player.actualY() == y)) player.alive = false});
      if (general_field.field[y][x] != marks.empty){
        if (general_field.field[y][x] == marks.destructive) general_field.field[y][x] = marks.fire;
        return true;
      }
      general_field.field[y][x] = marks.fire;
      if (general_field.bonuses[y][x] != null){
        general_field.bonuses[y][x] = null;
        return true;
      }
      return false;

  }

  _fire(players, general_field){
    this._burnCell(players, general_field, this.x, this.y);
    for (let i = 1; i <= this.power; i++){
      if (this._burnCell(players, general_field, this.x + i, this.y)) break;
    }
    for (let i = 1; i <= this.power; i++){
      if (this._burnCell(players, general_field, this.x - i, this.y)) break;
    }
    for (let i = 1; i <= this.power; i++){
      if (this._burnCell(players, general_field, this.x, this.y + i)) break;
    }
    for (let i = 1; i <= this.power; i++){
      if (this._burnCell(players, general_field, this.x, this.y - i)) break;
    }
  }

  _cleanFire(field){
    field[this.y][this.x] = marks.empty;
    let i = 1;
    while (field[this.y][this.x + i] == marks.fire){
      field[this.y][this.x + i] = marks.empty;
      i++;
    }
    i = 1;
    while (field[this.y][this.x - i] == marks.fire){
      field[this.y][this.x - i] = marks.empty;
      i++;
    }
    i = 1;
    while (field[this.y + i][this.x] == marks.fire){
      field[this.y + i][this.x] = marks.empty;
      i++;
    }
    i = 1;
    while (field[this.y - i][this.x] == marks.fire){
      field[this.y - i][this.x] = marks.empty;
      i++;
    }
  }
}
