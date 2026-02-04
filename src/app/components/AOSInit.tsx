'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSInit() {
  useEffect(() => {
    // Wait for hydration to complete before initializing AOS
    const timer = setTimeout(() => {
      AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out',
        offset: 0,
        anchorPlacement: 'top-center',
        mirror: false,
      });
      
      // Refresh AOS after initialization
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
}
