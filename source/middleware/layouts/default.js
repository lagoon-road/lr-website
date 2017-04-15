module.exports = (next, relay, request, response) => {
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
        <script src="/scripts/main.min.js"></script>
      </head>
      <body id="default" data-lr="loaded">
        <img src="/images/logo.svg" class="logo">
        <nav>
        </nav>
        <div class="content">
          <article></article>
          <footer>
            Lagoon road / Roy Niels / MIT License / ${ new Date().getFullYear() }
          </footer>
        </div>
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-13177992-5', 'auto');
          ga('send', 'pageview');

        </script>        
      </body>
    </html>
  `);

  next();
}
