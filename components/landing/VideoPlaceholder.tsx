export default function VideoPlaceholder() {
  return (
    <section style={{ backgroundColor: '#111111', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ position: 'relative', paddingBottom: '56.25%', border: '2px solid #22C55E', borderRadius: 16, overflow: 'hidden', backgroundColor: '#1a1a1a' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '4rem', color: '#22C55E', lineHeight: 1, marginBottom: 12 }}>▶</div>
            <p style={{ color: '#aaaaaa', fontSize: '1rem', margin: 0 }}>Watch: How to find your calling</p>
          </div>
        </div>
        <p style={{ textAlign: 'center', color: '#aaaaaa', marginTop: 16, fontSize: '0.95rem' }}>
          See how thousands are discovering their God-given purpose
        </p>
      </div>
    </section>
  );
}
