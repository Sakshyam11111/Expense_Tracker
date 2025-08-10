import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleTryClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#92fe9d] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side: Introduction */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent leading-tight">
            Introducing Expense Tracker
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
            <button
              onClick={handleTryClick}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg"
            >
              Try Expense Tracker
            </button>
            <button
              onClick={handleTryClick}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 text-base sm:text-lg"
            >
              Try Expense Tracker for Work
            </button>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto lg:mx-0">
            Expense Tracker is a powerful tool to manage your personal and professional finances. Track expenses, monitor income, visualize data with charts, and stay on top of your budget. Whether for individual use or team collaboration, our app provides intuitive features like real-time analytics, customizable categories, and secure authentication.
          </p>
        </div>

        {/* Right Side: 3D Cube Animation */}
        <div className="flex items-center justify-center perspective-1000">
          <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative preserve-3d animate-rotateCube">
            <div className="absolute w-full h-full bg-gradient-to-r from-indigo-500/80 to-cyan-500/80 backdrop-blur-sm shadow-lg transform translate-z-24"></div> {/* Front */}
            <div className="absolute w-full h-full bg-gradient-to-r from-cyan-500/80 to-emerald-500/80 backdrop-blur-sm shadow-lg transform rotate-y-180 translate-z--24"></div> {/* Back */}
            <div className="absolute w-full h-full bg-gradient-to-r from-violet-500/80 to-indigo-500/80 backdrop-blur-sm shadow-lg transform rotate-y-90 translate-z-24"></div> {/* Right */}
            <div className="absolute w-full h-full bg-gradient-to-r from-emerald-500/80 to-cyan-500/80 backdrop-blur-sm shadow-lg transform rotate-y--90 translate-z-24"></div> {/* Left */}
            <div className="absolute w-full h-full bg-gradient-to-r from-blue-500/80 to-cyan-500/80 backdrop-blur-sm shadow-lg transform rotate-x-90 translate-z-24"></div> {/* Top */}
            <div className="absolute w-full h-full bg-gradient-to-r from-indigo-600/80 to-violet-600/80 backdrop-blur-sm shadow-lg transform rotate-x--90 translate-z-24"></div> {/* Bottom */}
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .animate-rotateCube {
          animation: rotateCube 10s infinite linear;
        }
        .translate-z-24 {
          translate: 0 0 12rem; /* Half of width/height assuming 24rem for lg:w-96 (24rem) */
        }
        .translate-z--24 {
          translate: 0 0 -12rem;
        }
        @keyframes rotateCube {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;