'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#111111', background: '#FFFFFF', margin: 0, padding: 0 }}>

      {/* HERO */}
      <section style={{ background: '#FFFFFF', padding: '72px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: '#F0FDF4', border: '1px solid #22C55E', borderRadius: '999px', padding: '6px 16px', fontSize: '0.85rem', color: '#15803D', fontWeight: 600, marginBottom: '28px' }}>
            Free Assessment · Takes 10 Minutes
          </div>
          <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '20px', color: '#111111' }}>
            You don&apos;t feel lost — you feel out of place.<br />This shows you where you belong.
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#555555', lineHeight: 1.7, marginBottom: '36px', maxWidth: '580px', margin: '0 auto 36px' }}>
            Take the free Spiritual Gifts Assessment and get a personalized 30-day plan to activate your calling — grounded in Scripture, written by AI specifically for you.
          </p>
          <Link href="/">
            <button style={{ background: '#22C55E', color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem', padding: '16px 40px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'inline-block' }}>
              Find My Gifts → Free
            </button>
          </Link>
          <p style={{ marginTop: '14px', color: '#9CA3AF', fontSize: '0.85rem' }}>✓ Free &nbsp;&nbsp; ✓ Takes 10 minutes &nbsp;&nbsp; ✓ No sign-up required</p>
        </div>
      </section>

      {/* VIDEO PLACEHOLDER */}
      <section style={{ background: '#111111', padding: '56px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ background: '#1a1a1a', border: '2px solid #22C55E', borderRadius: '16px', aspectRatio: '16/9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div style={{ fontSize: '4rem', color: '#22C55E', lineHeight: 1 }}>▶</div>
            <p style={{ color: '#888888', fontSize: '0.95rem', margin: 0 }}>Watch: How to find your calling</p>
          </div>
          <p style={{ color: '#888888', fontSize: '0.9rem', marginTop: '16px' }}>See how thousands are discovering their God-given purpose</p>
        </div>
      </section>

      {/* PAIN SECTION */}
      <section style={{ background: '#F9FAFB', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '40px', color: '#111111' }}>Most people never figure this out.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', textAlign: 'left' }}>
            {[
              { text: 'You feel like you\'re going through the motions — but something feels off.' },
              { text: 'You want to make a difference, but you don\'t know where to start.' },
              { text: 'You\'ve prayed about your purpose. You\'re still waiting for an answer.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderLeft: '4px solid #22C55E', borderRadius: '8px', padding: '20px 20px 20px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <p style={{ margin: 0, color: '#444444', lineHeight: 1.6, fontSize: '0.95rem' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ background: '#FFFFFF', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '12px', color: '#111111' }}>This isn&apos;t a personality test. It&apos;s a blueprint.</h2>
          <p style={{ color: '#555555', marginBottom: '40px', fontSize: '1rem' }}>The only Spiritual Gifts assessment that uses live AI to write your results — personalized to you, grounded in Scripture.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '28px' }}>
            {[
              { icon: '🎯', title: 'Discover your spiritual gifts', desc: 'Wired by God, not chosen by you. Finally understand how you\'re built.' },
              { icon: '🪞', title: 'See your shadow side', desc: 'How your gift gets misused — and how to surrender it back to God.' },
              { icon: '📅', title: '30-day activation plan', desc: 'Week-by-week steps to start living out your gifts in real life.' },
            ].map((card, i) => (
              <div key={i} style={{ background: '#F9FAFB', borderRadius: '12px', padding: '28px 20px', textAlign: 'left' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{card.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: '#111111' }}>{card.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666666', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>40 questions free. Deeper insights unlock for $9.99.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: '#F0FDF4', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '40px', color: '#111111' }}>How it works</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
            {[
              { step: '1', title: 'Answer 40 questions', desc: 'Honest scenarios that reveal how you actually operate — not how you wish you did.' },
              { step: '2', title: 'See your top gift', desc: 'Instantly get your primary spiritual gift with a full description grounded in Scripture.' },
              { step: '3', title: 'Unlock your full results', desc: 'For $9.99, get your complete gift profile, shadow side analysis, and 30-day plan written by AI for you.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ background: '#22C55E', color: '#FFFFFF', fontWeight: 800, fontSize: '1rem', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</div>
                <div>
                  <h3 style={{ fontWeight: 700, margin: '0 0 4px', fontSize: '1rem', color: '#111111' }}>{item.title}</h3>
                  <p style={{ margin: 0, color: '#555555', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCRIPTURE */}
      <section style={{ background: '#FFFFFF', padding: '56px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#444444', lineHeight: 1.8, marginBottom: '12px' }}>
            &ldquo;Now there are varieties of gifts, but the same Spirit; and there are varieties of service, but the same Lord.&rdquo;
          </p>
          <p style={{ color: '#22C55E', fontWeight: 600, fontSize: '0.9rem' }}>1 Corinthians 12:4-5</p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ background: '#F9FAFB', padding: '56px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '580px', margin: '0 auto', background: '#FFFFFF', borderRadius: '16px', padding: '36px 32px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <p style={{ fontSize: '1.1rem', color: '#333333', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '16px' }}>
            &ldquo;This is the most accurate thing I&apos;ve ever taken. I finally understand why I am the way I am.&rdquo;
          </p>
          <p style={{ color: '#22C55E', fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>— Sarah M.</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: '#FFFFFF', padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 900, marginBottom: '20px', color: '#111111' }}>Your purpose is already inside you.</h2>
          <p style={{ color: '#555555', fontSize: '1.05rem', marginBottom: '36px' }}>Stop guessing. Start knowing.</p>
          <Link href="/">
            <button style={{ background: '#22C55E', color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem', padding: '16px 40px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
              Find My Gifts → Free
            </button>
          </Link>
          <p style={{ marginTop: '14px', color: '#9CA3AF', fontSize: '0.85rem' }}>✓ Free &nbsp;&nbsp; ✓ Takes 10 minutes &nbsp;&nbsp; ✓ No sign-up required</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#F9FAFB', borderTop: '1px solid #E5E7EB', padding: '28px 24px', textAlign: 'center' }}>
        <p style={{ color: '#9CA3AF', fontSize: '0.85rem', margin: 0 }}>
          <span style={{ color: '#22C55E', fontWeight: 700 }}>3Nails.ai</span> &nbsp;·&nbsp; © 2026 &nbsp;·&nbsp; Made with faith
        </p>
      </footer>

    </main>
  );
}
