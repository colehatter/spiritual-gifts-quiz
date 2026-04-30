import Link from 'next/link';

const FinalCTA = () => {
  return (
    <section style={{
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '50px 20px',
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#111111',
        margin: '0 0 20px',
      }}>
        Your purpose is already inside you.
      </h2>
      <p style={{
        fontSize: '1.2rem',
        color: '#555555',
        margin: '0 0 30px',
      }}>
        Stop guessing. Start knowing.
      </p>
      <Link href="/start" style={{
        textDecoration: 'none',
      }}>
        <button style={{
          backgroundColor: '#22C55E',
          color: 'white',
          fontWeight: 'bold',
          padding: '18px 48px',
          borderRadius: '12px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
        }}>
          Find My Gifts → Free
        </button>
      </Link>
      <div style={{
        color: '#9CA3AF',
        fontSize: '0.9rem',
        marginTop: '20px',
      }}>
        ✓ Free &nbsp; ✓ Takes 10 minutes &nbsp; ✓ No sign-up required
      </div>
    </section>
  );
};

export default FinalCTA;
