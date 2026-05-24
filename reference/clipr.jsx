import { useState, useEffect, useRef } from "react";

const orange = "#f97316";
const green = "#22c55e";
const bg = "#07080d";
const surface = "#0d1021";
const s2 = "#131729";
const cream = "#eceaf5";
const muted = "rgba(236,234,245,0.4)";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${bg}; color: ${cream}; font-family: 'DM Sans', system-ui, sans-serif; overflow-x: hidden; }
  input[type=range] { -webkit-appearance: none; width: 100%; height: 4px; border-radius: 2px; outline: none; cursor: pointer; }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; cursor: pointer; }
  .orange-thumb::-webkit-slider-thumb { background: ${orange}; box-shadow: 0 0 10px rgba(249,115,22,.5); }
  .green-thumb::-webkit-slider-thumb { background: ${green}; box-shadow: 0 0 10px rgba(34,197,94,.4); }
  @keyframes drift { from { transform: translate(0,0) scale(1); } to { transform: translate(50px,35px) scale(1.1); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
  @keyframes slideIn { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: none; } }
  @keyframes growBar { from { width: 0; } to { width: 100%; } }
  @keyframes fillPb { 0% { width: 0%; } 65% { width: 100%; } 100% { width: 100%; } }
  @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.3; transform:scale(.7); } }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .fade-up { animation: fadeUp .6s ease both; }
  .pulse-dot { animation: pulse 1.4s ease infinite; }
  .hero-side-mock { display: block; }
  @media (max-width: 900px) { .hero-side-mock { display: none !important; } }
  @media (max-width: 768px) {
    .grid-2col { grid-template-columns: 1fr !important; }
    .grid-3col { grid-template-columns: 1fr !important; }
    .grid-dash { grid-template-columns: 1fr !important; }
    .terminal-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .niche-pills { gap: 6px !important; }
    .niche-pills button { font-size: 12px !important; padding: 7px 13px !important; }
    .vs-table-hide { display: none !important; }
    .mobile-stack { flex-direction: column !important; }
    nav { padding: 14px 20px !important; }
    h2 { word-break: break-word; }
  }
`;

function fmtN(n) {
  if (n >= 10000000) return (n / 10000000).toFixed(1) + "Cr";
  if (n >= 100000) return (n / 100000).toFixed(1) + "L";
  if (n >= 1000) return Math.round(n / 1000) + "k";
  return "" + n;
}

// ── HERO MOCK SCREENS ──
function DashboardMock() {
  return (
    <div style={{ background: surface, border: `1px solid rgba(255,255,255,.07)`, borderRadius: 14, overflow: "hidden", width: 270 }}>
      <div style={{ background: s2, padding: "10px 14px", borderBottom: `1px solid rgba(255,255,255,.07)`, display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "monospace", color: muted }}>
        <span>campaign_dashboard</span><span style={{ color: green, fontWeight: 700 }}>● LIVE</span>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 10, color: muted, marginBottom: 4 }}>Total Reach · #47</div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: orange, lineHeight: 1 }}>4,82,310</div>
        <div style={{ fontSize: 10, color: green, marginBottom: 12 }}>↑ 12.4% from yesterday</div>
        {[78, 54, 91].map((w, i) => (
          <div key={i} style={{ height: 6, background: s2, borderRadius: 3, overflow: "hidden", marginBottom: 7 }}>
            <div style={{ height: "100%", borderRadius: 3, background: `linear-gradient(90deg,${orange},#fb923c)`, animation: `growBar 1.6s ${i * 0.2}s ease forwards`, width: 0 }} />
          </div>
        ))}
        <svg viewBox="0 0 260 70" style={{ width: "100%", height: 70, marginTop: 10 }}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(249,115,22,.3)" /><stop offset="100%" stopColor="rgba(249,115,22,0)" />
            </linearGradient>
          </defs>
          <path d="M0,60 C25,55 50,40 80,30 C110,20 130,38 155,18 C180,0 210,6 240,2 L260,1 L260,70 L0,70Z" fill="url(#g1)" />
          <path d="M0,60 C25,55 50,40 80,30 C110,20 130,38 155,18 C180,0 210,6 240,2 L260,1" fill="none" stroke={orange} strokeWidth="1.8" />
        </svg>
      </div>
    </div>
  );
}

function MobileMock() {
  const notifs = [
    { delay: "0s", txt: "Reel #3 · 42k views verified", amt: "+₹336 credited", color: green },
    { delay: ".4s", txt: "Short #7 · 1.1M views verified", amt: "+₹1,870 credited", color: green },
    { delay: ".8s", txt: "UPI payout · processing", amt: "₹4,210 → Bank", color: orange },
  ];
  return (
    <div style={{ background: surface, border: `1px solid rgba(255,255,255,.07)`, borderRadius: 14, overflow: "hidden", width: 270 }}>
      <div style={{ background: s2, padding: "10px 14px", borderBottom: `1px solid rgba(255,255,255,.07)`, display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "monospace", color: muted }}>
        <span>clipr · earnings</span><span style={{ color: green, fontFamily: "monospace" }}>₹4,210</span>
      </div>
      <div style={{ padding: 16 }}>
        {notifs.map((n, i) => (
          <div key={i} style={{ background: s2, border: `1px solid rgba(255,255,255,.07)`, borderRadius: 10, padding: "9px 11px", marginBottom: 8, display: "flex", alignItems: "center", gap: 10, animation: `slideIn .4s ${n.delay} ease both` }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: n.color === green ? "rgba(34,197,94,.1)" : "rgba(249,115,22,.1)", border: `1px solid ${n.color === green ? "rgba(34,197,94,.2)" : "rgba(249,115,22,.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d={n.color === green ? "M2 6l2.5 2.5 5.5-5" : "M6 2v4l2.5 1.5"} stroke={n.color} strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
            <div>
              <div style={{ fontSize: 11, color: muted }}>{n.txt}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: n.color, fontFamily: "'Syne',sans-serif" }}>{n.amt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CALCULATOR ──
function CalcSection({ brandBudget, setBrandBudget, clipViews, setClipViews }) {
  const bPct = ((brandBudget - 500) / (200000 - 500)) * 100;
  const cPct = ((clipViews - 10000) / (10000000 - 10000)) * 100;

  const views = Math.round(brandBudget / 20 * 1000);
  const channels = Math.max(3, Math.round(views / 25000));
  const botBlocked = Math.round(views * 0.04);
  const paidViews = views - botBlocked;

  const rate = clipViews >= 5000000 ? 8 : clipViews >= 1000000 ? 7 : clipViews >= 500000 ? 6.5 : clipViews >= 100000 ? 6 : 5;
  const earn = Math.round(clipViews / 1000 * rate);
  const weekly = Math.round(earn / 4);
  const perDay = Math.round(earn / 30);

  const Row = ({ label, value, accent, sub }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid rgba(255,255,255,.05)` }}>
      <div>
        <div style={{ fontSize: 13, color: muted }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: "rgba(236,234,245,.2)", marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: accent, letterSpacing: -0.5 }}>{value}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>

      {/* BRAND CARD */}
      <div style={{ flex: 1, minWidth: 290, background: surface, border: `1px solid rgba(255,255,255,.07)`, borderRadius: 22, overflow: "hidden" }}>
        <div style={{ height: 2, background: `linear-gradient(90deg,${orange},transparent)` }} />
        <div style={{ padding: "28px 28px 0" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(249,115,22,.1)", border: "1px solid rgba(249,115,22,.2)", borderRadius: 99, padding: "5px 12px", fontSize: 11, fontWeight: 600, color: orange, marginBottom: 16 }}>
            📢 For Creators &amp; Brands
          </div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700, lineHeight: 1.3, marginBottom: 6 }}>
            If I spend&nbsp;
            <span style={{ color: orange }}>₹{Number(brandBudget).toLocaleString("en-IN")}</span>
            &nbsp;on a campaign…
          </div>
          <div style={{ fontSize: 13, color: muted, marginBottom: 20, lineHeight: 1.6 }}>
            Drag the slider to set your budget ↓
          </div>
          <input type="range" className="orange-thumb"
            min={500} max={200000} value={brandBudget} step={500}
            onChange={e => setBrandBudget(+e.target.value)}
            style={{ width: "100%", marginBottom: 6, background: `linear-gradient(to right,${orange} ${bPct}%,${s2} ${bPct}%)` }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(236,234,245,.2)", marginBottom: 24 }}>
            <span>₹500</span><span>₹2,00,000</span>
          </div>
        </div>

        {/* result */}
        <div style={{ background: s2, margin: "0 12px 12px", borderRadius: 16, padding: "20px 22px" }}>
          <div style={{ fontSize: 12, color: muted, marginBottom: 12, letterSpacing: ".5px", textTransform: "uppercase", fontWeight: 600 }}>What you get</div>
          <Row label="Estimated real views" value={"~" + fmtN(paidViews)} accent={orange} sub="after bot filtering" />
          <Row label="Content creators posting" value={channels + "+"} accent={orange} sub="verified Indian clippers" />
          <Row label="Bots blocked (no charge)" value={fmtN(botBlocked)} accent="rgba(239,68,68,.7)" sub="auto-rejected, refunded" />
          <div style={{ paddingTop: 14, paddingBottom: 2 }}>
            <div style={{ fontSize: 12, color: "rgba(236,234,245,.2)" }}>
              That's roughly&nbsp;
              <span style={{ color: orange, fontWeight: 600 }}>₹{(brandBudget / (paidViews / 1000)).toFixed(1)}</span>
              &nbsp;per 1,000 genuine views — no agency fees, no fluff.
            </div>
          </div>
        </div>
      </div>

      {/* CLIPPER CARD */}
      <div style={{ flex: 1, minWidth: 290, background: surface, border: `1px solid rgba(255,255,255,.07)`, borderRadius: 22, overflow: "hidden" }}>
        <div style={{ height: 2, background: `linear-gradient(90deg,${green},transparent)` }} />
        <div style={{ padding: "28px 28px 0" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.2)", borderRadius: 99, padding: "5px 12px", fontSize: 11, fontWeight: 600, color: green, marginBottom: 16 }}>
            ✂️ For Clippers
          </div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700, lineHeight: 1.3, marginBottom: 6 }}>
            My Reels get&nbsp;
            <span style={{ color: green }}>{fmtN(clipViews)} views</span>
            &nbsp;a month…
          </div>
          <div style={{ fontSize: 13, color: muted, marginBottom: 20, lineHeight: 1.6 }}>
            Drag the slider to set your monthly reach ↓
          </div>
          <input type="range" className="green-thumb"
            min={10000} max={10000000} value={clipViews} step={10000}
            onChange={e => setClipViews(+e.target.value)}
            style={{ width: "100%", marginBottom: 6, background: `linear-gradient(to right,${green} ${cPct}%,${s2} ${cPct}%)` }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(236,234,245,.2)", marginBottom: 24 }}>
            <span>10k</span><span>1 Crore</span>
          </div>
        </div>

        {/* result */}
        <div style={{ background: s2, margin: "0 12px 12px", borderRadius: 16, padding: "20px 22px" }}>
          <div style={{ fontSize: 12, color: muted, marginBottom: 12, letterSpacing: ".5px", textTransform: "uppercase", fontWeight: 600 }}>What you earn</div>
          <Row label="Monthly UPI earnings" value={"₹" + earn.toLocaleString("en-IN")} accent={green} sub={"at ₹" + rate + " per 1,000 views"} />
          <Row label="That's every week" value={"₹" + weekly.toLocaleString("en-IN")} accent={green} sub="paid directly to your UPI" />
          <Row label="Or per day on average" value={"₹" + perDay.toLocaleString("en-IN")} accent="rgba(34,197,94,.6)" sub="just from posting clips" />
          <div style={{ paddingTop: 14, paddingBottom: 2 }}>
            <div style={{ fontSize: 12, color: "rgba(236,234,245,.2)" }}>
              No minimum payout. No waiting months.&nbsp;
              <span style={{ color: green, fontWeight: 600 }}>Zero extra work</span>
              &nbsp;— you already make Reels.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}


// ── TERMINAL ──
const TERM_LINES = [
  { t: "cmd", s: "analyze_view --clip-id=xK2p9_42 --source=reels" },
  { t: "info", s: "Fetching viewer fingerprints (n=1,240)..." },
  { t: "dim", s: "[████████████████] 100%" },
  { t: "pass", s: "IP diversity check ..................... PASS (98.2%)" },
  { t: "pass", s: "Watch duration filter (>3s) ............ PASS (94.7%)" },
  { t: "pass", s: "Engagement ratio analysis .............. PASS (8.3:1)" },
  { t: "warn", s: "Suspicious cluster: subnet 103.x.x.x (14 views)" },
  { t: "fail", s: "Bot verdict: 14 views BLOCKED — payout adjusted" },
  { t: "dim", s: "─────────────────────────────────────────────" },
  { t: "pass", s: "Verified: 1,226  |  Blocked: 14  |  Accuracy: 98.9%" },
  { t: "pass", s: "Payout released → @clipper_raj: ₹4,285.50 via UPI" },
  { t: "info", s: "Bounty pool remaining: ₹34,210.00" },
  { t: "cmd", s: "monitor --live --flag-anomalies" },
  { t: "info", s: "Watching 47 active clips across 3 platforms..." },
  { t: "blink", s: "_" },
];
const tColor = { cmd: "#4ade80cc", pass: green, fail: "#ef4444", warn: "#eab308", info: "rgba(236,234,245,.3)", dim: "rgba(236,234,245,.15)", blink: green };

function Terminal() {
  const [lines, setLines] = useState([]);
  const ref = useRef(0);
  const bodyRef = useRef();

  useEffect(() => {
    let idx = 0, timer;
    function next() {
      if (idx >= TERM_LINES.length) { idx = 0; setLines([]); timer = setTimeout(next, 1500); return; }
      const l = TERM_LINES[idx++];
      setLines(prev => [...prev, l]);
      const delay = l.t === "cmd" ? 700 : l.t === "dim" ? 80 : 220;
      timer = setTimeout(next, delay);
    }
    timer = setTimeout(next, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [lines]);

  return (
    <div style={{ background: "#090e09", border: "1px solid rgba(34,197,94,.18)", borderRadius: 18, overflow: "hidden", boxShadow: "0 0 50px rgba(34,197,94,.06)" }}>
      <div style={{ background: "#0b110b", padding: "11px 16px", display: "flex", alignItems: "center", gap: 7, borderBottom: "1px solid rgba(34,197,94,.1)" }}>
        {["#ff5f57","#febc2e","#28c840"].map((c,i) => <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
        <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(34,197,94,.4)", marginLeft: 6 }}>clipr-fraud@engine:~$</span>
      </div>
      <div ref={bodyRef} style={{ padding: 18, fontFamily: "monospace", fontSize: 12, lineHeight: 1.85, maxHeight: 280, overflow: "hidden" }}>
        {lines.map((l, i) => (
          <div key={i} style={{ display: "flex", gap: 9, opacity: 1 }}>
            <span style={{ color: "rgba(34,197,94,.35)", flexShrink: 0 }}>{l.t === "cmd" ? "$" : ">"}</span>
            <span style={{ color: tColor[l.t] || "rgba(236,234,245,.3)", fontWeight: l.t === "pass" || l.t === "fail" ? 500 : 400, animation: l.t === "blink" ? "blink .8s step-end infinite" : "none" }}>{l.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── WAITLIST FORM ──
function WaitlistForm() {
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [err, setErr] = useState("");

  function submit() {
    if (!name.trim()) { setErr("name"); return; }
    if (!email.trim() || !email.includes("@")) { setErr("email"); return; }
    if (!role) { setErr("role"); return; }
    setDone(true);
    console.log("[clipr waitlist]", { name, email, role });
  }

  const fieldStyle = (id) => ({
    width: "100%", background: s2, border: `1px solid ${err === id ? "rgba(239,68,68,.6)" : "rgba(255,255,255,.07)"}`,
    borderRadius: 12, padding: "14px 14px 14px 42px", color: cream,
    fontFamily: "inherit", fontSize: 15, outline: "none",
    boxShadow: err === id ? "0 0 0 4px rgba(239,68,68,.06)" : "none",
  });

  if (done) return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(249,115,22,.1)", border: "1px solid rgba(249,115,22,.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M4 13l5 5 13-11" stroke={orange} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>You're on the list! 🎉</div>
      <div style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>We'll reach out personally when your niche goes live.<br />Tell a friend — more creators = better campaigns.</div>
    </div>
  );

  return (
    <div>
      {[
        { id: "name", icon: <path d="M7.5 5.5a3 3 0 110 6 3 3 0 010-6zM1.5 14c0-3 2.7-4.5 6-4.5s6 1.5 6 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />, placeholder: "Your name", value: name, onChange: e => { setName(e.target.value); setErr(""); }, type: "text" },
        { id: "email", icon: <><rect x="1.5" y="3.5" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" /><path d="M1.5 5.5l6 3.5 6-3.5" stroke="currentColor" strokeWidth="1.2" /></>, placeholder: "Email or WhatsApp number", value: email, onChange: e => { setEmail(e.target.value); setErr(""); }, type: "email" },
      ].map(f => (
        <div key={f.id} style={{ position: "relative", marginBottom: 12 }}>
          <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, opacity: .3 }} viewBox="0 0 15 15" fill="none">{f.icon}</svg>
          <input type={f.type} placeholder={f.placeholder} value={f.value} onChange={f.onChange} style={fieldStyle(f.id)} />
        </div>
      ))}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, opacity: .3, pointerEvents: "none" }} viewBox="0 0 15 15" fill="none">
          <path d="M7.5 2l1.4 2.6H12L9.8 6.2l.8 2.7-3.1-1.9-3.1 1.9.8-2.7L3 4.6h3.1L7.5 2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
        <select value={role} onChange={e => { setRole(e.target.value); setErr(""); }}
          style={{ ...fieldStyle("role"), WebkitAppearance: "none", cursor: "pointer", color: role ? cream : muted }}>
          <option value="" disabled>I'm here to…</option>
          <option value="creator">📢 Grow my content & reach (Creator / Brand)</option>
          <option value="clipper">✂️ Earn money clipping (Clipper)</option>
        </select>
      </div>
      <button onClick={submit} style={{ width: "100%", padding: 17, background: orange, color: "#000", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, border: "none", borderRadius: 12, cursor: "pointer", marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 9, letterSpacing: "-.2px", transition: "transform .2s, box-shadow .2s" }}
        onMouseEnter={e => { e.target.style.transform = "scale(1.02)"; e.target.style.boxShadow = "0 10px 36px rgba(249,115,22,.38)"; }}
        onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}>
        Claim My Spot
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 16, flexWrap: "wrap" }}>
        {["🔒 No spam", "✅ Free to join", "🇮🇳 India-first"].map((t, i) => (
          <span key={i} style={{ fontSize: 11, color: "rgba(236,234,245,.22)", display: "flex", alignItems: "center", gap: 4 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}


// ── VS UGC SECTION ──
function VsUGC() {
  const rows = [
    { feature: "Who distributes content",  ugc: "One hired creator",          clipr: "50–200 independent clippers" },
    { feature: "Content style",            ugc: "Brand-scripted, feels forced", clipr: "Organic, creator's own voice" },
    { feature: "Payment model",            ugc: "Fixed fee upfront",           clipr: "Pay only per verified view" },
    { feature: "Fraud protection",         ugc: "None — you trust the number", clipr: "Bot-filter before every payout" },
    { feature: "Scale",                    ugc: "1 video, 1 audience",         clipr: "100s of clips, every niche" },
    { feature: "Payout currency",          ugc: "USD or invoice",              clipr: "INR, direct to UPI" },
    { feature: "India-specific campaigns", ugc: "Rare — often excluded",       clipr: "Built exclusively for India" },
  ];
  return (
    <section style={{ maxWidth: 1060, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: muted, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 22, height: 1, background: muted }} />Not your typical UGC platform
      </div>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(26px,4vw,44px)", letterSpacing: -1.5, marginBottom: 10, lineHeight: 1.08 }}>
        Clipr vs <span style={{ color: orange }}>Traditional UGC</span>
      </h2>
      <p style={{ fontSize: 16, color: muted, marginBottom: 44, lineHeight: 1.6, maxWidth: 560 }}>
        UGC platforms hire one creator and pray it performs. Clipr deploys a network and only charges when it does.
      </p>
      <div style={{ border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, overflow: "hidden" }}>
        {/* header */}
        <div className="grid-3col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: s2, padding: "14px 24px", gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: muted, letterSpacing: "1px", textTransform: "uppercase" }}>Feature</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(239,68,68,.7)", letterSpacing: "1px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="rgba(239,68,68,.6)" strokeWidth="1.2"/><path d="M4 4l4 4M8 4l-4 4" stroke="rgba(239,68,68,.6)" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Traditional UGC
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: orange, letterSpacing: "1px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke={orange} strokeWidth="1.2"/><path d="M3 6l2 2 4-4" stroke={orange} strokeWidth="1.2" strokeLinecap="round"/></svg>
            clipr
          </div>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="grid-3col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "16px 24px", gap: 8, borderTop: "1px solid rgba(255,255,255,.05)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,.015)", transition: "background .2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.04)"}
            onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,.015)"}>
            <div style={{ fontSize: 13, color: cream, fontWeight: 500 }}>{r.feature}</div>
            <div style={{ fontSize: 13, color: "rgba(236,234,245,.35)", display: "flex", alignItems: "center", gap: 7 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}><circle cx="7" cy="7" r="6" fill="rgba(239,68,68,.08)" stroke="rgba(239,68,68,.25)" strokeWidth="1"/><path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="rgba(239,68,68,.6)" strokeWidth="1.2" strokeLinecap="round"/></svg>
              {r.ugc}
            </div>
            <div style={{ fontSize: 13, color: cream, display: "flex", alignItems: "center", gap: 7, fontWeight: 500 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}><circle cx="7" cy="7" r="6" fill="rgba(249,115,22,.08)" stroke="rgba(249,115,22,.3)" strokeWidth="1"/><path d="M4 7l2 2 4-4" stroke={orange} strokeWidth="1.2" strokeLinecap="round"/></svg>
              {r.clipr}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── FOR WHOM SECTION ──
function ForWhom({ isCreator }) {
  const [active, setActive] = useState(0);

  const creatorNiches = [
    {
      emoji: "🎮", label: "Gamers", color: "#8b5cf6",
      pain: "Your best clutch moments never get seen beyond your stream.",
      fix: "Clippers cut your highlights into Reels & Shorts. Every kill, every win — on 50 channels overnight.",
      metric: "Avg +2.4L views per campaign",
      clips: ["Best kills compilation", "Tutorial clips", "Reaction shorts", "Stream highlights"],
      clipsLabel: "Clips your audience will share",
    },
    {
      emoji: "🎙️", label: "Podcasters", color: orange,
      pain: "Long-form episodes don't travel. You lose the 90% who won't watch 2 hours.",
      fix: "Clippers extract your sharpest 60-second takes and push them to the audiences who'll binge your full episodes.",
      metric: "Avg 3.1x listener growth",
      clips: ["Hot takes", "Controversial quotes", "Advice moments", "Funny exchanges"],
      clipsLabel: "Clips your audience will share",
    },
    {
      emoji: "📺", label: "Streamers", color: "#06b6d4",
      pain: "Your stream VODs die in 24 hours. YouTube clips help but you don't have time to edit.",
      fix: "Clippers watch your VODs, find the moments, and post them. You just keep streaming.",
      metric: "Avg 18+ clips per stream",
      clips: ["Rage moments", "Big wins", "Viewer interactions", "Hype clips"],
      clipsLabel: "Clips your audience will share",
    },
    {
      emoji: "📹", label: "YouTubers", color: "#ef4444",
      pain: "You spend 10 hours making a video. Instagram only sees it if you manually clip it.",
      fix: "Set a bounty on your video. Clippers handle Reels, Shorts, and Moj — you focus on making more content.",
      metric: "Avg ₹40k saved per video",
      clips: ["Highlights", "Chapters", "Quotes", "Behind-the-scenes"],
      clipsLabel: "Clips your audience will share",
    },
    {
      emoji: "📰", label: "News Channels", color: green,
      pain: "Breaking news dies in the feed within hours. Mobile audiences are on Reels, not YouTube.",
      fix: "Set micro-bounties on breaking stories. Clippers distribute 30-second summaries to short-form audiences instantly.",
      metric: "Avg 4.8x faster reach",
      clips: ["Breaking summaries", "Expert bytes", "Live clips", "Explainers"],
      clipsLabel: "Clips your audience will share",
    },
    {
      emoji: "🎵", label: "Singers", color: "#ec4899",
      pain: "New songs need viral moments. Music labels charge ₹2–5L for a single campaign.",
      fix: "Set a song clip bounty. Clippers make lip-sync clips, dance covers, and music moments — you pay per view.",
      metric: "Avg 8L streams per ₹15k budget",
      clips: ["Lyric moments", "Hook clips", "Dance trends", "Behind the studio"],
      clipsLabel: "Clips your audience will share",
    },
  ];

  const clipperNiches = [
    {
      emoji: "🎮", label: "Gaming", color: "#8b5cf6",
      pain: "Gaming clips are the easiest to make go viral — reaction hooks, clutch moments, rage edits.",
      fix: "Find gaming bounties, clip the best 30-second moments from VODs, and post on your Reels. Gamers' audiences are massive and highly engaged.",
      metric: "Avg ₹7/1k views · high volume",
      clips: ["Pick campaigns with 4hr+ VODs", "Look for clutch moments & big wins", "Short vertical cuts with caption hooks", "Post across Reels + Shorts for max reach"],
      clipsLabel: "How to win gaming campaigns",
    },
    {
      emoji: "🎙️", label: "Podcasts", color: orange,
      pain: "Podcast clips are underrated — a sharp 45-second opinion can blow up overnight.",
      fix: "Find the most opinionated or controversial moment in a podcast episode. Clip it, add captions, post. These consistently get saved and reshared.",
      metric: "Avg ₹6/1k views · high shareability",
      clips: ["Scan for timestamps with strong opinions", "Add bold captions — people watch on mute", "One clear hook in the first 3 seconds", "Finance & tech podcasts pay the highest"],
      clipsLabel: "How to win podcast campaigns",
    },
    {
      emoji: "📺", label: "Streamers", color: "#06b6d4",
      pain: "Streamers go live for hours — most clippers ignore them. That's your edge.",
      fix: "Watch stream VODs, find the funny or hype moments, and post fast. Recency matters for streaming content — the first clipper to post a moment wins.",
      metric: "Avg ₹7/1k views · first-mover bonus",
      clips: ["Check VODs within 6 hours of stream end", "Hype, fail, and rage clips perform best", "Keep it under 30s — tight edit wins", "Use the streamer's catchphrases as captions"],
      clipsLabel: "How to win streaming campaigns",
    },
    {
      emoji: "📹", label: "YouTubers", color: "#ef4444",
      pain: "YouTubers have huge libraries. Most of their old videos have never been clipped.",
      fix: "Don't just clip new videos — search their back catalogue. A 2-year-old video moment can still go viral if it's never been clipped before. Less competition, same payout.",
      metric: "Avg ₹6.5/1k views · deep catalogue",
      clips: ["Mine old videos with low clip activity", "Pull the most quotable 20–40 second window", "Add text overlays for context", "Lifestyle & tech channels pay consistently"],
      clipsLabel: "How to win YouTube campaigns",
    },
    {
      emoji: "📰", label: "News", color: green,
      pain: "News clips pay fast — short campaigns, quick turnaround, and breaking content always gets views.",
      fix: "News micro-bounties open and close within hours. Set alerts for new campaigns. These are small clips (15–30 sec) with fast payouts — great for building your clip count.",
      metric: "Avg ₹5/1k views · fast payouts",
      clips: ["Enable push alerts for news campaigns", "Keep edits minimal — news is raw", "Post within 2 hours of campaign opening", "Subtitles are essential for news clips"],
      clipsLabel: "How to win news campaigns",
    },
    {
      emoji: "🎵", label: "Music", color: "#ec4899",
      pain: "Music clips are fun, fast to make, and the algo loves them — especially if you use the original audio.",
      fix: "Clip the catchiest 15–30 seconds of a song — usually the chorus or a drop. Post as a Reel using the artist's original audio. When it's used as a trending audio, you keep earning.",
      metric: "Avg ₹8/1k views · audio virality bonus",
      clips: ["Always use the original audio track", "Clip the hook or chorus — not the verse", "Dance trends & lyric reveals perform best", "Music clips have the longest earning tail"],
      clipsLabel: "How to win music campaigns",
    },
  ];

  const niches = isCreator ? creatorNiches : clipperNiches;
  const n = niches[active];
  const accent = isCreator ? orange : green;

  return (
    <section style={{ maxWidth: 1060, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: muted, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 22, height: 1, background: muted }} />{isCreator ? "Built for your niche" : "Pick your campaign niche"}
      </div>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(26px,4vw,44px)", letterSpacing: -1.5, marginBottom: 12, lineHeight: 1.08 }}>
        {isCreator ? <>Who is Clipr <span style={{ color: orange }}>made for?</span></> : <>Which niche <span style={{ color: green }}>should you clip?</span></>}
      </h2>
      <p style={{ fontSize: 15, color: muted, lineHeight: 1.6, marginBottom: 36, maxWidth: 520 }}>
        {isCreator ? "Every creator type has a different pain. Clipr has a specific fix for each." : "Different niches, different strategies, different earnings. Find where you fit best."}
      </p>
      {/* pill selector */}
      <div className="niche-pills" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {niches.map((ni, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ padding: "10px 18px", borderRadius: 99, border: `1px solid ${active === i ? ni.color : "rgba(255,255,255,.07)"}`, background: active === i ? `rgba(${ni.color === orange ? "249,115,22" : ni.color === green ? "34,197,94" : ni.color === "#8b5cf6" ? "139,92,246" : ni.color === "#06b6d4" ? "6,182,212" : ni.color === "#ef4444" ? "239,68,68" : "236,72,153"},.12)` : "transparent", color: active === i ? ni.color : muted, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all .25s", display: "flex", alignItems: "center", gap: 7 }}>
            {ni.emoji} {ni.label}
          </button>
        ))}
      </div>
      {/* detail panel */}
      <div key={active + (isCreator ? "-c" : "-k")} className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, animation: "fadeUp .35s ease both" }}>
        <div style={{ background: surface, border: `1px solid rgba(255,255,255,.07)`, borderRadius: 20, padding: "32px 30px" }}>
          <div style={{ height: 2, background: `linear-gradient(90deg,${n.color},transparent)`, marginBottom: 24, borderRadius: 2 }} />
          <div style={{ fontSize: 12, color: muted, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12 }}>{isCreator ? "The pain" : "Why this niche works for you"}</div>
          <p style={{ fontSize: 15, color: cream, lineHeight: 1.7, marginBottom: 28, fontStyle: "italic", borderLeft: `2px solid ${isCreator ? "rgba(239,68,68,.3)" : "rgba(34,197,94,.3)"}`, paddingLeft: 14 }}>"{n.pain}"</p>
          <div style={{ fontSize: 12, color: muted, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12 }}>{isCreator ? "The Clipr fix" : "Your strategy"}</div>
          <p style={{ fontSize: 15, color: cream, lineHeight: 1.7 }}>{n.fix}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: surface, border: `1px solid rgba(255,255,255,.07)`, borderRadius: 20, padding: "24px 26px", flex: 1 }}>
            <div style={{ fontSize: 12, color: muted, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>{n.clipsLabel}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {n.clips.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: cream }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: n.color, flexShrink: 0 }} />
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: `rgba(${n.color === orange ? "249,115,22" : n.color === green ? "34,197,94" : n.color === "#8b5cf6" ? "139,92,246" : n.color === "#06b6d4" ? "6,182,212" : n.color === "#ef4444" ? "239,68,68" : "236,72,153"},.08)`, border: `1px solid rgba(${n.color === orange ? "249,115,22" : n.color === green ? "34,197,94" : n.color === "#8b5cf6" ? "139,92,246" : n.color === "#06b6d4" ? "6,182,212" : n.color === "#ef4444" ? "239,68,68" : "236,72,153"},.2)`, borderRadius: 20, padding: "22px 26px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 32 }}>{n.emoji}</div>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: n.color, letterSpacing: -.5 }}>{n.metric}</div>
              <div style={{ fontSize: 12, color: muted, marginTop: 3 }}>{isCreator ? "across early beta campaigns" : "typical earning rate in this niche"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── DASHBOARD SECTION ──
function DashboardSection() {
  const [activeAlert, setActiveAlert] = useState(null);
  const clippers = [
    { name: "@reel_raj", views: 142000, change: "+18%", platform: "Reels", score: 96, status: "hot" },
    { name: "@clip_priya", views: 88400, change: "+7%", platform: "Shorts", score: 91, status: "good" },
    { name: "@shorts_aman", views: 61200, change: "-4%", platform: "Shorts", score: 78, status: "ok" },
    { name: "@moj_kavya", views: 54800, change: "+22%", platform: "Moj", score: 94, status: "hot" },
    { name: "@ig_nikhil", views: 31000, change: "+2%", platform: "Reels", score: 82, status: "good" },
  ];
  const alerts = [
    { type: "warn", msg: "@shorts_aman — engagement ratio dropped to 2.1:1, below threshold", time: "2m ago" },
    { type: "pass", msg: "@reel_raj crossed 1L verified views — payout triggered ₹1,120", time: "14m ago" },
    { type: "pass", msg: "@moj_kavya — new daily record: 22k views in 6 hours", time: "1h ago" },
    { type: "fail", msg: "14 suspicious views blocked from subnet 103.x.x.x — refunded", time: "3h ago" },
  ];
  const statusColor = { hot: orange, good: green, ok: "rgba(234,179,8,.8)" };
  const alertColor = { warn: "#eab308", pass: green, fail: "#ef4444" };
  return (
    <section style={{ maxWidth: 1060, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: muted, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 22, height: 1, background: muted }} />Creator command center
      </div>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(26px,4vw,44px)", letterSpacing: -1.5, marginBottom: 10, lineHeight: 1.08 }}>
        Your daily <span style={{ color: orange }}>clipper report</span>
      </h2>
      <p style={{ fontSize: 16, color: muted, marginBottom: 44, lineHeight: 1.6, maxWidth: 560 }}>
        One dashboard. Every clipper, every platform, every verified view — with real-time alerts before problems cost you money.
      </p>
      <div className="grid-dash" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 18, alignItems: "start" }}>
        {/* main dashboard mock */}
        <div style={{ background: surface, border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, overflow: "hidden" }}>
          {/* top bar */}
          <div style={{ background: s2, padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: cream }}>Campaign #47 — Tech Podcast Clips</div>
              <div style={{ fontSize: 11, color: muted, marginTop: 2 }}>Today · Updated 2 min ago</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ background: "rgba(249,115,22,.1)", border: "1px solid rgba(249,115,22,.2)", borderRadius: 99, padding: "4px 12px", fontSize: 11, color: orange, fontWeight: 600 }}>● LIVE</div>
            </div>
          </div>
          {/* summary row */}
          <div className="grid-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(255,255,255,.04)", margin: "12px 12px 0" , borderRadius: 12, overflow: "hidden" }}>
            {[["4,82,310", "Total Verified Views", orange], ["₹3,378", "Payouts This Week", green], ["97.2%", "Bot-free Rate", "rgba(236,234,245,.7)"]].map(([v, l, c], i) => (
              <div key={i} style={{ background: s2, padding: "16px 14px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: c, letterSpacing: -.5 }}>{v}</div>
                <div style={{ fontSize: 11, color: muted, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
          {/* clipper table */}
          <div style={{ padding: "16px 12px 12px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 70px 60px 50px", gap: 8, padding: "0 10px 10px", fontSize: 10, color: muted, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
              <span>Clipper</span><span>Views Today</span><span>Platform</span><span>Score</span><span>Status</span>
            </div>
            {clippers.map((c, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 90px 70px 60px 50px", gap: 8, padding: "11px 10px", borderBottom: "1px solid rgba(255,255,255,.04)", alignItems: "center", transition: "background .2s", borderRadius: 8 }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.03)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ fontSize: 13, fontWeight: 600, color: cream }}>{c.name}</div>
                <div style={{ fontSize: 13, color: cream }}>
                  {(c.views / 1000).toFixed(0)}k
                  <span style={{ fontSize: 10, marginLeft: 5, color: c.change.startsWith("+") ? green : "#ef4444" }}>{c.change}</span>
                </div>
                <div style={{ fontSize: 11, background: "rgba(255,255,255,.05)", borderRadius: 99, padding: "2px 8px", width: "fit-content", color: muted }}>{c.platform}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.score >= 90 ? green : c.score >= 80 ? orange : muted }}>{c.score}</div>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: statusColor[c.status], boxShadow: `0 0 6px ${statusColor[c.status]}` }} />
              </div>
            ))}
          </div>
        </div>
        {/* alerts panel */}
        <div style={{ background: surface, border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, overflow: "hidden" }}>
          <div style={{ background: s2, padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: orange, animation: "pulse 1.4s ease infinite" }} />
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>Live Alerts</span>
            <span style={{ marginLeft: "auto", background: "rgba(249,115,22,.12)", color: orange, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>{alerts.length} new</span>
          </div>
          <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {alerts.map((a, i) => (
              <div key={i} style={{ background: s2, border: `1px solid rgba(255,255,255,.05)`, borderLeft: `3px solid ${alertColor[a.type]}`, borderRadius: 10, padding: "12px 14px", cursor: "pointer", transition: "background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.05)"}
                onMouseLeave={e => e.currentTarget.style.background = s2}>
                <div style={{ fontSize: 12, color: cream, lineHeight: 1.5, marginBottom: 5 }}>{a.msg}</div>
                <div style={{ fontSize: 10, color: muted }}>{a.time}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "10px 12px 16px" }}>
            <div style={{ background: "rgba(249,115,22,.07)", border: "1px solid rgba(249,115,22,.15)", borderRadius: 10, padding: "12px 14px", fontSize: 12, color: muted, lineHeight: 1.5 }}>
              🔔 <strong style={{ color: cream }}>Smart alerts</strong> notify you when any clipper drops below your engagement threshold — before it affects your payout.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CLIPPER POV SECTION ──
function ClipperPOV() {
  const [step, setStep] = useState(0);
  const steps = [
    {
      id: "browse", label: "Browse", icon: "🔍",
      title: "Find campaigns that fit your niche",
      desc: "Filter by category, language, and payout rate. Only take campaigns where you already make content.",
      mock: (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { title: "TechBurner Podcast — Hindi", cat: "Tech", rate: "₹7/1k", slots: "12 left", hot: true },
            { title: "GodSpeed Gaming — Clips", cat: "Gaming", rate: "₹6/1k", slots: "28 left", hot: false },
            { title: "Nikhil Kamath Show — Finance", cat: "Finance", rate: "₹8/1k", slots: "5 left", hot: true },
          ].map((c, i) => (
            <div key={i} style={{ background: s2, border: `1px solid ${i === 2 ? "rgba(249,115,22,.3)" : "rgba(255,255,255,.07)"}`, borderRadius: 10, padding: "11px 13px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: cream, marginBottom: 3 }}>{c.title}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ fontSize: 10, color: muted, background: "rgba(255,255,255,.04)", borderRadius: 99, padding: "2px 8px" }}>{c.cat}</span>
                  <span style={{ fontSize: 10, color: green, fontWeight: 600 }}>{c.rate}</span>
                </div>
              </div>
              {c.hot && <span style={{ fontSize: 10, color: orange, background: "rgba(249,115,22,.1)", borderRadius: 99, padding: "2px 8px", fontWeight: 600, flexShrink: 0 }}>🔥 Hot</span>}
              <span style={{ fontSize: 10, color: muted, flexShrink: 0 }}>{c.slots}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "clip", label: "Clip it", icon: "✂️",
      title: "Cut the best 30 seconds. Post on your handle.",
      desc: "Use our heatmap to find the highest-engagement window. Download, edit in CapCut or Premiere, and post to your own Instagram or YouTube.",
      mock: (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: s2, borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ fontSize: 10, color: muted, fontFamily: "monospace", marginBottom: 8 }}>AI HEATMAP · TechBurner_Ep91.mp4</div>
            <div style={{ height: 32, display: "flex", gap: 2, alignItems: "flex-end", marginBottom: 8 }}>
              {[20,35,55,70,90,100,95,60,40,30,45,80,88,72,50].map((h, i) => (
                <div key={i} style={{ flex: 1, borderRadius: "2px 2px 0 0", height: `${h}%`, background: (i >= 4 && i <= 8) ? (h > 80 ? orange : `rgba(249,115,22,.7)`) : `rgba(255,255,255,.12)`, transition: "height .3s" }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: muted, fontFamily: "monospace" }}>
              <span>0:00</span><span style={{ color: orange }}>▼ Best: 12:30–13:00</span><span>45:00</span>
            </div>
          </div>
          <div style={{ background: "rgba(34,197,94,.07)", border: "1px solid rgba(34,197,94,.2)", borderRadius: 10, padding: "10px 13px", fontSize: 12, color: cream }}>
            ✂️ <strong>Clip ready</strong> — 30s export · 1080p · aspect ratio 9:16
          </div>
        </div>
      ),
    },
    {
      id: "submit", label: "Submit", icon: "📎",
      title: "Paste your post link. That's it.",
      desc: "After posting on Instagram/YouTube/Moj, copy your post URL and paste it into Clipr. Our system starts tracking views immediately.",
      mock: (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: s2, borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ fontSize: 10, color: muted, marginBottom: 8 }}>Paste your post link</div>
            <div style={{ background: bg, border: "1px solid rgba(249,115,22,.3)", borderRadius: 8, padding: "8px 12px", fontFamily: "monospace", fontSize: 11, color: orange }}>
              instagram.com/reel/DxK2p_abc...
            </div>
          </div>
          <div style={{ background: s2, borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(255,255,255,.07)", display: "flex", flexDirection: "column", gap: 7 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
              <span style={{ color: muted }}>Platform detected</span>
              <span style={{ color: cream }}>Instagram Reels ✓</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
              <span style={{ color: muted }}>Campaign matched</span>
              <span style={{ color: cream }}>TechBurner Ep91 ✓</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
              <span style={{ color: muted }}>Tracking status</span>
              <span style={{ color: green, fontWeight: 600 }}>● LIVE</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "earn", label: "Earn", icon: "💸",
      title: "Watch views turn into UPI credits.",
      desc: "Your earnings dashboard updates in real-time. Hit a threshold and your payout drops directly to your UPI — every Friday.",
      mock: (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: s2, borderRadius: 10, padding: "14px", border: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 11 }}>
              <span style={{ color: muted, fontFamily: "monospace" }}>views verified today</span>
              <span style={{ color: green, fontFamily: "monospace" }}>+18,240</span>
            </div>
            <div style={{ height: 5, background: bg, borderRadius: 3, overflow: "hidden", marginBottom: 4 }}>
              <div style={{ height: "100%", width: "72%", background: `linear-gradient(90deg,${green},#16a34a)`, borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 10, color: muted }}>72% to next payout threshold</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[["₹1,276", "This week", green], ["₹6,840", "This month", orange]].map(([v,l,c],i) => (
              <div key={i} style={{ background: s2, border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, padding: "12px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: c }}>{v}</div>
                <div style={{ fontSize: 10, color: muted, marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(34,197,94,.07)", border: "1px solid rgba(34,197,94,.2)", borderRadius: 10, padding: "10px 13px", fontSize: 12, color: green, fontWeight: 600, textAlign: "center" }}>
            🎉 Friday payout: ₹1,276 → UPI confirmed
          </div>
        </div>
      ),
    },
  ];
  return (
    <section style={{ maxWidth: 1060, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: muted, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 22, height: 1, background: muted }} />Clipper's perspective
      </div>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(26px,4vw,44px)", letterSpacing: -1.5, marginBottom: 10, lineHeight: 1.08 }}>
        A day in the life of <span style={{ color: green }}>a Clipper</span>
      </h2>
      <p style={{ fontSize: 16, color: muted, marginBottom: 44, lineHeight: 1.6, maxWidth: 520 }}>
        You already spend time watching content. Now that time pays you.
      </p>
      {/* step tabs */}
      <div style={{ display: "flex", gap: 0, background: s2, borderRadius: 14, padding: 5, marginBottom: 28, width: "fit-content" }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)}
            style={{ padding: "10px 22px", borderRadius: 10, border: "none", background: step === i ? green : "transparent", color: step === i ? "#000" : muted, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .25s", display: "flex", alignItems: "center", gap: 6 }}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>
      {/* content */}
      <div key={step} className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, animation: "fadeUp .3s ease both" }}>
        <div style={{ background: surface, border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, padding: "32px 30px" }}>
          <div style={{ height: 2, background: `linear-gradient(90deg,${green},transparent)`, marginBottom: 24, borderRadius: 2 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{steps[step].icon}</div>
            <div style={{ fontSize: 11, color: muted, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>Step {step + 1} of 4</div>
          </div>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: -.5, marginBottom: 14, color: cream, lineHeight: 1.2 }}>{steps[step].title}</h3>
          <p style={{ fontSize: 15, color: muted, lineHeight: 1.75 }}>{steps[step].desc}</p>
        </div>
        <div style={{ background: surface, border: "1px solid rgba(34,197,94,.1)", borderRadius: 20, padding: "24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 10, color: muted, fontFamily: "monospace", marginBottom: 14, letterSpacing: "1px" }}>CLIPR APP · {steps[step].label.toUpperCase()}</div>
          {steps[step].mock}
        </div>
      </div>
    </section>
  );
}

// ── MAIN APP ──
export default function App() {
  const [role, setRole] = useState("creator");
  const [brandBudget, setBrandBudget] = useState(10000);
  const [clipViews, setClipViews] = useState(500000);
  const isC = role === "creator";

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div style={{ background: bg, color: cream, fontFamily: "'DM Sans', system-ui, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{styles}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 40px", background: "rgba(7,8,13,.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: -1, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: orange, boxShadow: `0 0 10px ${orange}` }} />
          clipr
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: muted, border: "1px solid rgba(255,255,255,.07)", padding: "5px 14px", borderRadius: 99 }}>🇮🇳 India-first · Private Beta</span>
          <button onClick={() => scrollTo("waitlist")} style={{ background: orange, color: "#000", fontWeight: 700, fontSize: 13, padding: "8px 20px", borderRadius: 99, border: "none", cursor: "pointer" }}>Join Waitlist</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 60px", textAlign: "center", overflow: "hidden" }}>
        {/* blobs */}
        {[{ color: orange, top: -180, right: -80, size: 560, delay: "0s" }, { color: "#6366f1", bottom: -180, left: -80, size: 480, delay: "-7s" }, { color: green, top: "40%", left: "32%", size: 360, delay: "-12s", opacity: .07 }].map((b, i) => (
          <div key={i} style={{ position: "absolute", width: b.size, height: b.size, borderRadius: "50%", background: b.color, filter: "blur(120px)", opacity: b.opacity || .12, animation: `drift 18s ${b.delay} ease-in-out infinite alternate`, top: b.top, right: b.right, bottom: b.bottom, left: b.left, pointerEvents: "none" }} />
        ))}

        {/* side mocks */}
        <div className="hero-side-mock" style={{ position: "absolute", top: "50%", left: -10, transform: `translateY(-50%) rotate(-5deg) translateX(${isC ? 0 : -30}px)`, opacity: isC ? 1 : 0, transition: "all .6s cubic-bezier(.16,1,.3,1)", pointerEvents: "none" }}>
          <DashboardMock />
        </div>
        <div className="hero-side-mock" style={{ position: "absolute", top: "50%", right: -10, transform: `translateY(-50%) rotate(4deg) translateX(${!isC ? 0 : 30}px)`, opacity: !isC ? 1 : 0, transition: "all .6s cubic-bezier(.16,1,.3,1)", pointerEvents: "none" }}>
          <MobileMock />
        </div>

        {/* center */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 640 }}>
          {/* eyebrow */}
          <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: orange, marginBottom: 28 }}>
            <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: orange }} />
            Now accepting early signups
          </div>

          {/* TOGGLE */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-flex", background: surface, border: "1px solid rgba(255,255,255,.07)", borderRadius: 99, padding: 5, gap: 4 }}>
              {[{ id: "creator", label: "🎬  I am a Creator" }, { id: "clipper", label: "✂️  I am a Clipper" }].map(r => (
                <button key={r.id} onClick={() => setRole(r.id)}
                  style={{ padding: "13px 28px", borderRadius: 99, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", transition: "all .35s cubic-bezier(.16,1,.3,1)", background: role === r.id ? (r.id === "creator" ? orange : green) : "transparent", color: role === r.id ? "#000" : muted, boxShadow: role === r.id ? `0 0 28px ${r.id === "creator" ? "rgba(249,115,22,.4)" : "rgba(34,197,94,.35)"}` : "none" }}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* headline */}
          <div style={{ minHeight: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h1 key={role} className="fade-up" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(36px,6vw,70px)", lineHeight: .96, letterSpacing: -2.5 }}>
              {isC ? <>Stop paying for edits.<br /><span style={{ WebkitTextStroke: "1.5px rgba(236,234,245,.25)", color: "transparent", fontStyle: "italic" }}>Pay for</span> guaranteed <span style={{ color: orange }}>virality.</span></> : <>Turn your edits<br /><span style={{ WebkitTextStroke: "1.5px rgba(236,234,245,.25)", color: "transparent", fontStyle: "italic" }}>into instant</span> <span style={{ color: green }}>cash.</span></>}
            </h1>
          </div>

          <p style={{ fontSize: 17, color: muted, lineHeight: 1.7, marginBottom: 36, minHeight: 52 }}>
            {isC ? "Set a bounty pool. Verified Indian clippers distribute your content. You only pay for real, bot-free views." : "Find campaigns from podcasters & streamers. Clip, post, earn per verified view — direct to UPI every week."}
          </p>

          <button onClick={() => scrollTo("waitlist")}
            style={{ background: isC ? orange : green, color: "#000", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, padding: "16px 40px", borderRadius: 99, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, transition: "transform .2s, box-shadow .2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = `0 8px 36px ${isC ? "rgba(249,115,22,.4)" : "rgba(34,197,94,.35)"}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            Join the Waitlist
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </section>


      {/* FOR WHOM */}
      <ForWhom isCreator={isC} />

      {/* ROLE-SPECIFIC SECTIONS — swap on toggle */}
      <div key={role} style={{ animation: "fadeUp .5s ease both" }}>
        {isC ? <DashboardSection /> : <ClipperPOV />}
      </div>

      {/* VS UGC */}
      <VsUGC />

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: 1060, margin: "0 auto", padding: "60px 24px 80px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: muted, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 22, height: 1, background: muted }} />The lifecycle of a clip
        </div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(26px,4vw,44px)", letterSpacing: -1.5, marginBottom: 44, lineHeight: 1.08 }}>
          From bounty to <span style={{ color: orange }}>bank account</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 2 }}>
          {[
            { icon: "🎯", accent: orange, title: "Creator sets bounty", sub: "Paste a YouTube URL, set a pool, choose niche & platform split.",
              visual: <><div style={{ background: s2, borderRadius: 7, padding: "7px 10px", fontFamily: "monospace", fontSize: 10, color: muted, border: `1px solid rgba(255,255,255,.07)`, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>youtube.com/watch?v=<span style={{ color: orange }}>xK2p9...</span></div><div style={{ background: "rgba(249,115,22,.1)", border: "1px solid rgba(249,115,22,.25)", borderRadius: 99, padding: "3px 10px", fontSize: 10, color: orange, fontWeight: 600, width: "fit-content" }}>🎯 Bounty: ₹50,000</div></> },
            { icon: "📊", accent: orange, title: "AI heatmap trims it", sub: "Engine finds the highest-engagement 30-second windows.",
              visual: <><div style={{ fontSize: 9, color: muted, fontFamily: "monospace", marginBottom: 4 }}>HEATMAP — engagement peaks</div><div style={{ height: 34, display: "flex", gap: 2, alignItems: "flex-end" }}>{[28,44,80,100,88,65,36,54,82,30].map((h,i) => <div key={i} style={{ flex: 1, borderRadius: "2px 2px 0 0", height: `${h}%`, background: h > 80 ? orange : `rgba(249,115,22,${h/140})`, boxShadow: h > 90 ? "0 0 5px rgba(249,115,22,.5)" : "none" }} />)}</div><div style={{ fontSize: 9, color: orange, fontFamily: "monospace" }}>▲ Best: 1:42–2:12 · score 97</div></> },
            { icon: "📱", accent: "#818cf8", title: "Clippers post everywhere", sub: "Network distributes across Reels, Shorts, Moj with tracking links.",
              visual: <><div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{[["#e1306c","Reels"],["#ff0000","Shorts"],[orange,"Moj"]].map(([c,l],i) => <div key={i} style={{ background: s2, border: `1px solid rgba(255,255,255,.07)`, borderRadius: 7, padding: "4px 7px", fontSize: 10, color: muted, display: "flex", alignItems: "center", gap: 3 }}><div style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />{l}</div>)}</div><div style={{ fontSize: 9, color: "rgba(129,140,248,.6)", fontFamily: "monospace" }}>link.clipr.in/c/xK2p9 ✓</div></> },
            { icon: "💸", accent: green, title: "Views verified, paid out", sub: "Bot-filtered views trigger automatic UPI payouts within 7 days.",
              visual: <><div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, marginBottom: 3 }}><span style={{ fontFamily: "monospace", color: muted }}>views verified</span><span style={{ fontFamily: "monospace", color: green }}>4,82,310/5,00,000</span></div><div style={{ height: 5, background: s2, borderRadius: 3, overflow: "hidden" }}><div style={{ height: "100%", background: `linear-gradient(90deg,${green},#16a34a)`, animation: "fillPb 3s ease-in-out infinite" }} /></div></div><div style={{ display: "flex", gap: 5 }}>{[["₹3,378","Clipper",green],["₹845","Platform",muted],["saved","Creator",orange]].map(([v,l,c],i) => <div key={i} style={{ flex: 1, background: s2, borderRadius: 7, padding: "5px 4px", textAlign: "center", border: `1px solid rgba(255,255,255,.07)` }}><div style={{ fontWeight: 700, fontSize: 12, color: c, fontFamily: "'Syne',sans-serif" }}>{v}</div><div style={{ fontSize: 9, color: muted }}>{l}</div></div>)}</div></> },
          ].map((s, i) => (
            <div key={i} style={{ padding: "28px 22px", background: "rgba(255,255,255,.025)", transition: "background .3s", borderRadius: i === 0 ? "24px 4px 4px 4px" : i === 1 ? "4px 24px 4px 4px" : i === 2 ? "4px 4px 4px 24px" : "4px 4px 24px 4px" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.025)"}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: `rgba(${s.accent === orange ? "249,115,22" : s.accent === green ? "34,197,94" : "129,140,248"},.1)`, border: `1px solid rgba(${s.accent === orange ? "249,115,22" : s.accent === green ? "34,197,94" : "129,140,248"},.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 16 }}>{s.icon}</div>
              <div style={{ background: surface, border: `1px solid rgba(255,255,255,.07)`, borderRadius: 12, padding: 14, marginBottom: 14, minHeight: 80, display: "flex", flexDirection: "column", gap: 7 }}>{s.visual}</div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 6, letterSpacing: "-.2px" }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TERMINAL — creator only */}
      {isC && (
      <section className="terminal-grid" style={{ maxWidth: 1060, margin: "0 auto", padding: "40px 24px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: muted, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 22, height: 1, background: muted }} />Tech moat</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(22px,3.5vw,38px)", letterSpacing: -1.5, marginBottom: 16, lineHeight: 1.1 }}>Your first question:<br /><span style={{ color: green }}>"What about bots?"</span></h2>
          <p style={{ fontSize: 14, color: muted, lineHeight: 1.75, marginBottom: 22 }}>We built the anti-fraud engine before anything else. Every view is fingerprinted, scored, and accepted or blocked in real-time — before a single rupee moves.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {["IP velocity analysis — catches view farms flooding from the same subnet", "Engagement ratio scoring — real humans comment and pause. Bots don't.", "Watch duration fingerprinting — sub-3s views auto-rejected, no exceptions", "Blocked payout amounts escrow'd back to brand — zero loss guarantee"].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: muted }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke={green} strokeWidth="1.4" strokeLinecap="round" /></svg>
                </div>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <Terminal />
      </section>

      )}

      {/* WAITLIST */}
      <section id="waitlist" style={{ padding: "40px 24px 120px" }}>
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: orange, marginBottom: 14 }}>
            <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: orange }} />
            Limited early spots
          </div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(26px,4vw,44px)", letterSpacing: -1.5, marginBottom: 10, lineHeight: 1.08 }}>
            Get in before<br /><span style={{ color: orange }}>everyone else does</span>
          </h2>
          <p style={{ fontSize: 15, color: muted, marginBottom: 40, lineHeight: 1.6 }}>No passwords. No long forms. Tell us who you are — we'll handle the rest.</p>
          <div style={{ background: surface, border: "1px solid rgba(255,255,255,.07)", borderRadius: 26, padding: 36, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "50%", height: 1, background: `linear-gradient(90deg,transparent,${orange},transparent)` }} />
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.07)", padding: "30px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: -1, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: orange, boxShadow: `0 0 8px ${orange}` }} />clipr
        </div>
        <p style={{ fontSize: 12, color: "rgba(236,234,245,.2)" }}>© 2026 Clipr · India's Creator Campaign Network</p>
        <p style={{ fontSize: 12, color: "rgba(236,234,245,.2)" }}>Made with ❤️ in India</p>
      </footer>
    </div>
  );
}
