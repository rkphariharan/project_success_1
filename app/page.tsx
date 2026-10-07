"use client";

import { useState } from "react";
import Link from "next/link";
import { Car, DollarSign, TrendingUp, Users, Calendar, Search, Filter, Plus } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { cars, revenueData, inventoryByStatus, monthlyRevenue } from "@/lib/mockData";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.vin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalInventoryValue = cars.reduce((sum, car) => sum + car.price, 0);
  const totalRevenue = revenueData.totalSold;
  const avgDaysInInventory = Math.round(cars.reduce((sum, car) => sum + car.daysInInventory, 0) / cars.length);

  const statusColors = {
    available: "#a855f7",
    pending: "#f59e0b",
    sold: "#22c55e",
    service: "#3b82f6"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Premium Auto CRM</h1>
            <p className="text-purple-300">Dealer Management Dashboard</p>
          </div>
          <Link
            href="/add-car"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Plus size={20} />
            Add New Car
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Car className="text-purple-400" size={24} />
              </div>
              <span className="text-sm text-purple-300">Total Inventory</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{cars.length}</div>
            <div className="text-sm text-gray-400">vehicles in stock</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-500/20 rounded-lg">
                <DollarSign className="text-amber-400" size={24} />
              </div>
              <span className="text-sm text-purple-300">Inventory Value</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              ${(totalInventoryValue / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-400">total value</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <TrendingUp className="text-green-400" size={24} />
              </div>
              <span className="text-sm text-purple-300">Monthly Revenue</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              ${(totalRevenue / 1000000).toFixed(2)}M
            </div>
            <div className="text-sm text-green-400">+12.5% from last month</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Calendar className="text-blue-400" size={24} />
              </div>
              <span className="text-sm text-purple-300">Avg. Days in Stock</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{avgDaysInInventory}</div>
            <div className="text-sm text-gray-400">days average</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Revenue Chart */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Monthly Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #8b5cf6', borderRadius: '8px' }}
                  labelStyle={{ color: '#e5e7eb' }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={3} name="Revenue ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Inventory by Status */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Inventory by Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={inventoryByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {inventoryByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={statusColors[entry.name.toLowerCase() as keyof typeof statusColors]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #8b5cf6', borderRadius: '8px' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Current Inventory</h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by make, model, VIN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-slate-700 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
                <option value="service">Service</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/20">
                  <th className="text-left py-4 px-4 text-purple-300 font-semibold">VIN</th>
                  <th className="text-left py-4 px-4 text-purple-300 font-semibold">Vehicle</th>
                  <th className="text-left py-4 px-4 text-purple-300 font-semibold">Year</th>
                  <th className="text-left py-4 px-4 text-purple-300 font-semibold">Price</th>
                  <th className="text-left py-4 px-4 text-purple-300 font-semibold">Mileage</th>
                  <th className="text-left py-4 px-4 text-purple-300 font-semibold">Days in Stock</th>
                  <th className="text-left py-4 px-4 text-purple-300 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCars.map((car) => (
                  <tr key={car.vin} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-4 text-gray-300 font-mono text-sm">{car.vin}</td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-white">{car.make} {car.model}</div>
                      <div className="text-sm text-gray-400">{car.trim}</div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{car.year}</td>
                    <td className="py-4 px-4 text-amber-400 font-semibold">
                      ${car.price.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-gray-300">{car.mileage.toLocaleString()} mi</td>
                    <td className="py-4 px-4 text-gray-300">{car.daysInInventory} days</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        car.status === 'available' ? 'bg-purple-500/20 text-purple-300' :
                        car.status === 'pending' ? 'bg-amber-500/20 text-amber-300' :
                        car.status === 'sold' ? 'bg-green-500/20 text-green-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                      </span>
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
