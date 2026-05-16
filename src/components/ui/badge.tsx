import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline' | 'ghost' | 'secondary';
  dot?: boolean;
}

export function IconBadge({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] flex items-center justify-center text-accent", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function Badge({ className, variant = 'default', dot, children, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors",
        {
          "bg-gray-100 dark:bg-[#222] text-gray-800 dark:text-gray-200 border border-transparent": variant === 'default',
          "bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 rounded px-1.5 tracking-normal": variant === 'secondary',
          "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/30": variant === 'success',
          "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/30": variant === 'warning',
          "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/30": variant === 'danger',
          "border border-gray-200 dark:border-[#222] text-gray-900 dark:text-gray-100 bg-transparent": variant === 'outline',
          "bg-transparent text-gray-600 dark:text-gray-400 border border-transparent hover:bg-gray-100 dark:hover:bg-[#252525]": variant === 'ghost',
        },
        className
      )}
      {...props}
    >
      {dot && (
        <div className={cn("w-1.5 h-1.5 rounded-full", {
          "bg-green-500 animate-pulse": variant === 'success',
          "bg-yellow-500 animate-pulse": variant === 'warning',
          "bg-red-500": variant === 'danger',
          "bg-gray-500": variant !== 'success' && variant !== 'warning' && variant !== 'danger'
        })} />
      )}
      {children}
    </div>
  )
}

export { Badge }
