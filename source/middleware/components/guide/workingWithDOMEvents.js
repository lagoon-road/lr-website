
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <section id="" data="lr-loaded">
          <h1 id="working-with-dom-events">Working with DOM events</h1>
<p>In this guide we will do a simple <code>console.log</code> from our event middleware that will show you that the DOM is ready to be accessed.</p>
<h5 id="working-with-dom-events-source-middleware-events-navigation-js">working-with-dom-events/source/middleware/events/navigation.js</h5>
<pre><code><span class="hljs-built_in">module</span>.exports = (next, relay) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">\`There</span> are <span class="hljs-string">\$\{</span> <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">\'nav\').children.length</span> <span class="hljs-string">\}</span> menu items<span class="hljs-string">\`);</span>
  next();
}
</code></pre><p>Just a regular middleware function that should give is the number of menu items.</p>
<h5 id="working-with-dom-events-source-middleware-bootstrap-client-js">working-with-dom-events/source/middleware/bootstrap/client.js</h5>
<pre><code><span class="hljs-keyword">const</span> router   = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-client-router'</span>);
<span class="hljs-keyword">const</span> renderer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-client-renderer'</span>);
<span class="hljs-keyword">const</span> road     = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-main'</span>)(<span class="hljs-string">'client'</span>)
  .extension(<span class="hljs-string">'router'</span>, router, <span class="hljs-literal">true</span>)
  .extension(<span class="hljs-string">'renderer'</span>, renderer, <span class="hljs-literal">true</span>)
  .middleware({
    <span class="hljs-string">'events.navigation'</span> : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/events/navigation'</span>)
  });

<span class="hljs-built_in">require</span>(<span class="hljs-string">'./road'</span>)(road);
</code></pre><p>We have added the middleware to the client, this is obviously because it should only be used on the clientside.</p>
<h5 id="working-with-dom-events-source-middleware-bootstrap-road-js">working-with-dom-events/source/middleware/bootstrap/road.js</h5>
<pre><code><span class="hljs-keyword">const</span> debug = require(<span class="hljs-string">'../extensions/debug'</span>);

<span class="hljs-keyword">module</span>.exports = road =&gt; {
  road
    .extension(<span class="hljs-string">'debug'</span>, debug)
    .middleware({
      debug                   : require(<span class="hljs-string">'../middleware/debug'</span>),
      <span class="hljs-string">'components.navigation'</span> : require(<span class="hljs-string">'../middleware/components/navigation'</span>),
      <span class="hljs-string">'components.home'</span>       : require(<span class="hljs-string">'../middleware/components/home'</span>),
      <span class="hljs-string">'components.contact'</span>    : require(<span class="hljs-string">'../middleware/components/contact'</span>)
    })
    .where(<span class="hljs-string">'webserver'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'*'</span>, <span class="hljs-string">'debug'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'*'</span>, <span class="hljs-string">'statics'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'*'</span>, <span class="hljs-string">'layouts.default'</span>)
    .where(<span class="hljs-string">'client'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'*'</span>, <span class="hljs-string">'events.navigation'</span>, <span class="hljs-string">'navigationLoaded'</span>)
    .where(<span class="hljs-string">'webserver'</span>, <span class="hljs-string">'client'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'*'</span>, <span class="hljs-string">'components.navigation'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/'</span>, <span class="hljs-string">'components.home'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/contact'</span>, <span class="hljs-string">'components.contact'</span>)
    .where(<span class="hljs-string">'webserver'</span>)
      .done(<span class="hljs-string">'response'</span>);
}
</code></pre><p>We added a new hook to the road</p>
<pre><code>.<span class="hljs-built_in">run</span>(<span class="hljs-string">'*'</span>, <span class="hljs-string">'events.navigation'</span>, <span class="hljs-string">'navigationLoaded'</span>)
</code></pre><p>As you can see we added a custom <code>updateType</code>. This is an update type that the client side router triggers whenever a file has been added to the DOM. How it is constructed we will see after we have looked at the navigation template middleware.</p>
<h5 id="working-with-dom-events-source-middleware-middleware-components-navigation-js">working-with-dom-events/source/middleware/middleware/components/navigation.js</h5>
<pre><code>module.exports = (next, relay, request) =&gt; {
  relay.extensions.debug('Rendering component navigation: ' + request.url);
  relay.extensions.renderer.render('
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"navigation"</span> <span class="hljs-attr">data-lr</span>=<span class="hljs-string">"loaded"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/contact"</span>&gt;</span>Contact<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  ', 'nav');
  next();
}
</code></pre><p>We added an <code>id</code> and a <code>data-lr</code> attribute. Together they are responsible for the DOM added update event. The <code>id</code> is just for the identification of the component. The <code>data-lr</code> attribute adds a type to the component. You can create several templates for the same component. One for when data is loading, one for when data is loaded and you could add one when an error occurs. The <code>data-lr</code> value will be passed through as the <code>updateType</code> together with the id in a camelcased form. So in this example it will be <code>navigationLoaded</code>.</p>
<p>Next: <a href="/guide/adding-url-parameters-via-a-parser">Adding url parameters via a parser</a></p>

        </section>
    `, 'article');
    next();
  }
  