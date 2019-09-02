class Player{
  constructor(name, x, y){
    this.name = name;
    this.x = x;
    this.y = y;
    this.speed = 0.15;
    this.bombPower = 1;
    this.error = 0.3;
    this.alive = true;
    this._display_speed();
    this._display_bomb_power();
  }

  actualX(){ return Math.round(this.x);}

  actualY(){ return Math.round(this.y);}

  move(general_field, direction){
    // Can move vertically
    if ((Math.abs(this.x - this.actualX()) <= this.error) && ((direction == 'up') || (direction == 'down'))){
      this.x = this.actualX();
      if ((direction == 'up') && (general_field.field[Math.floor(this.y)][this.actualX()] == marks.empty)) this.y -= this.speed
      else if ((direction == 'down') && (general_field.field[Math.ceil(this.y)][this.actualX()] == marks.empty)) this.y += this.speed
    }
    // Can move horizontally
    if ((Math.abs(this.y - this.actualY()) <= this.error) && ((direction == 'right') || (direction == 'left'))){
      this.y = this.actualY();
      if ((direction == 'right') && (general_field.field[this.actualY()][Math.ceil(this.x)] == marks.empty)) this.x += this.speed
      else if ((direction == 'left') && (general_field.field[this.actualY()][Math.floor(this.x)] == marks.empty)) this.x -= this.speed;
    }

    if (general_field.bonuses[this.actualY()][this.actualX()] == marks.bonus_bomb_plus){
      this._bonus_bomb_plus();
      general_field.bonuses[this.actualY()][this.actualX()] = null;
    }

    if (general_field.bonuses[this.actualY()][this.actualX()] == marks.bonus_speed_plus){
      this._bonus_speed_plus();
      general_field.bonuses[this.actualY()][this.actualX()] = null;
    }
  }

  placeBomb(){
    return new Bomb(this.actualX(), this.actualY(), this.bombPower);
  }

  _bonus_speed_plus(){
    this.speed = Math.min(0.5, this.speed + 0.02);
    this._display_speed();
  }

  _bonus_bomb_plus(){
    this.bombPower = Math.min(5, this.bombPower + 1);
    this._display_bomb_power();
  }

  _display_speed(){
    document.getElementById(this.name + "_speed").innerHTML = Math.round(this.speed * 100) / 100;
  }

  _display_bomb_power(){
    document.getElementById(this.name + "_bomb-power").innerHTML = Math.round(this.bombPower * 100) / 100;
  }
}
