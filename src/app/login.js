// app/login/page.jsx
"use client";

import { useState } from 'react';
import { FaLock, FaEnvelope, FaPaintBrush } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
      <div className="w-full max-w-md">
        {/* Artistic header */}
        <div className="text-center mb-8">
          <FaPaintBrush className="mx-auto text-5xl text-primary mb-4" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-2 text-neutral/80">Sign in to your creative space</p>
        </div>

        {/* Borderless login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 bg-base-200/50 rounded-lg transition-all duration-300 focus-within:bg-base-200/70 focus-within:ring-2 focus-within:ring-primary/30">
              <FaEnvelope className="text-neutral/70" />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border-none outline-none placeholder-neutral/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 bg-base-200/50 rounded-lg transition-all duration-300 focus-within:bg-base-200/70 focus-within:ring-2 focus-within:ring-primary/30">
              <FaLock className="text-neutral/70" />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-transparent border-none outline-none placeholder-neutral/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            Sign In
          </button>
        </form>

        {/* Footer links */}
        <div className="mt-6 text-center space-y-3">
          <a href="#" className="text-sm text-neutral/70 hover:text-primary transition-colors">
            Forgot password?
          </a>
          <p className="text-sm text-neutral/70">
            Don't have an account?{' '}
            <a href="#" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}