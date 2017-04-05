module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <nav>
      hey
    </nav>
  `, '#navigation');
  next();
}
