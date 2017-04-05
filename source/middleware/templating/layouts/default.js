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
        <section id="navigation"></section>
        <section class="wrapper">
          <article id="content">
            Some shit
          </article>
        </section>
      </body>
    </html>
  `);

  next();
}
