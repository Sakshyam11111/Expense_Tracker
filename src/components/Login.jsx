import React from 'react';
import { Eye, EyeOff, Lock, Mail, Sparkles, Heart, Star } from 'lucide-react';

const Login = ({ setIsLogin, showPassword, setShowPassword, handleLogin }) => {
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [focusedField, setFocusedField] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [particles, setParticles] = React.useState([]);

  React.useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    handleLogin(e, { email: formData.email, profileImage: null });
    setIsSubmitting(false);
  };

  const getFieldIcon = (fieldName) => {
    switch (fieldName) {
      case 'email': return Mail;
      case 'password': return Lock;
      default: return Mail;
    }
  };

  return (
    <div 
      className="relative overflow-hidden flex items-center justify-center w-screen h-screen"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #667eea 0%, #764ba2 25%, #4facfe 50%, #00c9ff 75%, #92fe9d 100%)
        `
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Animated background particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          <div className="w-full h-full bg-white/30 rounded-full animate-ping" />
        </div>
      ))}

      {/* Floating shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-20 animate-pulse" style={{ animationDuration: '2s' }} />
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />

      <div className="relative z-10 w-full max-w-3xl px-4">
        <div
          className={`
            bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20
            transform transition-all duration-500
            ${focusedField ? 'ring-4 ring-white/30' : ''}
          `}
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
          }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side: Form Fields */}
            <div className="flex-1 space-y-6">
              {/* Header with animated icon */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mb-4 shadow-lg transform hover:rotate-12 transition-transform duration-300">
                  <Lock className="w-10 h-10 text-white animate-pulse" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                  Welcome Back
                </h2>
                <p className="text-white/70">Sign in to continue your journey</p>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-4 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 
                             focus:ring-4 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all duration-300
                             backdrop-blur-sm hover:bg-white/20 group-hover:border-white/50"
                    placeholder="Enter your email"
                    required
                  />
                  <div className={`absolute right-4 top-4 transition-all duration-300 ${focusedField === 'email' ? 'text-cyan-400 scale-110' : 'text-white/50'}`}>
                    <Mail className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-4 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 
                             focus:ring-4 focus:ring-emerald-500/50 focus:border-emerald-400 transition-all duration-300
                             backdrop-blur-sm hover:bg-white/20 group-hover:border-white/50 pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-4 transition-all duration-300 hover:scale-110 
                              ${focusedField === 'password' ? 'text-emerald-400' : 'text-white/50'} hover:text-white`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Sign In Button and Sign Up Section */}
            <div className="flex-1 flex flex-col justify-center items-center space-y-6">
              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`
                  w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform
                  ${isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed scale-95' 
                    : 'bg-gradient-to-r from-indigo-600 via-cyan-600 to-emerald-600 hover:from-indigo-700 hover:via-cyan-700 hover:to-emerald-700 hover:scale-105 hover:shadow-2xl'
                  }
                  text-white shadow-lg active:scale-95 relative overflow-hidden group
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 animate-pulse" />
                      Sign In
                      <Heart className="w-5 h-5 animate-pulse" />
                    </>
                  )}
                </div>
              </button>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-white/70 mb-2">Don't have an account?</p>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="group inline-flex items-center gap-2 text-white hover:text-cyan-300 font-medium 
                           transition-all duration-300 transform hover:scale-105 bg-white/10 px-6 py-3 rounded-full
                           hover:bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50"
                >
                  <Star className="w-4 h-4 group-hover:animate-spin" />
                  Create New Account
                  <Star className="w-4 h-4 group-hover:animate-spin" style={{ animationDelay: '0.5s' }} />
                </button>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-full opacity-60 animate-ping" />
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-60 animate-pulse" />
        </div>

        {/* Success message area */}
        {isSubmitting && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white border border-white/30">
              <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              <span>Preparing your experience...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;