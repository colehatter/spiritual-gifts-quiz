import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center justify-center py-4 mb-2">
      <Image
        src="/logo-white-slogan.png"
        alt="3Nails.ai"
        width={160}
        height={60}
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  );
}
