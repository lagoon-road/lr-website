
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <section id="" data="lr-loaded">
          <h1 id="writing-extensions">Writing extensions</h1>
<p>We already looked at a simple debug extension in the <a href="adding-server-side-renderer">adding server side renderer</a> guide. It is time to look at two more examples.</p>
<pre><code><span class="hljs-keyword">const</span> superagent = <span class="hljs-built_in">require</span>(<span class="hljs-string">'superagent'</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">domain</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-keyword">get</span>(path) {
      <span class="hljs-keyword">return</span> superagent.get(domain + path).type(<span class="hljs-string">'json'</span>);
    }
  }
}
</code></pre><p>The first extension is for loading data. As you can see we create a function that expects a domain as argument. The reason for this is that if you are running the web server and API server on the same physical server you want to use a localhost address, whereas the client obviously needs a public domain.</p>
<p>The returned object just has one method, <code>get</code>. We pass in the path and <code>superagent</code> will return a promise. We will use this extension in the next guide and see how we go about working with async calls.</p>
<p>The next extension will be one that triggers an update event.</p>
<pre><code>module.exports = <span class="hljs-keyword">update</span> =&gt; {
  return {
    go() {
      update({ matchValue : <span class="hljs-string">'updateValue'</span>, updateType : <span class="hljs-string">'updateType'</span>});
    }
  }
}
</code></pre><p>The extension looks very similar to the first one. It again has a single argument, this time it will be a function that has been passed in. We use the update function in the returned object within the <code>go</code> method.</p>
<p>Whenever you want to trigger the <code>update</code> function you pass in an option object with a <code>matchValue</code> and <code>updateType</code>. You can add optional parameters from the second argument on. They will be added to the middleware function like <code>request</code> and <code>response</code>.</p>
<p>To get an instance of the update function we have to look at the way we add the extension to the road.</p>
<pre><code><span class="hljs-attribute">road</span>
    .extension(<span class="hljs-string">'router'</span>, router, <span class="hljs-literal">true</span>);
</code></pre><p>The third parameter here is important, it will call the extension whenever it is added to the core. It will make the <code>update</code> function available to the extension.</p>
<blockquote>
<p>When you have update event triggering extensions and you need to set some parameters, you can just wrap it in another function like the first example. Just return a curried function, all rise to functional programming!</p>
</blockquote>
<p>Next: <a href="/guide/working-with-data">Working with data</a></p>

        </section>
    `, 'article');
    next();
  }
  