import Image from 'next/image';

export default function Coaches() {
  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <div className="flex gap-6">
            {/* Left Image - Woman */}
            <div className="relative w-1/2 h-96 rounded-3xl overflow-hidden">
              <Image
                src="/woman-standing.jpg"
                alt="Female coach"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Image - Man */}
            <div className="relative w-1/2 h-96 rounded-3xl overflow-hidden">
              <Image
                src="/man-sitting.jpg"
                alt="Male coach"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-gray-400 text-lg mb-4">
              Are you looking for a Mentor?
            </p>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Coaches
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.Lorem ipsum dolor sit ...
            </p>

            <button className="bg-gray-900 text-white px-8 py-3.5 rounded-md font-semibold hover:bg-gray-800 transition">
              Explore More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
