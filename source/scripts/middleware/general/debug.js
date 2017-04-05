module.exports = (next, relay, request, response) => {
  if (relay.extensions.debug) {
    relay.extensions.debug.namespace('routing');
    relay.extensions.debug.log(request.url);
  }
  next();
}
