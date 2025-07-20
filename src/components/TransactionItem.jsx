import React from 'react';
import { Trash2 } from 'lucide-react';

const TransactionItem = ({ transaction, onDelete }) => {
  const { id, category, amount, date, icon: Icon } = transaction;

  return (
    <div
      className="flex items-center justify-between bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
      data-aos="fade-in"
      data-aos-duration="600"
    >
      <div className="flex items-center space-x-4">
        {Icon && <Icon className="w-8 h-8 text-indigo-600" />}
        <div>
          <p className="text-lg font-medium text-gray-900">{category}</p>
          <p className="text-md text-gray-600">
            {date ? new Date(date.replace(/(st|nd|rd|th)/, '')).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Invalid Date'}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <p className="text-lg font-medium text-green-700">Rs. {amount.toLocaleString()}</p>
        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="text-red-600 hover:text-red-800 transition-colors duration-200 p-2 rounded-full hover:bg-red-100"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;