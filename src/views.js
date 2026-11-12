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
    /* ==================== 重置 ==================== */
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* ==================== 主题变量 ==================== */
    :root {
      color-scheme: light;
      --bg: #f9fcff;
      --glass-bg: rgba(255, 255, 255, 0.78);
      --glass-bg-strong: rgba(255, 255, 255, 0.92);
      --glass-border: rgba(255, 255, 255, 0.95);
      --glass-edge: rgba(255, 255, 255, 1);
      --glass-inset: inset 0 1px 0 rgba(255, 255, 255, 0.9);
      --card-ring: 0 0 0 1px rgba(15, 23, 42, 0.04);
      --shadow-card: 0 24px 60px -24px rgba(30, 58, 138, 0.18),
                     0 8px 24px -12px rgba(30, 58, 138, 0.10);
      --shadow-btn: 0 8px 24px -8px rgba(37, 99, 235, 0.55);
      --text: #1a202c;
      --text-muted: #6b7280;
      --input-bg: rgba(255, 255, 255, 0.9);
      --input-border: rgba(148, 163, 184, 0.35);
      --primary: #3b82f6;
      --primary-2: #1d4ed8;
      --ring: rgba(59, 130, 246, 0.22);
      --radius-card: 26px;
      --radius-input: 13px;
    }

    [data-theme="dark"] {
      color-scheme: dark;
      --bg: #1a1a1a;
      --glass-bg: rgba(255, 255, 255, 0.045);
      --glass-bg-strong: rgba(255, 255, 255, 0.08);
      --glass-border: rgba(255, 255, 255, 0.09);
      --glass-edge: rgba(255, 255, 255, 0.16);
      --glass-inset: inset 0 1px 0 rgba(255, 255, 255, 0.06);
      --card-ring: 0 0 0 1px rgba(0, 0, 0, 0.4);
      --shadow-card: 0 24px 60px -20px rgba(0, 0, 0, 0.75),
                     0 8px 24px -12px rgba(0, 0, 0, 0.5);
      --shadow-btn: 0 8px 24px -8px rgba(37, 99, 235, 0.45);
      --text: #e5e7eb;
      --text-muted: #9ca3af;
      --input-bg: rgba(255, 255, 255, 0.05);
      --input-border: rgba(255, 255, 255, 0.10);
      --primary: #60a5fa;
      --primary-2: #2563eb;
      --ring: rgba(96, 165, 250, 0.28);
    }

    /* ==================== 页面基底 ==================== */
    body {
      min-height: 100vh;
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif;
      color: var(--text);
      background: var(--bg);
      transition: background-color 0.4s ease, color 0.4s ease;
      -webkit-font-smoothing: antialiased;
    }

    /* ==================== 玻璃卡片 ==================== */
    .glass-card {
      position: relative;
      width: 100%;
      max-width: 440px;
      padding: 48px 40px 32px;
      text-align: center;
      background: var(--glass-bg);
      border: 1.5px solid var(--glass-border);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-card), var(--card-ring), var(--glass-inset);
      -webkit-backdrop-filter: blur(24px) saturate(160%);
      backdrop-filter: blur(24px) saturate(160%);
      overflow: hidden;
      animation: cardAppear 0.85s cubic-bezier(0.22, 0.61, 0.36, 1) both;
      transition: background-color 0.4s ease, border-color 0.4s ease,
                  box-shadow 0.4s ease;
    }

    .glass-card::before {
      content: "";
      position: absolute;
      inset: 0 0 auto 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--glass-edge), transparent);
      opacity: 0.9;
      pointer-events: none;
    }

    .glass-card::after {
      content: "";
      position: absolute;
      left: 12%;
      right: 12%;
      bottom: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--glass-edge), transparent);
      opacity: 0.35;
      pointer-events: none;
    }

    @keyframes cardAppear {
      from { opacity: 0; transform: translateY(24px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* ==================== 头部 ==================== */
    .card-header { margin-bottom: 32px; }

    .card-icon {
      width: 72px;
      height: 72px;
      margin: 0 auto 20px;
      display: grid;
      place-items: center;
      color: #fff;
      border-radius: 22px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%);
      box-shadow: 0 14px 32px -10px rgba(37, 99, 235, 0.6),
                  inset 0 1px 0 rgba(255, 255, 255, 0.35);
    }

    .card-icon svg { width: 36px; height: 36px; }

    .card-title {
      font-size: 30px;
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.2;
      margin-bottom: 8px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .card-subtitle {
      font-size: 15px;
      color: var(--text-muted);
    }

    /* ==================== 主题按钮 ==================== */
    .theme-btn {
      position: absolute;
      top: 18px;
      right: 18px;
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      font-size: 17px;
      line-height: 1;
      border-radius: 50%;
      border: 1px solid var(--glass-border);
      background: var(--glass-bg-strong);
      -webkit-backdrop-filter: blur(12px);
      backdrop-filter: blur(12px);
      color: var(--text);
      cursor: pointer;
      transition: transform 0.25s ease, border-color 0.25s ease,
                  background-color 0.4s ease;
    }

    .theme-btn:hover {
      transform: rotate(12deg) scale(1.08);
      border-color: var(--primary);
    }
    .theme-btn:active { transform: scale(0.94); }

    /* ==================== 表单 ==================== */
    .proxy-form {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-top: 4px;
    }

    .input-wrap { position: relative; }

    .input-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      width: 20px;
      height: 20px;
      transform: translateY(-50%);
      color: var(--text-muted);
      opacity: 0.75;
      pointer-events: none;
      transition: color 0.25s ease, opacity 0.25s ease;
    }

    .form-input {
      width: 100%;
      padding: 15px 16px;
      font-family: inherit;
      font-size: 16px;
      color: var(--text);
      background: var(--input-bg);
      border: 1.5px solid var(--input-border);
      border-radius: var(--radius-input);
      -webkit-appearance: none;
      appearance: none;
      transition: border-color 0.25s ease, box-shadow 0.25s ease,
                  background-color 0.4s ease;
    }
    .form-input.with-icon { padding-left: 46px; }

    .form-input::placeholder { color: var(--text-muted); opacity: 0.8; }

    .form-input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 4px var(--ring);
    }

    .input-wrap:focus-within .input-icon {
      color: var(--primary);
      opacity: 1;
    }

    /* ==================== 按钮 ==================== */
    .btn {
      width: 100%;
      padding: 15px 20px;
      font-family: inherit;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.02em;
      color: #fff;
      border: none;
      border-radius: var(--radius-input);
      cursor: pointer;
      -webkit-appearance: none;
      appearance: none;
      transition: transform 0.2s ease, box-shadow 0.25s ease, filter 0.2s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%);
      box-shadow: var(--shadow-btn), inset 0 1px 0 rgba(255, 255, 255, 0.25);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      filter: brightness(1.06);
    }
    .btn-primary:active {
      transform: translateY(0);
      filter: brightness(0.98);
    }

    /* ==================== 底部 ==================== */
    .card-footer {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin-top: 28px;
      padding-top: 18px;
      border-top: 1px solid var(--input-border);
      font-size: 12.5px;
      color: var(--text-muted);
    }

    .feature { white-space: nowrap; }

    /* ==================== 响应式 ==================== */
    @media (max-width: 480px) {
      body { padding: 16px; }
      .glass-card { padding: 36px 22px 24px; border-radius: 20px; }
      .card-footer { flex-wrap: wrap; justify-content: center; font-size: 12px; }
    }
  </style>
</head>
<body>
  <div class="glass-card">
    <button class="theme-btn" id="themeToggle" aria-label="切换主题">✨</button>
    
    <div class="card-header">
      <div class="card-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </div>
      <h1 class="card-title">Proxy Everything</h1>
      <p class="card-subtitle">使用 Cloudflare Workers 代理服务</p>
    </div>

    <form id="urlForm" class="proxy-form">
      <div class="input-wrap">
        <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <input type="text" id="targetUrl" class="form-input with-icon" placeholder="输入目标网址 (例如: example.com)" required autocomplete="off" spellcheck="false">
      </div>
      <button type="submit" class="btn btn-primary">开始代理</button>
    </form>

    <div class="card-footer">
      <span class="feature">🔰 安全代理</span>
      <span class="feature">♻️ 自动修复</span>
      <span class="feature">🔆 响应式设计</span>
    </div>
  </div>

  <script>
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme') || 
                         (prefersDarkScheme.matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButtonIcon(currentTheme);

    themeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeButtonIcon(newTheme);
    });

    function updateThemeButtonIcon(theme) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '✨';
    }

    document.getElementById('urlForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const targetUrl = document.getElementById('targetUrl').value.trim();
      if (!targetUrl) return;
      let fullUrl = targetUrl;
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        fullUrl = 'https://' + targetUrl;
      }
      const currentOrigin = window.location.origin;
      window.open(currentOrigin + '/' + encodeURIComponent(fullUrl), '_blank');
      this.reset();
    });
  </script>
</body>
</html>`;
}
