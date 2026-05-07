import Link from 'next/link';

export default function HowItWorks() {
  return (
    <section style={{ backgroundColor: '#F0FDF4', padding: '56px 20px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, textAlign: 'center', marginBottom: 8, color: '#111111' }}>
          How it works
        </h2>
        <p style={{ textAlign: 'center', color: '#555555', marginBottom: 32, fontSize: '1.05rem', fontStyle: 'italic' }}>Simple. Fast. Surprisingly accurate.</p>
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 32 }}>
          {[
            { step: '1', title: 'Answer a few quick questions', body: 'Honest scenarios that reveal how you\'re actually wired.' },
            { step: '2', title: 'Get your personalized gift profile', body: 'See your top spiritual gift instantly, grounded in Scripture.' },
            { step: '3', title: 'Unlock your complete profile', body: 'For $9.99: full breakdown, shadow side, and 30-day AI-written plan.' },
          ].map(({ step, title, body }) => (
            <div key={step} style={{ backgroundColor: '#FFFFFF', border: '1.5px solid #E5E7EB', borderRadius: 16, padding: '28px 20px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#22C55E', color: '#fff', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>{step}</div>
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 8, color: '#111111' }}>{title}</h3>
              <p style={{ color: '#555555', lineHeight: 1.6, margin: 0, fontSize: '0.95rem' }}>{body}</p>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: '#555555', fontStyle: 'italic', marginBottom: 28 }}>Built to feel personal — not generic.</p>
        <div style={{ textAlign: 'center' }}>
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
      </div>
    </section>
  );
}
