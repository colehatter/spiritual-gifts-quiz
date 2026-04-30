import React from 'react';

const VideoPlaceholder: React.FC = () => {
  return (
    <section style={{
      padding: '56px 24px',
      backgroundColor: '#111111',
      color: '#888888',
      textAlign: 'center',
    }}>
      <div style={{
        display: 'inline-block',
        backgroundColor: '#1a1a1a',
        border: '2px solid #22C55E',
        borderRadius: '16px',
        padding: '0',
        position: 'relative',
        width: '100%',
        maxWidth: '640px',
        paddingTop: '56.25%', // 16:9 aspect ratio
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#22C55E',
          fontSize: '4rem',
        }}>
          ▶
        </div>
        <div style={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#888888',
          fontSize: '1.2rem',
        }}>
          Watch: How to find your calling
        </div>
      </div>
      <div style={{
        marginTop: '16px',
        color: '#888888',
        fontSize: '1rem',
      }}>
        See how thousands are discovering their God-given purpose
      </div>
    </section>
  );
};

export default VideoPlaceholder;
