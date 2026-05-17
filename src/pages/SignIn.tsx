import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, Sparkles, Lock, Mail } from 'lucide-react';
import { Logo } from '../components/Logo';
import { useAppStore } from '../store';
import { Input } from '../components/ui';

export const SignIn = () => {
  const globalPlatformName = useAppStore(state => state.platformName);
  const adminCredentials = useAppStore(state => state.adminCredentials);
  const updateAdminCredentials = useAppStore(state => state.updateAdminCredentials);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSetupRequired, setIsSetupRequired] = useState(false);
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAppStore(state => state.login);
  const isAuthenticated = useAppStore(state => state.isAuthenticated);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Check credentials against the store
    if (email === adminCredentials.email && password === adminCredentials.pass) {
      if (adminCredentials.isFirstLogin) {
        // If it's their first login, require them to set a new password
        setIsSetupRequired(true);
      } else {
        performLogin();
      }
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSetupPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Update credentials and log in
    setIsLoading(true);
    setTimeout(() => {
      updateAdminCredentials(newPassword);
      performLogin();
    }, 800);
  };

  const performLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Dispatch to global store
      login({
        id: 'user-1',
        name: 'System Admin',
        email: adminCredentials.email,
        role: 'SysAdmin',
        organization: 'Panon'
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
               <span className="text-2xl tracking-tight text-gray-900 dark:text-white font-bold">{globalPlatformName}</span>
             </div>
          </div>
          <h2 className="text-[18px] font-black text-gray-900 dark:text-white tracking-tight">System Authentication</h2>
          <p className="text-sm font-medium text-gray-500 tracking-wide">Enter your credentials to access the platform.</p>
        </div>
        
        <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2a2a2a] rounded-2xl p-8 shadow-2xl shadow-black/5 dark:shadow-black/20 flex flex-col items-center">
          
          <div className="w-12 h-12 bg-gray-50 dark:bg-[#252525] rounded-full flex items-center justify-center mb-6 border border-gray-200 dark:border-[#333]">
            <Lock className="text-[#52C5F3]" size={20} />
          </div>
          
          {isSetupRequired ? (
            <div className="w-full">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 text-center">Set Your Password</h3>
              <p className="text-[11px] text-gray-500 font-medium text-center mb-6">
                For security reasons, please change your default password before continuing.
              </p>
              
              <form onSubmit={handleSetupPassword} className="w-full space-y-5">
                {error && (
                  <div className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg text-center font-bold">
                    {error}
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 ml-1">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <Input 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-9 h-10"
                        required
                        minLength={8}
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 ml-1">Must be at least 8 characters.</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 ml-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <Input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-9 h-10"
                        required
                        minLength={8}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="w-full bg-accent text-white font-bold tracking-wide text-xs py-3.5 rounded-xl hover:bg-opacity-90 flex items-center justify-center gap-2 transition-all mt-6 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-accent/20">
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Complete Setup <ArrowRight size={14} /></>}
                </button>
              </form>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="w-full space-y-5">
              {error && (
                <div className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg text-center font-bold">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <Input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@panonsuite.com"
                      className="pl-9 h-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <Input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-9 h-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold tracking-wide text-xs py-3.5 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center justify-center gap-2 transition-all mt-6 disabled:opacity-70 disabled:cursor-not-allowed">
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Sign In <ArrowRight size={14} /></>}
              </button>
            </form>
          )}
          
        </div>

        <p className="text-center text-[10px] text-gray-400 dark:text-gray-600 font-bold mt-8 tracking-widest uppercase">
          {globalPlatformName} Environment
        </p>
      </div>
    </div>
  );
};
