'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: 'Beginner Plan',
      price: 10,
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
      price: 15,
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
      price: 20,
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start mb-12 md:mb-16 gap-6">
          <div>
            <p className="text-gray-400 text-base md:text-lg mb-2">Pricing Plan</p>
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
              className="rounded-3xl p-6 md:p-8 flex flex-col shadow-lg bg-white text-gray-900 hover:text-white transition-all group"
              style={{
                transition: 'background-color 0.3s ease, color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2D2D2D';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              {/* Plan Name */}
              <h3 className="text-lg mb-4 text-gray-600 group-hover:text-white transition-colors">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-5xl font-bold group-hover:text-white transition-colors">${plan.price}</span>
                <span className="text-xl ml-2 text-gray-600 group-hover:text-white transition-colors">
                  / Month
                </span>
              </div>

              {/* Description */}
              <p className="mb-8 text-sm text-gray-500 group-hover:text-white transition-colors">
                Start your fitness journey with the perfect plan designed for your goals and lifestyle
              </p>

              {/* Features List */}
              <ul className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-gray-400 group-hover:bg-white transition-colors">
                      <Check size={14} className="text-white group-hover:text-gray-900 transition-colors" />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-white transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className="w-full py-4 rounded-xl font-semibold transition-all text-white hover:bg-white hover:text-black group-hover:bg-white group-hover:text-black group-hover:hover:bg-gray-100"
                style={{ backgroundColor: '#2D2D2D' }}
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
