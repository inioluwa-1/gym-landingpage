'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: 'Beginner Plan',
      monthlyPrice: 10,
      yearlyPrice: 99,
      features: [
        'Access to gym equipment',
        'Locker room facilities',
        'Free fitness assessment',
        'Mobile app access'
      ],
      featured: false
    },
    {
      name: 'Premium Plan',
      monthlyPrice: 15,
      yearlyPrice: 149,
      features: [
        'All Beginner features',
        'Unlimited group classes',
        '2 personal training sessions',
        'Nutrition consultation',
        'Priority booking'
      ],
      featured: true
    },
    {
      name: 'Elite Plan',
      monthlyPrice: 20,
      yearlyPrice: 199,
      features: [
        'All Premium features',
        'Unlimited personal training',
        'Custom meal plans',
        'Recovery & spa access',
        'Guest passes (5/month)',
        '24/7 gym access'
      ],
      featured: false
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start mb-12 md:mb-16 gap-6" data-aos="fade-down">
          <div>
            <p className="text-base md:text-lg mb-2 font-semibold" style={{ color: '#FF0336' }}>Pricing Plan</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">
              JOIN TODAY
            </h2>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-1 md:gap-2 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 md:px-6 py-2 rounded-full transition text-sm md:text-base ${
                !isYearly
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-500'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 md:px-6 py-2 rounded-full transition text-sm md:text-base ${
                isYearly
                  ? 'bg-gray-900 text-white shadow'
                  : 'text-gray-500'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="rounded-3xl p-6 md:p-8 flex flex-col shadow-lg bg-white text-gray-900 transition-all group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Plan Name */}
              <h3 className="text-lg mb-4 text-gray-600 transition-colors">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl md:text-5xl font-bold transition-colors">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-lg md:text-xl ml-2 text-gray-600 transition-colors">
                  / {isYearly ? 'Year' : 'Month'}
                </span>
              </div>

              {/* Description */}
              <p className="mb-8 text-sm text-gray-500 transition-colors">
                Start your fitness journey with the perfect plan designed for your goals and lifestyle
              </p>

              {/* Features List */}
              <ul className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-gray-400 transition-colors">
                      <Check size={14} className="text-white transition-colors" />
                    </div>
                    <span className="text-sm text-gray-600 transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className="w-full py-3 md:py-4 rounded-xl font-semibold transition-all text-white border-2 border-transparent"
                style={{ backgroundColor: '#FF0336' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF5A7A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF0336';
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF5A7A';
                }}
                onTouchEnd={(e) => {
                  const element = e.currentTarget;
                  setTimeout(() => {
                    if (element) {
                      element.style.backgroundColor = '#FF0336';
                    }
                  }, 300);
                }}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
