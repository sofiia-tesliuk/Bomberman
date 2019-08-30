class Drawer{
  constructor(h, w, image){
    this.tileSize = 16;
    this.canvas = document.getElementById("screen");
    this.context = this.canvas.getContext("2d");
    this._defineTiles(image);
  }

  _defineTiles(image){
    this.sprites = new SpriteSheet(image);
      this.sprites.defineTile(marks.destructive, 0, 0);
      this.sprites.defineTile(marks.empty, 3, 23);
      this.sprites.defineTile(marks.undestructive, 1, 0);
      this.sprites.defineTile(marks.players[0], 4, 21);
      this.sprites.defineTile(marks.players[1], 4, 27);
      this.sprites.defineTile(marks.bomb, 16, 18);
      this.sprites.defineTile(marks.fire, 3, 24);
  }

  prepareNewGame(general_field){
    this._const_background = this._createConstBackground(general_field);

  }

  _createConstBackground(general_field){
    const buffer = document.createElement('canvas');
    buffer.width = this.tileSize * general_field.width;
    buffer.height = this.tileSize * general_field.height;
    const buffer_context = buffer.getContext('2d');
    for (let y = 0; y < general_field.height; y++){
      for (let x = 0; x < general_field.width; x++){
        if (general_field.field[y][x] != marks.destructive)
        this.sprites.drawTile(general_field.field[y][x], buffer_context, x, y);
      }
    }
    return buffer;
  }

  drawField(general_field){
    // Drawing const background
    this.context.drawImage(this._const_background, 0, 0);

    // Destructive cells
    for (let y = 0; y < general_field.height; y++){
      for (let x = 0; x < general_field.width; x++){
        if (general_field.field[y][x] == marks.destructive)
        this.sprites.drawTile(marks.destructive, this.context, x, y);
      }
    }
  }

  drawPlayers(players){
    for (let i = 0; i < players.length; i++){
      this.sprites.drawTile(marks.players[i], this.context, players[i].x, players[i].y);
    }
  }

  drawBombs(bombs){
    bombs.forEach(bomb => this.sprites.drawTile(marks.bomb, this.context, bomb.x, bomb.y));
  }
}
