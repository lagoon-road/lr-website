module.exports = road => {
  road
    .where('webserver')
      .match('home', '/')
      .error('response.internalServerError')
      .done('response.default');
}
