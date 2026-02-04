'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activityFactor, setActivityFactor] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);

  const calculateBMI = () => {
    if (!height || !weight || !age || !gender || !activityFactor) {
      alert('Please fill in all fields');
      return;
    }

    // Convert height from feet/inches to meters
    const heightInMeters = parseFloat(height) * 0.3048;
    const weightInKg = parseFloat(weight);
    const ageNum = parseInt(age);

    // Calculate BMI
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(parseFloat(bmiValue.toFixed(1)));

    // Calculate BMR (Basal Metabolic Rate)
    let bmrValue;
    if (gender === 'male') {
      bmrValue = 88.362 + (13.397 * weightInKg) + (4.799 * heightInMeters * 100) - (5.677 * ageNum);
    } else {
      bmrValue = 447.593 + (9.247 * weightInKg) + (3.098 * heightInMeters * 100) - (4.330 * ageNum);
    }

    // Apply activity factor
    const activityMultipliers: { [key: string]: number } = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };

    bmrValue *= activityMultipliers[activityFactor] || 1.2;
    setBmr(Math.round(bmrValue));
  };

  const getWeightStatus = (bmi: number) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight (Healthy)';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const bmiCategories = [
    { range: 'Below 18.5', status: 'Under weight' },
    { range: '18.5 - 24.9', status: 'Normal weight (Healthy)' },
    { range: '25.0 - 29.9', status: 'Over weight' },
    { range: '30.0 - and Above', status: 'Obese' }
  ];

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Calculator Form */}
          <div data-aos="fade-up">
            <p className="text-base md:text-lg mb-3 md:mb-4 font-semibold" style={{ color: '#FF0336' }}>
              Check Your Health
            </p>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 md:mb-12">
              CALCULATE BMI
            </h2>

            <div className="space-y-4 md:space-y-6">
              {/* Height and Weight Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Height (feet/inch e.g. 5'6)"
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-50 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Weight (kg)"
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-50 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>

              {/* Age and Gender Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-50 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-50 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23333\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Activity Factor */}
              <select
                value={activityFactor}
                onChange={(e) => setActivityFactor(e.target.value)}
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-50 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 appearance-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23333\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
              >
                <option value="">Select an activity factor</option>
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Lightly active (1-3 days/week)</option>
                <option value="moderate">Moderately active (3-5 days/week)</option>
                <option value="active">Very active (6-7 days/week)</option>
                <option value="very-active">Extra active (physical job)</option>
              </select>

              {/* Calculate Button */}
              <button
                onClick={calculateBMI}
                className="flex items-center justify-center gap-2 text-white px-8 py-4 rounded-lg font-semibold transition"
                style={{ backgroundColor: '#FF0336' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5A7A'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF0336'}
                onTouchStart={(e) => e.currentTarget.style.backgroundColor = '#FF5A7A'}
                onTouchEnd={(e) => {
                  const element = e.currentTarget;
                  setTimeout(() => {
                    if (element) {
                      element.style.backgroundColor = '#FF0336';
                    }
                  }, 300);
                }}
              >
                Calculate
                <ArrowUpRight size={20} />
              </button>

              {/* Results */}
              {bmi !== null && (
                <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-600 text-sm">Your BMI:</p>
                      <p className="text-3xl font-bold text-gray-900">{bmi}</p>
                      <p className="text-gray-700 font-semibold">{getWeightStatus(bmi)}</p>
                    </div>
                    {bmr && (
                      <div>
                        <p className="text-gray-600 text-sm">Daily Calorie Needs (BMR):</p>
                        <p className="text-2xl font-bold text-gray-900">{bmr} cal/day</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* BMI Reference Table */}
          <div data-aos="fade-up" data-aos-delay="100">
            <div className="mb-8 md:mb-12">
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                    BMI
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {bmiCategories.map((category, index) => (
                      <p key={index} className="text-gray-700 text-sm md:text-base">
                        {category.range}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                    WEIGHT STATUS
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {bmiCategories.map((category, index) => (
                      <p key={index} className="text-gray-700 text-sm md:text-base">
                        {category.status}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-gray-600 text-sm md:text-base">
              <p>
                <span className="font-semibold text-gray-900">BMR</span> metabolic rate /{' '}
                <span className="font-semibold text-gray-900">BMI</span> body mass index
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
