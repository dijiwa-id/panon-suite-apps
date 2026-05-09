import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  checked?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
  align?: 'left' | 'right';
  className?: string;
  width?: string;
}

export const Dropdown = ({ trigger, items, onSelect, align = 'left', className, width = 'w-48' }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative inline-block", className)} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-1.5 rounded-xl border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#161616] p-1 shadow-lg",
            "animate-in fade-in zoom-in-95 duration-100",
            align === 'right' ? 'right-0' : 'left-0',
            width
          )}
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-[8px] px-2 py-1.5 text-left text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#222] hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {item.checked && <Check size={12} className="text-accent absolute left-2" />}
              <span className={cn("flex-1", item.checked ? "pl-5" : "pl-1")}>{item.label}</span>
              {item.icon && <span className="text-gray-400">{item.icon}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
