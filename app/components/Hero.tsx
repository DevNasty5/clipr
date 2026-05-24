"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CREAM, GREEN, ORANGE, BG, TEXT_SECONDARY, TEXT_MUTED, BORDER } from "../constants/theme";
import { track } from "../lib/mixpanel";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

type Props = {
  role: "creator" | "clipper";
  onRoleChange: (role: "creator" | "clipper") => void;
};

export default function Hero({ role, onRoleChange }: Props) {
  const isCreator = role === "creator";
  const sectionRef = useRef<HTMLElement>(null);

  const handleScrollToWaitlist = () => {
    track("CTA Clicked", { location: "hero", action: "join_waitlist" });
    gsap.to(window, {
      duration: 1,
      ease: "power3.inOut",
      scrollTo: { y: "#waitlist", offsetY: 80 },
    });
  };

  // Hero entrance animation — plays on mount
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-toggle", { y: 20, opacity: 0, duration: 0.6 })
        .from(".hero-headline", { y: 40, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-mocks", { y: 60, opacity: 0, scale: 0.96, duration: 0.9 }, "-=0.3");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 100px",
        textAlign: "center",
        overflow: "hidden",
        background: BG,
      }}
    >
      {/* Subtle radial glow at top */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120%",
          height: "80%",
          background: isCreator
            ? "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(249,115,22,0.06) 0%, transparent 70%)"
            : "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(122,255,120,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          transition: "background 0.6s ease",
        }}
      />

      {/* Role toggle — pill-shaped like Mastra's nav pills */}
      <div
        className="hero-toggle"
        style={{
          display: "inline-flex",
          background: "#141414",
          border: `2px solid ${BORDER}`,
          borderRadius: 50,
          padding: 4,
          gap: 0,
          marginBottom: 48,
          position: "relative",
          zIndex: 2,
        }}
      >
        {[
          { id: "creator" as const, label: "I'm a Creator" },
          { id: "clipper" as const, label: "I'm a Clipper" },
        ].map((r) => (
          <button
            key={r.id}
            onClick={() => {
              track("Role Toggled", { role: r.id });
              onRoleChange(r.id);
            }}
            style={{
              padding: "10px 24px",
              borderRadius: 50,
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "inherit",
              letterSpacing: "-0.02em",
              transition: "all .15s cubic-bezier(0.4,0,0.2,1)",
              background:
                role === r.id
                  ? r.id === "creator"
                    ? ORANGE
                    : GREEN
                  : "transparent",
              color: role === r.id ? "#000" : TEXT_MUTED,
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Headline — large, tight tracking, Greed/Syne style */}
      <h1
        className="hero-headline"
        style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontWeight: 800,
          fontSize: "clamp(36px, 6vw, 60px)",
          lineHeight: "110%",
          letterSpacing: "-0.05em",
          color: CREAM,
          margin: "0 0 24px",
          maxWidth: 700,
          position: "relative",
          zIndex: 2,
        }}
      >
        {isCreator ? (
          <>
            Your content, clipped &amp;{" "}
            <span style={{ color: ORANGE }}>posted everywhere</span>
          </>
        ) : (
          <>
            Clip trending creators,{" "}
            <span style={{ color: GREEN }}>earn per view</span>
          </>
        )}
      </h1>

      {/* Subheadline */}
      <p
        className="hero-sub"
        style={{
          fontSize: 17,
          color: TEXT_SECONDARY,
          lineHeight: "160%",
          maxWidth: 540,
          margin: "0 0 40px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {isCreator
          ? "Clipr is a network of verified clippers who distribute your content across every platform. You only pay for real, bot-free views."
          : "Find campaigns from top creators. Clip their best moments, post on your handles, earn per verified view — paid to UPI every week."}
      </p>

      {/* CTAs */}
      <div
        className="hero-cta"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          position: "relative",
          zIndex: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          onClick={handleScrollToWaitlist}
          className={`cta-pill ${isCreator ? "accent" : "accent-green"}`}
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontWeight: 700,
            fontSize: 15,
            height: 50,
            padding: "0 32px",
          }}
        >
          Join the Waitlist
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <a
          href="#how-it-works"
          onClick={() => track("CTA Clicked", { location: "hero", action: "see_how_it_works" })}
          className="cta-pill"
          style={{
            fontSize: 14,
            fontWeight: 500,
            height: 50,
            padding: "0 24px",
            textDecoration: "none",
          }}
        >
          See how it works
        </a>
      </div>

      {/* Social proof */}
      <div
        className="hero-cta"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          marginTop: 24,
          position: "relative",
          zIndex: 2,
          flexWrap: "wrap",
        }}
      >
        {(isCreator
          ? [
              ["320+", "creators on the waitlist"],
              ["100%", "free to join"],
              ["India", "first platform"],
            ]
          : [
              ["180+", "clippers earning already"],
              ["Weekly", "UPI payouts"],
              ["No fees", "to get started"],
            ]
        ).map(([num, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: CREAM }}>{num}</span>
            <span style={{ fontSize: 12, color: TEXT_MUTED }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Hero illustration area — the mocks */}
      <div
        className="hero-mocks"
        style={{
          marginTop: 72,
          display: "flex",
          alignItems: "flex-start",
          gap: 24,
          position: "relative",
          zIndex: 2,
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <div
          className={isCreator ? undefined : "hero-mock-hide-on-mobile"}
          style={{
            opacity: isCreator ? 1 : 0.3,
            transform: isCreator ? "scale(1)" : "scale(0.95)",
            transition: "all .4s cubic-bezier(0.4,0,0.2,1)",
            filter: isCreator ? "none" : "blur(1px)",
            flexShrink: 0,
          }}
        >
          <div style={{ maxWidth: "100%", width: "min(320px, 100vw - 48px)" }}>
            <DashboardMockInline />
          </div>
        </div>
        <div
          className={isCreator ? "hero-mock-hide-on-mobile" : undefined}
          style={{
            opacity: !isCreator ? 1 : 0.3,
            transform: !isCreator ? "scale(1)" : "scale(0.95)",
            transition: "all .4s cubic-bezier(0.4,0,0.2,1)",
            filter: !isCreator ? "none" : "blur(1px)",
            flexShrink: 0,
          }}
        >
          <div style={{ maxWidth: "100%", width: "min(280px, 100vw - 48px)" }}>
            <MobileMockInline />
          </div>
        </div>
      </div>

      {/* Radial fade overlay at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: `linear-gradient(to top, ${BG}, transparent)`,
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
    </section>
  );
}

/* ── Inline mocks (extracted from hero/DashboardMock and hero/MobileMock) ── */

function DashboardMockInline() {
  return (
    <div
      style={{
        background: "#141414",
        border: "2px solid #141414",
        borderRadius: 16,
        overflow: "hidden",
        width: "100%",
        maxWidth: 320,
        boxShadow: "7px 11px 38px 0 rgba(0,0,0,0.8)",
      }}
    >
      <div
        style={{
          background: "#171717",
          padding: "10px 16px",
          borderBottom: "1px solid #1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          fontFamily: "var(--font-geist-mono), monospace",
          color: "#939393",
        }}
      >
        <span>campaign_dashboard</span>
        <span style={{ color: "#7aff78", fontWeight: 600 }}>● LIVE</span>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 11, color: "#424242", marginBottom: 4 }}>Total Reach · Campaign #47</div>
        <div style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: 28, fontWeight: 800, color: "#f97316", lineHeight: 1, marginBottom: 6 }}>
          4,82,310
        </div>
        <div style={{ fontSize: 11, color: "#7aff78", marginBottom: 16 }}>↑ 12.4% from yesterday</div>

        {[78, 54, 91].map((w, i) => (
          <div key={i} style={{ height: 5, background: "#171717", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
            <div style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg,#f97316,#fb923c)", width: `${w}%`, animation: `growBar 1.6s ${i * 0.22}s ease forwards` }} />
          </div>
        ))}

        <svg viewBox="0 0 300 66" style={{ width: "100%", height: 66, marginTop: 12 }}>
          <defs>
            <linearGradient id="hero-g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(249,115,22,0.25)" />
              <stop offset="100%" stopColor="rgba(249,115,22,0)" />
            </linearGradient>
          </defs>
          <path d="M0,60 C25,55 50,40 80,30 C110,20 130,38 155,18 C180,0 210,6 240,2 L300,1 L300,66 L0,66Z" fill="url(#hero-g1)" />
          <path d="M0,60 C25,55 50,40 80,30 C110,20 130,38 155,18 C180,0 210,6 240,2 L300,1" fill="none" stroke="#f97316" strokeWidth="1.6" opacity="0.7" />
        </svg>
      </div>
    </div>
  );
}

function MobileMockInline() {
  const notifs = [
    { delay: "0s", txt: "Reel #3 · 42k views verified", amt: "+₹336 credited", color: "#7aff78" },
    { delay: ".35s", txt: "Short #7 · 1.1M verified", amt: "+₹1,870 credited", color: "#7aff78" },
    { delay: ".7s", txt: "UPI payout · processing", amt: "₹4,210 → Bank", color: "#f97316" },
  ];

  return (
    <div
      style={{
        background: "#141414",
        border: "2px solid #141414",
        borderRadius: 16,
        overflow: "hidden",
        width: "100%",
        maxWidth: 280,
        boxShadow: "7px 11px 38px 0 rgba(0,0,0,0.8)",
      }}
    >
      <div
        style={{
          background: "#171717",
          padding: "10px 16px",
          borderBottom: "1px solid #1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          fontFamily: "var(--font-geist-mono), monospace",
          color: "#939393",
        }}
      >
        <span>clipr · earnings</span>
        <span style={{ color: "#7aff78", fontWeight: 600 }}>₹4,210</span>
      </div>
      <div style={{ padding: 14 }}>
        {notifs.map((n, i) => (
          <div
            key={i}
            style={{
              background: "#171717",
              border: "1px solid #1a1a1a",
              borderRadius: 10,
              padding: "10px 12px",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 10,
              animation: `slideIn .4s ${n.delay} ease both`,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: n.color === "#7aff78" ? "rgba(122,255,120,0.06)" : "rgba(249,115,22,0.06)",
                border: `1px solid ${n.color === "#7aff78" ? "rgba(122,255,120,0.18)" : "rgba(249,115,22,0.18)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d={n.color === "#7aff78" ? "M2 6l2.5 2.5 5.5-5" : "M6 2v4l2.5 1.5"} stroke={n.color} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#939393" }}>{n.txt}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: n.color, fontFamily: "var(--font-montserrat), sans-serif", marginTop: 2 }}>{n.amt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
