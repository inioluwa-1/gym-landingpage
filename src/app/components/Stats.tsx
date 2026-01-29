export default function Stats() {
  const stats = [
    { value: '5+', label: 'Years of Service' },
    { value: '10+', label: 'Certified Trainers' },
    { value: '786+', label: 'Happy Members' },
    { value: '95%', label: 'Customer Satisfaction' }
  ];

  return (
    <section className="relative z-10 bg-black/80 py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
