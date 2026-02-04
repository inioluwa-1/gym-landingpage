import Image from 'next/image';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const quickLinks = ['Home', 'About Us', 'Services', 'Contact'];
  const programsItems = ['Cycling', 'Karate', 'Power', 'Meditation', 'Martial Arts', 'Workout'];
  const hoursItems = ['Mon-Fri: 5AM-11PM', 'Sat-Sun: 7AM-9PM', 'Holidays: 8AM-6PM', '24/7 Elite Access'];
  const supportItems = ['Help Center', 'FAQs', 'Membership', 'Cancellation'];

  return (
    <footer className="bg-gray-50 py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Logo and Info */}
          <div className="lg:col-span-1">
            <Image 
              src="/logo-black.png" 
              alt="FitGuru Logo" 
              width={120} 
              height={40}
              className="h-10 w-auto mb-6"
            />
            
            <p className="text-gray-600 text-sm mb-6">
              Transform your fitness journey with expert guidance and premium facilities
            </p>

            <p className="text-gray-900 text-sm mb-6">
              shaikhsaad256@gmail.com
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-black font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Column */}
          <div>
            <h3 className="text-black font-semibold text-lg mb-6">Programs</h3>
            <ul className="space-y-3">
              {programsItems.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours Column */}
          <div>
            <h3 className="text-black font-semibold text-lg mb-6">Hours</h3>
            <ul className="space-y-3">
              {hoursItems.map((item, index) => (
                <li key={index}>
                  <p className="text-gray-600 text-sm">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-black font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              {supportItems.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
