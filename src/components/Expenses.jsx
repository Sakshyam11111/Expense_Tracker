import React, { useState, useMemo } from 'react';
import { Plus, ArrowRight, Menu, Info, TrendingDown, CreditCard, Calendar, Filter, Search, Eye, AlertTriangle } from 'lucide-react';

// Mock components for demonstration
const TransactionItem = ({ transaction, onDelete }) => (
  <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 hover:bg-red-50 rounded-xl transition-all duration-300 border hover:border-red-200 gap-3 sm:gap-4">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
        <CreditCard className="w-6 h-6 text-red-600" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-gray-900 truncate">{transaction.category}</p>
        <p className="text-sm text-gray-500">{transaction.date}</p>
      </div>
    </div>
    <div className="flex items-center justify-between sm:justify-end sm:text-right gap-4">
      <p className="font-semibold text-red-600">-Rs. {transaction.amount}</p>
      <button 
        onClick={onDelete}
        className="text-xs text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 px-2 py-1 rounded"
      >
        Delete
      </button>
    </div>
  </div>
);

const PieChart = ({ data }) => {
  // Create chart data from the data object
  const chartData = Object.entries(data || {}).map(([category, amount]) => ({
    name: category,
    value: amount,
    color: getColorForCategory(category)
  }));

  function getColorForCategory(category) {
    const colors = {
      'Food': '#ef4444',
      'Transportation': '#f97316', 
      'Entertainment': '#eab308',
      'Shopping': '#a855f7',
      'Bills': '#3b82f6',
      'Healthcare': '#10b981',
      'Education': '#6366f1',
      'Travel': '#ec4899',
      'Other': '#6b7280'
    };
    return colors[category] || colors['Other'];
  }

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  
  // Debug logging
  console.log('PieChart data:', data);
  console.log('chartData:', chartData);
  console.log('total:', total);
  
  if (chartData.length === 0 || total === 0) {
    return (
      <div className="w-full space-y-6">
        <div className="relative w-full h-72 sm:h-80 lg:h-72 xl:h-80 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl flex items-center justify-center overflow-hidden">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No expenses data available</p>
            <p className="text-xs text-gray-400 mt-1">Debug: {Object.keys(data || {}).length} categories found</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full space-y-6">
      <div className="relative w-full h-72 sm:h-80 lg:h-72 xl:h-80 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl flex items-center justify-center overflow-hidden">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 280 280" 
          className="transform -rotate-90 max-w-[280px] max-h-[280px]"
        >
          {chartData.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${percentage * 3.93} 393.2`;
            const strokeDashoffset = -chartData.slice(0, index).reduce((sum, prevItem) => sum + (prevItem.value / total) * 393.2, 0);
            
            return (
              <circle
                key={item.name}
                cx="140"
                cy="140"
                r="62.5"
                fill="transparent"
                stroke={item.color}
                strokeWidth="18"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 hover:stroke-width-22"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">Rs. {total.toLocaleString()}</p>
            <p className="text-sm sm:text-base text-gray-500">Expenses</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm text-gray-700 truncate">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-gray-900 ml-2">Rs. {item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Expenses = ({ 
  transactions = [
    { id: 1, category: 'Food', amount: 85, date: 'July 19, 2025' },
    { id: 2, category: 'Transportation', amount: 45, date: 'July 18, 2025' },
    { id: 3, category: 'Entertainment', amount: 120, date: 'July 17, 2025' },
    { id: 4, category: 'Shopping', amount: 200, date: 'July 16, 2025' },
    { id: 5, category: 'Bills', amount: 350, date: 'July 15, 2025' }
  ], 
  setShowAddExpenseModal = () => {}, 
  setIsMobileMenuOpen = () => {}, 
  deleteExpense = () => {} 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');

  // Improved date parsing function
  const parseCustomDate = (dateStr) => {
    try {
      // Remove ordinal suffixes and clean the string
      const cleanDateStr = dateStr.replace(/(st|nd|rd|th),?/g, '');
      const date = new Date(cleanDateStr);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date:', dateStr);
        return null;
      }
      
      return date;
    } catch (error) {
      console.error('Error parsing date:', dateStr, error);
      return null;
    }
  };

  const categoryExpenses = useMemo(() => {
    console.log('Calculating categoryExpenses with transactions:', transactions);
    
    const today = new Date('2025-07-20');
    const sixtyDaysAgo = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000);
    const categoryMap = {};

    transactions.forEach((transaction, index) => {
      const transactionDate = parseCustomDate(transaction.date);
      
      console.log(`Transaction ${index}:`, {
        original: transaction.date,
        parsed: transactionDate,
        isValid: transactionDate && !isNaN(transactionDate.getTime()),
        isInRange: transactionDate && transactionDate >= sixtyDaysAgo && transactionDate <= today
      });
      
      // For now, let's include all transactions to test the chart
      // Remove the date filter temporarily
      if (transactionDate || true) { // Include all for testing
        const category = transaction.category;
        categoryMap[category] = (categoryMap[category] || 0) + transaction.amount;
      }
    });

    console.log('Final categoryMap:', categoryMap);
    return categoryMap;
  }, [transactions]);

  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const monthlyAverage = totalExpenses / 12;
  const categoryCount = Object.keys(categoryExpenses).length;

  const filteredTransactions = transactions.filter(transaction => 
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-50 to-pink-50">
      {/* Header Section with Enhanced Design */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5"></div>
        <div className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Expenses Dashboard
              </h1>
              <p className="text-gray-600 text-lg">Monitor and control your spending</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddExpenseModal(true)}
                className="group relative bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 hover:from-red-600 hover:to-red-700 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add Expense</span>
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
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Expenses</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">Rs. {totalExpenses.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-red-600">
              <ArrowRight className="w-4 h-4" />
              <span className="text-sm font-medium">-8% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Monthly Average</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">Rs. {Math.round(monthlyAverage).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-orange-600">
              <ArrowRight className="w-4 h-4" />
              <span className="text-sm font-medium">Well managed</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Categories</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{categoryCount}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-purple-600">
              <ArrowRight className="w-4 h-4" />
              <span className="text-sm font-medium">Spending spread</span>
            </div>
          </div>
        </div>

        {/* Debug Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">Debug Information:</h3>
          <p className="text-xs text-yellow-700">
            Category Expenses: {JSON.stringify(categoryExpenses)} | 
            Total Categories: {Object.keys(categoryExpenses).length} | 
            Total Value: {Object.values(categoryExpenses).reduce((sum, val) => sum + val, 0)}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Expenses List Section */}
          <div className="lg:col-span-1 xl:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Enhanced Header with Search and Filters */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Expense History</h2>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Search Bar */}
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search expenses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 w-full sm:w-64"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Filter Button */}
                      <button
                        onClick={() => setFilterVisible(!filterVisible)}
                        className={`p-2 rounded-xl border transition-all duration-300 ${filterVisible ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        <Filter className="w-5 h-5" />
                      </button>
                      
                      <button className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 transition-colors duration-300 px-4 py-2 rounded-xl hover:bg-red-50 whitespace-nowrap">
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
                                ? 'bg-red-100 text-red-700 font-medium'
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

              {/* Expense Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {filteredTransactions.slice(0, 8).map((transaction, index) => (
                    <div key={transaction.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <TransactionItem
                        transaction={transaction}
                        onDelete={() => deleteExpense(transaction.id)}
                      />
                    </div>
                  ))}
                </div>

                {filteredTransactions.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No expenses found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar with Enhanced Chart */}
          <div className="lg:col-span-1 xl:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Expenses by Category</h3>
                <div className="relative group">
                  <Info className="w-5 h-5 text-gray-400 cursor-help" />
                  <div className="absolute right-0 top-8 bg-gray-800 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                    All expenses breakdown
                  </div>
                </div>
              </div>
              <PieChart data={categoryExpenses} />
            </div>

            {/* Budget Alert Card */}
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Budget Alert</h3>
              </div>
              <p className="text-sm mb-4 opacity-90">
                You're 75% through your monthly budget. Consider reviewing your spending.
              </p>
              <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                <div className="bg-white rounded-full h-3 w-3/4 transition-all duration-300"></div>
              </div>
              <button className="w-full bg-white/10 hover:bg-white/20 transition-all duration-300 p-3 rounded-xl text-sm font-medium">
                Review Budget
              </button>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center gap-3">
                  <Plus className="w-5 h-5" />
                  <span>Add Recurring Expense</span>
                </button>
                <button className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center gap-3">
                  <TrendingDown className="w-5 h-5" />
                  <span>View Analytics</span>
                </button>
                <button className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  <span>Set Budget Limits</span>
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

export default Expenses;