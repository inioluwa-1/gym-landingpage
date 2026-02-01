'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6 bg-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image 
            src="/logo.png" 
            alt="FitGuru Logo" 
            width={120} 
            height={40}
            className="h-8 md:h-10 w-auto"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-gray-300 transition"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('home')} className="text-white font-semibold hover:text-gray-300 transition">
            Home
          </button>
          <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition">
            About
          </button>
          <button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition">
            Services
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white transition">
            Contact
          </button>
        </div>

        {/* Join Now Button - Desktop */}
        <button className="hidden md:block bg-white text-black px-6 py-2.5 rounded-md font-semibold hover:bg-gray-200 transition">
          Join Now
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
          <div className="flex flex-col space-y-4 mt-4">
            <button onClick={() => scrollToSection('home')} className="text-white font-semibold hover:text-gray-300 transition text-left">
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition text-left">
              About
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition text-left">
              Services
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white transition text-left">
              Contact
            </button>
            <button className="bg-white text-black px-6 py-2.5 rounded-md font-semibold hover:bg-gray-200 transition w-full">
              Join Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
