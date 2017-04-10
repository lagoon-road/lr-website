module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <section class="home">
      <div class="logo-text">
        <h1>Lagoon road <span>Laid back webapps</span></h1>
      </div>
      <hr>
      <p class="standout">lagoon road is a package/methodology that takes middleware to the extreme. It wraps everything, your templates, DOM events, API calls, basically anything you can think of into a middleware function.</p>
      <p>All middleware is connected to what we call the (Lagoon) road. A single object where you chain your middleware regardless of the environment you are running in, being it the client, web server, api server, Raspberry Pie or mobile device. The benefit of this is that it becomes very easy to reason about the flow of your application. There is only one place that calls your middleware, the Lagoon road.</p>
      <p>Because of this centralized system it additionally becomes a breeze to share your code between environments. Routes or api calls on the client and web server. Login checks and data preparations on an api server and web server are just some examples. Sharing code is trivial even if you scale up your app.</p>
      <p>Lagoon is not a monolithic framework that does everything out of the box. It is a simple package with only 250 lines of code. You can add extensions (regular npm packages) to mold it in a system that works for you and your team.
      </p>
      <section class="highlight">
        <h2>Where from here?</h2>
        <p>
          <a href="/guide" class="pure-button">Examples in the <strong>guide</strong></a>
          <a href="/reference" class="pure-button">Nuts & bolts in the <strong>reference</strong></a>
          <a href="/faq" class="pure-button">Answers in the <strong>FAQ</strong></a>
          <a href="/about" class="pure-button">Backgrounds in the <strong>about</strong></a>
      </section>
    </section>
  `, 'article');
  next();
}
