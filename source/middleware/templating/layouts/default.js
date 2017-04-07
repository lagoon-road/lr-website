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
        <img src="images/island.svg" class="island">
        <img src="images/cloud-1.svg" class="cloud">
        <img src="images/cloud-2.svg" class="cloud">
        <img src="images/cloud-3.svg" class="cloud">
        <section id="navigation"></section>
        <section class="wrapper">
          <img src="images/car-1.svg" class="car">
          <img src="images/car-2.svg" class="car">
          <img src="images/car-3.svg" class="car">
          <img src="images/tree.svg" class="tree">
          <div class="logo">
            <img src="images/logo.svg">
            <h1>Lagoon road</h1>
            <p>Laid back webapps</p>
          </div>
          <div class="content">
            <article></article>
            <footer>
              Lagoon road / Roy Niels / MIT License / ${ new Date().getFullYear() }
            </footer>
          </div>
        </section>
      </body>
    </html>
  `);

  next();
}
