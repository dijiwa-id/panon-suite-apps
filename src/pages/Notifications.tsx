import React, { useState } from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, ShieldAlert, Activity, Server, Clock, Search, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

type NotificationType = 'critical' | 'warning' | 'info' | 'success';
type NotificationCategory = 'system' | 'security' | 'model' | 'hardware';

interface Notification {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  source: string;
  isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'critical',
    category: 'security',
    title: 'Perimeter Intrusion Detected',
    message: 'Unauthorized person detected near the North Fence sector.',
    timestamp: '2 mins ago',
    source: 'Cam-04 (Perimeter North)',
    isRead: false,
  },
  {
    id: '2',
    type: 'warning',
    category: 'hardware',
    title: 'High GPU Utilization',
    message: 'Edge Node Alpha is running at 98% GPU utilization for the last 15 minutes.',
    timestamp: '15 mins ago',
    source: 'Edge Node Alpha',
    isRead: false,
  },
  {
    id: '3',
    type: 'info',
    category: 'model',
    title: 'Model Training Completed',
    message: 'YOLOv8-Custom-Gate-v2 training finished with mAP@50 of 0.92.',
    timestamp: '1 hour ago',
    source: 'Training Server 01',
    isRead: true,
  },
  {
    id: '4',
    type: 'success',
    category: 'system',
    title: 'Application Deployed',
    message: 'Lobby Face Auth Pipeline successfully deployed and active.',
    timestamp: '3 hours ago',
    source: 'Deployment Manager',
    isRead: true,
  },
  {
    id: '5',
    type: 'critical',
    category: 'hardware',
    title: 'Camera Connection Lost',
    message: 'Video feed from Warehouse East camera disconnected unexpectedly.',
    timestamp: '5 hours ago',
    source: 'Cam-12 (Warehouse East)',
    isRead: true,
  },
  {
    id: '6',
    type: 'warning',
    category: 'security',
    title: 'Tailgating Alert',
    message: 'Possible tailgating incident detected at Main Lobby turnstile.',
    timestamp: '1 day ago',
    source: 'Cam-02 (Lobby Entrance)',
    isRead: true,
  }
];

export const Notifications = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter !== 'all' && n.type !== filter && n.category !== filter) return false;
    if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase()) && !n.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getIcon = (type: NotificationType, category: NotificationCategory) => {
    if (category === 'security') return <ShieldAlert size={16} className="text-red-500" />;
    if (category === 'hardware') return <Server size={16} className="text-orange-500" />;
    if (type === 'critical') return <AlertTriangle size={16} className="text-red-500" />;
    if (type === 'warning') return <AlertTriangle size={16} className="text-yellow-500" />;
    if (type === 'success') return <CheckCircle size={16} className="text-green-500" />;
    return <Info size={16} className="text-blue-500" />;
  };

  const getTypeStyles = (type: NotificationType) => {
    switch (type) {
      case 'critical': return 'bg-red-500/10 border-red-500/20';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'success': return 'bg-green-500/10 border-green-500/20';
      case 'info': return 'bg-blue-500/10 border-blue-500/20';
      default: return 'bg-gray-50/50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#222]';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#161616] p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1 flex items-center gap-2">
            <Bell className="text-accent" size={24} /> 
            Notifications & Alerts
            {unreadCount > 0 && (
                <span className="bg-secondary/20 text-secondary text-xs font-bold px-2.5 py-0.5 rounded-full border border-secondary/30 ml-2">
                    {unreadCount} new
                </span>
            )}
          </h1>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Manage system alerts and computer vision event notifications</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className={cn(
                "flex justify-center items-center gap-2 h-8 rounded-full text-xs font-bold px-5 transition-colors border",
                unreadCount > 0 
                  ? "bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-[#222] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#252525] hover:border-gray-500" 
                  : "bg-gray-50/50 dark:bg-[#1a1a1a] border-transparent text-gray-600 cursor-not-allowed"
            )}
          >
            <CheckCircle size={14} /> Mark all as read
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] p-1 rounded-xl w-full sm:w-auto overflow-x-auto custom-scrollbar shrink-0">
              {['all', 'critical', 'warning', 'security', 'hardware'].map(f => (
                  <button 
                      key={f}
                      onClick={() => setFilter(f)}
                      className={cn(
                          "px-4 py-1.5 text-xs font-bold rounded-lg capitalize whitespace-nowrap transition-colors",
                          filter === f ? "bg-accent text-black shadow-md" : "text-gray-600 dark:text-gray-400 hover:text-white"
                      )}
                  >
                      {f}
                  </button>
              ))}
          </div>
          <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                  type="text" 
                  placeholder="Search alerts or sources..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
          </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div 
                key={notification.id} 
                className={cn(
                    "flex flex-col sm:flex-row gap-4 p-4 rounded-[11px] border transition-all cursor-pointer",
                    !notification.isRead ? "bg-white dark:bg-[#1e1e1e] border-gray-600/50 shadow-lg" : "bg-gray-100 dark:bg-[#151515] border-gray-200 dark:border-[#222] opacity-75 hover:opacity-100"
                )}
                onClick={() => markAsRead(notification.id)}
            >
                <div className="flex shrink-0">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center border", getTypeStyles(notification.type))}>
                        {getIcon(notification.type, notification.category)}
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-1">
                        <h3 className={cn("text-sm font-bold truncate", !notification.isRead ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300")}>
                            {notification.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-500 shrink-0">
                            <Clock size={12} /> {notification.timestamp}
                        </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2.5 leading-relaxed">{notification.message}</p>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-[#222] text-[10px] font-bold text-gray-700 dark:text-gray-400">
                            {notification.category === 'security' || notification.category === 'model' ? <Activity size={10} /> : <Server size={10} />}
                            {notification.source}
                        </span>
                        {!notification.isRead && (
                            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(82,197,243,0.8)] ml-auto sm:ml-2"></span>
                        )}
                    </div>
                </div>
            </div>
          ))
        ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 border border-gray-200 dark:border-[#222] rounded-xl border-dashed bg-gray-50/50 dark:bg-[#1a1a1a]/50">
                <Bell size={48} className="text-gray-600 mb-4" />
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">No notifications found</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">You're all caught up! No recent alerts mach your filters.</p>
            </div>
        )}
      </div>
    </main>
  );
};
