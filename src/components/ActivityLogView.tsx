import React from 'react';
import { Activity, Info, CheckCircle2, AlertTriangle, AlertCircle, Clock } from 'lucide-react';
import { useActivityStore } from '../store/activityStore';
import { Card, CardHeader, CardTitle, CardContent } from './ui';

export const ActivityLogView = () => {
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
    <Card className="h-full flex flex-col pt-4 overflow-hidden border-gray-100 dark:border-[#222] bg-[#1e1e1e]/5 dark:bg-[#1e1e1e] rounded-[11px] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between px-6 pb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent" />
          <CardTitle className="text-sm font-black tracking-tight">Recent Activity</CardTitle>
        </div>
        {logs.length > 0 && (
          <button 
            onClick={clearLogs}
            className="text-[10px] uppercase font-bold tracking-widest text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
          >
            Clear All
          </button>
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto px-6 py-2 pb-6 space-y-4">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400 dark:text-gray-500">
            <Clock className="w-8 h-8 mb-2 opacity-20" />
            <p className="text-xs">No recent activity.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-3 items-start">
                <div className="mt-0.5 p-1.5 bg-white dark:bg-[#252525] rounded-full border border-gray-100 dark:border-[#333]">
                  {getIcon(log.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                      {log.action}
                    </p>
                    <span className="text-[10px] text-gray-500 whitespace-nowrap">
                      {formatTime(log.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
                    {log.description}
                  </p>
                  <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">
                    {log.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
