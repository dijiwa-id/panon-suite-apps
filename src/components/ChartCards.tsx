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
    <div className="card-glass p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8 shrink-0">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight capitalize">Accuracy Report</h3>
        <span className="text-[10px] font-medium text-gray-500 bg-gray-100 dark:bg-[#2a2a2a] px-3 py-1 rounded-md">Week</span>
      </div>
      
      <div className="flex-1 w-full min-h-[160px] pb-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="currentColor" strokeDasharray="4 4" className="text-gray-200 dark:text-white opacity-40 dark:opacity-5" />
            <XAxis 
               dataKey="name" 
               axisLine={false} 
               tickLine={false} 
               tick={{fontSize: 9, fill: '#666'}} 
               dy={10}
            />
            <YAxis 
               axisLine={false} 
               tickLine={false} 
               tick={{fontSize: 9, fill: '#666'}}
               tickFormatter={(val) => val === 0 ? '0' : `${val / 1000}K`}
            />
            {/* The dotted pink baseline */}
            <ReferenceLine y={3560} stroke="#ec4899" strokeDasharray="3 3" opacity={0.8} />
            <Tooltip 
               cursor={false}
               content={({ active, payload }) => {
                 if (active && payload && payload.length) {
                   return (
                     <div className="bg-[#ec4899] text-white text-[11px] px-3 py-1.5 rounded-full font-bold shadow-[0_4px_12px_rgba(236,72,153,0.4)]">
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
              stroke="#ec4899" 
              strokeWidth={3}
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
    <div className="card-glass p-6 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between shrink-0 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight capitalize">Accuracy Report</h3>
        <span className="text-[10px] font-medium text-gray-500 bg-gray-100 dark:bg-[#2a2a2a] px-3 py-1 rounded-md">Week</span>
      </div>
      
      <div className="flex flex-1 items-center justify-between">
        <div className="space-y-6">
          <div>
             <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium mb-1 capitalize">Session</p>
            <p className="text-[32px] font-bold text-gray-900 dark:text-white leading-none tracking-tight">43,546</p>
          </div>
          <div>
            <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium mb-1 capitalize">Stretch Goal</p>
            <p className="text-[32px] font-bold text-gray-900 dark:text-white leading-none tracking-tight">5,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};
