'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#111111', background: '#FFFFFF', margin: 0, padding: 0 }}>

      {/* HERO */}
      <section style={{ background: '#FFFFFF', padding: '64px 24px 56px', textAlign: 'center' }}>
        <div style={{ maxWidth: '740px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: '#F0FDF4', border: '2px solid #22C55E', borderRadius: '999px', padding: '10px 24px', fontSize: '1rem', color: '#15803D', fontWeight: 700, marginBottom: '28px', letterSpacing: '0.02em' }}>
            Free Assessment · Takes 10 Minutes
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '20px', color: '#111111' }}>
            You don&apos;t feel lost — you feel out of place.<br />This shows you where you belong.
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#111111', lineHeight: 1.75, maxWidth: '580px', margin: '0 auto 8px', fontWeight: 500 }}>
            In minutes, discover your God-given gifts — and why some things feel natural while others don&apos;t.
          </p>
          <p style={{ fontSize: '1rem', color: '#555555', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 36px' }}>
            Designed to feel surprisingly personal.
          </p>
          <Link href="/">
            <button style={{ background: '#22C55E', color: '#FFFFFF', fontWeight: 700, fontSize: '1.15rem', padding: '18px 52px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'inline-block' }}>
              Find My Gifts →
            </button>
          </Link>
          <p style={{ marginTop: '14px', color: '#9CA3AF', fontSize: '0.85rem' }}>✓ Free &nbsp;·&nbsp; ✓ Takes 10 minutes &nbsp;·&nbsp; ✓ No sign-up required</p>
        </div>
      </section>

      {/* CREDIBILITY */}
      <section style={{ background: '#F9FAFB', padding: '56px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 900, marginBottom: '32px', color: '#111111' }}>Built different. By design.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              { icon: '🌍', text: 'The only Spiritual Gifts quiz in the world with live AI-generated results' },
              { icon: '✍️', text: 'Every result is written uniquely for you — not pulled from a template' },
              { icon: '📖', text: 'Completely grounded in Scripture — 1 Cor 12, Romans 12, Eph 4 + live Bible API for full biblical context' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: '14px', padding: '24px 20px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{item.icon}</div>
                <p style={{ margin: 0, color: '#222222', fontSize: '0.95rem', lineHeight: 1.65, fontWeight: 500 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THIS MIGHT EXPLAIN WHY */}
      <section style={{ background: '#FFFFFF', padding: '56px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 900, marginBottom: '28px', color: '#111111' }}>
            This might explain why…
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
            {[
              "You've never quite felt like you fit — even in church.",
              "Some roles feel completely natural, and others leave you drained.",
              "You know you're meant for more, but can't pinpoint what.",
              "You've prayed about your purpose. You're still waiting for an answer.",
            ].map((line, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <span style={{ color: '#22C55E', fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>→</span>
                <p style={{ margin: 0, color: '#222222', fontSize: '1.05rem', lineHeight: 1.6 }}>{line}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '1rem', color: '#555555', lineHeight: 1.8, marginBottom: '4px' }}>You&apos;re not broken. And you&apos;re not behind.</p>
          <p style={{ fontSize: '1rem', color: '#555555', lineHeight: 1.8, marginBottom: '4px' }}>You were created a specific way — on purpose.</p>
          <p style={{ fontSize: '1.1rem', color: '#111111', fontWeight: 700, lineHeight: 1.6, marginBottom: '4px' }}>That feeling isn&apos;t random. It&apos;s a signal.</p>
          <p style={{ fontSize: '1rem', color: '#555555', lineHeight: 1.8, marginBottom: '28px' }}>Most people discover they&apos;ve been serving in the wrong place.</p>
          <Link href="/">
            <button style={{ background: '#22C55E', color: '#FFFFFF', fontWeight: 700, fontSize: '1.05rem', padding: '16px 40px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
              Find My Gifts Now →
            </button>
          </Link>
        </div>
      </section>

      {/* WHAT YOU'LL GET */}
      <section style={{ background: '#F9FAFB', padding: '56px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, marginBottom: '8px', color: '#111111' }}>Here&apos;s what you&apos;ll get:</h2>
          <p style={{ color: '#555555', fontSize: '1rem', marginBottom: '32px' }}>Your complete spiritual gift breakdown — written by AI, grounded in Scripture.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            {[
              { icon: '🎯', title: 'Your top God-given gifts', desc: 'Wired by God, not chosen by you. Finally understand how you\'re built — and where you\'re meant to show up.' },
              { icon: '🪞', title: 'Where you don\'t belong', desc: 'Understand which roles drain you — and why. This alone changes everything.' },
              { icon: '📅', title: '30-day activation plan', desc: 'Week-by-week steps written by AI specifically for you — grounded in Scripture, built around your gifts.' },
            ].map((card, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px 24px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '14px' }}>{card.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '10px', color: '#22C55E' }}>{card.title}</h3>
                <p style={{ fontSize: '1rem', color: '#444444', lineHeight: 1.65, margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ color: '#9CA3AF', fontSize: '0.85rem', marginBottom: '28px' }}>40 questions free. Full results unlock for $9.99.</p>
          <Link href="/">
            <button style={{ background: '#22C55E', color: '#FFFFFF', fontWeight: 700, fontSize: '1.05rem', padding: '16px 40px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
              Find My Gifts Now →
            </button>
          </Link>
        </div>
      </section>

      {/* VIDEO PLACEHOLDER */}
      <section style={{ background: '#111111', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ background: '#1a1a1a', border: '2px solid #22C55E', borderRadius: '16px', aspectRatio: '16/9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div style={{ fontSize: '4rem', color: '#22C55E', lineHeight: 1 }}>▶</div>
            <p style={{ color: '#888888', fontSize: '0.95rem', margin: 0 }}>Watch: How to find your calling</p>
          </div>
          <p style={{ color: '#888888', fontSize: '0.9rem', marginTop: '14px' }}>See how thousands are discovering their God-given purpose</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: '#F0FDF4', padding: '56px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, marginBottom: '8px', color: '#111111' }}>Simple. Fast. Mind-blowingly accurate.</h2>
          <p style={{ color: '#666666', fontSize: '0.95rem', marginBottom: '36px' }}>Built to feel personal — not generic.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { step: '1', title: 'Answer 40 questions', desc: 'Honest scenarios that reveal how you actually operate — not how you wish you did.' },
              { step: '2', title: 'Get your personalized gift profile', desc: 'Your top spiritual gifts, described in a way that feels like it was written just for you.' },
              { step: '3', title: 'See exactly how to use your gifts', desc: 'Clear next steps. A 30-day plan. Scripture grounding. No fluff.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: '14px', padding: '28px 20px', textAlign: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ background: '#22C55E', color: '#FFFFFF', fontWeight: 800, fontSize: '1.1rem', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>{item.step}</div>
                <h3 style={{ fontWeight: 700, margin: '0 0 8px', fontSize: '1rem', color: '#111111', whiteSpace: 'nowrap' }}>{item.title}</h3>
                <p style={{ margin: 0, color: '#555555', fontSize: '0.9rem', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section style={{ background: '#FFFFFF', padding: '56px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, marginBottom: '16px', color: '#111111' }}>
            Most spiritual gifts tests give you a list.
          </h2>
          <p style={{ fontSize: '1.3rem', fontWeight: 800, color: '#22C55E', marginBottom: '28px', lineHeight: 1.4 }}>
            This shows you where you actually belong — and what to do next.
          </p>
          <p style={{ fontSize: '1.05rem', color: '#111111', lineHeight: 1.8, marginBottom: '32px', fontWeight: 500 }}>
            The only Spiritual Gifts assessment that uses live AI to write your results — personalized to you, grounded in Scripture. Every person is unique, which is why every gift result is unique to you. The days of generic results are over. You weren&apos;t made to fit in a box, a test shouldn&apos;t put you in one either.
          </p>
          <Link href="/">
            <button style={{ background: '#22C55E', color: '#FFFFFF', fontWeight: 700, fontSize: '1.05rem', padding: '16px 40px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
              Find My Gifts Now →
            </button>
          </Link>
        </div>
      </section>

      {/* SCRIPTURE */}
      <section style={{ background: '#F9FAFB', padding: '52px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.25rem', fontStyle: 'italic', color: '#333333', lineHeight: 1.85, marginBottom: '12px' }}>
            &ldquo;Now there are varieties of gifts, but the same Spirit; and there are varieties of service, but the same Lord.&rdquo;
          </p>
          <p style={{ color: '#22C55E', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em' }}>1 CORINTHIANS 12:4–5</p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ background: '#FFFFFF', padding: '52px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '540px', margin: '0 auto', background: '#F9FAFB', borderRadius: '16px', padding: '36px 32px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
          <p style={{ fontSize: '1.1rem', color: '#222222', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '16px' }}>
            &ldquo;This is the most accurate thing I&apos;ve ever taken. I finally understand why I am the way I am — and why I&apos;ve never quite fit where I thought I should.&rdquo;
          </p>
          <p style={{ color: '#22C55E', fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>— Sarah M.</p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#F9FAFB', padding: '56px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, marginBottom: '36px', color: '#111111' }}>Common Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            {[
              {
                q: 'Is this really free?',
                a: 'Yes. The first 40 questions are completely free — no sign-up required. Full results (complete gift profile + 30-day plan) unlock for $9.99.',
              },
              {
                q: 'How is this different from other spiritual gifts tests?',
                a: 'Most tests give everyone the same generic descriptions pulled from a template. Ours uses live AI to write your results in the moment, based on your specific answers — grounded in Scripture.',
              },
              {
                q: 'How long does it take?',
                a: 'About 10 minutes for the free portion. The full assessment takes around 15–20 minutes.',
              },
              {
                q: 'Do I need to create an account?',
                a: 'No. You can start immediately with just your first name.',
              },
              {
                q: 'Is this theologically sound?',
                a: 'Yes. The assessment is built on the spiritual gift passages in 1 Corinthians 12, Romans 12, and Ephesians 4. Every result is grounded in Scripture, with live Bible API integration for full biblical context.',
              },
              {
                q: 'What gifts does the assessment cover?',
                a: 'Administration, Teaching, Encouragement, Giving, Leadership, Mercy, Service, Evangelism, Shepherding, Faith, and Hospitality — the gifts clearly identified across the New Testament.',
              },
            ].map((item, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px 28px', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
                <p style={{ fontWeight: 700, fontSize: '1rem', color: '#111111', margin: '0 0 8px' }}>{item.q}</p>
                <p style={{ fontSize: '0.95rem', color: '#555555', lineHeight: 1.7, margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: '#FFFFFF', padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, marginBottom: '16px', color: '#111111', lineHeight: 1.2 }}>
            Ready to finally see<br />how you&apos;re wired?
          </h2>
          <p style={{ color: '#555555', fontSize: '1.05rem', marginBottom: '32px', lineHeight: 1.7 }}>
            Your purpose is already inside you.<br />Stop guessing. Start knowing.
          </p>
          <Link href="/">
            <button style={{ background: '#22C55E', color: '#FFFFFF', fontWeight: 700, fontSize: '1.15rem', padding: '18px 52px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
              Find My Gifts →
            </button>
          </Link>
          <p style={{ marginTop: '14px', color: '#9CA3AF', fontSize: '0.85rem' }}>✓ Free &nbsp;·&nbsp; ✓ Takes 10 minutes &nbsp;·&nbsp; ✓ No sign-up required</p>
        </div>
      </section>

      {/* TODO: Add sample results preview section once results page is finalized */}

      {/* FOOTER */}
      <footer style={{ background: '#F9FAFB', borderTop: '1px solid #E5E7EB', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: '#9CA3AF', fontSize: '0.82rem', margin: 0 }}>
          <span style={{ color: '#22C55E', fontWeight: 600 }}>3Nails.ai</span> &nbsp;·&nbsp; © 2026 &nbsp;·&nbsp; Made with faith
        </p>
      </footer>

    </main>
  );
}
