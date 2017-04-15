
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <section id="" data="lr-loaded">
          <h1 id="adding-url-parameters-via-a-parser">Adding url parameters via a parser</h1>
<p>One of the most common tasks that a web server has to perform is take some dynamic parameter from the url and give that back the backend so it can handle it. In Lagoon road we use parsers for this.</p>
<h5 id="adding-url-parameters-via-a-parser-source-bootstrap-road-js">adding-url-parameters-via-a-parser/source/bootstrap/road.js</h5>
<pre><code><span class="hljs-keyword">const</span> debug  = require(<span class="hljs-string">'../extensions/debug'</span>);
<span class="hljs-keyword">const</span> parser = require(<span class="hljs-string">'lr-url-parser'</span>)();

<span class="hljs-keyword">module</span>.exports = road =&gt; {
  <span class="hljs-built_in">return</span> road
    .parser(parser)
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
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/params/:id'</span>, <span class="hljs-string">'components.home'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/params/:id/:something'</span>, <span class="hljs-string">'components.home'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/contact'</span>, <span class="hljs-string">'components.contact'</span>)
      .done(<span class="hljs-string">'response'</span>);
}
</code></pre><p>As you can see there is already a package for dealing with dynamic url parts, <code>lr-url-parser</code>. You can add the parser by using the <code>parser</code> method.</p>
<pre><code>.<span class="hljs-keyword">parser</span>(<span class="hljs-keyword">parser</span>)
</code></pre><p>You can now use dynamic url parts via the relay object, <code>relay.parameters</code>.</p>
<blockquote>
<p>The standard parser is for urls, but you are not limited to urls by any means. Want to analyze JSON or some other string values, <a href="/guide/writing-parsers">write are parser</a> and become as flexible as you need to be</p>
</blockquote>
<p>Next: <a href="/guide/update-and-middleware-stack">Update and middleware stack</a></p>

        </section>
    `, 'article');
    next();
  }
  