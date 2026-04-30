import React from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';
import { AlertTriangle, Camera, CheckCircle2, ShieldAlert, Activity, LayoutGrid, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

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
  { id: 1, camera: 'Rastek - APD', status: 'Critical', time: 'Just now', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=150&h=100' },
  { id: 2, camera: 'Rastek - APD', status: 'Critical', time: '2026-04-29 15:24:11', img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=150&h=100' },
  { id: 3, camera: 'Rastek - APD', status: 'Critical', time: '2026-04-29 15:24:09', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=150&h=100' },
  { id: 4, camera: 'Rastek - APD', status: 'Critical', time: '2026-04-29 15:22:57', img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=150&h=100' },
  { id: 5, camera: 'Rastek - APD', status: 'Critical', time: '2026-04-29 15:22:43', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=150&h=100' },
  { id: 6, camera: 'Rastek - APD', status: 'Critical', time: '2026-04-29 15:22:39', img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=150&h=100' },
];

export const DeployDashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 dark:bg-[#161616]/90 backdrop-blur-sm border border-gray-100 dark:border-[#2a2a2a] text-gray-900 dark:text-white text-[10px] px-3 py-2 rounded-lg shadow-xl font-bold translate-y-[-10px]">
          {label && <div className="text-gray-500 tracking-wide mb-1.5 pb-1 border-b border-gray-100 dark:border-[#2a2a2a]">{label}</div>}
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color || entry.payload?.fill || '#52C5F3' }}></div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium capitalize">{entry.name}</span>
                </div>
                <span className="font-black" style={{ color: entry.color || entry.payload?.fill || '#fff' }}>{entry.value}</span>
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
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white mb-2">Deployment Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Real-time infrastructure performance and safety compliance metrics.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 max-w-full">
          {/* Main Content Area (3 cols) */}
          <div className="xl:col-span-3 flex flex-col gap-4">
          
          {/* Top Stat Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* PPE Compliance */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-[11px] p-6 shadow-sm flex flex-col relative overflow-hidden group hover:border-[#52C5F3]/50 transition-colors">
              <div className="flex items-center justify-between mb-4 shrink-0 relative z-10 w-full text-gray-400 dark:text-gray-500">
                <span className="text-[10px] font-black tracking-widest capitalize">PPE Compliance</span>
                <ShieldAlert size={14} />
              </div>
              <div className="flex flex-col justify-center flex-1 w-full relative z-10">
                <div className="relative w-full h-12 flex items-end justify-center mb-2">
                   <svg viewBox="0 0 100 50" className="w-[120px] h-[60px] overflow-visible absolute bottom-0">
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={isDark ? "#2a2a2a" : "#f3f4f6"} strokeWidth="6" strokeLinecap="round" />
                      <path d="M 10 50 A 40 40 0 0 1 12 40" fill="none" stroke="#52C5F3" strokeWidth="6" strokeLinecap="round" className="drop-shadow-md" />
                   </svg>
                   <div className="text-[20px] font-black text-[#52C5F3] leading-[0px] h-0 flex items-center tracking-tight mb-2">0.2%</div>
                </div>
                <div className="text-[10px] font-bold text-red-500 flex items-center justify-center gap-1">
                   ▲ 2.1% <span className="text-gray-400 font-medium tracking-wide">vs last period</span>
                </div>
              </div>
            </div>

            {/* Active Violations */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-[11px] p-6 shadow-sm flex flex-col group hover:border-orange-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4 shrink-0 w-full text-gray-400 dark:text-gray-500">
                <span className="text-[10px] font-black tracking-widest capitalize">Active Violations</span>
                <AlertTriangle size={14} />
              </div>
              <div className="flex items-center justify-between gap-4 flex-1">
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
                    <div className="text-center rounded pt-1.5 pb-2 bg-gray-50/50 dark:bg-[#252525]/50 border border-gray-100 dark:border-[#2a2a2a] hover:bg-red-50 dark:hover:bg-red-900/10 hover:border-red-100 dark:hover:border-red-900/30 transition-colors cursor-pointer">
                       <div className="text-[9px] font-black text-red-500 tracking-widest mb-0.5">Crit</div>
                       <div className="text-[13px] font-black text-gray-900 dark:text-white leading-none">14</div>
                    </div>
                    <div className="text-center rounded pt-1.5 pb-2 bg-gray-50/50 dark:bg-[#252525]/50 border border-gray-100 dark:border-[#2a2a2a] hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:border-orange-100 dark:hover:border-orange-900/30 transition-colors cursor-pointer">
                       <div className="text-[9px] font-black text-orange-500 tracking-widest mb-0.5">High</div>
                       <div className="text-[13px] font-black text-gray-900 dark:text-white leading-none">52</div>
                    </div>
                    <div className="text-center rounded pt-1.5 pb-2 bg-gray-50/50 dark:bg-[#252525]/50 border border-gray-100 dark:border-[#2a2a2a] hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-100 dark:hover:border-blue-900/30 transition-colors cursor-pointer">
                       <div className="text-[9px] font-black text-blue-500 tracking-widest mb-0.5">Med</div>
                       <div className="text-[13px] font-black text-gray-900 dark:text-white leading-none">118</div>
                    </div>
                    <div className="text-center rounded pt-1.5 pb-2 bg-gray-50/50 dark:bg-[#252525]/50 border border-gray-100 dark:border-[#2a2a2a] hover:bg-green-50 dark:hover:bg-green-900/10 hover:border-green-100 dark:hover:border-green-900/30 transition-colors cursor-pointer">
                       <div className="text-[9px] font-black text-green-500 tracking-widest mb-0.5">Low</div>
                       <div className="text-[13px] font-black text-gray-900 dark:text-white leading-none">125</div>
                    </div>
                 </div>
              </div>
            </div>

            {/* CCTV Status */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-[11px] p-6 shadow-sm flex flex-col group hover:border-[#10b981]/50 transition-colors">
              <div className="flex items-center justify-between mb-4 shrink-0 w-full text-gray-400 dark:text-gray-500">
                <span className="text-[10px] font-black tracking-widest capitalize">CCTV Status</span>
                <Camera size={14} />
              </div>
              <div className="flex items-center justify-around w-full mt-1 flex-1">
                 <div className="text-center">
                    <div className="text-2xl font-black text-gray-900 dark:text-white leading-none mb-1 tracking-tight">8</div>
                    <div className="text-[9px] font-bold text-gray-400 tracking-widest">Online</div>
                 </div>
                 <div className="text-center opacity-40">
                    <div className="text-2xl font-black text-gray-900 dark:text-white leading-none mb-1 tracking-tight">0</div>
                    <div className="text-[9px] font-bold text-gray-400 tracking-widest">Offline</div>
                 </div>
                 <div className="text-center">
                    <div className="text-2xl font-black text-[#52C5F3] leading-none mb-1 tracking-tight drop-shadow-sm">8</div>
                    <div className="text-[9px] font-bold text-[#52C5F3] tracking-widest opacity-80">AI Active</div>
                 </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-[11px] p-6 shadow-sm flex flex-col relative overflow-hidden group hover:border-[#8b5cf6]/50 transition-colors">
              <div className="flex items-center justify-between mb-4 shrink-0 relative z-10 w-full text-gray-400 dark:text-gray-500">
                <span className="text-[10px] font-black tracking-widest capitalize">System Health</span>
                <Activity size={14} />
              </div>
              <div className="flex flex-col justify-center flex-1 w-full relative z-10">
                <div className="relative w-full h-12 flex items-end justify-center mb-2">
                   <svg viewBox="0 0 100 50" className="w-[120px] h-[60px] overflow-visible absolute bottom-0">
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={isDark ? "#2a2a2a" : "#f3f4f6"} strokeWidth="6" strokeLinecap="round" />
                      <path d="M 10 50 A 40 40 0 0 1 70 20" fill="none" stroke="#52C5F3" strokeWidth="6" strokeLinecap="round" className="drop-shadow-md" />
                   </svg>
                   <div className="text-[20px] font-black text-[#52C5F3] leading-[0px] h-0 flex items-center tracking-tight mb-2">70%</div>
                </div>
                <div className="text-[10px] font-bold text-gray-500 tracking-wider text-center flex items-center justify-center gap-2">
                   <span>CPU: <span className="text-gray-700 dark:text-gray-300">65%</span></span>
                   <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                   <span>RAM: <span className="text-gray-700 dark:text-gray-300">86%</span></span>
                </div>
              </div>
            </div>

          </div>

          {/* Row 2: Trends and Types */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Violations Trends */}
            <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-[11px] p-6 shadow-sm flex flex-col group">
               <div className="flex items-center justify-between mb-6 shrink-0 w-full text-gray-400 dark:text-gray-500">
                 <div>
                   <span className="text-[10px] font-black tracking-widest capitalize text-gray-900 dark:text-white">Violations Trends</span>
                   <span className="text-[10px] capitalize font-bold ml-2">(24h)</span>
                 </div>
                 <Activity size={14} />
               </div>
               <div className="h-40 w-full flex-1 min-w-0">
                 <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                   <AreaChart data={violationTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <defs>
                        {Object.entries(colorMap).map(([key, color]) => (
                           <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
                             <stop offset="95%" stopColor={color} stopOpacity={0}/>
                           </linearGradient>
                        ))}
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2a2a' : '#f3f4f6'} vertical={false} strokeOpacity={0.6} />
                     <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#888', fontWeight: 600}} dy={10} angle={-45} textAnchor="end" height={40}/>
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} width={35} />
                     <Tooltip cursor={{ stroke: isDark ? '#333' : '#e5e7eb', strokeWidth: 1, strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                     <Area type="monotone" dataKey="boots" stackId="1" stroke={colorMap.boots} strokeWidth={1.5} fillOpacity={1} fill="url(#colorboots)" />
                     <Area type="monotone" dataKey="vest" stackId="1" stroke={colorMap.vest} strokeWidth={1.5} fillOpacity={1} fill="url(#colorvest)" />
                     <Area type="monotone" dataKey="helmet" stackId="1" stroke={colorMap.helmet} strokeWidth={1.5} fillOpacity={1} fill="url(#colorhelmet)" />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
               <div className="flex items-center justify-center gap-3 mt-2 flex-wrap">
                  {Object.entries(colorMap).map(([key, color]) => (
                     <div key={key} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm border-2" style={{ borderColor: color }}></div>
                        <span className="text-[10px] font-bold text-gray-500 capitalize">{key}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Violations Types */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-[11px] p-6 shadow-sm flex flex-col items-center group">
               <div className="flex items-center justify-between mb-6 shrink-0 w-full text-gray-400 dark:text-gray-500">
                 <span className="text-[10px] font-black tracking-widest capitalize text-gray-900 dark:text-white">Violations Types</span>
                 <LayoutGrid size={14} />
               </div>
               <div className="flex-1 w-full flex items-center justify-center min-h-[160px] drop-shadow-sm">
                 <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                   <PieChart>
                     <Pie data={violationTypes} innerRadius={50} outerRadius={65} paddingAngle={4} cornerRadius={4} dataKey="value" stroke="none">
                       {violationTypes.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                     <Tooltip content={<CustomTooltip />} />
                   </PieChart>
                 </ResponsiveContainer>
               </div>
               <div className="flex items-center justify-center gap-3 mt-2 w-full flex-wrap">
                  {violationTypes.map((type) => (
                     <div key={type.name} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: type.color }}></div>
                        <span className="text-[10px] font-bold text-gray-500">{type.name}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Top 3 Violations & Locations */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-[11px] p-6 shadow-sm flex flex-col group">
               <div className="flex items-center justify-between mb-6 shrink-0 w-full text-gray-400 dark:text-gray-500">
                 <span className="text-[10px] font-black tracking-widest capitalize text-gray-900 dark:text-white">Top 3 Violations</span>
                 <AlertTriangle size={14} />
               </div>
               <div className="flex justify-between items-end mb-3 border-b border-gray-100 dark:border-[#2a2a2a] pb-2">
                 <div className="text-[9px] font-black text-gray-400 tracking-widest capitalize">Location/Type</div>
                 <div className="text-[9px] font-black text-gray-400 tracking-widest capitalize">Count</div>
               </div>
               <div className="space-y-3">
                  {violationTypes.map((type, index) => (
                     <div key={index} className="flex items-center justify-between group/item p-1.5 -mx-1.5 rounded-[8px] hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors cursor-default">
                        <div className="flex items-center gap-3 relative">
                           <span className="text-[10px] font-black text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-[#2a2a2a] w-5 h-5 flex items-center justify-center rounded-sm">
                             {index + 1}
                           </span>
                           <span className="text-[12px] font-bold text-gray-700 dark:text-gray-300 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">{type.name}</span>
                        </div>
                        <span className="text-[12px] font-black text-[#EC3292] bg-[#EC3292]/10 px-2 py-0.5 rounded-sm">{type.value}</span>
                     </div>
                  ))}
               </div>
            </div>

          </div>

          {/* Row 3: Area Distribution and Heatmap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Area Violations */}
             <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-[11px] p-6 shadow-sm flex flex-col group">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                  <div className="flex items-center justify-between shrink-0 w-full sm:w-auto flex-1 text-gray-400 dark:text-gray-500">
                    <div>
                      <span className="text-[10px] font-black tracking-widest capitalize text-gray-900 dark:text-white">Area Violations Dist.</span>
                      <span className="text-[10px] capitalize font-bold ml-2">(Per Zone)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#252525] px-2 py-1 rounded-md">
                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#52C5F3] rounded-[2px] shadow-sm"></div><span className="text-[9px] font-bold text-gray-600 dark:text-gray-400 tracking-wide capitalize">Helmet</span></div>
                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#EC3292] rounded-[2px] shadow-sm"></div><span className="text-[9px] font-bold text-gray-600 dark:text-gray-400 tracking-wide capitalize">Vest</span></div>
                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#8b5cf6] rounded-[2px] shadow-sm"></div><span className="text-[9px] font-bold text-gray-600 dark:text-gray-400 tracking-wide capitalize">Boots</span></div>
                    </div>
                    <div className="p-1.5 rounded-md bg-gray-100 dark:bg-[#252525] group-hover:bg-[#10b981]/10 transition-colors hidden sm:block">
                      <Activity size={14} className="text-gray-500 group-hover:text-[#10b981] transition-colors" />
                    </div>
                  </div>
               </div>
               <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <BarChart data={areaViolations} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={40}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2a2a' : '#f3f4f6'} vertical={false} strokeOpacity={0.6} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#888', fontWeight: 600}} width={35} />
                      <Tooltip cursor={{ fill: isDark ? '#ffffff05' : '#00000003' }} content={<CustomTooltip />} />
                      <Bar dataKey="boots" stackId="a" fill={colorMap.boots} />
                      <Bar dataKey="vest" stackId="a" fill={colorMap.vest} />
                      <Bar dataKey="helmet" stackId="a" fill={colorMap.helmet} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
             </div>

             {/* Heatmap */}
             <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-[11px] p-6 shadow-sm flex flex-col group">
               <div className="flex items-center justify-between mb-6 shrink-0 w-full text-gray-400 dark:text-gray-500">
                 <div>
                   <span className="text-[10px] font-black tracking-widest capitalize text-gray-900 dark:text-white">Heatmap</span>
                   <span className="text-[10px] capitalize font-bold ml-2">Zone × Time</span>
                 </div>
                 <Clock size={14} />
               </div>
               <div className="flex-1 w-full flex flex-col min-w-0">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                     <div className="text-transparent">Zone</div>
                     {timePeriods.map(time => (
                        <div key={time} className="text-[9px] font-black text-gray-400 text-center tracking-wide">{time}</div>
                     ))}
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                     {heatmapData.map((row) => (
                        <div key={row.zone} className="grid grid-cols-7 gap-1.5 flex-1">
                           <div className="text-[10px] font-black text-gray-500 flex items-center">{row.zone}</div>
                           {row.times.map((val, idx) => (
                              <div key={idx} 
                                   className="rounded-[4px] flex items-center justify-center text-[10px] font-black text-white hover:scale-[1.03] transition-transform cursor-pointer shadow-sm relative group/cell"
                                   style={{ backgroundColor: getHeatmapColor(val) }}>
                                 {val > 0 && <span className="drop-shadow-md">{val}</span>}
                                 {val > 0 && <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/cell:opacity-100 transition-opacity rounded-[4px]"></div>}
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
        <div className="xl:col-span-1 flex flex-col gap-4">
           {/* Active Cam */}
           <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-[11px] p-6 shadow-sm group">
              <div className="flex items-center justify-between mb-6 shrink-0 w-full text-gray-400 dark:text-gray-500">
                 <span className="text-[10px] font-black tracking-widest capitalize text-gray-900 dark:text-white">Active Cam</span>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
                    <Camera size={14} />
                 </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">8</span>
                <span className="text-xl font-bold text-gray-400 mb-0.5">/ 8</span>
              </div>
              <div className="mt-4 w-full bg-gray-100 dark:bg-[#2a2a2a] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#52C5F3] h-full rounded-full w-full"></div>
              </div>
           </div>

           {/* Realtime Alert */}
           <div className="bg-white dark:bg-[#1e1e1e] border border-red-200 dark:border-red-900/30 rounded-xl shadow-sm flex flex-col flex-1 pb-4 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 dark:bg-red-500/10 rounded-bl-full blur-2xl pointer-events-none"></div>
              
              <div className="p-5 border-b border-red-100 dark:border-red-900/20 flex items-center justify-between bg-red-50/50 dark:bg-red-900/10 z-10 relative">
                 <span className="text-[10px] font-black tracking-widest capitalize text-red-600 dark:text-red-500">Realtime Alert</span>
                 <div className="flex items-center gap-2">
                    <div className="text-[9px] font-black tracking-widest bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 px-1.5 py-0.5 rounded">Live</div>
                    <AlertTriangle size={14} className="text-red-500 animate-pulse" />
                 </div>
              </div>
              
              <div className="p-4 flex-1 overflow-y-auto space-y-3 max-h-[500px] custom-scrollbar z-10 relative">
                 {realtimeAlerts.map((alert) => (
                    <div key={alert.id} className="flex gap-3 bg-white dark:bg-[#201616] p-2.5 rounded-lg border border-red-50 dark:border-red-900/20 shadow-sm relative group hover:border-red-200 dark:hover:border-red-500/30 transition-colors cursor-pointer">
                       <div className="w-[72px] h-[52px] bg-gray-200 dark:bg-[#2a2a2a] rounded overflow-hidden shrink-0 relative">
                          <img src={alert.img} alt="alert" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 border border-black/10 dark:border-white/10 rounded"></div>
                       </div>
                       <div className="flex flex-col justify-center min-w-0 pr-1 py-0.5">
                          <div className="text-[11px] font-black text-gray-900 dark:text-red-50 truncate mb-1">{alert.camera}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                             <div className="flex items-center gap-1 bg-red-50 dark:bg-red-500/10 px-1.5 rounded-sm border border-red-100 dark:border-red-500/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                <span className="text-[9px] font-black text-red-600 dark:text-red-400 leading-[14px]">Crit</span>
                             </div>
                             <span className="text-[9px] font-bold text-gray-500 truncate">{alert.time}</span>
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

