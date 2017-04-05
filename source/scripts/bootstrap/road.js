module.exports = road => {
  road
    .where('webserver')
      .match('home', '/')
      .run('*', 'templating.layouts.default')
      .run('*', 'templating.components.navigation')
      .noMatch('response.html.404')
      .error('response.html.500')
      .done('response.html.200');
}
