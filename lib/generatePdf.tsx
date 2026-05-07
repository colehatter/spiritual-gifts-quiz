import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { AIResults, GiftScores, GiftName } from '@/types/quiz';

const ACCENT = rgb(0.204, 0.776, 0.957);   // #34C6F4
const DARK   = rgb(0.1, 0.1, 0.1);
const MID    = rgb(0.35, 0.35, 0.35);
const LIGHT  = rgb(0.6, 0.6, 0.6);
const WHITE  = rgb(1, 1, 1);
const RULE   = rgb(0.85, 0.85, 0.85);
const BAR_BG = rgb(0.9, 0.9, 0.9);
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;

interface Ctx {
  page: ReturnType<PDFDocument['addPage']>;
  doc: PDFDocument;
  bold: Awaited<ReturnType<PDFDocument['embedFont']>>;
  regular: Awaited<ReturnType<PDFDocument['embedFont']>>;
  italic: Awaited<ReturnType<PDFDocument['embedFont']>>;
  y: number;
  firstName: string;
}

function drawHeader(ctx: Ctx) {
  const { page, bold, regular, firstName } = ctx;
  // White background
  page.drawRectangle({ x: 0, y: PAGE_H - 70, width: PAGE_W, height: 70, color: WHITE });
  // Accent bar
  page.drawRectangle({ x: 0, y: PAGE_H - 73, width: PAGE_W, height: 3, color: ACCENT });
  // Brand
  page.drawText('3Nails.ai', { x: MARGIN, y: PAGE_H - 30, size: 18, font: bold, color: DARK });
  page.drawText('Make Heaven Crowded  ·  findyourgifts.ai', { x: MARGIN, y: PAGE_H - 48, size: 9, font: regular, color: LIGHT });
  // Report label right
  const label = `${firstName ? `${firstName}'s ` : ''}Spiritual Gifts Report`;
  const labelW = bold.widthOfTextAtSize(label, 11);
  page.drawText(label, { x: PAGE_W - MARGIN - labelW, y: PAGE_H - 35, size: 11, font: bold, color: DARK });
  ctx.y = PAGE_H - 90;
}

function drawFooter(ctx: Ctx, pageNum: number, total: number) {
  const { page, regular } = ctx;
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: 32, color: WHITE });
  page.drawRectangle({ x: 0, y: 31, width: PAGE_W, height: 1, color: RULE });
  page.drawText('3Nails.ai  ·  findyourgifts.ai  ·  Make Heaven Crowded', { x: MARGIN, y: 10, size: 7, font: regular, color: LIGHT });
  const pg = `${pageNum} / ${total}`;
  const pgW = regular.widthOfTextAtSize(pg, 7);
  page.drawText(pg, { x: PAGE_W - MARGIN - pgW, y: 10, size: 7, font: regular, color: LIGHT });
}

function sectionLabel(ctx: Ctx, text: string) {
  ctx.y -= 18;
  ctx.page.drawText(text.toUpperCase(), { x: MARGIN, y: ctx.y, size: 8, font: ctx.bold, color: ACCENT });
  ctx.y -= 6;
  ctx.page.drawRectangle({ x: MARGIN, y: ctx.y, width: CONTENT_W, height: 1, color: RULE });
  ctx.y -= 10;
}

function wrapText(text: string, font: Awaited<ReturnType<PDFDocument['embedFont']>>, size: number, maxW: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > maxW && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawWrappedText(ctx: Ctx, text: string, size: number, color: typeof DARK, indent = 0, lineGap = 4): number {
  const lines = wrapText(text, ctx.regular, size, CONTENT_W - indent);
  for (const line of lines) {
    if (ctx.y < 60) return ctx.y;
    ctx.page.drawText(line, { x: MARGIN + indent, y: ctx.y, size, font: ctx.regular, color });
    ctx.y -= size + lineGap;
  }
  return ctx.y;
}

function drawBoldText(ctx: Ctx, text: string, size: number, color: typeof DARK) {
  if (ctx.y < 60) return;
  const lines = wrapText(text, ctx.bold, size, CONTENT_W);
  for (const line of lines) {
    ctx.page.drawText(line, { x: MARGIN, y: ctx.y, size, font: ctx.bold, color });
    ctx.y -= size + 4;
  }
}

export async function generateGiftsPdf(firstName: string, results: AIResults, allScores: GiftScores): Promise<Buffer> {
  const doc = await PDFDocument.create();
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const italic = await doc.embedFont(StandardFonts.HelveticaOblique);

  const sorted = (Object.entries(allScores) as [GiftName, number][]).sort((a, b) => b[1] - a[1]);
  const maxScore = sorted[0]?.[1] || 1;
  const top3 = new Set(sorted.slice(0, 3).map(([g]) => g));

  // ── PAGE 1 ──
  const p1 = doc.addPage([PAGE_W, PAGE_H]);
  p1.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: WHITE });
  const ctx: Ctx = { page: p1, doc, bold, regular, italic, y: PAGE_H - 90, firstName };
  drawHeader(ctx);

  // Gift chart
  sectionLabel(ctx, 'Your Full Gift Profile');
  const BAR_MAX = CONTENT_W - 130;
  for (const [gift, score] of sorted) {
    if (ctx.y < 60) break;
    const isTop = top3.has(gift);
    const barW = Math.max(3, (score / maxScore) * BAR_MAX);
    const color = isTop ? DARK : MID;
    ctx.page.drawText(gift, { x: MARGIN, y: ctx.y, size: isTop ? 9 : 8, font: isTop ? bold : regular, color });
    ctx.page.drawRectangle({ x: MARGIN + 110, y: ctx.y - 1, width: BAR_MAX, height: 7, color: BAR_BG });
    ctx.page.drawRectangle({ x: MARGIN + 110, y: ctx.y - 1, width: barW, height: 7, color: isTop ? ACCENT : rgb(0.75, 0.75, 0.75) });
    ctx.page.drawText(`${score}`, { x: MARGIN + 110 + BAR_MAX + 6, y: ctx.y, size: 8, font: isTop ? bold : regular, color: isTop ? ACCENT : LIGHT });
    ctx.y -= 14;
  }

  // Narrative
  ctx.y -= 4;
  sectionLabel(ctx, 'Your Story');
  drawWrappedText(ctx, results.narrative, 9.5, DARK, 0, 5);

  // Top gifts
  ctx.y -= 4;
  sectionLabel(ctx, 'Your Gifts at Work');
  for (let i = 0; i < results.topGifts.length; i++) {
    const g = results.topGifts[i];
    if (ctx.y < 80) break;
    drawBoldText(ctx, `${i + 1}. ${g.name}`, 10, DARK);
    drawWrappedText(ctx, g.description, 9, MID, 12, 4);
    ctx.y -= 6;
  }

  // Synergy
  if (results.giftSynergy && ctx.y > 80) {
    ctx.page.drawRectangle({ x: MARGIN, y: ctx.y - 4, width: 3, height: 36, color: ACCENT });
    drawWrappedText(ctx, results.giftSynergy, 9, MID, 10, 5);
  }

  drawFooter(ctx, 1, 2);

  // ── PAGE 2 ──
  const p2 = doc.addPage([PAGE_W, PAGE_H]);
  p2.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: WHITE });
  ctx.page = p2;
  ctx.y = PAGE_H - 90;
  drawHeader(ctx);

  // Shadow side
  sectionLabel(ctx, 'Your Shadow Side');
  drawWrappedText(ctx, results.shadowSide, 9.5, DARK, 0, 5);

  // Scriptures
  if (results.scriptures?.length) {
    ctx.y -= 4;
    sectionLabel(ctx, 'Scriptures for Your Profile');
    for (const s of results.scriptures) {
      if (ctx.y < 80) break;
      ctx.page.drawText(s.reference, { x: MARGIN, y: ctx.y, size: 10, font: bold, color: ACCENT });
      ctx.y -= 14;
      const ilines = wrapText(s.text, italic, 9, CONTENT_W);
      for (const line of ilines) {
        if (ctx.y < 60) break;
        ctx.page.drawText(line, { x: MARGIN, y: ctx.y, size: 9, font: italic, color: MID });
        ctx.y -= 13;
      }
      ctx.y -= 6;
    }
  }

  // Action plan
  if (results.actionPlan?.length) {
    ctx.y -= 4;
    sectionLabel(ctx, 'Your 30-Day Action Plan');
    for (const week of results.actionPlan) {
      if (ctx.y < 80) break;
      drawBoldText(ctx, `Week ${week.week}: ${week.theme}`, 10, DARK);
      for (const action of week.actions) {
        if (ctx.y < 60) break;
        drawWrappedText(ctx, `• ${action}`, 9, MID, 8, 4);
      }
      ctx.y -= 6;
    }
  }

  drawFooter(ctx, 2, 2);

  const bytes = await doc.save();
  return Buffer.from(bytes);
}
