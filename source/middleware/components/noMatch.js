module.exports = (next, relay, request) => {
  relay.extensions.renderer.render(`
    <h1>404 - Page not found</h1>
    <pre>
      Oh my, ${ request.url } could not be found
    </pre>
  `, 'article');
  next();
}
