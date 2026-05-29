"use client";

import { CREAM, ORANGE, TEXT_SECONDARY } from "../constants/theme";
import WaitlistForm from "./WaitlistForm";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function WaitlistSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="landing-section-pad--waitlist"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div className="section-badge reveal" style={{ marginBottom: 28 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: ORANGE, animation: "pulse 1.8s ease infinite" }} />
          Limited early spots
        </div>

        <h2 className="reveal" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,34px)", letterSpacing: "-0.05em", lineHeight: "120%", color: CREAM, margin: "0 0 12px" }}>
          Get in before
          <br />
          <span style={{ color: ORANGE }}>everyone else does</span>
        </h2>
        <p style={{ fontSize: 15, color: TEXT_SECONDARY, marginBottom: 40, lineHeight: 1.65 }}>
          No passwords. One short form — add your channel links if you want; they&apos;re optional but help us prioritize serious creators.
        </p>

        {/* Form card */}
        <div className="antigrid-card no-hover" style={{ padding: "32px 28px", textAlign: "left" }}>
          {/* Top accent line */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "45%", height: 1, background: `linear-gradient(90deg,transparent,${ORANGE},transparent)` }} />
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
