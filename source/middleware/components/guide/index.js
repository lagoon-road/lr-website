module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <h1>Guide</h1>
    <p>Select on of the following guides</p>
    <ul class="submenu">
      <li><a href="/guide/setup">Setup and running the examples</a></li>
      <li><a href="/guide/hello-world">Hello world</a></li>
      <li><a href="/guide/adding-server-side-renderer">Adding the server side renderer</a></li>
      <li><a href="/guide/make-a-single-page-app">Turn your server side rendered page into a single page app</a></li>
      <li><a href="/guide/working-with-dom-events">Working with DOM events</a></li>
      <li><a href="/guide/adding-url-parameters-via-a-parser">Adding url parameters via a parser</a></li>
      <li><a href="/guide/rendering-content-via-renderers">Rendering content via renderers</a></li>
      <li><a href="/guide/stack-and-middleware">Stack and middleware, in-depth</a></li>
      <li><a href="/guide/writing-middleware">Writing middleware</a></li>
      <li><a href="/guide/writing-extenions">Writing extensions</a></li>
      <li><a href="/guide/writing-parsers">Writing parsers</a></li>
    </ul>
  `, 'article');
  next();
}
