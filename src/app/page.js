"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheck, FiBarChart2, FiUsers, FiClock, FiBriefcase, FiLayers } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MOCK_USERS = [
  {
    id: 1,
    email: 'user@example.com',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMy.Mrq4H3dIi6T7u7Z7P4XqV1zY5JQ1qW6', // hashed "owner123"
    name: 'Project Owner',
    role: 'owner'
  },
  {
    id: 2,
    email: 'manager@example.com',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMy.Mrq4H3dIi6T7u7Z7P4XqV1zY5JQ1qW6', // hashed "manager123"
    name: 'Project Manager',
    role: 'manager'
  }
];

const DigitalClock = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return <div className="h-[84px]"></div>;

  const formatTime = (t) => (t < 10 ? `0${t}` : t);

  return (
    <div className="text-center mb-8">
      <div className="inline-block bg-gray-800/90 text-white px-6 py-3 rounded-xl shadow-lg backdrop-blur-sm border border-gray-700">
        <div className="text-4xl font-mono font-bold">
          {formatTime(time.getHours())}:{formatTime(time.getMinutes())}:{formatTime(time.getSeconds())}
        </div>
        <div className="text-sm opacity-80 mt-1">
          {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </div>
  );
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const user = MOCK_USERS.find(user => user.email === email);
      
      if (user && password === (user.email === 'user@example.com' ? 'user123' : 'manager123')) {
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        router.push(user.role === 'owner' ? '/dashboard/' : '/dashboard/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gray-900">
      {/* Background with less busy pattern */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Dark abstract background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      <div className="container mx-auto px-4 min-h-screen flex items-center">
        {/* Left side - Project management focused content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex flex-col w-1/2 pr-12 text-white"
        >
          <DigitalClock />
          
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            <span className="text-blue-400">Meridian</span> Project <span className="text-purple-400">Control</span>
          </h1>
          
          <p className="text-xl mb-8 opacity-90">
            Comprehensive tools for owners to manage projects, teams, and resources efficiently.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-600/90 p-2 rounded-lg mr-4 backdrop-blur-sm">
                <FiBriefcase className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Project Management</h3>
                <p className="opacity-80">Track progress, deadlines, and deliverables</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-600/90 p-2 rounded-lg mr-4 backdrop-blur-sm">
                <FiUsers className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Team Coordination</h3>
                <p className="opacity-80">Manage users and assign tasks efficiently</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-600/90 p-2 rounded-lg mr-4 backdrop-blur-sm">
                <FiLayers className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Resource Tracking</h3>
                <p className="opacity-80">Monitor materials and inventory in real-time</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex items-center">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
                  <span className="text-xs font-bold">PM{item}</span>
                </div>
              ))}
            </div>
            <div className="ml-4">
              <p className="text-sm opacity-90">Trusted by <span className="font-bold">5,000+</span> project teams</p>
            </div>
          </div>
        </motion.div>

        {/* Page divider */}
        <div className="hidden md:block h-96 w-px bg-white/20 mx-8"></div>

        {/* Right side - Login form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/3 lg:w-1/4"
        >
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FiLock className="text-white text-2xl" />
                </div>
                <h1 className="text-2xl font-bold text-white">Meridian Portal</h1>
                <p className="text-gray-400 mt-1">Secure access to your projects</p>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-900/50 text-red-100 rounded-lg flex items-center gap-2 border border-red-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                      placeholder="user@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700/50 text-white placeholder-gray-400"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FiEyeOff className="text-gray-400 hover:text-gray-300" />
                      ) : (
                        <FiEye className="text-gray-400 hover:text-gray-300" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                    />
                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    'Access Dashboard'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-400">
                Need help?{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">
                  Contact support
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}