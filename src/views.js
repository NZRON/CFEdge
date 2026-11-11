export function getRootHtml() {
	return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EDGE - Proxy Everything</title>
  <link rel="icon" type="image/png" href="https://s2.hdslb.com/bfs/openplatform/1682b11880f5c53171217a03c8adc9f2e2a27fcf.png@100w.webp">
  <meta name="Description" content="Proxy with CF Workers">
  <style>
    :root {
      --primary-color: #4f46e5;
      --primary-hover: #4338ca;
      --bg-color: #f8fafc;
      --card-bg: #ffffff;
      --text-color: #1e293b;
      --text-secondary: #64748b;
      --border-color: #e2e8f0;
      --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    [data-theme="dark"] {
      --primary-color: #6366f1;
      --primary-hover: #818cf8;
      --bg-color: #000000;
      --card-bg: #111111;
      --text-color: #f8fafc;
      --text-secondary: #cbd5e1;
      --border-color: #333333;
      --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.7);
    }
    * { margin: 0; padding: 0; box-sizing: border-box; transition: background-color 0.3s ease, color 0.3s ease; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg-color); color: var(--text-color);
      min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem;
    }
    .container { width: 100%; max-width: 500px; }
    .card {
      background: var(--card-bg); border-radius: 1rem; box-shadow: var(--shadow-lg);
      padding: 2.5rem; text-align: center; border: 1px solid var(--border-color); position: relative;
    }
    .logo {
      width: 80px; height: 80px; margin: 0 auto 1.5rem;
      background: linear-gradient(135deg, var(--primary-color), #8b5cf6);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
    }
    .logo svg { width: 40px; height: 40px; fill: white; }
    h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-color); }
    .subtitle { color: var(--text-secondary); margin-bottom: 2rem; font-size: 1rem; }
    .input-group { position: relative; margin-bottom: 1.5rem; }
    input {
      width: 100%; padding: 1rem 1rem 1rem 3rem;
      border: 1px solid var(--border-color); border-radius: 0.75rem;
      background: var(--card-bg); color: var(--text-color); font-size: 1rem;
    }
    input:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2); }
    .input-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-secondary); width: 20px; height: 20px; }
    button[type="submit"] {
      width: 100%; background: var(--primary-color); color: white; border: none;
      padding: 1rem; border-radius: 0.75rem; font-size: 1rem; font-weight: 600; cursor: pointer;
    }
    button[type="submit"]:hover { background: var(--primary-hover); }
    .theme-toggle {
      position: absolute; top: 1.5rem; right: 1.5rem; background: var(--card-bg);
      border: 1px solid var(--border-color); border-radius: 50%; width: 40px; height: 40px;
      display: flex; align-items: center; justify-content: center; cursor: pointer;
    }
    .features { display: flex; justify-content: space-between; margin-top: 2rem; font-size: 0.875rem; color: var(--text-secondary); }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <button class="theme-toggle" id="themeToggle" aria-label="切换主题">⚙️</button>
      <div class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
      </div>
      <h1>Proxy Everything</h1>
      <p class="subtitle">使用 Cloudflare Workers 代理服务</p>
      <form id="urlForm">
        <div class="input-group">
          <div class="input-icon">🌐</div>
          <input type="text" id="targetUrl" placeholder="输入目标网址 (例如: example.com)" required>
        </div>
        <button type="submit">开始代理</button>
      </form>
      <div class="features">
        <span>🔒 安全代理</span>
        <span>⚡ 自动修复</span>
        <span>📱 响应式</span>
      </div>
    </div>
  </div>
  <script>
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
    document.getElementById('urlForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const targetUrl = document.getElementById('targetUrl').value.trim();
      if (!targetUrl) return;
      let fullUrl = targetUrl.startsWith('http') ? targetUrl : 'https://' + targetUrl;
      window.open(window.location.origin + '/' + encodeURIComponent(fullUrl), '_blank');
    });
  </script>
</body>
</html>`;
}
