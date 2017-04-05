module.exports = road => {
  road
    .where('webserver', 'client')
      .middleware({
        debug                              : (next, relay, request) => { console.log(request.url); next() },
        'templating.components.navigation' : require('../middleware/templating/components/navigation'),
        'templating.components.about'      : require('../middleware/templating/components/about'),
        'templating.components.home'       : require('../middleware/templating/components/home'),
        'templating.components.reference'  : require('../middleware/templating/components/reference'),
        'templating.components.faq'        : require('../middleware/templating/components/faq'),
        'templating.components.guide'      : require('../middleware/templating/components/guide'),
        'templating.components.error'      : require('../middleware/templating/components/error'),
        'templating.components.noMatch'    : require('../middleware/templating/components/noMatch'),
      })
      .match('home', '/')
      .match('about', '/about')
      .match('reference', '/reference')
      .match('guide', '/guide')
      .match('faq', '/faq')
      .run('*', 'debug')
    .where('webserver')
      .run('*', 'templating.layouts.default')
      .run('*', 'templating.components.navigation')
    .where('client')
      .once('*', 'events.navigation', 'domLoaded')
    .where('webserver', 'client')
      .run('home', 'templating.components.home')
      .run('guide', 'templating.components.guide')
      .run('reference', 'templating.components.reference')
      .run('faq', 'templating.components.faq')
      .run('about', 'templating.components.about')
      .noMatch('templating.layouts.default')
      .noMatch('templating.components.noMatch')
      .error('templating.layouts.default')
      .error('templating.components.error')
      .done('response');
}
