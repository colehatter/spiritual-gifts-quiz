import Link from 'next/link';

// V3 Section 4 — "This might explain why…" with 4 arrows + CTA
export default function FinallyUnderstood() {
  return (
    <section style={{ padding: '56px 20px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 32, color: '#111111' }}>
          This might explain why…
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {[
            "You've never quite felt like you fit — even in church.",
            'Some roles feel completely natural, and others leave you drained.',
            "You know you're meant for more, but can't pinpoint what.",
            "You've prayed about your purpose. You're still waiting for an answer.",
          ].map(line => (
            <div key={line} style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #D1FAE5',
              borderLeft: '4px solid #22C55E',
              borderRadius: 10,
              padding: '16px 20px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              <span style={{ color: '#22C55E', fontWeight: 700, fontSize: '1.2rem', flexShrink: 0 }}>→</span>
              <p style={{ margin: 0, color: '#1a1a1a', fontSize: '1.1rem', lineHeight: 1.5, fontWeight: 500 }}>{line}</p>
            </div>
          ))}
        </div>

        <p style={{ color: '#111111', fontSize: '1.1rem', fontWeight: 600, marginBottom: 6 }}>
          You&apos;re not broken. And you&apos;re not behind.
        </p>
        <p style={{ color: '#111111', fontSize: '1.15rem', fontWeight: 700, marginBottom: 6 }}>
          That feeling isn&apos;t random. It&apos;s a signal.
        </p>
        <p style={{ color: '#444444', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 32 }}>
          You&apos;re not just getting a result — you&apos;re discovering how you were designed.
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
            borderRadius: 999,
            textDecoration: 'none',
          }}
        >
          Find My Gifts Now →
        </Link>
      </div>
    </section>
  );
}
