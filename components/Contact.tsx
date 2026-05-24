"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Mail, MapPin, Phone, ExternalLink, ChevronRight, Send, CheckCircle2, RotateCcw } from "lucide-react";

/* ── Icons ── */
const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ── Typewriter hook ── */
function useTypewriter(text: string, speed = 35) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return { displayed, done };
}

/* ── Confetti burst (canvas) ── */
function ConfettiBurst({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!active) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 80 }, () => ({
      x: canvas.width / 2, y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.9) * 12,
      color: ["#00dc82","#6366f1","#f59e0b","#ec4899","#fff"][Math.floor(Math.random()*5)],
      r: Math.random() * 5 + 2,
      life: 1,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.life -= 0.015;
        if (p.life <= 0) continue;
        alive = true;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (alive) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [active]);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 20 }} />;
}

/* ── Step config ── */
const STEPS = [
  { key: "name", label: "Step 01", prompt: "Could you share your name?", placeholder: "Your full name", type: "text", icon: "🧑‍💼" },
  { key: "email", label: "Step 02", prompt: "Where should I reach you back?", placeholder: "you@example.com", type: "email", icon: "📨" },
  { key: "subject", label: "Step 03", prompt: "What is this regarding?", placeholder: "Project, role, collab, etc.", type: "text", icon: "🎯" },
  { key: "message", label: "Step 04", prompt: "Share the details of your message.", placeholder: "Tell me about your requirements...", type: "textarea", icon: "✍️" },
] as const;

type StepKey = "name" | "email" | "subject" | "message";
type Phase = "intro" | StepKey | "sending" | "success" | "error";

export default function Contact() {
  const { dark } = useTheme();
  const bg = dark ? "#0d1117" : "#f8fafc";
  const cardBg = dark ? "#0f1923" : "#ffffff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const textMain = dark ? "#ffffff" : "#0f172a";
  const textMuted = dark ? "#94a3b8" : "#64748b";
  const panelGlow = dark ? "0 24px 60px rgba(0,0,0,0.35)" : "0 24px 60px rgba(2,8,23,0.12)";
  const hudBg = dark ? "rgba(255,255,255,0.03)" : "rgba(15,23,42,0.03)";
  const inputBg = dark ? "rgba(0,220,130,0.05)" : "rgba(0,220,130,0.06)";
  const softPanel = dark ? "rgba(148,163,184,0.08)" : "rgba(15,23,42,0.06)";

  const [phase, setPhase] = useState<Phase>("intro");
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });
  const [confetti, setConfetti] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const stepIdx = ["name", "email", "subject", "message"].indexOf(phase);
  const progress = phase === "intro" ? 0 : phase === "success" || phase === "sending" ? 100 : Math.round(((stepIdx + 1) / 4) * 100);

  const currentStep = STEPS.find(s => s.key === phase);
  const { displayed: typedPrompt, done: promptDone } = useTypewriter(currentStep?.prompt ?? "", 38);

  // Auto-focus input when step changes
  useEffect(() => {
    if (inputRef.current && promptDone) inputRef.current.focus();
  }, [promptDone, phase]);

  const advance = useCallback(() => {
    if (phase === "intro") { setPhase("name"); return; }
    const val = fields[phase as StepKey].trim();
    if (!val) return;
    if (phase === "name") setPhase("email");
    else if (phase === "email") setPhase("subject");
    else if (phase === "subject") setPhase("message");
    else if (phase === "message") submit();
  }, [phase, fields]);

  const submit = async () => {
    setPhase("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fields.name, email: fields.email, subject: fields.subject, message: fields.message }),
      });
      if (!res.ok) throw new Error();
      setPhase("success");
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
    } catch {
      setPhase("error");
    }
  };

  const reset = () => {
    setPhase("intro");
    setFields({ name: "", email: "", subject: "", message: "" });
    setConfetti(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && phase !== "message") { e.preventDefault(); advance(); }
    if (e.key === "Enter" && e.ctrlKey && phase === "message") { e.preventDefault(); advance(); }

  };

  const goBack = () => {
    if (phase === "name") setPhase("intro");
    else if (phase === "email") setPhase("name");
    else if (phase === "subject") setPhase("email");
    else if (phase === "message") setPhase("subject");
  };

  const socials = [
    { icon: <Mail size={20} />, label: "Email", value: "jatinagg2001@gmail.com", href: "mailto:jatinagg2001@gmail.com", color: "#00dc82" },
    { icon: <GithubIcon />, label: "GitHub", value: "github.com/jatin-1305", href: "https://github.com/jatin-1305", color: dark ? "#e2e8f0" : "#334155" },
    { icon: <LinkedinIcon />, label: "LinkedIn", value: "jatin-aggarwal-130501", href: "https://www.linkedin.com/in/jatin-aggarwal-130501/", color: "#0077b5" },
    { icon: <Phone size={20} />, label: "Phone", value: "+91 9646124116", href: "tel:+919646124116", color: "#f59e0b" },
    // { icon: <YoutubeIcon />, label: "YouTube", value: "@pratyakshbharadwaj", href: "https://www.youtube.com/@pratyakshbharadwaj", color: "#ff0000" },
  ];

  return (
    <section id="contact" className="spotlight-section section-pad" style={{ background: bg, position: "relative" }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "#00dc82",
          filter: "blur(120px)",
          opacity: dark ? 0.12 : 0.1,
          top: 40,
          left: "8%",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "#6366f1",
          filter: "blur(120px)",
          opacity: dark ? 0.1 : 0.09,
          bottom: 20,
          right: "8%",
          pointerEvents: "none",
        }}
      />
      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ color: "#00dc82", fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>06.</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(0,220,130,0.3), transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 16, color: textMain }}>
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p style={{ fontSize: 16, color: textMuted, marginBottom: 48, maxWidth: 560, lineHeight: 1.7 }}>
            Tell me a little about your project, role, or collaboration idea. I usually reply within 24 hours with next steps.
          </p>
        </motion.div>

        <div className="grid-contact">

          {/* ── GAME FORM ── */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="tilt-card glow-card"
            style={{
              borderRadius: 22,
              background: dark ? "linear-gradient(180deg, rgba(15,25,35,0.9), rgba(11,20,29,0.94))" : cardBg,
              border: `1px solid ${cardBorder}`,
              boxShadow: panelGlow,
              backdropFilter: "blur(12px)",
              position: "relative",
              overflow: "hidden",
              minHeight: 420
            }}
          >
            <ConfettiBurst active={confetti} />
            <div className="tilt-shine" />
            <div aria-hidden style={{ position: "absolute", top: -80, right: -80, width: 180, height: 180, borderRadius: "50%", background: "rgba(0,220,130,0.12)", filter: "blur(40px)", pointerEvents: "none" }} />
            <div aria-hidden style={{ position: "absolute", bottom: -110, left: -90, width: 220, height: 220, borderRadius: "50%", background: "rgba(99,102,241,0.1)", filter: "blur(55px)", pointerEvents: "none" }} />

            {/* Top bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #00dc82, #6366f1, transparent)" }} />

            {/* HUD bar */}
            <div style={{ padding: "18px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              {/* XP bar */}
              <div style={{ flex: 1, padding: "10px 12px", borderRadius: 12, background: hudBg, border: `1px solid ${cardBorder}` }}>
                <div style={{ fontSize: 9, fontFamily: "monospace", fontWeight: 700, color: textMuted, letterSpacing: "1px", marginBottom: 5, textTransform: "uppercase" }}>
                  Completion
                </div>
                <div style={{ height: 6, borderRadius: 10, background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)", overflow: "hidden" }}>
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ height: "100%", borderRadius: 10, background: "linear-gradient(90deg, #00dc82, #6366f1)" }}
                  />
                </div>
              </div>
              {/* Score */}
              <div style={{ textAlign: "right", flexShrink: 0, minWidth: 76, padding: "10px 12px", borderRadius: 12, background: hudBg, border: `1px solid ${cardBorder}` }}>
                <div style={{ fontSize: 9, fontFamily: "monospace", fontWeight: 700, color: textMuted, letterSpacing: "1px", textTransform: "uppercase" }}>Status</div>
                <motion.div
                  key={progress}
                  initial={{ scale: 1.12, color: "#00dc82" }}
                  animate={{ scale: 1, color: "#00dc82" }}
                  transition={{ duration: 0.3 }}
                  style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 900, color: "#00dc82" }}
                >
                  {progress}%
                </motion.div>
              </div>
            </div>

            {/* Content area */}
            <div style={{ padding: "24px 24px 28px" }}>
              <AnimatePresence mode="wait">

                {/* ── INTRO ── */}
                {phase === "intro" && (
                  <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: "#00dc82", letterSpacing: "2px", marginBottom: 20, textTransform: "uppercase" }}>
                      &gt; QUICK INTRO
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 13, color: textMuted, lineHeight: 1.9, marginBottom: 28 }}>
                      <span style={{ color: textMuted }}>— 4 short steps</span><br />
                      <span style={{ color: textMuted }}>— takes under 1 minute</span><br />
                      <span style={{ color: textMuted }}>— direct response via email</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                      {STEPS.map((s) => (
                        <div key={s.key} className="glow-card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: `1px solid ${cardBorder}` }}>
                          <span style={{ fontSize: 18 }}>{s.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, color: "#6366f1", letterSpacing: "1px" }}>{s.label}</div>
                            <div style={{ fontSize: 13, color: textMuted }}>{s.prompt}</div>
                          </div>
                          <ChevronRight size={15} color="#00dc82" />
                        </div>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={advance}
                      className="magnetic"
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 28px", borderRadius: 14, fontSize: 15, fontWeight: 800, background: "linear-gradient(135deg, #00dc82, #6366f1)", color: "#fff", border: "none", cursor: "none", fontFamily: "monospace", letterSpacing: "1px" }}
                    >
                      <Send size={16} /> Start Contact <ChevronRight size={16} />
                    </motion.button>
                  </motion.div>
                )}

                {/* ── STEPS ── */}
                {(phase === "name" || phase === "email" || phase === "subject" || phase === "message") && (
                  <motion.div key={phase} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35, ease: "easeOut" }}>
                    {/* Level label */}
                    <div style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, color: "#6366f1", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10 }}>
                      {currentStep?.label} {stepIdx >= 0 ? `• ${stepIdx + 1}/4` : ""}
                    </div>

                    {/* Typewriter prompt */}
                    <div style={{ fontSize: 20, fontWeight: 800, color: textMain, marginBottom: 24, minHeight: 56, lineHeight: 1.4 }}>
                      {typedPrompt}
                      <span className="animate-blink" style={{ color: "#00dc82", marginLeft: 2 }}>▌</span>
                    </div>

                    {/* Previously filled fields (summary) */}
                    {(() => {
                      const p = phase as string;
                      return (
                        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
                          {(p === "email" || p === "subject" || p === "message") && (
                            <div style={{ fontFamily: "monospace", fontSize: 12, color: textMuted }}>
                              <span style={{ color: "#00dc82" }}>✓ </span>name: <span style={{ color: textMain }}>{fields.name}</span>
                            </div>
                          )}
                          {(p === "subject" || p === "message") && (
                            <div style={{ fontFamily: "monospace", fontSize: 12, color: textMuted }}>
                              <span style={{ color: "#00dc82" }}>✓ </span>email: <span style={{ color: textMain }}>{fields.email}</span>
                            </div>
                          )}
                          {p === "message" && (
                            <div style={{ fontFamily: "monospace", fontSize: 12, color: textMuted }}>
                              <span style={{ color: "#00dc82" }}>✓ </span>subject: <span style={{ color: textMain }}>{fields.subject}</span>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Input */}
                    {phase !== "message" ? (
                      <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        type={currentStep?.type ?? "text"}
                        value={fields[phase]}
                        onChange={e => setFields(f => ({ ...f, [phase]: e.target.value }))}
                        onKeyDown={onKey}
                        placeholder={currentStep?.placeholder}
                        style={{
                          width: "100%", padding: "14px 16px", borderRadius: 12, fontSize: 15, fontFamily: "monospace", fontWeight: 600,
                          background: inputBg,
                          border: `1.5px solid ${fields[phase] ? "#00dc82" : dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                          color: textMain, outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
                          boxShadow: fields[phase] ? "0 0 0 3px rgba(0,220,130,0.12)" : "none",
                          marginBottom: 20,
                        }}
                      />
                    ) : (
                      <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={fields.message}
                        onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
                        onKeyDown={onKey}
                        placeholder={currentStep?.placeholder}
                        rows={4}
                        style={{
                          width: "100%", padding: "14px 16px", borderRadius: 12, fontSize: 14, fontFamily: "monospace", fontWeight: 500, resize: "vertical",
                          background: inputBg,
                          border: `1.5px solid ${fields.message ? "#00dc82" : dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                          color: textMain, outline: "none", lineHeight: 1.6, transition: "border-color 0.2s, box-shadow 0.2s",
                          boxShadow: fields.message ? "0 0 0 3px rgba(0,220,130,0.12)" : "none",
                          marginBottom: 6,
                        }}
                      />
                    )}

                    {phase === "message" && (
                      <div style={{ fontFamily: "monospace", fontSize: 11, color: textMuted, marginBottom: 18 }}>
                        Press Ctrl + Enter to send
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={goBack}
                        style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", borderRadius: 12,
                          fontSize: 13, fontWeight: 700, fontFamily: "monospace", letterSpacing: "0.4px",
                          background: dark ? "rgba(255,255,255,0.06)" : "#e2e8f0",
                          color: textMuted,
                          border: `1px solid ${cardBorder}`,
                          cursor: "none",
                          transition: "all 0.2s",
                        }}
                      >
                        ← BACK
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: fields[phase].trim() ? 1.04 : 1 }}
                        whileTap={{ scale: fields[phase].trim() ? 0.96 : 1 }}
                        onClick={advance}
                        disabled={!fields[phase].trim()}
                        style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12,
                          fontSize: 14, fontWeight: 800, fontFamily: "monospace", letterSpacing: "0.5px",
                          background: fields[phase].trim() ? "linear-gradient(135deg, #00dc82, #6366f1)" : dark ? "rgba(255,255,255,0.06)" : "#e2e8f0",
                          color: fields[phase].trim() ? "#fff" : textMuted,
                          border: "none", cursor: fields[phase].trim() ? "none" : "default",
                          transition: "all 0.2s",
                          boxShadow: fields[phase].trim() ? "0 10px 24px rgba(0,220,130,0.28)" : "none",
                        }}
                      >
                        {phase === "message" ? <><Send size={14} /> SEND MESSAGE</> : <><ChevronRight size={14} /> CONTINUE</>}
                      </motion.button>
                      {phase !== "name" && (
                        <div style={{ fontSize: 11, fontFamily: "monospace", color: textMuted }}>
                          {phase !== "message" ? "or press Enter" : ""}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ── SENDING ── */}
                {phase === "sending" && (
                  <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: "center", padding: "40px 0" }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{ width: 48, height: 48, borderRadius: "50%", border: "3px solid rgba(0,220,130,0.2)", borderTopColor: "#00dc82", margin: "0 auto 24px" }}
                    />
                    <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: "#00dc82", letterSpacing: "2px" }}>TRANSMITTING…</div>
                  </motion.div>
                )}

                {/* ── SUCCESS ── */}
                {phase === "success" && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, type: "spring" }} style={{ textAlign: "center", padding: "32px 0" }}>
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                      style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}
                    >
                      <CheckCircle2 size={64} color="#00dc82" />
                    </motion.div>
                    <div style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: "#6366f1", letterSpacing: "3px", marginBottom: 10 }}>MESSAGE SENT</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: textMain, marginBottom: 8 }}>Message delivered!</div>
                    <div style={{ fontSize: 14, color: textMuted, marginBottom: 4 }}>I&apos;ll get back to you soon, {fields.name}.</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 16px", borderRadius: 20, background: "rgba(0,220,130,0.1)", border: "1px solid rgba(0,220,130,0.25)", marginBottom: 28 }}>
                      <CheckCircle2 size={13} color="#00dc82" />
                      <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 800, color: "#00dc82" }}>Thanks for reaching out</span>
                    </div>
                    <div>
                      <motion.button
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        onClick={reset}
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 12, fontSize: 13, fontWeight: 700, fontFamily: "monospace", background: dark ? "rgba(255,255,255,0.07)" : "#f1f5f9", color: textMuted, border: "none", cursor: "none" }}
                      >
                        <RotateCcw size={13} /> Play Again
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* ── ERROR ── */}
                {phase === "error" && (
                  <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "32px 0" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
                    <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: "#ec4899", letterSpacing: "1px", marginBottom: 12 }}>MESSAGE FAILED</div>
                    <div style={{ fontSize: 14, color: textMuted, marginBottom: 24 }}>Something went wrong. Try again?</div>
                    <motion.button
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={() => setPhase("message")}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 12, fontSize: 14, fontWeight: 700, background: "#00dc82", color: "#000", border: "none", cursor: "none", fontFamily: "monospace" }}
                    >
                      <RotateCcw size={14} /> TRY AGAIN
                    </motion.button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── SOCIAL LINKS ── */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="tilt-card glow-card" style={{ padding: "16px 16px", borderRadius: 14, border: `1px solid ${cardBorder}`, background: dark ? "linear-gradient(180deg, rgba(15,25,35,0.92), rgba(11,20,29,0.96))" : "linear-gradient(180deg, #ffffff, #f8fafc)", position: "relative", overflow: "hidden", boxShadow: panelGlow }}>
              <div className="tilt-shine" />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #00dc82, #6366f1, transparent)" }} />
              <div aria-hidden style={{ position: "absolute", right: -24, top: -24, width: 80, height: 80, borderRadius: "50%", background: "rgba(0,220,130,0.16)", filter: "blur(20px)", pointerEvents: "none" }} />
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", color: "#6366f1", textTransform: "uppercase", marginBottom: 6 }}>
                Contact Channels
              </div>
              <div style={{ fontSize: 13, color: textMuted, marginBottom: 10 }}>
                Reach out through any of the options below and I&apos;ll respond quickly.
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 11px", borderRadius: 999, background: "rgba(0,220,130,0.12)", border: "1px solid rgba(0,220,130,0.26)" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00dc82", boxShadow: "0 0 0 6px rgba(0,220,130,0.18)" }} />
                <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", color: "#00dc82", letterSpacing: "0.3px" }}>AVAILABLE FOR WORK</span>
              </div>
            </div>

            <div className="tilt-card glow-card" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, borderRadius: 12, padding: "10px 12px", border: `1px solid ${cardBorder}`, background: softPanel, position: "relative", overflow: "hidden" }}>
              <div className="tilt-shine" />
              <MapPin size={13} color="#00dc82" />
              <span style={{ fontSize: 13, color: textMuted }}>Bengaluru, India · Open to remote</span>
            </div>

            {socials.map(({ icon, label, value, href, color }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="tilt-card glow-card"
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 22px", borderRadius: 16, background: cardBg, border: `1px solid ${cardBorder}`, textDecoration: "none", position: "relative", overflow: "hidden" }}>
                <div className="tilt-shine" />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${color}, transparent)` }} />
                <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: `${color}15`, color }}>
                  {icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: textMuted, marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: textMain, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
                </div>
                <ExternalLink size={14} color={textMuted} style={{ flexShrink: 0, opacity: 0.85 }} />
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
