module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <h1>Guide</h1>
  `, '#content');
  next();
}
