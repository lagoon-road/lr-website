module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <h1>About</h1>
    <h2>Where does the name come from?</h2>
    <p>
      The name comes from one of my favorite books, <em><a href="https://www.amazon.com/Surviving-Paradise-Year-Disappearing-Island/dp/B0044KN3CO">Surviving Paradise: One Year on a Disappearing Island</a></em>. At some point the protagonist is back on Majuro, an island in the Marshall Islands group and talks about the single road on the island.
    </p>
    <blockquote>
      Taxis were a snap—stand on the appropriate side of the street, ﬂag down one of the six cabs that arrived every minute, and then sit in the cool dryness of the air-conditioning and enjoy the ride. No need to tell the driver your destination: since there was only one real road, you could simply tell him when to stop.
    </blockquote>
    <p>The road that he is talking about is called Lagoon road, and since I am residing on Bali, a link with islands and the single road concept seemed like a good metaphore for the single object structure of Lagoon road.
    <h2>Who created Lagoon road?</h2>
    <p><a href="http://royniels.nl">Check my website</a></p>
  `, 'article');
  next();
}
