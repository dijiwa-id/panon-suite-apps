import React from 'react';
import { cn } from '../lib/utils';
import { useAppStore } from '../store';

export const Logo = ({ className }: { className?: string }) => {
  const globalPlatformLogo = useAppStore(state => state.platformLogo);

  if (globalPlatformLogo) {
    return (
       <img src={globalPlatformLogo} alt="Logo" className={cn("w-8 h-8 object-contain", className)} />
    );
  }

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={cn("w-8 h-8 drop-shadow-sm dark:drop-shadow-none", className)} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#52C5F3" />
          <stop offset="100%" stopColor="#EC3292" />
        </linearGradient>
      </defs>
      {/* Outer Ring */}
      <path
        d="M50 15a35 35 0 1 1-28.2 55.4"
        fill="none"
        stroke="url(#logoGradient)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* Inner Pupil (Dark background) */}
      <circle cx="50" cy="50" r="18" fill="currentColor" className="text-gray-800 dark:text-gray-950" />
      {/* Pupil Detail */}
      <circle cx="50" cy="50" r="8" fill="url(#logoGradient)" className="animate-pulse" style={{ animationDuration: '3s' }} />
    </svg>
  );
};
