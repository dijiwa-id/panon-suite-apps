import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { Logo } from '../components/Logo';

export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{name?: string, email?: string, password?: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    const newErrors: {name?: string, email?: string, password?: string} = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
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
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter and one number';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      // Simulate auth
      setTimeout(() => {
        setIsLoading(false);
        navigate('/'); // Redirect to dashboard
      }, 1000);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#161616] items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract Background Accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gray-300/50 dark:bg-gray-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gray-400/40 dark:bg-gray-800/20 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[400px] z-10">
        <div className="text-center mb-10 space-y-4">
          <div className="flex justify-center mb-6">
             <div className="flex items-center gap-3">
               <Logo className="w-10 h-10" />
               <span className="text-2xl tracking-tight text-gray-900 dark:text-white"><span className="font-bold">panon</span><span className="font-light">suite</span></span>
             </div>
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Create Account</h2>
          <p className="text-sm font-medium text-gray-500 tracking-wide">Join the intelligent operations platform.</p>
        </div>
        
        <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2a2a2a] rounded-2xl p-8 shadow-2xl shadow-black/5 dark:shadow-black/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={cn("w-full bg-gray-50 dark:bg-[#161616] border rounded-xl py-2.5 pl-4 pr-10 text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-accent/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium", errors.name ? "border-red-500 focus:border-red-500 bg-red-50/50 dark:bg-red-900/10" : "border-gray-200 dark:border-[#2a2a2a] focus:border-accent")} 
                  placeholder="John Doe" 
                />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1 font-bold"><AlertCircle size={10} />{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn("w-full bg-gray-50 dark:bg-[#161616] border rounded-xl py-2.5 pl-4 pr-10 text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-accent/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium", errors.email ? "border-red-500 focus:border-red-500 bg-red-50/50 dark:bg-red-900/10" : "border-gray-200 dark:border-[#2a2a2a] focus:border-accent")} 
                  placeholder="name@company.com" 
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1 font-bold"><AlertCircle size={10} />{errors.email}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn("w-full bg-gray-50 dark:bg-[#161616] border rounded-xl py-2.5 pl-4 pr-10 text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-accent/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium", errors.password ? "border-red-500 focus:border-red-500 bg-red-50/50 dark:bg-red-900/10" : "border-gray-200 dark:border-[#2a2a2a] focus:border-accent")} 
                  placeholder="••••••••" 
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
              </div>
              {errors.password && <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1 font-bold"><AlertCircle size={10} />{errors.password}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold tracking-wide text-xs py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center justify-center gap-2 transition-all mt-6 disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Sign Up <ArrowRight size={14} /></>}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-500 font-medium mt-8 tracking-wide">
          Already have an account? <Link to="/signin" className="text-gray-900 dark:text-white font-bold hover:underline transition-all">Sign In</Link>
        </p>
      </div>
    </div>
  );
};
