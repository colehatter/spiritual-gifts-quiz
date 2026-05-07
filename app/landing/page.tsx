import Hero from '@/components/landing/Hero';
import MidCTA from '@/components/landing/MidCTA';
import VideoPlaceholder from '@/components/landing/VideoPlaceholder';
import FinallyUnderstood from '@/components/landing/FinallyUnderstood';
import WhatYouGet from '@/components/landing/WhatYouGet';
import HowItWorks from '@/components/landing/HowItWorks';
import Differentiation from '@/components/landing/Differentiation';
import Scripture from '@/components/landing/Scripture';
import SocialProof from '@/components/landing/SocialProof';
import FAQ from '@/components/landing/FAQ';
import FinalCTA from '@/components/landing/FinalCTA';

export const metadata = {
  title: 'Free Spiritual Gifts Assessment | Find Your God-Given Calling',
  description:
    'Discover your spiritual gifts with the only AI-powered assessment that writes personalized results just for you. Based on 1 Corinthians 12, Romans 12, and Ephesians 4. Free. No sign-up required.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is this really free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — all 40 questions and your initial results are completely free. A deeper adaptive assessment and your full 30-day plan unlock for $9.99.' } },
    { '@type': 'Question', name: 'How is this different from other spiritual gifts tests?', acceptedAnswer: { '@type': 'Answer', text: 'Every other test gives you a pre-written result based on your score category. Ours uses live AI to write a result specifically for your answer pattern. No two results are the same.' } },
    { '@type': 'Question', name: 'Which spiritual gifts does it assess?', acceptedAnswer: { '@type': 'Answer', text: 'We assess 11 gifts drawn from 1 Corinthians 12, Romans 12, and Ephesians 4 — including Teaching, Leadership, Mercy, Evangelism, Prophecy, Serving, Giving, Administration, Exhortation, Faith, and Discernment.' } },
    { '@type': 'Question', name: 'Do I need to create an account?', acceptedAnswer: { '@type': 'Answer', text: 'No. You can take the full free assessment without creating an account or entering an email address.' } },
    { '@type': 'Question', name: 'What is the 30-day activation plan?', acceptedAnswer: { '@type': 'Answer', text: 'After your results, you receive a 4-week plan with specific daily and weekly steps for living out your gift in your church, family, and work life.' } },
  ]
};

const HR = () => <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 20px' }} />;

export default function LandingPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div style={{ backgroundColor: '#FFFFFF', color: '#111111', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', minHeight: '100vh' }}>
      <Hero />
      <VideoPlaceholder />
      <FinallyUnderstood />
      <MidCTA />
      <HR />
      <WhatYouGet />
      <HR />
      <HowItWorks />
      <HR />
      <Differentiation />
      <MidCTA />
      <HR />
      <Scripture />
      <HR />
      <SocialProof />
      <MidCTA />
      <HR />
      <FAQ />
      <HR />
      <FinalCTA />
      <footer style={{ borderTop: '1px solid #E5E7EB', padding: '28px 20px', textAlign: 'center' }}>
        <p style={{ fontWeight: 700, fontSize: '1.25rem', color: '#22C55E', marginBottom: 6 }}>3Nails.ai</p>
        <p style={{ color: '#555555', fontSize: '0.875rem', margin: 0 }}>© 2026 3Nails.ai · Made with faith</p>
      </footer>
    </div>
    </div>
  );
}
