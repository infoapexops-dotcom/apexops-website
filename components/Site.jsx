"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

/* Pointer-driven 3D tilt wrapper (pure CSS perspective) */
function Tilt({ children, max = 9, style }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)"; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition: "transform .25s cubic-bezier(.22,.68,0,1)", transformStyle: "preserve-3d", height: "100%", ...style }}>
      {children}
    </div>
  );
}
import {
  Sparkles, BarChart3, Wallet, TrendingUp, FileText, Bell, Video, Workflow,
  ArrowRight, Play, Check, Activity, Database,
  Table2, Send, Linkedin, Twitter, Globe, Menu, X, Quote, Gauge, Rocket, Cpu,
  ChevronRight, Zap, Star, Loader2, CheckCircle2, AlertCircle,
} from "lucide-react";

/* ===================================================================
   ApexOps — AI Logistics Intelligence · marketing site
   Dark futuristic command-center aesthetic. Next.js + Framer Motion.
   =================================================================== */


/* -- Count-up that fires when scrolled into view -- */
function useCountUp(target, run, { duration = 1400, decimals = 0 } = {}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf, start;
    const to = Number(target) || 0;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setV(to * ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
      else setV(to);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();
}
function Stat({ value, decimals, suffix = "", prefix = "", label, sub }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shown = useCountUp(value, inView, { decimals });
  return (
    <div ref={ref}>
      <p className="mono disp" style={{ fontSize: 40, fontWeight: 800, lineHeight: 1, letterSpacing: -1.5 }}>
        <span className="grad-text">{prefix}{shown}{suffix}</span>
      </p>
      <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", marginTop: 8 }}>{label}</p>
      {sub && <p style={{ fontSize: 12.5, color: "var(--faint)", marginTop: 3 }}>{sub}</p>}
    </div>
  );
}

/* -- Scroll reveal wrapper -- */
function Reveal({ children, delay = 0, y = 28, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.68, 0, 1.0] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

const Logo = ({ size = 30 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="44" y2="44">
          <stop offset="0%" stopColor="#60A5FA" /><stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="36" height="36" rx="10" fill="url(#lg)" />
      <path d="M14 32 L22 11 L30 32 M17.5 25 H26.5" stroke="white" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: size > 28 ? 19 : 16, letterSpacing: -0.5, background: "linear-gradient(120deg,#fff,#93C5FD 55%,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
      ApexOps
    </div>
  </div>
);

/* =========================== NAV =========================== */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["Platform", "#showcase"], ["Features", "#features"], ["Automation", "#automation"], ["Pricing", "#pricing"]];
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="wrap" style={{ height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#top"><Logo /></a>
        <div className="hide-sm" style={{ display: "flex", alignItems: "center", gap: 30 }}>
          {links.map(([l, h]) => (
            <a key={l} href={h} style={{ fontSize: 14, fontWeight: 500, color: "var(--dim)", transition: "color .2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}>{l}</a>
          ))}
        </div>
        <div className="hide-sm" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="#contact" style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>Sign in</a>
          <a href="#contact" className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 14 }}>Start Free Trial <ArrowRight size={15} /></a>
        </div>
        <button className="glass nav-burger" style={{ padding: 9, borderRadius: 10, color: "var(--ink)", alignItems: "center", justifyContent: "center" }} onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="glass" style={{ margin: "0 18px", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 4 }}>
            {links.map(([l, h]) => (
              <a key={l} href={h} onClick={() => setOpen(false)} style={{ fontSize: 15, fontWeight: 500, color: "var(--dim)", padding: "10px 8px" }}>{l}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary" style={{ justifyContent: "center", marginTop: 8 }}>Start Free Trial <ArrowRight size={15} /></a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* =========================== HERO =========================== */
function MiniChart({ color = "#22D3EE" }) {
  const pts = [22, 30, 26, 38, 34, 48, 44, 60, 56, 72];
  const w = 220, h = 64, max = 72;
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * w},${h - (p / max) * h}`).join(" ");
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id="mc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" /><stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#mc)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} />
      <motion.path d={d} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: 0.6, ease: "easeInOut" }} />
    </svg>
  );
}

function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 18 }}
      animate={{ opacity: 1, y: 0, rotateX: 8 }}
      transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 0.68, 0, 1] }}
      style={{ perspective: 1400, transformStyle: "preserve-3d", position: "relative" }}
    >
      <div className="card card-glow" style={{ padding: 18, borderRadius: 20, transform: "rotateX(6deg)", boxShadow: "0 50px 120px rgba(0,0,0,0.6),0 0 60px rgba(34,211,238,0.1)" }}>
        {/* top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Logo size={22} />
          </div>
          <div className="chip" style={{ fontSize: 11 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", boxShadow: "0 0 8px #34D399", animation: "pulseDot 2s infinite", display: "inline-block" }} /> Live · May 2026
          </div>
        </div>
        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 11, marginBottom: 12 }}>
          {[["Valid riders", "43", "#34D399", "+8%"], ["OTR", "98.3%", "#22D3EE", "+0.4%"], ["ATA", "29.5m", "#60A5FA", "-3%"]].map(([l, v, c, t]) => (
            <div key={l} className="glass" style={{ borderRadius: 13, padding: "12px 13px" }}>
              <p style={{ fontSize: 9.5, color: "var(--faint)", fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase" }}>{l}</p>
              <p className="mono" style={{ fontSize: 22, fontWeight: 800, color: c, marginTop: 5, letterSpacing: -0.5 }}>{v}</p>
              <p style={{ fontSize: 10, color: "var(--faint)", marginTop: 2 }}>{t} vs last wk</p>
            </div>
          ))}
        </div>
        {/* chart */}
        <div className="glass" style={{ borderRadius: 13, padding: "14px 15px 6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <p style={{ fontSize: 12, fontWeight: 600 }}>Fleet orders · 7-day</p>
            <p className="mono" style={{ fontSize: 12, color: "#22D3EE", fontWeight: 700 }}>6,691</p>
          </div>
          <MiniChart />
        </div>
      </div>
      {/* floating AI insight popup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.4 }}
        className="card" style={{ position: "absolute", right: -18, bottom: 36, width: 230, padding: 14, borderRadius: 15, animation: "floaty 6s ease-in-out infinite" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: "linear-gradient(135deg,#60A5FA,#22D3EE)", display: "flex", alignItems: "center", justifyContent: "center" }}><Sparkles size={14} color="#04121a" /></div>
          <p style={{ fontSize: 12, fontWeight: 700 }}>ApexOps AI</p>
        </div>
        <p style={{ fontSize: 11.5, color: "var(--dim)", lineHeight: 1.5 }}>3 riders trending at-risk. Coaching <span style={{ color: "#7FE9F7" }}>MD Shakwhat</span> recovers ~QAR 4,000 in incentives.</p>
      </motion.div>
      {/* floating KPI chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -20 }} animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.6 }}
        className="card" style={{ position: "absolute", left: -22, top: 40, padding: "11px 15px", borderRadius: 14, animation: "floaty 5s ease-in-out infinite", animationDelay: ".8s" }}>
        <p style={{ fontSize: 10, color: "var(--faint)", fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase" }}>Rejection rate</p>
        <p className="mono" style={{ fontSize: 20, fontWeight: 800, color: "#34D399", letterSpacing: -0.5 }}>2.6%</p>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  return (
    <header id="top" style={{ position: "relative", paddingTop: 150, paddingBottom: 90, zIndex: 1 }}>
      <div className="wrap" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 50, alignItems: "center" }} className="hero-grid">
          <div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="kbadge"><Sparkles size={14} color="#22D3EE" /> AI Logistics Intelligence</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }}
              style={{ fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 800, lineHeight: 1.04, marginTop: 22 }}>
              Automate logistics<br /><span className="grad-text">operations with AI</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.18 }}
              style={{ fontSize: 18, color: "var(--dim)", lineHeight: 1.6, marginTop: 22, maxWidth: 540 }}>
              AI-powered rider analytics, automation, forecasting, payroll, reporting and operational intelligence — all in one futuristic command center.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.28 }}
              style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
              <a href="#contact" className="btn btn-primary">Book a Demo <ArrowRight size={16} /></a>
              <a href="#contact" className="btn btn-ghost">Start Free Trial</a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
              style={{ display: "flex", gap: 36, marginTop: 46, flexWrap: "wrap" }}>
              <Stat value={42} suffix="%" label="Faster operations" />
              <Stat value={99.3} decimals={1} suffix="%" label="On-time rate" />
              <Stat value={18} suffix="h" prefix="" label="Saved / week" />
            </motion.div>
          </div>
          <DashboardMockup />
        </div>
      </div>
    </header>
  );
}

/* ======================= TRUST MARQUEE ======================= */
function TrustMarquee() {
  const items = ["Keeta", "Telegram", "n8n", "Google Sheets", "Excel", "OpenClaw", "Webhooks", "REST API", "Slack", "WhatsApp"];
  const row = [...items, ...items];
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "10px 0 50px" }}>
      <div className="wrap">
        <p style={{ textAlign: "center", fontSize: 12.5, color: "var(--faint)", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 24 }}>
          Connects with your entire operations stack
        </p>
        <div className="marquee-mask" style={{ overflow: "hidden" }}>
          <div className="marquee">
            {row.map((it, i) => (
              <span key={i} className="chip" style={{ fontSize: 14, padding: "9px 18px", color: "var(--dim)" }}>{it}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================= SHOWCASE ======================= */
function AnimatedBars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const bars = [48, 62, 55, 78, 70, 88, 95];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "flex-end", gap: 9, height: 130 }}>
      {bars.map((b, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 7, height: "100%", justifyContent: "flex-end" }}>
          <motion.div
            initial={{ height: 0 }} animate={inView ? { height: `${b}%` } : {}}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 0.68, 0, 1] }}
            style={{ width: "100%", borderRadius: "6px 6px 0 0", background: "linear-gradient(180deg,#22D3EE,#3B82F6)", boxShadow: "0 0 16px rgba(34,211,238,0.3)" }} />
          <span style={{ fontSize: 10, color: "var(--faint)" }}>{days[i]}</span>
        </div>
      ))}
    </div>
  );
}
function Ring({ pct, color, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const r = 38, c = 2 * Math.PI * r;
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ position: "relative", width: 96, height: 96 }}>
        <svg width="96" height="96" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <motion.circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
            transform="rotate(-90 48 48)" strokeDasharray={c}
            initial={{ strokeDashoffset: c }} animate={inView ? { strokeDashoffset: c - (pct / 100) * c } : {}}
            transition={{ duration: 1.3, ease: "easeInOut" }} style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="mono" style={{ fontSize: 22, fontWeight: 800, color: "var(--ink)" }}>{pct}%</span>
        </div>
      </div>
      <span style={{ fontSize: 12.5, color: "var(--dim)", fontWeight: 500 }}>{label}</span>
    </div>
  );
}
function Showcase() {
  return (
    <section id="showcase" style={{ position: "relative", zIndex: 1, padding: "70px 0" }}>
      <div className="wrap">
        <Reveal style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 50px" }}>
          <span className="section-eyebrow">Live command center</span>
          <h2 style={{ fontSize: "clamp(30px,4vw,46px)", fontWeight: 800, marginTop: 14, lineHeight: 1.1 }}>
            Your entire fleet, <span className="grad-text">visualized in real time</span>
          </h2>
          <p style={{ fontSize: 16.5, color: "var(--dim)", marginTop: 16, lineHeight: 1.6 }}>
            Animated KPI cards, predictive charts and AI insight popups — the same intelligence layer your team checks every morning.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card" style={{ padding: 22, borderRadius: 22 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 13, marginBottom: 16 }} className="kpi-grid">
              {[["Total fleet", 74, "", "#60A5FA"], ["Valid (VDA)", 43, "", "#34D399"], ["Orders MTD", 13372, "", "#22D3EE"], ["At-risk", 24, "", "#F59E0B"]].map(([l, v, s, c], i) => {
                const ref = useRef(null); const iv = useInView(ref, { once: true });
                const shown = useCountUp(v, iv);
                return (
                  <div key={l} ref={ref} className="glass" style={{ borderRadius: 14, padding: "15px 16px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", width: 90, height: 90, borderRadius: "50%", top: -30, right: -30, background: `radial-gradient(circle,${c}22,transparent 70%)` }} />
                    <p style={{ fontSize: 10, color: "var(--faint)", fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase" }}>{l}</p>
                    <p className="mono" style={{ fontSize: 26, fontWeight: 800, color: c, marginTop: 6, letterSpacing: -0.8 }}>{shown}{s}</p>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14 }} className="show-grid">
              <div className="glass" style={{ borderRadius: 16, padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>7-day delivery activity</p>
                  <span className="chip" style={{ fontSize: 11 }}><TrendingUp size={12} color="#34D399" /> +24%</span>
                </div>
                <AnimatedBars />
              </div>
              <div className="glass" style={{ borderRadius: 16, padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  <Ring pct={98} color="#22D3EE" label="OTR" />
                  <Ring pct={62} color="#60A5FA" label="VDA" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ======================= FEATURES ======================= */
const FEATURES = [
  [Activity, "Rider Performance Analytics", "Per-rider scoring across orders, OTR, ATA, attendance and rejection — top & bottom 10% surfaced with reasons.", "#22D3EE"],
  [Wallet, "Payroll Automation", "Part A/B/C settlement, salary slips and deductions generated straight from the Keeta export.", "#60A5FA"],
  [TrendingUp, "Forecasting AI", "Month-end projections per rider with mid-month joiner pro-rating and capacity-tier modeling.", "#34D399"],
  [FileText, "AI Reports", "Narrated, board-ready operational reports generated on demand — no manual spreadsheets.", "#A855F7"],
  [Workflow, "Automated Operations", "n8n + webhook flows that ingest data, recompute KPIs and push alerts automatically.", "#F59E0B"],
  [Gauge, "Real-Time Insights", "Live VDA, capacity tiers and rejection rates the moment new data lands.", "#38BDF8"],
  [Send, "Telegram AI Assistant", "Ask your fleet questions in chat — grounded answers, daily digests, at-risk pings.", "#22D3EE"],
  [Bell, "Smart Notifications", "QID expiry, at-risk drivers, payroll-ready and stock-low — routed where your team works.", "#F472B6"],
  [Video, "AI Video Reports", "Auto-generated cinematic recap videos of the week's operational performance.", "#60A5FA"],
  [BarChart3, "Data Visualization", "Animated charts, rings and trend lines built for the morning ops stand-up.", "#34D399"],
];
function Features() {
  return (
    <section id="features" style={{ position: "relative", zIndex: 1, padding: "70px 0" }}>
      <div className="wrap">
        <Reveal style={{ textAlign: "center", maxWidth: 660, margin: "0 auto 46px" }}>
          <span className="section-eyebrow">Platform</span>
          <h2 style={{ fontSize: "clamp(30px,4vw,46px)", fontWeight: 800, marginTop: 14 }}>Everything your ops team <span className="grad-text">runs the day on</span></h2>
          <p style={{ fontSize: 16.5, color: "var(--dim)", marginTop: 16 }}>Ten capabilities, one intelligence layer — replacing a stack of spreadsheets and manual reports.</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 16 }}>
          {FEATURES.map(([Icon, title, desc, color], i) => (
            <Reveal key={title} delay={(i % 3) * 0.06}>
              <Tilt>
                <div className="card card-glow" style={{ padding: 22, height: "100%" }}>
                  <div style={{ transform: "translateZ(40px)", width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg,${color}30,${color}10)`, border: `1px solid ${color}35`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, boxShadow: `0 6px 20px ${color}22` }}>
                    <Icon size={21} color={color} />
                  </div>
                  <h3 style={{ transform: "translateZ(26px)", fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
                  <p style={{ transform: "translateZ(16px)", fontSize: 14, color: "var(--dim)", lineHeight: 1.6 }}>{desc}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================= AUTOMATION ======================= */
function Automation() {
  const nodes = [
    [Database, "Keeta export", "#60A5FA"], [Table2, "Excel / Sheets", "#34D399"],
    [Cpu, "ApexOps AI engine", "#22D3EE"], [Workflow, "n8n automations", "#F59E0B"],
    [Send, "Telegram + alerts", "#A855F7"], [FileText, "AI reports & dashboards", "#38BDF8"],
  ];
  return (
    <section id="automation" style={{ position: "relative", zIndex: 1, padding: "70px 0" }}>
      <div className="wrap">
        <Reveal style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 50px" }}>
          <span className="section-eyebrow">AI Automation</span>
          <h2 style={{ fontSize: "clamp(30px,4vw,46px)", fontWeight: 800, marginTop: 14 }}>From raw export to <span className="grad-text">decisions, automatically</span></h2>
          <p style={{ fontSize: 16.5, color: "var(--dim)", marginTop: 16 }}>Data flows in, the AI engine recomputes everything, and insights land where your team already works.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card" style={{ padding: "34px 26px", borderRadius: 22 }}>
            <div style={{ display: "flex", alignItems: "stretch", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
              {nodes.map(([Icon, label, color], i) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, flex: "1 1 150px" }}>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.12 }}
                      style={{ width: 60, height: 60, margin: "0 auto 12px", borderRadius: 16, background: `linear-gradient(135deg,${color}28,${color}0C)`, border: `1px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 26px ${color}26`, position: "relative" }}>
                      <Icon size={26} color={color} />
                      {i === 2 && <span style={{ position: "absolute", inset: -4, borderRadius: 18, border: `1px solid ${color}55`, animation: "spin 8s linear infinite" }} />}
                    </motion.div>
                    <p style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{label}</p>
                  </div>
                  {i < nodes.length - 1 && (
                    <svg width="34" height="20" className="hide-sm" style={{ flexShrink: 0 }}>
                      <line x1="2" y1="10" x2="32" y2="10" stroke="#22D3EE" strokeWidth="2" className="flow" opacity="0.6" />
                      <polygon points="28,5 34,10 28,15" fill="#22D3EE" opacity="0.7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 30 }}>
              {["Excel analysis", "Google Sheets sync", "AI forecasting", "Auto dashboards", "OpenClaw", "Scheduled reports"].map((t) => (
                <span key={t} className="chip"><Zap size={12} color="#22D3EE" /> {t}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ======================= SOCIAL PROOF ======================= */
function SocialProof() {
  const testimonials = [
    ["Cut our month-end payroll from 3 days to 20 minutes. The AI catches at-risk riders before they cost us a tier.", "Operations Director", "Al Maha Logistics"],
    ["The Telegram assistant answers what used to need a full analyst. Our supervisors check it every morning.", "Fleet Supervisor", "Qatar Express"],
    ["Forecasting alone paid for the platform — we hit Tier A two months running.", "GM", "Gulf Swift Delivery"],
  ];
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "70px 0" }}>
      <div className="wrap">
        <Reveal>
          <div className="card kpi-grid" style={{ padding: "40px 30px", borderRadius: 22, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, textAlign: "center" }}>
            <Stat value={42} suffix="%" label="Faster operations" sub="vs. manual spreadsheets" />
            <Stat value={31} suffix="%" label="More valid riders" sub="after 60 days" />
            <Stat value={4200} prefix="QAR " label="Recovered / month" sub="in saved incentives" />
            <Stat value={18} suffix="h" label="Saved weekly" sub="per ops manager" />
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16, marginTop: 24 }}>
          {testimonials.map(([quote, role, org], i) => (
            <Reveal key={org} delay={i * 0.08}>
              <div className="card" style={{ padding: 24, height: "100%" }}>
                <Quote size={26} color="#22D3EE" style={{ opacity: 0.5, marginBottom: 12 }} />
                <p style={{ fontSize: 14.5, color: "var(--ink)", lineHeight: 1.65 }}>{quote}</p>
                <div style={{ display: "flex", gap: 3, margin: "14px 0 12px" }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#22D3EE" color="#22D3EE" />)}
                </div>
                <p style={{ fontSize: 13, fontWeight: 700 }}>{role}</p>
                <p style={{ fontSize: 12.5, color: "var(--faint)" }}>{org}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================= DEMO ======================= */
function Demo() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const play = () => { setPlaying(true); setTimeout(() => videoRef.current?.play?.(), 60); };
  return (
    <section id="demo" style={{ position: "relative", zIndex: 1, padding: "60px 0" }}>
      <div className="wrap">
        <Reveal>
          <div className="card card-glow" style={{ borderRadius: 24, overflow: "hidden", position: "relative", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,rgba(34,211,238,0.06),rgba(59,130,246,0.04))" }}>
            {playing ? (
              <video
                ref={videoRef}
                src="/apexops-trailer-web.mp4"
                controls
                playsInline
                autoPlay
                style={{ width: "100%", height: "100%", objectFit: "cover", background: "#05070E" }}
              />
            ) : (
              <>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
                <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(34,211,238,0.18),transparent 65%)", filter: "blur(20px)" }} />
                <div style={{ position: "relative", textAlign: "center" }}>
                  <motion.button onClick={play} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }} aria-label="Play product trailer"
                    style={{ width: 78, height: 78, borderRadius: "50%", background: "linear-gradient(135deg,#60A5FA,#22D3EE)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", boxShadow: "0 0 40px rgba(34,211,238,0.5)", cursor: "pointer" }}>
                    <Play size={30} color="#04121a" fill="#04121a" style={{ marginLeft: 4 }} />
                    <span style={{ position: "absolute", inset: -8, borderRadius: "50%", border: "1px solid rgba(34,211,238,0.5)", animation: "pulseDot 2.4s infinite" }} />
                  </motion.button>
                  <p style={{ fontSize: 18, fontWeight: 700, marginTop: 22 }}>Watch the 60-second product trailer</p>
                  <p style={{ fontSize: 14, color: "var(--dim)", marginTop: 6 }}>See ApexOps turn a raw Keeta export into decisions</p>
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ======================= PRICING ======================= */
const PLANS = [
  ["Starter", 599, "For small partner fleets", ["Up to 30 riders", "Core analytics & VDA", "Payroll automation", "CSV / Excel import", "Email support"], false],
  ["Pro", 1299, "For scaling operations", ["Up to 120 riders", "Forecasting AI", "Telegram AI assistant", "Automated reports", "Priority support"], true],
  ["Enterprise", 2999, "Multi-fleet & custom", ["Unlimited riders", "n8n + API access", "AI video reports", "Dedicated success manager", "Custom integrations"], false],
];
function Pricing() {
  return (
    <section id="pricing" style={{ position: "relative", zIndex: 1, padding: "70px 0" }}>
      <div className="wrap">
        <Reveal style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 46px" }}>
          <span className="section-eyebrow">Pricing</span>
          <h2 style={{ fontSize: "clamp(30px,4vw,46px)", fontWeight: 800, marginTop: 14 }}>Plans that scale <span className="grad-text">with your fleet</span></h2>
          <p style={{ fontSize: 16.5, color: "var(--dim)", marginTop: 16 }}>Transparent QAR pricing. Cancel anytime. 14-day free trial on every tier.</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, alignItems: "stretch" }}>
          {PLANS.map(([name, price, tag, feats, hot], i) => (
            <Reveal key={name} delay={i * 0.08}>
              <motion.div whileHover={{ y: -8, scale: hot ? 1.02 : 1.01 }}
                className="card card-glow" style={{ padding: 28, height: "100%", display: "flex", flexDirection: "column",
                  border: hot ? "1px solid rgba(34,211,238,0.4)" : undefined,
                  boxShadow: hot ? "0 0 50px rgba(34,211,238,0.18)" : undefined,
                  background: hot ? "linear-gradient(160deg,rgba(34,211,238,0.08),rgba(59,130,246,0.03))" : undefined }}>
                {hot && <span className="kbadge" style={{ alignSelf: "flex-start", marginBottom: 14 }}><Rocket size={13} color="#22D3EE" /> Most popular</span>}
                <h3 style={{ fontSize: 20, fontWeight: 700 }}>{name}</h3>
                <p style={{ fontSize: 13.5, color: "var(--faint)", margintop: 4, marginBottom: 18 }}>{tag}</p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 22 }}>
                  <span className="mono disp" style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1.5 }}>{price.toLocaleString()}</span>
                  <span style={{ fontSize: 13, color: "var(--faint)", marginBottom: 8 }}>QAR / mo</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11, flex: 1, marginBottom: 24 }}>
                  {feats.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(34,211,238,0.14)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Check size={11} color="#22D3EE" /></span>
                      <span style={{ fontSize: 13.5, color: "var(--dim)" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact" className={`btn ${hot ? "btn-primary" : "btn-ghost"}`} style={{ justifyContent: "center", width: "100%" }}>
                  {hot ? "Start Free Trial" : "Choose " + name} <ChevronRight size={16} />
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================= FINAL CTA ======================= */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", fleet: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [err, setErr] = useState("");
  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErr(""); };

  const submit = async (e) => {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!form.name.trim()) { setErr("Please enter your name."); return; }
    if (!emailOk) { setErr("Please enter a valid work email."); return; }
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) { const j = await res.json().catch(() => ({})); throw new Error(j.error || "Something went wrong."); }
      setStatus("done");
    } catch (e2) { setErr(e2.message || "Could not submit — try again."); setStatus("error"); }
  };

  const bullets = [[Gauge, "Live in minutes — upload an export, see insights instantly"], [Check, "Your data stays yours — private workspace per partner"], [Sparkles, "Free 14-day trial on every plan, no card required"]];

  return (
    <section id="contact" style={{ position: "relative", zIndex: 1, padding: "70px 0 30px" }}>
      <div className="wrap">
        <Reveal>
          <div className="card card-glow contact-grid" style={{ borderRadius: 24, padding: 0, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {/* left — pitch */}
            <div style={{ padding: "44px 40px", background: "linear-gradient(160deg,rgba(34,211,238,0.07),rgba(59,130,246,0.02))", borderRight: "1px solid var(--border)" }}>
              <span className="section-eyebrow">Book a demo</span>
              <h2 style={{ fontSize: "clamp(26px,3.4vw,38px)", fontWeight: 800, marginTop: 14, lineHeight: 1.1 }}>
                See ApexOps on <span className="grad-text">your fleet data</span>
              </h2>
              <p style={{ fontSize: 15.5, color: "var(--dim)", marginTop: 16, lineHeight: 1.6 }}>
                Tell us about your operation and we'll set up a tailored walkthrough — analytics, payroll automation and the AI assistant on a sample of your own export.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 28 }}>
                {bullets.map(([Ic, t], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic size={16} color="#22D3EE" /></span>
                    <span style={{ fontSize: 13.5, color: "var(--ink)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* right — form */}
            <div style={{ padding: "44px 40px" }}>
              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 320 }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(52,211,153,0.14)", border: "1px solid rgba(52,211,153,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                      <CheckCircle2 size={32} color="#34D399" />
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 700 }}>Request received</h3>
                    <p style={{ fontSize: 14.5, color: "var(--dim)", marginTop: 10, maxWidth: 320, lineHeight: 1.6 }}>
                      Thanks {form.name.split(" ")[0] || "there"} — our team will reach out at <span style={{ color: "#7FE9F7" }}>{form.email}</span> within one business day.
                    </p>
                    <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", fleet: "", message: "" }); }} className="btn btn-ghost" style={{ marginTop: 22 }}>Submit another</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 12, color: "var(--dim)", fontWeight: 600, marginBottom: 7 }}>Full name</label>
                        <input className="field" value={form.name} onChange={set("name")} placeholder="Your name" />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 12, color: "var(--dim)", fontWeight: 600, marginBottom: 7 }}>Work email</label>
                        <input className="field" type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "var(--dim)", fontWeight: 600, marginBottom: 7 }}>Fleet size</label>
                      <select className="field" value={form.fleet} onChange={set("fleet")} style={{ appearance: "none" }}>
                        <option value="">Select range…</option>
                        <option>1–30 riders</option>
                        <option>31–80 riders</option>
                        <option>81–150 riders</option>
                        <option>150+ riders</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "var(--dim)", fontWeight: 600, marginBottom: 7 }}>What do you want to improve?</label>
                      <textarea className="field" value={form.message} onChange={set("message")} rows={3} placeholder="Payroll, forecasting, at-risk riders…" style={{ resize: "vertical" }} />
                    </div>
                    {err && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#FCA5A5", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)", borderRadius: 10, padding: "9px 12px" }}>
                        <AlertCircle size={15} /> {err}
                      </div>
                    )}
                    <button type="submit" disabled={status === "sending"} className="btn btn-primary" style={{ justifyContent: "center", marginTop: 4, opacity: status === "sending" ? 0.7 : 1 }}>
                      {status === "sending" ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Sending…</> : <>Book my demo <ArrowRight size={16} /></>}
                    </button>
                    <p style={{ fontSize: 11.5, color: "var(--faint)", textAlign: "center" }}>No spam. We reply within one business day.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  const parts = [...Array(18)].map((_, i) => ({
    left: `${(i * 5.5 + 4) % 100}%`,
    delay: `${(i % 6) * 0.9}s`,
    dur: `${5 + (i % 5)}s`,
    size: 2 + (i % 3),
  }));
  return (
    <section id="cta" style={{ position: "relative", zIndex: 1, padding: "40px 0 90px" }}>
      <div className="wrap">
        <Reveal>
          <div className="card" style={{ borderRadius: 28, padding: "64px 30px", textAlign: "center", position: "relative", overflow: "hidden", background: "linear-gradient(160deg,rgba(34,211,238,0.1),rgba(59,130,246,0.05))", border: "1px solid rgba(34,211,238,0.25)" }}>
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
              {parts.map((p, i) => (
                <span key={i} className="particle" style={{ left: p.left, bottom: 0, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.dur }} />
              ))}
              <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", top: "-40%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle,rgba(34,211,238,0.18),transparent 60%)", filter: "blur(30px)" }} />
            </div>
            <div style={{ position: "relative" }}>
              <span className="kbadge"><Sparkles size={14} color="#22D3EE" /> Ready when you are</span>
              <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, marginTop: 20, lineHeight: 1.05 }}>
                Ready to run logistics <br /><span className="grad-text">with AI?</span>
              </h2>
              <p style={{ fontSize: 17, color: "var(--dim)", marginTop: 18, maxWidth: 520, margin: "18px auto 0", lineHeight: 1.6 }}>
                Join the partners turning raw exports into decisions. Set up in minutes, see value on day one.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 34, flexWrap: "wrap" }}>
                <a href="#contact" className="btn btn-primary" style={{ padding: "15px 28px", fontSize: 15.5 }}>Book a Demo <ArrowRight size={17} /></a>
                <a href="#contact" className="btn btn-ghost" style={{ padding: "15px 28px", fontSize: 15.5 }}>Start Free Trial</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ======================= FOOTER ======================= */
function Footer() {
  const cols = [
    ["Product", ["Platform", "Features", "Automation", "Pricing", "Changelog"]],
    ["Integrations", ["Keeta", "Telegram", "n8n", "Google Sheets", "REST API"]],
    ["Company", ["About", "Careers", "Blog", "Contact", "Security"]],
  ];
  return (
    <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--border)", padding: "54px 0 40px", marginTop: 20 }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(3,1fr)", gap: 30 }} className="foot-grid">
          <div>
            <Logo />
            <p style={{ fontSize: 13.5, color: "var(--faint)", marginTop: 16, lineHeight: 1.6, maxWidth: 280 }}>
              AI logistics intelligence for delivery partners — analytics, payroll, forecasting and automation in one command center.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {[Twitter, Linkedin, Globe].map((Ic, i) => (
                <a key={i} href="#" className="glass" style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--dim)" }}><Ic size={16} /></a>
              ))}
            </div>
          </div>
          {cols.map(([h, items]) => (
            <div key={h}>
              <p style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: "var(--ink)", marginBottom: 14 }}>{h}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((it) => <a key={it} href="#" style={{ fontSize: 13.5, color: "var(--faint)", transition: "color .2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--faint)")}>{it}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 44, paddingTop: 22, borderTop: "1px solid var(--border)", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12.5, color: "var(--faint)" }}>© 2026 ApexOps · AI Logistics Intelligence · Doha, Qatar</p>
          <p style={{ fontSize: 12.5, color: "var(--faint)" }}>Privacy · Terms · API Access</p>
        </div>
      </div>
    </footer>
  );
}

export default function Site() {
  return (
    <>
      <div className="aurora" />
      <Scene3D />
      <div className="grid-bg" />
      <Nav />
      <main style={{ position: "relative" }}>
        <Hero />
        <TrustMarquee />
        <Showcase />
        <Features />
        <Automation />
        <SocialProof />
        <Demo />
        <Pricing />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
