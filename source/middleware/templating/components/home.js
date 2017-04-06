module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
  `, '#content');
  next();
}
