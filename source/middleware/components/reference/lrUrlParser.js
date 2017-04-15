
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <section id="" data="lr-loaded">
          <h1 id="lr-url-parser">lr-url-parser</h1>
<p>Parser that can take placeholders from urls and match them with real urls</p>
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
<td><a href="https://coveralls.io/github/lagoon-road/lr-url-parser?branch=master"><img src="https://coveralls.io/repos/github/lagoon-road/lr-url-parser/badge.svg?branch=master" alt="Coverage Status"></a></td>
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
<td>Size (Browserify, Babel and Gzip)</td>
<td>777 bytes</td>
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
<h3 id="adding-the-parser-to-lagoon-road">Adding the parser to lagoon road</h3>
<pre><code><span class="hljs-selector-tag">require</span>(<span class="hljs-string">'lr-main'</span>)(<span class="hljs-string">'client'</span>)
  <span class="hljs-selector-class">.parser</span>(require(<span class="hljs-string">'lr-url-parser'</span>));
</code></pre><hr>
<h3 id="parser-add-path-">parser.add(path)</h3>
<pre><code>parser.<span class="hljs-keyword">add</span>(<span class="hljs-string">'blog/:id'</span>);
</code></pre><p><strong>path:string</strong><br>Add a route including placeholders to the parser, it will use it later for parsing.</p>
<hr>
<h3 id="parser-parse-path-">parser.parse(path)</h3>
<pre><code>parser.parse(<span class="hljs-symbol">'blog</span>/<span class="hljs-number">1</span>');
// Returns { path : '<span class="hljs-type">blog</span>/:id', parameters : { <span class="hljs-type">id</span> : 1 } }
</code></pre><p><strong>path:string</strong><br>Parse an incoming route and check if it exists. If it exists it will extract possible parameters and give back the original url. If no match could be made the path is returned in object form like <code>{ path : &#39;/original-path&#39; }</code>.</p>
<hr>

        </section>
    `, 'article');
    next();
  }
  