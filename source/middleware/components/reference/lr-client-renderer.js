
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <h1 id="lg-client-renderer-reference">lg-client-renderer reference</h1>
<p>A Lagoon road extension that gives you renderer functionality on the client. This renderer does quick replacement and doesn&#39;t do virtual dom html difference changes. It should suffice for about 95% of all cases. When you start working more with a websocket pub/sub system you might want to consider writing your own renderer or use a virtual dom approach so user input will not get replaced on dom updates. Read more about writing extensions in the <a href="https://www.lagoonroad.com/guide">guide</a>.</p>
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
<td>Size (Browserify, Babel, Uglify and Gzip)</td>
<td>789 bytes</td>
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
<pre><code>const router   = require(&#39;lg-client-renderer&#39;);
const core     = require(&#39;lr-core&#39;);
const road     = core(&#39;client&#39;)
  .extension(&#39;renderer&#39;, renderer, true);
</code></pre><hr>
<h3 id="renderer-render-html-placeholder-">renderer.render(html, placeholder)</h3>
<pre><code>renderer.render(&#39;&lt;section&gt;...&lt;/section&gt;&#39;, &#39;.placeholderName&#39;);
</code></pre><p><em>Prepare the component to be added to the template.</em></p>
<p><strong>html:string</strong><br>The components html that you want to load.</p>
<p><strong>placeholder:string</strong><br>A html selector that should be the parent of the html you want to add. The contents of the placeholder will be removed before adding the new html.</p>
<hr>
<h3 id="renderer-html-">renderer.html()</h3>
<pre><code>renderer.html();
</code></pre><p><em>Replaces all the components that are added with <code>renderer.render</code> to the template at once. This way templates will only be added once even if they have been declared for replacement multiple times. </em></p>

    `, 'article');
    next();
  }
  