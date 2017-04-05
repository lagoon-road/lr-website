const url  = require('url');
const fs   = require('fs');
const path = require('path');

module.exports = (request, response, next, relay) => {

  const debug = relay.debug;
  debug.namespace('statics');

  const parsedUrl = url.parse(request.url);
  let pathname    = `.${parsedUrl.pathname}`;
  const extension = path.parse(pathname).ext;

  const fileTypes = {
    '.ico'  : 'image/x-icon',
    '.html' : 'text/html',
    '.js'   : 'text/javascript',
    '.json' : 'application/json',
    '.css'  : 'text/css',
    '.png'  : 'image/png',
    '.jpg'  : 'image/jpeg',
    '.wav'  : 'audio/wav',
    '.mp3'  : 'audio/mpeg',
    '.svg'  : 'image/svg+xml',
    '.pdf'  : 'application/pdf',
    '.doc'  : 'application/msword'
  };

  // Not static
  if (!fileTypes[extension]) {
    debug.log(`${ url } is not static`);
    next();
    return;
  }

  fs.exists(pathname, (exist) => {
    if(!exist) {
      relay.middleware('response.htmlNotFound');
    }

    // if is a directory search for index file matching the extention
    if (fs.statSync(pathname).isDirectory()) pathname += '/index' + extension;

    // read file from file system
    fs.readFile(pathname, (error, data) => {
      if (error){
        throw new Error(error);
      } else {

        try {
          const cache = relay.settings.cache.statics;
          cache.forEach(header => {
            response.setHeader(header.name, header.value);
          });
        } catch (error) {
          debug.log(`No cache headers set for static content via settings.cache.statics = [{ name : 'Cache-Control', value : 'max-age=1000'}]`);
        }

        relay.middleware('response.static', fileTypes[extension], data);
      }
    });
  });
}
