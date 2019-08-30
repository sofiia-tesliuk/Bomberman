class Player{
  constructor(name, x, y){
    this.name = name;
    this.x = x;
    this.y = y;
    this.bombPower = 1;
    this.speed = 0.15;
    this.error = 2 * this.speed;
    this.alive = true;
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
  }

  placeBomb(){
    return new Bomb(this.actualX(), this.actualY(), this.bombPower);
  }
}
