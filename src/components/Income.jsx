import React, { useState } from 'react';
import { Plus, ArrowRight, Menu, Info, TrendingUp, DollarSign, Calendar, Filter, Search, Eye } from 'lucide-react';

// Mock components for demonstration
const TransactionItem = ({ transaction, onDelete }) => (
  <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-xl transition-all duration-300 border hover:border-green-200 gap-3 sm:gap-4">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
        <DollarSign className="w-6 h-6 text-green-600" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-gray-900 truncate">{transaction.source}</p>
        <p className="text-sm text-gray-500">{transaction.date}</p>
      </div>
    </div>
    <div className="flex items-center justify-between sm:justify-end sm:text-right gap-4">
      <p className="font-semibold text-green-600">+${transaction.amount}</p>
      <button 
        onClick={onDelete}
        className="text-xs text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 px-2 py-1 rounded"
      >
        Delete
      </button>
    </div>
  </div>
);

const PieChart = ({ data, labels, datasets, incomes, ...props }) => {
  // Generate chart data from actual incomes prop
  const generateChartData = () => {
    if (!incomes || incomes.length === 0) {
      return [
        { name: 'No Data', value: 1, color: '#e5e7eb' }
      ];
    }

    // Group incomes by source and sum amounts
    const sourceMap = {};
    incomes.forEach(income => {
      if (sourceMap[income.source]) {
        sourceMap[income.source] += income.amount;
      } else {
        sourceMap[income.source] = income.amount;
      }
    });

    // Convert to chart data format with colors
    const colors = ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#06d6a0', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
    
    return Object.entries(sourceMap).map(([source, amount], index) => ({
      name: source,
      value: amount,
      color: colors[index % colors.length]
    }));
  };

  const chartData = generateChartData();
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="w-full space-y-4">
      <div className="relative w-full h-64 sm:h-72 lg:h-64 xl:h-72 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl flex items-center justify-center overflow-hidden">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 220 220" 
          className="transform -rotate-90 max-w-[220px] max-h-[220px]"
        >
          {chartData.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${percentage * 3.14} 314`;
            const strokeDashoffset = -chartData.slice(0, index).reduce((sum, prevItem) => sum + (prevItem.value / total) * 314, 0);
            
            return (
              <circle
                key={item.name}
                cx="110"
                cy="110"
                r="50"
                fill="transparent"
                stroke={item.color}
                strokeWidth="16"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 hover:stroke-width-20"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">Rs.{total.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Total Income</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm text-gray-700 truncate">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-gray-900 ml-2">${item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Income = ({ 
  incomes = [
    { id: 1, source: 'Salary', amount: 5000, date: '2025-07-15' },
    { id: 2, source: 'Freelance', amount: 1200, date: '2025-07-10' },
    { id: 3, source: 'Investment', amount: 800, date: '2025-07-08' },
    { id: 4, source: 'Side Business', amount: 600, date: '2025-07-05' },
    { id: 5, source: 'Dividends', amount: 300, date: '2025-07-01' }
  ], 
  incomeChartData = {}, 
  setShowAddIncomeModal = () => {}, 
  setIsMobileMenuOpen = () => {}, 
  deleteIncome = () => {} 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const monthlyAverage = totalIncome / 12;

  const filteredIncomes = incomes.filter(income => 
    income.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header Section with Enhanced Design */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-teal-500/5"></div>
        <div className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                Income Dashboard
              </h1>
              <p className="text-gray-600 text-lg">Track and manage your income sources</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddIncomeModal(true)}
                className="group relative bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 hover:from-green-600 hover:to-green-700 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add Income</span>
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                className="md:hidden p-3 rounded-2xl bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Income</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">${totalIncome.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-green-600">
              <ArrowRight className="w-4 h-4" />
              <span className="text-sm font-medium">+12% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Monthly Average</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">${Math.round(monthlyAverage).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-blue-600">
              <ArrowRight className="w-4 h-4" />
              <span className="text-sm font-medium">Consistent growth</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Income Sources</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{incomes.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-purple-600">
              <ArrowRight className="w-4 h-4" />
              <span className="text-sm font-medium">Diversified portfolio</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Income List Section */}
          <div className="lg:col-span-1 xl:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Enhanced Header with Search and Filters */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Income History</h2>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Search Bar */}
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search income sources..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 w-full sm:w-64"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Filter Button */}
                      <button
                        onClick={() => setFilterVisible(!filterVisible)}
                        className={`p-2 rounded-xl border transition-all duration-300 ${filterVisible ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        <Filter className="w-5 h-5" />
                      </button>
                      
                      <button className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 transition-colors duration-300 px-4 py-2 rounded-xl hover:bg-green-50 whitespace-nowrap">
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">View All</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Filter Options */}
                {filterVisible && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <span className="text-sm font-medium text-gray-700">Time Range:</span>
                      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                        {['all', 'this-month', 'last-3-months', 'this-year'].map((range) => (
                          <button
                            key={range}
                            onClick={() => setSelectedTimeRange(range)}
                            className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 text-center ${
                              selectedTimeRange === range
                                ? 'bg-green-100 text-green-700 font-medium'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {range.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Income Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {filteredIncomes.slice(0, 8).map((income, index) => (
                    <div key={income.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <TransactionItem
                        transaction={{ ...income, category: income.source }}
                        onDelete={() => deleteIncome(income.id)}
                      />
                    </div>
                  ))}
                </div>

                {filteredIncomes.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No income sources found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar with Enhanced Chart */}
          <div className="lg:col-span-1 xl:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Income Breakdown</h3>
                <div className="relative group">
                  <Info className="w-5 h-5 text-gray-400 cursor-help" />
                  <div className="absolute right-0 top-8 bg-gray-800 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                    Distribution of income sources
                  </div>
                </div>
              </div>
              <PieChart incomes={incomes} {...incomeChartData} />
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-500 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center gap-3">
                  <Plus className="w-5 h-5" />
                  <span>Add Recurring Income</span>
                </button>
                <button className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5" />
                  <span>View Analytics</span>
                </button>
                <button className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  <span>Set Income Goals</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Income;