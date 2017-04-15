module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <section id="guide" data-lr="loaded">
      <h1>Guide</h1>
      <p>Select on of the following guides</p>
      <ul class="submenu">
        <li><a href="/guide/setup">Setup and running the examples</a></li>
        <li><a href="/guide/hello-world">Hello world</a></li>
        <li><a href="/guide/adding-server-side-renderer">Adding the server side renderer</a></li>
        <li><a href="/guide/handling-static-content">Handling static content</a></li>
        <li><a href="/guide/make-a-single-page-app">Turn your server side rendered page into a single page app</a></li>
        <li><a href="/guide/working-with-dom-events">Working with DOM events</a></li>
        <li><a href="/guide/adding-url-parameters-via-a-parser">Adding url parameters via a parser</a></li>
        <li><a href="/guide/update-and-middleware-stack">Update and middleware stack</a></li>
        <li><a href="/guide/writing-extensions">Writing extensions</a></li>
        <li><a href="/guide/writing-parsers">Writing parsers</a></li>
      </ul>
    </section>
  `, 'article');
  next();
}
