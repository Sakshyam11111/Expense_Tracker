import React from 'react';

const PieChart = (props) => {
  const categories = Object.entries(props).filter(([, value]) => value > 0);
  const total = categories.reduce((sum, [, value]) => sum + value, 0);
  const percentages = categories.map(([, value]) => (total ? (value / total) * 100 : 0));

  const colors = [
    '#8b5cf6',
    '#f97316',
    '#ef4444',
    '#10b981',
    '#3b82f6',
    '#eab308',
  ];

  return (
    <div
      className="group flex items-center justify-center flex-col gap-4 transform transition-all duration-300 hover:scale-105"
      data-aos="zoom-in"
      data-aos-duration="800"
    >
      <svg className="w-48 h-48" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
        {categories.map(([category], index) => {
          const percentage = percentages[index];
          const offset = percentages.slice(0, index).reduce((sum, p) => sum + p, 0);
          return (
            percentage > 0 && (
              <circle
                key={category}
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={colors[index % colors.length]}
                strokeWidth="10"
                strokeDasharray={`${percentage} ${100 - percentage}`}
                strokeDashoffset={-offset}
                className="transition-all duration-300 group-hover:stroke-opacity-80"
              />
            )
          );
        })}
      </svg>
      <div className="flex gap-4 text-sm flex-wrap justify-center">
        {categories.map(([category, value], index) => (
          <div
            key={category}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            data-aos="fade-in"
            data-aos-delay={index * 100}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="font-medium text-gray-800">{category}: Rs. {value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;