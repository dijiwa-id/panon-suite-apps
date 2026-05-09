import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  wrapperClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, wrapperClassName, children, ...props }, ref) => {
    return (
      <div className={cn("relative inline-block w-full", wrapperClassName)}>
        <select
          ref={ref}
          className={cn(
            "w-full appearance-none bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a]",
            "text-gray-900 dark:text-white text-[11px] font-bold px-3 py-2 pr-8 rounded-[8px]",
            "outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50",
            "cursor-pointer transition-colors shadow-sm",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
          <ChevronDown size={14} />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
