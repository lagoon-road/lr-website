module.exports = road => {
  road
    .where('webserver')
      .match('home', '/')
      .match('about', '/about')
      .match('reference', '/reference')
      .match('guide', '/guide')
      .match('faq', '/faq')
      .run('*', 'templating.layouts.default')
      .run('*', 'templating.components.navigation')
      .run('home', 'templating.components.home')
      .run('guide', 'templating.components.guide')
      .run('reference', 'templating.components.reference')
      .run('faq', 'templating.components.faq')
      .run('about', 'templating.components.about')
      .noMatch('response.html.404')
      .error('response.html.500')
      .done('response.html.200');
}
