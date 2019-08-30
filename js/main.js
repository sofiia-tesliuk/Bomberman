var fieldHeight = 20;
var fieldWidth = 30;

loadImage("img/tileset.png")
.then(image => {
  var drawer = new Drawer(fieldHeight, fieldWidth, image);
  var game = new Game(drawer, fieldHeight, fieldWidth);

  function update(){
    game.nextIteration();
    requestAnimationFrame(update);
  }

  update();
});
