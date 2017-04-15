
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <section id="" data="lr-loaded">
          <h1 id="lr-client-renderer-reference">lr-client-renderer reference</h1>
<p>A Lagoon road extension that gives you renderer functionality on the client. This renderer does quick replacement and doesn&#39;t do virtual dom html difference changes. It should suffice for about 95% of all cases. When you start working more with a websocket pub/sub system you might want to consider writing your own renderer or use a virtual dom approach so user input will not get replaced on dom updates. Read more about writing extensions in the <a href="/guide">guide</a>.</p>
<blockquote>
<p>The client side renderer sends out update events whenever a component has been added to the DOM. See the <a href="/guide/working-with-dom-events">guide</a> to understand how to implement this.</p>
</blockquote>
<table>
<thead>
<tr>
<th>Information</th>
<th>-</th>
</tr>
</thead>
<tbody>
<tr>
<td>Code coverage</td>
<td>-</td>
</tr>
<tr>
<td>Repo link</td>
<td><a href="https://github.com/lagoon-road/lr-client-renderer">lr-client-renderer</a></td>
</tr>
<tr>
<td>Dependencies</td>
<td>-</td>
</tr>
<tr>
<td>Size (Browserify, Babel and Gzip)</td>
<td>851 bytes</td>
</tr>
<tr>
<td>Version</td>
<td>1.0.0</td>
</tr>
<tr>
<td>License</td>
<td>MIT</td>
</tr>
<tr>
<td>Usage</td>
<td><a href="/guide">guide</a></td>
</tr>
</tbody>
</table>
<hr>
<h3 id="adding-the-extension-to-lagoon-road">Adding the extension to lagoon road</h3>
<pre><code><span class="hljs-attribute">const router</span>   = require(<span class="hljs-string">'lr-client-renderer'</span>);
<span class="hljs-attribute">const core</span>     = require(<span class="hljs-string">'lr-core'</span>);
<span class="hljs-attribute">const road</span>     = core(<span class="hljs-string">'client'</span>)
  .extension(<span class="hljs-string">'renderer'</span>, renderer, true);
</code></pre><hr>
<h3 id="renderer-render-html-placeholder-">renderer.render(html, placeholder)</h3>
<pre><code><span class="hljs-keyword">renderer</span>.<span class="hljs-keyword">render</span>(<span class="hljs-string">'&lt;section&gt;...&lt;/section&gt;'</span>, <span class="hljs-string">'.placeholderName'</span>);
</code></pre><p><em>Add component to the template.</em></p>
<p><strong>html:string</strong><br>The components html that you want to load.</p>
<p><strong>placeholder:string</strong><br>A html selector that should be the parent of the html you want to add. The contents of the placeholder will be replaced with the new html.</p>

        </section>
    `, 'article');
    next();
  }
  