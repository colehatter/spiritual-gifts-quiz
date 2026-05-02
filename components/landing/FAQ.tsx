export default function FAQ() {
  const items = [
    { q: 'Is this really free?', a: 'Yes — all 40 questions and your initial results are completely free. A deeper adaptive assessment (28 additional questions) and your full 30-day plan unlock for $9.99.' },
    { q: 'How is this different from other spiritual gifts tests?', a: 'Every other test gives you a pre-written result based on your score category. Ours uses live AI to write a result specifically for your answer pattern. No two results are the same.' },
    { q: 'Which spiritual gifts does it assess?', a: 'We assess 11 gifts drawn from 1 Corinthians 12, Romans 12, and Ephesians 4 — including Teaching, Leadership, Mercy, Evangelism, Prophecy, Serving, Giving, Administration, Exhortation, Faith, and Discernment.' },
    { q: 'Do I need to create an account?', a: 'No. You can take the full free assessment without creating an account or entering an email address.' },
    { q: 'What is the 30-day activation plan?', a: 'After your results, you receive a 4-week plan with specific daily and weekly steps for living out your gift in your church, family, and work life.' },
  ];

  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: 28, color: '#111111' }}>
        Common questions
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {items.map(({ q, a }) => (
          <div key={q} style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: 16 }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8, color: '#111111' }}>{q}</h3>
            <p style={{ color: '#555555', lineHeight: 1.6, margin: 0, fontSize: '0.95rem' }}>{a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
