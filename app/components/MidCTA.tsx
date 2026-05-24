"use client";

import { ORANGE, GREEN, TEXT_MUTED, CREAM, BORDER } from "../constants/theme";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { track } from "../lib/mixpanel";

gsap.registerPlugin(ScrollToPlugin);

export default function MidCTA({ isCreator }: { isCreator: boolean }) {
  const ref = useScrollReveal();

  const handleClick = () => {
    track("CTA Clicked", { location: "mid-page", action: isCreator ? "get_early_access" : "start_earning" });
    gsap.to(window, {
      duration: 1,
      ease: "power3.inOut",
      scrollTo: { y: "#waitlist", offsetY: 80 },
    });
  };

  return (
    <section
      ref={ref as any}
      className="landing-section-pad--midcta"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="reveal"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "20px 32px",
          borderRadius: 50,
          border: `1.5px solid ${BORDER}`,
          background: "rgba(20,20,20,0.6)",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 14, color: TEXT_MUTED }}>
          {isCreator ? (
            <>Sounds like you? Join <span style={{ color: CREAM, fontWeight: 600 }}>320+ creators</span> already on the list.</>
          ) : (
            <>Ready to start earning? <span style={{ color: CREAM, fontWeight: 600 }}>180+ clippers</span> are already clipping.</>
          )}
        </span>
        <button
          onClick={handleClick}
          className={`cta-pill ${isCreator ? "accent" : "accent-green"}`}
          style={{ height: 38, fontSize: 13, fontWeight: 700, padding: "0 20px" }}
        >
          {isCreator ? "Get Early Access" : "Start Earning"}
        </button>
      </div>
    </section>
  );
}
