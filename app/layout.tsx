import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import MixpanelInit from "./components/MixpanelInit";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Clipr – India-first Creator Campaign Network",
  description: "Early access waitlist for Clipr – pay for verified views, not edits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to YouTube thumbnail CDN for faster image loading */}
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        {/* Preconnect to YouTube for iframe loading (only when user clicks) */}
        <link rel="preconnect" href="https://www.youtube-nocookie.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${montserrat.variable} ${geistMono.variable} antialiased`}
      >
        <MixpanelInit />
        {children}
      </body>
    </html>
  );
}
