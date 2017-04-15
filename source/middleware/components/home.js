module.exports = (next, relay) => {
  relay.extensions.renderer.render(`
    <section id="home" data-lr="loaded">
      <div class="logo-text">
        <h1>Lagoon road <span>Laid back webapps</span></h1>
      </div>
      <hr>
      <p class="standout">Lagoon road helps you build webapps. It is not as low level as writing Javascript from scratch and it is not as high level as frameworks that can limit your flexibility. It sits right in the middle. It helps you to give structure to your app, lets you plug and play any package you like and doesn't get in the way when you write code the way you like. Lagoon road is laid back...</p>
      <p>In Lagoon road, we turn everything in to middleware. Routing, templating, you name it. All this middleware is connected to a single object, which we call the <em>road</em>. You can picture it as a single road on an island. You can never get lost, it is either left or right. In Lagoon road it is even simpeler, it is a one way street.</p>
      <p>Everything on the road is used by all environments that you are running, a web server, an API server, the client or even your Raspberry Pie/Aurdino and mobile device can be hooked up. Because of this it becomes a breeze to share code among these environments and still keep everything DRY. Sharing routes between client and a web server, have login checks for the API server and web server, sharing code is how Lagoon road works best.</p>
      <p>Lagoon road is not a monolithic framework that does everything out of the box. The core, the only mandatory package is about 200 lines of code. You can add extensions (regular npm packages) to mold it in a system that works for you or your team. You remain in control over how you work and code.</p>
      <section class="highlight">
        <h2>Where from here?</h2>
        <p>
          <a href="/guide" class="pure-button">Examples in the <strong>guide</strong></a>
          <a href="/reference" class="pure-button">Details in the <strong>reference</strong></a>
          <a href="/faq" class="pure-button">Answers in the <strong>FAQ</strong></a>
        </p>
      </section>
      <h2>Some <span class="laid-back">laid back</span> features of lagoon road</h2>
      <ul class="features">
        <li><span>1</span>It is modular, don't like a package, switch it for something else, it is all just npm packages</li>
        <li><span>2</span>Websockets, HTTP(2), you can switch protocols without having to change the way you build your app</li>
        <li><span>3</span>Plug in any store you like, you are not tied down to a single choice, you can even run multiple different ones next to each other</li>
        <li><span>4</span>Share code between environments and keep it organized, even when you scale up</li>
        <li><span>5</span>Want to hook up a Raspberry Pie or Arduino, sure thing, you can check for changes on sensory output and feed it straight into an API server, web server or straight to the browser</li>
        <li><span>6</span>You know how middleware works? You are up and running for Lagoon road, no endless docs you have to plow through</li>
      </ul>
    </section>
  `, 'article');
  next();
}
