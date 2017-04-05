const settings = require('../extensions/settings/webserver');
const protocol = require('http');
const server   = protocol.createServer();
const router   = require('lr-server-router')(server, settings.redirectDomain);
const road     = require('lr-core')('webserver');

server.listen(settings.port, settings.domain, function() {
  console.log(`server running on ${ settings.domain }:${ settings.port }`);
});

road
  .extension('router', router, true)
  .extension('debug', require('lr-debug')('lr-website'))
  .middleware({
    general : {
      static : require('../middleware/general/static'),
      debug  : require('../middleware/general/debug'),
      html   : require('../middleware/general/html'),
    }
  });

require('./road')(road);
