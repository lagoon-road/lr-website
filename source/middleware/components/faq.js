
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <section id="" data="lr-loaded">
          <h1 id="faq">Faq</h1>
<p>Answers to some common questions you might have. Cannot find an answer? Please open an <a href="https://github.com/lagoon-road/lr-core/issues/new">issue</a> on Github. I will keep this list up to date so all questions asked on Github that have any merit will be added to this list.</p>
<ul class="submenu">
  <li><a href="#which-versions-of-node-are-supported-">Which versions of node are supported?</a></li>
  <li><a href="#does-a-single-road-not-create-overhead-in-other-environments-">Does a single road not create overhead in other environments?</a></li>
  <li><a href="#what-is-the-best-directory-structure-for-my-project-">What is the best directory structure for my project?</a></li>
  <li><a href="#why-is-there-a-different-middleware-argument-signature-">Why is there a different middleware argument signature?</a></li>
  <li><a href="#do-i-have-to-call-next-in-the-done-middleware-">Do I have to call next in the done middleware?</a></li>
  <li><a href="#i-want-to-keep-the-relay-object-populated-after-a-request-how-do-i-do-that-">I want to keep the relay object populated after a request, how do I do that?</a></li>
  <li><a href="#does-the-order-of-how-i-attch-middleware-to-the-road-matter-">Does the order of how I attch middleware to the road matter?</a></li>
  <li><a href="#who-created-lagoon-road-">Who created Lagoon road?</a></li>
  <li><a href="#where-does-the-name-come-from-">Where does the name come from?</a></li>
</ul>

<h3 id="which-versions-of-node-are-supported-">Which versions of node are supported?</h3>
<p>The packages have hardly any dependencies and are very much just plain javascript, so everything from node 4.x up I expect to work. The code is written with ES6 so you might need to compile your code first with Babel to get it to run. Best practice is to use the newest version of node, for the simple reason that I haven&#39;t tested older versions. I developed with node 7.6.x</p>
<h3 id="does-a-single-road-not-create-overhead-in-other-environments-">Does a single road not create overhead in other environments?</h3>
<p>Yes, combining the middleware in a single place, will create overhead. But compared to what you gain from having everything connected in a single place, it is negligible. You will only create some extra properties on the internal objects within the core. Whenever the update event is fired the matches are done based on object key matches, so there is no extra filtering needed. Performance wise not really an issue.</p>
<h3 id="what-is-the-best-directory-structure-for-my-project-">What is the best directory structure for my project?</h3>
<p>Lagoon road doesn&#39;t force any structure on you. That is the phylosophy of Lagoon road, that you don&#39;t have to tie yourself down to any methodologies or structures. You want to work more in a component based manner, you can do so. Want to seperate your scripts from your styles, because you reuse your css over multiple components, also possible. This is the structure that I&#39;ve used for this website:</p>
<pre><code>- source
| <span class="hljs-type">- bootstrap</span>
  | <span class="hljs-type">- client</span>.js
  | <span class="hljs-type">- server</span>.js
  | <span class="hljs-type">- road</span>.js
| <span class="hljs-type">- extensions</span>
  | <span class="hljs-type">- settings</span>
    | <span class="hljs-type">- webserver</span>.js
| <span class="hljs-type">- middleware</span>
  | <span class="hljs-type">- components</span>
    | <span class="hljs-type">- .. every</span> component <span class="hljs-built_in">in</span> a single file
  | <span class="hljs-type">- layouts</span>
    | <span class="hljs-type">.. every</span> layout <span class="hljs-built_in">in</span> a single file
  | <span class="hljs-type">- events</span>
    | <span class="hljs-type">- .. client</span> side dom code, every component <span class="hljs-built_in">in</span> a single file
  | <span class="hljs-type">- response</span>
    | <span class="hljs-type">- response</span>.js (html response <span class="hljs-keyword">for</span> the webserver)
| <span class="hljs-type">- stylesheets</span>
  | <span class="hljs-type">- components</span>
    | <span class="hljs-type">.. every</span> component <span class="hljs-built_in">in</span> a single file
  | <span class="hljs-type">- layouts</span>
    | <span class="hljs-type">.. every</span> layout <span class="hljs-built_in">in</span> a single file
  | <span class="hljs-type">- .. some</span> more general styles, like animation and typography
  | <span class="hljs-type">- styles</span>.css (importing all other styles)
</code></pre><p>Then all client side code will be pass through babel and browserify and the minifier. View the <a href="https://github.com/lagoon-road/lr-website/blob/master/package.json">package.json</a> and the <a href="https://github.com/lagoon-road/lr-website">lr-website code</a></p>
<h3 id="why-is-there-a-different-middleware-argument-signature-">Why is there a different middleware argument signature?</h3>
<p>The reason that Lagoon road doesn&#39;t follow the standard argument order of, <code>request</code>, <code>response</code>, <code>next</code> and an optional <code>error</code> is because we are not only handling http requests and responses. In frameworks like Expressjs everything is centered around the the http protocol. In that setup it makes sense to have <code>request</code> and <code>response</code> come first. In Lagoon road we don&#39;t tie in http as the only protocol so the parameters for your middleware might be different. Same goes for the client. If we would have kept the order the same there will be a lot of cases where you are specifying parameters that are not really used. If you have traditional middleware that you want to plug in, you can make it run in the traditional order. See the <a href="/reference/lr-core">lr-core reference</a> for more information.</p>
<h3 id="do-i-have-to-call-next-in-the-done-middleware-">Do I have to call next in the done middleware?</h3>
<p>Yes, you always need to call the <code>next()</code> function, no matter what. Read why in the <a href="/guide/update-and-middleware-stack">update and middleware stack guide</a>.</p>
<h3 id="i-want-to-keep-the-relay-object-populated-after-a-request-how-do-i-do-that-">I want to keep the relay object populated after a request, how do I do that?</h3>
<p>This is pretty straight forward. You can just set the <code>resetAfterCycle</code> option on the core initialization. Check the <a href="/reference/lr-core">reference</a> for more information.</p>
<h3 id="does-the-order-of-how-i-attch-middleware-to-the-road-matter-">Does the order of how I attch middleware to the road matter?</h3>
<p>Yes it does. The first middleware that you add, will be put first in the stack. This is why Lagoon road is simple to reason about. You just start looking from the top and see what you first match is. That will be the first middleware that will be called. Read more about the it in the <a href="/guide/update-and-middleware-stack">guide</a>.</p>
<h3 id="who-created-lagoon-road-">Who created Lagoon road?</h3>
<p><a href="http://royniels.nl">Me</a></p>
<h3 id="where-does-the-name-come-from-">Where does the name come from?</h3>
<p>The name comes from one of my favorite books, <em><a href="https://www.amazon.com/Surviving-Paradise-Year-Disappearing-Island/dp/B0044KN3CO&quot;">Surviving Paradise: One Year on a Disappearing Island</a></em>. At some point the protagonist is back on Majuro, an island in the Marshall Islands group and talks about the single road on the island.</p>
<blockquote>
<p>Taxis were a snap—stand on the appropriate side of the street, ﬂag down one of the six cabs that arrived every minute, and then sit in the cool dryness of the air-conditioning and enjoy the ride. No need to tell the driver your destination: since there was only one real road, you could simply tell him when to stop.</p>
</blockquote>
<p>The road that he is talking about is called Lagoon road, and since I am residing on Bali, a link with islands and the single road concept seemed like a good metaphore for the single object structure of Lagoon road.</p>

        </section>
    `, 'article');
    next();
  }
  