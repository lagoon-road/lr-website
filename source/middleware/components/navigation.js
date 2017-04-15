module.exports = (next, relay) => {
	relay.extensions.renderer.render(`
		<ul id="navigation" data-lr="loaded">
		  <li><a href="/">Home</a></li>
		  <li><a href="/guide">Guide</a></li>
		  <li><a href="/reference">Reference</a></li>
		  <li><a href="/faq">Faq</a></li>
		</ul>
	`, 'nav');
	next();
}
