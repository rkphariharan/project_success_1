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
import { Car, CheckCircle, Clock, DollarSign, Filter, Plus, Phone, User, TrendingUp, TrendingDown } from 'lucide-react';
import { mockCars, dailyStats, serviceDistribution, monthlyRevenue } from '@/lib/mockData';

export default function Dashboard() {
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Calculate statistics
  const carsInService = mockCars.filter((car) => car.status === 'In Service').length;
  const carsCompleted = mockCars.filter((car) => car.status === 'Completed').length;
  const carsPendingDelivery = mockCars.filter((car) => car.status === 'Pending Delivery').length;
  const monthlyRevenueTotal = monthlyRevenue[monthlyRevenue.length - 1].revenue;

  // Calculate today's stats
  const todayStats = dailyStats[dailyStats.length - 1];
  const todayCarsIn = todayStats?.intake || 0;
  const todayCarsOut = todayStats?.delivery || 0;

  // Filter cars
  const filteredCars = statusFilter === 'All'
    ? mockCars
    : mockCars.filter((car) => car.status === statusFilter);

  return (
    <div className="pb-24 md:pb-8">
      {/* MOBILE VIEW - Compact & Efficient */}
      <div className="block lg:hidden space-y-4">
        {/* Stat Cards - Compact Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Car className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold text-white">{carsInService}</span>
            </div>
            <h3 className="text-gray-400 text-xs">In Service</h3>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-white">{carsCompleted}</span>
            </div>
            <h3 className="text-gray-400 text-xs">Completed</h3>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-gold-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-gold-400" />
              <span className="text-3xl font-bold text-white">{carsPendingDelivery}</span>
            </div>
            <h3 className="text-gray-400 text-xs">Pending</h3>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-gold-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-gold-400" />
              <span className="text-2xl font-bold text-white">
                ₹{(monthlyRevenueTotal / 1000).toFixed(0)}k
              </span>
            </div>
            <h3 className="text-gray-400 text-xs">Revenue</h3>
          </div>
        </div>

        {/* Today's Activity - Compact */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4">
          <h3 className="text-base font-semibold text-white mb-3">Today's Activity</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-700/30 rounded-lg p-3 text-center">
              <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <span className="text-2xl font-bold text-white block mb-1">{todayCarsIn}</span>
              <p className="text-gray-400 text-xs">Cars In</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-3 text-center">
              <TrendingDown className="w-6 h-6 text-gold-400 mx-auto mb-2" />
              <span className="text-2xl font-bold text-white block mb-1">{todayCarsOut}</span>
              <p className="text-gray-400 text-xs">Cars Out</p>
            </div>
          </div>
        </div>

        {/* Daily Trends Chart - Mobile */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4">
          <h3 className="text-base font-semibold text-white mb-3">Weekly Trends</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 10 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 10 }} width={25} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #6b21a8',
                  borderRadius: '8px',
                  fontSize: '11px',
                }}
              />
              <Line type="monotone" dataKey="intake" stroke="#a855f7" strokeWidth={2} name="In" dot={false} />
              <Line type="monotone" dataKey="delivery" stroke="#fbbf24" strokeWidth={2} name="Out" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Cars - Compact */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Recent Cars</h3>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-700 text-white border border-purple-500/20 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="All">All</option>
              <option value="In Service">In Service</option>
              <option value="Completed">Completed</option>
              <option value="Pending Delivery">Pending</option>
            </select>
          </div>

          <div className="space-y-3">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="bg-slate-700/30 rounded-lg p-3 border border-purple-500/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 flex-1">
                    <Car className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-white font-semibold text-sm truncate">{car.name}</h4>
                      <p className="text-gray-400 text-xs">
                        {car.model} ({car.year})
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ml-2 ${
                      car.status === 'In Service'
                        ? 'bg-blue-500/20 text-blue-400'
                        : car.status === 'Completed'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gold-500/20 text-gold-400'
                    }`}
                  >
                    {car.status === 'In Service' ? 'In Service' : car.status === 'Completed' ? 'Done' : 'Pending'}
                  </span>
                </div>

                <div className="space-y-1 mb-2 text-xs text-gray-400">
                  <div className="flex items-center space-x-2">
                    <User className="w-3 h-3" />
                    <span className="truncate">{car.ownerName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3 h-3" />
                    <span>{car.contact}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-purple-500/10 text-xs">
                  <div>
                    <span className="text-gray-400">{car.serviceType}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400">{car.deliveryDate}</span>
                  </div>
                  <div className="text-gold-400 font-bold text-sm">
                    ₹{(car.serviceCharge / 1000).toFixed(1)}K
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW - Keep Complex Charts */}
      <div className="hidden lg:block space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-base text-gray-400">Service operations overview</p>
        </div>

        {/* Stat Cards - 4 Column Grid on Desktop */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Car className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">{carsInService}</span>
            </div>
            <h3 className="text-gray-400 text-sm">In Service</h3>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-white">{carsCompleted}</span>
            </div>
            <h3 className="text-gray-400 text-sm">Completed</h3>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-gold-400" />
              <span className="text-2xl font-bold text-white">{carsPendingDelivery}</span>
            </div>
            <h3 className="text-gray-400 text-sm">Pending</h3>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-gold-400" />
              <span className="text-2xl font-bold text-white">
                ₹{(monthlyRevenueTotal / 1000).toFixed(0)}k
              </span>
            </div>
            <h3 className="text-gray-400 text-sm">Revenue</h3>
          </div>
        </div>

        {/* Charts - Desktop Only */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Intake/Delivery Trends */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Daily Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #6b21a8',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
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
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
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
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #6b21a8',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#a855f7" name="Revenue (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Cars - Desktop Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Recent Cars</h3>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-700 text-white border border-purple-500/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Status</option>
                <option value="In Service">In Service</option>
                <option value="Completed">Completed</option>
                <option value="Pending Delivery">Pending Delivery</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
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
      </div>
    </div>
  );
}
