import { Dumbbell, Award, Lightbulb, Zap } from 'lucide-react';
import Image from 'next/image';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Dumbbell size={24} />,
      title: 'Lorem Ipsum amid',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
    },
    {
      icon: <Award size={24} />,
      title: 'Lorem Ipsum amid',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
    },
    {
      icon: <Lightbulb size={24} />,
      title: 'Lorem Ipsum amid',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
    },
    {
      icon: <Zap size={24} />,
      title: 'Lorem Ipsum amid',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
    }
  ];

  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Why Choose Us
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                
                {/* Text */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Top Left Image */}
            <div className="relative h-48 rounded-2xl overflow-hidden">
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
            <div className="relative h-48 rounded-2xl overflow-hidden">
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
