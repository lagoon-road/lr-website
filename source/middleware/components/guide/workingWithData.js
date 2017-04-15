
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <section id="" data="lr-loaded">
          <h1 id="working-with-data">Working with data</h1>
<p>In our last big example we will put everything together and add data loading to the mix.</p>
<h5 id="working-with-data-source-bootstrap-client-js">working-with-data/source/bootstrap/client.js</h5>
<pre><code><span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-polyfill"</span>);
<span class="hljs-keyword">const</span> router     = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-client-router'</span>);
<span class="hljs-keyword">const</span> renderer   = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-client-renderer'</span>);
<span class="hljs-keyword">const</span> httpClient = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../extensions/httpClient'</span>)(<span class="hljs-string">'http://eol.org/api/'</span>);
<span class="hljs-keyword">const</span> core       = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-core'</span>);
<span class="hljs-keyword">const</span> road       = core(<span class="hljs-string">'client'</span>)
  .extension(<span class="hljs-string">'router'</span>, router, <span class="hljs-literal">true</span>)
  .extension(<span class="hljs-string">'renderer'</span>, renderer, <span class="hljs-literal">true</span>)
  .extension(<span class="hljs-string">'httpClient'</span>, httpClient)
  .middleware({
    <span class="hljs-string">'events.navigation'</span> : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/events/navigation'</span>),
    <span class="hljs-string">'events.home'</span>       : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/events/home'</span>)
  });

<span class="hljs-built_in">require</span>(<span class="hljs-string">'./road'</span>)(road);
</code></pre><p>We made two changes to this file</p>
<pre><code>require(<span class="hljs-string">"babel-polyfill"</span>)<span class="hljs-comment">;</span>
</code></pre><p>We added the polyfill so we can use async and await on the client. We will see in the data middleware in a moment how. Furthermore we added the <code>httpClient</code> middleware to the road. We added this also to the <code>webserver.js</code> file.</p>
<h5 id="working-with-data-source-middleware-data-about-js">working-with-data/source/middleware/data/about.js</h5>
<pre><code>module.exports = async function(next, relay) {
  const path  = 'pages/<span class="hljs-number">1.0</span>.json?id=<span class="hljs-number">1048601</span>&amp;details=true';
  const data  = await relay.extensions.httpClient.get(path);
  const about = JSON.parse(data.text).dataObjects.shift().description;
  const <span class="hljs-keyword">state</span> = Object.assign({}, relay.<span class="hljs-keyword">state</span> ? relay.<span class="hljs-keyword">state</span> : {}, { about });
  next({ <span class="hljs-keyword">state</span> });
}
</code></pre><p>We added a new middleware function that loads data from Encyclopedia of Life about the Masked Booby, the bird in the logo, for the people who are not an ornithologist by profession. As you can see it is an <code>async function</code> so we can wait until the data is loaded. There is no need for a <code>try...catch</code> block because any error will be catched by the core and trigger the error middleware if available, otherwise it with output the error to the console. The error will be available at <code>relay.error</code>.</p>
<p>The result will be passed to the next middleware function as a <code>state</code> property on the relay object, so we can use it in the template.</p>
<h5 id="working-with-data-source-middleware-components-about-loading-js">working-with-data/source/middleware/components/about/loading.js</h5>
<pre><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">next</span>, relay)</span> =&gt;</span> {
  relay.extensions.renderer.render(<span class="hljs-string">'
    &lt;section id="about" data-lr="loading"&gt;Loading...&lt;/section&gt;
  '</span>, <span class="hljs-string">'.content'</span>);
  <span class="hljs-built_in">next</span>();
}
</code></pre><p>We added a loading template for when the data is not available yet.</p>
<h5 id="working-with-data-source-middleware-components-about-loaded-js">working-with-data/source/middleware/components/about/loaded.js</h5>
<pre><code>module.exports = (next, relay, request) =&gt; {
  relay.extensions.renderer.render('
    <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"about"</span> <span class="hljs-attr">data-lr</span>=<span class="hljs-string">"loaded"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>About the masked booby<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>\$\{ relay.state.about \}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
  ', '.content');
  next();
}
</code></pre><p>Once the data is available we will render the <code>loaded</code> template with the data.</p>
<h5 id="working-with-data-source-bootstrap-road-js">working-with-data/source/bootstrap/road.js</h5>
<pre><code><span class="hljs-keyword">module</span>.exports = road =&gt; {
  road
    .middleware({
      <span class="hljs-string">'data.about'</span>                   : require(<span class="hljs-string">'../middleware/data/about'</span>),
      <span class="hljs-string">'data.home'</span>                    : require(<span class="hljs-string">'../middleware/data/home'</span>),
      <span class="hljs-string">'components.navigation.loaded'</span> : require(<span class="hljs-string">'../middleware/components/navigation/loaded'</span>),
      <span class="hljs-string">'components.home.loaded'</span>       : require(<span class="hljs-string">'../middleware/components/home/loaded'</span>),
      <span class="hljs-string">'components.home.loading'</span>      : require(<span class="hljs-string">'../middleware/components/home/loading'</span>),
      <span class="hljs-string">'components.about.loaded'</span>      : require(<span class="hljs-string">'../middleware/components/about/loaded'</span>),
      <span class="hljs-string">'components.about.loading'</span>     : require(<span class="hljs-string">'../middleware/components/about/loading'</span>),
    })
    .where(<span class="hljs-string">'webserver'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'*'</span>, <span class="hljs-string">'statics'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'*'</span>, <span class="hljs-string">'layouts.default'</span>)
    .where(<span class="hljs-string">'client'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'*'</span>, <span class="hljs-string">'events.navigation'</span>, <span class="hljs-string">'navigationLoaded'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/'</span>, <span class="hljs-string">'events.home'</span>, <span class="hljs-string">'homeLoaded'</span>)
    .where(<span class="hljs-string">'webserver'</span>, <span class="hljs-string">'client'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'updateValue'</span>, <span class="hljs-string">'log'</span>, <span class="hljs-string">'updateType'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'*'</span>, <span class="hljs-string">'components.navigation.loaded'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/'</span>, <span class="hljs-string">'components.home.loaded'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/'</span>, <span class="hljs-string">'components.home.loading'</span>, <span class="hljs-string">'data'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/'</span>, <span class="hljs-string">'data.home'</span>, <span class="hljs-string">'data'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/'</span>, <span class="hljs-string">'components.home.loaded'</span>, <span class="hljs-string">'data'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/error'</span>, <span class="hljs-string">'fail'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/about'</span>, <span class="hljs-string">'components.about.loading'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/about'</span>, <span class="hljs-string">'data.about'</span>)
      .<span class="hljs-built_in">run</span>(<span class="hljs-string">'/about'</span>, <span class="hljs-string">'components.about.loaded'</span>)
      .error(<span class="hljs-string">'components.about.error'</span>)
    .where(<span class="hljs-string">'webserver'</span>)
      .done(<span class="hljs-string">'response'</span>);
}
</code></pre><p>This is the <code>road.js</code> file and the code we will focus on is the following</p>
<pre><code>.<span class="hljs-built_in">run</span>('/<span class="hljs-keyword">about</span>', 'components.<span class="hljs-keyword">about</span>.loading')
.<span class="hljs-built_in">run</span>('/<span class="hljs-keyword">about</span>', 'data.<span class="hljs-keyword">about</span>')
.<span class="hljs-built_in">run</span>('/<span class="hljs-keyword">about</span>', 'components.<span class="hljs-keyword">about</span>.loaded')
</code></pre><p>We have the templates added in the right order with the data loading middleware right in between. That is it, data loading made easy.</p>
<h3 id="loading-data-on-a-click">Loading data on a click</h3>
<p>There is also an example in the code how to load data on a click, which is another very common use case. </p>
<pre><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function">(<span class="hljs-params">next, relay</span>) =&gt;</span> {
  <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'button'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
    event.preventDefault();
    relay.update({ matchValue : <span class="hljs-built_in">window</span>.location.pathname, updateType : <span class="hljs-string">'data'</span> });
  });
  next();
}
</code></pre><p>Whenever you need to load data on click you just call the <code>update</code> method in the event middleware, call it with the route that you are on and a unique <code>updateType</code>. It will trigger the right middleware again as you can see in the <code>road.js</code> file. It basically does the exact same thing as loading the data on a page load.</p>
<blockquote>
<p>Data is now loaded on every page request, that is obviously not wath you normally want. It is easy to add a check if <code>relay.state.about</code> already exists and if not load the data. Just make sure you have set the <code>resetUpdateCycle</code> to <code>false</code> so the relay data stays intact after an update event</p>
</blockquote>
<p>Next: <a href="/guide/writing-parsers">Writing a parser</a></p>

        </section>
    `, 'article');
    next();
  }
  