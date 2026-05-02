export default function Scripture() {
  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, marginBottom: 16, color: '#111111' }}>
        Completely grounded in Scripture
      </h2>
      <p style={{ fontSize: '1.05rem', color: '#444444', lineHeight: 1.7, marginBottom: 20 }}>
        Based on 1 Corinthians 12, Romans 12, and Ephesians 4 — with a live Bible API behind every result, giving you the full biblical context for who God made you to be.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px 16px' }}>
        {['1 Corinthians 12', 'Romans 12', 'Ephesians 4'].map(ref => (
          <span key={ref} style={{ border: '2px solid #22C55E', borderRadius: 999, padding: '6px 16px', fontSize: '0.9rem', fontWeight: 600, color: '#22C55E' }}>{ref}</span>
        ))}
      </div>
    </section>
  );
}
