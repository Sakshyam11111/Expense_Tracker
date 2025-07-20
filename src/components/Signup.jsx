import React from 'react';
import { Eye, EyeOff, Lock, User, Mail, Sparkles, Zap, Star, Rocket } from 'lucide-react';

const Signup = ({ setIsLogin, showPassword, setShowPassword, handleLogin }) => {
  const [formData, setFormData] = React.useState({ username: '', email: '', password: '' });
  const [focusedField, setFocusedField] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [particles, setParticles] = React.useState([]);

  React.useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 3,
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    handleLogin(e, { username: formData.username, email: formData.email, profileImage: null });
    setIsLogin(true);
    setIsSubmitting(false);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-6"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 211, 238, 0.4) 0%, transparent 60%),
          linear-gradient(135deg, #0f766e 0%, #0891b2 25%, #3b82f6 50%, #6366f1 75%, #8b5cf6 100%)
        `
      }}
      onMouseMove={handleMouseMove}
    >
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
          <div className="w-full h-full bg-white/40 rounded-full animate-ping" />
        </div>
      ))}

      <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '4.5s' }} />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-pulse" style={{ animationDuration: '3.5s' }} />
      <div className="absolute top-1/3 right-20 w-28 h-28 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '5.5s' }} />
      <div className="absolute bottom-1/3 left-10 w-32 h-32 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '3s' }} />

      <div className="relative z-10 w-full max-w-4xl">
        <div
          className={`
            bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20
            transform transition-all duration-500 hover:scale-105 hover:shadow-3xl
            ${focusedField ? 'ring-4 ring-white/30' : ''}
          `}
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
          }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side: Form Fields */}
            <div className="flex-1 space-y-8">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mb-6 shadow-lg transform hover:rotate-12 hover:scale-110 transition-all duration-300">
                  <Rocket className="w-14 h-14 text-white animate-bounce" />
                </div>
                <h2 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                  Join Us Today
                </h2>
                <p className="text-white/70 text-lg">Create your account and start your adventure</p>
              </div>

              <div className="group">
                <label className="block text-base font-medium text-white/90 mb-2 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 
                             focus:ring-4 focus:ring-teal-500/50 focus:border-teal-400 transition-all duration-300
                             backdrop-blur-sm hover:bg-white/20 group-hover:border-white/50 text-lg"
                    placeholder="Choose your username"
                    required
                  />
                  <div className={`absolute right-5 top-4 transition-all duration-300 ${focusedField === 'username' ? 'text-teal-400 scale-110 rotate-12' : 'text-white/50'}`}>
                    <User className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-base font-medium text-white/90 mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 
                             focus:ring-4 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all duration-300
                             backdrop-blur-sm hover:bg-white/20 group-hover:border-white/50 text-lg"
                    placeholder="Enter your email address"
                    required
                  />
                  <div className={`absolute right-5 top-4 transition-all duration-300 ${focusedField === 'email' ? 'text-cyan-400 scale-110 rotate-12' : 'text-white/50'}`}>
                    <Mail className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-base font-medium text-white/90 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
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
                    className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 
                             focus:ring-4 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all duration-300
                             backdrop-blur-sm hover:bg-white/20 group-hover:border-white/50 pr-14 text-lg"
                    placeholder="Create a secure password"
                    required
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-5 top-4 transition-all duration-300 hover:scale-110 
                              ${focusedField === 'password' ? 'text-indigo-400' : 'text-white/50'} hover:text-white`}
                  >
                    {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Submit Button, Login Link, and Welcome Message */}
            <div className="flex-1 space-y-8 flex flex-col justify-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`
                  w-full py-5 rounded-2xl font-semibold text-xl transition-all duration-300 transform
                  ${isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed scale-95' 
                    : 'bg-gradient-to-r from-teal-600 via-cyan-600 to-indigo-600 hover:from-teal-700 hover:via-cyan-700 hover:to-indigo-700 hover:scale-105 hover:shadow-2xl'
                  }
                  text-white shadow-lg active:scale-95 relative overflow-hidden group
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="relative flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-6 h-6 animate-bounce" />
                      Create Account
                      <Sparkles className="w-6 h-6 animate-pulse" />
                    </>
                  )}
                </div>
              </button>

              {isSubmitting && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full text-white border border-white/30">
                    <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                    <span className="text-lg">Setting up your account...</span>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                </div>
              )}

              <div className="text-center">
                <p className="text-white/70 mb-4 text-lg">Already part of our community?</p>
                <button
                  onClick={() => setIsLogin(true)}
                  className="group inline-flex items-center gap-3 text-white hover:text-cyan-300 font-medium 
                           transition-all duration-300 transform hover:scale-105 bg-white/10 px-8 py-4 rounded-full
                           hover:bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50"
                >
                  <Zap className="w-5 h-5 group-hover:animate-bounce" />
                  Sign In Instead
                  <Star className="w-5 h-5 group-hover:animate-spin" />
                </button>
              </div>

              <div className="text-center">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <p className="text-white/80 text-base leading-relaxed">
                    🚀 Join thousands of users already enjoying our platform
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-60 animate-ping" />
          <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60 animate-pulse" />
          <div className="absolute top-1/2 -left-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-60 animate-bounce" />
          <div className="absolute top-10 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-60 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Signup;