"use client";

import { useState, useSyncExternalStore } from "react";
import { CREAM, GREEN, ORANGE, BORDER, TEXT_SECONDARY, TEXT_MUTED } from "../constants/theme";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { track } from "../lib/mixpanel";

type Props = { isCreator: boolean };

/* ── SVG Icons ── */
const GamepadIcon = ({ color = "currentColor", size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="11" x2="10" y2="11" /><line x1="8" y1="9" x2="8" y2="13" />
    <line x1="15" y1="12" x2="15.01" y2="12" /><line x1="18" y1="10" x2="18.01" y2="10" />
    <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
  </svg>
);
const MicIcon = ({ color = "currentColor", size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);
const MonitorPlayIcon = ({ color = "currentColor", size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    <polygon points="10,8 10,13 14.5,10.5" fill={color} opacity="0.5" stroke="none" />
  </svg>
);
const PlayCircleIcon = ({ color = "currentColor", size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polygon points="10,8 10,16 16,12" fill={color} opacity="0.4" stroke="none" />
  </svg>
);
const NewspaperIcon = ({ color = "currentColor", size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8" /><path d="M15 18h-5" /><rect x="10" y="6" width="8" height="5" rx="1" />
  </svg>
);
const MusicIcon = ({ color = "currentColor", size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
  </svg>
);

const nicheIcons = [GamepadIcon, MicIcon, MonitorPlayIcon, PlayCircleIcon, NewspaperIcon, MusicIcon];

type NicheYoutubeClip = { id: string; title: string };

/** Accept raw 11-char id or youtu.be / watch?v= / shorts / embed URL */
function toYoutubeEmbedId(input: string): string {
  const s = input.trim();
  const fromUrl =
    s.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([\w-]{11})/i)?.[1] ??
    s.match(/^([\w-]{11})$/i)?.[1];
  return (fromUrl ?? s).slice(0, 11);
}

/**
 * Example clips per niche index (0–4), same order as creator / clipper niche tabs.
 * Use video id or full YouTube URL.
 */
const nicheYoutubeVideos: readonly NicheYoutubeClip[][] = [
  [
    { id: "niQTsITVvhQ", title: "Valorant pro clutches but they get increasingly more impossible" },
    { id: "ewOppiD9ckI", title: "Lamborghini Huracán STO & Ferrari 488 Pista | Forza Horizon 5" },
    { id: "Wb5eFbTVtAY", title: "TOP 250 Black Ops 6 WTF & Funny Moments (So Far!)" },
  ],
  [
    { id: "F7-a2kNtCR4", title: "How Varun Mayya CLONED Himself On Reels and YT Shorts Using AI" },
    { id: "loWfEFhzHxs", title: "one of the best advice I have ever heard" },
    { id: "kepWnLwMK-k", title: "Times when Beerbiceps didn't hesitate!" },
  ],
  [
    { id: "MWyigaeWsjI", title: "Indian Gaming Streamers are SOOOO Boring.." },
    { id: "gjujAdr-LNM", title: "Rachitroo on WHY Indian Streamers should SHIFT TO TWITCH" },
    { id: "F_Fya1p8TQI", title: "Try Not to Laugh Indian Streamers Edition | Streamers Epic Funniest Moments" },
  ],
  [
    { id: "JVVHdplYnss", title: "Emanuel: Iran war was Trump’s call, not Israel’s" },
    { id: "mB0czxjqeac", title: "Iran US War End Update " },
    { id: "yE5RlWXjeC4", title: "India में फिर Lockdown? 😱" },
  ],
  [
    { id: "Vqju1-9t6TM", title: "KR$NA - SENSITIVE " },
    { id: "upIK1N9q6kY", title: "Emiway bantai new song" },
    { id: "ThUgphLRGJ0", title: "No autotune needed ! 😍😍 | Daaku" },
  ],
];

function YoutubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  const id = toYoutubeEmbedId(videoId);
  const src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;

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
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = BORDER;
      }}
    >
      {/* Fixed 16:9 box so the iframe always gets height (grid/flex min-width fix) */}
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
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
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

const NICHE_PILL_MQ = "(max-width: 900px)";
const FOR_WHOM_CONTENT_MQ = "(max-width: 768px)";

function subscribeCompactNichePills(callback: () => void) {
  const mq = window.matchMedia(NICHE_PILL_MQ);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function snapshotCompactNichePills() {
  return typeof window !== "undefined" && window.matchMedia(NICHE_PILL_MQ).matches;
}

function subscribeForWhomMobileContent(callback: () => void) {
  const mq = window.matchMedia(FOR_WHOM_CONTENT_MQ);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function snapshotForWhomMobileContent() {
  return typeof window !== "undefined" && window.matchMedia(FOR_WHOM_CONTENT_MQ).matches;
}

type NicheBlock = {
  label: string;
  color: string;
  pain: string;
  fix: string;
  metric: string;
  clips: readonly string[];
  /** Shorter copy for narrow screens — pain, fix, and fewer bullets */
  mobile: { pain: string; fix: string; clips: readonly string[] };
};

export default function ForWhomSection({ isCreator }: Props) {
  const [active, setActive] = useState(0);
  const sectionRef = useScrollReveal();
  const compactNichePills = useSyncExternalStore(
    subscribeCompactNichePills,
    snapshotCompactNichePills,
    () => false,
  );
  const compactForWhomContent = useSyncExternalStore(
    subscribeForWhomMobileContent,
    snapshotForWhomMobileContent,
    () => false,
  );

  const creatorNiches: NicheBlock[] = [
    {
      label: "Gamers",
      color: "#8b5cf6",
      pain: "Your best clutch moments never get seen beyond your stream.",
      fix: "Clippers cut your highlights into Reels & Shorts. Every kill, every win — on 50 channels overnight.",
      metric: "Avg +2.4L views per campaign",
      clips: ["Best kills compilation", "Tutorial clips", "Reaction shorts", "Stream highlights"],
      mobile: {
        pain: "Your best moments rarely leave the stream.",
        fix: "Clippers ship highlights as Shorts & Reels across channels.",
        clips: ["Kill comps & tutorials", "Stream highlights"],
      },
    },
    {
      label: "Podcasters",
      color: ORANGE,
      pain: "Long-form episodes don't travel. You lose the 90% who won't watch 2 hours.",
      fix: "Clippers extract your sharpest 60-second takes and push them to the audiences who'll binge your full episodes.",
      metric: "Avg 3.1x listener growth",
      clips: ["Hot takes", "Controversial quotes", "Advice moments", "Funny exchanges"],
      mobile: {
        pain: "Long episodes miss the scrolling audience.",
        fix: "Sharp 60s cuts funnel listeners to full episodes.",
        clips: ["Hot takes", "Quotable moments"],
      },
    },
    {
      label: "Streamers",
      color: "#06b6d4",
      pain: "Your stream VODs die in 24 hours. YouTube clips help but you don't have time to edit.",
      fix: "Clippers watch your VODs, find the moments, and post them. You just keep streaming.",
      metric: "Avg 18+ clips per stream",
      clips: ["Rage moments", "Big wins", "Viewer interactions", "Hype clips"],
      mobile: {
        pain: "VODs fade fast; you can't edit it all.",
        fix: "Clippers pull moments from VODs—you keep going live.",
        clips: ["Hype & rage", "Big wins"],
      },
    },
    {
      label: "News",
      color: GREEN,
      pain: "Breaking news dies in the feed within hours. Mobile audiences are on Reels, not YouTube.",
      fix: "Set micro-bounties on breaking stories. Clippers distribute 30-second summaries to short-form audiences instantly.",
      metric: "Avg 4.8x faster reach",
      clips: ["Breaking summaries", "Expert bytes", "Live clips", "Explainers"],
      mobile: {
        pain: "Breaking stories miss short-form feeds.",
        fix: "Bounties → fast 30s cuts to Reels-scale reach.",
        clips: ["Breaking bytes", "Quick explainers"],
      },
    },
    {
      label: "Music",
      color: "#ec4899",
      pain: "New songs need viral moments. Music labels charge 2-5L for a single campaign.",
      fix: "Set a song clip bounty. Clippers make lip-sync clips, dance covers, and music moments — you pay per view.",
      metric: "Avg 8L streams per 15k",
      clips: ["Lyric moments", "Hook clips", "Dance trends", "Behind the studio"],
      mobile: {
        pain: "Organic virality is expensive via traditional promos.",
        fix: "Per-view bounties: clippers scale hooks & dance trends.",
        clips: ["Hook clips", "Trend-ready cuts"],
      },
    },
  ];

  const clipperNiches: NicheBlock[] = [
    {
      label: "Gaming",
      color: "#8b5cf6",
      pain: "Gaming clips are the easiest to make go viral — reaction hooks, clutch moments, rage edits.",
      fix: "Find gaming bounties, clip the best 30-second moments from VODs, and post on your Reels.",
      metric: "Avg 7/1k views",
      clips: ["Pick campaigns with 4hr+ VODs", "Look for clutch moments & big wins", "Short vertical cuts with hooks", "Post across Reels + Shorts"],
      mobile: {
        pain: "Gaming VODs are full of viral 30s beats.",
        fix: "Grab bounties, cut vertical hooks, post fast.",
        clips: ["Clutch & rage hooks", "Cross-post Shorts"],
      },
    },
    {
      label: "Podcasts",
      color: ORANGE,
      pain: "Podcast clips are underrated — a sharp 45-second opinion can blow up overnight.",
      fix: "Find the most opinionated or controversial moment. Clip it, add captions, post.",
      metric: "Avg 6/1k views",
      clips: ["Scan for strong opinions", "Add bold captions", "One hook in the first 3s", "Finance & tech pay highest"],
      mobile: {
        pain: "One hot take can carry a whole day of views.",
        fix: "Clip the strongest opinion; bold captions; ship.",
        clips: ["Strong opinions", "First-3s hook"],
      },
    },
    {
      label: "Streamers",
      color: "#06b6d4",
      pain: "Streamers go live for hours — most clippers ignore them. That's your edge.",
      fix: "Watch stream VODs, find the hype moments, and post fast. The first clipper to post a moment wins.",
      metric: "Avg 7/1k views",
      clips: ["Check VODs within 6 hours", "Hype & rage clips work best", "Keep it under 30s", "Use their catchphrases"],
      mobile: {
        pain: "Long streams = underrated clip gold.",
        fix: "Hit VODs early; first clean cut often wins.",
        clips: ["Within 6 hours", "<30s hype"],
      },
    },
    {
      label: "News",
      color: GREEN,
      pain: "News clips pay fast — short campaigns, quick turnaround, and breaking content always gets views.",
      fix: "News micro-bounties open and close within hours. These are small clips (15-30 sec) with fast payouts.",
      metric: "Avg 5/1k views",
      clips: ["Enable push alerts", "Keep edits minimal", "Post within 2 hours", "Subtitles essential"],
      mobile: {
        pain: "News bounties are short windows, real payouts.",
        fix: "15–30s clips; turn around in hours.",
        clips: ["Push alerts on", "Subs on every clip"],
      },
    },
    {
      label: "Music",
      color: "#ec4899",
      pain: "Music clips are fun, fast to make, and the algo loves them.",
      fix: "Clip the catchiest 15-30 seconds. Post as Reel using original audio. Trending audio = passive earning.",
      metric: "Avg 8/1k views",
      clips: ["Use original audio track", "Clip the hook/chorus", "Dance trends perform best", "Longest earning tail"],
      mobile: {
        pain: "Music clips reward speed and hooks.",
        fix: "15–30s hook + original audio on Reels.",
        clips: ["Hook / chorus", "Dance trends"],
      },
    },
  ];

  const niches = isCreator ? creatorNiches : clipperNiches;
  const n = niches[active];
  const copy = compactForWhomContent ? n.mobile : { pain: n.pain, fix: n.fix, clips: n.clips };
  const ActiveIcon = nicheIcons[active];
  const youtubeClips = nicheYoutubeVideos[active] ?? [];
  const youtubeClipsToShow = compactForWhomContent ? youtubeClips.slice(0, 2) : youtubeClips;

  const colorRgb = (c: string) => {
    if (c === ORANGE) return "249,115,22";
    if (c === GREEN) return "122,255,120";
    if (c === "#8b5cf6") return "139,92,246";
    if (c === "#06b6d4") return "6,182,212";
    if (c === "#ef4444") return "239,68,68";
    return "236,72,153";
  };

  return (
    <section ref={sectionRef} id="for-whom" className="landing-section-pad" style={{ maxWidth: 1120, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: compactForWhomContent ? 32 : 48 }}>
        <div className="section-badge reveal" style={{ marginBottom: compactForWhomContent ? 16 : 24 }}>
          {isCreator ? "Built for your niche" : "Pick your campaign niche"}
        </div>
        <h2 className="reveal" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,34px)", letterSpacing: "-0.05em", lineHeight: "120%", color: CREAM, margin: "0 0 12px" }}>
          {isCreator ? <>Who is Clipr <span style={{ color: ORANGE }}>made for?</span></> : <>Which niche <span style={{ color: GREEN }}>should you clip?</span></>}
        </h2>
        <p
          className="reveal"
          style={{
            fontSize: compactForWhomContent ? 13 : 15,
            color: TEXT_SECONDARY,
            lineHeight: 1.55,
            maxWidth: compactForWhomContent ? 340 : 500,
            margin: "0 auto",
            paddingInline: compactForWhomContent ? 8 : 0,
          }}
        >
          {compactForWhomContent
            ? isCreator
              ? "Each niche gets a focused fix—pick yours below."
              : "Each niche pays differently—tap one to see the playbook."
            : isCreator
              ? "Every creator type has a different pain. Clipr has a specific fix for each."
              : "Different niches, different strategies, different earnings."}
        </p>
      </div>

      {/* Niche icon row — centered (see `.niche-grid` in globals.css) */}
      <div
        className="niche-grid reveal-card"
        style={{
          marginBottom: 32,
          maxWidth: "min(920px, 100%)",
          marginLeft: "auto",
          marginRight: "auto",
          gap: compactNichePills ? 4 : 8,
        }}
      >
        {niches.map((ni, i) => {
          const Icon = nicheIcons[i];
          return (
            <button
              key={ni.label}
              type="button"
              className="niche-pill-btn"
              onClick={() => {
                track("Niche Tab Clicked", { niche: ni.label, role: isCreator ? "creator" : "clipper" });
                setActive(i);
              }}
              style={{
                flex: "0 0 auto",
                minWidth: compactNichePills ? 64 : 100,
                maxWidth: compactNichePills ? 98 : 160,
                padding: compactNichePills ? "9px 5px" : "18px 12px",
                borderRadius: compactNichePills ? 10 : 14,
                border: `2px solid ${active === i ? ni.color : "#141414"}`,
                background: active === i ? `rgba(${colorRgb(ni.color)},0.08)` : "#141414",
                color: active === i ? ni.color : TEXT_MUTED,
                cursor: "pointer",
                transition: "all .15s cubic-bezier(0.4,0,0.2,1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: compactNichePills ? 5 : 10,
                textAlign: "center",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <Icon color={active === i ? ni.color : TEXT_MUTED} size={compactNichePills ? 20 : 28} />
              <span
                style={{
                  fontSize: compactNichePills ? 9 : 12,
                  fontWeight: 600,
                  letterSpacing: compactNichePills ? "-0.03em" : "-0.02em",
                  lineHeight: compactNichePills ? 1.15 : 1.2,
                  whiteSpace: "nowrap",
                }}
              >
                {ni.label}
              </span>
            </button>
          );
        })}
      </div>

      {youtubeClipsToShow.length > 0 && (
        <div
          key={`yt-${active}-${isCreator ? "c" : "k"}-${compactForWhomContent ? "m" : "d"}`}
          style={{
            display: "grid",
            gridTemplateColumns: compactForWhomContent
              ? "minmax(0, 1fr)"
              : "repeat(3, minmax(0, 1fr))",
            gap: 16,
            marginBottom: 24,
            maxWidth: 1120,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {youtubeClipsToShow.map((clip, i) => (
            <YoutubeEmbed key={`${active}-${i}-${clip.id}`} videoId={clip.id} title={clip.title} />
          ))}
        </div>
      )}

      {/* Content card */}
      <div
        key={active + (isCreator ? "-c" : "-k")}
        className="antigrid-card"
        style={{ padding: 0, overflow: "hidden" }}
      >
        <div style={{ height: 3, background: `linear-gradient(90deg, ${n.color}, transparent 80%)` }} />

        <div className="niche-content-grid">
          {/* Pain + Fix */}
          <div
            style={{
              padding: compactForWhomContent ? "18px 18px" : "28px 28px",
              borderRight: `1px solid ${BORDER}`,
            }}
          >
            {!compactForWhomContent && (
              <div style={{ fontSize: 10, color: TEXT_MUTED, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>
                {isCreator ? "The pain" : "Why this niche"}
              </div>
            )}
            <p
              style={{
                fontSize: compactForWhomContent ? 13 : 15,
                color: CREAM,
                lineHeight: 1.55,
                borderLeft: `2px solid rgba(${colorRgb(n.color)},0.4)`,
                paddingLeft: compactForWhomContent ? 10 : 14,
                margin: compactForWhomContent ? "0 0 14px" : "0 0 24px",
              }}
            >
              {compactForWhomContent ? copy.pain : <>&ldquo;{copy.pain}&rdquo;</>}
            </p>
            {!compactForWhomContent && (
              <div style={{ fontSize: 10, color: TEXT_MUTED, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>
                {isCreator ? "The Clipr fix" : "Your strategy"}
              </div>
            )}
            <p style={{ fontSize: compactForWhomContent ? 12 : 14, color: TEXT_SECONDARY, lineHeight: 1.55, margin: 0 }}>
              {compactForWhomContent ? (
                <>
                  <span style={{ color: n.color, fontWeight: 700 }}>{isCreator ? "Fix: " : "Play: "}</span>
                  {copy.fix}
                </>
              ) : (
                copy.fix
              )}
            </p>
          </div>

          {/* Clips / tips */}
          <div
            style={{
              padding: compactForWhomContent ? "18px 16px" : "28px 24px",
              borderRight: `1px solid ${BORDER}`,
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: TEXT_MUTED,
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: compactForWhomContent ? 10 : 16,
              }}
            >
              {isCreator ? "Clip types" : "Strategy tips"}
            </div>
            {copy.clips.map((c, i) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: compactForWhomContent ? 12 : 14,
                  color: CREAM,
                  padding: compactForWhomContent ? "6px 0" : "8px 0",
                  borderBottom: i < copy.clips.length - 1 ? `1px solid ${BORDER}` : undefined,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: n.color, flexShrink: 0, opacity: 0.8 }} />
                {c}
              </div>
            ))}
          </div>

          {/* Metric panel */}
          <div
            style={{
              padding: compactForWhomContent ? "18px 16px" : "28px 20px",
              background: `rgba(${colorRgb(n.color)},0.04)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: compactForWhomContent ? 8 : 10,
            }}
          >
            <div
              style={{
                width: compactForWhomContent ? 48 : 56,
                height: compactForWhomContent ? 48 : 56,
                borderRadius: 14,
                background: `rgba(${colorRgb(n.color)},0.1)`,
                border: `1px solid rgba(${colorRgb(n.color)},0.2)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActiveIcon color={n.color} size={compactForWhomContent ? 24 : 28} />
            </div>
            <div
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontWeight: 800,
                fontSize: compactForWhomContent ? 15 : 18,
                color: n.color,
                letterSpacing: -0.5,
                lineHeight: 1.3,
              }}
            >
              {n.metric}
            </div>
            {!compactForWhomContent && (
              <div style={{ fontSize: 11, color: TEXT_MUTED, lineHeight: 1.4 }}>
                {isCreator ? "across early beta campaigns" : "typical earning rate"}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
