
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <section id="" data="lr-loaded">
          <h1 id="writing-parsers">Writing parsers</h1>
<p>There might be scenarios where you need some custom parsers for the <code>matchValue</code>. This guide will show you how to.</p>
<pre><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> {
        add(matchValue) {},
        parse(matchValue) {}
    }
}
</code></pre><p>A parser needs to return an object with two methods. <code>add</code> and <code>parse</code>. Whenever you add middleware via the <code>run</code> function the <code>add</code> method will be called and you can handle the given <code>matchValue</code> and store it in you parser. </p>
<p>When later on the update event is been called the <code>matchValue</code> will go to the <code>parse</code> method. The parse method has to return an object. with the following signature.</p>
<pre><code>{ <span class="hljs-attribute">path </span>: <span class="hljs-string">'stringValue'</span>, parameters : {} }
</code></pre><p>The <code>path</code> property should be the value that should be the final <code>matchValue</code> that you want to match on in the <code>run</code> method. Parameters is an object with all the dynamic parts that you have taken from the <code>matchValue</code> that came from the update function.</p>

        </section>
    `, 'article');
    next();
  }
  