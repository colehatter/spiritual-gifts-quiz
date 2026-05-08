export default function Hero() {
  return (
    <section style={{ background: '#FFFFFF', padding: 'clamp(2rem, 5vw, 4rem) 1.25rem', textAlign: 'center' }}>
      <div style={{ display: 'inline-block', padding: '8px 20px', border: '2px solid #22C55E', backgroundColor: '#F0FDF4', color: '#22C55E', borderRadius: 20, marginBottom: '1.5rem', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
        Free Assessment · Takes 10 Minutes
      </div>
      <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 900, color: '#111111', margin: '0 0 1rem', lineHeight: 1.15 }}>
        You&apos;re not lost — you just haven&apos;t seen how you&apos;re wired yet.
      </h1>
      <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#111111', fontWeight: 'bold', margin: '0 0 0.75rem', lineHeight: 1.6 }}>
        In minutes, discover your God-given gifts — and why some things feel natural while others don&apos;t.
      </p>
      <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#111111', fontWeight: 'bold', margin: '0 0 1rem', lineHeight: 1.6 }}>
        This quiz will show you where you belong.
      </p>
      <p style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)', color: '#333333', fontStyle: 'italic', margin: '0 0 2rem', fontWeight: 600 }}>
        Designed to feel surprisingly personal.
      </p>
      <a style={{ display: 'block', padding: '18px 44px', backgroundColor: '#22C55E', color: '#FFFFFF', borderRadius: 12, fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', textDecoration: 'none', fontWeight: 700, maxWidth: 360, margin: '0 auto' }} href="/start">
        Find My Gifts → Free
      </a>
      <p style={{ color: '#555555', fontSize: 'clamp(0.9rem, 2vw, 1rem)', fontWeight: 600, marginTop: '1rem' }}>
        ✓ Free  ✓ Takes 10 minutes  ✓ No sign-up required
      </p>
    </section>
  );
}
