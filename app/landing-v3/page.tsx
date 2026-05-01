'use client'
import Link from 'next/link'

export default function LandingV3() {
  return (
    <main>
      {/* SECTION 1 — HERO */}
      <section style={{ background: '#FFFFFF', padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '8px 20px', border: '2px solid #22C55E', backgroundColor: '#F0FDF4', color: '#22C55E', borderRadius: '20px', marginBottom: '2rem' }}>
          Free Assessment · Takes 10 Minutes
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#111111', margin: '0 0 1rem' }}>
          You're not lost — you just haven't seen how you're wired yet.
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#111111', fontWeight: 'bold', margin: '0 0 1rem' }}>
          In minutes, discover your God-given gifts — and why some things feel natural while others don't.
        </p>
        <p style={{ fontSize: '1rem', color: '#333333', fontStyle: 'italic', margin: '0 0 2rem' }}>
          Designed to feel surprisingly personal.
        </p>
        <Link href="/" style={{ display: 'inline-block', padding: '18px 44px', backgroundColor: '#22C55E', color: '#FFFFFF', borderRadius: '12px', fontSize: '1.15rem', textDecoration: 'none' }}>
          Find My Gifts → Free
        </Link>
        <p style={{ color: '#777777', fontSize: '0.8rem', marginTop: '1rem' }}>
          ✓ Free  ✓ Takes 10 minutes  ✓ No sign-up required
        </p>
      </section>

      {/* SECTION 2 — "FINALLY UNDERSTOOD" */}
      <section style={{ background: '#111111', color: '#FFFFFF', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0 0 1rem' }}>
          This might explain a lot…
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#E5E7EB', margin: '0 0 0.5rem' }}>
          Why some things feel effortless to you
        </p>
        <p style={{ fontSize: '1.2rem', color: '#E5E7EB', margin: '0 0 0.5rem' }}>
          Why other roles leave you drained
        </p>
        <p style={{ fontSize: '1.2rem', color: '#E5E7EB', margin: '0 0 1rem' }}>
          Why you've never quite felt like you fit
        </p>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 1rem' }}>
          That feeling isn't random. It's a signal.
        </p>
        <p style={{ fontSize: '1.2rem', color: '#D1FAE5', margin: '0 0 2rem' }}>
          You're not broken. And you're not behind. You were created a specific way — on purpose. You just haven't seen it clearly yet.
        </p>
        <Link href="/" style={{ display: 'inline-block', padding: '18px 44px', backgroundColor: '#22C55E', color: '#FFFFFF', borderRadius: '12px', fontSize: '1.15rem', textDecoration: 'none' }}>
          Find My Gifts Now →
        </Link>
      </section>

      {/* SECTION 3 — CREDIBILITY / WHAT YOU'LL DISCOVER */}
      <section style={{ background: '#FFFFFF', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111111', margin: '0 0 2rem' }}>
          Here's what you'll discover:
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', margin: '0 auto', maxWidth: '1200px' }}>
          <div style={{ backgroundColor: '#F9FAFB', borderLeft: '4px solid #22C55E', borderRadius: '8px', padding: '20px', textAlign: 'left' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>
              🎯 Your top God-given spiritual gifts
            </p>
            <p style={{ fontSize: '1rem', color: '#777777', margin: '0' }}>
              Wired by God, not chosen by you. Finally understand how you're built.
            </p>
          </div>
          <div style={{ backgroundColor: '#F9FAFB', borderLeft: '4px solid #22C55E', borderRadius: '8px', padding: '20px', textAlign: 'left' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>
              📍 Where you actually belong
            </p>
            <p style={{ fontSize: '1rem', color: '#777777', margin: '0' }}>
              Find where you fit — and where you don't. That contrast changes everything.
            </p>
          </div>
          <div style={{ backgroundColor: '#F9FAFB', borderLeft: '4px solid #22C55E', borderRadius: '8px', padding: '20px', textAlign: 'left' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>
              📅 Clear next steps
            </p>
            <p style={{ fontSize: '1rem', color: '#777777', margin: '0' }}>
              Week-by-week activation plan written by AI specifically for you, grounded in Scripture.
            </p>
          </div>
        </div>
      </section>

<section style={{ padding: '64px 24px', textAlign: 'center', backgroundColor: 'white' }}>
  <div style={{ maxWidth: '640px', margin: 'auto' }}>
    <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: '#111111' }}>This might explain why…</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <span style={{ color: '#22C55E', fontWeight: 900, fontSize: '1.3rem' }}>→</span>
        <p style={{ color: '#222222', fontSize: '1.15rem', lineHeight: '1.65' }}>You’ve never quite felt like you fit — even in church.</p>
      </div>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <span style={{ color: '#22C55E', fontWeight: 900, fontSize: '1.3rem' }}>→</span>
        <p style={{ color: '#222222', fontSize: '1.15rem', lineHeight: '1.65' }}>Some roles feel completely natural, and others leave you drained.</p>
      </div>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <span style={{ color: '#22C55E', fontWeight: 900, fontSize: '1.3rem' }}>→</span>
        <p style={{ color: '#222222', fontSize: '1.15rem', lineHeight: '1.65' }}>You know you’re meant for more, but can’t pinpoint what.</p>
      </div>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <span style={{ color: '#22C55E', fontWeight: 900, fontSize: '1.3rem' }}>→</span>
        <p style={{ color: '#222222', fontSize: '1.15rem', lineHeight: '1.65' }}>You’ve prayed about your purpose. You’re still waiting for an answer.</p>
      </div>
    </div>
    <p style={{ color: '#555555', fontSize: '1.1rem' }}>You’re not broken. And you’re not behind.</p>
    <p style={{ color: '#111111', fontWeight: 800, fontSize: '1.25rem' }}>That feeling isn’t random. It’s a signal.</p>
    <p style={{ color: '#333333', fontSize: '1.05rem' }}>You’re not just getting a result — you’re discovering how you were designed.</p>
    <a href="/" style={{ display: 'inline-block', backgroundColor: '#22C55E', color: 'white', padding: '16px 40px', borderRadius: '12px', fontWeight: 700, fontSize: '1.1rem', border: 'none', cursor: 'pointer' }}>Find My Gifts Now →</a>
  </div>
</section>

<section style={{ backgroundColor: '#F0FDF4', padding: '64px 24px', textAlign: 'center' }}>
  <h2 style={{ color: '#000', fontWeight: 800 }}>How it works</h2>
  <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '40px' }}>Simple. Fast. Surprisingly accurate.</p>
  <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', maxWidth: '860px', margin: '0 auto 32px', flexWrap: 'wrap', justifyContent: 'center' }}>
    <div style={{ flex: 1, minWidth: '220px', backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '24px 20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'left' }}>
      <div style={{ backgroundColor: '#22C55E', color: '#FFFFFF', width: '44px', height: '44px', borderRadius: '50%', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>1</div>
      <h3 style={{ fontWeight: 800, marginBottom: '8px', color: '#111' }}>Answer a few quick questions</h3>
      <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.65' }}>Honest scenarios that reveal how you’re actually wired.</p>
    </div>
    <div style={{ flex: 1, minWidth: '220px', backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '24px 20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'left' }}>
      <div style={{ backgroundColor: '#22C55E', color: '#FFFFFF', width: '44px', height: '44px', borderRadius: '50%', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>2</div>
      <h3 style={{ fontWeight: 800, marginBottom: '8px', color: '#111' }}>Get your personalized gift profile</h3>
      <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.65' }}>See your top spiritual gift instantly, grounded in Scripture.</p>
    </div>
    <div style={{ flex: 1, minWidth: '220px', backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '24px 20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'left' }}>
      <div style={{ backgroundColor: '#22C55E', color: '#FFFFFF', width: '44px', height: '44px', borderRadius: '50%', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>3</div>
      <h3 style={{ fontWeight: 800, marginBottom: '8px', color: '#111' }}>Unlock your complete profile</h3>
      <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.65' }}>For $9.99: full breakdown, shadow side, and 30-day AI-written plan.</p>
    </div>
  </div>
  <p style={{ fontStyle: 'italic', color: '#777', fontSize: '0.95rem', marginBottom: '32px' }}>Built to feel personal — not generic.</p>
  <a href="/" style={{ backgroundColor: '#22C55E', color: '#FFFFFF', padding: '16px 40px', borderRadius: '12px', fontWeight: 700, fontSize: '1.1rem', border: 'none', cursor: 'pointer', textDecoration: 'none' }}>Find My Gifts Now →</a>
</section>

<section style={{ backgroundColor: 'white', padding: '64px 24px', textAlign: 'center' }}>
  <div style={{ maxWidth: '800px', margin: 'auto' }}>
    <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#111111' }}>Most spiritual gifts tests give you a list.</h2>
    <p style={{ color: '#22C55E', fontWeight: 900, fontSize: '1.35rem', marginBottom: '20px' }}>This shows you where you actually belong — and where you don’t.</p>
    <p style={{ color: '#111111', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '700px', margin: '0 auto 16px' }}>
      The only Spiritual Gifts assessment that uses live AI to write your results — personalized to you, grounded in Scripture. Every person is unique, which is why every gift result is unique to you. The days of generic results are over. You weren’t made to fit in a box — a test shouldn’t put you in one either.
    </p>
    <p style={{ color: '#111111', fontWeight: 800, fontSize: '1.1rem' }}>Discover the unique way God designed YOU to show up.</p>
  </div>
</section>

<section style={{ backgroundColor: 'white', padding: '56px 24px', textAlign: 'center' }}>
  <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: '#444', lineHeight: '1.8', maxWidth: '620px', margin: '0 auto 12px' }}>
    “Now there are varieties of gifts, but the same Spirit; and there are varieties of service, but the same Lord.”
  </p>
  <p style={{ color: '#22C55E', fontWeight: '600', fontSize: '0.9rem' }}>1 Corinthians 12:4-5</p>
</section>
<section style={{ backgroundColor: '#F9FAFB', padding: '56px 24px', textAlign: 'center' }}>
  <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '36px 32px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', maxWidth: '560px', margin: '0 auto' }}>
    <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: '#333', lineHeight: '1.7', marginBottom: '16px' }}>
      “This is the most accurate thing I’ve ever taken. I finally understand why I am the way I am.”
    </p>
    <p style={{ color: '#22C55E', fontWeight: '600', fontSize: '0.9rem', margin: '0' }}>— Sarah M.</p>
  </div>
</section>

<section style={{ backgroundColor: 'white', padding: '72px 24px', textAlign: 'center' }}>
  <div style={{ maxWidth: '600px', margin: 'auto' }}>
    <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: 'black', marginBottom: '20px' }}>Your purpose is already inside you.</h2>
    <p style={{ color: '#555', fontSize: '1.05rem', marginBottom: '16px' }}>Stop guessing. Start knowing.</p>
    <p style={{ color: '#111', fontWeight: 700, fontSize: '1.05rem', marginBottom: '36px' }}>Most people discover they’ve been serving in the wrong place.</p>
    <a href="/" style={{ display: 'inline-block', backgroundColor: '#22C55E', color: 'white', fontWeight: 700, fontSize: '1.15rem', padding: '18px 44px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>Find My Gifts → Free</a>
    <p style={{ marginTop: '16px', color: '#9CA3AF', fontSize: '0.85rem' }}>✓ Free    ✓ Takes 10 minutes    ✓ No sign-up required</p>
  </div>
</section>
<section style={{ backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E7EB', padding: '28px 24px', textAlign: 'center' }}>
  <p style={{ color: '#9CA3AF', fontSize: '0.85rem', margin: 0 }}>
    <span style={{ color: '#22C55E', fontWeight: 700 }}>3Nails.ai</span> · © 2026 · Made with faith
  </p>
</section>

    </main>
  )
}
