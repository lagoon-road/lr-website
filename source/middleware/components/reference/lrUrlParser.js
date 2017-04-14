
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <section id="" data="lr-loaded">
          <p><a href="https://coveralls.io/github/lagoon-road/lr-url-parser?branch=master"><img src="https://coveralls.io/repos/github/lagoon-road/lr-url-parser/badge.svg?branch=master" alt="Coverage Status"></a></p>
<h1 id="lr-url-parser">lr-url-parser</h1>
<p>Parser that can take placeholders from urls and match them with real urls</p>

        </section>
    `, 'article');
    next();
  }
  