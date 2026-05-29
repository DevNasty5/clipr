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
  metadataBase: new URL("https://cliprin.vercel.app"),
  title: {
    default: "Clipr – Get Verified Views on Reels and Shorts | India",
    template: "%s | Clipr",
  },
  description:
    "Clipr connects Indian creators with verified clippers who post your content on Reels and Shorts. Pay only for real, bot-free views. Join the waitlist.",
  keywords: [
    // what creators search for
    "get more views on reels India",
    "promote YouTube channel India",
    "content distribution India",
    "verified views India",
    "pay per view marketing India",
    "short video promotion India",
    "grow Instagram reels India",
    "YouTube Shorts promotion India",

    // what clippers/editors search for
    "earn money posting reels India",
    "get paid to post short videos",
    "clipper network India",
    "earn from editing videos India",
    "UPI payout content creator",

    // product/category terms
    "creator campaign network",
    "UGC clip distribution",
    "bot-free views platform",
    "influencer clip network India",
    "Moj content promotion",
    "creator marketing platform India",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
      </head>
      <body
        className={`${montserrat.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Clipr",
              url: "https://cliprin.vercel.app",
              logo: "https://cliprin.vercel.app/og.png",
              description:
                "India's first creator campaign network. Creators pay for verified views and clippers earn by posting short viral clips.",
              areaServed: {
                "@type": "Country",
                name: "India",
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
        <MixpanelInit />
        {children}
      </body>
    </html>
  );
}
