import Link from 'next/link';

export default function VideoPlaceholder() {
  return (
    <section style={{ backgroundColor: '#F9FAFB', padding: '48px 20px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 32, color: '#111111' }}>
          This WILL explain a lot…
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {[
            'Why some things feel effortless to you',
            'Why other roles leave you drained',
            'Why you might have never quite felt like you fit in',
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

        <div style={{ backgroundColor: '#FFFFFF', border: '1.5px solid #E5E7EB', borderRadius: 12, padding: '24px 28px', marginBottom: 28 }}>
          <p style={{ margin: 0, color: '#444444', fontSize: '1.05rem', lineHeight: 1.75 }}>
            You&apos;re not broken. And you&apos;re not behind.<br />
            That feeling isn&apos;t random. It&apos;s a signal.<br />
            <strong style={{ color: '#111111', fontSize: '1.15rem' }}>You&apos;re not just getting a result — you&apos;re discovering how you were designed.</strong>
          </p>
        </div>

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
