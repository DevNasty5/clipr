"use client";

import { useEffect, useState } from "react";
import { BORDER, TEXT_PRIMARY, TEXT_SECONDARY, ORANGE } from "../constants/theme";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { track } from "../lib/mixpanel";

gsap.registerPlugin(ScrollToPlugin);

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollToWaitlist = () => {
    track("CTA Clicked", { location: "navbar", action: "join_waitlist" });
    gsap.to(window, {
      duration: 1,
      ease: "power3.inOut",
      scrollTo: { y: "#waitlist", offsetY: 80 },
    });
  };

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "For Creators", href: "#for-whom" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "Anti-Fraud", href: "#anti-fraud" },
  ];

  const outerPadH = isMobile ? 10 : 24;
  const navPad = scrolled
    ? `0 ${isMobile ? 12 : 48}px`
    : isMobile
      ? "0 12px"
      : "0 6px 0 20px";
  const linkPad = isMobile ? "4px 8px" : "4px 11px";
  const linkSize = isMobile ? 12 : 13;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        padding: scrolled ? "0" : `14px ${outerPadH}px 0`,
        transition: "padding .5s cubic-bezier(0.22,1,0.36,1)",
        pointerEvents: "none",
        boxSizing: "border-box",
        maxWidth: "100vw",
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? 6 : 8,
          padding: navPad,
          height: scrolled ? 54 : 46,
          width: "100%",
          maxWidth: scrolled ? "min(100%, 100vw)" : 680,
          minWidth: 0,
          boxSizing: "border-box",
          background: "rgba(13,13,13,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: scrolled ? 0 : 50,
          border: `1px solid ${scrolled ? BORDER : "rgba(255,255,255,0.08)"}`,
          borderTop: scrolled ? "none" : undefined,
          boxShadow: scrolled
            ? "0 1px 0 rgba(255,255,255,0.03)"
            : "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
          transition: "max-width .5s cubic-bezier(0.22,1,0.36,1), border-radius .5s cubic-bezier(0.22,1,0.36,1), height .5s cubic-bezier(0.22,1,0.36,1), padding .5s cubic-bezier(0.22,1,0.36,1), box-shadow .5s cubic-bezier(0.22,1,0.36,1), border-color .5s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "auto",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: -0.8,
            display: "flex",
            alignItems: "center",
            gap: 7,
            color: TEXT_PRIMARY,
            flexShrink: 0,
            cursor: "pointer",
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: ORANGE }} />
          clipr
        </div>

        {/* Nav links — scroll on narrow widths so bar never overflows */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            justifyContent: isMobile ? "flex-start" : "center",
          }}
        >
          <div
            className="navbar-links-scroll"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              maxWidth: "100%",
              overflowX: "auto",
              overscrollBehaviorX: "contain",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                padding: linkPad,
                borderRadius: 50,
                fontSize: linkSize,
                fontWeight: 500,
                color: TEXT_SECONDARY,
                textDecoration: "none",
                letterSpacing: "-0.03em",
                transition: "color .15s, background .15s",
                background: "transparent",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.color = TEXT_PRIMARY;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = TEXT_SECONDARY;
              }}
            >
              {link.label}
            </a>
          ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleScrollToWaitlist}
          style={{
            background: ORANGE,
            color: "#000",
            border: "none",
            borderRadius: 50,
            padding: isMobile ? "0 12px" : "0 16px",
            height: 32,
            fontSize: isMobile ? 11 : 12,
            fontWeight: 700,
            cursor: "pointer",
            flexShrink: 0,
            transition: "background .15s",
            letterSpacing: "-0.02em",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#fb923c"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = ORANGE; }}
        >
          Join Waitlist
        </button>
      </nav>
    </div>
  );
}
