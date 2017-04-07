module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <h1>Reference</h1>
  `, 'article');
  next();
}
