module.exports = (next, relay, request, response) => {
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.statusCode = 404;
  response.end('<h1>404 - File not found</h1>');
}
