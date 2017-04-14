
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <section id="" data="lr-loaded">
          <h1 id="writing-extensions">Writing extensions</h1>
<p>At some point you probably want to write an extension, in this guide we will look at three different types of extensions. General type extensions, extensions that need initialization parameters and extensions that trigger update events. </p>

        </section>
    `, 'article');
    next();
  }
  