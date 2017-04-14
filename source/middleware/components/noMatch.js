module.exports = (next, relay, request) => {
  relay.extensions.renderer.render(`
    <section id="noMatch" data-lr="loaded">
      <h1>404 - Page not found</h1>
      <pre>
        Oh my, ${ request.url } could not be found
      </pre>
    </section>
  `, 'article');
  next();
}
