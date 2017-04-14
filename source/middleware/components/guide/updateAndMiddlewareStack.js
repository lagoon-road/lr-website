
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <section id="" data="lr-loaded">
          <h1 id="update-and-middleware-stack">Update and middleware stack</h1>
<p>As you have seen by now in the examples within this guide, there is a common pattern that we follow in Lagoon road. We listen to update events and match them with the <code>updateType</code> and <code>matchValue</code>. So what does happen in the core whenever a update event is fired?</p>
<p>Each time the update event is triggered the core looks up all the middleware that matches that specific update. If it can find matches for the update it will add the middleware that is added via the <code>run</code> method to the stack. If there is no match, <code>noMatch</code> will be added to the stack.</p>
<p>Next the <code>done</code> middleware will be concatenated with the stack that just has been created. Once we have a final array of all the middleware that we need, we start to thunkify the middleware function to get the typical <code>next()</code> functions. Everytime the <code>next()</code> function is called it will merge the <code>relay</code> data with the data that already exist and a check is performed to see if the middleware signature should be traditional or not.</p>
<p>It can happen that during the execution of the stack an error occurs within a middleware function. If this is the case then the stack will be cleared and the <code>error</code> middleware will be added together with the <code>done</code> middleware.</p>
<p>Once all the middleware functions on the stack have been executed the core waits for new update events to come in...</p>
<p>In an ideal world the stack is completely finished before a new update event is triggered. In the real world this is not the case. It can happen that a middleware function in the stack is executing and a new update event is triggered. This can cause all sorts of nasty race conditions.</p>
<p>To mitigate this problem, Lagoon road not just stacks its middleware, but also the update events. So every time an update event happens and the stack is still processing its middleware we wait before we start a new middleware stack. No more race conditions so you can be sure that, if you want to do some state management, your data is correct.</p>
<p>Having all the data synchronized is nice, but there are cases where there is no dependency between update events, so they could run in parallel to speed up execution. This is the case when you want to serve static content. This is another reason to start using a reverse proxy to take care of your statics.</p>
<p>Finally there are cases where a middleware function does some actions which result in the fact that all the following middleware should not be executed. You want to tell the core that you are done with the current middleware stack so that potential new update stack records can be set in motion. This scenario happens in our statics example. We call the <code>response.end</code> method when a file is considered a static. In that case we don&#39;t want to go through the rest of the middleware stack because we have already send back the response. In order to tell the core that we want to terminate the current middleware stack we can call the <code>relay.exit()</code> method.</p>
<blockquote>
<p>It is good practice to try and do your responses in the <code>.done()</code> method and avoid using the <code>.exit()</code> method when possible. It has mainly been added to do stuff like static middleware, but again, better do that with a reverse proxy.</p>
</blockquote>
<p>Next: <a href="/guide/writing-extensions">Writing extensions</a></p>

        </section>
    `, 'article');
    next();
  }
  