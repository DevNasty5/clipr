// Simple server-side tracking wrapper
let deviceId: string | null = null;

const getDeviceId = () => {
  if (typeof window === "undefined") return null;

  if (!deviceId) {
    deviceId = localStorage.getItem("mixpanel_device_id");
    if (!deviceId) {
      deviceId = `device_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      localStorage.setItem("mixpanel_device_id", deviceId);
    }
  }

  return deviceId;
};

export const initMixpanel = () => {
  if (typeof window !== "undefined") {
    getDeviceId();
  }
};

export const track = async (event: string, properties?: Record<string, any>) => {
  if (typeof window === "undefined") return;

  try {
    await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event,
        properties: {
          distinct_id: getDeviceId(),
          ...properties,
        },
      }),
    });
  } catch (error) {
    console.error("Failed to track event:", error);
  }
};

