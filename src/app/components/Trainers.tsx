import Image from 'next/image';

export default function Trainers() {
  const trainers = [
    { id: 1, image: '/trainerone.png' },
    { id: 2, image: '/trainertwo.png' },
    { id: 3, image: '/trainerthree.png' },
    { id: 4, image: '/trainerfour.png' },
    { id: 5, image: '/trainerfive.png' },
    { id: 6, image: '/trainersix.png' }
  ];

  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Meet Our Trainers
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Trainer 1 - Portrait */}
          <div className="relative h-79 overflow-hidden rounded-3xl">
            <Image
              src="/trainerone.png"
              alt="Trainer 1"
              fill
              className="object-cover"
            />
          </div>

          {/* Trainer 2 - Wide Landscape (spans 2 columns) */}
          <div className="relative h-79 overflow-hidden rounded-3xl sm:col-span-2">
            <Image
              src="/trainertwo.png"
              alt="Trainer 2"
              fill
              className="object-cover"
            />
          </div>

          {/* Trainer 3 - Portrait */}
          <div className="relative h-79 overflow-hidden rounded-3xl">
            <Image
              src="/trainerthree.png"
              alt="Trainer 3"
              fill
              className="object-cover"
            />
          </div>

          {/* Trainer 4 - Landscape (spans 2 columns) */}
          <div className="relative h-79 overflow-hidden rounded-3xl sm:col-span-2">
            <Image
              src="/trainerfour.png"
              alt="Trainer 4"
              fill
              className="object-cover"
            />
          </div>

          {/* Trainer 5 - Portrait */}
          <div className="relative h-79 overflow-hidden rounded-3xl">
            <Image
              src="/trainerfive.png"
              alt="Trainer 5"
              fill
              className="object-cover"
            />
          </div>

          {/* Trainer 6 - Landscape */}
          <div className="relative h-79 overflow-hidden rounded-3xl">
            <Image
              src="/trainersix.png"
              alt="Trainer 6"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
