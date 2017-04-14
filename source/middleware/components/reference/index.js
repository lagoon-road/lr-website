module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <section id="reference" data-lr="loaded">
      <h1>Reference</h1>
      <p>Although Lagoon road needs only a single package to be up and running, namely lr-core, it comes with additional packages that make it easy to do some common tasks, like routing and rendering.</p>
      <ul class="submenu">
        <li><a href="/reference/lr-core">lr-core</a></li>
        <li><a href="/reference/lr-server-router">lr-server-router</a></li>
        <li><a href="/reference/lr-server-renderer">lr-server-renderer</a></li>
        <li><a href="/reference/lr-client-router">lr-client-router</a></li>
        <li><a href="/reference/lr-client-renderer">lr-client-renderer</a></li>
        <li><a href="/reference/lr-url-parser">lr-url-parser</a></li>
      </ul>
    </section>
  `, 'article');
  next();
}
