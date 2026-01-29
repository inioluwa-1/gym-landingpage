import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import WhyChooseUs from './components/WhyChooseUs';
import Coaches from './components/Coaches';
import Trainers from './components/Trainers';
import Pricing from './components/Pricing';
import Reviews from './components/Reviews';

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <WhyChooseUs />
        <Coaches />
        <Trainers />
        <Pricing />
        <Reviews />
      </main>
    </div>
  );
}
