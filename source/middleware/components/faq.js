module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <h1>FAQ</h1>
    <p>Answers to some common questions you might have. Cannot find an answer? Please open an <a href="https://github.com/lagoon-road/lr-core/issues/new">issue</a> on Github. I will keep this list up to date so all questions asked on Github that have any merit will be added to this list.</p>
    <ul class="submenu">
      <li><a href="#which-versions-of-node-are-supported">Which versions of node are supported?</a></li>
      <li><a href="#does-a-single-road-not-create-overhead-in-other-environments">Does a single road not create overhead in other environments?</a></li>
      <li><a href="#what-is-the-best-directory-structure-for-my-project">What is the best directory structure for my project?</a></li>
      <li><a href="#who-created-lagoon-road">Who created Lagoon road?</a></li>
      <li><a href="#where-does-the-name-come-from">Where does the name come from?</a></li>
    </ul>
    <h3><a name="which-versions-of-node-are-supported">Which versions of node are supported?</a></h3>
    <p>The packages have hardly any dependencies and are very much just plain javascript, so everything from node 4.x up I expect to work. The code is written with ES6 so you might need to compile your code first with Babel to get it to run. Best practice is to use the newest version of node, for the simple reason that I haven't tested older versions. I developed with node 7.6.x</p>
    <h3><a name="does-a-single-road-not-create-overhead-in-other-environments">Does a single road not create overhead in other environments?</a></h3>
    <p>Yes, combining the middleware in a single place, will create overhead. But compared to what you gain from having everything connected in a single place, it is negligible. You will only create some extra properties on the internal objects within the core. Whenever the update event is fired the matches are done based on object key matches, so there is no extra filtering needed. Performance wise not really an issue.</p>

    <h3><a name="what-is-the-best-directory-structure-for-my-project">What is the best directory structure for my project?</a></h3>
    <p>Lagoon road doesn't force any structure on you. That is the phylosophy of Lagoon road, that you don't have to tie yourself down to any methodologies or structures. You want to work more in a component based manner, you can do so. Want to seperate your scripts from your styles, because you reuse your css over multiple components, also possible.</p>
    <p>This is the structure that I've used for this website</p>
    <pre>
- source
| - bootstrap
  | - client.js
  | - server.js
  | - road.js
| - extensions
  | - settings
    | - webserver.js
| - middleware
  | - components
    | - .. every component in a single file
  | - layouts
    | .. every layout in a single file
  | - events
    | - .. client side dom code, every component in a single file
  | - response
    | - response.js (html response for the webserver)
| - stylesheets
  | - components
    | .. every component in a single file
  | - layouts
    | .. every layout in a single file
  | - .. some more general styles, like animation and typography
  | - styles.css (importing all other styles)
    </pre>
    <p>Then all client side code will be pass through babel and browserify and the minifier. View the <a href="https://github.com/lagoon-road/lr-website/blob/master/package.json">package.json</a> and the <a href="https://github.com/lagoon-road/lr-website">lr-website code</a></p>


    <h3><a name="who-created-lagoon-road">Who created Lagoon road?</a></h3>
    <p><a href="http://royniels.nl">Check my website</a></p>

    <h3><a name="where-does-the-name-come-from">Where does the name come from?</a></h3>
    <p>
      The name comes from one of my favorite books, <em><a href="https://www.amazon.com/Surviving-Paradise-Year-Disappearing-Island/dp/B0044KN3CO">Surviving Paradise: One Year on a Disappearing Island</a></em>. At some point the protagonist is back on Majuro, an island in the Marshall Islands group and talks about the single road on the island.
    </p>
    <blockquote>
      Taxis were a snap—stand on the appropriate side of the street, ﬂag down one of the six cabs that arrived every minute, and then sit in the cool dryness of the air-conditioning and enjoy the ride. No need to tell the driver your destination: since there was only one real road, you could simply tell him when to stop.
    </blockquote>
    <p>The road that he is talking about is called Lagoon road, and since I am residing on Bali, a link with islands and the single road concept seemed like a good metaphore for the single object structure of Lagoon road.
  `, 'article');
  next();
}
