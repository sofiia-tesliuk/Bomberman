class Game{
  constructor(drawer, h, w){
    this.general_field = new GeneralField(h, w);
    this.players = [new Player(marks.player_blue, 1, 1),
                    new Player(marks.player_pink, this.general_field.width - 2, this.general_field.height - 2)];
    this.bombs = new Array();
    this._initializeKeybord();
    this.drawer = drawer;
    this.game_over = false;
  }

  _initializeKeybord(){
    document.addEventListener('keydown', (e) => {
      if (e.code === "ArrowUp")        this.players[1].move(this.general_field, 'up')
      else if (e.code === "ArrowDown") this.players[1].move(this.general_field, 'down')
      else if (e.code === 'ArrowLeft') this.players[1].move(this.general_field, 'left')
      else if (e.code === 'ArrowRight') this.players[1].move(this.general_field, 'right')
      else if (e.code === 'ShiftRight') this.bombs.push(this.players[1].placeBomb())
      else if (e.code === 'KeyW') this.players[0].move(this.general_field, 'up')
      else if (e.code === 'KeyS') this.players[0].move(this.general_field, 'down')
      else if (e.code === 'KeyA') this.players[0].move(this.general_field, 'left')
      else if (e.code === 'KeyD') this.players[0].move(this.general_field, 'right')
      else if (e.code === 'ShiftLeft') this.bombs.push(this.players[0].placeBomb())
    });
  }

  nextIteration(){
    this.drawer.drawField(this.general_field);
    this.bombs = this.bombs.filter(el => !el.checkState(this.players, this.general_field));
    this.drawer.drawField(this.general_field);
    this.players = this.players.filter(player => player.alive);
    this.drawer.drawPlayers(this.players);
    this.drawer.drawBombs(this.bombs);
    if (this.players.length < 2) return this._endGame();
  }

  _endGame(){
    if (this.players.length == 1) this.drawer.endGame(`You won, ${this.players[0].name}!`, this.general_field);
    else this.drawer.endGame('Game over!', this.general_field);
    this.game_over = true;
  }
}
