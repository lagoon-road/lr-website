module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <h1>About</h1>
    <p>Some more content</p>
    <div class="bla">
      <h2> nested ja</h2>
    </div>
  `, '#content');
  next();
}
