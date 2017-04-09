
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <h1 id="lg-server-renderer-reference">lg-server-renderer reference</h1>
<p>Server side renderer for lagoon road.</p>
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
<td><a href="https://coveralls.io/github/lagoon-road/lr-server-renderer?branch=master"><img src="https://coveralls.io/repos/github/lagoon-road/lr-server-renderer/badge.svg?branch=master" alt="Coverage Status"></a></td>
</tr>
<tr>
<td>Repo link</td>
<td><a href="https://github.com/lagoon-road/lr-server-renderer">lr-core</a></td>
</tr>
<tr>
<td>Dependencies</td>
<td><a href="https://github.com/cheeriojs/cheerio">cheerio</a></td>
</tr>
<tr>
<td>Size (ex. dependencies)</td>
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
<h3 id="renderer-template-html-">renderer.template(html)</h3>
<pre><code>renderer.template(<span class="hljs-comment">'<span class="hljs-doctag">&lt;html&gt;</span>...<span class="hljs-doctag">&lt;/html&gt;</span>');</span>
</code></pre><p><em>Method sets the template for the output, all components will be added to this template</em></p>
<p><strong>html:string</strong><br>The template you want to use for the components and state that you might want to add.</p>
<hr>
<h3 id="renderer-render-html-placeholder-">renderer.render(html, placeholder)</h3>
<pre><code><span class="hljs-keyword">renderer</span>.<span class="hljs-keyword">render</span>(<span class="hljs-string">'&lt;section&gt;...&lt;/section&gt;'</span>, <span class="hljs-string">'.placeholderName'</span>);
</code></pre><p><em>Adds a component to the template.</em></p>
<p><strong>html:string</strong><br>The components html that you want to load.</p>
<p><strong>placeholder:string</strong><br>A html selector that should be the parent of the html you want to add. The contents of the placeholder will be removed before adding the new html.</p>
<hr>
<h3 id="renderer-state-state-">renderer.state(state)</h3>
<pre><code><span class="hljs-selector-tag">renderer</span><span class="hljs-selector-class">.state</span>({ <span class="hljs-attribute">data </span>: [...], otherProperties : true });
</code></pre><p><em>Add data to a script tag that you can access on the client again. This prevents loading the same data. The data will be available by accessing <code>window.__state__</code> as json.</em></p>
<p><strong>state:object</strong><br>An object that has been loaded on the server that you want to transfer to the client.</p>
<hr>
<h3 id="renderer-html-">renderer.html()</h3>
<pre><code>renderer.html()<span class="hljs-comment">;</span>
</code></pre><p><em>Get the final output of the template and components that you have created, this data can be send back as the response to the client.</em></p>

    `, 'article');
    next();
  }
  