import { handleProxy } from './proxy.js';
import { jsonResponse } from './utils.js';
import { getRootHtml } from './views.js';

export default {
	async fetch(request, env, ctx) {
		try {
			const url = new URL(request.url);

			// 根路径返回控制台主页
			if (url.pathname === "/") {
				return new Response(getRootHtml(), {
					headers: {
						"Content-Type": "text/html; charset=utf-8",
					},
				});
			}

			// 其他所有子路径（如 /https://www.google.com）走代理核心逻辑
			return await handleProxy(request, url);
		} catch (error) {
			return jsonResponse(
				{
					error: error.message,
				},
				500
			);
		}
	},
};
