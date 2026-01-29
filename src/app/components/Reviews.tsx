'use client';

import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      name: 'Kerry Rohan',
      rating: 4,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      name: 'Kerry Rohan',
      rating: 4,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      name: 'Kerry Rohan',
      rating: 4,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  ];

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <div>
            <p className="text-gray-400 text-lg mb-2">Reviews</p>
            <h2 className="text-5xl md:text-6xl font-bold text-black">
              YOUR OPINIONS
            </h2>
          </div>

          <button className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition">
            + Your Opinions
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Circular Images */}
          <div className="relative h-80 flex items-center justify-center">
            {/* Image 1 - Top Left */}
            <div className="absolute top-4 left-8 w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg z-10">
              <Image
                src="/review1.png"
                alt="Reviewer 1"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 2 - Top Right */}
            <div className="absolute top-0 right-8 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg z-20">
              <Image
                src="/review2.png"
                alt="Reviewer 2"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 3 - Bottom Left (Largest) */}
            <div className="absolute bottom-4 left-0 w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-lg z-30">
              <Image
                src="/review3.png"
                alt="Reviewer 3"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 4 - Bottom Right */}
            <div className="absolute bottom-0 right-0 w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg z-20">
              <Image
                src="/review4.png"
                alt="Reviewer 4"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Testimonial Cards */}
          <div>
            <div className="flex gap-6 mb-8">
              {/* Current Card */}
              <div className="bg-white rounded-2xl p-8 shadow-md flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {reviews[currentIndex].name}
                </h3>
                
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < reviews[currentIndex].rating ? 'fill-gray-800 text-gray-800' : 'fill-gray-300 text-gray-300'}
                    />
                  ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {reviews[currentIndex].text}
                </p>
              </div>

              {/* Next Card Preview (faded) */}
              <div className="bg-white rounded-2xl p-8 shadow-md flex-1 opacity-40">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {reviews[(currentIndex + 1) % reviews.length].name}
                </h3>
                
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < reviews[(currentIndex + 1) % reviews.length].rating ? 'fill-gray-800 text-gray-800' : 'fill-gray-300 text-gray-300'}
                    />
                  ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {reviews[(currentIndex + 1) % reviews.length].text}
                </p>
              </div>
            </div>

            {/* Navigation Buttons
            <div className="flex gap-4">
              <button
                onClick={prevReview}
                className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextReview}
                className="w-12 h-12 rounded-full border-2 border-gray-800 text-gray-800 flex items-center justify-center hover:bg-gray-100 transition"
              >
                <ChevronRight size={24} />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
