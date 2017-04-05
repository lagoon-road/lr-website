module.exports = road => {
  road
    .where('webserver')
      .run('*', 'general.debug')
      .error('general.html.internalServerError')
      .done('general.html.default');
}
