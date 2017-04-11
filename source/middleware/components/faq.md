# Faq

Answers to some common questions you might have. Cannot find an answer? Please open an [issue](https://github.com/lagoon-road/lr-core/issues/new) on Github. I will keep this list up to date so all questions asked on Github that have any merit will be added to this list.

<ul class="submenu">
  <li><a href="#which-versions-of-node-are-supported-">Which versions of node are supported?</a></li>
  <li><a href="#does-a-single-road-not-create-overhead-in-other-environments-">Does a single road not create overhead in other environments?</a></li>
  <li><a href="#what-is-the-best-directory-structure-for-my-project-">What is the best directory structure for my project?</a></li>
  <li><a href="#why-is-there-a-different-middleware-argument-signature-">Why is there a different middleware argument signature?</a></li>
  <li><a href="#do-i-have-to-call-next-in-the-done-middleware-">Do I have to call next in the done middleware?</a></li>
  <li><a href="#i-want-to-keep-the-relay-object-populated-after-a-request-how-do-i-do-that-">I want to keep the relay object populated after a request, how do I do that?</a></li>
  <li><a href="#does-the-order-of-how-i-attch-middleware-to-the-road-matter-">Does the order of how I attch middleware to the road matter?</a></li>
  <li><a href="#who-created-lagoon-road-">Who created Lagoon road?</a></li>
  <li><a href="#where-does-the-name-come-from-">Where does the name come from?</a></li>
</ul>

### Which versions of node are supported?
The packages have hardly any dependencies and are very much just plain javascript, so everything from node 4.x up I expect to work. The code is written with ES6 so you might need to compile your code first with Babel to get it to run. Best practice is to use the newest version of node, for the simple reason that I haven't tested older versions. I developed with node 7.6.x

### Does a single road not create overhead in other environments?
Yes, combining the middleware in a single place, will create overhead. But compared to what you gain from having everything connected in a single place, it is negligible. You will only create some extra properties on the internal objects within the core. Whenever the update event is fired the matches are done based on object key matches, so there is no extra filtering needed. Performance wise not really an issue.

### What is the best directory structure for my project?
Lagoon road doesn't force any structure on you. That is the phylosophy of Lagoon road, that you don't have to tie yourself down to any methodologies or structures. You want to work more in a component based manner, you can do so. Want to seperate your scripts from your styles, because you reuse your css over multiple components, also possible. This is the structure that I've used for this website:
```
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
```

Then all client side code will be pass through babel and browserify and the minifier. View the [package.json](https://github.com/lagoon-road/lr-website/blob/master/package.json) and the [lr-website code]https://github.com/lagoon-road/lr-website

### Why is there a different middleware argument signature?
The reason that Lagoon road doesn't follow the standard argument order of, `request`, `response`, `next` and an optional `error` is because we are not only handling http requests and responses. In frameworks like Expressjs everything is centered around the the http protocol. In that setup it makes sense to have `request` and `response` come first. In Lagoon road we don't tie in http as the only protocol so the parameters for your middleware might be different. Same goes for the client. If we would have kept the order the same there will be a lot of cases where you are specifying parameters that are not really used. If you have traditional middleware that you want to plug in, you can make it run in the traditional order. See the [reference about middleware](/reference/middleware) for more information.

### Do I have to call next in the done middleware?
It depends. If the done method is the last method in the stack, then you don't have to call the next function. But if you add multiple done hooks, which is a valid setup, you might need to add it because otherwise the next middleware in the stack will not be called. You can always call next, even if it is the last, it will just call an empty function.

### I want to keep the relay object populated after a request, how do I do that?
This is pretty straight forward. You can just set the `resetAfterCycle` option on the core initialization. Check the [reference](/reference/lr-core) for more information.

### Does the order of how I attch middleware to the road matter?
Yes it does. The first middleware that you add, will be put first in the stack. This is why Lagoon road is simple to reason about. You just start looking from the top and see what you first match is. That will be the first middleware that will be called. Read more about the [stack and middleware](/guide/stack-and-middleware) in the guide.

### Who created Lagoon road?
[Me](http://royniels.nl)

### Where does the name come from?
The name comes from one of my favorite books, _[Surviving Paradise: One Year on a Disappearing Island](https://www.amazon.com/Surviving-Paradise-Year-Disappearing-Island/dp/B0044KN3CO")_. At some point the protagonist is back on Majuro, an island in the Marshall Islands group and talks about the single road on the island.

> Taxis were a snap—stand on the appropriate side of the street, ﬂag down one of the six cabs that arrived every minute, and then sit in the cool dryness of the air-conditioning and enjoy the ride. No need to tell the driver your destination: since there was only one real road, you could simply tell him when to stop.

The road that he is talking about is called Lagoon road, and since I am residing on Bali, a link with islands and the single road concept seemed like a good metaphore for the single object structure of Lagoon road.
