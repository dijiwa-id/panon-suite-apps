import React from 'react';
import { cn } from '../lib/utils';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 100 100" className={cn("w-8 h-8", className)} xmlns="http://www.w3.org/2000/svg">
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
      <circle cx="50" cy="50" r="18" fill="currentColor" className="text-gray-900 dark:text-[#161616]" />
      {/* Pupil Detail */}
      <circle cx="50" cy="50" r="8" fill="url(#logoGradient)" />
    </svg>
  );
};
