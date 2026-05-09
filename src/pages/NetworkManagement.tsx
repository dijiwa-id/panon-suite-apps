import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';
import { Activity, ShieldCheck, ChevronDown, Wifi, ArrowUp, ArrowDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const networkData = [
  { time: '08:00', upload: 2.5, download: 10.2 }, { time: '09:00', upload: 3.1, download: 12.1 }, { time: '10:00', upload: 2.8, download: 11.5 }, 
  { time: '11:00', upload: 4.2, download: 15.2 }, { time: '12:00', upload: 5.9, download: 18.9 }, { time: '13:00', upload: 4.6, download: 14.6 }, 
  { time: '14:00', upload: 3.3, download: 16.3 }, { time: '15:00', upload: 3.1, download: 15.1 }, { time: '16:00', upload: 3.6, download: 15.6 }
];

export const NetworkManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1e1e] border border-[#222] text-white text-[10px] px-2.5 py-1.5 rounded shadow-md font-bold z-50 relative">
          {label && <div className="text-gray-400 mb-0.5">{label}</div>}
          {payload.map((entry: any, index: number) => (
            <div key={index} style={{ color: entry.stroke }}>
              {entry.name}: {entry.value} Mbps
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 md:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Network Management</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Monitor infrastructure network connections for computer vision.</p>
        </div>
      </div>

       {/* Bandwidth Chart */}
       <div className="bg-white dark:bg-[#1e1e1e] p-5 rounded-[11px] border border-gray-200 dark:border-[#222] mb-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
             <div className="flex items-center gap-2">
                <Wifi size={16} className="text-gray-500" />
                <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">Bandwidth Utilization</h3>
             </div>
             <div className="flex gap-4">
                <div className="text-right">
                    <div className="text-[14px] font-black text-accent leading-none flex items-center gap-1"><ArrowUp size={14}/> 3.6 Mbps</div>
                    <div className="text-[10px] tracking-widest uppercase font-black text-gray-500 mt-1">Avg Upload</div>
                </div>
                <div className="text-right">
                    <div className="text-[14px] font-black text-secondary leading-none flex items-center gap-1"><ArrowDown size={14}/> 15.6 Mbps</div>
                    <div className="text-[10px] tracking-widest uppercase font-black text-gray-500 mt-1">Avg Download</div>
                </div>
             </div>
          </div>
          <div className="h-64 pb-2 flex-1 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <AreaChart data={networkData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUpload" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#52C5F3" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#52C5F3" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDownload" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC3292" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EC3292" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2a2a' : '#e5e7eb'} vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} />
                <Tooltip cursor={{ stroke: isDark ? '#333' : '#e5e7eb', strokeWidth: 1, strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                <Area type="monotone" name="Upload" dataKey="upload" stroke="#52C5F3" strokeWidth={2} fillOpacity={1} fill="url(#colorUpload)" activeDot={{ r: 4, strokeWidth: 0 }} animationDuration={1000} />
                <Area type="monotone" name="Download" dataKey="download" stroke="#EC3292" strokeWidth={2} fillOpacity={1} fill="url(#colorDownload)" activeDot={{ r: 4, strokeWidth: 0 }} animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Connection List */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] overflow-hidden shadow-sm">
             <div className="p-5 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a] flex items-center gap-2">
               <Activity size={16} className="text-gray-500" />
               <h3 className="text-sm font-bold text-gray-900 dark:text-white">Active Connections (Cameras)</h3>
             </div>
             <table className="w-full text-left text-xs">
               <thead className="bg-gray-50/50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#222]">
                 <tr>
                    <th className="px-5 py-3 font-black text-[10px] uppercase tracking-widest text-gray-500">Device Name</th>
                    <th className="px-5 py-3 font-black text-[10px] uppercase tracking-widest text-gray-500">IP Address</th>
                    <th className="px-5 py-3 font-black text-[10px] uppercase tracking-widest text-gray-500">Status</th>
                    <th className="px-5 py-3 font-black text-[10px] uppercase tracking-widest text-gray-500">Latency</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
                  {[
                    { name: 'Main Gate Camera', ip: '192.168.1.100', status: 'Active', latency: '2ms' },
                    { name: 'Lobby Camera', ip: '192.168.1.101', status: 'Active', latency: '3ms' },
                    { name: 'Parking Lot Camera', ip: '192.168.1.102', status: 'Inactive', latency: '-' },
                  ].map(row => (
                    <tr key={row.name} className="hover:bg-gray-50 dark:hover:bg-[#252525]/30 transition-colors">
                       <td className="px-5 py-3 font-semibold text-gray-900 dark:text-white">{row.name}</td>
                       <td className="px-5 py-3 font-mono text-gray-600 dark:text-gray-400">{row.ip}</td>
                       <td className="px-5 py-3"><span className={cn("font-medium", row.status === 'Active' ? 'text-green-400' : 'text-red-400')}>{row.status}</span></td>
                       <td className="px-5 py-3 font-mono text-gray-600 dark:text-gray-400">{row.latency}</td>
                    </tr>
                  ))}
               </tbody>
             </table>
        </div>
    </main>
  );
};
