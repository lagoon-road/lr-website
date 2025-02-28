const settings    = require('../extensions/settings/webserver');
const protocol    = require('http');
const server      = protocol.createServer();
const router      = require('lr-server-router')(server, settings.redirectDomain);
const road        = require('lr-main')('webserver');
const renderer    = require('lr-server-renderer');

server.listen(settings.port, settings.domain, function() {
  console.log(`server running on ${ settings.domain }:${ settings.port }`);
});

road
  .extension('router', router, true)
  .extension('renderer', renderer())
  .middleware({
    'response.html'   : require('../middleware/response'),
    'layouts.default' : require('../middleware/layouts/default'),
  });

require('./road')(road);
