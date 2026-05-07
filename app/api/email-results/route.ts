import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { GiftScores, GiftName, AIResults } from '@/types/quiz';
import { generateGiftsPdf } from '@/lib/generatePdf';

const HUBSPOT_TOKEN = '${HUBSPOT_TOKEN_PLACEHOLDER}';

function getOAuthClient() {
  const client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
  );
  client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });
  return client;
}

function mergeScores(a: GiftScores, b: GiftScores): GiftScores {
  const result = { ...a };
  for (const key of Object.keys(b) as GiftName[]) {
    result[key] = (result[key] || 0) + (b[key] || 0);
  }
  return result;
}

function getTopGifts(scores: GiftScores, n: number): GiftName[] {
  return (Object.entries(scores) as [GiftName, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([g]) => g);
}

async function createHubSpotContact(email: string, firstName: string, topGifts: GiftName[], source: string) {
  try {
    const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${HUBSPOT_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
        properties: ['email'],
        limit: 1,
      }),
    });
    const searchData = await searchRes.json();
    const props: Record<string, string> = {
      email,
      firstname: firstName || '',
      lead_source: source,
      spiritual_gifts_top3: topGifts.join(', '),
    };
    if (searchData.results?.length > 0) {
      await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${searchData.results[0].id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${HUBSPOT_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ properties: props }),
      });
    } else {
      await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${HUBSPOT_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ properties: props }),
      });
    }
  } catch (e) {
    console.error('HubSpot error:', e);
  }
}

function buildEmailHtml(firstName: string, results: AIResults, topGifts: GiftName[], allScores: GiftScores): string {
  const sortedScores = (Object.entries(allScores) as [GiftName, number][]).sort((a, b) => b[1] - a[1]);
  const maxScore = sortedScores[0]?.[1] || 1;

  const barChart = sortedScores.map(([gift, score], i) => {
    const isTop3 = i < 3;
    const pct = Math.round((score / maxScore) * 100);
    const color = isTop3 ? '#34C6F4' : '#ccc';
    return `<tr>
      <td style="font-size:12px;color:${isTop3 ? '#111' : '#888'};font-weight:${isTop3 ? 'bold' : 'normal'};width:110px;padding:3px 8px 3px 0;">${gift}</td>
      <td style="padding:3px 0;"><div style="background:#eee;border-radius:4px;height:10px;width:200px;"><div style="background:${color};border-radius:4px;height:10px;width:${pct * 2}px;"></div></div></td>
      <td style="font-size:11px;color:${isTop3 ? '#34C6F4' : '#aaa'};padding:3px 0 3px 8px;">${score}</td>
    </tr>`;
  }).join('');

  const actionPlanHtml = results.actionPlan?.map(week => `
    <p style="margin:16px 0 4px;color:#111;"><strong>Week ${week.week}: ${week.theme}</strong></p>
    <ul style="margin:0;padding-left:20px;color:#333;">${week.actions.map(a => `<li style="margin-bottom:4px;">${a}</li>`).join('')}</ul>
  `).join('') || '';

  const scripturesHtml = results.scriptures?.map(s => `
    <p style="margin:8px 0;color:#1a6fa8;font-weight:bold;font-size:13px;">${s.reference}</p>
    <p style="margin:0 0 12px;color:#444;font-style:italic;">${s.text}</p>
  `).join('') || '';

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:20px;background:#fff;color:#111;">
  <div style="text-align:center;padding:20px 0 10px;">
    <p style="font-size:22px;font-weight:bold;color:#0d1220;margin:0;">3Nails.ai</p>
    <p style="font-size:11px;color:#888;margin:4px 0 0;">Make Heaven Crowded</p>
  </div>
  <hr style="border:none;border-top:1px solid #eee;margin:16px 0;">
  <h1 style="font-size:24px;color:#0d1220;margin:0 0 4px;">${firstName ? `${firstName}'s` : 'Your'} Spiritual Gifts Report</h1>
  <p style="color:#888;font-size:13px;margin:0 0 24px;">findyourgifts.ai</p>
  <h2 style="font-size:13px;color:#1a6fa8;letter-spacing:1px;text-transform:uppercase;margin:0 0 12px;">Your Full Gift Profile</h2>
  <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">${barChart}</table>
  <h2 style="font-size:13px;color:#1a6fa8;letter-spacing:1px;text-transform:uppercase;margin:0 0 12px;">Your Story</h2>
  <p style="color:#111;line-height:1.7;margin:0 0 24px;">${results.narrative}</p>
  <h2 style="font-size:13px;color:#1a6fa8;letter-spacing:1px;text-transform:uppercase;margin:0 0 12px;">Your Gifts at Work</h2>
  ${results.topGifts.map((g, i) => `<p style="margin:0 0 4px;"><strong>${i + 1}. ${g.name}</strong></p><p style="color:#333;line-height:1.6;margin:0 0 16px;">${g.description}</p>`).join('')}
  ${results.giftSynergy ? `<div style="background:#f0f9ff;border-left:3px solid #34C6F4;padding:12px 16px;margin:0 0 24px;border-radius:4px;"><p style="color:#333;font-style:italic;margin:0;">${results.giftSynergy}</p></div>` : ''}
  <h2 style="font-size:13px;color:#1a6fa8;letter-spacing:1px;text-transform:uppercase;margin:0 0 12px;">Your Shadow Side</h2>
  <p style="color:#333;line-height:1.6;margin:0 0 24px;">${results.shadowSide}</p>
  <h2 style="font-size:13px;color:#1a6fa8;letter-spacing:1px;text-transform:uppercase;margin:0 0 12px;">Scriptures for Your Profile</h2>
  ${scripturesHtml}
  <h2 style="font-size:13px;color:#1a6fa8;letter-spacing:1px;text-transform:uppercase;margin:24px 0 12px;">Your 30-Day Action Plan</h2>
  ${actionPlanHtml}
  <hr style="border:none;border-top:1px solid #eee;margin:32px 0 16px;">
  <p style="font-size:11px;color:#aaa;text-align:center;">3Nails.ai &mdash; findyourgifts.ai &mdash; Make Heaven Crowded</p>
</body></html>`;
}

async function sendEmail(to: string, firstName: string, html: string, allScores: GiftScores, results: AIResults): Promise<boolean> {
  try {
    const auth = getOAuthClient();
    const gmail = google.gmail({ version: 'v1', auth });

    const subject = `${firstName ? `${firstName}, your` : 'Your'} Spiritual Gifts Report`;
    const boundary = `boundary_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    // Generate PDF
    let pdfBuffer: Buffer | null = null;
    try {
      pdfBuffer = await generateGiftsPdf(firstName, results, allScores);
    } catch (pdfErr) {
      console.error('PDF generation failed, sending without attachment:', pdfErr);
    }

    let mimeMessage: string;

    if (pdfBuffer) {
      const pdfBase64 = pdfBuffer.toString('base64');
      const pdfFilename = `${firstName ? `${firstName}-` : ''}Spiritual-Gifts-Report.pdf`;

      mimeMessage = [
        `From: 3Nails.ai <support@3nails.ai>`,
        `To: ${to}`,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: multipart/mixed; boundary="${boundary}"`,
        ``,
        `--${boundary}`,
        `Content-Type: text/html; charset=UTF-8`,
        `Content-Transfer-Encoding: 7bit`,
        ``,
        html,
        ``,
        `--${boundary}`,
        `Content-Type: application/pdf; name="${pdfFilename}"`,
        `Content-Transfer-Encoding: base64`,
        `Content-Disposition: attachment; filename="${pdfFilename}"`,
        ``,
        pdfBase64,
        ``,
        `--${boundary}--`,
      ].join('\r\n');
    } else {
      // Fallback: HTML only
      mimeMessage = [
        `From: 3Nails.ai <support@3nails.ai>`,
        `To: ${to}`,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset=UTF-8`,
        ``,
        html,
      ].join('\r\n');
    }

    const encoded = Buffer.from(mimeMessage)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encoded },
    });

    console.log('Gmail send success, id:', result.data.id, '| PDF attached:', !!pdfBuffer);
    return true;
  } catch (e: unknown) {
    const err = e as { response?: { data?: unknown }; message?: string };
    console.error('Gmail send error:', err?.response?.data || err?.message || e);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, results, freeScores, paidScores, source } = await req.json();

    if (!results || !email) {
      return NextResponse.json({ success: false, error: 'Missing results or email' });
    }

    const combined = mergeScores(freeScores || {}, paidScores || {});
    const topGifts = getTopGifts(combined, 3);

    // HubSpot and email — both fully awaited before returning
    await Promise.all([
      createHubSpotContact(email, firstName, topGifts, source || 'quiz'),
      sendEmail(email, firstName, buildEmailHtml(firstName, results, topGifts, combined), combined, results),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('email-results error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
