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

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="max-w-2xl">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Elevate your<br />workout
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 max-w-md">
            Transform your body and mind with expert guidance, state-of-the-art equipment, and a community that motivates you every step of the way.
          </p>

          {/* CTA Button */}
          <button className="bg-white text-black px-6 md:px-8 py-2.5 md:py-3 rounded-md font-semibold hover:bg-gray-200 transition mb-8 md:mb-12">
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
