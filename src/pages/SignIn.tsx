import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string, password?: string}>({});

  const validate = () => {
    let isValid = true;
    const newErrors: {email?: string, password?: string} = {};
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('SignIn', { email, password });
      // Proceed with authentication
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#151515] items-center justify-center p-6">
      <div className="card-glass w-full max-w-md p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white capitalize">Sign In</h2>
          <p className="text-gray-500 mt-2">Welcome back to Panon Suite</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn("w-full bg-white dark:bg-[#1e1e1e] border rounded-[11px] py-3 pl-10 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent/50 outline-none transition-all", errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-300 dark:border-[#222]")} 
                placeholder="name@company.com" 
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <a href="#" className="text-sm text-accent hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn("w-full bg-white dark:bg-[#1e1e1e] border rounded-[11px] py-3 pl-10 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent/50 outline-none transition-all", errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-300 dark:border-[#222]")} 
                placeholder="••••••••" 
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.password}</p>}
          </div>

          <button type="submit" className="w-full bg-accent text-black font-black tracking-tight text-sm py-4 rounded-xl hover:opacity-90 flex items-center justify-center gap-2 transition-all">
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
