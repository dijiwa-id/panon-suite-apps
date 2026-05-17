import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, LayoutDashboard, Monitor, Settings, Users, Video } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const items = [
    { id: '1', title: 'Dashboard', icon: <LayoutDashboard size={14} />, action: () => navigate('/dashboard') },
    { id: '2', title: 'System Monitoring', icon: <Monitor size={14} />, action: () => navigate('/system-admin/system-monitoring') },
    { id: '3', title: 'User Settings', icon: <Settings size={14} />, action: () => navigate('/user-settings') },
    { id: '4', title: 'Manage Users', icon: <Users size={14} />, action: () => navigate('/system-admin/users') },
    { id: '5', title: 'Live Feed Camera', icon: <Video size={14} />, action: () => navigate('/deploy/live-feed-camera') },
  ];

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-[#333] transform transition-all duration-200 animate-in fade-in zoom-in-95">
        <div className="flex items-center px-4 py-4 border-b border-gray-100 dark:border-[#2a2a2a]">
          <Search size={18} className="text-gray-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
              if (e.key === 'Enter' && filteredItems.length > 0) {
                 filteredItems[0].action();
                 onClose();
              }
            }}
          />
          <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 dark:bg-[#111] rounded text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-3 shrink-0">
            <Command size={10} />
            <span>ESC to close</span>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500 font-medium">
              No results found for "{query}"
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 md:px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Suggestions
              </div>
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 md:px-4 py-3 hover:bg-gray-100 dark:hover:bg-[#252525] rounded-xl text-left transition-colors text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  <div className="w-6 h-6 rounded-md bg-gray-200 dark:bg-[#333] flex items-center justify-center text-gray-500 shrink-0">
                    {item.icon}
                  </div>
                  {item.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
