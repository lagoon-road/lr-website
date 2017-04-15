const fs              = require('fs');
const marked          = require('marked');
const packages        = [{
  file   : 'node_modules/lr-core/README.md',
  output : 'source/middleware/components/reference/lrCore.js'
}, {
  file   : 'node_modules/lr-server-router/README.md',
  output : 'source/middleware/components/reference/lrServerRouter.js'
}, {
  file   : 'node_modules/lr-server-renderer/README.md',
  output : 'source/middleware/components/reference/lrServerRenderer.js'
}, {
  file   : 'node_modules/lr-client-router/README.md',
  output : 'source/middleware/components/reference/lrClientRouter.js'
}, {
  file   : 'node_modules/lr-client-renderer/README.md',
  output : 'source/middleware/components/reference/lrClientRenderer.js'
}, {
  file   : 'node_modules/lr-url-parser/README.md',
  output : 'source/middleware/components/reference/lrUrlParser.js'
}, {
  file   : '../lr-examples/setup.md',
  output : 'source/middleware/components/guide/setup.js'
}, {
  file   : '../lr-examples/hello-world.md',
  output : 'source/middleware/components/guide/helloWorld.js'
}, {
  file   : '../lr-examples/adding-server-side-renderer.md',
  output : 'source/middleware/components/guide/addingServerSideRenderer.js'
}, {
  file   : '../lr-examples/handling-static-content.md',
  output : 'source/middleware/components/guide/handlingStaticContent.js'
}, {
  file   : '../lr-examples/make-a-single-page-app.md',
  output : 'source/middleware/components/guide/makeASinglePageApp.js'
}, {
  file   : '../lr-examples/working-with-dom-events.md',
  output : 'source/middleware/components/guide/workingWithDOMEvents.js'
}, {
  file   : '../lr-examples/adding-url-parameters-via-a-parser.md',
  output : 'source/middleware/components/guide/addingUrlParametersViaAParser.js'
}, {
  file   : '../lr-examples/update-and-middleware-stack.md',
  output : 'source/middleware/components/guide/updateAndMiddlewareStack.js'
}, {
  file   : '../lr-examples/writing-extensions.md',
  output : 'source/middleware/components/guide/writingExtensions.js'
}, {
  file   : '../lr-examples/working-with-data.md',
  output : 'source/middleware/components/guide/workingWithData.js'
}, {
  file   : '../lr-examples/writing-parsers.md',
  output : 'source/middleware/components/guide/writingParsers.js'
}, {
  file   : '../lr-website/source/middleware/components/faq.md',
  output : 'source/middleware/components/faq.js'
}];

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

function wrapper(html) {
  return `
    module.exports = (next, relay) => \{
      relay.extensions.renderer.render(\`
        <section id="" data="lr-loaded">
          ${ html.replace(/https\:\/\/lagoonroad\.com/gi, '') }
        </section>
    \`, 'article');
    next();
  \}
  `;
}

packages.forEach(package => {
  fs.readFile(`${ package.file }`, 'utf8', (error, data) => {
    if (error) throw error;
    // Write file to location
    const html = wrapper(marked(data));
    fs.writeFile(`${ package.output }`, html, (error) => {
      if (error) throw error;
    });
  });
});
