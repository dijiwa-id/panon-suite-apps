import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Camera, Video, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const inferenceData = [
  { time: '08:00', detections: 120, latency: 45 },
  { time: '09:00', detections: 240, latency: 50 },
  { time: '10:00', detections: 180, latency: 48 },
  { time: '11:00', detections: 320, latency: 55 },
  { time: '12:00', detections: 290, latency: 52 },
  { time: '13:00', detections: 410, latency: 60 },
  { time: '14:00', detections: 350, latency: 54 },
];

const statusData = [
  { time: '08:00', active: 60, standby: 30, offline: 10 },
  { time: '09:00', active: 62, standby: 28, offline: 10 },
  { time: '10:00', active: 65, standby: 25, offline: 10 },
  { time: '11:00', active: 70, standby: 20, offline: 10 },
  { time: '12:00', active: 75, standby: 15, offline: 10 },
  { time: '13:00', active: 80, standby: 10, offline: 10 },
  { time: '14:00', active: 85, standby: 5, offline: 10 },
];

const DATA_COLOR = '#52C5F3'; // Panon Suite Primary
const SECONDARY_COLOR = '#EC3292'; // Panon Suite Secondary
const TERTIARY_COLOR = '#4a4a4a';

export const SystemAdminDashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1e1e] border border-[#222] text-white text-[10px] px-2.5 py-1.5 rounded shadow-md font-bold">
          {label && <div className="text-gray-400 mb-0.5">{label}</div>}
          {payload.map((entry: any, index: number) => (
            <div key={index} style={{ color: entry.color || entry.payload?.fill || '#fff' }}>
              {entry.name}: {entry.value}
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
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Quick stats and general system health.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {[
          { label: 'Active Cameras', value: '1,240', icon: <Camera size={20} className="text-accent" /> },
          { label: 'Total Inferences', value: '45.2M', icon: <Video size={20} className="text-purple-400" /> },
          { label: 'Avg Latency', value: '45ms', icon: <Activity size={20} className="text-green-400" /> },
          { label: 'System Alerts', value: '3', icon: <AlertTriangle size={20} className="text-secondary" /> },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-[#1e1e1e] p-4 rounded-[11px] border border-gray-200 dark:border-[#222] shadow-sm flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black text-gray-500 mb-1 uppercase tracking-widest">{stat.label}</div>
              <div className="text-[18px] font-bold text-gray-900 dark:text-white tracking-tight">{stat.value}</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* First Chart */}
        <div className="card-glass bg-white dark:bg-[#1e1e1e] p-6 rounded-[11px] border border-gray-100 dark:border-[#222] shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-4 shrink-0">
            <Activity size={16} className="text-gray-500" />
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Inference Detections vs Latency</h2>
          </div>
          <div className="h-64 pb-2 flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={inferenceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={DATA_COLOR} stopOpacity={0.15}/>
                    <stop offset="95%" stopColor={DATA_COLOR} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={SECONDARY_COLOR} stopOpacity={0.15}/>
                    <stop offset="95%" stopColor={SECONDARY_COLOR} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2a2a' : '#e5e7eb'} vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} />
                <Tooltip cursor={{ stroke: isDark ? '#333' : '#e5e7eb', strokeWidth: 1, strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                <Area type="monotone" dataKey="detections" stroke={DATA_COLOR} strokeWidth={2} fill="url(#colorDetections)" fillOpacity={1} animationDuration={1000} />
                <Area type="monotone" dataKey="latency" stroke={SECONDARY_COLOR} strokeWidth={2} fill="url(#colorLatency)" fillOpacity={1} animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Second Chart */}
        <div className="card-glass bg-white dark:bg-[#1e1e1e] p-6 rounded-[11px] border border-gray-100 dark:border-[#222] shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-4 shrink-0">
             <Camera size={16} className="text-gray-500" />
             <h2 className="text-sm font-bold text-gray-900 dark:text-white">Camera Global Status Over Time</h2>
          </div>
          <div className="h-64 pb-2 flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={DATA_COLOR} stopOpacity={0.15}/>
                    <stop offset="95%" stopColor={DATA_COLOR} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorStandby" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={SECONDARY_COLOR} stopOpacity={0.15}/>
                    <stop offset="95%" stopColor={SECONDARY_COLOR} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2a2a' : '#e5e7eb'} vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} />
                <Tooltip cursor={{ stroke: isDark ? '#333' : '#e5e7eb', strokeWidth: 1, strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                <Area type="monotone" dataKey="active" stroke={DATA_COLOR} strokeWidth={2} fill="url(#colorActive)" fillOpacity={1} animationDuration={1000} />
                <Area type="monotone" dataKey="standby" stroke={SECONDARY_COLOR} strokeWidth={2} fill="url(#colorStandby)" fillOpacity={1} animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Recent Alerts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
                <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-transparent">
                <th className="px-5 py-4 whitespace-nowrap">Time</th>
                <th className="px-5 py-4 whitespace-nowrap">Source</th>
                <th className="px-5 py-4 whitespace-nowrap">Severity</th>
                <th className="px-5 py-4 whitespace-nowrap">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
              {[1, 2, 3, 4].map((row) => (
                <tr key={row} className="hover:bg-white/5 hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-4 font-mono text-gray-600 dark:text-gray-400 text-xs">10:4{row}:00 AM</td>
                  <td className="px-5 py-4 font-semibold text-gray-900 dark:text-white">Camera 0{row}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded bg-secondary/10 border border-secondary/20 text-secondary font-bold text-[10px] tracking-tight">Warning</span>
                  </td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-400">High latency detected randomly on stream.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
