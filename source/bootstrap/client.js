document.addEventListener("DOMContentLoaded", function(event) {
  const router   = require('lr-client-router');
  const renderer = require('lr-client-renderer');
  const road     = require('lr-core')('client');
  road
    .extension('router', router, true)
    .extension('renderer', renderer())
    // .middleware({
    //   'events.navigation' : require('../middleware/events/navigation')
    // });

  require('./road')(road);
});
