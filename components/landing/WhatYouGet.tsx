// V3 Section 3 — "Here's what you'll discover"
export default function WhatYouGet() {
  return (
    <section style={{ maxWidth: 860, margin: '0 auto', padding: '56px 20px' }}>
      <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, textAlign: 'center', marginBottom: 32, color: '#111111' }}>
        Here&apos;s what you&apos;ll discover:
      </h2>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: 32 }}>
        {[
          { emoji: '🎯', title: 'Your top God-given spiritual gifts', body: 'Wired by God, not chosen by you. Finally understand how you\'re built.' },
          { emoji: '📍', title: 'Where you actually belong', body: "Find where you fit — and where you don't. That contrast changes everything." },
          { emoji: '📅', title: 'Clear next steps', body: 'Week-by-week activation plan written by AI specifically for you, grounded in Scripture.' },
        ].map(({ emoji, title, body }) => (
          <div key={title} style={{ backgroundColor: '#FFFFFF', border: '1.5px solid #E5E7EB', borderLeft: '4px solid #22C55E', borderRadius: 16, padding: '28px 24px' }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>{emoji}</div>
            <h3 style={{ fontWeight: 800, fontSize: '1.15rem', marginBottom: 8, color: '#111111' }}>{title}</h3>
            <p style={{ color: '#555555', lineHeight: 1.6, margin: 0, fontSize: '1rem' }}>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
