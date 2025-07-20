import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, change, trend, ...props }) => (
  <div
    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300"
    {...props}
  >
    <h3 className="text-sm font-medium text-gray-500 tracking-wide">{title}</h3>
    <p className="text-2xl font-medium text-gray-900 mt-2">{value}</p>
    <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'} font-medium`}>
      {trend === 'up' ? (
        <TrendingUp className="w-5 h-5 mr-1" />
      ) : (
        <TrendingDown className="w-5 h-5 mr-1" />
      )}
      <span>{change}</span>
    </div>
  </div>
);

export default StatCard;