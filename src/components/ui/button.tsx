import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'outline' | 'ghost' | 'danger';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-bold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#161616] focus-visible:ring-[#52C5F3] disabled:opacity-50 disabled:pointer-events-none h-10 px-8 py-2 hover:shadow-md active:scale-[0.98]",
          {
            "bg-[#1c1c1c] border border-gray-700 text-white hover:bg-[#2a2a2a]": variant === 'default',
            "bg-[#52C5F3] hover:bg-[#3baee0] text-gray-900 border border-transparent shadow-sm": variant === 'primary',
            "border border-gray-200 dark:border-[#222] bg-transparent hover:bg-gray-100 dark:hover:bg-[#252525] text-gray-900 dark:text-gray-100": variant === 'outline',
            "hover:bg-gray-100 dark:hover:bg-[#252525] hover:text-gray-900 dark:hover:text-gray-100 text-gray-600 dark:text-gray-400 bg-transparent": variant === 'ghost',
            "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20": variant === 'danger'
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
