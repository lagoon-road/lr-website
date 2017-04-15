
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <section id="" data="lr-loaded">
          <h1 id="make-a-single-page-app">Make a single page app</h1>
<p>Now that we have all the server side stuff in place it is time to spice things up a bit and show you where Lagoon road really shines, sharing code between environments.</p>
<h5 id="lr-examples-make-a-single-page-app-source-webserver-js">lr-examples/make-a-single-page-app/source/webserver.js</h5>
<pre><code><span class="hljs-keyword">const</span> protocol = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-keyword">const</span> server   = protocol.createServer();
<span class="hljs-keyword">const</span> router   = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-server-router'</span>)(server);
<span class="hljs-keyword">const</span> renderer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-server-renderer'</span>)();
<span class="hljs-keyword">const</span> road     = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-core'</span>)(<span class="hljs-string">'webserver'</span>)
  .extension(<span class="hljs-string">'router'</span>, router, <span class="hljs-literal">true</span>)
  .extension(<span class="hljs-string">'renderer'</span>, renderer)
  .middleware({
    <span class="hljs-string">'layouts.default'</span> : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/layouts/default'</span>),
    <span class="hljs-attr">response</span>          : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/response'</span>),
    <span class="hljs-attr">statics</span>           : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/statics'</span>),
  });

<span class="hljs-built_in">require</span>(<span class="hljs-string">'./road'</span>)(road);

server.listen(<span class="hljs-number">8080</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server running on localhost:8080'</span>);
});
</code></pre><p>The webserver in basically the same as in the server side example, except that we removed the middleware that we want to share between enviroments. Only the middleware that is exclusive for the webserver is added in this file.</p>
<p>After we have setup the road, we pass it down to a new file, <code>require(&#39;./road&#39;)</code>.</p>
<pre><code><span class="hljs-selector-tag">require</span>(<span class="hljs-string">'./road'</span>)(road);
</code></pre><p>This is the file that we will use for all the shared code between environments.</p>
<h5 id="lr-examples-make-a-single-page-app-source-client-js">lr-examples/make-a-single-page-app/source/client.js</h5>
<pre><code><span class="hljs-keyword">const</span> router   = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-client-router'</span>);
<span class="hljs-keyword">const</span> renderer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-client-renderer'</span>);
<span class="hljs-keyword">const</span> road     = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-core'</span>)(<span class="hljs-string">'client'</span>)
  .extension(<span class="hljs-string">'router'</span>, router, <span class="hljs-literal">true</span>)
  .extension(<span class="hljs-string">'renderer'</span>, renderer, <span class="hljs-literal">true</span>);

<span class="hljs-built_in">require</span>(<span class="hljs-string">'./road'</span>)(road);
</code></pre><p>As you can see the client side code looks very similar to the web server code, the packages are different but are hooked in under the exact same name, this allows us to use the same middleware for both client and server. Specific client side middleware can be hooked up in the <code>client.js</code> file.</p>
<h5 id="lr-examples-make-a-single-page-app-source-road-js">lr-examples/make-a-single-page-app/source/road.js</h5>
<pre><code><span class="hljs-keyword">const</span> debug = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../extensions/debug'</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">road</span> =&gt;</span> {
  road
    .extension(<span class="hljs-string">'debug'</span>, debug)
    .middleware({
      <span class="hljs-attr">debug</span>                   : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/debug'</span>),
      <span class="hljs-string">'components.navigation'</span> : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/components/navigation'</span>),
      <span class="hljs-string">'components.home'</span>       : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/components/home'</span>),
      <span class="hljs-string">'components.contact'</span>    : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/components/contact'</span>)
    })
    .where(<span class="hljs-string">'webserver'</span>)
      .run(<span class="hljs-string">'*'</span>, <span class="hljs-string">'debug'</span>)
      .run(<span class="hljs-string">'*'</span>, <span class="hljs-string">'statics'</span>)
      .run(<span class="hljs-string">'*'</span>, <span class="hljs-string">'layouts.default'</span>)
    .where(<span class="hljs-string">'webserver'</span>, <span class="hljs-string">'client'</span>)
      .run(<span class="hljs-string">'*'</span>, <span class="hljs-string">'components.navigation'</span>)
      .run(<span class="hljs-string">'/'</span>, <span class="hljs-string">'components.home'</span>)
      .run(<span class="hljs-string">'/contact'</span>, <span class="hljs-string">'components.contact'</span>)
      .done(<span class="hljs-string">'response'</span>);
}
</code></pre><p>The road file is the place where we add all the stuff that needs to be shared between our environments. This is not limited to the client and web server. If you have an API server you can add the listeners here too. You have a single file were you can find all the paths that your app is using. It becomes very easy to figure out the flow of your app.</p>
<p>You can see that we use a new method</p>
<pre><code>.<span class="hljs-keyword">where</span>(<span class="hljs-string">'webserver'</span>)
</code></pre><p>This method sets the context for all the following methods, so the core knows that the <code>run</code> method belongs to the webserver. Sharing methods between environments becomes a breeze, just add all the environments that need to share code and you are done.</p>
<pre><code>.<span class="hljs-keyword">where</span>(<span class="hljs-string">'webserver'</span>, <span class="hljs-string">'client'</span>)
</code></pre><p>Next: <a href="/guide/working-with-dom-events">Working with DOM events</a></p>

        </section>
    `, 'article');
    next();
  }
  