import React, { useState } from 'react';
import { Search, Bell, Monitor, LogOut, KeySquare, Sun, Moon, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Basic logout logic
    navigate('/signin');
  };

  return (
    <header className="h-[55px] flex items-center justify-end px-[30px] bg-white/80 dark:bg-[#161616]/80 backdrop-blur-md border-b border-gray-200/50 dark:border-[#2a2a2a]/50 transition-colors shrink-0 z-50">
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 dark:bg-[#151515] px-3 py-1.5 rounded-xl border border-gray-200 dark:border-[#222] flex items-center gap-2 w-64 focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all">
          <Search size={14} className="text-gray-500 shrink-0" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-xs font-medium text-gray-800 dark:text-gray-200 w-full placeholder-gray-600"
          />
          <div className="text-gray-500 opacity-50 shrink-0 ml-auto">
            <KeySquare size={14} />
          </div>
        </div>

        <div className="flex items-center gap-4">
           <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all relative">
             {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
           </button>
           <button onClick={() => console.log('Bell clicked')} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all relative">
             <Bell size={18} />
           </button>
           <button onClick={() => console.log('Monitor clicked')} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all relative">
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
