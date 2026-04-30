import React from 'react';

const HeroSection = () => {
  return (
    <section style={{ background: '#fff', padding: '4rem 0', textAlign: 'center' }}>
      <div style={{ margin: '0 auto', maxWidth: '700px' }}>
        <div style={{ background: '#22C55E', color: '#fff', padding: '0.5rem 1.5rem', borderRadius: '20px', marginBottom: '2rem', display: 'inline-block' }}>
          Free Assessment · Takes 10 Minutes
        </div>
        <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 4rem)', fontWeight: 900, margin: '0 0 1rem' }}>
          You do not feel lost — you feel out of place. This shows you where you belong.
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
          Discover your unique spiritual gifts with our free 30-day assessment plan. Take the first step towards understanding your true purpose.
        </p>
        <a href="/start" style={{ display: 'inline-block', background: '#22C55E', color: '#fff', padding: '1rem 2rem', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
          Find My Gifts → Free
        </a>
        <div style={{ marginTop: '2rem', color: '#777' }}>
          Trusted by millions of users worldwide
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
