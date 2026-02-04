import { Dumbbell, Award, Lightbulb, Zap } from 'lucide-react';
import Image from 'next/image';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Dumbbell size={24} />,
      title: 'Modern Equipment',
      description: 'Access cutting-edge fitness machines and free weights that cater to all skill levels'
    },
    {
      icon: <Award size={24} />,
      title: 'Certified Trainers',
      description: 'Work with experienced professionals dedicated to helping you reach your fitness goals'
    },
    {
      icon: <Lightbulb size={24} />,
      title: 'Flexible Programs',
      description: 'Choose from diverse workout plans designed to fit your schedule and objectives'
    },
    {
      icon: <Zap size={24} />,
      title: 'Quick Results',
      description: 'See real progress with our proven training methods and personalized approach'
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16" data-aos="fade-down">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Why Choose Us
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Experience the difference with our premium facilities, expert coaches, and supportive community committed to your success
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-3 md:gap-4" data-aos="fade-up" data-aos-delay={index * 100}>
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#FF0336' }}>
                  {feature.icon}
                </div>
                
                {/* Text */}
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4" data-aos="zoom-in" data-aos-delay="200">
            {/* Top Left Image */}
            <div className="relative h-36 md:h-48 rounded-2xl overflow-hidden">
              <Image
                src="/gym1.jpg"
                alt="Gym training"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Large Image */}
            <div className="relative row-span-2 h-full rounded-2xl overflow-hidden">
              <Image
                src="/gym3.jpg"
                alt="Gym equipment"
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom Left Image */}
            <div className="relative h-36 md:h-48 rounded-2xl overflow-hidden">
              <Image
                src="/gym2.jpg"
                alt="Gym interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
