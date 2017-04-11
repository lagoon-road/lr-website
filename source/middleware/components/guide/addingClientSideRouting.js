
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <h1 id="adding-client-side-routing">Adding client side routing</h1>

    `, 'article');
    next();
  }
  