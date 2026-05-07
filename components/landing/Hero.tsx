import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{ maxWidth: 760, margin: '0 auto', padding: '36px 20px 28px', textAlign: 'center' }}>
      <div style={{ display: 'inline-block', border: '2px solid #22C55E', borderRadius: 999, padding: '10px 24px', fontSize: '1rem', fontWeight: 600, color: '#22C55E', marginBottom: 20 }}>
        Free Assessment · Takes 10 Minutes
      </div>
      <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 3.1rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: 20, color: '#111111' }}>
        You&apos;re not lost — you just haven&apos;t seen how you&apos;re wired yet.
      </h1>
      <p style={{ fontSize: '1.15rem', color: '#555555', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 8px' }}>
        In minutes, discover your God-given gifts — and why some things feel natural while others don&apos;t.
      </p>
      <p style={{ fontSize: '1rem', color: '#888888', fontStyle: 'italic', marginBottom: 28 }}>
        Designed to feel surprisingly personal.
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
          width: '100%',
          maxWidth: 360,
          boxSizing: 'border-box',
        }}
      >
        Find My Gifts → Free
      </Link>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px 20px', marginTop: 16 }}>
        {['✓ Free', '✓ Takes 10 minutes', '✓ No sign-up required'].map(t => (
          <span key={t} style={{ fontSize: '0.875rem', color: '#555555', fontWeight: 500 }}>{t}</span>
        ))}
      </div>
    </section>
  );
}
