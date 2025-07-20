import React, { useState } from 'react';
import { User, CreditCard, BarChart3, LogOut, X, Settings, Bell, Star, Activity, TrendingUp, ChevronRight } from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView, userData, handleLogout, setIsMobileMenuOpen, isMobileMenuOpen }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);

  const sampleUserData = userData || {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: null,
    totalBalance: 45000,
    memberSince: '2023'
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      color: 'from-blue-500 to-indigo-600',
      description: 'Overview & Analytics'
    },
    {
      id: 'expense',
      label: 'Expenses',
      icon: CreditCard,
      color: 'from-rose-500 to-red-600',
      description: 'Track your spending'
    },
    {
      id: 'income',
      label: 'Income',
      icon: TrendingUp,
      color: 'from-emerald-500 to-green-600',
      description: 'Manage earnings'
    }
  ];

  const quickActions = [
    { icon: Settings, label: 'Settings', color: 'text-gray-400 hover:text-indigo-400' },
    { icon: Bell, label: 'Notifications', color: 'text-gray-400 hover:text-yellow-400' },
    { icon: Star, label: 'Favorites', color: 'text-gray-400 hover:text-pink-400' }
  ];

  return (
    <>
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`
        fixed md:sticky top-0 left-0 h-full z-50 transform transition-all duration-500 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'w-20' : 'w-80'} md:w-80
        bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
        text-white flex flex-col shadow-2xl
        border-r border-gray-700/50
      `}>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/15 to-cyan-500/15 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-0 w-28 h-28 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 p-6 border-b border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative group">
                {sampleUserData.profileImage ? (
                  <img
                    src={sampleUserData.profileImage}
                    alt="Profile"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-400/30 group-hover:border-indigo-400/60 transition-all duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
              </div>
              
              {!isCollapsed && (
                <div className="animate-slideIn">
                  <h2 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {sampleUserData.name}
                  </h2>
                  <p className="text-sm text-gray-400">{sampleUserData.email}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isCollapsed && (
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-4 backdrop-blur-sm border border-gray-600/30 animate-slideIn">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Total Balance</p>
                  <p className="text-lg font-bold text-emerald-400">Rs. {sampleUserData.totalBalance.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
                <TrendingUp className="w-3 h-3" />
                <span>+2.5% this month</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 p-4 space-y-2 relative z-10">
          <div className="mb-6">
            {!isCollapsed && (
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                Navigation
              </p>
            )}
            
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden
                      ${isActive 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25 scale-105' 
                        : 'hover:bg-gray-800/50 hover:scale-105 hover:shadow-lg'
                      }
                    `}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl`}></div>
                    
                    <div className={`
                      relative z-10 p-2 rounded-xl transition-all duration-300
                      ${isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-700/50 text-gray-400 group-hover:text-white group-hover:bg-gray-600/50'
                      }
                    `}>
                      <Icon className={`w-5 h-5 transition-transform duration-300 ${hoveredItem === item.id ? 'scale-110 rotate-6' : ''}`} />
                    </div>
                    
                    {!isCollapsed && (
                      <div className="relative z-10 flex-1 text-left">
                        <span className={`font-medium transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {item.label}
                        </span>
                        <p className={`text-xs transition-colors duration-300 ${
                          isActive ? 'text-gray-200' : 'text-gray-500 group-hover:text-gray-400'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                    )}
                    
                    {!isCollapsed && (
                      <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                        isActive ? 'text-white translate-x-1' : 'text-gray-500 group-hover:text-gray-300 group-hover:translate-x-1'
                      }`} />
                    )}

                    {isActive && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-white to-gray-300 rounded-r-full"></div>
                    )}
                  </button>

                  {isCollapsed && hoveredItem === item.id && (
                    <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-50 shadow-lg border border-gray-600">
                      {item.label}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45 border-l border-b border-gray-600"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!isCollapsed && (
            <div className="pt-4 border-t border-gray-700/50">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                Quick Actions
              </p>
              <div className="flex gap-2">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-gray-800/50 ${action.color}`}
                      onMouseEnter={() => setShowTooltip(action.label)}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-700/50 relative z-10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-red-900/30 transition-all duration-300 group relative overflow-hidden hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            
            <div className="relative z-10 p-2 rounded-xl bg-red-900/30 text-red-400 group-hover:bg-red-800/50 group-hover:text-red-300 transition-all duration-300">
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </div>
            
            {!isCollapsed && (
              <div className="relative z-10 flex-1 text-left">
                <span className="font-medium text-red-400 group-hover:text-red-300 transition-colors duration-300">Logout</span>
                <p className="text-xs text-red-500/70 group-hover:text-red-400/70 transition-colors duration-300">Sign out of account</p>
              </div>
            )}
            
            {!isCollapsed && (
              <ChevronRight className="w-4 h-4 text-red-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300" />
            )}
          </button>

          {!isCollapsed && (
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">Member since {sampleUserData.memberSince}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs text-yellow-500">Premium User</span>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:block absolute -right-3 top-8 w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
        >
          <ChevronRight className={`w-3 h-3 text-white transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} />
        </button>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Sidebar;