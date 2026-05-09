import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { Logo } from '../components/Logo';
import { useAppStore } from '../store';

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAppStore(state => state.login);
  const isAuthenticated = useAppStore(state => state.isAuthenticated);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate short loading for smooth transition
    setTimeout(() => {
      setIsLoading(false);
      // Dispatch to global store
      login({
        id: 'user-1',
        name: 'System Admin',
        email: 'admin@panonsuite.com',
        role: 'admin'
      });
      navigate('/'); // Redirect to dashboard
    }, 800);
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
          <h2 className="text-[18px] font-black text-gray-900 dark:text-white tracking-tight">Welcome to the Workspace</h2>
          <p className="text-sm font-medium text-gray-500 tracking-wide">Experience the full platform without needing an account.</p>
        </div>
        
        <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2a2a2a] rounded-2xl p-8 shadow-2xl shadow-black/5 dark:shadow-black/20 flex flex-col items-center">
          
          <div className="w-12 h-12 bg-gray-50 dark:bg-[#252525] rounded-full flex items-center justify-center mb-6 border border-gray-200 dark:border-[#333]">
            <Sparkles className="text-[#52C5F3]" size={20} />
          </div>
          
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 text-center">Interactive Demo</h3>
          <p className="text-xs text-gray-500 text-center mb-8 font-medium">
            Jump straight into the dashboard to explore the visual intelligence and AI management features.
          </p>

          <form onSubmit={handleQuickLogin} className="w-full">
            <button type="submit" disabled={isLoading} className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold tracking-wide text-xs py-3.5 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Access Dashboard <ArrowRight size={14} /></>}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-gray-400 dark:text-gray-600 font-bold mt-8 tracking-widest uppercase">
          Enterprise AI Agent Platform
        </p>
      </div>
    </div>
  );
};
