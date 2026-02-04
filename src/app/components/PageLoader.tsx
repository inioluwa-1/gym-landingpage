'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-white flex items-center justify-center">
      <div className="animate-pulse">
        <Image
          src="/loader.png"
          alt="Loading"
          width={150}
          height={150}
          className="object-contain animate-fade"
          priority
        />
      </div>
      
      <style jsx>{`
        @keyframes fade {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        
        .animate-fade {
          animation: fade 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
