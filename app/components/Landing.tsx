"use client";

import { useState, useEffect } from "react";
import { BG, CREAM } from "../constants/theme";
import { track } from "../lib/mixpanel";
import NavBar from "./NavBar";
import Hero from "./Hero";
import ForWhomSection from "./ForWhomSection";
import DashboardSection from "./DashboardSection";
import ClipperPOVSection from "./ClipperPOVSection";
import VsUGCSection from "./VsUGCSection";
import HowItWorksSection from "./HowItWorksSection";
import TerminalSection from "./TerminalSection";
import WaitlistSection from "./WaitlistSection";
import MidCTA from "./MidCTA";
import PromoVideoSection from "./PromoVideoSection";
import Footer from "./Footer";

export default function Landing() {
  const [role, setRole] = useState<"creator" | "clipper">("creator");
  const isCreator = role === "creator";

  useEffect(() => {
    track("Page Viewed", { page: "landing" });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        color: CREAM,
        fontFamily: "var(--font-montserrat), system-ui, sans-serif",
      }}
    >
      <NavBar />
      <main>
        <Hero role={role} onRoleChange={setRole} />
        <PromoVideoSection />
        <ForWhomSection isCreator={isCreator} />
        <MidCTA isCreator={isCreator} />
        {isCreator ? <DashboardSection /> : <ClipperPOVSection />}
        <VsUGCSection isCreator={isCreator} />
        <HowItWorksSection />
        {isCreator && <TerminalSection />}
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}
