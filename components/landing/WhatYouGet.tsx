'use client';

const cards = [
  {
    title: 'Discover your spiritual gifts',
    desc: 'Wired by God, not chosen by you. Finally understand how you\'re built.',
  },
  {
    title: 'See your shadow side',
    desc: 'How your gift gets misused — and how to surrender it back to God.',
  },
  {
    title: '30-day activation plan',
    desc: 'Week-by-week steps to start living out your gifts in real life.',
  },
];

export default function WhatYouGet() {
  return (
    <section style={{ background: '#FFFFFF', padding: '72px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 900, marginBottom: '16px', color: '#111111' }}>
          This isn&apos;t a personality test. It&apos;s a blueprint.
        </h2>
        <p style={{ color: '#555555', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '48px', maxWidth: '640px', margin: '0 auto 48px' }}>
          The only Spiritual Gifts assessment that uses live AI to write your results — personalized to you, grounded in Scripture. Every person is unique, which is why every gift result is unique to you. The days of generic results are over.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {cards.map((card, i) => (
            <div key={i} style={{ border: '2px solid #22C55E', borderRadius: '999px', padding: '28px 24px', background: '#FFFFFF', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', color: '#111111' }}>{card.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666666', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>40 questions free. Deeper insights unlock for $9.99.</p>
      </div>
    </section>
  );
}
