import { NextRequest, NextResponse } from 'next/server';
import { generateGiftsPdf } from '@/lib/generatePdf';
import { AIResults, GiftScores } from '@/types/quiz';

export async function POST(req: NextRequest) {
  try {
    const { firstName, results, freeScores, paidScores } = await req.json();

    if (!results) {
      return NextResponse.json({ error: 'Missing results' }, { status: 400 });
    }

    // Merge scores
    const combined: GiftScores = { ...freeScores };
    for (const key of Object.keys(paidScores || {}) as (keyof GiftScores)[]) {
      combined[key] = (combined[key] || 0) + (paidScores[key] || 0);
    }

    const pdfBuffer = await generateGiftsPdf(firstName || '', results as AIResults, combined);

    const filename = `${firstName ? `${firstName}-` : ''}Spiritual-Gifts-Report.pdf`;

    return new NextResponse(pdfBuffer.buffer as ArrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (e) {
    console.error('PDF download error:', e);
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 });
  }
}
