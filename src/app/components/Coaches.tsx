'use client';

import Image from 'next/image';

export default function Coaches() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Images */}
          <div className="flex gap-3 md:gap-6 order-2 lg:order-1" data-aos="fade-up">
            {/* Left Image - Woman */}
            <div className="relative w-1/2 h-64 md:h-96 rounded-3xl overflow-hidden">
              <Image
                src="/woman-standing.jpg"
                alt="Female coach"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Image - Man */}
            <div className="relative w-1/2 h-64 md:h-96 rounded-3xl overflow-hidden">
              <Image
                src="/man-sitting.jpg"
                alt="Male coach"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2" data-aos="fade-up" data-aos-delay="100">
            <p className="text-base md:text-lg mb-3 md:mb-4 font-semibold" style={{ color: '#FF0336' }}>
              Are you looking for a Mentor?
            </p>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              Coaches
            </h2>
            
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              Our certified coaches bring years of experience and passion to every session. They'll guide you through personalized training programs, perfect your form, and keep you motivated to crush your goals.
            </p>

            <button 
              className="text-white px-8 py-3.5 rounded-md font-semibold transition" 
              style={{ backgroundColor: '#FF0336' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5A7A'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF0336'}
              onTouchStart={(e) => e.currentTarget.style.backgroundColor = '#FF5A7A'}
              onTouchEnd={(e) => {
                const element = e.currentTarget;
                setTimeout(() => {
                  if (element) {
                    element.style.backgroundColor = '#FF0336';
                  }
                }, 300);
              }}
            >
              Explore More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
