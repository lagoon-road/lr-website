
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <h1 id="working-with-dom-events">Working with DOM events</h1>
<p>In this guide we will do a simple <code>console.log</code> from our event middleware that will show you that the DOM is ready to be accessed.</p>
<h5 id="working-with-dom-events-source-events-navigation-js">working-with-dom-events/source/events/navigation.js</h5>
<pre><code><span class="hljs-built_in">module</span>.exports = (next, relay) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">\`There</span> are <span class="hljs-string">\$\{</span> <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">\'nav\').children.length</span> <span class="hljs-string">\}</span> menu items<span class="hljs-string">\`);</span>
  next();
}
</code></pre><p>Just a regular middleware function that should give is the number of menu items.</p>
<h5 id="working-with-dom-events-source-bootstrap-client-js">working-with-dom-events/source/bootstrap/client.js</h5>
<pre><code><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"DOMContentLoaded"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">const</span> router   = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-client-router'</span>);
  <span class="hljs-keyword">const</span> renderer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-client-renderer'</span>);
  <span class="hljs-keyword">const</span> core     = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-core'</span>);
  <span class="hljs-keyword">const</span> road     = core(<span class="hljs-string">'client'</span>)
    .extension(<span class="hljs-string">'router'</span>, router, <span class="hljs-literal">true</span>)
    .extension(<span class="hljs-string">'renderer'</span>, renderer, <span class="hljs-literal">true</span>)
    .middleware({
      <span class="hljs-string">'response'</span>          : <span class="hljs-function">(<span class="hljs-params">next, relay</span>) =&gt;</span> { relay.extensions.renderer.html() },
      <span class="hljs-string">'events.navigation'</span> : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../events/navigation'</span>)
    });

  <span class="hljs-built_in">require</span>(<span class="hljs-string">'./road'</span>)(road)
    .where(<span class="hljs-string">'client'</span>)
      .update({ <span class="hljs-attr">matchValue</span> : <span class="hljs-string">'nav'</span>, <span class="hljs-attr">updateType</span> : <span class="hljs-string">'domReady'</span> })
});
</code></pre><p>The most changes have happend in the <code>client.js</code> file. Firstly we wrapped the whole code in a <code>DOMContentLoaded</code> event handler. The reason for this is that we want to initialize the events middleware when we first open the page.</p>
<p>You can see that we also added the <code>events.navigation</code> middleware to this file, DOM events happen only on the client so this will make sense.</p>
<p>The third and last change is the following piece of code</p>
<pre><code><span class="hljs-selector-tag">require</span>(<span class="hljs-string">'./road'</span>)(road)
  <span class="hljs-selector-class">.where</span>(<span class="hljs-string">'client'</span>)
    <span class="hljs-selector-class">.update</span>({ <span class="hljs-attribute">matchValue </span>: <span class="hljs-string">'nav'</span>, <span class="hljs-attribute">updateType </span>: <span class="hljs-string">'domReady'</span> })
</code></pre><p>We have changed the <code>road.js</code> file so that it gives us back the <code>road</code> object. Once the shared methods have been applied to the road it is time to fire a manual <code>update</code> event. The <code>update</code> event takes a single object as argument with two parameters. The <code>matchValue</code> and <code>updateType</code>. In this case we want to update our road for all the <code>nav</code> html selectors that have an <code>updateType</code> of <code>domReady</code>. You can see here that Lagoon road is in no way limited to handle the http protocol. We are doing updates based on html selectors and give it a custom <code>updateType</code>!</p>
<blockquote>
<p>It is good practice to always wrap the <code>client.js</code> file in a <code>DOMContentLoaded</code> event. This way you can always update the road when you need to.</p>
</blockquote>
<h5 id="working-with-dom-events-source-bootstrap-road-js">working-with-dom-events/source/bootstrap/road.js</h5>
<pre><code><span class="hljs-keyword">const</span> debug = require(<span class="hljs-string">'../extensions/debug'</span>);

<span class="hljs-keyword">module</span>.exports = road =&gt; {
  <span class="hljs-built_in">return</span> road
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
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'nav'</span>, <span class="hljs-string">'events.navigation'</span>, <span class="hljs-string">'domReady'</span>)
    .where(<span class="hljs-string">'webserver'</span>, <span class="hljs-string">'client'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'*'</span>, <span class="hljs-string">'components.navigation'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/'</span>, <span class="hljs-string">'components.home'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/contact'</span>, <span class="hljs-string">'components.contact'</span>)
      .done(<span class="hljs-string">'response'</span>);
}
</code></pre><p>The last file that has changed is the <code>road.js</code> file. Two changes have been made to this file. We are returning the road object, so the client can initiate the update on <code>DOMContentLoaded</code>. The other change is the following code</p>
<pre><code><span class="hljs-selector-class">.where</span>(<span class="hljs-string">'client'</span>)
  <span class="hljs-selector-class">.run</span>(<span class="hljs-string">'nav'</span>, <span class="hljs-string">'events.navigation'</span>, <span class="hljs-string">'domReady'</span>)
</code></pre><p>We have added a listener for the <code>nav</code> html selector with <code>updateType</code> <code>domReady</code>. Every time the navigation is re-rendered it will trigger the appropriate middleware.</p>
<blockquote>
<p>The <code>lr-client-renderer</code> is the package that sends out events whenever a component is ready and loaded in the dom.</p>
</blockquote>

    `, 'article');
    next();
  }
  