import React from 'react';
import { Activity, X, Info, CheckCircle2, AlertTriangle, AlertCircle, Clock } from 'lucide-react';
import { useActivityStore } from '../store/activityStore';
import { cn } from '../lib/utils';
import { AnimatePresence, motion } from 'motion/react';

interface ActivitySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ActivitySidebar: React.FC<ActivitySidebarProps> = ({ isOpen, onClose }) => {
  const { logs, clearLogs } = useActivityStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-sm bg-white dark:bg-[#161616] border-l border-gray-200 dark:border-[#2a2a2a] shadow-2xl z-[101] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-[#222]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h2 className="text-sm font-black tracking-tight text-gray-900 dark:text-white">Activity Log</h2>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium mt-0.5">System & User Actions</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#222] text-gray-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
              <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400">
                {logs.length} {logs.length === 1 ? 'Event' : 'Events'} Logged
              </span>
              {logs.length > 0 && (
                <button 
                  onClick={clearLogs}
                  className="text-[10px] uppercase font-bold tracking-widest text-red-500 hover:text-red-600 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
              {logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
                  <Clock className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-xs font-medium">No recent activity.</p>
                  <p className="text-[10px] mt-1 opacity-60">System actions will appear here.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {logs.map((log) => (
                    <div key={log.id} className="relative pl-6">
                      <div className="absolute left-0 top-1 bottom-[-24px] w-[2px] bg-gray-100 dark:bg-[#222] last:bottom-0"></div>
                      <div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full border-2 border-white dark:border-[#161616] bg-gray-200 dark:bg-[#333] z-10 flex items-center justify-center">
                         <div className={cn(
                           "w-1.5 h-1.5 rounded-full",
                           log.type === 'success' ? 'bg-green-500' :
                           log.type === 'error' ? 'bg-red-500' :
                           log.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                         )} />
                      </div>
                      
                      <div className="bg-white dark:bg-[#1c1c1c] border border-gray-100 dark:border-[#2a2a2a] rounded-[11px] p-4 shadow-sm hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                           {getIcon(log.type)}
                           <h4 className="text-xs font-bold text-gray-900 dark:text-white">{log.action}</h4>
                        </div>
                        <p className="text-[11px] text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                          {log.description}
                        </p>
                        <div className="flex items-center justify-between border-t border-gray-100 dark:border-[#2a2a2a] pt-3 mt-3">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{log.user || 'System'}</span>
                          <span className="text-[10px] text-gray-400">{formatTime(log.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
