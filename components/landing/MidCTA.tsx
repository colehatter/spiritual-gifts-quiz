import Link from 'next/link';

export default function MidCTA() {
  return (
    <div style={{ textAlign: 'center', padding: '28px 20px' }}>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          backgroundColor: '#22C55E',
          color: '#FFFFFF',
          fontWeight: 700,
          fontSize: '1.1rem',
          padding: '14px 40px',
          borderRadius: 12,
          textDecoration: 'none',
          width: '100%',
          maxWidth: 340,
          boxSizing: 'border-box',
        }}
      >
        Find My Gifts Now →
      </Link>
    </div>
  );
}
