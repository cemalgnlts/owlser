const express = require("express");
const puppeteer = require("puppeteer-core");
const { Deta } = require("deta");

const PORT = process.env.PORT || 3000;
const BROWSERLESS_API_TOKEN = process.env.BROWSERLESS_API_KEY;
const AsyncFunction = (async function() {}).constructor;

const deta = new Deta();
const uploads = deta.Drive("uploads");
const upload = (name, data) => uploads.put(name, { data });

const client = null;

const app = express();
app.use(express.static("/tmp"));
app.use(express.text());

app.get("/", (req, res) => res.send("ok"));

app.get("/logs", (req, res) => {
	const headers = {
		"Content-Type": "text/event-stream",
		"Connection": "keep-alive",
		"Cache-Control": "no-cache"
	};

  res.writeHead(200, headers);	
	res.write("Hello");

	client = res;

	req.on("close", () => client = null);
});

app.post("/save", async (req, res) => {
	const data = Buffer.from(req.body);
	let status = true;
	let output = "";

	try {
		output = await uploads.put("code.js", { data, contentType: "text/plain" });
	} catch(err) {
		console.error(err);
		status = false;
		output = err.toString();
	}

	res.send({
		status,
		output
	});
});

app.post("/execute", async (req, res) => {
	let output = null;
	let status = true;
	let browser;

	const device = puppeteer.devices[req.get("x-device-emulation")];

	try {
		browser = await puppeteer.connect({
			browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_API_TOKEN}&stealth&blockAds`
		});
		const page = await browser.newPage();
		page.setDefaultTimeout(18000);

		if(device) {
			await page.emulate(device);
		} else {
			await page.setViewport({
				width: 1280,
				height: 720
			})
		}

		const userFun = AsyncFunction("page,upload", req.body);
		output = await userFun(page, upload);
	} catch(err) {
		console.error(err);

		output = err.toString();
		status = false;
	} finally {
		await browser.close();
	}

	res.send({
		status,
		output
	});
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}!`));
