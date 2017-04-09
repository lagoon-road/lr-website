
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <h1 id="lg-client-router-reference">lg-client-router reference</h1>
<p>A Lagoon road extension that gives you route functionality on the client.</p>
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
<td><a href="https://github.com/lagoon-road/lr-client-router">lr-client-router</a></td>
</tr>
<tr>
<td>Dependencies</td>
<td>-</td>
</tr>
<tr>
<td>Size (Browserify, Babel, Uglify and Gzip)</td>
<td>612 bytes</td>
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
<td><a href="https://www.lagoonroad.com/guide">lagoonroad.com/guide</a></td>
</tr>
</tbody>
</table>
<hr>
<h3 id="adding-the-extension-to-lagoon-road">Adding the extension to lagoon road</h3>
<pre><code><span class="hljs-attribute">const router</span>   = require(<span class="hljs-string">'lg-client-router'</span>);
<span class="hljs-attribute">const core</span>     = require(<span class="hljs-string">'lr-core'</span>);
<span class="hljs-attribute">const road</span>     = core(<span class="hljs-string">'client'</span>)
  .extension(<span class="hljs-string">'router'</span>, router, true);
</code></pre><hr>
<h3 id="router-redirect-path-">router.redirect(path)</h3>
<pre><code><span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.redirect</span>(<span class="hljs-string">'/some-page'</span>);
</code></pre><p><strong>path:string</strong><br>The path to where you want to redirect, this will trigger an update event on the road.</p>
<hr>

    `, 'article');
    next();
  }
  