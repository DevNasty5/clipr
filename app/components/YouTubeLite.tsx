"use client";

import { useState } from "react";
import Image from "next/image";
import { BORDER, CREAM, TEXT_MUTED } from "../constants/theme";

type Props = {
  videoId: string;
  title: string;
};

export default function YouTubeLite({ videoId, title }: Props) {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  if (isIframeLoaded) {
    return (
      <div
        style={{
          minWidth: 0,
          width: "100%",
          borderRadius: 12,
          overflow: "hidden",
          border: `1px solid ${BORDER}`,
          background: "#0a0a0a",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
          }}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>
        <div style={{ padding: "10px 12px", borderTop: `1px solid ${BORDER}` }}>
          <div
            style={{
              fontSize: 12,
              color: CREAM,
              fontWeight: 600,
              lineHeight: 1.35,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 4 }}>YouTube</div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minWidth: 0,
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${BORDER}`,
        background: "#0a0a0a",
        transition: "border-color .15s",
        cursor: "pointer",
      }}
      onClick={() => setIsIframeLoaded(true)}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a";
        if (!document.querySelector('link[href="https://www.youtube-nocookie.com"]')) {
          const link = document.createElement("link");
          link.rel = "preconnect";
          link.href = "https://www.youtube-nocookie.com";
          link.crossOrigin = "anonymous";
          document.head.appendChild(link);
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = BORDER;
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%",
          height: 0,
          overflow: "hidden",
          background: "#000",
        }}
      >
        <Image
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 68,
            height: 48,
            background: "rgba(255,0,0,0.9)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "rgb(255,0,0)";
            (e.currentTarget as HTMLDivElement).style.transform = "translate(-50%, -50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "rgba(255,0,0,0.9)";
            (e.currentTarget as HTMLDivElement).style.transform = "translate(-50%, -50%) scale(1)";
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div style={{ padding: "10px 12px", borderTop: `1px solid ${BORDER}` }}>
        <div
          style={{
            fontSize: 12,
            color: CREAM,
            fontWeight: 600,
            lineHeight: 1.35,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 4 }}>YouTube</div>
      </div>
    </div>
  );
}
