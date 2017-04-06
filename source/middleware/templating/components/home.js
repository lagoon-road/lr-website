module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <h1>Home</h1>
    <p>Some more content</p>
    <div class="bla">
      <h2> nested</h2>
    </div>
  `, '#content');
  next();
}
