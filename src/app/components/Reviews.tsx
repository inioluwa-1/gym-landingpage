'use client';

import { ChevronLeft, ChevronRight, Star, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    text: ''
  });

  const defaultReviews = [
    {
      name: 'Kerry Rohan',
      rating: 4,
      text: 'Joining FitGuru was the best decision I made for my health. The trainers are incredibly supportive and knowledgeable. I\'ve lost 15 pounds in three months and gained so much confidence!'
    },
    {
      name: 'Sarah Mitchell',
      rating: 5,
      text: 'The atmosphere here is amazing! Everyone is so welcoming and motivating. The equipment is top-notch and the variety of classes keeps my workouts exciting. Highly recommend!'
    },
    {
      name: 'Michael Chen',
      rating: 4,
      text: 'Great gym with professional coaches who really care about your progress. The personalized training plans helped me achieve goals I never thought possible. Worth every penny!'
    }
  ];

  const [reviews, setReviews] = useState(defaultReviews);

  // Load reviews from localStorage on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem('userReviews');
    if (savedReviews) {
      const parsedReviews = JSON.parse(savedReviews);
      setReviews([...defaultReviews, ...parsedReviews]);
    }
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, [reviews.length]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.text.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Get existing reviews from localStorage
    const savedReviews = localStorage.getItem('userReviews');
    const existingReviews = savedReviews ? JSON.parse(savedReviews) : [];
    
    // Add new review
    const newReview = {
      name: formData.name,
      rating: formData.rating,
      text: formData.text
    };
    
    const updatedUserReviews = [...existingReviews, newReview];
    localStorage.setItem('userReviews', JSON.stringify(updatedUserReviews));
    
    // Update state
    setReviews([...defaultReviews, ...updatedUserReviews]);
    
    // Reset form and close modal
    setFormData({ name: '', rating: 5, text: '' });
    setIsModalOpen(false);
  };

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-12 md:mb-16 gap-4">
          <div>
            <p className="text-gray-400 text-base md:text-lg mb-2">Reviews</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">
              YOUR OPINIONS
            </h2>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 md:px-6 py-2 md:py-3 rounded-md text-sm md:text-base font-semibold hover:bg-gray-800 transition"
          >
            + Your Opinions
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 relative">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Share Your Opinion</h3>

              <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 text-black"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          size={28}
                          className={star <= formData.rating ? 'fill-gray-800 text-gray-800' : 'fill-gray-300 text-gray-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 resize-none text-black"
                    rows={4}
                    placeholder="Share your experience..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
        

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Circular Images */}
          <div className="relative h-64 md:h-80 flex items-center justify-center order-2 lg:order-1">
            {/* Image 1 - Top Left */}
            <div className="absolute top-4 md:top-8 left-1/4 w-20 md:w-28 h-20 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg z-10">
              <Image
                src="/review1.png"
                alt="Reviewer 1"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 2 - Top Right */}
            <div className="absolute top-4 md:top-8 right-1/4 w-20 md:w-28 h-20 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg z-20">
              <Image
                src="/review2.png"
                alt="Reviewer 2"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 3 - Bottom Left (Largest) */}
            <div className="absolute bottom-8 md:bottom-12 left-1/4 w-24 md:w-36 h-24 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg z-30">
              <Image
                src="/review3.png"
                alt="Reviewer 3"
                fill
                className="object-cover"
              />
            </div>

            {/* Image 4 - Bottom Right */}
            <div className="absolute bottom-8 md:bottom-12 right-1/4 w-20 md:w-28 h-20 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg z-20">
              <Image
                src="/review4.png"
                alt="Reviewer 4"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="order-1 lg:order-2">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Current Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  {reviews[currentIndex].name}
                </h3>
                
                {/* Star Rating */}
                <div className="flex gap-1 mb-3 md:mb-4">
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
              <div className="hidden md:block bg-white rounded-2xl p-6 md:p-8 shadow-md flex-1 opacity-40">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  {reviews[(currentIndex + 1) % reviews.length].name}
                </h3>
                
                {/* Star Rating */}
                <div className="flex gap-1 mb-3 md:mb-4">
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
