const settings    = require('../extensions/settings/webserver');
const protocol    = require('http');
const server      = protocol.createServer();
const router      = require('lr-server-router')(server, settings.redirectDomain);
const road        = require('lr-core')('webserver');
const serveStatic = require('serve-static');
const statics     = serveStatic('public');

server.listen(settings.port, settings.domain, function() {
  console.log(`server running on ${ settings.domain }:${ settings.port }`);
});

road
  .extension('router', router, true)
  .middleware({
    statics,
    'response.default'             : require('../middleware/response').default,
    'response.notFound'            : require('../middleware/response').notFound,
    'response.internalServerError' : require('../middleware/response').internalServerError,
  }, 'static');

require('./road')(road);
