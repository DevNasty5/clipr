"use client";

import { ORANGE, CREAM, BORDER, TEXT_MUTED } from "../constants/theme";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: `2px solid ${BORDER}`,
        padding: "28px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontWeight: 800,
          fontSize: 18,
          letterSpacing: -0.8,
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: CREAM,
        }}
      >
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: ORANGE }} />
        clipr
      </div>
      <p style={{ fontSize: 12, color: TEXT_MUTED, margin: 0 }}>
        © 2026 Clipr · India&apos;s Creator Campaign Network
      </p>
      <p style={{ fontSize: 12, color: TEXT_MUTED, margin: 0 }}>
        Made with ❤️ in India
      </p>
    </footer>
  );
}
