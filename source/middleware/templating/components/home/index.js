module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <h1>Home</h1>
  `, '#content');
  next();
}
