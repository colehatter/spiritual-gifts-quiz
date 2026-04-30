'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#111111', background: '#FFFFFF', margin: 0, padding: 0 }}>

      {/* HERO */}
      <section style={{ background: '#FFFFFF', padding: '80px 24px 72px', textAlign: 'center' }}>
        <div style={{ maxWidth: '740px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: '#F0FDF4', border: '1px solid #22C55E', borderRadius: '999px', padding: '6px 18px', fontSize: '0.85rem', color: '#15803D', fontWeight: 600, marginBottom: '32px', letterSpacing: '0.02em' }}>
            Free · Takes 5 Minutes · No Sign-Up Required
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '24px', color: '#111111' }}>
            You don&apos;t feel lost —<br />you feel out of place.<br />
            <span style={{ color: '#22C55E' }}>This shows you where you belong.</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#444444', lineHeight: 1.75, maxWidth: '600px', margin: '0 auto 16px' }}>
            Designed to feel surprisingly personal.
          </p>
          <p style={{ fontSize: '1rem', color: '#666666', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 40px' }}>
            In minutes, discover your God-given gifts — and why some things feel natural while others don&apos;t.
          </p>
          <Link href="/">
            <button style={{ background: '#22C55E', color: '#FFFFFF', fontWeight: 700, fontSize: '1.15rem', padding: '18px 48px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'inline-block', letterSpacing: '0.01em' }}>
              Find My Gifts →
            </button>
          </Link>
          <p style={{ marginTop: '16px', color: '#9CA3AF', fontSize: '0.85rem' }}>✓ Free &nbsp;&nbsp;·&nbsp;&nbsp; ✓ Takes 5 minutes &nbsp;&nbsp;·&nbsp;&nbsp; ✓ No sign-up required</p>
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

      {/* FINALLY UNDERSTOOD — "This might explain why…" */}
      <section style={{ background: '#F9FAFB', padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 900, marginBottom: '16px', color: '#111111' }}>
            This might explain why…
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left', margin: '32px auto', maxWidth: '520px' }}>
            {[
              "You've never quite felt like you fit — even in church.",
              "Some roles feel completely natural, and others leave you drained.",
              "You know you're meant for more, but can't pinpoint what.",
              "You've prayed about your purpose. You're still waiting for an answer.",
            ].map((line, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <span style={{ color: '#22C55E', fontSize: '1.1rem', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>→</span>
                <p style={{ margin: 0, color: '#333333', fontSize: '1.05rem', lineHeight: 1.65 }}>{line}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '1.1rem', color: '#111111', fontWeight: 700, lineHeight: 1.6, marginBottom: '8px' }}>
            That feeling isn&apos;t random. It&apos;s a signal.
          </p>
          <p style={{ fontSize: '1rem', color: '#555555', lineHeight: 1.7, marginBottom: '36px' }}>
            You&apos;re not off — you&apos;re just not aligned with how you were created.<br />
            Most people discover they&apos;ve been serving in the wrong place.
          </p>
          <Link href="/">
            <button style={{ background: '#22C55E', color: '#FFFFFF', fontWeight: 700, fontSize: '1.05rem', padding: '16px 40px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
              Find My Gifts →
            </button>
          </Link>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ background: '#FFFFFF', padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, marginBottom: '12px', color: '#111111' }}>
            This isn&apos;t a generic quiz.
          </h2>
          <p style={{ color: '#555555', marginBottom: '12px', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Most spiritual gifts tests give you a list.
          </p>
          <p style={{ color: '#111111', fontWeight: 700, marginBottom: '44px', fontSize: '1.05rem', lineHeight: 1.7 }}>
            This shows you where you actually belong — and what to do next.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {[
              { icon: '🎯', title: 'Your top God-given gifts', desc: 'Wired by God, not chosen by you. Finally understand how you\'re built — and where you\'re meant to show up.' },
              { icon: '🪞', title: 'Where you don\'t belong', desc: 'Understand which roles drain you — and why. This alone changes everything.' },
              { icon: '📅', title: '30-day activation plan', desc: 'Week-by-week steps written by AI specifically for you — grounded in Scripture, built around your gifts.' },
            ].map((card, i) => (
              <div key={i} style={{ background: '#F9FAFB', borderRadius: '14px', padding: '28px 22px', textAlign: 'left' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{card.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: '#111111' }}>{card.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666666', lineHeight: 1.65, margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ color: '#22C55E', fontSize: '0.9rem', fontWeight: 600 }}>
            The only Spiritual Gifts assessment that uses live AI to write your results — personalized to you, grounded in Scripture.
          </p>
          <p style={{ color: '#9CA3AF', fontSize: '0.85rem', marginTop: '8px' }}>40 questions free. Full results unlock for $9.99.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: '#F0FDF4', padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, marginBottom: '8px', color: '#111111' }}>Simple. Fast. Surprisingly accurate.</h2>
          <p style={{ color: '#666666', fontSize: '0.95rem', marginBottom: '44px' }}>Built to feel personal — not generic.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'left' }}>
            {[
              { step: '1', title: 'Answer a few quick questions', desc: 'Honest scenarios that reveal how you actually operate — not how you wish you did.' },
              { step: '2', title: 'Get your personalized gift profile', desc: 'Your top spiritual gifts, described in a way that feels like it was written just for you.' },
              { step: '3', title: 'See exactly how to use your gifts', desc: 'Clear next steps. A 30-day plan. Scripture grounding. No fluff.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ background: '#22C55E', color: '#FFFFFF', fontWeight: 800, fontSize: '1rem', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</div>
                <div>
                  <h3 style={{ fontWeight: 700, margin: '0 0 6px', fontSize: '1rem', color: '#111111' }}>{item.title}</h3>
                  <p style={{ margin: 0, color: '#555555', fontSize: '0.9rem', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION / AI EDGE */}
      <section style={{ background: '#FFFFFF', padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 900, marginBottom: '20px', color: '#111111' }}>
            You weren&apos;t made to fit in a box.
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#444444', lineHeight: 1.75, marginBottom: '16px' }}>
            Generic tests give everyone the same descriptions. We don&apos;t.
          </p>
          <p style={{ fontSize: '1.05rem', color: '#444444', lineHeight: 1.75, marginBottom: '16px' }}>
            Every result on this quiz is written by AI — live, in the moment, for you. Based on your specific answers. Grounded in Scripture.
          </p>
          <p style={{ fontSize: '1.05rem', color: '#111111', fontWeight: 700, lineHeight: 1.75, marginBottom: '36px' }}>
            You&apos;re not just getting a result — you&apos;re discovering how you were designed.
          </p>
          <Link href="/">
            <button style={{ background: '#22C55E', color: '#FFFFFF', fontWeight: 700, fontSize: '1.05rem', padding: '16px 40px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
              Find My Gifts →
            </button>
          </Link>
        </div>
      </section>

      {/* SCRIPTURE */}
      <section style={{ background: '#F9FAFB', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.25rem', fontStyle: 'italic', color: '#333333', lineHeight: 1.85, marginBottom: '14px' }}>
            &ldquo;Now there are varieties of gifts, but the same Spirit; and there are varieties of service, but the same Lord.&rdquo;
          </p>
          <p style={{ color: '#22C55E', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.04em' }}>1 CORINTHIANS 12:4–5</p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ background: '#FFFFFF', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', background: '#F9FAFB', borderRadius: '16px', padding: '40px 36px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
          <p style={{ fontSize: '1.15rem', color: '#222222', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '18px' }}>
            &ldquo;This is the most accurate thing I&apos;ve ever taken. I finally understand why I am the way I am — and why I&apos;ve never quite fit where I thought I should.&rdquo;
          </p>
          <p style={{ color: '#22C55E', fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>— Sarah M.</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: '#FFFFFF', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, marginBottom: '20px', color: '#111111', lineHeight: 1.2 }}>
            Ready to finally see<br />how you&apos;re wired?
          </h2>
          <p style={{ color: '#555555', fontSize: '1.05rem', marginBottom: '36px', lineHeight: 1.7 }}>
            Your purpose is already inside you.<br />Stop guessing. Start knowing.
          </p>
          <Link href="/">
            <button style={{ background: '#22C55E', color: '#FFFFFF', fontWeight: 700, fontSize: '1.15rem', padding: '18px 52px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
              Find My Gifts →
            </button>
          </Link>
          <p style={{ marginTop: '16px', color: '#9CA3AF', fontSize: '0.85rem' }}>✓ Free &nbsp;&nbsp;·&nbsp;&nbsp; ✓ Takes 5 minutes &nbsp;&nbsp;·&nbsp;&nbsp; ✓ No sign-up required</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#F9FAFB', borderTop: '1px solid #E5E7EB', padding: '28px 24px', textAlign: 'center' }}>
        <p style={{ color: '#9CA3AF', fontSize: '0.82rem', margin: 0 }}>
          <span style={{ color: '#22C55E', fontWeight: 600 }}>3Nails.ai</span> &nbsp;·&nbsp; © 2026 &nbsp;·&nbsp; Made with faith
        </p>
      </footer>

    </main>
  );
}
