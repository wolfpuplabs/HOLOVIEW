<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="theme-color" content="#07080F" />
<title>HOLOVIEW — Spatial Asset Library</title>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

<style>
  :root {
    --void: #07080f;
    --void-2: #0a0c18;
    --panel: rgba(13, 16, 30, 0.72);
    --panel-solid: #0c0f1d;
    --line: rgba(70, 230, 255, 0.14);
    --line-strong: rgba(70, 230, 255, 0.38);
    --cyan: #46e6ff;
    --violet: #8e7bff;
    --rose: #ff5c7a;
    --mint: #4dffc3;
    --text: #e8edff;
    --muted: #767e9e;
    --muted-2: #4a5170;
    --radius: 18px;
    --ease: cubic-bezier(0.22, 1, 0.36, 1);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html, body { height: 100%; }

  body {
    background:
      radial-gradient(1200px 800px at 70% -10%, rgba(142, 123, 255, 0.10), transparent 60%),
      radial-gradient(1000px 700px at 10% 110%, rgba(70, 230, 255, 0.08), transparent 55%),
      var(--void);
    color: var(--text);
    font-family: "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    min-height: 100dvh;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* Ambient depth field behind everything */
  .starfield {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image:
      radial-gradient(1px 1px at 20% 30%, rgba(232, 237, 255, 0.5), transparent),
      radial-gradient(1px 1px at 75% 60%, rgba(70, 230, 255, 0.5), transparent),
      radial-gradient(1px 1px at 50% 85%, rgba(142, 123, 255, 0.5), transparent),
      radial-gradient(1.5px 1.5px at 85% 20%, rgba(232, 237, 255, 0.4), transparent);
    background-size: 100% 100%;
    opacity: 0.6;
    animation: drift 30s linear infinite alternate;
  }
  @keyframes drift { to { transform: translate3d(-2%, -1.5%, 0); } }

  .wrap {
    position: relative; z-index: 1;
    width: 100%; max-width: 720px; margin: 0 auto;
    padding: max(20px, env(safe-area-inset-top)) 18px 64px;
  }

  /* ---------- Header ---------- */
  header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
  .brand { display: flex; flex-direction: column; gap: 3px; }
  .wordmark {
    font-size: 26px; font-weight: 700; letter-spacing: 2px; line-height: 1;
    background: linear-gradient(92deg, #fff 0%, var(--cyan) 38%, var(--violet) 64%, #fff 100%);
    background-size: 220% 100%;
    -webkit-background-clip: text; background-clip: text; color: transparent;
    animation: holoshift 7s ease-in-out infinite;
  }
  @keyframes holoshift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  .telemetry {
    font-family: "Space Mono", monospace; font-size: 10.5px; letter-spacing: 0.4px;
    color: var(--muted); display: flex; gap: 10px; flex-wrap: wrap;
  }
  .telemetry b { color: var(--cyan); font-weight: 700; }
  .telemetry .mode { color: var(--violet); }

  .hbtns { display: flex; gap: 8px; }
  .icon-btn {
    width: 38px; height: 38px; border-radius: 11px; border: 1px solid var(--line);
    background: var(--panel); color: var(--text); cursor: pointer; font-size: 15px;
    display: grid; place-items: center; backdrop-filter: blur(12px); transition: border-color .2s, transform .15s;
  }
  .icon-btn:hover { border-color: var(--line-strong); transform: translateY(-1px); }
  .icon-btn[aria-pressed="false"] { color: var(--muted-2); }

  /* ---------- Holo stage (signature element) ---------- */
  .stage {
    position: relative; width: 100%; aspect-ratio: 4 / 3; min-height: 320px;
    border-radius: 24px; overflow: hidden; border: 1px solid var(--line);
    background: linear-gradient(180deg, #05060d 0%, #090b16 55%, #05060d 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 30px 60px rgba(0,0,0,0.6);
    perspective: 900px;
  }
  .stage.pseudo-fullscreen {
    position: fixed; inset: 0; z-index: 9999; aspect-ratio: auto;
    width: 100vw; height: 100dvh; border-radius: 0; border: none;
  }

  /* recessed volumetric grid floor */
  .grid-floor {
    position: absolute; left: 50%; bottom: -6%; width: 240%; height: 70%;
    transform: translateX(-50%) rotateX(74deg); transform-origin: bottom center;
    background-image:
      linear-gradient(var(--line) 1px, transparent 1px),
      linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 44px 44px;
    -webkit-mask-image: radial-gradient(ellipse 60% 80% at 50% 100%, #000 30%, transparent 75%);
    mask-image: radial-gradient(ellipse 60% 80% at 50% 100%, #000 30%, transparent 75%);
    animation: floorflow 6s linear infinite; z-index: 0; pointer-events: none;
  }
  @keyframes floorflow { to { background-position: 0 44px, 44px 0; } }

  .depth-glow {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(50% 45% at 50% 42%, rgba(70,230,255,0.10), transparent 70%),
      radial-gradient(40% 40% at 70% 75%, rgba(142,123,255,0.12), transparent 70%);
    animation: breathe 9s ease-in-out infinite alternate;
  }
  @keyframes breathe { from { opacity: .55; transform: scale(1); } to { opacity: 1; transform: scale(1.06); } }

  model-viewer {
    position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1;
    background: transparent; --poster-color: transparent;
  }

  /* scan-sweep materialize overlay */
  .scan {
    position: absolute; inset: 0; z-index: 3; pointer-events: none; opacity: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(70,230,255,0.0) 44%, rgba(70,230,255,0.55) 50%, rgba(70,230,255,0.0) 56%, transparent 100%);
    mix-blend-mode: screen;
  }
  .scan.run { animation: sweep 1.1s var(--ease) 1; }
  @keyframes sweep { 0% { opacity: 1; transform: translateY(-100%); } 90% { opacity: 1; } 100% { opacity: 0; transform: translateY(100%); } }

  .stage-empty {
    position: absolute; inset: 0; z-index: 2; display: grid; place-items: center; text-align: center; padding: 24px;
    color: var(--muted); pointer-events: none;
  }
  .stage-empty .ring {
    width: 76px; height: 76px; margin: 0 auto 14px; border-radius: 50%;
    border: 1.5px solid var(--line-strong); position: relative;
    box-shadow: 0 0 30px rgba(70,230,255,0.25), inset 0 0 24px rgba(70,230,255,0.15);
    animation: spin 8s linear infinite;
  }
  .stage-empty .ring::before { content:""; position:absolute; inset:14px; border-radius:50%; border:1px dashed var(--line); }
  @keyframes spin { to { transform: rotate(360deg); } }
  .stage-empty h3 { font-size: 14px; color: var(--text); font-weight: 600; letter-spacing: .3px; }
  .stage-empty p { font-size: 11.5px; margin-top: 5px; font-family: "Space Mono", monospace; }

  .destruct {
    position: absolute; top: 12px; left: 12px; z-index: 5; transform: translateY(34px);
    font-family: "Space Mono", monospace; font-size: 10px; letter-spacing: .5px; font-weight: 700;
    color: var(--rose); background: rgba(255,92,122,0.1); border: 1px solid rgba(255,92,122,0.35);
    padding: 4px 9px; border-radius: 8px; backdrop-filter: blur(8px);
  }
  .destruct.expired { color: var(--muted); border-color: var(--line); background: rgba(7,8,15,0.6); }

  .stage-ctl { position: absolute; top: 12px; right: 12px; z-index: 5; display: flex; gap: 8px; }
  .stage-ctl .icon-btn { width: 34px; height: 34px; font-size: 13px; background: rgba(7,8,15,0.6); }

  .stage-tag {
    position: absolute; top: 12px; left: 12px; z-index: 5; font-family: "Space Mono", monospace;
    font-size: 10px; letter-spacing: .5px; color: var(--cyan); background: rgba(7,8,15,0.6);
    border: 1px solid var(--line); padding: 5px 9px; border-radius: 8px; backdrop-filter: blur(8px);
    max-width: 60%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }

  /* ---------- Composer / actions ---------- */
  .panel {
    margin-top: 16px; background: var(--panel); border: 1px solid var(--line);
    border-radius: var(--radius); padding: 16px; backdrop-filter: blur(14px);
  }
  .panel-title { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); font-family: "Space Mono", monospace; margin-bottom: 12px; }

  .drop-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .drop {
    border: 1px dashed var(--line); background: var(--void-2); border-radius: 13px;
    padding: 16px 12px; text-align: center; cursor: pointer; transition: border-color .2s, background .2s, transform .15s;
  }
  .drop:hover { border-color: var(--line-strong); transform: translateY(-1px); }
  .drop.filled { border-style: solid; border-color: var(--mint); background: rgba(77,255,195,0.05); }
  .drop input { display: none; }
  .drop .t { font-size: 13px; font-weight: 600; }
  .drop .s { font-size: 10.5px; color: var(--muted); font-family: "Space Mono", monospace; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  .btn {
    width: 100%; border: none; border-radius: 12px; padding: 13px; font-size: 14px; font-weight: 600;
    font-family: inherit; cursor: pointer; transition: transform .15s, box-shadow .2s, opacity .2s; letter-spacing: .2px;
  }
  .btn-primary { background: linear-gradient(100deg, var(--cyan), var(--violet)); color: #06070d; }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 10px 26px rgba(70,230,255,0.28); }
  .btn-ghost { background: var(--void-2); color: var(--text); border: 1px solid var(--line); }
  .btn-ghost:hover { border-color: var(--line-strong); }
  .btn:disabled { opacity: .4; cursor: not-allowed; transform: none; box-shadow: none; }
  .row-btns { display: flex; gap: 10px; margin-top: 12px; }

  .status { font-family: "Space Mono", monospace; font-size: 11.5px; color: var(--muted); margin-top: 12px; text-align: center; min-height: 16px; }
  .status.work { color: var(--cyan); }
  .status.ok { color: var(--mint); }
  .status.err { color: var(--rose); }

  .progress { margin-top: 12px; display: none; }
  .progress.show { display: block; }
  .bar { height: 8px; border-radius: 99px; background: var(--void-2); border: 1px solid var(--line); overflow: hidden; }
  .bar > i { display: block; height: 100%; width: 0%; background: linear-gradient(90deg, var(--cyan), var(--violet)); transition: width .25s var(--ease); }
  .bar.indet { position: relative; }
  .bar.indet > i { width: 35% !important; transition: none; animation: indet 1.15s ease-in-out infinite; }
  @keyframes indet { 0% { margin-left: -35%; } 100% { margin-left: 100%; } }
  .progress .meta { font-family: "Space Mono", monospace; font-size: 10.5px; color: var(--muted); margin-top: 7px; display: flex; justify-content: space-between; }

  /* ---------- Library grid ---------- */
  .lib-head { display: flex; align-items: baseline; justify-content: space-between; margin: 26px 4px 12px; }
  .lib-head h2 { font-size: 15px; font-weight: 600; letter-spacing: .3px; }
  .lib-head .count { font-family: "Space Mono", monospace; font-size: 11px; color: var(--muted); }

  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
  .card {
    background: var(--panel); border: 1px solid var(--line); border-radius: 15px; overflow: hidden;
    cursor: pointer; transition: border-color .2s, transform .15s, box-shadow .2s; position: relative;
    animation: rise .5s var(--ease) both;
  }
  @keyframes rise { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: none; } }
  .card:hover { border-color: var(--line-strong); transform: translateY(-3px); box-shadow: 0 14px 30px rgba(0,0,0,0.5); }
  .card.active { border-color: var(--cyan); box-shadow: 0 0 0 1px var(--cyan), 0 14px 30px rgba(70,230,255,0.2); }
  .thumb {
    aspect-ratio: 1; background: radial-gradient(circle at 50% 40%, rgba(70,230,255,0.10), rgba(5,6,13,0.9) 70%);
    display: grid; place-items: center; position: relative;
  }
  .thumb img { width: 100%; height: 100%; object-fit: cover; }
  .thumb .ph { font-size: 26px; opacity: .5; }
  .cache-dot {
    position: absolute; top: 8px; right: 8px; width: 9px; height: 9px; border-radius: 50%;
    background: var(--muted-2); box-shadow: 0 0 0 3px rgba(7,8,15,0.7);
  }
  .cache-dot.cached { background: var(--mint); box-shadow: 0 0 8px var(--mint), 0 0 0 3px rgba(7,8,15,0.7); }
  .card .info { padding: 10px 11px; }
  .card .name { font-size: 12.5px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .card .sub { font-family: "Space Mono", monospace; font-size: 10px; color: var(--muted); margin-top: 3px; display: flex; gap: 6px; }
  .card .badge-ios { color: var(--violet); }
  .card-actions { position: absolute; top: 8px; left: 8px; display: flex; gap: 6px; opacity: 0; transition: opacity .2s; }
  .card:hover .card-actions { opacity: 1; }
  .mini {
    border: 1px solid var(--line); background: rgba(7,8,15,0.8); color: var(--text);
    border-radius: 8px; font-size: 10px; padding: 4px 6px; cursor: pointer; font-family: "Space Mono", monospace;
  }
  .mini:hover { border-color: var(--line-strong); }
  .mini.danger:hover { border-color: var(--rose); color: var(--rose); }

  .empty-lib { text-align: center; color: var(--muted); font-family: "Space Mono", monospace; font-size: 12px; padding: 30px 0; }

  /* ---------- Modal (share passport) ---------- */
  .overlay {
    position: fixed; inset: 0; z-index: 1000; background: rgba(3,4,9,0.86); backdrop-filter: blur(16px);
    display: grid; place-items: center; padding: 20px; opacity: 0; pointer-events: none; transition: opacity .25s; overflow-y: auto;
  }
  .overlay.show { opacity: 1; pointer-events: auto; }
  .sheet { width: 100%; max-width: 380px; display: flex; flex-direction: column; gap: 14px; }

  .passport {
    border-radius: 22px; padding: 22px; position: relative; background: var(--panel-solid);
    border: 2px solid transparent;
    background-image: linear-gradient(var(--panel-solid), var(--panel-solid)), linear-gradient(135deg, var(--cyan), var(--violet), var(--cyan));
    background-origin: border-box; background-clip: padding-box, border-box;
    box-shadow: 0 20px 50px rgba(70,230,255,0.18);
  }
  .pp-head { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .pp-logo { width: 42px; height: 42px; border-radius: 11px; background: var(--void-2); border: 1px solid var(--line); display: grid; place-items: center; font-size: 20px; }
  .pp-title { font-weight: 700; letter-spacing: 1px; font-size: 18px; }
  .pp-sub { font-family: "Space Mono", monospace; font-size: 9px; letter-spacing: 1px; color: var(--muted); text-transform: uppercase; }
  .pp-preview { aspect-ratio: 16/10; border-radius: 14px; background: radial-gradient(circle at 50% 40%, rgba(70,230,255,0.12), rgba(5,6,13,0.95) 72%); display: grid; place-items: center; overflow: hidden; margin-bottom: 14px; }
  .pp-preview img { max-width: 100%; max-height: 100%; object-fit: contain; }
  .pp-grid-mini { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; width: 100%; height: 100%; padding: 8px; }
  .pp-grid-mini > div { border-radius: 8px; overflow: hidden; background: var(--void-2); }
  .pp-grid-mini img { width: 100%; height: 100%; object-fit: cover; }
  .pp-bottom { display: flex; justify-content: space-between; align-items: flex-end; gap: 12px; }
  .pp-meta { display: flex; flex-direction: column; gap: 6px; font-family: "Space Mono", monospace; font-size: 10px; }
  .pp-meta .k { color: var(--muted-2); }
  .pp-meta .v { color: var(--text); }
  #qrcode { width: 92px; height: 92px; background: #fff; padding: 6px; border-radius: 12px; display: grid; place-items: center; box-shadow: 0 0 18px rgba(70,230,255,0.3); }
  #qrcode img, #qrcode canvas { width: 100% !important; height: 100% !important; }

  .link-box { display: flex; gap: 8px; }
  .link-box input { flex: 1; background: var(--void-2); border: 1px solid var(--line); color: var(--text); border-radius: 10px; padding: 11px; font-family: "Space Mono", monospace; font-size: 11px; }

  .toast {
    position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%) translateY(20px);
    background: var(--panel-solid); border: 1px solid var(--line-strong); color: var(--text);
    padding: 11px 18px; border-radius: 12px; font-size: 13px; z-index: 2000; opacity: 0; transition: all .3s var(--ease);
    box-shadow: 0 12px 30px rgba(0,0,0,0.5); pointer-events: none;
  }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

  @media (max-width: 420px) { .drop-row { grid-template-columns: 1fr; } .wordmark { font-size: 22px; } }

  @media (prefers-reduced-motion: reduce) {
    .starfield, .grid-floor, .depth-glow, .wordmark, .stage-empty .ring { animation: none !important; }
    .scan.run { animation-duration: .01s; }
    .card { animation: none; }
  }
</style>
</head>
<body>
<div class="starfield"></div>

<div class="wrap">
  <header>
    <div class="brand">
      <div class="wordmark">HOLOVIEW</div>
      <div class="telemetry">
        <span class="mode" id="modeTag">STUDIO</span>
        <span>assets <b id="tCount">0</b></span>
        <span>cached <b id="tCached">0</b></span>
      </div>
    </div>
    <div class="hbtns">
      <button class="icon-btn" id="soundBtn" aria-pressed="true" title="Spatial sound on/off">♪</button>
      <button class="icon-btn" id="newBtn" title="New / Studio mode">＋</button>
      <button class="icon-btn" id="logoutBtn" title="Log out" style="display:none">⏻</button>
    </div>
  </header>

  <!-- Holo stage -->
  <div class="stage" id="stage">
    <div class="grid-floor"></div>
    <div class="depth-glow"></div>
    <span class="stage-tag" id="stageTag" style="display:none"></span>
    <span class="destruct" id="destruct" style="display:none"></span>
    <div class="stage-ctl">
      <button class="icon-btn" id="shareActiveBtn" title="Share (24h link)" style="display:none">↗</button>
      <button class="icon-btn" id="fsBtn" title="Fullscreen">⛶</button>
      <button class="icon-btn" id="ejectBtn" title="Clear stage" style="display:none">⏏</button>
    </div>
    <div class="stage-empty" id="stageEmpty">
      <div class="ring"></div>
      <h3>Holo-stage standby</h3>
      <p>add an asset or pick one from your library</p>
    </div>
    <model-viewer id="viewer" ar ar-modes="webxr scene-viewer quick-look"
      camera-controls touch-action="pan-y" shadow-intensity="1" exposure="1.05"
      autoplay animation-name="*" auto-rotate auto-rotate-delay="3000"
      interaction-prompt="none" style="display:none"></model-viewer>
    <div class="scan" id="scan"></div>
  </div>

  <!-- Composer (studio mode) -->
  <div class="panel" id="composer">
    <div class="panel-title">Add to library</div>
    <div class="drop-row">
      <label class="drop" id="glbDrop">
        <div class="t">Web / Android · .glb</div>
        <div class="s" id="glbName">tap to choose</div>
        <input type="file" id="glbInput" accept=".glb,model/gltf-binary" />
      </label>
      <label class="drop" id="usdzDrop">
        <div class="t">iOS AR · .usdz</div>
        <div class="s" id="usdzName">optional</div>
        <input type="file" id="usdzInput" accept=".usdz" />
      </label>
    </div>
    <div class="row-btns">
      <button class="btn btn-primary" id="addBtn" disabled>Add to library</button>
    </div>
    <div class="status" id="status">awaiting asset…</div>
    <div class="progress" id="upProgress">
      <div class="bar"><i id="upBar"></i></div>
      <div class="meta"><span id="upLabel">uploading</span><span id="upPct">0%</span></div>
    </div>
  </div>

  <!-- Recipient download panel (viewer mode) -->
  <div class="panel" id="recvPanel" style="display:none">
    <div class="panel-title">Shared library</div>
    <div class="status" id="recvStatus" style="text-align:left">checking cache…</div>
    <div class="row-btns">
      <button class="btn btn-primary" id="dlBtn">Download library to this device</button>
    </div>
    <div class="progress" id="dlProgress">
      <div class="bar"><i id="dlBar"></i></div>
      <div class="meta"><span id="dlLabel">0 / 0</span><span id="dlBytes">0 MB</span></div>
    </div>
  </div>

  <!-- Library -->
  <div class="lib-head">
    <h2 id="libTitle">Your library</h2>
    <span class="count" id="libCount">0 assets</span>
  </div>
  <div class="grid" id="grid"></div>
  <div class="empty-lib" id="emptyLib">no assets yet — add a .glb above to begin</div>

  <div class="row-btns" id="shareRow" style="margin-top:18px; display:none">
    <button class="btn btn-ghost" id="shareBtn">⛓ Share whole library (offline cache)</button>
  </div>
</div>

<!-- Owner login modal -->
<div class="overlay" id="loginOverlay">
  <div class="sheet" style="max-width:340px">
    <div class="passport" style="box-shadow:none">
      <div class="pp-head">
        <div class="pp-logo">🔒</div>
        <div><div class="pp-title">HOLOVIEW</div><div class="pp-sub">Owner access</div></div>
      </div>
      <div style="font-size:12px; color:var(--muted); margin:4px 0 14px; line-height:1.5;">
        Enter the owner passcode to upload and manage your library. Shared links open without login.
      </div>
      <input type="password" id="passcodeInput" placeholder="passcode" autocomplete="current-password"
        style="width:100%; background:var(--void-2); border:1px solid var(--line); color:var(--text); border-radius:10px; padding:12px; font-family:'Space Mono',monospace; font-size:13px;" />
      <div id="loginErr" class="status err" style="text-align:left; min-height:14px;"></div>
    </div>
    <button class="btn btn-primary" id="loginBtn">Enter</button>
  </div>
</div>

<!-- Share passport modal -->
<div class="overlay" id="overlay">
  <div class="sheet">
    <div class="passport" id="passport">
      <div class="pp-head">
        <div class="pp-logo">🛰</div>
        <div>
          <div class="pp-title">HOLOVIEW</div>
          <div class="pp-sub">Spatial library · WolfPupLabs</div>
        </div>
      </div>
      <div class="pp-preview" id="ppPreview"></div>
      <div class="pp-bottom">
        <div class="pp-meta">
          <div><span class="k">library</span> <span class="v" id="ppName">—</span></div>
          <div><span class="k">assets</span> <span class="v" id="ppCount">0</span></div>
          <div><span class="k">size</span> <span class="v" id="ppSize">—</span></div>
          <div id="ppExpRow" style="display:none"><span class="k">expires</span> <span class="v" id="ppCountdown" style="color:var(--rose);font-weight:700">24:00:00</span></div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
          <div style="font-family:'Space Mono',monospace; font-size:8px; color:var(--muted); letter-spacing:.5px; text-align:right;">SCAN TO<br>OPEN</div>
          <div id="qrcode"></div>
        </div>
      </div>
    </div>
    <div class="link-box">
      <input type="text" id="shareInput" readonly />
      <button class="btn btn-ghost" id="copyBtn" style="width:auto; padding:0 16px;">Copy</button>
    </div>
    <div class="row-btns">
      <button class="btn btn-ghost" id="saveCardBtn">Save card</button>
      <button class="btn btn-primary" id="closeModal">Done</button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script type="module">
import { upload } from 'https://esm.sh/@vercel/blob@2.5.0/client';

/* ============================ State ============================ */
const $ = (id) => document.getElementById(id);
const fmtMB = (b) => (b / 1048576).toFixed(1) + ' MB';
const DAY_MS = 24 * 60 * 60 * 1000;

function fmtCountdown(ms) {
  if (ms <= 0) return 'EXPIRED';
  const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000), s = Math.floor((ms % 60000) / 1000);
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

// One global ticker drives every visible countdown (stage badge + passport).
let activeExpiry = 0, passportExpiry = 0;
setInterval(() => {
  const now = Date.now();
  if (activeExpiry) {
    const left = activeExpiry - now;
    const el = $('destruct');
    el.textContent = left > 0 ? 'AUTO-DESTRUCT ' + fmtCountdown(left) : 'LINK EXPIRED';
    el.classList.toggle('expired', left <= 0);
  }
  if (passportExpiry && $('overlay').classList.contains('show')) {
    const left = passportExpiry - now;
    $('ppCountdown').textContent = fmtCountdown(left);
  }
}, 1000);

const state = {
  mode: 'studio',          // 'studio' | 'viewer'
  authed: false,
  passcodeConfigured: true,
  library: [],             // [{id,name,size,glb,usdz,thumb,expiresAt}]
  libName: 'My library',
  activeId: null,
  pendingGlb: null,        // File
  pendingUsdz: null,       // File
  sound: true,
};

/* ============================ Auth ============================ */
async function fetchAuth() {
  try {
    const r = await fetch('/api/auth', { cache: 'no-store' });
    const j = await r.json();
    state.authed = !!j.authed;
    state.passcodeConfigured = j.passcodeConfigured !== false;
  } catch { state.authed = false; }
  return state.authed;
}
async function doLogin(passcode) {
  const r = await fetch('/api/auth', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ action: 'login', passcode }),
  });
  const j = await r.json().catch(() => ({}));
  if (r.ok && j.authed) { state.authed = true; return { ok: true }; }
  return { ok: false, error: j.error || 'Login failed' };
}
async function doLogout() {
  await fetch('/api/auth', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'logout' }) }).catch(() => {});
  location.href = location.origin + location.pathname;
}

/* ============================ Server library ============================ */
async function loadServerLibrary() {
  try {
    const r = await fetch('/api/library', { cache: 'no-store' });
    if (!r.ok) { state.library = []; return; }
    const data = await r.json();
    state.libName = data.name || 'My library';
    state.library = (data.assets || []).map((a) => ({ ...a, usdz: a.usdz || null }));
  } catch { state.library = []; }
}
let saveT;
function saveServerLibrary() {
  clearTimeout(saveT);
  saveT = setTimeout(async () => {
    try {
      await fetch('/api/library', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: state.libName, assets: state.library }),
      });
    } catch (e) { console.error('[holoview] library save failed', e); }
  }, 500);
}

/* ============================ Service worker ============================ */
let swReady = null;
function initSW() {
  if (!('serviceWorker' in navigator)) return;
  swReady = navigator.serviceWorker.register('sw.js').then(() => navigator.serviceWorker.ready).catch(() => null);
}
function swPost(msg) {
  if (navigator.serviceWorker && navigator.serviceWorker.controller)
    navigator.serviceWorker.controller.postMessage(msg);
}
function precache(urls, onProgress) {
  return new Promise(async (resolve) => {
    await swReady;
    if (!navigator.serviceWorker.controller) { resolve({ ok: false }); return; }
    const handler = (e) => {
      const d = e.data || {};
      if (d.type === 'PRECACHE_PROGRESS' && onProgress) onProgress(d);
      if (d.type === 'PRECACHE_DONE') { navigator.serviceWorker.removeEventListener('message', handler); resolve({ ok: true, ...d }); }
    };
    navigator.serviceWorker.addEventListener('message', handler);
    swPost({ type: 'PRECACHE_LIBRARY', urls });
  });
}
function cacheStatus(urls) {
  return new Promise(async (resolve) => {
    await swReady;
    if (!navigator.serviceWorker.controller) { resolve({}); return; }
    const handler = (e) => {
      if (e.data && e.data.type === 'CACHE_STATUS_RESULT') {
        navigator.serviceWorker.removeEventListener('message', handler);
        resolve(e.data.cached || {});
      }
    };
    navigator.serviceWorker.addEventListener('message', handler);
    swPost({ type: 'CACHE_STATUS', urls });
  });
}

/* ============================ Spatial audio ============================ */
let actx = null;
function audio() {
  if (!state.sound) return null;
  if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch { return null; } }
  if (actx.state === 'suspended') actx.resume();
  return actx;
}
function tone({ f = 440, to = null, dur = 0.18, type = 'sine', pan = 0, gain = 0.12 }) {
  const ac = audio(); if (!ac) return;
  const o = ac.createOscillator(), g = ac.createGain(), p = ac.createStereoPanner ? ac.createStereoPanner() : null;
  o.type = type; o.frequency.setValueAtTime(f, ac.currentTime);
  if (to) o.frequency.exponentialRampToValueAtTime(to, ac.currentTime + dur);
  g.gain.setValueAtTime(0.0001, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(gain, ac.currentTime + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  o.connect(g); if (p) { p.pan.value = Math.max(-1, Math.min(1, pan)); g.connect(p); p.connect(ac.destination); } else g.connect(ac.destination);
  o.start(); o.stop(ac.currentTime + dur + 0.02);
}
const sfx = {
  blip: (pan = 0) => tone({ f: 660, to: 880, dur: 0.09, type: 'triangle', pan, gain: 0.06 }),
  whoosh: () => { tone({ f: 180, to: 900, dur: 0.5, type: 'sawtooth', pan: -0.6, gain: 0.05 }); setTimeout(() => tone({ f: 240, to: 1200, dur: 0.45, type: 'sine', pan: 0.6, gain: 0.05 }), 70); },
  ding: () => { tone({ f: 880, dur: 0.5, type: 'sine', pan: -0.3, gain: 0.08 }); setTimeout(() => tone({ f: 1320, dur: 0.6, type: 'sine', pan: 0.3, gain: 0.06 }), 90); },
  tick: (pan = 0) => tone({ f: 520, dur: 0.05, type: 'square', pan, gain: 0.03 }),
};

/* ============================ Toast ============================ */
let toastT;
function toast(msg) {
  const el = $('toast'); el.textContent = msg; el.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2400);
}

/* ============================ Viewer ============================ */
const viewer = $('viewer');
function loadAsset(item) {
  state.activeId = item.id;
  $('stageEmpty').style.display = 'none';
  viewer.style.display = 'block';
  viewer.src = item.glb;
  if (item.usdz) viewer.setAttribute('ios-src', item.usdz); else viewer.removeAttribute('ios-src');
  $('stageTag').style.display = 'block';
  $('stageTag').textContent = '◈ ' + item.name;
  $('ejectBtn').style.display = 'grid';
  // 24h auto-destruct badge + share button
  if (item.expiresAt) {
    activeExpiry = item.expiresAt;
    $('destruct').style.display = 'block';
  } else { activeExpiry = 0; $('destruct').style.display = 'none'; }
  $('shareActiveBtn').style.display = 'grid';
  runScan();
  document.querySelectorAll('.card').forEach((c) => c.classList.toggle('active', c.dataset.id === item.id));
}
function ejectStage() {
  viewer.style.display = 'none'; viewer.removeAttribute('src');
  $('stageEmpty').style.display = 'grid'; $('stageTag').style.display = 'none'; $('ejectBtn').style.display = 'none';
  $('destruct').style.display = 'none'; $('shareActiveBtn').style.display = 'none'; activeExpiry = 0;
  state.activeId = null;
  document.querySelectorAll('.card').forEach((c) => c.classList.remove('active'));
}
function runScan() {
  const s = $('scan'); s.classList.remove('run'); void s.offsetWidth; s.classList.add('run'); sfx.whoosh();
}
viewer.addEventListener('load', () => { runScan(); });

/* parallax tilt on pointer */
const stage = $('stage');
let rmotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
stage.addEventListener('pointermove', (e) => {
  if (rmotion) return;
  const r = stage.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
  stage.querySelector('.grid-floor').style.transform = `translateX(-50%) rotateX(74deg) translateY(${y * 14}px)`;
  stage.querySelector('.depth-glow').style.transform = `translate(${x * 18}px, ${y * 18}px)`;
});

/* fullscreen (hybrid for iOS) */
$('fsBtn').addEventListener('click', () => {
  sfx.tick();
  if (stage.classList.contains('pseudo-fullscreen')) { stage.classList.remove('pseudo-fullscreen'); return; }
  if (document.fullscreenElement) { document.exitFullscreen(); return; }
  if (stage.requestFullscreen) stage.requestFullscreen().catch(() => stage.classList.add('pseudo-fullscreen'));
  else stage.classList.add('pseudo-fullscreen');
});
$('ejectBtn').addEventListener('click', () => { sfx.tick(); ejectStage(); });

/* ============================ Library UI ============================ */
async function refreshTelemetry() {
  $('tCount').textContent = state.library.length;
  $('libCount').textContent = state.library.length + (state.library.length === 1 ? ' asset' : ' assets');
  const urls = state.library.flatMap((a) => [a.glb, a.usdz].filter(Boolean));
  const cached = await cacheStatus(urls);
  const n = Object.values(cached).filter(Boolean).length;
  $('tCached').textContent = n;
  document.querySelectorAll('.card').forEach((c) => {
    const it = state.library.find((a) => a.id === c.dataset.id);
    if (!it) return;
    const isC = cached[it.glb] && (!it.usdz || cached[it.usdz]);
    c.querySelector('.cache-dot').classList.toggle('cached', !!isC);
  });
}
function renderLibrary() {
  const grid = $('grid');
  grid.innerHTML = '';
  $('emptyLib').style.display = state.library.length ? 'none' : 'block';
  $('shareRow').style.display = (state.library.length && state.mode === 'studio') ? 'flex' : 'none';

  state.library.forEach((a, i) => {
    const card = document.createElement('div');
    card.className = 'card'; card.dataset.id = a.id; card.style.animationDelay = (i * 45) + 'ms';
    card.innerHTML = `
      <div class="thumb">
        <span class="cache-dot"></span>
        ${a.thumb ? `<img src="${a.thumb}" alt="">` : `<span class="ph">🧊</span>`}
      </div>
      <div class="info">
        <div class="name">${escapeHtml(a.name)}</div>
        <div class="sub"><span>${a.size ? fmtMB(a.size) : '—'}</span>${a.usdz ? '<span class="badge-ios">+iOS</span>' : ''}</div>
      </div>
      ${state.mode === 'studio' ? `<div class="card-actions"><button class="mini" data-share="${a.id}">↗ 24h</button><button class="mini danger" data-del="${a.id}">del</button></div>` : ''}`;
    card.addEventListener('click', (e) => {
      if (e.target.dataset.del || e.target.dataset.share) return;
      const r = card.getBoundingClientRect();
      sfx.blip((r.left + r.width / 2) / window.innerWidth * 2 - 1);
      loadAsset(a);
    });
    const del = card.querySelector('[data-del]');
    if (del) del.addEventListener('click', async (e) => { e.stopPropagation(); await removeAsset(a.id); });
    const sh = card.querySelector('[data-share]');
    if (sh) sh.addEventListener('click', (e) => { e.stopPropagation(); loadAsset(a); shareActiveAsset(); });
    grid.appendChild(card);
  });
  refreshTelemetry();
}
function escapeHtml(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

async function removeAsset(id) {
  state.library = state.library.filter((a) => a.id !== id);
  saveServerLibrary();
  if (state.activeId === id) ejectStage();
  renderLibrary(); toast('Asset removed'); sfx.tick();
}

/* ============================ Upload (studio) ============================ */
function setStatus(msg, kind = '') { const s = $('status'); s.textContent = msg; s.className = 'status' + (kind ? ' ' + kind : ''); }

$('glbInput').addEventListener('change', (e) => {
  const f = e.target.files[0]; if (!f) return;
  state.pendingGlb = f;
  $('glbName').textContent = f.name; $('glbDrop').classList.add('filled');
  $('addBtn').disabled = false; setStatus('ready — ' + fmtMB(f.size)); sfx.tick();
  // live preview from local file
  const url = URL.createObjectURL(f);
  $('stageEmpty').style.display = 'none'; viewer.style.display = 'block'; viewer.src = url;
  $('stageTag').style.display = 'block'; $('stageTag').textContent = '◈ ' + f.name + ' (preview)'; $('ejectBtn').style.display = 'grid';
});
$('usdzInput').addEventListener('change', (e) => {
  const f = e.target.files[0]; if (!f) return;
  state.pendingUsdz = f; $('usdzName').textContent = f.name; $('usdzDrop').classList.add('filled'); sfx.tick();
});

async function uploadFile(file, onProgress) {
  return upload(file.name, file, {
    access: 'public',
    handleUploadUrl: '/api/upload',
    multipart: file.size > 8 * 1024 * 1024, // multipart only for big files; single PUT is more reliable on Safari
    onUploadProgress: onProgress,
  });
}

// Quick check that the upload route + token are actually live before we try.
async function uploadPreflight() {
  try {
    const r = await fetch('/api/upload', { method: 'GET' });
    const j = await r.json().catch(() => ({}));
    if (j && j.tokenConfigured === false) return { ok: false, reason: 'no-token' };
    if (!r.ok && r.status === 404) return { ok: false, reason: 'no-route' };
    return { ok: true };
  } catch { return { ok: true }; } // network hiccup — let the real upload surface it
}

async function captureThumb() {
  try {
    await viewer.updateComplete;
    const url = viewer.toDataURL('image/jpeg', 0.5);
    // downscale to keep manifests small
    return await downscale(url, 320);
  } catch { return null; }
}
function downscale(dataUrl, max) {
  return new Promise((res) => {
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      res(c.toDataURL('image/jpeg', 0.55));
    };
    img.onerror = () => res(null);
    img.src = dataUrl;
  });
}

$('addBtn').addEventListener('click', async () => {
  if (!state.pendingGlb) return;
  if (!state.authed) { showLogin('Please log in to upload.'); return; }

  // Preflight: catch the common "no token / no route" case with a clear message.
  const pre = await uploadPreflight();
  if (!pre.ok) {
    setStatus(pre.reason === 'no-token'
      ? 'set BLOB_READ_WRITE_TOKEN in Vercel and redeploy (see /api/upload)'
      : 'deploy the /api/upload route (api folder)', 'err');
    return;
  }

  $('addBtn').disabled = true; $('upProgress').classList.add('show');
  const bar = $('upBar').parentElement;
  let gotProgress = false;
  const indet = (on) => bar.classList.toggle('indet', on);
  const setBar = (p) => {
    if (isNaN(p)) return;
    gotProgress = true; indet(false);
    $('upBar').style.width = p + '%'; $('upPct').textContent = Math.round(p) + '%';
  };
  // Safari often emits no upload-progress events — show a moving bar + elapsed time
  // so it never looks frozen at 0%.
  indet(true);
  const t0 = Date.now();
  const elapsed = setInterval(() => { if (!gotProgress) $('upPct').textContent = ((Date.now() - t0) / 1000 | 0) + 's'; }, 1000);

  try {
    setStatus('uploading model…', 'work'); $('upLabel').textContent = 'glb';
    const glbBlob = await uploadFile(state.pendingGlb, (e) => setBar((e.percentage || 0) * (state.pendingUsdz ? 0.6 : 0.9)));
    let usdzUrl = null;
    if (state.pendingUsdz) {
      $('upLabel').textContent = 'usdz'; indet(true); gotProgress = false;
      const u = await uploadFile(state.pendingUsdz, (e) => setBar(60 + (e.percentage || 0) * 0.3));
      usdzUrl = u.url;
    }
    indet(false); setBar(95);
    const thumb = await captureThumb();
    setBar(100);
    const item = {
      id: 'a_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: state.pendingGlb.name.replace(/\.[^.]+$/, ''),
      size: state.pendingGlb.size + (state.pendingUsdz ? state.pendingUsdz.size : 0),
      glb: glbBlob.url, usdz: usdzUrl, thumb, createdAt: Date.now(), expiresAt: Date.now() + DAY_MS,
    };
    saveServerLibrary();
    state.library.unshift(item);
    precache([item.glb, item.usdz].filter(Boolean)); // warm cache for zero-network replays
    renderLibrary(); loadAsset(item);
    setStatus('added to library ✓  ·  tap ↗ to share (24h)', 'ok'); sfx.ding();
    resetComposer();
  } catch (err) {
    console.error('[holoview upload]', err);
    const s = String(err && (err.message || err));
    let msg = 'upload failed: ' + s;
    if (/client token|token|401|unauthor|login/i.test(s)) { msg = 'session expired — log in again'; state.authed = false; showLogin('Session expired. Log in again.'); }
    else if (/Failed to fetch|NetworkError|load failed/i.test(s)) msg = 'network/CORS error reaching blob store — check connection & retry';
    else if (/413|too large|size/i.test(s)) msg = 'file too large (250 MB max per asset)';
    setStatus(msg, 'err'); $('addBtn').disabled = false;
  } finally {
    clearInterval(elapsed); indet(false);
    setTimeout(() => $('upProgress').classList.remove('show'), 1400);
  }
});
function resetComposer() {
  state.pendingGlb = null; state.pendingUsdz = null;
  $('glbName').textContent = 'tap to choose'; $('usdzName').textContent = 'optional';
  $('glbDrop').classList.remove('filled'); $('usdzDrop').classList.remove('filled');
  $('glbInput').value = ''; $('usdzInput').value = ''; $('addBtn').disabled = true;
}

/* ============================ Share: single asset (24h) ============================ */
async function shareActiveAsset() {
  const item = state.library.find((a) => a.id === state.activeId);
  if (!item) return;
  // (Re)start the 24h clock at share time so recipients always get a fresh window.
  item.expiresAt = Date.now() + DAY_MS;
  activeExpiry = item.expiresAt;
  saveServerLibrary();

  const base = location.origin + location.pathname;
  let url = `${base}?model=${encodeURIComponent(item.glb)}&name=${encodeURIComponent(item.name)}&size=${item.size || 0}&exp=${item.expiresAt}`;
  if (item.usdz) url += `&ios=${encodeURIComponent(item.usdz)}`;

  openPassport({
    name: item.name,
    countLabel: 'single asset',
    count: 1,
    size: item.size || 0,
    thumbs: item.thumb ? [item.thumb] : [],
    url, exp: item.expiresAt,
  });
  setStatus('24h link ready ✓', 'ok'); sfx.ding();
}
$('shareActiveBtn').addEventListener('click', shareActiveAsset);

/* ============================ Share library (offline cache) ============================ */
async function shareLibrary() {
  if (!state.library.length) return;
  setStatus('packaging manifest…', 'work');
  const manifest = {
    v: 1, name: state.libName && state.libName !== 'My library' ? state.libName : 'HOLOVIEW Library',
    createdAt: Date.now(),
    assets: state.library.map((a) => ({ id: a.id, name: a.name, size: a.size, glb: a.glb, usdz: a.usdz || null, thumb: a.thumb || null })),
  };
  try {
    const blob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
    const file = new File([blob], `library-${Date.now()}.json`, { type: 'application/json' });
    const res = await uploadFile(file);
    const base = location.origin + location.pathname;
    const shareUrl = `${base}?lib=${encodeURIComponent(res.url)}`;
    openPassport({
      name: manifest.name,
      countLabel: 'assets',
      count: manifest.assets.length,
      size: manifest.assets.reduce((s, a) => s + (a.size || 0), 0),
      thumbs: manifest.assets.filter((a) => a.thumb).map((a) => a.thumb).slice(0, 6),
      url: shareUrl, exp: 0,
    });
    setStatus('library shared ✓', 'ok'); sfx.ding();
  } catch (err) {
    setStatus('share failed — needs /api/upload + token', 'err');
  }
}

/* ============================ Passport modal ============================ */
function openPassport({ name, countLabel, count, size, thumbs, url, exp }) {
  $('ppName').textContent = name;
  $('ppCount').textContent = count + (countLabel === 'single asset' ? ' (single)' : '');
  $('ppSize').textContent = fmtMB(size);
  // expiry / countdown
  if (exp) { passportExpiry = exp; $('ppExpRow').style.display = 'block'; $('ppCountdown').textContent = fmtCountdown(exp - Date.now()); }
  else { passportExpiry = 0; $('ppExpRow').style.display = 'none'; }
  // preview collage
  const prev = $('ppPreview'); prev.innerHTML = '';
  if (thumbs && thumbs.length) {
    const g = document.createElement('div'); g.className = 'pp-grid-mini';
    thumbs.forEach((t) => { const d = document.createElement('div'); d.innerHTML = `<img src="${t}">`; g.appendChild(d); });
    prev.appendChild(g);
  } else { prev.innerHTML = '<span style="color:var(--muted);font-size:11px">Spatial asset</span>'; }

  $('shareInput').value = url;
  const qr = $('qrcode'); qr.innerHTML = '';
  new QRCode(qr, { text: url, width: 200, height: 200, colorDark: '#000', colorLight: '#fff', correctLevel: QRCode.CorrectLevel.M });
  $('overlay').classList.add('show');
}
$('closeModal').addEventListener('click', () => { $('overlay').classList.remove('show'); sfx.tick(); });
$('overlay').addEventListener('click', (e) => { if (e.target === $('overlay')) $('overlay').classList.remove('show'); });
$('copyBtn').addEventListener('click', async () => {
  const v = $('shareInput').value;
  try { await navigator.clipboard.writeText(v); } catch { $('shareInput').select(); document.execCommand('copy'); }
  toast('Link copied'); sfx.blip();
});
$('saveCardBtn').addEventListener('click', () => {
  html2canvas($('passport'), { backgroundColor: null, scale: 2, useCORS: true })
    .then((c) => { const a = document.createElement('a'); a.download = 'HOLOVIEW_card.png'; a.href = c.toDataURL('image/png'); a.click(); toast('Card saved'); })
    .catch(() => toast('Could not save card'));
});
$('shareBtn').addEventListener('click', shareLibrary);

/* ============================ Recipient (viewer mode) ============================ */
async function enterViewerMode(manifestUrl) {
  state.mode = 'viewer';
  $('modeTag').textContent = 'VIEWER';
  $('composer').style.display = 'none';
  $('recvPanel').style.display = 'block';
  $('recvStatus').textContent = 'loading manifest…';
  try {
    const res = await fetch(manifestUrl, { mode: 'cors' });
    const manifest = await res.json();
    state.libName = manifest.name || 'Shared library';
    $('libTitle').textContent = manifest.name || 'Shared library';
    state.library = manifest.assets.map((a) => ({ ...a, usdz: a.usdz || null }));
    renderLibrary();
    const urls = state.library.flatMap((a) => [a.glb, a.usdz].filter(Boolean));
    const cached = await cacheStatus(urls);
    const have = Object.values(cached).filter(Boolean).length;
    if (have === urls.length && urls.length) {
      $('recvStatus').textContent = 'all assets cached — playing from device, zero network.';
      $('dlBtn').textContent = 'Re-download / repair cache';
    } else {
      $('recvStatus').textContent = `${state.library.length} assets ready. Download once, then everything loads from cache offline.`;
    }
    if (state.library[0]) loadAsset(state.library[0]);
  } catch (err) {
    $('recvStatus').textContent = 'could not load this library link.';
  }
}
$('dlBtn').addEventListener('click', async () => {
  const urls = state.library.flatMap((a) => [a.glb, a.usdz].filter(Boolean));
  if (!urls.length) return;
  $('dlBtn').disabled = true; $('dlProgress').classList.add('show');
  const totalCount = urls.length;
  await precache(urls, (p) => {
    $('dlBar').style.width = (p.loaded / p.total * 100) + '%';
    $('dlLabel').textContent = `${p.loaded} / ${p.total}`;
    $('dlBytes').textContent = fmtMB(p.bytes || 0);
  });
  $('dlBar').style.width = '100%'; $('dlLabel').textContent = `${totalCount} / ${totalCount}`;
  $('recvStatus').textContent = 'done — assets live on this device. No more downloads on replay.';
  $('dlBtn').disabled = false; $('dlBtn').textContent = 'Re-download / repair cache';
  sfx.ding(); toast('Library cached for offline'); refreshTelemetry();
});

/* shared single-model links (24h): ?model=...&ios=...&name=...&size=...&exp=... */
async function legacySingle(p) {
  state.mode = 'viewer'; $('modeTag').textContent = 'VIEWER'; $('composer').style.display = 'none'; $('recvPanel').style.display = 'block';
  const exp = parseInt(p.get('exp') || '0', 10) || 0;
  const item = {
    id: 'shared', name: p.get('name') || 'Shared model',
    size: parseInt(p.get('size') || '0', 10) || 0,
    glb: p.get('model'), usdz: p.get('ios') || null, thumb: null,
    expiresAt: exp,
  };
  state.library = [item]; $('libTitle').textContent = 'Shared model'; renderLibrary();

  if (exp && Date.now() > exp) {
    // expired link — same behavior as the old auto-destruct
    $('recvStatus').textContent = 'This share link has expired (24h limit reached).';
    $('dlBtn').disabled = true;
    $('stageEmpty').style.display = 'grid'; $('stageEmpty').querySelector('h3').textContent = 'Link expired';
    $('stageEmpty').querySelector('p').textContent = 'ask the sender for a fresh 24h link';
    return;
  }
  loadAsset(item);
  $('recvStatus').textContent = exp
    ? 'Valid for 24h. Download to cache so replays cost zero network.'
    : 'Download to cache so replays cost zero network.';
}

/* ============================ Controls ============================ */
$('soundBtn').addEventListener('click', () => {
  state.sound = !state.sound;
  $('soundBtn').setAttribute('aria-pressed', String(state.sound));
  $('soundBtn').textContent = state.sound ? '♪' : '♪̶';
  if (state.sound) sfx.blip();
  toast(state.sound ? 'Spatial sound on' : 'Sound muted');
});
$('newBtn').addEventListener('click', () => {
  if (state.mode === 'viewer') { location.href = location.origin + location.pathname; return; }
  resetComposer(); ejectStage(); window.scrollTo({ top: 0, behavior: 'smooth' });
});
$('logoutBtn').addEventListener('click', doLogout);

/* ============================ Login ============================ */
function showLogin(msg) {
  $('loginOverlay').classList.add('show');
  if (msg) $('loginErr').textContent = msg;
  setTimeout(() => $('passcodeInput').focus(), 100);
}
function hideLogin() { $('loginOverlay').classList.remove('show'); }
async function attemptLogin() {
  const pass = $('passcodeInput').value;
  if (!pass) return;
  $('loginBtn').disabled = true; $('loginErr').textContent = '';
  const r = await doLogin(pass);
  $('loginBtn').disabled = false;
  if (r.ok) { sfx.ding(); hideLogin(); await startStudio(); }
  else { $('loginErr').textContent = r.error; sfx.tick(); $('passcodeInput').select(); }
}
$('loginBtn').addEventListener('click', attemptLogin);
$('passcodeInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') attemptLogin(); });

async function startStudio() {
  state.mode = 'studio'; $('modeTag').textContent = 'STUDIO';
  $('composer').style.display = 'block'; $('recvPanel').style.display = 'none';
  $('logoutBtn').style.display = 'grid';
  $('libTitle').textContent = state.libName;
  await loadServerLibrary();
  $('libTitle').textContent = state.libName;
  renderLibrary();
  // warm cache for the owner's own assets so re-views are instant/offline
  const urls = state.library.flatMap((a) => [a.glb, a.usdz].filter(Boolean));
  if (urls.length) precache(urls);
}

/* ============================ Boot ============================ */
(async function boot() {
  initSW();
  const p = new URLSearchParams(location.search);

  // Visitors opening a share link never need to log in.
  if (p.get('lib')) { await enterViewerMode(p.get('lib')); }
  else if (p.get('model')) { await legacySingle(p); }
  else {
    // Bare app = owner studio, behind login.
    await fetchAuth();
    if (state.authed) { await startStudio(); }
    else {
      $('composer').style.display = 'none';
      showLogin(state.passcodeConfigured ? '' : 'Set OWNER_PASSCODE in Vercel, then redeploy.');
    }
  }

  // resume audio on first gesture (autoplay policy)
  const unlock = () => { audio(); window.removeEventListener('pointerdown', unlock); };
  window.addEventListener('pointerdown', unlock, { once: true });
})();
</script>
</body>
</html>
