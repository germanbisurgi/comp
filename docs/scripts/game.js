var game = null;
window.addEventListener('load', function () {
  game = new naive.Game();
  game.state.add(setupState);
  game.state.add(physicsState);
  game.state.add(mapState);
  game.state.add(angryState);
  game.state.switch('setup-state');
  game.loop.start();
});
