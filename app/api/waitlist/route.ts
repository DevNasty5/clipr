import { sql } from '../../lib/db';

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, role, youtube, instagram, clipPeakViews, creatorChannelSize } = body;

  if (!name || !email || !role) {
    return Response.json({ success: false, error: 'Missing required fields' }, { status: 400 });
  }

  await sql`
    INSERT INTO waitlist (
      name,
      email,
      role,
      youtube,
      instagram,
      clip_peak_views,
      creator_channel_size
    )
    VALUES (
      ${name},
      ${email},
      ${role},
      ${youtube ?? null},
      ${instagram ?? null},
      ${clipPeakViews ?? null},
      ${creatorChannelSize ?? null}
    )
  `;

  return Response.json({ success: true });
}
