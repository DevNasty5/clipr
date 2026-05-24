"use client";

import { ORANGE, CREAM, GREEN, BORDER, TEXT_SECONDARY, TEXT_MUTED } from "../constants/theme";
import { useState } from "react";
import { track } from "../lib/mixpanel";

const SCALE_OPTIONS = [
  { value: "under_10k", label: "Under 10k" },
  { value: "10k_100k", label: "10k – 100k" },
  { value: "100k_1m", label: "100k – 1M" },
  { value: "1m_plus", label: "1M+" },
] as const;

export default function WaitlistForm() {
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");
  const [role, setRole] = useState<"" | "creator" | "clipper">("");
  const [clipPeakViews, setClipPeakViews] = useState("");
  const [creatorChannelSize, setCreatorChannelSize] = useState("");
  const [err, setErr] = useState<"" | "name" | "email" | "role" | "proof">("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (!name.trim()) { setErr("name"); track("Waitlist Form Error", { field: "name" }); return; }
    if (!email.trim() || !email.includes("@")) { setErr("email"); track("Waitlist Form Error", { field: "email" }); return; }
    if (!role) { setErr("role"); track("Waitlist Form Error", { field: "role" }); return; }
    if (role === "clipper" && !clipPeakViews) { setErr("proof"); track("Waitlist Form Error", { field: "proof", reason: "clipper_views" }); return; }
    if (role === "creator" && !creatorChannelSize) { setErr("proof"); track("Waitlist Form Error", { field: "proof", reason: "creator_size" }); return; }

    track("Waitlist Form Submitted", { role, hasYoutube: !!youtube.trim(), hasInstagram: !!instagram.trim() });
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role,
          youtube: youtube.trim() || undefined,
          instagram: instagram.trim() || undefined,
          clipPeakViews: role === "clipper" ? clipPeakViews : undefined,
          creatorChannelSize: role === "creator" ? creatorChannelSize : undefined,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      track("Waitlist Form Success", { role });
      setDone(true);
    } catch (error) {
      track("Waitlist Form API Error", { role, error: String(error) });
      setErr("email");
    } finally {
      setSubmitting(false);
    }
  }

  const optionalFieldStyle: React.CSSProperties = {
    width: "100%",
    background: "#171717",
    border: `2px solid ${BORDER}`,
    borderRadius: 10,
    padding: "13px 14px",
    color: CREAM,
    fontFamily: "inherit",
    fontSize: 15,
    outline: "none",
    transition: "border-color .15s",
  };

  const fieldStyle = (id: "name" | "email" | "role" | "proof"): React.CSSProperties => ({
    width: "100%",
    background: "#171717",
    border: `2px solid ${err === id ? "rgba(255,71,88,0.5)" : BORDER}`,
    borderRadius: 10,
    padding: "13px 14px",
    color: CREAM,
    fontFamily: "inherit",
    fontSize: 15,
    outline: "none",
    transition: "border-color .15s",
    boxShadow: err === id ? "0 0 0 3px rgba(255,71,88,0.08)" : "none",
  });

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.18)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
          <svg width="24" height="24" viewBox="0 0 26 26" fill="none"><path d="M4 13l5 5 13-11" stroke={ORANGE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 8, color: CREAM, letterSpacing: -0.5 }}>
          You&apos;re on the list!
        </div>
        <div style={{ fontSize: 14, color: TEXT_SECONDARY, lineHeight: 1.65 }}>
          We&apos;ll reach out personally when your niche goes live.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <input type="text" placeholder="Your name" value={name} onChange={(e) => { setName(e.target.value); setErr(""); }} style={fieldStyle("name")} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <input type="email" placeholder="Email or WhatsApp number" value={email} onChange={(e) => { setEmail(e.target.value); setErr(""); }} style={fieldStyle("email")} />
      </div>
      <div style={{ marginBottom: 6 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_MUTED, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
          Your channels <span style={{ fontWeight: 500, textTransform: "none", letterSpacing: "normal", color: TEXT_SECONDARY }}>(optional)</span>
        </div>
        <div style={{ marginBottom: 8 }}>
          <input
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="YouTube — channel URL or @handle"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            style={optionalFieldStyle}
          />
        </div>
        <div style={{ marginBottom: 4 }}>
          <input
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="Instagram — @handle or profile URL"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            style={optionalFieldStyle}
          />
        </div>
        <p style={{ fontSize: 12, color: TEXT_MUTED, lineHeight: 1.5, margin: 0 }}>
          Share if you&apos;re building an audience — it helps us match you to the right beta cohort.
        </p>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: TEXT_MUTED, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
          Joining as
        </label>
        <select
          value={role}
          onChange={(e) => {
            const v = e.target.value as "" | "creator" | "clipper";
            setRole(v);
            setClipPeakViews("");
            setCreatorChannelSize("");
            setErr("");
          }}
          style={{ ...fieldStyle("role"), WebkitAppearance: "none", cursor: "pointer", color: role ? CREAM : TEXT_MUTED }}
        >
          <option value="" disabled>Select one…</option>
          <option value="creator">Creator / brand — I publish original content</option>
          <option value="clipper">Clipper — I edit &amp; post short clips</option>
        </select>
      </div>

      {role === "clipper" && (
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: TEXT_MUTED, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
            Proof of skill
          </label>
          <p style={{ fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.5, margin: "0 0 8px" }}>
            What&apos;s the most views a <strong style={{ color: CREAM, fontWeight: 600 }}>single clip</strong> of yours has ever gotten?
          </p>
          <select
            value={clipPeakViews}
            onChange={(e) => { setClipPeakViews(e.target.value); setErr(""); }}
            style={{ ...fieldStyle("proof"), WebkitAppearance: "none", cursor: "pointer", color: clipPeakViews ? CREAM : TEXT_MUTED }}
          >
            <option value="" disabled>Choose your best-performing clip…</option>
            {SCALE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <p style={{ fontSize: 11, color: TEXT_MUTED, margin: "8px 0 0", lineHeight: 1.45 }}>
            We invite the strongest clippers first — 1M+ cohort gets beta access earliest.
          </p>
        </div>
      )}

      {role === "creator" && (
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: TEXT_MUTED, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
            Your reach
          </label>
          <p style={{ fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.5, margin: "0 0 8px" }}>
            Roughly how many <strong style={{ color: CREAM, fontWeight: 600 }}>subscribers or followers</strong> does your main channel have today?
          </p>
          <select
            value={creatorChannelSize}
            onChange={(e) => { setCreatorChannelSize(e.target.value); setErr(""); }}
            style={{ ...fieldStyle("proof"), WebkitAppearance: "none", cursor: "pointer", color: creatorChannelSize ? CREAM : TEXT_MUTED }}
          >
            <option value="" disabled>Choose the closest range…</option>
            {SCALE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <p style={{ fontSize: 11, color: TEXT_MUTED, margin: "8px 0 0", lineHeight: 1.45 }}>
            Larger channels get priority for early creator seats — we match bounty supply to demand.
          </p>
        </div>
      )}

      <p style={{ fontSize: 12, color: TEXT_MUTED, textAlign: "center", lineHeight: 1.55, margin: "0 0 14px" }}>
        <span style={{ color: TEXT_SECONDARY }}>Early beta:</span> 100% of bounties go to clippers.
      </p>

      <button onClick={submit} disabled={submitting} className="cta-pill accent" style={{ width: "100%", height: 52, justifyContent: "center", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700, fontSize: 16, opacity: submitting ? 0.6 : 1 }}>
        {submitting ? "Submitting…" : "Claim My Spot"}
        {!submitting && <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </button>

      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
        {["No spam", "Free to join", "India-first"].map((t, i) => (
          <span key={i} style={{ fontSize: 11, color: TEXT_SECONDARY, display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke={GREEN} strokeWidth="1.4" strokeLinecap="round" /></svg>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
