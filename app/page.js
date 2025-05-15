'use client';

import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaHashtag,
  FaVenusMars,
  FaMapMarkerAlt,
  FaStethoscope,
  FaClock,
  FaSun,
  FaMoon,
} from 'react-icons/fa';

const InputWrapper = ({ icon, children }) => (
  <div className="relative w-full">
    <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 pointer-events-none">
      {icon}
    </span>
    {children}
  </div>
);

export default function AskPage() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    pincode: '',
    issue: '',
    duration: '',
  });
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load/save theme
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') setDarkMode(true);
  }, []);
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.age || isNaN(form.age) || form.age < 1 || form.age > 120)
      newErrors.age = 'Valid age required';
    if (!form.gender) newErrors.gender = 'Gender is required';
    if (!/^\d{6}$/.test(form.pincode))
      newErrors.pincode = 'Valid 6-digit pincode required';
    if (!form.issue.trim())
      newErrors.issue = 'Health issue description is required';
    if (!form.duration) newErrors.duration = 'Please select duration';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setResponse('');
    try {
      const res = await axios.post('/api/ask', form);
      setResponse(res.data.reply);
    } catch {
      setResponse('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({
      name: '',
      age: '',
      gender: '',
      pincode: '',
      issue: '',
      duration: '',
    });
    setErrors({});
    setResponse('');
  };

  return (
    <div
      className={
        darkMode
          ? 'dark bg-gray-900 text-gray-100 min-h-screen flex flex-col'
          : 'bg-gray-100 text-gray-900 min-h-screen flex flex-col'
      }
    >
      {/* Header */}
      <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 flex justify-between items-center max-w-5xl mx-auto w-11/12 rounded-b-md shadow-md">
        <h1 className="text-xl font-bold">Health AI Assistant</h1>
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
          className="flex items-center gap-2 bg-blue-400 dark:bg-blue-700 px-3 py-1 rounded hover:bg-blue-500 transition"
        >
          {darkMode ? (
            <>
              <FaSun /> Light Mode
            </>
          ) : (
            <>
              <FaMoon /> Dark Mode
            </>
          )}
        </button>
      </header>

      {/* Main */}
      <main className="flex-grow w-[60%] max-w-3xl mx-auto p-6">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Enter Your Details</h2>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            {/* Name */}
            <div>
              <InputWrapper icon={<FaUser />}>
                <input
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  className={`pl-10 w-full p-2 rounded border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none`}
                />
              </InputWrapper>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Age */}
            <div>
              <InputWrapper icon={<FaHashtag />}>
                <input
                  name="age"
                  type="number"
                  placeholder="Age"
                  value={form.age}
                  onChange={handleChange}
                  className={`pl-10 w-full p-2 rounded border ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none`}
                />
              </InputWrapper>
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <InputWrapper icon={<FaVenusMars />}>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className={`pl-10 w-full p-2 rounded border ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </InputWrapper>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Pincode */}
            <div>
              <InputWrapper icon={<FaMapMarkerAlt />}>
                <input
                  name="pincode"
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className={`pl-10 w-full p-2 rounded border ${
                    errors.pincode ? 'border-red-500' : 'border-gray-300'
                  } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none`}
                />
              </InputWrapper>
              {errors.pincode && (
                <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
              )}
            </div>

            {/* Duration (full width) */}
            <div className="md:col-span-2">
              <InputWrapper icon={<FaClock />}>
                <select
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  className={`pl-10 w-full p-2 rounded border ${
                    errors.duration ? 'border-red-500' : 'border-gray-300'
                  } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none`}
                >
                  <option value="">Since when?</option>
                  <option value="<1 day">‹1 day</option>
                  <option value="1-3 days">1–3 days</option>
                  <option value="1 week">1 week</option>
                  <option value="1-2 weeks">1–2 weeks</option>
                  <option value="More than 2 weeks">More than 2 weeks</option>
                </select>
              </InputWrapper>
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
              )}
            </div>

            {/* Issue (full width) */}
            <div className="md:col-span-2">
              <InputWrapper icon={<FaStethoscope />}>
                <textarea
                  name="issue"
                  rows={4}
                  placeholder="Describe your health issue"
                  value={form.issue}
                  onChange={handleChange}
                  className={`pl-10 w-full p-2 rounded border ${
                    errors.issue ? 'border-red-500' : 'border-gray-300'
                  } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none resize-none`}
                />
              </InputWrapper>
              {errors.issue && (
                <p className="text-red-500 text-sm mt-1">{errors.issue}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800 transition"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button
              onClick={handleReset}
              disabled={loading}
              className="flex-1 bg-gray-400 text-black px-6 py-2 rounded hover:bg-gray-500 transition"
            >
              Reset
            </button>
          </div>
        </motion.div>

        {/* Response */}
        <motion.div
          className="mt-10 p-6 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 whitespace-pre-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-2">AI Response:</h3>
          {loading
            ? 'Processing your input...'
            : response || 'Fill the form and submit to get suggestions.'}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 dark:bg-blue-800 text-white p-4 text-center">
        © {new Date().getFullYear()} ChiragTech. All rights reserved.
      </footer>
    </div>
  );
}
