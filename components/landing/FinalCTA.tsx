import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section style={{ maxWidth: 760, margin: '0 auto', padding: '32px 20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#111111', marginBottom: 8 }}>
        Ready to finally see how you&apos;re wired?
      </h2>
      <p style={{ color: '#555555', marginBottom: 28, fontSize: '1rem' }}>Your purpose is already inside you. It&apos;s time to be shown it.</p>
      <Link
        href="/"
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
