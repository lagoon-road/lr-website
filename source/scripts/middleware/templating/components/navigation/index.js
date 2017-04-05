module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <h1>Navigation</h1>
  `, '#navigation');
  next();
}
