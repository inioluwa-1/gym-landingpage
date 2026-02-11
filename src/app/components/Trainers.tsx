'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Trainers() {
  const trainers = [
    { id: 1, image: '/trainerone.png' },
    { id: 2, image: '/trainertwo.png' },
    { id: 3, image: '/trainerthree.png' },
    { id: 4, image: '/trainerfour.png' },
    { id: 5, image: '/trainerfive.png' },
    { id: 6, image: '/trainersix.png' }
  ];

  // Duplicate trainers for infinite scroll effect
  const infiniteTrainers = [...trainers, ...trainers, ...trainers];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Set initial scroll position to the middle set
    scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;

    let scrollInterval: NodeJS.Timeout;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer) {
          const cardWidth = 280;
          const gap = 16;
          const scrollAmount = cardWidth + gap;
          
          scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }, 3000);
    };

    const handleScroll = () => {
      if (!scrollContainer) return;

      const scrollWidth = scrollContainer.scrollWidth;
      const scrollLeft = scrollContainer.scrollLeft;
      const clientWidth = scrollContainer.clientWidth;

      // When reaching the end of the second set, jump back to the start of the second set
      if (scrollLeft >= (scrollWidth / 3) * 2) {
        scrollContainer.style.scrollBehavior = 'auto';
        scrollContainer.scrollLeft = scrollWidth / 3;
        scrollContainer.style.scrollBehavior = 'smooth';
      }
      // When reaching the start of the first set, jump to the start of the second set
      else if (scrollLeft <= scrollWidth / 3 - clientWidth) {
        scrollContainer.style.scrollBehavior = 'auto';
        scrollContainer.scrollLeft = scrollWidth / 3;
        scrollContainer.style.scrollBehavior = 'smooth';
      }
    };

    // Only auto-scroll on mobile
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        startAutoScroll();
        scrollContainer?.addEventListener('scroll', handleScroll);
      } else {
        clearInterval(scrollInterval);
        scrollContainer?.removeEventListener('scroll', handleScroll);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      clearInterval(scrollInterval);
      scrollContainer?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Meet Our Trainers
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Our team of elite fitness professionals are here to push you beyond your limits and celebrate every victory
          </p>
        </div>

        {/* Mobile Carousel */}
        <div 
          ref={scrollRef}
          className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-4 -mx-4"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
        >
          {infiniteTrainers.map((trainer, index) => (
            <div 
              key={`${trainer.id}-${index}`}
              className="shrink-0 w-[calc(100vw-80px)] max-w-70 h-80 relative overflow-hidden rounded-3xl"
            >
              <Image
                src={trainer.image}
                alt={`Trainer ${trainer.id}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Trainer 1 - Portrait */}
          <div className="relative h-79 overflow-hidden rounded-3xl">
            <Image
              src="/trainerone.png"
              alt="Trainer 1"
              fill
              className="object-cover"
            />
          </div>

          {/* Trainer 2 - Wide Landscape (spans 2 columns) */}
          <div className="relative h-79 overflow-hidden rounded-3xl sm:col-span-2">
            <Image
              src="/trainertwo.png"
              alt="Trainer 2"
              fill
              className="object-cover"
            />
          </div>

          {/* Trainer 3 - Portrait */}
          <div className="relative h-79 overflow-hidden rounded-3xl">
            <Image
              src="/trainerthree.png"
              alt="Trainer 3"
              fill
              className="object-cover"
            />
          </div>

          {/* Trainer 4 - Landscape (spans 2 columns) */}
          <div className="relative h-79 overflow-hidden rounded-3xl sm:col-span-2">
            <Image
              src="/trainerfour.png"
              alt="Trainer 4"
              fill
              className="object-cover"
            />
          </div>

          {/* Trainer 5 - Portrait */}
          <div className="relative h-79 overflow-hidden rounded-3xl">
            <Image
              src="/trainerfive.png"
              alt="Trainer 5"
              fill
              className="object-cover"
            />
          </div>

          {/* Trainer 6 - Landscape */}
          <div className="relative h-79 overflow-hidden rounded-3xl">
            <Image
              src="/trainersix.png"
              alt="Trainer 6"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
