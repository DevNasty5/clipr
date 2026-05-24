import mixpanel from "mixpanel-browser";

let initialized = false;

export const initMixpanel = () => {
  if (typeof window === "undefined" || initialized) return;
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  if (!token) {
    console.warn("Mixpanel token not found");
    return;
  }
  mixpanel.init(token, {
    autocapture: true,
    record_sessions_percent: 100,
    api_host: "https://api-eu.mixpanel.com",
  });
  initialized = true;
};

export const track = (event: string, properties?: Record<string, any>) => {
  if (typeof window === "undefined") return;
  if (!initialized) {
    initMixpanel();
    if (!initialized) return; // Still not initialized (no token)
  }
  mixpanel.track(event, properties);
};

export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window === "undefined") return;
  if (!initialized) initMixpanel();
  if (!initialized) return;
  mixpanel.register(properties);
};
