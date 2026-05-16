import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import { FileText, Download, Calendar } from 'lucide-react';
import { Card, Button, Input } from '../components/ui';
import { toast } from 'sonner';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';

const TREND_DATA = [
  { time: '08:00', helmet: 42, vest: 25 },
  { time: '09:00', helmet: 18, vest: 18 },
  { time: '10:00', helmet: 38, vest: 15 },
  { time: '11:00', helmet: 15, vest: 11 },
  { time: '12:00', helmet: 45, vest: 10 },
  { time: '13:00', helmet: 30, vest: 8 },
  { time: '14:00', helmet: 17, vest: 5 },
  { time: '15:00', helmet: 38, vest: 30 },
  { time: '16:00', helmet: 15, vest: 22 },
  { time: '17:00', helmet: 25, vest: 30 },
];

const BREAKDOWN_DATA = [
  { name: 'No Stay', value: 15, color: '#52C5F3' },
  { name: 'Crowd', value: 20, color: '#EC3292' },
  { name: 'Fire/Smoke', value: 10, color: '#8b5cf6' },
  { name: 'Helmet', value: 25, color: '#10b981' },
  { name: 'Vest', value: 15, color: '#f59e0b' },
  { name: 'Intrusion', value: 15, color: '#4b5563' },
];

const AREA_DATA = [
  { zone: 'Zone A', ppe: 12, intrusion: 5, fire: 2, other: 8 },
  { zone: 'Zone B', ppe: 15, intrusion: 6, fire: 3, other: 7 },
  { zone: 'Zone C', ppe: 25, intrusion: 4, fire: 5, other: 8 },
  { zone: 'Zone D', ppe: 18, intrusion: 7, fire: 2, other: 4 },
  { zone: 'Zone E', ppe: 14, intrusion: 6, fire: 3, other: 2 },
  { zone: 'Zone F', ppe: 24, intrusion: 5, fire: 4, other: 4 },
  { zone: 'Zone G', ppe: 26, intrusion: 3, fire: 3, other: 12 },
];

export const DeployReport = () => {
  const [activeTab, setActiveTab] = useState('Today');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleExport = () => {
    toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
      loading: 'Generating PDF Report...',
      success: 'Report downloaded successfully!',
      error: 'Failed to generate report'
    });
  };

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
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

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-[1600px] mx-auto flex flex-col h-full relative">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="flex-1">
            <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Deployment Reports</h1>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Analytics, intelligence summaries, and exportable data insights.</p>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex flex-col gap-6">
           
           {/* Top Controls */}
           <div className="flex flex-wrap items-center justify-between gap-4 card-glass bg-white dark:bg-[#1e1e1e] p-3 rounded-[11px] border border-gray-100 dark:border-[#222] shadow-sm">
             <div className="flex items-center gap-4">
               <div className="flex items-center bg-gray-100 dark:bg-[#252525] p-1 rounded-lg h-[30px]">
                 {['TODAY', 'Daily', 'Weekly', 'Monthly'].map((tab, idx) => (
                   <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={cn(
                       "px-4 h-full flex items-center text-xs font-bold rounded-md transition-colors",
                       idx === 3 ? "pl-[16px]" : "",
                       activeTab === tab 
                        ? "bg-[#52C5F3]/10 text-[#52C5F3] shadow-sm" 
                        : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                     )}
                   >
                     {tab}
                   </button>
                 ))}
               </div>
               <div className="flex items-center gap-2">
                 <div className="relative">
                   <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                     <Calendar size={14} />
                   </div>
                   <Input type="text" className="w-[120px] h-[30px] pr-8" defaultValue="01/07/2026" />
                 </div>
                 <span className="text-gray-400">—</span>
                 <div className="relative">
                   <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                     <Calendar size={14} />
                   </div>
                   <Input type="text" className="w-[120px] h-[30px] pr-8" defaultValue="23/07/2026" />
                 </div>
               </div>
             </div>
             
             <Button variant="primary" className="gap-2 h-8" onClick={handleExport}>
               <Download size={14} />
               Export PDF
             </Button>
           </div>
           
           {/* Document Preview Section */}
           <div className="flex flex-col items-center">
             <span className="text-[10px] font-black tracking-widest capitalize text-gray-400 mb-4">Document Preview</span>
             
             <div className="w-full bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-[11px] shadow-sm p-8 md:p-10 flex flex-col gap-8 max-w-[1200px] mx-auto">
                
                {/* Report Header */}
                <div className="text-center">
                  <h1 className="text-lg font-black tracking-tight text-gray-900 dark:text-white mb-2">IOH Vision AI — Safety Compliance Report</h1>
                  <p className="text-xs font-bold text-gray-500 capitalize tracking-widest">Period: {activeTab}</p>
                </div>
                
                {/* 4 Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border border-gray-100 dark:border-[#222] rounded-[11px] p-5 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#161616] shadow-sm">
                    <span className="text-[10px] font-black tracking-widest capitalize text-gray-500 mb-2">PPE Compliance</span>
                    <span className="text-4xl font-black text-[#10b981]">71%</span>
                  </div>
                  <div className="border border-gray-100 dark:border-[#222] rounded-[11px] p-5 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#161616] shadow-sm">
                    <span className="text-[10px] font-black tracking-widest capitalize text-gray-500 mb-2">Total Violations</span>
                    <span className="text-4xl font-black text-[#ef4444]">90</span>
                  </div>
                  <div className="border border-gray-100 dark:border-[#222] rounded-[11px] p-5 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#161616] shadow-sm">
                    <span className="text-[10px] font-black tracking-widest capitalize text-gray-500 mb-2">System Health</span>
                    <span className="text-4xl font-black text-[#10b981]">92%</span>
                  </div>
                  <div className="border border-gray-100 dark:border-[#222] rounded-[11px] p-5 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#161616] shadow-sm">
                    <span className="text-[10px] font-black tracking-widest capitalize text-gray-500 mb-2">Active Cameras</span>
                    <span className="text-4xl font-black text-[#52C5F3]">8<span className="text-2xl text-gray-400">/8</span></span>
                  </div>
                </div>
                
                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   
                   {/* Trend Analysis */}
                   <div className="border border-gray-100 dark:border-[#222] rounded-[11px] p-5 bg-gray-50 dark:bg-[#161616] shadow-sm flex flex-col">
                     <h3 className="text-xs font-black tracking-widest capitalize text-gray-900 dark:text-gray-200 mb-6">Trend Analysis</h3>
                     <div className="min-h-0 min-w-0 flex-1 w-full min-h-[220px]">
                       <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                         <LineChart data={TREND_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 20 }}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#2a2a2a' : '#f3f4f6'} strokeOpacity={0.6} />
                           <XAxis 
                            dataKey="time" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 9, fill: '#888', fontWeight: 600 }} 
                            dy={10} 
                            angle={-45}
                            textAnchor="end"
                           />
                           <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888', fontWeight: 600 }} width={35} />
                           <RechartsTooltip 
                             cursor={{ stroke: isDark ? '#333' : '#e5e7eb', strokeWidth: 1, strokeDasharray: '3 3' }}
                             content={<CustomTooltip />}
                           />
                           <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px', fontWeight: 600, color: '#888' }} iconType="circle" iconSize={6} />
                           <Line type="monotone" dataKey="helmet" name="Helmet" stroke="#52C5F3" strokeWidth={1.5} dot={false} activeDot={{ r: 4, fill: '#52C5F3', stroke: isDark ? '#161616' : '#fff', strokeWidth: 2 }} />
                           <Line type="monotone" dataKey="vest" name="Vest" stroke="#EC3292" strokeWidth={1.5} dot={false} activeDot={{ r: 4, fill: '#EC3292', stroke: isDark ? '#161616' : '#fff', strokeWidth: 2 }} />
                         </LineChart>
                       </ResponsiveContainer>
                     </div>
                   </div>
                   
                   {/* Violations Breakdown */}
                   <div className="border border-gray-100 dark:border-[#222] rounded-[11px] p-5 bg-gray-50 dark:bg-[#161616] shadow-sm flex flex-col">
                     <h3 className="text-xs font-black tracking-widest capitalize text-gray-900 dark:text-gray-200 mb-6">Violations Breakdown</h3>
                     <div className="min-h-0 min-w-0 flex-1 w-full min-h-[220px] flex items-center justify-center">
                       <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                         <PieChart>
                           <Pie
                             data={BREAKDOWN_DATA}
                             cx="50%"
                             cy="45%"
                             innerRadius={50}
                             outerRadius={65}
                             paddingAngle={4}
                             cornerRadius={4}
                             dataKey="value"
                             stroke="none"
                           >
                             {BREAKDOWN_DATA.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                           </Pie>
                           <RechartsTooltip content={<CustomTooltip />} />
                           <Legend 
                              wrapperStyle={{ fontSize: '10px', paddingTop: '10px', fontWeight: 600, color: '#888' }} 
                              iconType="circle" 
                              iconSize={6}
                              layout="horizontal"
                              verticalAlign="bottom"
                              align="center"
                           />
                         </PieChart>
                       </ResponsiveContainer>
                     </div>
                   </div>
                   
                   {/* Area Distribution */}
                   <div className="border border-gray-100 dark:border-[#222] rounded-[11px] p-5 bg-gray-50 dark:bg-[#161616] shadow-sm flex flex-col">
                     <h3 className="text-xs font-black tracking-widest capitalize text-gray-900 dark:text-gray-200 mb-6">Area Distribution</h3>
                     <div className="min-h-0 min-w-0 flex-1 w-full min-h-[220px]">
                       <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                         <BarChart data={AREA_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 20 }} barSize={16}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#2a2a2a' : '#f3f4f6'} strokeOpacity={0.6} />
                           <XAxis 
                            dataKey="zone" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 9, fill: '#888', fontWeight: 600 }} 
                            dy={10}
                            angle={-30}
                            textAnchor="end"
                           />
                           <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888', fontWeight: 600 }} width={35} />
                           <RechartsTooltip 
                             cursor={{ fill: isDark ? '#ffffff05' : '#00000003' }}
                             content={<CustomTooltip />}
                           />
                           <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px', fontWeight: 600, color: '#888' }} iconType="circle" iconSize={6} />
                           <Bar dataKey="ppe" name="PPE" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                           <Bar dataKey="intrusion" name="Intrusion" stackId="a" fill="#52C5F3" radius={[0, 0, 0, 0]} />
                           <Bar dataKey="fire" name="Fire" stackId="a" fill="#EC3292" radius={[0, 0, 0, 0]} />
                           <Bar dataKey="other" name="Other" stackId="a" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                         </BarChart>
                       </ResponsiveContainer>
                     </div>
                   </div>

                </div>

             </div>
           </div>

        </div>

      </div>
    </main>
  );
};
