
    module.exports = (next, relay) => {
      relay.extensions.renderer.render(`
        <section id="" data="lr-loaded">
          <h1 id="lr-main-reference">lr-main reference</h1>
<p>The <em>lr-main</em> package is the only mandatory package for Lagoon road. This package connects everything together, regardless of environment.</p>
<table>
<thead>
<tr>
<th>Information</th>
<th>-</th>
</tr>
</thead>
<tbody>
<tr>
<td>Code coverage</td>
<td><a href="https://coveralls.io/github/lagoon-road/lr-main?branch=master"><img src="https://coveralls.io/repos/github/lagoon-road/lr-main/badge.svg?branch=master" alt="Coverage Status"></a></td>
</tr>
<tr>
<td>Repo link</td>
<td><a href="https://github.com/lagoon-road/lr-main">lr-main</a></td>
</tr>
<tr>
<td>Dependencies</td>
<td><a href="https://github.com/philbooth/check-types.js">check-types</a></td>
</tr>
<tr>
<td>Size (Browserify, Babel and Gzip)</td>
<td>6.9KB</td>
</tr>
<tr>
<td>Version</td>
<td>1.0.0</td>
</tr>
<tr>
<td>License</td>
<td>MIT</td>
</tr>
<tr>
<td>Usage</td>
<td><a href="/guide">guide</a></td>
</tr>
</tbody>
</table>
<hr>
<h3 id="core-environmentid-options-">core(environmentId, [options])</h3>
<pre><code><span class="hljs-attribute">const core</span> = require(<span class="hljs-string">'lr-main'</span>);
<span class="hljs-attribute">const road</span> = core(<span class="hljs-string">'webserver'</span>);
</code></pre><p><strong>environmentId:string</strong><br>The primary environment id for the road, this is the executing environment that will be used when an update event is fired.</p>
<p><strong>[options.resetAfterCycle:boolean]</strong><br>By default the relay object gets cleared after an update event of the road, sometimes, mainly on the client, you want to keep the relay populated even if an update event has ran. To do so, you can set this boolean to  <em>false</em></p>
<hr>
<h3 id="road-parser-parser-">road.parser(parser)</h3>
<pre><code>const <span class="hljs-keyword">parser</span> = require(<span class="hljs-symbol">'lr</span>-url-parser')<span class="hljs-literal">()</span>;
road.<span class="hljs-keyword">parser</span>(<span class="hljs-keyword">parser</span>);
</code></pre><p><strong>parser:object</strong><br>The parser that you want to use to parse an incoming matchValue. It expects two functions in the object, <code>add</code> and <code>parse</code>. Read more about parsers in the <a href="/guide/writing-parsers">guide</a></p>
<hr>
<h3 id="road-extension-extensionid-extension-isupdater-">road.extension(extensionId, extension, [isUpdater])</h3>
<pre><code>road.extension(<span class="hljs-string">'router'</span>, router, <span class="hljs-literal">true</span>);
</code></pre><p><strong>extensionId:string</strong><br>A unique id to identify the extension.</p>
<p><strong>extension:*</strong><br>The actual extension, this can be any type of code that you want to use</p>
<p><strong>[isUpdater:boolean = false]</strong><br>Tell the core if on initialization the extension needs to be executed. This is typically for extensions that use update events to trigger updates to the road. Read more about <a href="/guide/writing-extensions">extensions</a> in the guide.</p>
<blockquote>
<p>Extensions can be used in middleware via the relay object.</p>
<pre><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">next</span>, relay)</span> =&gt;</span> {
  console.log(relay.extensions.extensionName);
  <span class="hljs-built_in">next</span>();
}
</code></pre></blockquote>
<hr>
<h3 id="road-middleware-middleware-traditional-">road.middleware(middleware, [...traditional])</h3>
<pre><code>road.middleware({ bodyParser, response }, <span class="hljs-string">'bodyParser'</span>, <span class="hljs-string">'response'</span>);
</code></pre><p><strong>middleware:object</strong><br>An object with all the middleware you want to use. This is a single depth object so don&#39;t use any nested structures.</p>
<blockquote>
<p>Middleware methods can be called multiple times, the middleware will all be added to a single object within the core. Therefore you need to supply unique ids/keys.
If you have a multitude of middleware functions that you  want to use it might be handy to use a dot notation to  group your middleware.</p>
<pre><code>road.middleware({
  <span class="hljs-string">'component.navigation'</span> : <span class="hljs-built_in">require</span>(<span class="hljs-string">'...'</span>),  
  <span class="hljs-string">'component.home'</span>       : <span class="hljs-built_in">require</span>(<span class="hljs-string">'...'</span>),  
});
</code></pre></blockquote>
<p><strong>traditional:string</strong>
The middleware id of the middleware that you want to run in traditional mode. The relay object wil <em>not</em> be passed in. The traditional function signature looks as follows:</p>
<pre><code>// traditional, <span class="hljs-built_in">error</span> is optional
(request, response, <span class="hljs-built_in">next</span>, <span class="hljs-built_in">error</span>) =&gt; {}
</code></pre><hr>
<h3 id="road-where-environmentid-environmentid-">road.where(environmentId, [...environmentId])</h3>
<pre><code>road.<span class="hljs-keyword">where</span>(<span class="hljs-string">'webserver'</span>, <span class="hljs-string">'client'</span>);
</code></pre><p><strong>environmentId</strong><br>The where method expects at least one argument, which should be a string. This is an environment id to which all the following middleware will be assigned. If you want to assign middleware to multiple environments you can just specify several ids like in the example above.</p>
<hr>
<h3 id="road-run-matchvalue-middlewareid-matchvalue-">road.run(matchValue, middlewareId, [matchValue])</h3>
<pre><code>road.<span class="hljs-built_in">run</span>(<span class="hljs-string">'*'</span>, <span class="hljs-string">'log'</span>);
</code></pre><p><strong>matchValue:string</strong><br>A match value in most webapps can be thought of as an url path, but it is not limited to paths only. Frankly it can be any string you can think of, even a JSON string to match on JSON content. Or in an even more exotic example you can match Raspberry Pie sensor outputs via an extension to string values and let that trigger middleware. You can use the <code>*</code> as a wildcard to match on all match values that might come in.</p>
<p><strong>middlewareId:string</strong><br>Identifier you added by using the <code>middleware</code> method. It needs to be a string and should match to a middleware function, otherwise it will throw an error.</p>
<p><strong>[updateType:string]</strong><br>The update type is an extra layer for matching middleware, if we use a http protocol to update the road, this will be the method for the request. By default it wil be <code>GET</code> because it is the most common, but it can be overwritten to be something else. Again you are not limited to http methods, it fully depends on what an extension sends out via an update event.</p>
<hr>
<h3 id="road-error-middlewareid-updatetype-">road.error(middlewareId, [updateType])</h3>
<pre><code>road.<span class="hljs-keyword">error</span>('<span class="hljs-built_in">log</span>')
</code></pre><p><em>Whenever the stack of middleware that is updated throws an error, it will be redirected to error middleware. You can use it to render alternative content or log the errors. The <code>relay</code> object will have a new property <code>relay.error</code> with the error message.</em></p>
<p><strong>middlewareId:string</strong><br>Identifier you added by using the <code>middleware</code> method. It needs to be a string and should match to a middleware function, otherwise it will throw.</p>
<p><strong>[updateType:string]</strong><br>The update type is an extra layer for matching middleware, if we use a http protocol to update the road, this will be the method for the request. By default it wil be <code>GET</code> because it is the most common, but it can be overwritten to be something else. Again you are not limited to http methods, it fully depends on what an extension sends out via an update event.</p>
<hr>
<h3 id="road-nomatch-middlewareid-updatetype-">road.noMatch(middlewareId, [updateType])</h3>
<pre><code><span class="hljs-selector-tag">road</span><span class="hljs-selector-class">.noMatch</span>(<span class="hljs-string">'log'</span>);
</code></pre><p><em>When no middleware could be found for a current combination of <code>matchValue</code> and <code>updateType</code>, the <code>noMatch</code> middleware will be called, this is handy if you want to return a 404 page or something similar.</em></p>
<p><strong>middlewareId:string</strong><br>Identifier you added by using the <code>middleware</code> method. It needs to be a string and should match to a middleware function, otherwise it will throw.</p>
<p><strong>[updateType:string]</strong><br>The update type is an extra layer for matching middleware, if we use a http protocol to update the road, this will be the method for the request. By default it wil be <code>GET</code> because it is the most common, but it can be overwritten to be something else. Again you are not limited to http methods, it fully depends on what an extension sends out via an update event.</p>
<hr>
<h3 id="road-done-middlewareid-updatetype-">road.done(middlewareId, [updateType])</h3>
<pre><code><span class="hljs-selector-tag">road</span><span class="hljs-selector-class">.done</span>(<span class="hljs-string">'response'</span>, <span class="hljs-string">'post'</span>);
</code></pre><p><em>The <code>done</code> method is called as the last method in the stack, it is typically used to render output (html or json) to a client</em></p>
<p><strong>middlewareId:string</strong><br>Identifier you added by using the <code>middleware</code> method. It needs to be a string and should match to a middleware function, otherwise it will throw.</p>
<p><strong>[updateType:string]</strong><br>The update type is an extra layer for matching middleware, if we use a http protocol to update the road, this will be the method for the request. By default it wil be <code>GET</code> because it is the most common, but it can be overwritten to be something else. Again you are not limited to http methods, it fully depends on what an extension sends out via an update event.</p>
<hr>
<h3 id="road-update-options-object-parameters-">road.update(options:object, [...parameters])</h3>
<pre><code><span class="hljs-selector-tag">road</span><span class="hljs-selector-class">.update</span>({ <span class="hljs-attribute">matchValue </span>: <span class="hljs-string">'/somepath'</span>, updateType : <span class="hljs-string">'post'</span> }, <span class="hljs-selector-tag">parameterOne</span>, <span class="hljs-selector-tag">parameterTwo</span>);
</code></pre><p><em>Manually trigger an update event to the road by calling the <code>update</code> method.</em></p>
<p><strong>options.matchValue:string</strong><br>A match value in most webapps can be thought of as an url path, but it is not limited to paths only. Frankly it can be any string you can think of, even a JSON string to match on JSON content. Or in an even more exotic example you can match Raspberry pie sensor outputs via an extension to string values and let that trigger middleware. You can use the <code>*</code> as a wildcard to match on all match values that might come in.</p>
<p><strong>options.updateType:string</strong><br>The update type is an extra layer for matching middleware, if we use a http protocol to update the road, this will be the method for the request. By default it wil be <code>GET</code> because it is the most common, but it can be overwritten to be something else. Again you are not limited to http methods, it fully depends on what an extension sends out via an update event.</p>
<p><strong>parameters:*</strong><br>Each update can be have custom parameters that will be available as middleware arguments. This could be for example the <code>request</code> and <code>response</code> object on a router update.</p>
<blockquote>
<p>Read more about parameters in the <a href="/guide/update-and-middleware-stack">update and middleware stack</a> section.
Every time a update method is called the middleware that matches will be added to the stack of middleware that needs to be executed. So when calling this on the server you might send out a response and afterwards more middleware will be called. Therefore use it on the client mainly to initialize events. Make sure you fully understand the middelware stack before start using the update function.</p>
</blockquote>
<h2 id="relay-object">Relay object</h2>
<p>The relay object is passed from middleware function to middleware function. There are a couple of properties and methods in this object that cannot be overwritten. If you will try to do so, Lagoon road will throw an error to warn you of naming conflicts.</p>
<h3 id="relay-extensions-object">relay.extensions:object</h3>
<p>An Object that has all the registered extensions in it. This way all extensions will not get scattered all over the object.</p>
<h3 id="relay-parameters-object">relay.parameters:object</h3>
<p>If you are using a parser that supplies you with parameters like <code>lr-url-parser</code>, you can access them via <code>relay.parameters</code>.</p>
<h3 id="relay-update-options-object-function">relay.update(options:object):function</h3>
<p>See update method for usage.</p>
<h3 id="relay-exit-function">relay.exit():function</h3>
<p>When you want to prematurely finish the update cycle you have to call the <code>exit()</code> function. You want to use this when you want to send a <code>response.end</code> before the <code>done</code> hook. This function should be used rarely, read more about it in the <a href="/guide/update-and-middleware-stack">stack</a> and <a href="/guide/handling-static-content">static content</a> guides.</p>

        </section>
    `, 'article');
    next();
  }
  