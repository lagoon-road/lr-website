
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <h1 id="lr-examples">lr-examples</h1>
<p>All the examples from the guide</p>

    `, 'article');
    next();
  }
  