'use client';

import { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'https://gym-backend-zbz2.onrender.com/api';

interface BMIRecord {
  _id: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
  activityFactor: string;
  bmi: number;
  bmr: number;
  status: string;
  createdAt: string;
}

export default function BMICalculator() {
  const { user, openAuthModal } = useAuth();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activityFactor, setActivityFactor] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [bmiHistory, setBmiHistory] = useState<BMIRecord[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const calculateBMI = async () => {
    // Check if user is logged in
    if (!user) {
      openAuthModal();
      return;
    }

    if (!height || !weight || !age || !gender || !activityFactor) {
      alert('Please fill in all fields');
      return;
    }

    setSuccessMessage('');

    const heightValue = parseFloat(height);
    let heightInMeters;

    // Auto-detect format: if height > 50, assume it's in cm, otherwise feet
    if (heightValue > 50) {
      // Input is in centimeters, convert to meters
      heightInMeters = heightValue / 100;
    } else {
      // Input is in feet, convert to meters
      heightInMeters = heightValue * 0.3048;
    }

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

    const finalBmi = parseFloat(bmiValue.toFixed(1));
    const finalBmr = Math.round(bmrValue);
    const status = getWeightStatus(finalBmi);

    // Save to database if user is logged in
    if (user) {
      try {
        const response = await fetch(`${API_URL}/bmi`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user._id,
            height: parseFloat(height),
            weight: parseFloat(weight),
            age: parseInt(age),
            gender,
            activityFactor,
            bmi: finalBmi,
            bmr: finalBmr,
            status
          })
        });

        const data = await response.json();
        if (data.success) {
          setSuccessMessage('BMI calculation saved to your history!');
          setTimeout(() => setSuccessMessage(''), 3000);
        }
      } catch (error) {
        console.error('Error saving BMI:', error);
      }
    }
  };

  const fetchHistory = async () => {
    if (!user) return;

    setIsLoadingHistory(true);
    try {
      const response = await fetch(`${API_URL}/bmi/${user._id}`);
      const data = await response.json();
      
      if (data.success) {
        setBmiHistory(data.data);
      }
    } catch (error) {
      console.error('Error fetching BMI history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleViewHistory = () => {
    setIsHistoryModalOpen(true);
    fetchHistory();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        {/* Header with View History Button */}
        <div className="flex justify-between items-center mb-8" data-aos="fade-down">
          <div>
            <p className="text-base md:text-lg mb-2 font-semibold" style={{ color: '#FF0336' }}>
              Check Your Health
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              CALCULATE BMI
            </h2>
          </div>
          {user && (
            <button
              onClick={handleViewHistory}
              className="text-white px-4 md:px-6 py-2 md:py-3 rounded-md text-sm md:text-base font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: '#FF0336' }}
            >
              View History
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Calculator Form */}
          <div data-aos="fade-up">
            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-500 rounded-lg text-sm text-white">
                {successMessage}
              </div>
            )}

            <div className="space-y-4 md:space-y-6">
              {/* Height and Weight Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Height (cm or feet)"
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
            </div>
          </div>

          {/* Results Section */}
          <div data-aos="fade-up" data-aos-delay="100">
            {bmi !== null ? (
              <div className="bg-gray-50 rounded-lg p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                  Your Results
                </h3>
                
                <div className="space-y-8">
                  <div>
                    <p className="text-gray-600 text-base md:text-lg mb-2">Your BMI:</p>
                    <p className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">{bmi}</p>
                    <p className="text-xl md:text-2xl font-semibold" style={{ color: '#FF0336' }}>
                      {getWeightStatus(bmi)}
                    </p>
                  </div>
                  
                  {bmr && (
                    <div className="pt-6 border-t border-gray-300">
                      <p className="text-gray-600 text-base md:text-lg mb-2">Daily Calorie Needs:</p>
                      <p className="text-4xl md:text-5xl font-bold text-gray-900">{bmr} <span className="text-2xl text-gray-600">cal/day</span></p>
                      <p className="text-sm text-gray-500 mt-2">Based on your activity level</p>
                    </div>
                  )}
                  
                  <div className="pt-6 border-t border-gray-300">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <span className="font-semibold text-gray-900">BMR</span> (Basal Metabolic Rate) represents the calories you burn at rest. 
                      <span className="font-semibold text-gray-900"> BMI</span> (Body Mass Index) measures body fat based on height and weight.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 md:p-12 flex items-center justify-center min-h-100">
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Calculate Your BMI
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    Fill in your details and click Calculate to see your Body Mass Index and daily calorie needs.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* History Modal */}
        {isHistoryModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">BMI History</h3>
                <button
                  onClick={() => setIsHistoryModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1">
                {isLoadingHistory ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-gray-600">Loading history...</div>
                  </div>
                ) : bmiHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-gray-600">No BMI records found. Calculate your BMI to start tracking!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bmiHistory.map((record) => (
                      <div key={record._id} className="bg-gray-50 rounded-lg p-4 md:p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">{formatDate(record.createdAt)}</p>
                            <p className="text-2xl font-bold text-gray-900">{record.bmi}</p>
                            <p className="text-lg font-semibold" style={{ color: '#FF0336' }}>{record.status}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">Daily Calories</p>
                            <p className="text-xl font-bold text-gray-900">{record.bmr}</p>
                            <p className="text-sm text-gray-500">cal/day</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-gray-200">
                          <div>
                            <p className="text-xs text-gray-500">Height</p>
                            <p className="text-sm font-semibold text-gray-900">{record.height} cm</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Weight</p>
                            <p className="text-sm font-semibold text-gray-900">{record.weight} kg</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Age</p>
                            <p className="text-sm font-semibold text-gray-900">{record.age} yrs</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Gender</p>
                            <p className="text-sm font-semibold text-gray-900 capitalize">{record.gender}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
