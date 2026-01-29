import { Twitter, Facebook, Instagram } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/gym-lift.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Vertical Text on Right */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10">
        <div className="transform rotate-90 origin-center">
          <p className="text-gray-500 text-sm tracking-widest whitespace-nowrap">
            Fitma Visium Complementari
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <div className="max-w-2xl">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Elevate your<br />workout
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-8 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </p>

          {/* CTA Button */}
          <button className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition mb-12">
            Get Started
          </button>

          {/* Social Icons */}
          <div className="flex items-center space-x-6">
            <a href="#" className="text-white hover:text-gray-300 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
