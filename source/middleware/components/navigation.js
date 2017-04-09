module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/guide">Guide</a></li>
        <li><a href="/reference">Reference</a></li>
        <li><a href="/faq">Faq</a></li>
      </ul>
    </nav>
  `, '#navigation');
  next();
}
