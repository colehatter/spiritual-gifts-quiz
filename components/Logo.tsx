import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center justify-center py-2 mb-0">
      <Image
        src="/logo-white-slogan.png"
        alt="3Nails.ai"
        width={480}
        height={142}
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  );
}
