
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <h1 id="handling-static-content">Handling static content</h1>
<p><strong>Although it is possible to add middleware to handle your static files, like scripts, images and stylesheets. It is better to do this via a reverse proxy on a webserver like Nginx. Node is not the best choice when it comes to serving static content. This is way easier with a Nginx setup. It is trivial to gzip your files, add caching and catch redundant calls to your node server.
Furthermore it is pretty straight forward to add HTTPS with let&#39;s encrypt.</strong></p>
<p><strong>Read more about reverse proxies and Nginx in <a href="https://code.lengstorf.com/deploy-nodejs-ssl-digitalocean/">this</a> outstanding post. Although it is for a Digital Ocean droplet, it shows you very clearly how to setup a reverse proxy that you can use without Digital Ocean.</strong></p>
<p>For testing purposes you might want to use some static middleware. The following code is mainly a copy from <a href="https://developer.mozilla.org/en-US/docs/Node_server_without_framework">here</a> with some small adjustments to accommodate Lagoon road.</p>
<pre><code>const url  = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>);
const fs   = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
const path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">next</span>, relay, request, response)</span> =&gt;</span> {
  const parsedUrl = url.parse(request.url);
  let pathname    = \`.\$\{ parsedUrl.pathname \}\`;
  const extension = path.parse(pathname).ext;

  const fileTypes = {
    <span class="hljs-string">'.ico'</span>  : <span class="hljs-string">'image/x-icon'</span>,
    <span class="hljs-string">'.html'</span> : <span class="hljs-string">'text/html'</span>,
    <span class="hljs-string">'.js'</span>   : <span class="hljs-string">'text/javascript'</span>,
    <span class="hljs-string">'.json'</span> : <span class="hljs-string">'application/json'</span>,
    <span class="hljs-string">'.css'</span>  : <span class="hljs-string">'text/css'</span>,
    <span class="hljs-string">'.png'</span>  : <span class="hljs-string">'image/png'</span>,
    <span class="hljs-string">'.jpg'</span>  : <span class="hljs-string">'image/jpeg'</span>,
    <span class="hljs-string">'.wav'</span>  : <span class="hljs-string">'audio/wav'</span>,
    <span class="hljs-string">'.mp3'</span>  : <span class="hljs-string">'audio/mpeg'</span>,
    <span class="hljs-string">'.svg'</span>  : <span class="hljs-string">'image/svg+xml'</span>,
    <span class="hljs-string">'.pdf'</span>  : <span class="hljs-string">'application/pdf'</span>,
    <span class="hljs-string">'.doc'</span>  : <span class="hljs-string">'application/msword'</span>
  };

  // Not static
  <span class="hljs-keyword">if</span> (!fileTypes[extension]) {
    relay.extensions.<span class="hljs-built_in">debug</span>(\`\$\{ request.url \} is <span class="hljs-keyword">not</span> static\`);
    <span class="hljs-built_in">next</span>();
    <span class="hljs-keyword">return</span>;
  }

  fs.exists(pathname, <span class="hljs-function"><span class="hljs-params">(exist)</span> =&gt;</span> {
    <span class="hljs-keyword">if</span>(!exist) {
      relay.extensions.<span class="hljs-built_in">debug</span>(\`\$\{ pathname \} does <span class="hljs-keyword">not</span> exist on disk\`);
      response.end(<span class="hljs-string">'404 - File not found'</span>);
      relay.exit();
    } <span class="hljs-keyword">else</span> {
      relay.extensions.<span class="hljs-built_in">debug</span>(\`\$\{ pathname \} does exist loading it\`);
      // read file <span class="hljs-keyword">from</span> file system
      fs.readFile(pathname, <span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">error</span>, data)</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">error</span>){
          relay.extensions.<span class="hljs-built_in">debug</span>(\`File \$\{ pathname \} <span class="hljs-keyword">not</span> found on disk\`);
          response.end(<span class="hljs-string">'404 - File not found'</span>);
        } <span class="hljs-keyword">else</span> {
          relay.extensions.<span class="hljs-built_in">debug</span>(<span class="hljs-string">'sending back static file: '</span> + pathname);
          response.setHeader(<span class="hljs-string">'Content-type'</span>, fileTypes[extension] || <span class="hljs-string">'text/plain'</span> );
          response.end(data);
        }
        relay.exit();
      });
    }
  });
}
</code></pre><p>We will not going to much into detail on how this middleware works, it is pretty self explanatory. The only thing to notice is that we use <code>relay.exit()</code> after we are done responding to a static request. Read the <a href="/guide/update-and-middleware-stack">Update and middleware stack</a> section to find out why.</p>
<p>Next: <a href="/guide/make-a-single-page-app">Turn your server side rendered page in to a single page app</a></p>

    `, 'article');
    next();
  }
  