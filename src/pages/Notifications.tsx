import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, ShieldAlert, Activity, Server, Clock, Search, Filter, CheckSquare, Trash2, Volume2, VolumeX } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui';

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
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Subtle alert sound (short beep)
    audioRef.current = new Audio('data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
  }, []);

  // Monitor for new critical alerts to play sound
  const prevUnreadCriticalCount = useRef(
    MOCK_NOTIFICATIONS.filter(n => n.type === 'critical' && !n.isRead).length
  );

  useEffect(() => {
    const currentUnreadCritical = notifications.filter(n => n.type === 'critical' && !n.isRead).length;
    if (audioEnabled && currentUnreadCritical > prevUnreadCriticalCount.current) {
      audioRef.current?.play().catch(() => {});
    }
    prevUnreadCriticalCount.current = currentUnreadCritical;
  }, [notifications, audioEnabled]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    setSelectedIds(new Set());
  };

  const markSelectedAsRead = () => {
    setNotifications(notifications.map(n => selectedIds.has(n.id) ? { ...n, isRead: true } : n));
    setSelectedIds(new Set());
  };

  const deleteSelected = () => {
    setNotifications(notifications.filter(n => !selectedIds.has(n.id)));
    setSelectedIds(new Set());
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const toggleSelection = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredNotifications.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredNotifications.map(n => n.id)));
    }
  };

  const filteredNotifications = useMemo(() => {
    let filtered = notifications.filter(n => {
      if (filter !== 'all' && n.type !== filter && n.category !== filter) return false;
      if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase()) && !n.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    // Prioritize system/hardware (System Health) alerts
    filtered.sort((a, b) => {
      const aIsHealth = a.category === 'system' || a.category === 'hardware';
      const bIsHealth = b.category === 'system' || b.category === 'hardware';
      if (aIsHealth && !bIsHealth) return -1;
      if (!aIsHealth && bIsHealth) return 1;
      return 0; // Maintain original order (implicitly by mock array order which is time-based) for rest
    });

    return filtered;
  }, [notifications, filter, searchQuery]);

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
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-[1600px] mx-auto min-h-full flex flex-col gap-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-1 flex items-center gap-3">
              <Bell className="text-accent" size={26} /> 
              Notifications & Alerts
              {unreadCount > 0 && (
                  <span className="bg-[#52C5F3]/10 text-[#52C5F3] text-xs font-black tracking-wide px-2.5 py-0.5 rounded-full border border-[#52C5F3]/20 ml-2 uppercase">
                      {unreadCount} new
                  </span>
              )}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Manage system alerts and prioritize system health and critical incidents.</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto flex-wrap justify-end">
            <Button 
              variant="outline"
              onClick={() => {
                setAudioEnabled(!audioEnabled);
                if (!audioEnabled && audioRef.current) {
                  audioRef.current.play().catch(() => {});
                }
              }}
              className={cn(
                "text-xs h-9 px-4 font-bold border-gray-200 dark:border-[#2a2a2a] transition-colors rounded-full",
                audioEnabled ? "bg-[#52C5F3]/10 text-[#52C5F3] border-[#52C5F3]/30 hover:bg-[#52C5F3]/20" : "bg-white dark:bg-[#1e1e1e] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#252525]"
              )}
            >
              {audioEnabled ? <Volume2 size={14} className="mr-1.5" /> : <VolumeX size={14} className="mr-1.5" />}
              {audioEnabled ? 'Audio Alerts: On' : 'Audio Alerts: Off'}
            </Button>
            {selectedIds.size > 0 && (
              <>
                <Button 
                  variant="outline"
                  onClick={deleteSelected}
                  className="text-xs h-9 px-4 font-bold border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors rounded-full"
                >
                  <Trash2 size={14} className="mr-1.5" />
                  Delete Selected ({selectedIds.size})
                </Button>
                <Button 
                  variant="outline"
                  onClick={markSelectedAsRead}
                  className="text-xs h-9 px-4 font-bold border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1e1e1e] hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors rounded-full text-gray-700 dark:text-gray-300"
                >
                  Mark Selected as Read ({selectedIds.size})
                </Button>
              </>
            )}
            <Button 
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className={cn(
                  "text-xs h-9 px-4 font-bold transition-colors rounded-full border flex items-center gap-2",
                  unreadCount > 0 
                    ? "bg-[#1c1c1c] text-white border-gray-700 hover:bg-[#2a2a2a]" 
                    : "bg-gray-100 dark:bg-[#1a1a1a] border-transparent text-gray-500 cursor-not-allowed"
              )}
            >
              <CheckCircle size={14} /> Mark all as read
            </Button>
          </div>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-gray-200 dark:border-[#222] pb-6">
            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto custom-scrollbar shrink-0">
                {['all', 'critical', 'warning', 'info', 'hardware', 'system'].map(f => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                            "px-4 py-1.5 text-xs font-black tracking-wide rounded-full capitalize whitespace-nowrap transition-colors border",
                            filter === f 
                              ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white shadow-sm" 
                              : "bg-white dark:bg-[#1e1e1e] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-[#222] hover:bg-gray-50 dark:hover:bg-[#252525]"
                        )}
                    >
                        {f === 'hardware' || f === 'system' ? `${f} Health` : f}
                    </button>
                ))}
            </div>
            <div className="relative flex-1 sm:max-w-xs">
               <div className="bg-white dark:bg-[#1e1e1e] px-4 py-2 rounded-full border border-gray-200 dark:border-[#222] flex items-center gap-2 focus-within:border-[#52C5F3]/50 focus-within:ring-1 focus-within:ring-[#52C5F3]/50 transition-all shadow-sm">
                  <Search className="text-gray-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search alerts or sources..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none text-xs font-medium text-gray-800 dark:text-gray-200 w-full placeholder-gray-500" 
                  />
               </div>
            </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 && (
             <div className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-500">
               <button 
                  onClick={toggleSelectAll} 
                  className={cn(
                     "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                     selectedIds.size === filteredNotifications.length ? "bg-[#52C5F3] border-[#52C5F3] text-black" : "border-gray-300 dark:border-[#444] bg-white dark:bg-[#222]"
                  )}
               >
                  {selectedIds.size === filteredNotifications.length && <CheckSquare size={12} />}
               </button>
               <span className="uppercase tracking-widest text-[10px]">Select All</span>
             </div>
          )}
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const isSelected = selectedIds.has(notification.id);
              return (
              <div 
                  key={notification.id} 
                  className={cn(
                      "flex flex-col sm:flex-row gap-4 p-5 rounded-xl border transition-all cursor-pointer group hover:shadow-md",
                      !notification.isRead ? "bg-white dark:bg-[#1e1e1e] border-gray-300 dark:border-[#444] shadow-sm" : "bg-gray-50 dark:bg-[#151515] border-gray-100 dark:border-[#222] opacity-80 hover:opacity-100",
                      isSelected ? "ring-1 ring-[#52C5F3] border-[#52C5F3]/50 bg-blue-50/10 dark:bg-blue-900/5" : ""
                  )}
                  onClick={() => markAsRead(notification.id)}
              >
                  <div className="flex items-start shrink-0 pt-1 gap-4">
                      <button 
                        onClick={(e) => toggleSelection(e, notification.id)} 
                        className={cn(
                           "w-4 h-4 mt-1 rounded border flex items-center justify-center transition-colors",
                           isSelected ? "bg-[#52C5F3] border-[#52C5F3] text-black" : "border-gray-300 dark:border-[#444] bg-white dark:bg-[#222] opacity-0 group-hover:opacity-100"
                        )}
                      >
                        {isSelected && <CheckSquare size={12} />}
                      </button>
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center border", getTypeStyles(notification.type))}>
                          {getIcon(notification.type, notification.category)}
                      </div>
                  </div>
                  <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-2">
                          <div className="flex items-center gap-3">
                             <h3 className={cn("text-sm font-black tracking-tight truncate", !notification.isRead ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400")}>
                                 {notification.title}
                             </h3>
                             {notification.category === 'system' || notification.category === 'hardware' ? (
                                <span className="text-[9px] font-black tracking-widest uppercase bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-100 dark:border-indigo-500/20">
                                   System Health
                                </span>
                             ) : null}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-gray-500 shrink-0">
                              <Clock size={12} /> {notification.timestamp}
                          </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed font-medium">{notification.message}</p>
                      <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-[#222] border border-gray-200 dark:border-[#333] text-[10px] font-bold tracking-wide text-gray-700 dark:text-gray-300">
                              {notification.category === 'security' || notification.category === 'model' ? <Activity size={12} className="text-gray-400" /> : <Server size={12} className="text-gray-400" />}
                              {notification.source}
                          </span>
                          {!notification.isRead && (
                              <span className="w-2 h-2 rounded-full bg-[#52C5F3] shadow-[0_0_8px_rgba(82,197,243,0.8)] ml-auto sm:ml-0"></span>
                          )}
                      </div>
                  </div>
              </div>
            );
          })
          ) : (
              <div className="flex flex-col items-center justify-center py-20 px-4 border border-gray-200 dark:border-[#222] rounded-xl border-dashed bg-white dark:bg-[#1e1e1e]">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-[#2a2a2a]">
                     <Bell size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-base font-black tracking-tight text-gray-900 dark:text-white mb-2">No notifications found</h3>
                  <p className="text-xs text-gray-500 font-medium max-w-sm text-center leading-relaxed">You're all caught up! No recent alerts match your filters.</p>
              </div>
          )}
        </div>
      </div>
    </main>
  );
};

