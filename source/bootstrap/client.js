const router   = require('lr-client-router');
const renderer = require('lr-client-renderer');
const road     = require('lr-main')('client');
road
  .extension('router', router, true)
  .extension('renderer', renderer, true)
  .middleware({
    'events.navigation' : require('../middleware/events/navigation')
  });

require('./road')(road);
