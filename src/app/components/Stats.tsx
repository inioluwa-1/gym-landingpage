'use client';

import { useEffect, useState, useRef } from 'react';

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: 5, label: 'Years of Service', suffix: '+' },
    { value: 10, label: 'Certified Trainers', suffix: '+' },
    { value: 786, label: 'Happy Members', suffix: '+' },
    { value: 95, label: 'Customer Satisfaction', suffix: '%' }
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const timers = stats.map((stat, index) => {
      const increment = stat.value / steps;
      let currentStep = 0;

      return setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = Math.min(
              Math.round(increment * currentStep),
              stat.value
            );
            return newCounts;
          });
        }
      }, stepDuration);
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative z-10 bg-black/80 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 md:mb-2">
                {counts[index]}{stat.suffix}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
