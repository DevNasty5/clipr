"use client";

import { useEffect } from "react";
import { initMixpanel } from "@/app/lib/mixpanel";

export default function MixpanelInit() {
  useEffect(() => {
    initMixpanel();
  }, []);

  return null;
}
