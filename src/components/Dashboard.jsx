import React, { useMemo, useState, useEffect } from 'react';
import { Plus, ArrowRight, Menu, Info, TrendingUp, TrendingDown, Eye, EyeOff, Zap, Target, Award, DollarSign } from 'lucide-react';

// Enhanced StatCard with interactive features
const StatCard = ({ title, value, change, trend, icon: Icon, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`group relative bg-gradient-to-br ${
        trend === 'up' ? 'from-emerald-50 to-green-100' : 'from-rose-50 to-red-100'
      } rounded-3xl p-6 shadow-lg border-0 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onClick={() => setShowDetails(!showDetails)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-70 transition-all duration-1000 delay-${i * 100}`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animation: `float ${2 + i * 0.5}s ease-in-out infinite`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-2xl ${trend === 'up' ? 'bg-emerald-500' : 'bg-rose-500'} transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            trend === 'up' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
          } transform group-hover:pulse`}>
            {change}
          </div>
        </div>
        
        <h3 className="text-gray-600 text-sm font-medium mb-2 group-hover:text-gray-800 transition-colors">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 group-hover:scale-110 transform transition-all duration-300">{value}</p>
        
        {showDetails && (
          <div className="mt-4 p-3 bg-white/50 rounded-2xl backdrop-blur-sm animate-slideIn">
            <p className="text-xs text-gray-600">Compared to last month</p>
            <div className="flex items-center mt-1">
              {trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" /> : <TrendingDown className="w-4 h-4 text-rose-500 mr-1" />}
              <span className="text-sm font-medium">{trend === 'up' ? 'Growing' : 'Decreasing'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced TransactionItem with hover effects
const TransactionItem = ({ transaction, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-gray-50 hover:bg-white p-4 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Sliding color indicator */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${
        transaction.amount > 0 ? 'from-emerald-400 to-green-500' : 'from-rose-400 to-red-500'
      } transform transition-all duration-300 ${isHovered ? 'w-2 shadow-lg' : ''}`}></div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 ${
            transaction.amount > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
          }`}>
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">{transaction.description}</h4>
            <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">{transaction.category} • {transaction.date}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`font-bold text-lg ${transaction.amount > 0 ? 'text-emerald-600' : 'text-rose-600'} group-hover:scale-110 transform transition-all duration-300`}>
            Rs. {Math.abs(transaction.amount).toLocaleString()}
          </p>
          {isHovered && (
            <p className="text-xs text-gray-500 animate-slideIn">{transaction.amount > 0 ? 'Income' : 'Expense'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced PieChart with interactive segments
const PieChart = ({ data = {}, totalBalance, totalIncome, totalExpenses }) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [animateChart, setAnimateChart] = useState(false);

  useEffect(() => {
    setAnimateChart(true);
  }, []);

  // Use the passed data or create default data structure
  const chartData = Object.keys(data).length > 0 ? data : {
    'Available': totalBalance || 0,
    'Income': totalIncome || 0,
    'Expenses': totalExpenses || 0
  };

  const total = Object.values(chartData).reduce((sum, value) => sum + value, 0);
  const colors = ['#10B981', '#3B82F6', '#EF4444', '#F59E0B', '#8B5CF6', '#EC4899'];

  let currentAngle = 0;
  const segments = Object.entries(chartData).map(([key, value], index) => {
    const percentage = (value / total) * 100;
    const angle = (value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    const isHovered = hoveredSegment === index;
    const radius = isHovered ? 85 : 80;
    const outerRadius = isHovered ? 95 : 80;

    return {
      key,
      value,
      percentage,
      startAngle,
      endAngle,
      color: colors[index % colors.length],
      isHovered,
      radius,
      outerRadius
    };
  });

  return (
    <div className="relative">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <svg width="280" height="280" className="transform transition-transform duration-500 hover:scale-105">
            {segments.map((segment, index) => {
              const startAngleRad = (segment.startAngle - 90) * (Math.PI / 180);
              const endAngleRad = (segment.endAngle - 90) * (Math.PI / 180);
              
              const x1 = 140 + segment.radius * Math.cos(startAngleRad);
              const y1 = 140 + segment.radius * Math.sin(startAngleRad);
              const x2 = 140 + segment.radius * Math.cos(endAngleRad);
              const y2 = 140 + segment.radius * Math.sin(endAngleRad);
              
              const largeArc = segment.endAngle - segment.startAngle > 180 ? 1 : 0;
              
              const pathData = [
                `M 140 140`,
                `L ${x1} ${y1}`,
                `A ${segment.radius} ${segment.radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');

              return (
                <g key={index}>
                  <path
                    d={pathData}
                    fill={segment.color}
                    className={`cursor-pointer transition-all duration-300 ${
                      segment.isHovered ? 'brightness-110 drop-shadow-lg' : 'hover:brightness-105'
                    }`}
                    onMouseEnter={() => setHoveredSegment(index)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{
                      transform: segment.isHovered ? 'scale(1.05)' : 'scale(1)',
                      transformOrigin: '140px 140px',
                      strokeWidth: segment.isHovered ? 3 : 0,
                      stroke: segment.isHovered ? '#fff' : 'transparent'
                    }}
                  />
                </g>
              );
            })}
            
            {/* Center circle with total */}
            <circle
              cx="140"
              cy="140"
              r="50"
              fill="white"
              className="drop-shadow-md"
            />
            <text
              x="140"
              y="135"
              textAnchor="middle"
              className="text-sm font-medium fill-gray-600"
            >
              Total
            </text>
            <text
              x="140"
              y="150"
              textAnchor="middle"
              className="text-lg font-bold fill-gray-900"
            >
              Rs. {(total / 1000).toFixed(0)}k
            </text>
          </svg>

          {/* Hover tooltip */}
          {hoveredSegment !== null && (
            <div className="absolute top-0 right-0 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm animate-slideIn">
              <div className="font-medium">{segments[hoveredSegment].key}</div>
              <div>Rs. {segments[hoveredSegment].value.toLocaleString()}</div>
              <div className="text-xs opacity-75">{segments[hoveredSegment].percentage.toFixed(1)}%</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Legend */}
      <div className="space-y-2">
        {segments.map((segment, index) => (
          <div 
            key={index}
            className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all duration-300 ${
              segment.isHovered ? 'bg-gray-100 transform scale-105' : 'hover:bg-gray-50'
            }`}
            onMouseEnter={() => setHoveredSegment(index)}
            onMouseLeave={() => setHoveredSegment(null)}
          >
            <div 
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                segment.isHovered ? 'scale-125 ring-2 ring-white shadow-lg' : ''
              }`}
              style={{ backgroundColor: segment.color }}
            ></div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">{segment.key}</div>
              <div className="text-xs text-gray-500">Rs. {segment.value.toLocaleString()}</div>
            </div>
            <div className={`text-sm font-medium transition-all duration-300 ${
              segment.isHovered ? 'text-indigo-600 scale-110' : 'text-gray-600'
            }`}>
              {segment.percentage.toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = ({ userData, transactions, incomes, setShowAddIncomeModal, setShowAddExpenseModal, setIsMobileMenuOpen }) => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const parseCustomDate = (dateStr) => {
    const cleanDateStr = dateStr.replace(/(st|nd|rd|th)/, '');
    return new Date(cleanDateStr);
  };

  const incomeBySource = useMemo(() => {
    const today = new Date('2025-07-20');
    const sixtyDaysAgo = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000);
    const sourceMap = {};

    incomes?.forEach(income => {
      const incomeDate = parseCustomDate(income.date);
      if (incomeDate >= sixtyDaysAgo && incomeDate <= today && !isNaN(incomeDate)) {
        const source = income.source;
        sourceMap[source] = (sourceMap[source] || 0) + income.amount;
      }
    });

    return sourceMap;
  }, [incomes]);

  const expenseByCategory = useMemo(() => {
    const today = new Date('2025-07-20');
    const sixtyDaysAgo = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000);
    const categoryMap = {};

    transactions?.forEach(transaction => {
      const transactionDate = parseCustomDate(transaction.date);
      if (transactionDate >= sixtyDaysAgo && transactionDate <= today && !isNaN(transactionDate)) {
        const category = transaction.category;
        categoryMap[category] = (categoryMap[category] || 0) + transaction.amount;
      }
    });

    return categoryMap;
  }, [transactions]);

  // Sample data for demo
  const sampleUserData = userData || {
    name: 'John Doe',
    totalBalance: 45000,
    totalIncome: 80000,
    totalExpenses: 35000
  };

  const sampleTransactions = transactions || [
    { id: 1, description: 'Grocery Shopping', category: 'Food', amount: -2500, date: 'Jul 19th' },
    { id: 2, description: 'Salary Credit', category: 'Income', amount: 50000, date: 'Jul 18th' },
    { id: 3, description: 'Electric Bill', category: 'Utilities', amount: -1500, date: 'Jul 17th' },
    { id: 4, description: 'Freelance Work', category: 'Income', amount: 15000, date: 'Jul 16th' },
    { id: 5, description: 'Coffee Shop', category: 'Food', amount: -450, date: 'Jul 15th' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-200/30 to-indigo-200/30 blur-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${10 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * -2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {sampleUserData.name}! 👋
              </h1>
            </div>
            <p className="text-gray-600 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowAddIncomeModal?.(true)}
              className="group relative bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 hover:from-emerald-600 hover:to-green-700 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-medium">Add Income</span>
              <Target className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button
              onClick={() => setShowAddExpenseModal?.(true)}
              className="group relative bg-gradient-to-r from-rose-500 to-red-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 hover:from-rose-600 hover:to-red-700 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-medium">Add Expense</span>
              <Award className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button
              className="md:hidden p-3 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200"
              onClick={() => setIsMobileMenuOpen?.(true)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Balance"
            value={balanceVisible ? `Rs. ${sampleUserData.totalBalance.toLocaleString()}` : 'Rs. ••••••'}
            change="+2.5%"
            trend="up"
            icon={DollarSign}
            delay={100}
          />
          <StatCard
            title="Total Income"
            value={`Rs. ${sampleUserData.totalIncome.toLocaleString()}`}
            change="+1.8%"
            trend="up"
            icon={TrendingUp}
            delay={200}
          />
          <StatCard
            title="Total Expenses"
            value={`Rs. ${sampleUserData.totalExpenses.toLocaleString()}`}
            change="-0.5%"
            trend="down"
            icon={TrendingDown}
            delay={300}
          />
        </div>

        {/* Balance Visibility Toggle */}
        <div className="flex justify-end">
          <button
            onClick={() => setBalanceVisible(!balanceVisible)}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:bg-white transition-all duration-300 text-sm text-gray-600 hover:text-gray-900"
          >
            {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {balanceVisible ? 'Hide Balance' : 'Show Balance'}
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Transactions Section */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  Recent Transactions
                </h2>
                <button className="group text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-indigo-50 transition-all duration-300">
                  See All 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
              <div className="space-y-4">
                {sampleTransactions.map((transaction, index) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    delay={index * 100}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Info className="w-4 h-4 text-white" />
                </div>
                Financial Overview
              </h2>
              <PieChart
                totalBalance={sampleUserData.totalBalance}
                totalIncome={sampleUserData.totalIncome}
                totalExpenses={sampleUserData.totalExpenses}
              />
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                Income Sources
              </h2>
              <PieChart data={incomeBySource} />
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-red-500 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-white" />
                </div>
                Expense Categories
              </h2>
              <PieChart data={expenseByCategory} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;