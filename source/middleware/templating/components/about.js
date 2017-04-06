module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <h1>About</h1>
  `, '#content');
  next();
}
