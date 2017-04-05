module.exports = (next, relay, request, response) => {
  console.log(relay.error);
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.statusCode = 500;
  response.end('<h1>500 - Interal server error</h1>');
}
