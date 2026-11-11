export function ensureProtocol(url, defaultProtocol) {
	return url.startsWith("http://") || url.startsWith("https://")
		? url
		: defaultProtocol + "//" + url;
}

export function filterHeaders(headers, filterFunc) {
	return new Headers([...headers].filter(([name]) => filterFunc(name)));
}

export function setNoCacheHeaders(headers) {
	headers.set("Cache-Control", "no-store");
}

export function setCorsHeaders(headers) {
	headers.set("Access-Control-Allow-Origin", "*");
	headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	headers.set("Access-Control-Allow-Headers", "*");
}

export function jsonResponse(data, status) {
	return new Response(JSON.stringify(data), {
		status: status,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	});
}
