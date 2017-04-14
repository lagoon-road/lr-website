module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <section id="error" data-lr="loaded">
      <h1>Error</h1>
      <pre>${ relay.error }</pre>
    </section>
  `, 'article');
  next();
}
