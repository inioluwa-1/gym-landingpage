'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import WhyChooseUs from './components/WhyChooseUs';
import Coaches from './components/Coaches';
import Trainers from './components/Trainers';
import FeaturedClasses from './components/FeaturedClasses';
import BMICalculator from './components/BMICalculator';
import Pricing from './components/Pricing';
import Reviews from './components/Reviews';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <main>
        <div id="home">
          <Hero />
        </div>
        <Stats />
        <div id="about">
          <WhyChooseUs />
        </div>
        <Coaches />
        <Trainers />
        <FeaturedClasses />
        <BMICalculator />
        <div id="services">
          <Pricing />
        </div>
        <Reviews />
        <div id="contact">
          <CallToAction />
        </div>
      </main>
      <Footer />
    </div>
  );
}
