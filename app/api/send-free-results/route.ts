import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { GiftName, GiftScores } from '@/types/quiz';
import { giftDescriptions } from '@/lib/giftDescriptions';

function getOAuthClient() {
  const client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
  );
  client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
  return client;
}

function getTopGifts(scores: GiftScores, n: number): GiftName[] {
  return (Object.entries(scores) as [GiftName, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([g]) => g);
}

function buildFreeResultsEmail(firstName: string, topGift: GiftName): string {
  const { description, scripture } = giftDescriptions[topGift];
  const name = firstName || 'Friend';

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:32px 20px;background:#fff;color:#111;">

  <div style="text-align:center;padding:0 0 24px;">
    <p style="font-size:22px;font-weight:bold;color:#0d1220;margin:0;">3Nails.ai</p>
    <p style="font-size:11px;color:#888;margin:4px 0 0;letter-spacing:1px;text-transform:uppercase;">Make Heaven Crowded</p>
  </div>

  <hr style="border:none;border-top:1px solid #eee;margin:0 0 28px;">

  <p style="font-size:16px;color:#333;margin:0 0 8px;">Hey ${name},</p>
  <p style="font-size:16px;color:#333;line-height:1.7;margin:0 0 24px;">
    Your results are in. Based on your first 40 answers, your top spiritual gift is:
  </p>

  <div style="background:#0d1220;border-radius:16px;padding:32px;text-align:center;margin:0 0 28px;">
    <p style="color:#34C6F4;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">Your Top Gift</p>
    <p style="color:#fff;font-size:36px;font-weight:900;margin:0 0 20px;">${topGift}</p>
    <p style="color:rgba(255,255,255,0.85);font-size:15px;line-height:1.75;margin:0 0 20px;">${description}</p>
    <p style="color:#34C6F4;font-size:13px;font-style:italic;margin:0;">${scripture}</p>
  </div>

  <p style="font-size:15px;color:#333;line-height:1.75;margin:0 0 16px;">
    This is just the surface, ${name}.
  </p>
  <p style="font-size:15px;color:#333;line-height:1.75;margin:0 0 28px;">
    Your screening answers revealed a pattern that goes deeper than one gift. The full quiz uses those answers to generate questions built specifically for you — questions nobody else gets — and the results show your complete gift ranking, how your gifts interact, what trips people like you up, and a personalized 30-day plan for living this out.
  </p>

  <div style="background:#f0f9ff;border:2px solid #34C6F4;border-radius:16px;padding:28px;margin:0 0 28px;">
    <p style="font-size:14px;font-weight:bold;color:#0d1220;letter-spacing:1px;text-transform:uppercase;margin:0 0 16px;">What you unlock for $9.99</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;">
      ${[
        ['🎯', 'Your complete gift ranking — all 11 gifts scored'],
        ['🤝', 'How your gifts work together as a unique combination'],
        ['⚡', 'Your shadow side — what to watch out for'],
        ['📖', 'Scriptures selected for your specific profile'],
        ['📅', 'A personalized 30-day activation plan'],
        ['✉️', 'Your full results delivered to this email'],
      ].map(([icon, text]) => `
        <tr>
          <td style="padding:6px 10px 6px 0;font-size:18px;vertical-align:top;width:30px;">${icon}</td>
          <td style="padding:6px 0;font-size:14px;color:#333;line-height:1.5;">${text}</td>
        </tr>
      `).join('')}
    </table>
    <div style="text-align:center;margin-top:20px;">
      <p style="color:#999;font-size:12px;text-decoration:line-through;margin:0 0 4px;">Valued at $47</p>
      <p style="color:#0d1220;font-size:24px;font-weight:900;margin:0 0 16px;">$9.99 <span style="color:#999;font-size:14px;font-weight:normal;">one time</span></p>
      <a href="https://findyourgifts.ai/start" style="display:inline-block;background:#34C6F4;color:#0d1220;font-weight:bold;font-size:16px;padding:16px 40px;border-radius:12px;text-decoration:none;">
        Get My Full Results →
      </a>
      <p style="color:#aaa;font-size:11px;margin:12px 0 0;">No subscription. No account required.</p>
    </div>
  </div>

  <p style="font-size:14px;color:#888;line-height:1.7;margin:0 0 8px;">
    The questions in phase 2 are generated using your specific answers. Nobody else gets the same quiz.
  </p>

  <hr style="border:none;border-top:1px solid #eee;margin:28px 0 16px;">
  <p style="font-size:11px;color:#aaa;text-align:center;margin:0;">
    3Nails.ai &mdash; <a href="https://findyourgifts.ai" style="color:#34C6F4;">findyourgifts.ai</a> &mdash; Make Heaven Crowded
  </p>

</body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, scores } = await req.json();
    if (!email || !scores) {
      return NextResponse.json({ success: false, error: 'Missing email or scores' });
    }

    const topGift = getTopGifts(scores, 1)[0];
    const html = buildFreeResultsEmail(firstName || '', topGift);
    const subject = `${firstName ? `${firstName}, your` : 'Your'} spiritual gift is ${topGift}`;

    const auth = getOAuthClient();
    const gmail = google.gmail({ version: 'v1', auth });

    const mimeMessage = [
      `From: 3Nails.ai <support@3nails.ai>`,
      `To: ${email}`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
      ``,
      html,
    ].join('\r\n');

    const encoded = Buffer.from(mimeMessage)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({ userId: 'me', requestBody: { raw: encoded } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('send-free-results error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
