export default function HowItWorks() {
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: 8, color: '#111111' }}>
        Simple. Fast. Mind blowingly accurate.
      </h2>
      <p style={{ textAlign: 'center', color: '#555555', marginBottom: 28, fontSize: '1rem' }}>Built to feel personal — not generic.</p>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {[
          { step: '1', title: 'Answer honest questions', body: "Not what you wish were true — what's actually true. The quiz surfaces your real patterns, not your aspirations." },
          { step: '2', title: 'Live AI analyzes your answers', body: 'Our AI reads your full response set and writes a result just for you. No template. No copy-paste. Yours alone.' },
          { step: '3', title: 'See exactly how to use your gifts', body: 'You get a week-by-week plan to start living it out. Awareness → Activation → Application → Multiplication.' },
        ].map(({ step, title, body }) => (
          <div key={step} style={{ border: '2px solid #E5E7EB', borderRadius: 16, padding: '24px 20px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#22C55E', color: '#fff', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>{step}</div>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8, color: '#111111' }}>{title}</h3>
            <p style={{ color: '#555555', lineHeight: 1.6, margin: 0, fontSize: '0.95rem' }}>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
