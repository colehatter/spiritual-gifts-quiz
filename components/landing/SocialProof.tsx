export default function SocialProof() {
  const testimonials = [
    {
      quote: "I've taken a lot of personality and strengths assessments over the years, but the Spiritual Gifts Assessment from 3Nails.ai was one of the first that genuinely felt accurate and deeply personal. It didn't just describe traits, it gave me clarity on how I'm wired to operate, serve, solve problems, and build impact in both business and life.",
      name: 'Andres D.'
    },
    {
      quote: 'The spiritual gifts assessment test is incredible! AMAZING JOB!',
      name: 'Katia L.'
    },
    {
      quote: 'The spiritual gifts assessment was crazy accurate on my end! The questions really push you to think deeper about who you are and the person you want to become.',
      name: 'David D.'
    },
  ];

  return (
    <section style={{ backgroundColor: '#F9FAFB', padding: 'clamp(2.5rem, 5vw, 4rem) 1.25rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontSize: '1.1rem', color: '#111111', marginBottom: 32, fontStyle: 'italic', textAlign: 'center' }}>
          Thousands are beginning to discover where they truly belong. You might be closer than you think.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 680, margin: '0 auto' }}>
          {testimonials.map(({ quote, name }) => (
            <div key={name} style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '28px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#333333', fontStyle: 'italic', marginBottom: 16 }}>
                &ldquo;{quote}&rdquo;
              </p>
              <p style={{ color: '#22C55E', fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>&mdash; {name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
