import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Area,
  AreaChart,
  ReferenceLine
} from 'recharts';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

export const AccuracyLineChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [data] = useState([
    { name: 'Mar 12', value: 2400 },
    { name: 'Mar 13', value: 1698 },
    { name: 'Mar 14', value: 3800 },
    { name: 'Mar 15', value: 3560 },
    { name: 'Mar 16', value: 3100 },
    { name: 'Mar 17', value: 4500 },
    { name: 'Mar 18', value: 5200 },
  ]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1e1e] border border-[#222] text-white text-[10px] px-2.5 py-1.5 rounded shadow-md font-bold">
          <div className="text-gray-400 mb-0.5">{label}</div>
          <div style={{ color: payload[0].color || '#52C5F3' }}>
            Value: {payload[0].value}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card-glass p-5 h-full flex flex-col shadow-sm border border-gray-100 dark:border-[#222] bg-white dark:bg-[#1e1e1e] rounded-[11px] group">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">Accuracy Report</h3>
        <span className="text-[11px] font-medium tracking-tight text-gray-500 bg-[#161616] hover:bg-[#1a1a1a] cursor-pointer px-3 py-1.5 rounded-lg border border-[#222]">Week</span>
      </div>
      
      <div className="flex-1 w-full min-h-[140px] pb-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#52C5F3" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#52C5F3" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2a2a' : '#e5e7eb'} vertical={false} />
            <XAxis 
               dataKey="name" 
               axisLine={false} 
               tickLine={false} 
               tick={{fontSize: 10, fill: '#888', fontWeight: 600}} 
               dy={10}
            />
            <YAxis 
               axisLine={false} 
               tickLine={false} 
               tick={{fontSize: 10, fill: '#888', fontWeight: 600}}
               tickFormatter={(val) => val === 0 ? '0' : `${val / 1000}K`}
               ticks={[0, 1500, 3000, 4500, 6000]}
               domain={[0, 6000]}
            />
            <ReferenceLine y={3560} stroke={isDark ? '#333' : '#d1d5db'} strokeDasharray="3 3" opacity={0.8} />
            <Tooltip 
               cursor={{ stroke: isDark ? '#333' : '#e5e7eb', strokeWidth: 1, strokeDasharray: '3 3' }}
               content={<CustomTooltip />}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#52C5F3" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const AccuracyCircularCard = () => {
  return (
    <div className="card-glass p-5 h-full flex flex-col justify-between shadow-sm border border-gray-100 dark:border-[#222] bg-white dark:bg-[#1e1e1e] rounded-[11px] group">
      <div className="flex items-center justify-between shrink-0 mb-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">Accuracy Status</h3>
        <span className="text-[11px] font-medium tracking-tight text-gray-500 bg-[#161616] hover:bg-[#1a1a1a] cursor-pointer px-3 py-1.5 rounded-lg border border-[#222]">Week</span>
      </div>
      
      <div className="flex flex-1 items-center justify-between">
        <div className="space-y-6 w-full">
          <div className="w-full">
             <p className="text-[10px] text-gray-500 dark:text-[#888] font-bold tracking-tight mb-1.5">Session</p>
             <p className="text-xl font-bold text-gray-900 dark:text-white leading-none tracking-tight">43,546</p>
          </div>
          <div className="w-full">
            <p className="text-[10px] text-gray-500 dark:text-[#888] font-bold tracking-tight mb-1.5">Stretch Goal</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white leading-none tracking-tight text-accent">5,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};
