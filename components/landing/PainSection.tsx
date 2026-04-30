// components/landing/PainSection.tsx

import React from 'react';

const PainSection = () => {
  return (
    <section style={{ background: '#F9FAFB', padding: '64px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '40px' }}>
          Most people never figure this out.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ border: '2px solid #22C55E', borderRadius: '999px', padding: '24px 32px', background: '#FFFFFF' }}>
            <p style={{ fontSize: '16px', color: '#111827' }}>
              You feel like you are going through the motions — but something feels off.
            </p>
          </div>
          <div style={{ border: '2px solid #22C55E', borderRadius: '999px', padding: '24px 32px', background: '#FFFFFF' }}>
            <p style={{ fontSize: '16px', color: '#111827' }}>
              You want to make a difference, but you do not know where to start.
            </p>
          </div>
          <div style={{ border: '2px solid #22C55E', borderRadius: '999px', padding: '24px 32px', background: '#FFFFFF' }}>
            <p style={{ fontSize: '16px', color: '#111827' }}>
              You have prayed about your purpose. You are still waiting for an answer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainSection;
