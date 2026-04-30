import React from 'react';

const SocialProof = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          padding: '20px',
          maxWidth: '500px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          textAlign: 'center',
          backgroundColor: 'white',
        }}
      >
        <blockquote
          style={{
            fontStyle: 'italic',
            fontSize: '18px',
            lineHeight: '1.5',
            color: '#333',
          }}
        >
          "This is the most accurate thing I have ever taken. I finally understand why I am the way I am."
        </blockquote>
        <p
          style={{
            color: '#22C55E',
            fontSize: '14px',
            marginTop: '10px',
          }}
        >
          — Sarah M.
        </p>
      </div>
    </div>
  );
};

export default SocialProof;
