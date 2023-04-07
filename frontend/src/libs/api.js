export async function executeCode() {
	const req = await fetch("/api/execute", {
		method: "POST",
		headers: { 
			"content-type": "text/plain",
			"x-device-emulation": localStorage.getItem("emulation")
		},
		body: localStorage.getItem("value"),
	});

	if (!req.ok) return { status: false, error: `${req.status} ${req.type}` };

	const res = await req.json();
	return res;
}

export async function saveCode() {
	const req = await fetch("/api/save", {
		method: "POST",
		headers: { "content-type": "text/plain" },
		body: localStorage.getItem("value")
	});

	if(!req.ok) return { status: false, error: `${req.status} ${req.tyoe}` };

	const res = await req.json();
	return res;
}
