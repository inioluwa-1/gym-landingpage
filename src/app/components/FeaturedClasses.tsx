import Image from 'next/image';
import { Bike, Target, Dumbbell, Heart, Sparkles, Activity } from 'lucide-react';

export default function FeaturedClasses() {
  const classes = [
    {
      name: 'Cycling',
      icon: <Bike size={32} />,
      schedule: 'Wednesday: 9:00 AM - 10:00 AM',
      image: '/cycling-class.png'
    },
    {
      name: 'Karate',
      icon: <Target size={32} />,
      schedule: 'Friday: 10:00 PM - 11:00 PM',
      image: '/karate-class.png'
    },
    {
      name: 'Power',
      icon: <Dumbbell size={32} />,
      schedule: 'Saturday: 9:00 AM - 10:00 PM',
      image: '/power-class.png'
    },
    {
      name: 'Meditation',
      icon: <Heart size={32} />,
      schedule: 'Friday: 1:00 PM - 2:00 PM',
      image: '/meditation-class.png'
    },
    {
      name: 'Martial Arts',
      icon: <Sparkles size={32} />,
      schedule: 'Sunday: 6:00 PM - 7:00 PM',
      image: '/martial-class.png'
    },
    {
      name: 'Workout',
      icon: <Activity size={32} />,
      schedule: 'Monday: 4:00 PM - 5:00 PM',
      image: '/workout-class.png'
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16" data-aos="fade-down">
          <div className="inline-block mb-4">
            <span 
              className="text-sm md:text-base font-bold px-6 py-2 rounded-full"
              style={{ backgroundColor: '#FF0336', color: 'white' }}
            >
              OUR FEATURED CLASS
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            We Are Offering Best Flexible Classes
          </h2>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {classes.map((classItem, index) => (
            <div
              key={index}
              className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={classItem.image}
                  alt={classItem.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border-2 border-white/30">
                    {classItem.icon}
                  </div>
                </div>

                {/* Class Info */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {classItem.name}
                  </h3>
                  
                  {/* Schedule Badge */}
                  <div 
                    className="inline-block px-4 py-2 rounded text-white text-sm font-semibold"
                    style={{ backgroundColor: '#FF0336' }}
                  >
                    {classItem.schedule}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
