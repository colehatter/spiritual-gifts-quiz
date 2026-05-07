import Link from 'next/link';

// V3 Section 2 — black background, exact copy from V3
export default function VideoPlaceholder() {
  return (
    <section style={{ backgroundColor: '#111111', padding: '56px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: 28, lineHeight: 1.2 }}>
          This might explain a lot…
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, textAlign: 'left', maxWidth: 520, margin: '0 auto 28px' }}>
          {[
            'Why some things feel effortless to you',
            'Why other roles leave you drained',
            "Why you've never quite felt like you fit",
          ].map(line => (
            <p key={line} style={{ margin: 0, color: '#CCCCCC', fontSize: '1.2rem', lineHeight: 1.7 }}>
              {line}
            </p>
          ))}
        </div>
        <p style={{ color: '#FFFFFF', fontSize: '1.2rem', fontWeight: 700, marginBottom: 12 }}>
          That feeling isn&apos;t random. It&apos;s a signal.
        </p>
        <p style={{ color: '#AAAAAA', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 36 }}>
          You&apos;re not broken. And you&apos;re not behind. You were created a specific way — on purpose. You just haven&apos;t seen it clearly yet.
        </p>
        <Link
          href="/start"
          style={{
            display: 'inline-block',
            backgroundColor: '#22C55E',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '1.125rem',
            padding: '16px 44px',
            borderRadius: 12,
            textDecoration: 'none',
          }}
        >
          Find My Gifts Now →
        </Link>
      </div>
    </section>
  );
}
