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
        'Lorem ipsum dolor sit amet,',
        'Lorem ipsum dolor sit amet,',
        'Lorem ipsum dolor sit amet,',
        'Lorem ipsum dolor sit amet,'
      ],
      featured: false
    },
    {
      name: 'Premium Plan',
      price: 15,
      features: [
        'Lorem ipsum dolor sit amet,',
        'Lorem ipsum dolor sit amet,',
        'Lorem ipsum dolor sit amet,',
        'Lorem ipsum dolor sit amet,',
        'Lorem ipsum dolor sit amet,'
      ],
      featured: true
    },
    {
      name: 'Premium Plan',
      price: 20,
      features: [
        'Lorem ipsum dolor sit amet,',
        'Lorem ipsum dolor sit amet,',
        'Lorem ipsum dolor sit amet,',
        'Lorem ipsum dolor sit amet,',
        'Lorem ipsum dolor sit amet,',
        'Lorem ipsum dolor sit amet,'
      ],
      featured: false
    }
  ];

  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <div>
            <p className="text-gray-400 text-lg mb-2">Pricing Plan</p>
            <h2 className="text-5xl md:text-6xl font-bold text-black">
              JOIN TODAY
            </h2>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full transition ${
                !isYearly
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-500'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full transition ${
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
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 flex flex-col shadow-lg ${
                plan.featured
                  ? 'text-white'
                  : 'bg-gray-50 text-gray-900'
              }`}
              style={plan.featured ? { backgroundColor: '#2D2D2D' } : undefined}
            >
              {/* Plan Name */}
              <h3 className={`text-lg mb-4 ${plan.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-5xl font-bold">${plan.price}</span>
                <span className={`text-xl ml-2 ${plan.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                  / Month
                </span>
              </div>

              {/* Description */}
              <p className={`mb-8 text-sm ${plan.featured ? 'text-gray-300' : 'text-gray-500'}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              </p>

              {/* Features List */}
              <ul className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.featured ? 'bg-white' : 'bg-gray-400'
                    }`}>
                      <Check size={14} className={plan.featured ? 'text-gray-900' : 'text-white'} />
                    </div>
                    <span className={`text-sm ${plan.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`w-full py-4 rounded-xl font-semibold transition ${
                  plan.featured
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'text-white hover:bg-gray-700'
                }`}
                style={!plan.featured ? { backgroundColor: '#2D2D2D' } : undefined}
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
