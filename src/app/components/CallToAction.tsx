export default function CallToAction() {
  return (
    <section className="relative h-80 flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/weight.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <p className="text-white text-base md:text-xl mb-3 md:mb-4">Call Us Now</p>
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          +91 82000-60000
        </h2>
      </div>
    </section>
  );
}
