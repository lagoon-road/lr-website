module.exports = road => {
  road
    .where('webserver', 'client')
      .middleware({
        debug                         : (next, relay, request) => { console.log(request.url); next() },
        'components.navigation'       : require('../middleware/components/navigation'),
        'components.home'             : require('../middleware/components/home'),
        'components.reference'        : require('../middleware/components/reference'),
        'components.lrCore'           : require('../middleware/components/reference/lr-core'),
        'components.lrServerRouter'   : require('../middleware/components/reference/lr-server-router'),
        'components.lrServerRenderer' : require('../middleware/components/reference/lr-server-renderer'),
        'components.lrClientRouter'   : require('../middleware/components/reference/lr-client-router'),
        'components.lrClientRenderer' : require('../middleware/components/reference/lr-client-renderer'),
        'components.lrUrlParser'      : require('../middleware/components/reference/lr-url-parser'),
        'components.faq'              : require('../middleware/components/faq'),
        'components.guide'            : require('../middleware/components/guide'),
        'components.error'            : require('../middleware/components/error'),
        'components.noMatch'          : require('../middleware/components/noMatch'),
      })
      .run('*', 'debug')
    .where('webserver')
      .run('*', 'layouts.default')
      .run('*', 'components.navigation')
      .noMatch('layouts.default')
    .where('client')
      .run('*', 'events.navigation', 'domReady')
    .where('webserver', 'client')
      .run('/', 'components.home')
      .run('/guide', 'components.guide')
      .run('/reference', 'components.reference')
      .run('/reference/lr-core', 'components.lrCore')
      .run('/reference/lr-server-router', 'components.lrServerRouter')
      .run('/reference/lr-server-renderer', 'components.lrServerRenderer')
      .run('/reference/lr-client-router', 'components.lrClientRouter')
      .run('/reference/lr-client-renderer', 'components.lrClientRenderer')
      .run('/reference/lr-url-parser', 'components.lrUrlParser')
      .run('/faq', 'components.faq')
      .noMatch('components.noMatch')
      .error('components.error')
      .done('response.html')

  return road;
}
