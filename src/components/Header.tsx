import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Monitor, LogOut, ChevronDown, KeySquare, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-[60px] flex items-center justify-end px-[30px] bg-white dark:bg-[#161616] border-b border-gray-200 dark:border-transparent transition-colors shrink-0 z-50">
      <div className="flex items-center gap-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="input-field w-64 pr-10"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
             <KeySquare size={14} className="opacity-50" />
          </button>
        </div>

        <div className="flex items-center gap-4">
           <button onClick={toggleTheme} className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all relative">
             {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
           </button>
           <button className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all relative">
             <Bell size={18} />
           </button>
           <button className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all relative">
             <Monitor size={18} />
             <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full border border-white dark:border-[#18181b]"></span>
           </button>
           <button className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all">
             <ChevronDown size={16} />
           </button>
        </div>

        <div className="h-4 w-[1px] bg-gray-200 dark:bg-white/[0.1]"></div>

        <Link to="/signin" className="flex items-center gap-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all text-xs font-medium">
          <LogOut size={16} />
          <span className="hidden xl:inline">Log Out</span>
        </Link>
      </div>
    </header>
  );
};
