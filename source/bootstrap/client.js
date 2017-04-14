const router   = require('lr-client-router');
const renderer = require('lr-client-renderer');
const road     = require('lr-core')('client');
road
  .extension('router', router, true)
  .extension('renderer', renderer, true)
  .middleware({
    'events.default' : require('../middleware/events/default')
  });

require('./road')(road);
