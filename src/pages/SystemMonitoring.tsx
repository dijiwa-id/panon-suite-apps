import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';
import { HardDrive, Activity, Monitor, Network, ShieldCheck, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const memoryData = [
  { time: '08:00', value: 78.4 }, { time: '09:00', value: 82.1 }, { time: '10:00', value: 80.5 }, 
  { time: '11:00', value: 85.2 }, { time: '12:00', value: 88.9 }, { time: '13:00', value: 84.6 }, 
  { time: '14:00', value: 86.3 }, { time: '15:00', value: 85.1 }, { time: '16:00', value: 85.6 }
];

const diskData = [
  { time: '08:00', value: 12.5 }, { time: '09:00', value: 13.2 }, { time: '10:00', value: 13.8 }, 
  { time: '11:00', value: 14.5 }, { time: '12:00', value: 15.1 }, { time: '13:00', value: 15.9 }, 
  { time: '14:00', value: 16.5 }, { time: '15:00', value: 17.0 }, { time: '16:00', value: 17.1 }
];

const ProgressBar = ({ label, value, max, colorClass }: { label: string, value: number, max: number, colorClass: string }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-[11px] font-semibold text-gray-600 dark:text-gray-400">
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
      <span>{value}% <span className="text-gray-500 font-medium">({(value * max / 100).toFixed(1)} / {max})</span></span>
    </div>
    <div className="w-full h-1.5 bg-gray-100 dark:bg-[#151515] rounded-full overflow-hidden border border-gray-200 dark:border-[#222]">
      <div className={cn("h-full rounded-full transition-all duration-500", colorClass)} style={{ width: `${value}%` }} />
    </div>
  </div>
);

export const SystemMonitoring = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const entry = payload[0];
      return (
        <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] text-gray-900 dark:text-white text-[11px] px-3 py-2 rounded shadow-lg font-bold z-50 relative flex flex-col gap-1 items-start min-w-[120px]">
          {label && <div className="text-gray-500 font-medium">{label}</div>}
          <div className="flex items-center gap-2" style={{ color: entry.payload?.fill || entry.color || '#fff' }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span>{entry.name}: <span className="font-black">{entry.value}%</span></span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 md:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">System Monitoring</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Real-time performance and resource utilization.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
             <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <ChevronDown size={14} />
             </div>
             <select className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] font-semibold text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer appearance-none">
                <option>Analytic Workstation</option>
             </select>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="card-glass p-5 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-gray-200 dark:border-[#222] gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] flex items-center justify-center">
              <Monitor className="text-accent" size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">Analytic Workstation</h2>
              <p className="text-[11px] text-gray-500 font-medium">Uptime: 20 days 15:25:18</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-green-400">Online</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <ProgressBar label="CPU Usage" value={31.67} max={100} colorClass="bg-accent" />
          <ProgressBar label="RAM Usage" value={85.67} max={100} colorClass="bg-secondary" />
          <ProgressBar label="GPU Usage" value={75} max={100} colorClass="bg-[#52C5F3]" />
          <ProgressBar label="FPS Usage" value={0.27} max={100} colorClass="bg-accent" />
          <ProgressBar label="NPU Usage" value={14.98} max={100} colorClass="bg-accent" />
          <ProgressBar label="HD Space" value={17.17} max={100} colorClass="bg-accent" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-gray-200 dark:border-[#222]">
           <div>
             <div className="text-[10px] font-black tracking-widest uppercase text-gray-500 mb-1">Processor</div>
             <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Intel Core Ultra 5</div>
           </div>
           <div>
             <div className="text-[10px] font-black tracking-widest uppercase text-gray-500 mb-1">Graphics</div>
             <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Intel Graphics GPU</div>
           </div>
           <div>
             <div className="text-[10px] font-black tracking-widest uppercase text-gray-500 mb-1">NPU</div>
             <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Intel AI Boost</div>
           </div>
           <div>
             <div className="text-[10px] font-black tracking-widest uppercase text-gray-500 mb-1">Memory</div>
             <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">32GB RAM</div>
           </div>
           <div>
             <div className="text-[10px] font-black tracking-widest uppercase text-gray-500 mb-1">Storage</div>
             <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">1TB NVMe SSD</div>
           </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Memory Usage Card */}
        <div className="card-glass p-6 flex flex-col group hover:border-[#52C5F3]/50 transition-colors">
          <div className="flex justify-between items-start mb-6">
             <div className="flex items-center gap-2 text-gray-500 group-hover:text-[#52C5F3] transition-colors">
                <Activity size={16} />
                <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">Memory Usage Trends</h3>
             </div>
             <div className="text-right">
                <div className="text-[24px] font-black text-[#52C5F3] leading-none tracking-tight drop-shadow-sm">{(memoryData[memoryData.length - 1].value * 32 / 100).toFixed(1)} <span className="text-[14px]">GB</span></div>
                <div className="text-[10px] tracking-widest uppercase font-black text-gray-500 mt-1">/ 32.0 GB Total</div>
             </div>
          </div>
          <div className="h-48 pb-2 flex-1 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <LineChart data={memoryData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <filter id="shadowMemory" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#52C5F3" floodOpacity="0.4"/>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2a2a' : '#e5e7eb'} vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} />
                <Tooltip cursor={{ stroke: isDark ? '#333' : '#cecece', strokeWidth: 1, strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                <Line type="monotone" name="Memory Usage" dataKey="value" stroke="#52C5F3" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0, fill: "#52C5F3" }} style={{ filter: 'url(#shadowMemory)' }} animationDuration={1000} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disk Usage Card */}
        <div className="card-glass p-6 flex flex-col group hover:border-[#EC3292]/50 transition-colors">
          <div className="flex justify-between items-start mb-6">
             <div className="flex items-center gap-2 text-gray-500 group-hover:text-[#EC3292] transition-colors">
                <HardDrive size={16} />
                <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">Disk Space Trends</h3>
             </div>
             <div className="text-right">
                <div className="text-[24px] font-black text-[#EC3292] leading-none tracking-tight drop-shadow-sm">{diskData[diskData.length - 1].value.toFixed(1)}<span className="text-[14px]">%</span></div>
                <div className="text-[10px] tracking-widest uppercase font-black text-gray-500 mt-1">Status: Normal</div>
             </div>
          </div>
          <div className="h-48 pb-2 flex-1 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <LineChart data={diskData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <filter id="shadowDisk" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#EC3292" floodOpacity="0.4"/>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2a2a' : '#e5e7eb'} vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} />
                <Tooltip cursor={{ stroke: isDark ? '#333' : '#cecece', strokeWidth: 1, strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                <Line type="monotone" name="Disk Usage" dataKey="value" stroke="#EC3292" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0, fill: "#EC3292" }} style={{ filter: 'url(#shadowDisk)' }} animationDuration={1000} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          { title: 'Channel Information', icon: <Network size={16} className="text-gray-500" />, items: [
            { label: 'IP Address', value: '192.168.1.105' },
            { label: 'Subnet Mask', value: '255.255.255.0' },
            { label: 'Gateway', value: '192.168.1.1' },
            { label: 'DNS Server', value: '8.8.8.8, 8.8.4.4' },
            { label: 'MAC Address', value: '00:1B:44:11:3A:B7' },
          ]},
          { title: 'Service Status', icon: <ShieldCheck size={16} className="text-gray-500" />, items: [
            { label: 'Analytic Engine', value: <span className="text-green-400 font-semibold text-xs">Running</span> },
            { label: 'Stream Server', value: <span className="text-green-400 font-semibold text-xs">Running</span> },
            { label: 'Database', value: <span className="text-green-400 font-semibold text-xs">Running</span> },
            { label: 'Cloud Sync', value: <span className="text-orange-400 font-semibold text-xs">Syncing</span> },
            { label: 'API Gateway', value: <span className="text-green-400 font-semibold text-xs">Running</span> },
          ]}
        ].map(table => (
          <div key={table.title} className="card-glass overflow-hidden">
             <div className="p-5 border-b border-gray-200/80 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a] flex items-center gap-2">
               {table.icon}
               <h3 className="text-sm font-bold text-gray-900 dark:text-white">{table.title}</h3>
             </div>
             <table className="w-full text-left text-xs">
               <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
                  {table.items.map(row => (
                    <tr key={row.label} className="hover:bg-white/5 hover:bg-gray-50 transition-colors group">
                       <td className="px-5 py-3 text-gray-500 font-black w-1/3 text-[10px] uppercase tracking-widest">{row.label}</td>
                       <td className="px-5 py-3 text-gray-700 dark:text-gray-300 font-medium font-mono text-xs">{row.value}</td>
                    </tr>
                  ))}
               </tbody>
             </table>
          </div>
        ))}
      </div>
    </main>
  );
};
