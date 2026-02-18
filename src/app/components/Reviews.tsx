'use client';

import { ChevronLeft, ChevronRight, Star, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'https://gym-backend-zbz2.onrender.com/api';

export default function Reviews() {
  const { user, openAuthModal } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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

  // Fetch reviews from API on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/reviews`);
      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Keep default reviews if API fails
    }
  };

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      handleTransition((prev) => (prev + 1) % reviews.length);
    }, 4000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, [reviews.length]);

  const handleTransition = (nextIndexOrFn: number | ((prev: number) => number)) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(nextIndexOrFn);
      setIsTransitioning(false);
    }, 300); // Match CSS transition duration
  };

  const nextReview = () => {
    handleTransition((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    handleTransition((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    
    if (!formData.name.trim() || !formData.text.trim()) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (formData.text.length < 10) {
      setErrorMessage('Review must be at least 10 characters long');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare review data
      const reviewData = {
        name: user ? user.name : formData.name,
        rating: formData.rating,
        text: formData.text,
        userId: user ? user._id : undefined
      };

      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Review submitted successfully! Thank you for your feedback.');
        // Refresh reviews from API
        await fetchReviews();
        // Set to first review (the newly posted one)
        setCurrentIndex(0);
        // Reset form
        setFormData({ name: '', rating: 5, text: '' });
        // Close modal after 2 seconds
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccessMessage('');
        }, 2000);
      } else {
        setErrorMessage(data.message || 'Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrorMessage('Failed to submit review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-12 md:mb-16 gap-4" data-aos="fade-down">
          <div>
            <p className="text-base md:text-lg mb-2 font-semibold" style={{ color: '#FF0336' }}>Reviews</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">
              YOUR OPINIONS
            </h2>
          </div>

          <button 
            onClick={() => {
              // Check if user is logged in
              if (!user) {
                openAuthModal();
                return;
              }
              
              setIsModalOpen(true);
            }}
            className="text-white px-4 md:px-6 py-2 md:py-3 rounded-md text-sm md:text-base font-semibold hover:opacity-90 transition"
            style={{ backgroundColor: '#FF0336' }}
          >
            + Your Opinions
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
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
                {/* Success Message */}
                {successMessage && (
                  <div className="mb-4 p-3 bg-green-500 rounded-lg text-sm text-white">
                    {successMessage}
                  </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {errorMessage}
                  </div>
                )}

                {/* Name Input */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={user ? user.name : formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter your name"
                    disabled={!!user}
                    required={!user}
                  />
                  {user && (
                    <p className="text-xs text-gray-500 mt-1">Logged in as {user.name}</p>
                  )}
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
                  disabled={isLoading}
                  className="w-full text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#FF0336' }}
                  onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#FF5A7A')}
                  onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#FF0336')}
                  onTouchStart={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#FF5A7A')}
                  onTouchEnd={(e) => {
                    if (!isLoading) {
                      const element = e.currentTarget;
                      setTimeout(() => {
                        if (element) {
                          element.style.backgroundColor = '#FF0336';
                        }
                      }, 300);
                    }
                  }}
                >
                  {isLoading ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>
        )}
        

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Circular Images */}
          <div className="relative h-64 md:h-80 flex items-center justify-center order-2 lg:order-1" data-aos="zoom-in">
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
          <div className="order-1 lg:order-2" data-aos="fade-up" data-aos-delay="100">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Current Card */}
              <div 
                className={`bg-white rounded-2xl p-6 md:p-8 shadow-md flex-1 transition-all duration-500 ease-in-out ${
                  isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
                }`}
              >
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
              <div 
                className={`hidden md:block bg-white rounded-2xl p-6 md:p-8 shadow-md flex-1 transition-all duration-500 ease-in-out ${
                  isTransitioning ? 'opacity-20 transform translate-x-4' : 'opacity-40 transform translate-x-0'
                }`}
              >
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
