const fs              = require('fs');
const marked          = require('marked');
const outputDirectory = 'source/middleware/components/reference/';
const packages        = [
  'lr-core',
  'lr-server-router',
  'lr-server-renderer',
  'lr-client-router',
  'lr-client-renderer',
  'lr-url-parser'
];

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
  fs.readFile(`node_modules/${ package }/README.md`, 'utf8', (error, data) => {
    if (error) throw error;
    // Write file to location
    const html = wrapper(marked(data));
    fs.writeFile(`${ outputDirectory }${ package }.js`, html, (error) => {
      if (error) throw error;
      console.log(`${ package } has been converted`);
    });
  });
});
