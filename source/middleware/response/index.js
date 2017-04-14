module.exports = (next, relay, request, response) => {
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.end(relay.extensions.renderer ? relay.extensions.renderer.html() : '<h1>Hello world</h1>');
  next();
}
