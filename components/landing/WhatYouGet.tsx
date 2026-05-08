import Link from 'next/link';

export default function WhatYouGet() {
  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: 28, color: '#111111' }}>
        Here&apos;s what you&apos;ll get
      </h2>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {[
          { title: 'Your top spiritual gifts', body: "Discover the gifts God wired into you — and how these impact your life." },
          { title: 'Where you actually belong', body: "Find where you fit — and where you don't. That clarity alone changes everything." },
          { title: 'A 30-day activation plan', body: 'Clear next steps to start using your gifts immediately. Week by week.' },
        ].map(({ title, body }) => (
          <div key={title} style={{ border: '3px solid #22C55E', borderRadius: 16, padding: '28px 24px' }}>
            <h3 style={{ fontWeight: 800, fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginBottom: 8, color: '#111111' }}>{title}</h3>
            <p style={{ color: '#555555', lineHeight: 1.6, margin: 0, fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)' }}>{body}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Link href='/start' style={{ backgroundColor: '#22C55E', color: 'white', padding: '14px 36px', borderRadius: 10, fontWeight: 700, display: 'inline-block', maxWidth: 340, width: '100%', textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box' }}>
          Start the Free Quiz →
        </Link>
      </div>
      <p style={{ textAlign: 'center', color: '#888888', marginTop: 16, fontSize: '0.9rem' }}>
        40 questions free. Deeper AI insights unlock for $9.99.
      </p>
    </section>
  );
}
