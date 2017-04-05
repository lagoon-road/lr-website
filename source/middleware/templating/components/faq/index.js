module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <h1>FAQ</h1>
  `, '#content');
  next();
}
