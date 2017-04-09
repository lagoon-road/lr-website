
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <h1 id="lg-server-router-reference">lg-server-router reference</h1>
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
<td><a href="https://www.lagoonroad.com/guide">lagoonroad.com/guide</a></td>
</tr>
</tbody>
</table>
<hr>
<h3 id="function-initialization">Function initialization</h3>
<p>This package doesn&#39;t have any exposed methods, it does however needs a single argument on creation.</p>
<pre><code>const protocol = require(&#39;http&#39;);
const server   = protocol.createServer();
const router   = require(&#39;lg-server-router&#39;)(server);
const core     = require(&#39;lr-core&#39;);
const road     = core(&#39;webserver&#39;)
  .extension(&#39;router&#39;, router, true);
</code></pre><hr>

    `, 'article');
    next();
  }
  