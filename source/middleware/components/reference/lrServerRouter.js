
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <section id="" data="lr-loaded">
          <h1 id="lr-server-router-reference">lr-server-router reference</h1>
<p>A Lagoon road extension that gives you route functionality on the server.</p>
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
<td><a href="https://coveralls.io/github/lagoon-road/lr-server-router?branch=master"><img src="https://coveralls.io/repos/github/lagoon-road/lr-server-router/badge.svg?branch=master" alt="Coverage Status"></a></td>
</tr>
<tr>
<td>Repo link</td>
<td><a href="https://github.com/lagoon-road/lr-server-router">lr-server-router</a></td>
</tr>
<tr>
<td>Dependencies</td>
<td>-</td>
</tr>
<tr>
<td>Size</td>
<td>336 bytes</td>
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
<h3 id="function-initialization">Function initialization</h3>
<p>This package doesn&#39;t have any exposed methods, it does however needs a single argument on creation.</p>
<pre><code><span class="hljs-attribute">const protocol</span> = require(<span class="hljs-string">'http'</span>);
<span class="hljs-attribute">const server</span>   = protocol.createServer();
<span class="hljs-attribute">const router</span>   = require(<span class="hljs-string">'lr-server-router'</span>)(server);
<span class="hljs-attribute">const core</span>     = require(<span class="hljs-string">'lr-core'</span>);
<span class="hljs-attribute">const road</span>     = core(<span class="hljs-string">'webserver'</span>)
  .extension(<span class="hljs-string">'router'</span>, router, true);
</code></pre><hr>

        </section>
    `, 'article');
    next();
  }
  