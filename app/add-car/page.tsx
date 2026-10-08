'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Car, Save } from 'lucide-react';

export default function AddCar() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    year: '',
    fuelType: 'Petrol',
    ownerName: '',
    contact: '',
    email: '',
    kmRun: '',
    complaints: '',
    deliveryDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Car name is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else if (parseInt(formData.year) < 1900 || parseInt(formData.year) > new Date().getFullYear()) {
      newErrors.year = 'Invalid year';
    }
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact is required';
    } else if (!/^[+]?[\d\s-]+$/.test(formData.contact)) {
      newErrors.contact = 'Invalid contact number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.kmRun) {
      newErrors.kmRun = 'KM run is required';
    } else if (parseInt(formData.kmRun) < 0) {
      newErrors.kmRun = 'Invalid KM run';
    }
    if (!formData.complaints.trim()) newErrors.complaints = 'Complaints/issues are required';
    if (!formData.deliveryDate) newErrors.deliveryDate = 'Delivery date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, this would save to a database
      console.log('Form submitted:', formData);
      alert('Car intake record created successfully!');
      router.push('/');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 lg:p-6">
        {/* Header - Compact */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-purple-500/20 rounded-lg p-2.5">
            <Car className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Car Intake Form</h1>
            <p className="text-gray-400 text-xs">Add new car to records</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Car Details Section */}
          <div>
            <h2 className="text-base font-semibold text-white mb-4 pb-2 border-b border-purple-500/20">
              Car Details
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Car Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-slate-700/50 text-white border-2 ${
                    errors.name ? 'border-red-500' : 'border-purple-500/30'
                  } rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                  placeholder="e.g., Honda City"
                />
                {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Model <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className={`w-full bg-slate-700/50 text-white border-2 ${
                    errors.model ? 'border-red-500' : 'border-purple-500/30'
                  } rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                  placeholder="e.g., VX"
                />
                {errors.model && <p className="text-red-400 text-sm mt-2">{errors.model}</p>}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Year <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={`w-full bg-slate-700/50 text-white border-2 ${
                    errors.year ? 'border-red-500' : 'border-purple-500/30'
                  } rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                  placeholder="e.g., 2020"
                />
                {errors.year && <p className="text-red-400 text-sm mt-2">{errors.year}</p>}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Fuel Type <span className="text-red-400">*</span>
                </label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="w-full bg-slate-700 text-white border border-purple-500/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  KM Run <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="kmRun"
                  value={formData.kmRun}
                  onChange={handleChange}
                  className={`w-full bg-slate-700/50 text-white border-2 ${
                    errors.kmRun ? 'border-red-500' : 'border-purple-500/30'
                  } rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                  placeholder="e.g., 45000"
                />
                {errors.kmRun && <p className="text-red-400 text-sm mt-2">{errors.kmRun}</p>}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Expected Delivery Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className={`w-full bg-slate-700/50 text-white border-2 ${
                    errors.deliveryDate ? 'border-red-500' : 'border-purple-500/30'
                  } rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                />
                {errors.deliveryDate && (
                  <p className="text-red-400 text-sm mt-2">{errors.deliveryDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Owner Details Section */}
          <div>
            <h2 className="text-base font-semibold text-white mb-4 pb-2 border-b border-purple-500/20">
              Owner Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Owner Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className={`w-full bg-slate-700/50 text-white border-2 ${
                    errors.ownerName ? 'border-red-500' : 'border-purple-500/30'
                  } rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                  placeholder="e.g., Rajesh Kumar"
                />
                {errors.ownerName && <p className="text-red-400 text-sm mt-2">{errors.ownerName}</p>}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Contact Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className={`w-full bg-slate-700/50 text-white border-2 ${
                    errors.contact ? 'border-red-500' : 'border-purple-500/30'
                  } rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                  placeholder="e.g., +91 98765 43210"
                />
                {errors.contact && <p className="text-red-400 text-sm mt-2">{errors.contact}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-slate-700/50 text-white border-2 ${
                    errors.email ? 'border-red-500' : 'border-purple-500/30'
                  } rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                  placeholder="e.g., rajesh.kumar@example.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Complaints Section */}
          <div>
            <h2 className="text-base font-semibold text-white mb-4 pb-2 border-b border-purple-500/20">
              Service Details
            </h2>
            <div>
              <label className="block text-gray-300 text-xs md:text-sm font-medium mb-2">
                Complaints / Issues <span className="text-red-400">*</span>
              </label>
              <textarea
                name="complaints"
                value={formData.complaints}
                onChange={handleChange}
                rows={4}
                className={`w-full bg-slate-700 text-white border ${
                  errors.complaints ? 'border-red-500' : 'border-purple-500/30'
                } rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                placeholder="Describe the issues or complaints..."
              />
              {errors.complaints && <p className="text-red-400 text-sm mt-2">{errors.complaints}</p>}
            </div>
          </div>

          {/* Submit Button - Compact */}
          <div className="flex flex-col lg:flex-row lg:justify-end space-y-3 lg:space-y-0 lg:space-x-3 pt-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full lg:w-auto px-4 py-2.5 border border-purple-500/20 text-gray-300 text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full lg:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Car Intake</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
