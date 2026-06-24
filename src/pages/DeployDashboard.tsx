import React from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';
import { AlertTriangle, Camera, CheckCircle2, ShieldAlert, Activity, LayoutGrid, Clock, MapPin, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import { Button } from '../components/ui';

const colorMap = {
  helmet: '#52C5F3', // Primary
  vest: '#EC3292',   // Secondary
  boots: '#8b5cf6',  // Accent Purple
  gloves: '#10b981'  // Accent Green
};

const violationTrends = [
  { time: '01:00', helmet: 50, vest: 20, boots: 10, gloves: 5 },
  { time: '03:00', helmet: 60, vest: 25, boots: 15, gloves: 10 },
  { time: '05:00', helmet: 80, vest: 30, boots: 20, gloves: 15 },
  { time: '07:00', helmet: 200, vest: 80, boots: 50, gloves: 30 },
  { time: '09:00', helmet: 400, vest: 150, boots: 80, gloves: 50 },
  { time: '11:00', helmet: 300, vest: 120, boots: 70, gloves: 40 },
  { time: '13:00', helmet: 450, vest: 180, boots: 90, gloves: 60 },
  { time: '15:00', helmet: 350, vest: 140, boots: 80, gloves: 45 },
  { time: '17:00', helmet: 600, vest: 250, boots: 120, gloves: 80 },
  { time: '19:00', helmet: 200, vest: 90, boots: 40, gloves: 25 },
  { time: '21:00', helmet: 100, vest: 40, boots: 20, gloves: 10 },
  { time: '23:00', helmet: 60, vest: 20, boots: 10, gloves: 5 },
];

const violationTypes = [
  { name: 'Helmet', value: 5598, color: colorMap.helmet },
  { name: 'Vest', value: 561, color: colorMap.vest },
  { name: 'Boots', value: 111, color: colorMap.boots },
];

const areaViolations = [
  { name: 'RTH', helmet: 5500, vest: 500, boots: 100 },
  { name: 'BGF', helmet: 100, vest: 50, boots: 20 },
];

const heatmapData = [
  { zone: 'BGF', times: [0, 0, 0, 0, 1, 0] },
  { zone: 'RTH', times: [16, 108, 1679, 2041, 1533, 220] },
];

const timePeriods = ['00-04', '04-08', '08-12', '12-16', '16-20', '20-24'];

const realtimeAlerts = [
  { id: 1, camera: 'CH-001 - Main Gate', status: 'Critical', time: 'Just now', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=150&h=100' },
  { id: 2, camera: 'CH-002 - Perimeter', status: 'Critical', time: '2026-06-23 15:24:11', img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=150&h=100' },
  { id: 3, camera: 'CH-001 - Main Gate', status: 'Critical', time: '2026-06-23 15:24:09', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=150&h=100' },
  { id: 4, camera: 'CH-003 - Dock', status: 'Critical', time: '2026-06-23 15:22:57', img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=150&h=100' },
  { id: 5, camera: 'CH-001 - Main Gate', status: 'Critical', time: '2026-06-23 15:22:43', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=150&h=100' },
  { id: 6, camera: 'CH-002 - Perimeter', status: 'Critical', time: '2026-06-23 15:22:39', img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=150&h=100' },
];

export const DeployDashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-[#161616]/95 backdrop-blur-md border border-gray-100 dark:border-[#2a2a2a] text-gray-900 dark:text-white text-xs px-3 py-2 rounded-lg shadow-xl translate-y-[-10px]">
          {label && <div className="text-gray-500 font-medium mb-1.5 pb-1 border-b border-gray-100 dark:border-[#2a2a2a]">{label}</div>}
          <div className="space-y-1.5">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-[2px]" style={{ backgroundColor: entry.color || entry.payload?.fill || '#52C5F3' }}></div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium capitalize">{entry.name}</span>
                </div>
                <span className="font-bold" style={{ color: entry.color || entry.payload?.fill || '#fff' }}>{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const getHeatmapColor = (val: number) => {
    if (val === 0) return isDark ? '#1a1a1a' : '#f8fafc'; 
    if (val < 50) return isDark ? 'rgba(82, 197, 243, 0.15)' : 'rgba(82, 197, 243, 0.2)';
    if (val < 200) return isDark ? 'rgba(82, 197, 243, 0.4)' : 'rgba(82, 197, 243, 0.5)';
    if (val < 1000) return isDark ? 'rgba(82, 197, 243, 0.7)' : 'rgba(82, 197, 243, 0.8)';
    return '#52C5F3'; 
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-6 min-h-full">
        
        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-1">Deployment Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Real-time infrastructure performance and safety compliance metrics.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="text-xs h-9 px-4 font-bold border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1e1e1e] hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors rounded-full text-gray-700 dark:text-gray-300">
               <Download className="w-3.5 h-3.5 mr-1.5" />
               Export Report
             </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 max-w-full">
          {/* Main Content Area (3 cols) */}
          <div className="xl:col-span-3 flex flex-col gap-6">
          
          {/* Top Stat Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* PPE Compliance */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl p-5 shadow-sm flex flex-col relative overflow-hidden group hover:border-[#52C5F3]/50 transition-colors hover:shadow-md">
              <div className="flex items-center justify-between mb-4 shrink-0 relative z-10 w-full text-gray-400 dark:text-gray-500">
                <span className="text-[10px] font-black tracking-widest capitalize">PPE Compliance Rate</span>
                <div className="p-1.5 bg-[#52C5F3]/10 rounded-md border border-[#52C5F3]/20 text-[#52C5F3]">
                   <ShieldAlert size={14} />
                </div>
              </div>
              <div className="flex flex-col justify-center flex-1 w-full relative z-10">
                <div className="relative w-full h-14 flex items-end justify-center mb-2">
                   <svg viewBox="0 0 100 50" className="w-[140px] h-[70px] overflow-visible absolute bottom-0">
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={isDark ? "#2a2a2a" : "#f3f4f6"} strokeWidth="6" strokeLinecap="round" />
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#52C5F3" strokeWidth="6" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset={`${100 - 0.2}`} className="drop-shadow-md transition-all duration-1000 ease-out" />
                   </svg>
                   <div className="text-2xl font-black text-[#52C5F3] leading-[0px] h-0 flex items-center tracking-tight mb-3">0.2%</div>
                </div>
                <div className="text-[11px] font-bold text-red-500 flex items-center justify-center gap-1.5 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full mx-auto border border-red-100 dark:border-red-500/20">
                   ▲ 2.1% <span className="text-gray-500 font-medium tracking-wide border-l border-red-200 dark:border-red-500/30 pl-1.5 ml-0.5">vs last period</span>
                </div>
              </div>
            </div>

            {/* Active Violations */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl p-5 shadow-sm flex flex-col group hover:border-orange-500/50 transition-colors hover:shadow-md">
              <div className="flex items-center justify-between mb-4 shrink-0 w-full text-gray-400 dark:text-gray-500">
                <span className="text-[10px] font-black tracking-widest capitalize">Active Violations</span>
                <div className="p-1.5 bg-orange-50 dark:bg-orange-500/10 rounded-md border border-orange-100 dark:border-orange-500/20 text-orange-500">
                   <AlertTriangle size={14} />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 flex-1 mt-1">
                 <div className="relative w-16 h-16 shrink-0 drop-shadow-sm">
                    <PieChart width={64} height={64}>
                       <Pie data={[{value:14},{value:52},{value:118},{value:125}]} innerRadius={25} outerRadius={32} paddingAngle={4} cornerRadius={4} dataKey="value" stroke="none">
                          <Cell fill="#ef4444" />
                          <Cell fill="#f97316" />
                          <Cell fill="#3b82f6" />
                          <Cell fill="#10b981" />
                       </Pie>
                    </PieChart>
                    <div className="absolute inset-0 flex items-center justify-center text-[11px] font-black tracking-tighter">6.2k</div>
                 </div>
                 <div className="grid grid-cols-2 gap-2 flex-1">
                    <div className="text-center rounded-lg pt-1.5 pb-2 bg-gray-50/80 dark:bg-[#252525]/80 border border-transparent hover:bg-red-50 dark:hover:bg-red-900/10 hover:border-red-100 dark:hover:border-red-900/30 transition-colors cursor-pointer">
                       <div className="text-[9px] font-black text-red-500 tracking-widest mb-0.5">Crit</div>
                       <div className="text-sm font-black text-gray-900 dark:text-white leading-none">14</div>
                    </div>
                    <div className="text-center rounded-lg pt-1.5 pb-2 bg-gray-50/80 dark:bg-[#252525]/80 border border-transparent hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:border-orange-100 dark:hover:border-orange-900/30 transition-colors cursor-pointer">
                       <div className="text-[9px] font-black text-orange-500 tracking-widest mb-0.5">High</div>
                       <div className="text-sm font-black text-gray-900 dark:text-white leading-none">52</div>
                    </div>
                    <div className="text-center rounded-lg pt-1.5 pb-2 bg-gray-50/80 dark:bg-[#252525]/80 border border-transparent hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-100 dark:hover:border-blue-900/30 transition-colors cursor-pointer">
                       <div className="text-[9px] font-black text-blue-500 tracking-widest mb-0.5">Med</div>
                       <div className="text-sm font-black text-gray-900 dark:text-white leading-none">118</div>
                    </div>
                    <div className="text-center rounded-lg pt-1.5 pb-2 bg-gray-50/80 dark:bg-[#252525]/80 border border-transparent hover:bg-green-50 dark:hover:bg-green-900/10 hover:border-green-100 dark:hover:border-green-900/30 transition-colors cursor-pointer">
                       <div className="text-[9px] font-black text-green-500 tracking-widest mb-0.5">Low</div>
                       <div className="text-sm font-black text-gray-900 dark:text-white leading-none">125</div>
                    </div>
                 </div>
              </div>
            </div>

            {/* CCTV Status */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl p-5 shadow-sm flex flex-col group hover:border-indigo-500/50 transition-colors hover:shadow-md">
              <div className="flex items-center justify-between mb-4 shrink-0 w-full text-gray-400 dark:text-gray-500">
                <span className="text-[10px] font-black tracking-widest capitalize">CCTV Status</span>
                <div className="p-1.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-md border border-indigo-100 dark:border-indigo-500/20 text-indigo-500">
                   <Camera size={14} />
                </div>
              </div>
              <div className="flex items-center justify-around w-full mt-2 flex-1">
                 <div className="text-center">
                    <div className="text-3xl font-black text-gray-900 dark:text-white leading-none mb-1.5 tracking-tight">8</div>
                    <div className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">Online</div>
                 </div>
                 <div className="w-px h-10 bg-gray-100 dark:bg-[#333]"></div>
                 <div className="text-center opacity-40">
                    <div className="text-3xl font-black text-gray-900 dark:text-white leading-none mb-1.5 tracking-tight">0</div>
                    <div className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">Offline</div>
                 </div>
                 <div className="w-px h-10 bg-gray-100 dark:bg-[#333]"></div>
                 <div className="text-center relative">
                    <div className="text-3xl font-black text-[#52C5F3] leading-none mb-1.5 tracking-tight drop-shadow-sm">8</div>
                    <div className="text-[9px] font-bold text-[#52C5F3] tracking-widest uppercase opacity-80 flex items-center gap-1">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#52C5F3] animate-pulse"></div>
                       AI Active
                    </div>
                 </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl p-5 shadow-sm flex flex-col relative overflow-hidden group hover:border-[#10b981]/50 transition-colors hover:shadow-md">
              <div className="flex items-center justify-between mb-4 shrink-0 relative z-10 w-full text-gray-400 dark:text-gray-500">
                <span className="text-[10px] font-black tracking-widest capitalize">System Health</span>
                <div className="p-1.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-md border border-emerald-100 dark:border-emerald-500/20 text-emerald-500">
                   <Activity size={14} />
                </div>
              </div>
              <div className="flex flex-col justify-center flex-1 w-full relative z-10">
                <div className="relative w-full h-14 flex items-end justify-center mb-2">
                   <svg viewBox="0 0 100 50" className="w-[140px] h-[70px] overflow-visible absolute bottom-0">
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={isDark ? "#2a2a2a" : "#f3f4f6"} strokeWidth="6" strokeLinecap="round" />
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset={`${100 - 70}`} className="drop-shadow-md transition-all duration-1000 ease-out" />
                   </svg>
                   <div className="text-2xl font-black text-[#10b981] leading-[0px] h-0 flex items-center tracking-tight mb-3">70%</div>
                </div>
                <div className="text-[11px] font-bold text-[#10b981] flex items-center justify-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full mx-auto border border-emerald-100 dark:border-emerald-500/20">
                   Stable <span className="text-gray-500 font-medium tracking-wide border-l border-emerald-200 dark:border-emerald-500/30 pl-1.5 ml-0.5">CPU 65% • RAM 86%</span>
                </div>
              </div>
            </div>

          </div>

          {/* Row 2: Trends and Types */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Violations Trends */}
            <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl p-6 shadow-sm flex flex-col group">
               <div className="flex items-center justify-between mb-6 shrink-0 w-full text-gray-400 dark:text-gray-500">
                 <div>
                   <span className="text-[10px] font-black tracking-widest capitalize text-gray-900 dark:text-white">Violations Trends</span>
                   <span className="text-[10px] capitalize font-bold ml-2">(24h)</span>
                 </div>
                 <Activity size={14} />
               </div>
               <div className="min-h-0 min-w-0 h-40 w-full flex-1 min-w-0">
                 <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                   <AreaChart data={violationTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <defs>
                        {Object.entries(colorMap).map(([key, color]) => (
                           <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor={color} stopOpacity={isDark ? 0.3 : 0.2}/>
                             <stop offset="95%" stopColor={color} stopOpacity={0}/>
                           </linearGradient>
                        ))}
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2a2a' : '#f3f4f6'} vertical={false} strokeOpacity={0.6} />
                     <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#888', fontWeight: 600}} dy={10} angle={-45} textAnchor="end" height={40}/>
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} width={35} />
                     <Tooltip cursor={{ stroke: isDark ? '#333' : '#e5e7eb', strokeWidth: 1, strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                     <Area type="monotone" dataKey="boots" stackId="1" stroke={colorMap.boots} strokeWidth={2} fillOpacity={1} fill="url(#colorboots)" />
                     <Area type="monotone" dataKey="vest" stackId="1" stroke={colorMap.vest} strokeWidth={2} fillOpacity={1} fill="url(#colorvest)" />
                     <Area type="monotone" dataKey="helmet" stackId="1" stroke={colorMap.helmet} strokeWidth={2} fillOpacity={1} fill="url(#colorhelmet)" />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
               <div className="flex items-center justify-center gap-4 mt-2 flex-wrap">
                  {Object.entries(colorMap).map(([key, color]) => (
                     <div key={key} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: color }}></div>
                        <span className="text-[10px] font-bold text-gray-500 capitalize tracking-wide">{key}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Violations Types */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl p-6 shadow-sm flex flex-col items-center group">
               <div className="flex items-center justify-between mb-6 shrink-0 w-full text-gray-400 dark:text-gray-500">
                 <span className="text-[10px] font-black tracking-widest capitalize text-gray-900 dark:text-white">Violations Types</span>
                 <LayoutGrid size={14} />
               </div>
               <div className="min-h-0 min-w-0 flex-1 w-full flex items-center justify-center min-h-[160px] drop-shadow-sm">
                 <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                   <PieChart>
                     <Pie data={violationTypes} innerRadius={55} outerRadius={70} paddingAngle={4} cornerRadius={6} dataKey="value" stroke="none">
                       {violationTypes.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                     <Tooltip content={<CustomTooltip />} />
                   </PieChart>
                 </ResponsiveContainer>
               </div>
               <div className="flex items-center justify-center gap-4 mt-2 w-full flex-wrap">
                  {violationTypes.map((type) => (
                     <div key={type.name} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: type.color }}></div>
                        <span className="text-[10px] font-bold text-gray-500 tracking-wide">{type.name}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Top 3 Violations & Locations */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl p-6 shadow-sm flex flex-col group">
               <div className="flex items-center justify-between mb-6 shrink-0 w-full text-gray-400 dark:text-gray-500">
                 <span className="text-[10px] font-black tracking-widest capitalize text-gray-900 dark:text-white">Top 3 Violations</span>
                 <AlertTriangle size={14} />
               </div>
               <div className="flex justify-between items-end mb-4 border-b border-gray-100 dark:border-[#2a2a2a] pb-2">
                 <div className="text-[9px] font-black text-gray-400 tracking-widest capitalize">Location/Type</div>
                 <div className="text-[9px] font-black text-gray-400 tracking-widest capitalize">Count</div>
               </div>
               <div className="space-y-4">
                  {violationTypes.map((type, index) => (
                     <div key={index} className="flex items-center justify-between group/item p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors cursor-default">
                        <div className="flex items-center gap-3 relative">
                           <span className="text-[10px] font-black text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-[#2a2a2a] w-6 h-6 flex items-center justify-center rounded-md">
                             {index + 1}
                           </span>
                           <span className="text-xs font-bold text-gray-700 dark:text-gray-300 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">{type.name}</span>
                        </div>
                        <span className="text-xs font-black text-[#EC3292] bg-[#EC3292]/10 px-2.5 py-0.5 rounded-md border border-[#EC3292]/20">{type.value}</span>
                     </div>
                  ))}
               </div>
            </div>

          </div>

          {/* Row 3: Area Distribution and Heatmap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Area Violations */}
             <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl p-6 shadow-sm flex flex-col group">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                  <div className="flex items-center justify-between shrink-0 w-full sm:w-auto flex-1 text-gray-400 dark:text-gray-500">
                    <div>
                      <span className="text-[10px] font-black tracking-widest capitalize text-gray-900 dark:text-white">Area Violations Dist.</span>
                      <span className="text-[10px] capitalize font-bold ml-2">(Per Zone)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#252525] px-2.5 py-1.5 rounded-lg border border-gray-100 dark:border-[#2a2a2a]">
                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#52C5F3] rounded-[2px] shadow-sm"></div><span className="text-[9px] font-bold text-gray-600 dark:text-gray-400 tracking-wide capitalize">Helmet</span></div>
                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#EC3292] rounded-[2px] shadow-sm"></div><span className="text-[9px] font-bold text-gray-600 dark:text-gray-400 tracking-wide capitalize">Vest</span></div>
                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#8b5cf6] rounded-[2px] shadow-sm"></div><span className="text-[9px] font-bold text-gray-600 dark:text-gray-400 tracking-wide capitalize">Boots</span></div>
                    </div>
                  </div>
               </div>
               <div className="min-h-0 min-w-0 h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <BarChart data={areaViolations} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={40}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2a2a' : '#f3f4f6'} vertical={false} strokeOpacity={0.6} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} width={35} />
                      <Tooltip cursor={{ fill: isDark ? '#ffffff05' : '#00000003' }} content={<CustomTooltip />} />
                      <Bar dataKey="boots" stackId="a" fill={colorMap.boots} radius={[0, 0, 0, 0]} />
                      <Bar dataKey="vest" stackId="a" fill={colorMap.vest} radius={[0, 0, 0, 0]} />
                      <Bar dataKey="helmet" stackId="a" fill={colorMap.helmet} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
             </div>

             {/* Heatmap */}
             <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl p-6 shadow-sm flex flex-col group">
               <div className="flex items-center justify-between mb-6 shrink-0 w-full text-gray-400 dark:text-gray-500">
                 <div>
                   <span className="text-[10px] font-black tracking-widest capitalize text-gray-900 dark:text-white">Heatmap</span>
                   <span className="text-[10px] capitalize font-bold ml-2">Zone × Time</span>
                 </div>
                 <Clock size={14} />
               </div>
               <div className="flex-1 w-full flex flex-col min-w-0">
                  <div className="grid grid-cols-7 gap-1.5 mb-3">
                     <div className="text-transparent">Zone</div>
                     {timePeriods.map(time => (
                        <div key={time} className="text-[9px] font-black text-gray-400 text-center tracking-wide">{time}</div>
                     ))}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                     {heatmapData.map((row) => (
                        <div key={row.zone} className="grid grid-cols-7 gap-2 flex-1">
                           <div className="text-[10px] font-black text-gray-500 flex items-center bg-gray-50 dark:bg-[#252525] justify-center rounded-md border border-gray-100 dark:border-[#2a2a2a]">{row.zone}</div>
                           {row.times.map((val, idx) => (
                              <div key={idx} 
                                   className="rounded-md flex items-center justify-center text-[10px] font-black text-white hover:scale-[1.05] transition-transform cursor-pointer shadow-sm relative group/cell border border-black/5 dark:border-white/5"
                                   style={{ backgroundColor: getHeatmapColor(val) }}>
                                 {val > 0 && <span className="drop-shadow-md">{val}</span>}
                                 {val > 0 && <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/cell:opacity-100 transition-opacity rounded-md"></div>}
                              </div>
                           ))}
                        </div>
                     ))}
                  </div>
               </div>
             </div>
          </div>
        </div>

        {/* Sidebar Space (1 col) */}
        <div className="xl:col-span-1 flex flex-col gap-6">
           {/* Active Cam */}
           <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl p-6 shadow-sm group">
              <div className="flex items-center justify-between mb-6 shrink-0 w-full text-gray-400 dark:text-gray-500">
                 <span className="text-[10px] font-black tracking-widest capitalize text-gray-900 dark:text-white">Active Cameras</span>
                 <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 dark:bg-emerald-500/10 rounded-md border border-emerald-100 dark:border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <Camera size={12} className="text-emerald-600 dark:text-emerald-400" />
                 </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">8</span>
                <span className="text-xl font-bold text-gray-400 mb-1">/ 8</span>
              </div>
              <div className="mt-5 w-full bg-gray-100 dark:bg-[#2a2a2a] h-2 rounded-full overflow-hidden">
                <div className="bg-[#52C5F3] h-full rounded-full w-full"></div>
              </div>
           </div>

           {/* Realtime Alert */}
           <div className="bg-white dark:bg-[#1e1e1e] border border-red-200 dark:border-red-900/30 rounded-xl shadow-sm flex flex-col flex-1 pb-4 overflow-hidden relative min-h-[500px]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 dark:bg-red-500/10 rounded-bl-full blur-3xl pointer-events-none"></div>
              
              <div className="p-5 border-b border-red-100 dark:border-red-900/20 flex items-center justify-between bg-red-50/50 dark:bg-red-900/10 z-10 relative">
                 <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-red-100 dark:bg-red-500/20 rounded-md">
                       <AlertTriangle size={14} className="text-red-600 dark:text-red-400 animate-pulse" />
                    </div>
                    <span className="text-xs font-black tracking-widest capitalize text-red-600 dark:text-red-500">Realtime Alerts</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="text-[9px] font-black tracking-widest bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 px-2 py-0.5 rounded border border-red-200 dark:border-red-500/30 uppercase">Live</div>
                 </div>
              </div>
              
              <div className="p-5 flex-1 overflow-y-auto space-y-4 max-h-[600px] custom-scrollbar z-10 relative">
                 {realtimeAlerts.map((alert) => (
                    <div key={alert.id} className="flex gap-4 bg-white dark:bg-[#201616] p-3 rounded-xl border border-red-50 dark:border-red-900/20 shadow-sm relative group hover:border-red-200 dark:hover:border-red-500/30 transition-colors cursor-pointer hover:shadow-md">
                       <div className="w-[84px] h-[60px] bg-gray-200 dark:bg-[#2a2a2a] rounded-lg overflow-hidden shrink-0 relative">
                          <img src={alert.img} alt="alert" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 border border-black/10 dark:border-white/10 rounded-lg"></div>
                          <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm px-1 py-0.5 rounded text-[8px] font-black text-white uppercase tracking-widest">CAM</div>
                       </div>
                       <div className="flex flex-col justify-center min-w-0 pr-1 py-0.5 flex-1">
                          <div className="text-xs font-black text-gray-900 dark:text-red-50 truncate mb-1.5">{alert.camera}</div>
                          <div className="flex items-center gap-2.5 mt-0.5">
                             <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded border border-red-100 dark:border-red-500/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.8)]"></div>
                                <span className="text-[9px] font-black text-red-600 dark:text-red-400 leading-[14px] uppercase tracking-widest">Crit</span>
                             </div>
                             <span className="text-[10px] font-bold text-gray-500 truncate">{alert.time}</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
      </div>
    </main>
  );
};

