import React from 'react';

const HowItWorks = () => {
  return (
    <section style={{ background: '#F0FDF4', padding: '40px', textAlign: 'center' }}>
      <h2 style={{ color: '#22C55E', fontSize: '24px', marginBottom: '20px' }}>How it works</h2>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Step
            number={1}
            title="Answer 40 questions"
            description="Honest scenarios that reveal how you actually operate — not how you wish you did."
          />
          <Step
            number={2}
            title="See your top gift"
            description="Instantly get your primary spiritual gift with a full description grounded in Scripture."
          />
          <Step
            number={3}
            title="Unlock your full results"
            description="For $9.99, get your complete gift profile, shadow side analysis, and 30-day plan written by AI for you."
          />
        </div>
      </div>
    </section>
  );
};

const Step = ({ number, title, description }: { number: number | string; title: string; description: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#22C55E', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {number}
    </div>
    <div>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>{title}</h3>
      <p style={{ color: '#555555', margin: '5px 0 0 0' }}>{description}</p>
    </div>
  </div>
);

export default HowItWorks;
