'use client';
import { useState } from 'react';

const VIMEO_EMBED_URL_MUTED = 'https://player.vimeo.com/video/1190527204?h=029b082dc8&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1';
const VIMEO_EMBED_URL_UNMUTED = 'https://player.vimeo.com/video/1190527204?h=029b082dc8&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=0';

export default function HeroWithVideo() {
  const [muted, setMuted] = useState(true);
  return (
    <section style={{ background: '#FFFFFF', textAlign: 'center' }}>
      {/* Green badge */}
      <div style={{ padding: 'clamp(2rem, 5vw, 3rem) 1.25rem 1rem' }}>
        <div style={{ display: 'inline-block', padding: '8px 20px', border: '2px solid #22C55E', backgroundColor: '#F0FDF4', color: '#22C55E', borderRadius: 20, marginBottom: '1rem', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
          Free Assessment · Takes 10 Minutes
        </div>
      </div>

      {/* Video — full width, above the fold */}
      <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: '0 1.25rem 1.5rem', boxSizing: 'border-box' }}>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
          <iframe
            src={muted ? VIMEO_EMBED_URL_MUTED : VIMEO_EMBED_URL_UNMUTED}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            title="Spiritual Gifts Video"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          />
          {/* Unmute overlay */}
          {muted && (
            <button
              onClick={() => setMuted(false)}
              style={{
                position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.75)', color: '#fff', border: '2px solid rgba(255,255,255,0.6)',
                borderRadius: 50, padding: '10px 20px', fontSize: '0.95rem', fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(4px)',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🔇</span> Tap to unmute
            </button>
          )}
        </div>
      </div>

      {/* Headline + copy */}
      <div style={{ padding: '0 1.25rem clamp(2rem, 5vw, 3rem)' }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 900, color: '#111111', margin: '0 0 1rem', lineHeight: 1.15 }}>
          You&apos;re not lost — you just haven&apos;t seen how you&apos;re wired yet.
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#111111', fontWeight: 'bold', margin: '0 0 0.75rem', lineHeight: 1.6 }}>
          In minutes, discover your God-given gifts — and why some things feel natural while others don&apos;t.
        </p>
        <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#111111', fontWeight: 'bold', margin: '0 0 1rem', lineHeight: 1.6 }}>
          This quiz will show you where you belong.
        </p>
        <p style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)', color: '#333333', fontStyle: 'italic', margin: '0 0 2rem', fontWeight: 600 }}>
          Designed to feel surprisingly personal.
        </p>
        <a style={{ display: 'block', padding: '18px 44px', backgroundColor: '#22C55E', color: '#FFFFFF', borderRadius: 12, fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', textDecoration: 'none', fontWeight: 700, maxWidth: 360, margin: '0 auto' }} href="/start">
          Find My Gifts → Free
        </a>
        <p style={{ color: '#555555', fontSize: 'clamp(0.9rem, 2vw, 1rem)', fontWeight: 600, marginTop: '1rem' }}>
          ✓ Free  ✓ Takes 10 minutes  ✓ No sign-up required
        </p>
      </div>
    </section>
  );
}
