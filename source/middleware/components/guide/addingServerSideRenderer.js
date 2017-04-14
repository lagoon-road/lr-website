
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <section id="" data="lr-loaded">
          <h1 id="adding-server-side-renderer">Adding server side renderer</h1>
<p>After creating a simple hello world example it is time to add some proper rendering to the server side. The following code uses the <code>lr-server-renderer</code> the let us easily add a template and components.</p>
<h5 id="adding-server-side-renderer-source-bootstrap-webserver-js">adding-server-side-renderer/source/bootstrap/webserver.js</h5>
<pre><code><span class="hljs-keyword">const</span> protocol = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-keyword">const</span> server   = protocol.createServer();
<span class="hljs-keyword">const</span> core     = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-core'</span>);
<span class="hljs-keyword">const</span> router   = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-server-router'</span>)(server);
<span class="hljs-keyword">const</span> renderer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-server-renderer'</span>)();
<span class="hljs-keyword">const</span> debug    = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../extensions/debug'</span>);

core(<span class="hljs-string">'webserver'</span>)
  .extension(<span class="hljs-string">'router'</span>, router, <span class="hljs-literal">true</span>)
  .extension(<span class="hljs-string">'renderer'</span>, renderer)
  .extension(<span class="hljs-string">'debug'</span>, debug)
  .middleware({
    <span class="hljs-attr">debug</span>                   : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/debug'</span>),
    <span class="hljs-attr">response</span>                : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/response'</span>),
    <span class="hljs-string">'components.home'</span>       : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/components/home'</span>),
    <span class="hljs-string">'components.navigation'</span> : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/components/navigation'</span>),
    <span class="hljs-string">'components.contact'</span>    : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/components/contact'</span>),
    <span class="hljs-string">'layouts.default'</span>       : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../middleware/layouts/default'</span>),
  })
  .run(<span class="hljs-string">'*'</span>, <span class="hljs-string">'debug'</span>)
  .run(<span class="hljs-string">'*'</span>, <span class="hljs-string">'layouts.default'</span>)
  .run(<span class="hljs-string">'*'</span>, <span class="hljs-string">'components.navigation'</span>)
  .run(<span class="hljs-string">'/'</span>, <span class="hljs-string">'components.home'</span>)
  .run(<span class="hljs-string">'/contact'</span>, <span class="hljs-string">'components.contact'</span>)
  .done(<span class="hljs-string">'response'</span>);

server.listen(<span class="hljs-number">8080</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server running on localhost:8080'</span>);
});
</code></pre><p>As you can see we added two more extensions. The <code>renderer</code> extension and the <code>debug</code> extension. The <code>renderer</code> extension is a package by itself so we will not go into specifics over how it is implemented, but we will look at the debug extension so you have a feel how you can write a simple extension.</p>
<blockquote>
<p>You can find the source code for the renderer extension on <a href="https://github.com/lagoon-road/lr-server-renderer/blob/master/index.js">github</a>.</p>
</blockquote>
<h5 id="adding-server-side-renderer-source-extensions-debug-js">adding-server-side-renderer/source/extensions/debug.js</h5>
<pre><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">message</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'DEBUG: '</span> + message);
}
</code></pre><p>As you can see the <code>debug</code> extension is nothing more then a function. In our case just a function around the <code>console.log</code>. This might not be the most useful extension but it shows how you can use extensions to centralize your code. If we were to use an actual logger/debugger like <code>debug</code>, <code>morgan</code> or <code>winston</code> we can create a very thin function wrapper and use the extension in all our middleware. When you change your debugger later, you only change the extension and have all the middleware automatically use it. Pretty DRY.</p>
<p>So how would you use the extension in your middleware? Well for that we look at the <code>debug</code> middleware.</p>
<pre><code>module.exports = (next, relay, request) =&gt; {
  relay.extensions.debug(<span class="hljs-symbol">\`</span>Incoming request [<span class="hljs-symbol">\$</span><span class="hljs-symbol">\{</span> request.method <span class="hljs-symbol">\}</span>]: <span class="hljs-symbol">\$</span><span class="hljs-symbol">\{</span> request.url <span class="hljs-symbol">\}</span><span class="hljs-symbol">\`</span>);
  next();
}
</code></pre><p>You can see how we can access the extension by using the <code>relay</code> object.</p>
<h3 id="relay-object">Relay object</h3>
<p>The relay object is something that you not see in standard middleware, but the concept is pretty simple. The <code>relay</code> object is passed from middleware to middleware, hence the name relay. Every extension, or variable that you add becomes available in every middleware function that comes after it. All <code>extensions</code> are available at <code>relay.extensions.extensionName</code>.</p>
<p>When you want to set a variable in your middleware that needs to be available to all the following middleware you simply pass and object to the <code>next</code> function like so:</p>
<pre><code><span class="hljs-selector-tag">next</span>({ <span class="hljs-attribute">someVariable </span>: true });
</code></pre><p>The object will automatically be merged with existing <code>relay</code> variables which makes it easy to pass on data between middleware.</p>
<blockquote>
<p>If you want to use the relay object as a state manager it might be handy to add all the state to a state object.</p>
<pre><code>module.exports = (next, relay) =&gt; {
  const <span class="hljs-keyword">state</span> = Object.assign({}, relay.<span class="hljs-keyword">state</span>, { someNewProperty : true});
  next({ <span class="hljs-keyword">state</span> });
}
</code></pre><p>This way it is easy to send everything from the server to the client in the template, which saves you to make redundant calls from the client.</p>
</blockquote>
<h3 id="listening-for-changes">Listening for changes</h3>
<p>Now that we added some middleware for our debugger it is time to let it listen for http requests.</p>
<pre><code>.<span class="hljs-built_in">run</span>(<span class="hljs-string">'*'</span>, <span class="hljs-string">'debug'</span>)
</code></pre><p>As you can see we use a new method, namely <code>run</code>. The <code>run</code> method can be thought of as the <code>get</code> method in traditional middleware. Whenever a <code>GET</code> request comes in it will be triggered. The reason for not calling it get is that we are not limited to only use the http protocol. So it would make little sense to call it get. Furthermore you can see that you can use the asterix (*) symbol to listen to all <code>GET</code> requests.</p>
<blockquote>
<p>If you need to listen to another method, or in Lagoon road called <code>updateType</code>. You can specify a third parameter.</p>
<pre><code>.<span class="hljs-built_in">run</span>(*, <span class="hljs-string">'debug'</span>, <span class="hljs-string">'post'</span>)
</code></pre></blockquote>
<h3 id="adding-a-template">Adding a template</h3>
<p>Great so we have added a simple debug function, time to get our templating up and running. First we want to define a template.</p>
<pre><code>module.exports = (next, relay) =&gt; {
  relay.extensions.debug('selecting template');
  relay.extensions.renderer.template(\`
    <span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Adding client side routing<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"description"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"author"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"Roy Niels"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
  \`);
  next();
}
</code></pre><p>We are using the <code>renderer</code> extension to set the template. The <code>template</code> method needs a single argument, which is a string with raw html. It has a <code>&lt;nav&gt;</code> and <code>&lt;section class=&quot;content&quot;&gt;&lt;/section&gt;</code> tag. This is were our components will be placed.</p>
<p>Each request needs a template so we add it like we did with the <code>debug</code> middleware, with an asterix.</p>
<pre><code>.<span class="hljs-built_in">run</span>(<span class="hljs-string">'*'</span>, <span class="hljs-string">'layouts.default'</span>)
</code></pre><p>You can see that you can easily use multiple templates for different routes if you wish to.</p>
<blockquote>
<p>We are passing in raw html to the renderer. Because of this it becomes very easy to use any templating engine, as long as you get a string back, you can use whatever you want. This is one of the ways that Lagoon road is unopinionated.</p>
</blockquote>
<h3 id="adding-a-component">Adding a component</h3>
<p>The template is in place, time to add the components. We will look at the middleware for the contact page, all the other components use the same technique.</p>
<pre><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">next</span>, relay)</span> =&gt;</span> {
  relay.extensions.<span class="hljs-built_in">debug</span>(<span class="hljs-string">'rendering contact'</span>);
  relay.extensions.renderer.render(<span class="hljs-string">'&lt;h1&gt;This is the contact page&lt;/h1&gt;'</span>, <span class="hljs-string">'.content'</span>);
  <span class="hljs-built_in">next</span>();
}
</code></pre><p>We use the same renderer extension as we used for the template, but a different method, <code>render</code>. This  method takes two parameters. The first one, again a raw html string, the second one, a html selector. Just like you do when working with the regular browser DOM.</p>
<p>Hooking it up to the road is slightly different, we want to only render the component on the <code>/contact</code> page, so we will set up the <code>matchValue</code> accordingly</p>
<pre><code>.<span class="hljs-built_in">run</span>(<span class="hljs-string">'/contact'</span>, <span class="hljs-string">'component.contact'</span>)
</code></pre><blockquote>
<p><code>matchValue</code> is the first argument in the <code>run</code> method.</p>
</blockquote>
<h3 id="rendering-the-output">Rendering the output</h3>
<p>We have slightly changed the response middleware to accommodate the <code>renderer</code> extension.</p>
<pre><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">next</span>, relay, request, response)</span> =&gt;</span> {
  relay.extensions.<span class="hljs-built_in">debug</span>(<span class="hljs-string">'sending html response'</span>);
  response.end(relay.extensions.renderer.html());
}
</code></pre><p>We call the <code>html</code> method to get a fully renderer html page as a string and send that back to the client.</p>
<p>Before we go and add the client side code to create a single page app, we want to take a look at how we can handle static content, like our javascript files, images and stylesheets.</p>
<p>Next: <a href="/guide/handling-static-content">Handling static content</a></p>

        </section>
    `, 'article');
    next();
  }
  