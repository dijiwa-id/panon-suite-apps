import React, { useState } from 'react';
import { Search, Bell, Monitor, LogOut, KeySquare, Sun, Moon, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Input } from './ui';
import { toast } from 'sonner';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Basic logout logic
    navigate('/signin');
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery) {
      toast.info(`Searching for "${searchQuery}"...`);
      setSearchQuery('');
    }
  };

  return (
    <header className="h-[55px] flex items-center justify-end px-[30px] bg-white/80 dark:bg-[#161616]/80 backdrop-blur-md border-b border-gray-200/50 dark:border-[#2a2a2a]/50 transition-colors shrink-0 z-50">
      <div className="flex items-center gap-4">
        <div className="relative group w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          <Input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="pl-8 pr-8 rounded-xl bg-gray-100 border-gray-200 dark:bg-[#151515] dark:border-[#222]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 opacity-50 pointer-events-none">
            <KeySquare size={14} />
          </div>
        </div>

        <div className="flex items-center gap-4">
           <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all relative">
             {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
           </button>
           <button onClick={() => toast.info('No new notifications')} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all relative">
             <Bell size={18} />
           </button>
           <button onClick={() => navigate('/system-monitoring')} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all relative">
             <Monitor size={18} />
             <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full border border-white dark:border-[#18181b]"></span>
           </button>
           <button onClick={() => navigate('/user-settings')} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all">
             <User size={18} />
           </button>
        </div>

        <div className="h-4 w-[1px] bg-gray-200 dark:bg-white/[0.1]"></div>

        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all text-xs font-medium">
          <LogOut size={16} />
          <span className="hidden xl:inline">Log Out</span>
        </button>
      </div>
    </header>
  );
};


