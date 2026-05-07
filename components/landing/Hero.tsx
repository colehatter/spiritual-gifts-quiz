export default function Hero() {
  return (
    <section style={{ background: '#FFFFFF', padding: '4rem 2rem', textAlign: 'center' }}>
      <div style={{ display: 'inline-block', padding: '8px 20px', border: '2px solid #22C55E', backgroundColor: '#F0FDF4', color: '#22C55E', borderRadius: 20, marginBottom: '2rem' }}>
        Free Assessment · Takes 10 Minutes
      </div>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#111111', margin: '0 0 1rem' }}>
        You&apos;re not lost — you just haven&apos;t seen how you&apos;re wired yet.
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#111111', fontWeight: 'bold', margin: '0 0 1rem' }}>
        In minutes, discover your God-given gifts — and why some things feel natural while others don&apos;t.
      </p>
      <p style={{ fontSize: '1rem', color: '#333333', fontStyle: 'italic', margin: '0 0 2rem' }}>
        Designed to feel surprisingly personal.
      </p>
      <a style={{ display: 'inline-block', padding: '18px 44px', backgroundColor: '#22C55E', color: '#FFFFFF', borderRadius: 12, fontSize: '1.15rem', textDecoration: 'none' }} href="/start">
        Find My Gifts → Free
      </a>
      <p style={{ color: '#555555', fontSize: '1rem', fontWeight: 600, marginTop: '1rem' }}>
        ✓ Free  ✓ Takes 10 minutes  ✓ No sign-up required
      </p>
    </section>
  );
}
