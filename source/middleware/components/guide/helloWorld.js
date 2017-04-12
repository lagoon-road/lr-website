
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <h1 id="hello-world">Hello world</h1>
<p>The most simple and of course mandatory example is the hello-world example. In our case it will be a server only response which you can check in your browser. To make it happen open a browser tab and navigate to <code>http://localhost:8080</code>. This should show you a nice header with <em>Hello World</em>.</p>
<blockquote>
<p>Check the <a href="/guide/setup">setup and running the examples</a> to see how to start the webserver.</p>
</blockquote>
<h4 id="the-code">The code</h4>
<p>Let&#39;s have a look at how the response has been generated.</p>
<h5 id="hello-world-source-bootstrap-webserver-js">hello-world/source/bootstrap/webserver.js</h5>
<pre><code><span class="hljs-keyword">const</span> protocol = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-keyword">const</span> server   = protocol.createServer();
<span class="hljs-keyword">const</span> core     = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-core'</span>);
<span class="hljs-keyword">const</span> router   = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lr-server-router'</span>)(server);

core(<span class="hljs-string">'webserver'</span>)
  .extension(<span class="hljs-string">'router'</span>, router, <span class="hljs-literal">true</span>)
  .middleware({
    <span class="hljs-attr">response</span> : <span class="hljs-function">(<span class="hljs-params">next, relay, request, response</span>) =&gt;</span> {
      response.end(<span class="hljs-string">'&lt;h1&gt;Hello world&lt;/h1&gt;'</span>);
    }
  })
  .done(<span class="hljs-string">'response'</span>);

server.listen(<span class="hljs-number">8080</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server running on localhost:8080'</span>);
});
</code></pre><p>As you can see, it is a pretty straight forward process to get the response back from the server. First we add some standard packages and create the node server.</p>
<p>The first thing that needs some explanation is the router package.</p>
<pre><code>const router   = require('lr-server-router')(<span class="hljs-name">server</span>)<span class="hljs-comment">;</span>
</code></pre><p>The router package is a simple wrapper around the server request event and takes care of routing the request throught the core. As you can see it needs one argument, namely the server that you want to use.</p>
<blockquote>
<p>Lagoon road doesn&#39;t limit itself to the HTTP protocol. Using websockets, or maybe both together, <a href="guide/extensions">extensions</a> are the way to go.</p>
</blockquote>
<p>The next step is initializing the core and create a road object.</p>
<pre><code><span class="hljs-function"><span class="hljs-title">core</span><span class="hljs-params">(<span class="hljs-string">'webserver'</span>)</span></span>
</code></pre><p>We intialize the core here with a single argument. The argument is the identifier for our environment. Each time you initialize the road you want to tell it the context of where we want to attach the middleware and extensions. In this case we want to run it as a web server so we use that as the identifier.</p>
<blockquote>
<p>The executing environment, in this case <code>webserver</code> will make more sense when we have more environments and start sharing code between them. We will look at that in the next examples.</p>
</blockquote>
<p>After we have initialized the road we want to attach our router as an extension.</p>
<pre><code>.extension(<span class="hljs-string">'router'</span>, router, <span class="hljs-literal">true</span>)
</code></pre><p>It is very simple to add an extension. Just give it an id, the first argument, add the package, the second argument, and you are done. In our case we have a third argument, a boolean. This tells the core to execute the middleware on initialization. This is typically for packages that can trigger updates, like a router, that receives request events.</p>
<blockquote>
<p>To learn more about extensions and execution on initialization read about writing <a href="/guide/extensions">extensions</a></p>
</blockquote>
<p>Now that we added the router as an extension, we can actually receive request events. In order to act upon these events we need to add some middleware.</p>
<pre><code><span class="hljs-selector-class">.middleware</span>({
  <span class="hljs-attribute">response </span>: (next, relay, request, response) =&gt; {
    response.<span class="hljs-built_in">end</span>(<span class="hljs-string">'&lt;h1&gt;Hello world&lt;/h1&gt;'</span>);
  }
})
</code></pre><p>As you can see the middleware method expects an object as argument. It is a flat, non nested object where you can assign all the middleware that you need. In our case that is a single one. The middleware might have an odd argument signature for people who are familiar with middleware. There is a good reason for this change which you can read about in the <a href="/faq#middlware-signature">faq</a> section. The middlware is a simple response that sends back the html that we want to show on the client. Last step in the process, add the middleware to a event.</p>
<pre><code><span class="hljs-selector-class">.done</span>(<span class="hljs-string">'response'</span>)
</code></pre><p>To act upon an event that might be triggered by the router, we need to add some listeners to the road. There are a couple of ways to do this. There is <code>run</code>, <code>noMatch</code>, <code>error</code> and <code>done</code>. The first three we will see in the following examples in this guide. For now we use the <code>done</code> hook. The <code>done</code> hook is the last middleware hook that gets added to the stack of middleware that needs to be executed. It is the perfect place to respond to requests and as we will see later, render html. As you can see, the method takes a single argument, the middleware id. The middleware id is the key in the object that we specified in the middelware method. Now we have added a listener to the road, so whenever an update happends, regardless of the path it will go through the <code>done</code> method and in our case respond with a nice &#39;hello world&#39;.</p>
<blockquote>
<p>Read more about how the updates and middleware stack work in the <a href="/guide/update-and-middleware-stack">Update and middleware stack</a> guide.</p>
</blockquote>
<p>Now that we have got our feet wet in the warm calm waters of Lagoon road it is time to add a server side renderer to send some proper html back.</p>
<p>Next: <a href="/guide/adding-server-side-renderer">Adding the server side renderer</a></p>

    `, 'article');
    next();
  }
  