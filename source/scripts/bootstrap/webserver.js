const settings    = require('../extensions/settings/webserver');
const protocol    = require('http');
const server      = protocol.createServer();
const router      = require('lr-server-router')(server, settings.redirectDomain);
const road        = require('lr-core')('webserver');
const renderer    = require('lr-server-renderer');

server.listen(settings.port, settings.domain, function() {
  console.log(`server running on ${ settings.domain }:${ settings.port }`);
});

road
  .extension('router', router, true)
  .extension('renderer', renderer())
  .middleware({
    'response.html.200'                : require('../middleware/response/html/200'),
    'response.html.404'                : require('../middleware/response/html/404'),
    'response.html.500'                : require('../middleware/response/html/500'),
    'templating.layouts.default'       : require('../middleware/templating/layouts/default'),
    'templating.components.navigation' : require('../middleware/templating/components/navigation'),
  });

require('./road')(road);
