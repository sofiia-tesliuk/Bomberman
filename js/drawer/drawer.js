class Drawer{
  constructor(h, w, image){
    this.tileSize = 16;
    this.canvas = document.getElementById("screen");
    this.context = this.canvas.getContext("2d");
    this.context.font = '48px serif';
    this._defineTiles(image);
  }

  _defineTiles(image){
    this.sprites = new SpriteSheet(image);
      this.sprites.defineTile(marks.destructive, 2, 0);
      this.sprites.defineTile(marks.empty, 0, 0);
      this.sprites.defineTile(marks.undestructive, 1, 0);
      this.sprites.defineTile(marks.player_blue, 0, 2);
      this.sprites.defineTile(marks.player_pink, 2, 2);
      this.sprites.defineTile(marks.bomb, 0, 1);
      this.sprites.defineTile(marks.fire, 2, 1);
      this.sprites.defineTile(marks.bonus_bomb_plus, 1, 1);
      this.sprites.defineTile(marks.bonus_speed_plus, 1, 2);
  }

  drawField(general_field){
    for (let y = 0; y < general_field.height; y++){
      for (let x = 0; x < general_field.width; x++){
        this.sprites.drawTile(general_field.field[y][x], this.context, x, y);
      }
    }
    for (let y = 0; y < general_field.height; y++){
      for (let x = 0; x < general_field.width; x++){
        if ((general_field.bonuses[y][x] != null) &&
        (general_field.field[y][x] == marks.empty))
        this.sprites.drawTile(general_field.bonuses[y][x], this.context, x, y);
      }
    }
  }

  drawPlayers(players){
    players.forEach(player => this.sprites.drawTile(player.name, this.context, player.x, player.y));
  }

  drawBombs(bombs){
    bombs.forEach(bomb => this.sprites.drawTile(marks.bomb, this.context, bomb.x, bomb.y));
  }

  loadingWindow(general_field){
    for (let y = 0; y < general_field.height; y++){
      for (let x = 0; x < general_field.width; x++){
        this.sprites.drawTile(marks.empty, this.context, x, y);
      }
    }

    this.context.fillText("Press 'Enter'", 160, 160);
    this.context.fillText("to start the game.", 120, 220);
  }

  endGame(message, general_field){
    for (let y = 0; y < general_field.height; y++){
      for (let x = 0; x < general_field.width; x++){
        this.sprites.drawTile(marks.undestructive, this.context, x, y);
      }
    }

    this.context.fillText(message, 120, 190);
  }
}
