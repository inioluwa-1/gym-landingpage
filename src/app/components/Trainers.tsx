'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';

export default function Trainers() {
  const trainers = [
    { id: 1, image: '/trainerone.png' },
    { id: 2, image: '/trainertwo.png' },
    { id: 3, image: '/trainerthree.png' },
    { id: 4, image: '/trainerfour.png' },
    { id: 5, image: '/trainerfive.png' },
    { id: 6, image: '/trainersix.png' }
  ];

  return (
    <section className="py-12 md:py-20 px-0 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 px-4 md:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Meet Our Trainers
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Our team of elite fitness professionals are here to push you beyond your limits and celebrate every victory
          </p>
        </div>

        {/* Mobile Carousel with Coverflow Effect */}
        <div className="md:hidden">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            spaceBetween={10}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[EffectCoverflow, Autoplay]}
            className="trainers-swiper"
          >
            {trainers.map((trainer) => (
              <SwiperSlide key={trainer.id}>
                <div className="w-[85vw] h-80 relative overflow-hidden rounded-3xl">
                  <Image
                    src={trainer.image}
                    alt={`Trainer ${trainer.id}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
        .trainers-swiper {
          width: 100%;
          padding: 20px 0 40px;
        }
        .trainers-swiper .swiper-slide {
          width: auto;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </section>
  );
}
