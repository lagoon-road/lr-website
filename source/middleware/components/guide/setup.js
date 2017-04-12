
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <h1 id="installing-lagoon-road">Installing Lagoon Road</h1>
<p>Like any other npm package you can just run</p>
<pre><code>npm <span class="hljs-selector-tag">i</span> --save lr-core
</code></pre><p>All the package names for the supplied packages can be found in the <a href="/reference">reference overview</a>.</p>
<h2 id="following-the-examples">Following the examples</h2>
<p>The easiest way to follow the examples is just to clone the lr-examples repo. This repo contains some build tools that help generating client side js code. So you don&#39;t have to manually setup Babel, Browserify and the likes.</p>
<p>If you feel more adventurous, you can just checkout the packages you need and glance over the examples, it will show you how to use the road on client and server among some other common scenarios.</p>
<p>To clone the repo just go to your preferred directory and run one of the two following commands:</p>
<p><strong>SSH</strong>  </p>
<pre><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">git</span>@github.com:lagoon-road/lr-examples.git
</code></pre><p><strong>HTTPS</strong>  </p>
<pre><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/lagoon-road/lr-examples.git
</code></pre><p>In the repo you can find folders for all the examples. Most folders will contain a <code>source</code> folder and a <code>public</code> folder. The <code>source</code> folder is where we write our code and it is also the folder which the node server will use to serve its responses.</p>
<p>The <code>public</code> folder is the folder where the generated client side code will be saved. There are some <code>scripts</code> in the <code>package.json</code> file that help you do that.</p>
<pre><code>npm <span class="hljs-keyword">run</span><span class="bash"> watch</span>
</code></pre><p>This command will build the client side code and watches file changes.</p>
<p>To start the server you can simply run</p>
<pre><code>npm <span class="hljs-keyword">run</span><span class="bash"> serve</span>
</code></pre><p>Before you can run the code, you need to install all the npm packages, to do so run the command below, you only have to do this once.</p>
<pre><code>npm <span class="hljs-keyword">install</span>
</code></pre><h4 id="next-hello-world-guide-hello-world-">Next: <a href="/guide/hello-world">Hello-world</a></h4>

    `, 'article');
    next();
  }
  