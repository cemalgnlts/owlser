const express = require("express");
const chromium = require('@sparticuz/chromium');
const pc = require("puppeteer-core");
const puppeteer = require("puppeteer");
const { Deta } = require("deta");


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

app.post("/run", async (req, res) => {
	let output = null;
	let status = true;
	let browser;

	const device = puppeteer.KnownDevices[req.get("x-device-emulation")];

	try {
		if (process.env.DETA_SPACE_APP) {
			browser = await pc.launch({
			args: chromium.args,
			executablePath: await chromium.executablePath(),
			headless: 'new',
			ignoreHTTPSErrors: true
		});
		} else {
			browser = await puppeteer.launch({headless: "new"});
		}
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

		output = err.stack;
		status = false;
	} finally {
		await browser.close();
	}

	res.send({
		status,
		output
	});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}!`));
