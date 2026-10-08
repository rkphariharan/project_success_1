'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Car, CheckCircle, Clock, DollarSign, Filter, Plus, Phone, User } from 'lucide-react';
import { mockCars, dailyStats, serviceDistribution, monthlyRevenue } from '@/lib/mockData';

export default function Dashboard() {
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Calculate statistics
  const carsInService = mockCars.filter((car) => car.status === 'In Service').length;
  const carsCompleted = mockCars.filter((car) => car.status === 'Completed').length;
  const carsPendingDelivery = mockCars.filter((car) => car.status === 'Pending Delivery').length;
  const monthlyRevenueTotal = monthlyRevenue[monthlyRevenue.length - 1].revenue;

  // Filter cars
  const filteredCars = statusFilter === 'All'
    ? mockCars
    : mockCars.filter((car) => car.status === statusFilter);

  return (
    <div className="space-y-4 md:space-y-8 pb-20 md:pb-8">
      {/* Header - Mobile Optimized */}
      <div className="px-1">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-sm md:text-base text-gray-400">Service operations overview</p>
      </div>

      {/* Stat Cards - 2x2 Grid on Mobile */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 md:mb-4">
            <Car className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
            <span className="text-xl md:text-2xl font-bold text-white">{carsInService}</span>
          </div>
          <h3 className="text-gray-400 text-xs md:text-sm">In Service</h3>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 md:mb-4">
            <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
            <span className="text-xl md:text-2xl font-bold text-white">{carsCompleted}</span>
          </div>
          <h3 className="text-gray-400 text-xs md:text-sm">Completed</h3>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 md:mb-4">
            <Clock className="w-6 h-6 md:w-8 md:h-8 text-gold-400" />
            <span className="text-xl md:text-2xl font-bold text-white">{carsPendingDelivery}</span>
          </div>
          <h3 className="text-gray-400 text-xs md:text-sm">Pending</h3>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 md:mb-4">
            <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-gold-400" />
            <span className="text-base md:text-2xl font-bold text-white">
              ₹{(monthlyRevenueTotal / 1000).toFixed(0)}k
            </span>
          </div>
          <h3 className="text-gray-400 text-xs md:text-sm">Revenue</h3>
        </div>
      </div>

      {/* Charts - Mobile Optimized */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Daily Intake/Delivery Trends */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Daily Trends</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 11 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #6b21a8',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line
                type="monotone"
                dataKey="intake"
                stroke="#a855f7"
                strokeWidth={2}
                name="Intake"
              />
              <Line
                type="monotone"
                dataKey="delivery"
                stroke="#fbbf24"
                strokeWidth={2}
                name="Delivery"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Service Type Distribution */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={serviceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #6b21a8',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 11 }} />
            <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #6b21a8',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="revenue" fill="#a855f7" name="Revenue (₹)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Cars - Mobile Cards / Desktop Table */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-3 md:space-y-0">
          <h3 className="text-lg md:text-xl font-semibold text-white">Recent Cars</h3>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-700 text-white border border-purple-500/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[44px]"
            >
              <option value="All">All Status</option>
              <option value="In Service">In Service</option>
              <option value="Completed">Completed</option>
              <option value="Pending Delivery">Pending Delivery</option>
            </select>
          </div>
        </div>

        {/* Mobile: Swipeable Cards */}
        <div className="md:hidden space-y-3">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-slate-700/30 rounded-lg p-4 border border-purple-500/10 active:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Car className="w-4 h-4 text-purple-400" />
                    <h4 className="text-white font-semibold text-base">{car.name}</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {car.model} ({car.year})
                  </p>
                </div>
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    car.status === 'In Service'
                      ? 'bg-blue-500/20 text-blue-400'
                      : car.status === 'Completed'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gold-500/20 text-gold-400'
                  }`}
                >
                  {car.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center space-x-2">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-300 text-sm truncate">{car.ownerName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-300 text-sm">{car.contact}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-purple-500/10">
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Service</p>
                  <p className="text-white text-sm font-medium">{car.serviceType}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-0.5">Delivery</p>
                  <p className="text-white text-sm font-medium">{car.deliveryDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-0.5">Charge</p>
                  <p className="text-gold-400 text-base font-bold">₹{car.serviceCharge.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-500/20">
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Car</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Owner</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Contact</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Service Type</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Delivery Date</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Charge</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car) => (
                <tr
                  key={car.id}
                  className="border-b border-purple-500/10 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="text-white font-medium">{car.name}</div>
                    <div className="text-gray-400 text-sm">
                      {car.model} ({car.year})
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{car.ownerName}</td>
                  <td className="py-3 px-4 text-gray-300">{car.contact}</td>
                  <td className="py-3 px-4 text-gray-300">{car.serviceType}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        car.status === 'In Service'
                          ? 'bg-blue-500/20 text-blue-400'
                          : car.status === 'Completed'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gold-500/20 text-gold-400'
                      }`}
                    >
                      {car.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{car.deliveryDate}</td>
                  <td className="py-3 px-4 text-right text-white font-medium">
                    ₹{car.serviceCharge.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Add Car Button - Mobile Only */}
      <Link
        href="/add-car"
        className="md:hidden fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center z-40 active:scale-95 transition-all"
        style={{ width: '56px', height: '56px' }}
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  );
}
