import { useState } from 'react';

export function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className} bg-gray-100 overflow-hidden`}>
      <img
        src={error ? '/placeholder-landscape.jpg' : src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500`}
        onError={() => setError(true)}
      />
    </div>
  );
}
