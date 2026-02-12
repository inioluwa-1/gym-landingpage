'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, login, logout, isAuthenticated } = useAuth();

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false);
      setShowUserMenu(false);
    };

    if (isOpen) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  // Close user menu when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserMenu]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleAuthSuccess = (userData: any) => {
    login(userData);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6 bg-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="shrink-0">
          <Image 
            src="/logo.png" 
            alt="FitGuru Logo" 
            width={120} 
            height={40}
            className="h-8 md:h-10 w-auto"
          />
        </div>

        {/* Mobile Menu Button / Avatar */}
        <div className="md:hidden flex items-center gap-3">
          {isAuthenticated && user && (
            <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
              {getInitials(user.username || user.name)}
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gray-300 transition"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

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

        {/* Auth Section - Desktop */}
        {isAuthenticated && user ? (
          <div className="hidden md:block relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowUserMenu(!showUserMenu);
              }}
              className="flex items-center space-x-3 hover:opacity-80 transition"
            >
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
                {getInitials(user.username || user.name)}
              </div>
              <span className="text-white font-semibold">{user.username || user.name}</span>
            </button>
            
            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div 
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-md shadow-lg py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-white hover:bg-zinc-800 transition flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => setShowAuthModal(true)}
            className="hidden md:block bg-white text-black px-6 py-2.5 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Join Now
          </button>
        )}
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
            
            {isAuthenticated && user ? (
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
                    {getInitials(user.username || user.name)}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{user.username || user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-white px-6 py-2.5 rounded-md font-semibold transition flex items-center justify-center space-x-2"
                  style={{ backgroundColor: '#FF0336' }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="bg-white text-black px-6 py-2.5 rounded-md font-semibold hover:bg-gray-200 transition w-full"
              >
                Join Now
              </button>
            )}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </nav>
  );
}
