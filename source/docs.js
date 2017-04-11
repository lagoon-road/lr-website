const fs              = require('fs');
const marked          = require('marked');
const packages        = [{
  file   : 'node_modules/lr-core/README.md',
  name   : 'lr-core',
  output : 'source/middleware/components/reference/lrCore.js'
}, {
  file   : 'node_modules/lr-server-router/README.md',
  name   : 'lr-server-router',
  output : 'source/middleware/components/reference/lrServerRouter.js'
}, {
  file   : 'node_modules/lr-server-renderer/README.md',
  name   : 'lr-server-renderer',
  output : 'source/middleware/components/reference/lrServerRenderer.js'
}, {
  file   : 'node_modules/lr-client-router/README.md',
  name   : 'lr-client-router',
  output : 'source/middleware/components/reference/lrClientRouter.js'
}, {
  file   : 'node_modules/lr-client-renderer/README.md',
  name   : 'lr-client-renderer',
  output : 'source/middleware/components/reference/lrClientRenderer.js'
}, {
  file   : 'node_modules/lr-url-parser/README.md',
  name   : 'lr-url-parser',
  output : 'source/middleware/components/reference/lrUrlParser.js'
}, {
  file   : '../lr-examples/setup.md',
  name   : 'guide: setup',
  output : 'source/middleware/components/guide/setup.js'
}, {
  file   : '../lr-examples/hello-world.md',
  name   : 'guide: hello-world',
  output : 'source/middleware/components/guide/helloWorld.js'
}, {
  file   : '../lr-examples/adding-client-side-routing.md',
  name   : 'guide: adding-client-side-routing',
  output : 'source/middleware/components/guide/addingClientSideRouting.js'
}, {
  file   : '../lr-website/source/middleware/components/faq.md',
  name   : 'faq',
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
        ${ html }
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
      console.log(`${ package.name } has been converted`);
    });
  });
});
