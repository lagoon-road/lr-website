module.exports = (next, relay) => {
  relay.extensions.renderer.template(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Lagoon road</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="Roy Niels">
        <link rel="stylesheet" href="/stylesheets/styles.css">
        <script src="/scripts/main.min.js?v=1"></script>
      </head>
      <body>
        <div class="animations">
          <img src="/images/cloud-1.svg" class="cloud cloud-1">
          <img src="/images/cloud-2.svg" class="cloud cloud-2">
          <img src="/images/cloud-3.svg" class="cloud cloud-3">
          <img src="/images/car-1.svg" class="car">
        </div>
        <img src="/images/tree.svg" class="tree">
        <img src="/images/logo.svg" class="logo">
        <section id="navigation"></section>
        <div class="content">
          <article></article>
          <footer>
            Lagoon road / Roy Niels / MIT License / ${ new Date().getFullYear() }
          </footer>
        </div>
      </body>
    </html>
  `);

  next();
}
