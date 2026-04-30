import React from 'react';

const Scripture: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'white',
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
        padding: '20px',
        border: '1px solid #E5E5E5',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <p style={{
          fontSize: '1.2em',
          color: '#333',
          fontStyle: 'italic',
          marginBottom: '10px',
        }}>
          &ldquo;Now there are varieties of gifts, but the same Spirit; and there are varieties of service, but the same Lord.&rdquo;
        </p>
        <p style={{
          color: '#22C55E',
          fontSize: '0.9em',
          margin: 0,
        }}>
          1 Corinthians 12:4-5
        </p>
      </div>
    </div>
  );
};

export default Scripture;
