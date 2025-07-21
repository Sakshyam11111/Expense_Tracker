import React, { useState, useMemo } from 'react';
import { Plus, ArrowRight, Menu, Info, TrendingDown, CreditCard, Calendar, Filter, Search, Eye, AlertTriangle } from 'lucide-react';

// TransactionItem component
const TransactionItem = ({ transaction, onDelete }) => (
  <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-red-50 rounded-xl transition-all duration-300 border hover:border-red-200 gap-2 sm:gap-3">
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-gray-900 text-xs sm:text-sm md:text-base truncate">{transaction.category}</p>
        <p className="text-xs text-gray-500">{transaction.date}</p>
      </div>
    </div>
    <div className="flex items-center justify-between sm:justify-end sm:text-right gap-2 sm:gap-3 mt-2 sm:mt-0">
      <p className="font-semibold text-red-600 text-xs sm:text-sm md:text-base">-Rs. {transaction.amount.toLocaleString()}</p>
      <button 
        onClick={onDelete}
        className="text-xs text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 px-2 py-1 rounded"
        aria-label={`Delete ${transaction.category} expense from ${transaction.date}`}
      >
        Delete
      </button>
    </div>
  </div>
);

// PieChart component
const PieChart = ({ data }) => {
  const chartData = useMemo(() => {
    return Object.entries(data || {}).map(([category, amount]) => ({
      name: category,
      value: amount,
      color: getColorForCategory(category)
    }));
  }, [data]);

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
  
  if (chartData.length === 0 || total === 0) {
    return (
      <div className="w-full space-y-3 sm:space-y-4">
        <div className="relative w-full h-48 sm:h-56 md:h-60 lg:h-64 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl flex items-center justify-center overflow-hidden">
          <div className="text-center">
            <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" aria-hidden="true" />
            <p className="text-gray-500 text-xs sm:text-sm md:text-base">No expenses data available</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full space-y-3 sm:space-y-4">
      <div className="relative w-full h-48 sm:h-56 md:h-60 lg:h-64 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl flex items-center justify-center overflow-hidden">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 280 280" 
          className="transform -rotate-90 w-full max-w-[220px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px]"
          role="img"
          aria-label="Expenses by category pie chart"
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
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Rs. {total.toLocaleString()}</p>
            <p className="text-xs sm:text-sm text-gray-500">Expenses</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 px-2 sm:px-0">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs sm:text-sm text-gray-700 truncate max-w-[150px] sm:max-w-[200px]">{item.name}</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-900 ml-2">Rs. {item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Expenses component
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

  const parseCustomDate = (dateStr) => {
    try {
      const cleanDateStr = dateStr.replace(/(st|nd|rd|th),?/g, '');
      const date = new Date(cleanDateStr);
      return isNaN(date.getTime()) ? null : date;
    } catch (error) {
      return null;
    }
  };

  const categoryExpenses = useMemo(() => {
    const today = new Date('2025-07-21');
    const ranges = {
      'this-month': new Date(today.getFullYear(), today.getMonth(), 1),
      'last-3-months': new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000),
      'this-year': new Date(today.getFullYear(), 0, 1),
      'all': null,
    };
    const startDate = ranges[selectedTimeRange];

    const categoryMap = {};
    transactions.forEach((transaction) => {
      const transactionDate = parseCustomDate(transaction.date);
      if (!transactionDate || (startDate && transactionDate < startDate)) return;
      const category = transaction.category;
      categoryMap[category] = (categoryMap[category] || 0) + transaction.amount;
    });

    return categoryMap;
  }, [transactions, selectedTimeRange]);

  const filteredTransactions = useMemo(() => {
    const today = new Date('2025-07-21');
    const ranges = {
      'this-month': new Date(today.getFullYear(), today.getMonth(), 1),
      'last-3-months': new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000),
      'this-year': new Date(today.getFullYear(), 0, 1),
      'all': null,
    };
    const startDate = ranges[selectedTimeRange];

    return transactions.filter((transaction) => {
      const transactionDate = parseCustomDate(transaction.date);
      if (!transactionDate || (startDate && transactionDate < startDate)) return false;
      return transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [transactions, searchTerm, selectedTimeRange]);

  const totalExpenses = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const monthlyAverage = totalExpenses / (selectedTimeRange === 'this-month' ? 1 : 12);
  const categoryCount = Object.keys(categoryExpenses).length;
  const budgetLimit = 10000;
  const budgetPercentage = Math.min((totalExpenses / budgetLimit) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-50 to-pink-50 ml-0 sm:ml-10">
      <div className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5"></div>
        <div className="relative p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Expenses Dashboard
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base">Monitor and control your spending</p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <button
                onClick={() => setShowAddExpenseModal(true)}
                className="group relative bg-gradient-to-r from-red-500 to-red-600 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-xl flex items-center gap-2 hover:from-red-600 hover:to-red-700 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Add new expense"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                <span className="font-medium text-xs sm:text-sm md:text-base">Add Expense</span>
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                className="md:hidden p-2 sm:p-2.5 rounded-xl bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile menu"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">Total Expenses</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-1">Rs. {totalExpenses.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-2 sm:mt-3 md:mt-4 flex items-center gap-2 text-red-600">
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium">Based on filtered data</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">Monthly Average</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-1">Rs. {Math.round(monthlyAverage).toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-600" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-2 sm:mt-3 md:mt-4 flex items-center gap-2 text-orange-600">
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium">Well managed</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">Categories</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-1">{categoryCount}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-2 sm:mt-3 md:mt-4 flex items-center gap-2 text-purple-600">
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium">Spending spread</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          <div className="lg:col-span-1 xl:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-3 sm:p-4 md:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">Expense History</h2>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                      <input
                        type="text"
                        placeholder="Search expenses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 w-full sm:w-48 md:w-56 lg:w-64 text-xs sm:text-sm"
                        aria-label="Search expenses by category"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <button
                        onClick={() => setFilterVisible(!filterVisible)}
                        className={`p-1.5 sm:p-2 rounded-xl border transition-all duration-300 ${filterVisible ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        aria-label={filterVisible ? 'Hide filters' : 'Show filters'}
                      >
                        <Filter className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                      </button>
                      
                      <button className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 transition-colors duration-300 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl hover:bg-red-50 whitespace-nowrap text-xs sm:text-sm" aria-label="View all expenses">
                        <Eye className="w-4 h-4" aria-hidden="true" />
                        <span className="hidden sm:inline">View All</span>
                      </button>
                    </div>
                  </div>
                </div>

                {filterVisible && (
                  <div className="mt-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Time Range:</span>
                      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                        {['all', 'this-month', 'last-3-months', 'this-year'].map((range) => (
                          <button
                            key={range}
                            onClick={() => setSelectedTimeRange(range)}
                            className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm transition-all duration-300 text-center ${
                              selectedTimeRange === range
                                ? 'bg-red-100 text-red-700 font-medium'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                            aria-label={`Filter by ${range.replace('-', ' ')}`}
                          >
                            {range.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 sm:p-4 md:p-6">
                <div className="space-y-3 sm:space-y-4">
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
                  <div className="text-center py-6 sm:py-8">
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 mx-auto mb-3 sm:mb-4" aria-hidden="true" />
                    <p className="text-gray-500 text-xs sm:text-sm md:text-base">No expenses found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 xl:col-span-1 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Expenses by Category</h3>
                <div className="relative group">
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-help" aria-hidden="true" />
                  <div className="absolute right-0 top-5 sm:top-6 bg-gray-800 text-white text-xs rounded-lg py-1.5 px-2 sm:px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                    All expenses breakdown
                  </div>
                </div>
              </div>
              <PieChart data={categoryExpenses} />
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-3 sm:p-4 md:p-6 text-white shadow-lg">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" aria-hidden="true" />
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">Budget Alert</h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4 opacity-90">
                You're {Math.round(budgetPercentage)}% through your monthly budget of Rs. {budgetLimit.toLocaleString()}.
              </p>
              <div className="w-full bg-white/20 rounded-full h-2 sm:h-2.5 md:h-3 mb-2 sm:mb-3 md:mb-4">
                <div
                  className="bg-white rounded-full h-2 sm:h-2.5 md:h-3 transition-all duration-300"
                  style={{ width: `${budgetPercentage}%` }}
                ></div>
              </div>
              <button className="w-full bg-white/10 hover:bg-white/20 transition-all duration-300 p-2 sm:p-2.5 md:p-3 rounded-xl text-xs sm:text-sm md:text-base font-medium" aria-label="Review budget">
                Review Budget
              </button>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-3 sm:p-4 md:p-6 text-white shadow-lg">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4">Quick Actions</h3>
              <div className="space-y-2 sm:space-y-3">
                <button className="w-full text-left p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center gap-2 text-xs sm:text-sm" aria-label="Add recurring expense">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  <span>Add Recurring Expense</span>
                </button>
                <button className="w-full text-left p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center gap-2 text-xs sm:text-sm" aria-label="View analytics">
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  <span>View Analytics</span>
                </button>
                <button className="w-full text-left p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center gap-2 text-xs sm:text-sm" aria-label="Set budget limits">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
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