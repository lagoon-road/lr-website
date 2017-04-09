module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <h1>FAQ</h1>
    <p>Answers to some common questions you might have. Cannot find an answer? Please open an <a href="https://github.com/lagoon-road/lr-core/issues/new">issue</a> on github.</p>
    <ul class="submenu">
      <li><a href="#which-versions-of-node-are-supported">Which versions of node are supported?</a></li>
      <li><a href="#does-a-single-road-not-create-overhead-in-other-environments">Does a single road not create overhead in other environments?</a></li>
      <li><a href="#what-is-the-best-directory-structure-for-my-project">What is the best directory structure for my project?</a></li>
      <li><a href="#who-created-lagoon-road">Who created Lagoon road?</a></li>
      <li><a href="#where-does-the-name-come-from">Where does the name come from?</a></li>
    </ul>
    <h3><a name="which-versions-of-node-are-supported">Which versions of node are supported?</a></h3>

    <h3><a name="does-a-single-road-not-create-overhead-in-other-environments">Does a single road not create overhead in other environments?</a></h3>

    <h3><a name="what-is-the-best-directory-structure-for-my-project">What is the best directory structure for my project?</a></h3>

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
