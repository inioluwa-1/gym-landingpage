import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image 
            src="/logo.png" 
            alt="FitGuru Logo" 
            width={120} 
            height={40}
            className="h-10 w-auto"
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#home" className="text-white font-semibold hover:text-gray-300 transition">
            Home
          </Link>
          <Link href="#about" className="text-gray-400 hover:text-white transition">
            About
          </Link>
          <Link href="#services" className="text-gray-400 hover:text-white transition">
            Services
          </Link>
          <Link href="#contact" className="text-gray-400 hover:text-white transition">
            Contact
          </Link>
        </div>

        {/* Join Now Button */}
        <button className="bg-white text-black px-6 py-2.5 rounded-md font-semibold hover:bg-gray-200 transition">
          Join Now
        </button>
      </div>
    </nav>
  );
}
