module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <h1>Error</h1>
    <pre>${ relay.error }</pre>
  `, '#content');
  next();
}
