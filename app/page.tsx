import type { Metadata } from "next";
import Landing from "./components/Landing";

export const metadata: Metadata = {
  title: "Clipr – Get Verified Views on Reels and Shorts | India",
  description:
    "Clipr connects Indian creators with verified clippers who post your content on Reels and Shorts. Pay only for real, bot-free views. UPI payouts every Friday. Join the waitlist.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Clipr – Get Verified Views on Reels and Shorts | India",
    description:
      "Clippers post your content across Reels and Shorts. Pay only for verified, bot-free views. India's first creator campaign network.",
    url: "/",
    siteName: "Clipr",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Clipr – India's creator campaign network for verified views on Reels and Shorts",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clipr – Get Verified Views on Reels and Shorts | India",
    description:
      "Clippers post your content across Reels and Shorts. Pay only for verified, bot-free views. INR payouts via UPI every Friday.",
    images: ["/og.png"],
  },
};

export default function Home() {
  return <Landing />;
}
