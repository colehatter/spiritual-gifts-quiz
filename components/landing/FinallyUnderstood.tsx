export default function FinallyUnderstood() {
  return (
    <section style={{ backgroundColor: '#F9FAFB', padding: '48px 20px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 32, color: '#111111' }}>
          This might explain why…
        </h2>

        {/* Centered bullet cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {[
            "You've never quite felt like you fit",
            "You know you're meant for more — but can't pinpoint what",
            'Some roles feel natural. Others drain you completely.',
          ].map(line => (
            <div key={line} style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #D1FAE5',
              borderLeft: '4px solid #22C55E',
              borderRadius: 10,
              padding: '16px 20px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              <span style={{ color: '#22C55E', fontWeight: 700, fontSize: '1.2rem', flexShrink: 0 }}>→</span>
              <p style={{ margin: 0, color: '#1a1a1a', fontSize: '1.1rem', lineHeight: 1.5, fontWeight: 500 }}>{line}</p>
            </div>
          ))}
        </div>

        {/* Closing statement — all centered, tight */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1.5px solid #E5E7EB', borderRadius: 12, padding: '24px 28px' }}>
          <p style={{ margin: 0, color: '#444444', fontSize: '1.05rem', lineHeight: 1.75 }}>
            You&apos;re not broken. And you&apos;re not behind.<br />
            You were created a specific way — on purpose.<br />
            <strong style={{ color: '#111111', fontSize: '1.15rem' }}>That feeling isn&apos;t random. It&apos;s a signal.</strong><br />
            You&apos;re not off — you&apos;re just not aligned with how you were created yet.
          </p>
        </div>
      </div>
    </section>
  );
}
