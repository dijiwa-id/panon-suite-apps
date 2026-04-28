import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export const SignIn = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#151515] items-center justify-center p-6">
      <div className="card-glass w-full max-w-md p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white capitalize">Sign In</h2>
          <p className="text-gray-500 mt-2">Welcome back to Panon Suite</p>
        </div>
        
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="email" className="w-full bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-[#2a2a2a] rounded-xl py-3 pl-10 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent/50 outline-none transition-all" placeholder="name@company.com" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <a href="#" className="text-sm text-accent hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="password" className="w-full bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-[#2a2a2a] rounded-xl py-3 pl-10 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent/50 outline-none transition-all" placeholder="••••••••" />
            </div>
          </div>

          <button className="w-full bg-accent text-white font-black uppercase tracking-[0.15em] text-sm py-4 rounded-xl hover:opacity-90 flex items-center justify-center gap-2 transition-all">
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Don't have an account? <Link to="/signup" className="text-accent font-semibold hover:underline">Sign up now</Link>
        </p>
      </div>
    </div>
  );
};
