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

export const AccuracyLineChart = () => {
  const [data] = useState([
    { name: 'Mar 12', value: 2400 },
    { name: 'Mar 13', value: 1698 },
    { name: 'Mar 14', value: 3800 },
    { name: 'Mar 15', value: 3560 },
    { name: 'Mar 16', value: 3100 },
    { name: 'Mar 17', value: 4500 },
    { name: 'Mar 18', value: 5200 },
  ]);

  return (
    <div className="card-glass p-5 h-full flex flex-col shadow-sm border border-gray-200 dark:border-[#1f232d] bg-white dark:bg-[#1e1e1e]">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h3 className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-widest leading-none">Accuracy Report</h3>
        <span className="text-[8px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 dark:bg-[#252525] px-2 py-1 rounded">Week</span>
      </div>
      
      <div className="flex-1 w-full min-h-[140px] pb-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EC3292" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#EC3292" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="currentColor" strokeDasharray="4 4" className="text-gray-200 dark:text-white opacity-40 dark:opacity-[0.03]" />
            <XAxis 
               dataKey="name" 
               axisLine={false} 
               tickLine={false} 
               tick={{fontSize: 9, fill: '#666', fontWeight: 600}} 
               dy={10}
            />
            <YAxis 
               axisLine={false} 
               tickLine={false} 
               tick={{fontSize: 9, fill: '#666', fontWeight: 600}}
               tickFormatter={(val) => val === 0 ? '0' : `${val / 1000}K`}
            />
            {/* The dotted pink baseline */}
            <ReferenceLine y={3560} stroke="#EC3292" strokeDasharray="3 3" opacity={0.6} />
            <Tooltip 
               cursor={false}
               content={({ active, payload }) => {
                 if (active && payload && payload.length) {
                   return (
                     <div className="bg-[#EC3292] text-white text-[10px] px-2.5 py-1 rounded shadow-md font-bold">
                       ${payload[0].value}
                     </div>
                   );
                 }
                 return null;
               }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#EC3292" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const AccuracyCircularCard = () => {
  return (
    <div className="card-glass p-5 h-full flex flex-col justify-between shadow-sm border border-gray-200 dark:border-[#1f232d] bg-white dark:bg-[#1e1e1e]">
      <div className="flex items-center justify-between shrink-0 mb-6">
        <h3 className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-widest leading-none">Accuracy Status</h3>
        <span className="text-[8px] font-bold uppercase tracking-widest text-gray-500 bg-gray-100 dark:bg-[#252525] px-2 py-1 rounded">Week</span>
      </div>
      
      <div className="flex flex-1 items-center justify-between">
        <div className="space-y-6 w-full">
          <div className="w-full">
             <p className="text-[9px] text-gray-500 dark:text-[#888] font-bold uppercase tracking-widest mb-1.5">Session</p>
             <p className="text-[28px] font-bold text-gray-900 dark:text-white leading-none tracking-tight">43,546</p>
          </div>
          <div className="w-full">
            <p className="text-[9px] text-gray-500 dark:text-[#888] font-bold uppercase tracking-widest mb-1.5">Stretch Goal</p>
            <p className="text-[28px] font-bold text-gray-900 dark:text-white leading-none tracking-tight text-accent">5,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};
