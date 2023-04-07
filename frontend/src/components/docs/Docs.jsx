function Docs() {
	return (
		<article className="prose mx-auto h-full p-4 overflow-y-auto">
			<h1>Documents</h1>
			<p>Owlser uses puppeteer with <a href="https://www.browserless.io" target="_blank">browserless.io</a> infrastructure. It gives you an interface and tools to automate your scanner operations.</p>

			<h2>Getting started</h2>
			<p>Owlser runs your code in its own scope. There are <code>page</code> and <code>upload</code> objects in the scope where your code will run.</p>
			<p><code>page</code>: Before your code starts, the browser is run, a new page is opened and you get this page in the page variable.</p>
			<p><code>upload</code>: Deta is serverless so you need to upload it to Drive to store screenshots.</p>

			<h3>Limits</h3>
			<p>You can create a free account on Browserless with no credit card required. You can make 1,000 free connections per month.</p>
			<p>Deta can run for 20 seconds continuously. If it takes more than 20 seconds, your connection will be terminated.</p>

			<h3>Device Emulation</h3>
			<p>Since Owlser does not allow you to access the browser object, it provides an option in the editor for device emulation, you can simulate the device you want from the top right.</p>
			
			<h3>Logs</h3>
			<p>For your code, <code>console.log</code> is useless, if you want to keep log records, you need to return it with return.</p>
			<p>You need to return array for multiple records.</p>

			<h3>Auto Save</h3>
			<p>When you do not press any key while in the editor, it saves the codes in your browser after 500 milliseconds.</p>
			<p>If you hit the save button it will save your code to Drive.</p>

			<h2>Coding</h2>
			<p>Let's take a screenshot of the Deta page and give the page title as a log:</p>
			<div className="mockup-code not-prose">
				<pre className="text-success"><code>// Go to the page.</code></pre>
				<pre><code>await page.goto("https://deta.space")</code></pre>
				<br/>
				<pre className="text-success"><code>// Capture a screenshot and get page title.</code></pre>
				<pre><code>const ss = await page.screenshot()</code></pre>
				<pre><code>const title = await page.title()</code></pre>
				<br/>
				<pre className="text-success"><code>// Let's upload the screenshot to Drive.</code></pre>
				<pre><code>upload("ss.png", ss)</code></pre>
				<br/>
				<pre className="text-success"><code>// Return the page title as a log record.</code></pre>
				<pre><code>return &#96;Page title: $&#123;title&#125;&#96;</code></pre>
			</div>
			<p>That's all. When the program will run, the browser will be created, the page will be opened, your code will be run and finally the browser will be closed, you do not need to close it.</p>
			<p>We could have returned more than one logs:</p>
			<div className="mockup-code not-prose">
				<pre data-prefix="-" className="bg-error text-error-content"><code>return title</code></pre>
				<pre data-prefix="+" className="bg-success text-success-content"><code>return [</code></pre>
				<pre data-prefix="+" className="bg-success text-success-content"><code>{" "}"Title: " + title,<br/></code></pre>
				<pre data-prefix="+" className="bg-success text-success-content"><code>{" "}"Screenshot: ss.png"<br/></code></pre>
				<pre data-prefix="+" className="bg-success text-success-content"><code>]</code></pre>
			</div>
		</article>
	);
}

export default Docs;
