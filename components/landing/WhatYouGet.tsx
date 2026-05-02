import Link from 'next/link';

export default function WhatYouGet() {
  return (
    <section style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: 28, color: '#111111' }}>
        Here&apos;s what you&apos;ll get
      </h2>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {[
          { title: 'Your top spiritual gifts', body: "Discover the gifts God wired into you — not the ones you wish you had." },
          { title: 'Where you actually belong', body: "Find where you fit — and where you don't. That clarity alone changes everything." },
          { title: 'A 30-day activation plan', body: 'Clear next steps to start using your gifts immediately. Week by week.' },
        ].map(({ title, body }) => (
          <div key={title} style={{ border: '3px solid #22C55E', borderRadius: 16, padding: '32px 28px' }}>
            <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 8, color: '#111111' }}>{title}</h3>
            <p style={{ color: '#555555', lineHeight: 1.6, margin: 0, fontSize: '1.05rem' }}>{body}</p>
          </div>
        ))}
      </div>
      <Link href='/' style={{ backgroundColor: '#22C55E', color: 'white', padding: '14px 36px', borderRadius: 10, fontWeight: 700, display: 'block', maxWidth: 300, margin: '24px auto 0', textDecoration: 'none', textAlign: 'center' }}>
        Start the Free Quiz →
      </Link>
      <p style={{ textAlign: 'center', color: '#888888', marginTop: 20, fontSize: '0.9rem' }}>
        40 questions free. Deeper AI insights unlock for $9.99.
      </p>
    </section>
  );
}
