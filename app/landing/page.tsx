'use client';

import HeroSection from '@/components/landing/Hero';
import VideoPlaceholder from '@/components/landing/VideoPlaceholder';
import PainSection from '@/components/landing/PainSection';
import WhatYouGet from '@/components/landing/WhatYouGet';
import HowItWorks from '@/components/landing/HowItWorks';
import Scripture from '@/components/landing/Scripture';
import SocialProof from '@/components/landing/SocialProof';
import FinalCTA from '@/components/landing/FinalCTA';

export default function LandingPage() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#111111', background: '#FFFFFF', margin: 0, padding: 0 }}>
      <HeroSection />
      <VideoPlaceholder />
      <PainSection />
      <WhatYouGet />
      <HowItWorks />
      <Scripture />
      <SocialProof />
      <FinalCTA />
      <footer style={{ background: '#F9FAFB', borderTop: '1px solid #E5E7EB', padding: '28px 24px', textAlign: 'center' }}>
        <p style={{ color: '#9CA3AF', fontSize: '0.85rem', margin: 0 }}>
          <span style={{ color: '#22C55E', fontWeight: 700 }}>3Nails.ai</span> &nbsp;·&nbsp; © 2026 &nbsp;·&nbsp; Made with faith
        </p>
      </footer>
    </main>
  );
}
