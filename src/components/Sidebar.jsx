import React, { useState } from 'react';
import { User, CreditCard, BarChart3, LogOut, X, Settings, Bell, Star, Activity, TrendingUp, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ currentView, userData, handleLogout, setIsMobileMenuOpen, isMobileMenuOpen }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  const navigate = useNavigate();

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
      id: 'expenses',
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
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className={`
        fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'w-16 sm:w-20' : 'w-60 sm:w-64 md:w-80'}
        bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
        text-white flex flex-col shadow-2xl
        border-r border-gray-700/50
      `}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/3 -left-4 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500/15 to-cyan-500/15 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 right-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-50 p-3 sm:p-4 md:p-5 border-b border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative group">
                {sampleUserData.profileImage ? (
                  <img
                    src={sampleUserData.profileImage}
                    alt="Profile"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border-2 border-indigo-400/30 group-hover:border-indigo-400/60 transition-all duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-md">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
              </div>

              {!isCollapsed && (
                <div className="animate-slideIn">
                  <h2 className="text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent truncate max-w-[120px] sm:max-w-[140px] md:max-w-[180px]">
                    {sampleUserData.name}
                  </h2>
                  <p className="text-xs text-gray-400 truncate">{sampleUserData.email}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1 sm:p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              aria-label="Close mobile menu"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {!isCollapsed && (
            <div className="mt-2 sm:mt-3 md:mt-4">
              <p className="text-xs text-gray-400">Balance</p>
              <p className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                ${sampleUserData.totalBalance.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        <div className="relative z-50 flex-1 p-2 sm:p-3 md:p-4 overflow-y-auto">
          <div className="space-y-1 sm:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <div
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => navigate(`/${item.id}`)}
                    className={`
                      w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 rounded-lg transition-all duration-300
                      ${isActive ? `bg-gradient-to-r ${item.color} text-white shadow-md` : 'hover:bg-gray-800/50'}
                      hover:scale-105 transform group-hover:shadow-lg relative overflow-hidden
                    `}
                    aria-label={item.label}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className={`
                      relative z-10 p-1 sm:p-1.5 rounded-lg transition-all duration-300
                      ${isActive ? 'bg-white/20 group-hover:bg-white/30' : 'bg-gray-800/50 group-hover:bg-gray-700/50'}
                    `}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {!isCollapsed && (
                      <div className="relative z-10 flex-1 text-left animate-slideIn">
                        <span className="font-medium text-xs sm:text-sm">{item.label}</span>
                        <p className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-300">{item.description}</p>
                      </div>
                    )}

                    {!isCollapsed && isActive && (
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
                    )}
                  </button>

                  {hoveredItem === item.id && isCollapsed && (
                    <div className="absolute left-full ml-1 sm:ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm whitespace-nowrap z-50 shadow-md border border-gray-600">
                      {item.label}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45 border-l border-b border-gray-600"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!isCollapsed && (
            <div className="pt-2 sm:pt-3 md:pt-4 border-t border-gray-700/50">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                Quick Actions
              </p>
              <div className="flex gap-2 sm:gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className={`p-1.5 sm:p-2 md:p-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-gray-800/50 ${action.color}`}
                      onMouseEnter={() => setShowTooltip(action.label)}
                      onMouseLeave={() => setShowTooltip(null)}
                      aria-label={action.label}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {showTooltip === action.label && (
                        <div className="absolute left-full ml-1 sm:ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm whitespace-nowrap z-50 shadow-md border border-gray-600">
                          {action.label}
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45 border-l border-b border-gray-600"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="p-2 sm:p-3 md:p-4 border-t border-gray-700/50 relative z-50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 rounded-lg hover:bg-red-900/30 transition-all duration-300 group relative overflow-hidden hover:scale-105"
            aria-label="Logout"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

            <div className="relative z-10 p-1 sm:p-1.5 rounded-lg bg-red-900/30 text-red-400 group-hover:bg-red-800/50 group-hover:text-red-300 transition-all duration-300">
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-105 transition-transform duration-300" />
            </div>

            {!isCollapsed && (
              <div className="relative z-10 flex-1 text-left">
                <span className="font-medium text-xs sm:text-sm text-red-400 group-hover:text-red-300 transition-colors duration-300">Logout</span>
                <p className="text-xs text-red-500/70 group-hover:text-red-400/70 transition-colors duration-300">Sign out of account</p>
              </div>
            )}

            {!isCollapsed && (
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300" />
            )}
          </button>

          {!isCollapsed && (
            <div className="mt-2 sm:mt-3 md:mt-4 text-center">
              <p className="text-xs text-gray-500">Member since {sampleUserData.memberSince}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                <span className="text-xs sm:text-sm text-yellow-500">Premium User</span>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:block absolute -right-2.5 top-6 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 z-50"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
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