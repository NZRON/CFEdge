import { ensureProtocol, filterHeaders, setNoCacheHeaders, setCorsHeaders } from './utils.js';

export async function handleProxy(request, url) {
	try {
		let actualUrlStr = decodeURIComponent(url.pathname.replace("/", ""));
		actualUrlStr = ensureProtocol(actualUrlStr, url.protocol);
		actualUrlStr += url.search;

		const newHeaders = filterHeaders(
			request.headers,
			(name) => !name.startsWith("cf-")
		);

		const modifiedRequest = new Request(actualUrlStr, {
			headers: newHeaders,
			method: request.method,
			body: request.body,
			redirect: "manual",
		});

		const response = await fetch(modifiedRequest);
		let body = response.body;

		if ([301, 302, 303, 307, 308].includes(response.status)) {
			return handleRedirect(response, body);
		} else if (response.headers.get("Content-Type")?.includes("text/html")) {
			body = await handleHtmlContent(response, url.protocol, url.host, actualUrlStr);
		}

		const modifiedResponse = new Response(body, {
			status: response.status,
			statusText: response.statusText,
			headers: response.headers,
		});

		setNoCacheHeaders(modifiedResponse.headers);
		setCorsHeaders(modifiedResponse.headers);
		return modifiedResponse;
	} catch (error) {
		throw new Error(error.message);
	}
}

function handleRedirect(response, body) {
	const location = new URL(response.headers.get("location"));
	const modifiedLocation = `/${encodeURIComponent(location.toString())}`;
	return new Response(body, {
		status: response.status,
		statusText: response.statusText,
		headers: {
			...response.headers,
			Location: modifiedLocation,
		},
	});
}

async function handleHtmlContent(response, protocol, host, actualUrlStr) {
	const originalText = await response.text();
	const origin = new URL(actualUrlStr).origin;
	const regex = new RegExp("((href|src|action)=[\"'])/(?!/)", "g");
	return originalText.replace(regex, `$1${protocol}//${host}/${origin}/`);
}
