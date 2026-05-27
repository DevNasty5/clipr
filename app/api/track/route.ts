import { NextRequest, NextResponse } from "next/server";

const MIXPANEL_TOKEN = process.env.MIXPANEL_TOKEN;
const MIXPANEL_API_HOST = "https://api-eu.mixpanel.com";

export async function POST(request: NextRequest) {
  try {
    const { event, properties } = await request.json();

    if (!event || typeof event !== "string") {
      return NextResponse.json(
        { error: "Event name is required" },
        { status: 400 }
      );
    }

    if (!MIXPANEL_TOKEN) {
      console.error("Mixpanel token not configured");
      return NextResponse.json(
        { error: "Tracking not configured" },
        { status: 500 }
      );
    }

    // Prepare Mixpanel event payload
    const mixpanelPayload = {
      event,
      properties: {
        token: MIXPANEL_TOKEN,
        time: Date.now(),
        ...properties,
      },
    };

    // Send to Mixpanel
    const response = await fetch(`${MIXPANEL_API_HOST}/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([mixpanelPayload]),
    });

    if (!response.ok) {
      throw new Error(`Mixpanel API error: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking event:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}
