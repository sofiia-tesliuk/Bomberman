var fieldHeight = 12;
var fieldWidth = 17;

loadImage("img/tileset.png")
.then(image => {
  var drawer = new Drawer(fieldHeight, fieldWidth, image);
  var game = new Game(drawer, fieldHeight, fieldWidth);

  function update(){
    if (game.game_over){
      return;
    }
    game.nextIteration();
    requestAnimationFrame(update);
  }

  drawer.loadingWindow(game.general_field);
  document.addEventListener('keydown', (e) => {
    if ((e.code === "Enter") && (!game.started)) update();
  });
});
