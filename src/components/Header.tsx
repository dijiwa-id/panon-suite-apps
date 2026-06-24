import React, { useState, useEffect } from 'react';
import { Search, Bell, Monitor, LogOut, KeySquare, Sun, Moon, User, Activity } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { Input } from './ui';
import { toast } from 'sonner';
import { CommandPalette } from './CommandPalette';
import { ActivitySidebar } from './ActivitySidebar';

export const Header = () => {
  const theme = useAppStore(state => state.theme);
  const toggleTheme = useAppStore(state => state.toggleTheme);
  const logout = useAppStore(state => state.logout);
  
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <>
      <header className="h-[55px] flex items-center justify-end px-[30px] bg-white/80 dark:bg-[#161616]/80 backdrop-blur-md border-b border-gray-200/50 dark:border-[#2a2a2a]/50 transition-colors shrink-0 z-50">
        <div className="flex items-center gap-4">
          <div className="relative group w-64" onClick={() => setIsCommandOpen(true)}>
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <div className="pl-8 pr-8 rounded-xl bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] h-9 w-full flex items-center cursor-text transition-colors hover:bg-gray-200/50 dark:hover:bg-[#222]/50">
              <span className="text-xs text-gray-400">Search command...</span>
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 opacity-50 pointer-events-none flex items-center gap-1 bg-white dark:bg-[#2a2a2a] px-1.5 py-0.5 rounded shadow-sm border border-gray-200 dark:border-[#333]">
               <span className="text-[9px] font-bold">⌘K</span>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-2 border-r border-gray-200/50 dark:border-[#2a2a2a]/50 pr-4">
             <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all relative">
               {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
             </button>
             <button onClick={() => navigate('/notifications')} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all relative">
               <Bell size={18} />
             </button>
             <button onClick={() => setIsActivityOpen(true)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all relative">
               <Activity size={18} />
             </button>
             <button onClick={() => navigate('/system-admin/system-monitoring')} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all relative">
               <Monitor size={18} />
               <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full border border-white dark:border-[#18181b]"></span>
             </button>
             <button onClick={() => navigate('/user-settings')} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all">
               <User size={18} />
             </button>
          </div>

          <button onClick={handleLogout} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all text-xs font-medium pl-2">
            <LogOut size={16} />
            <span className="hidden xl:inline">Log Out</span>
          </button>
        </div>
      </header>

      <CommandPalette 
        isOpen={isCommandOpen} 
        onClose={() => setIsCommandOpen(false)} 
      />

      <ActivitySidebar 
        isOpen={isActivityOpen} 
        onClose={() => setIsActivityOpen(false)} 
      />
    </>
  );
};


