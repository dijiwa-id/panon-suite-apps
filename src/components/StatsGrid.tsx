import React from 'react';
import { cn } from '../lib/utils';
import { ArrowDownToLine } from 'lucide-react';

export const StatsGrid = () => {
  const stats = [
    { label: "Vehicle Rate", value: "160" },
    { label: "Total Vehicle", value: "222" },
    { label: "FPS", value: "30" },
    { label: "Stream", value: "23" },
  ];

  const detections = [
    { label: "People Detection", color: "bg-accent", width: "85%" },
    { label: "Vehicles", color: "bg-[#EC3292]", width: "70%" },
    { label: "Anomaly", color: "bg-[#f59e0b]", width: "80%" },
    { label: "Objects", color: "bg-gray-400 dark:bg-gray-600", width: "25%" },
  ];

  return (
    <div className="card-glass flex flex-col justify-between h-full p-0 shadow-sm border border-gray-200 dark:border-[#222] bg-white dark:bg-[#1e1e1e]">
      {/* Top Stats */}
      <div className="p-5 pb-4">
        <div className="grid grid-cols-4 gap-4 divide-x divide-gray-200 dark:divide-[#222]/60">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <p className="text-[20px] font-bold text-gray-900 dark:text-white mb-1.5 leading-none tracking-tight">{stat.value}</p>
              <p className="text-[10px] text-gray-500 dark:text-[#888] font-bold tracking-tight text-center whitespace-nowrap">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-5 h-[1px] bg-gray-200 dark:bg-[#222]/60"></div>

      {/* Detections */}
      <div className="p-5 pt-4 flex flex-col justify-between flex-1 gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-5 h-5 rounded flex items-center justify-center bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400">
                <ArrowDownToLine size={10} strokeWidth={2} />
             </div>
             <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight leading-none">Total Detection</h3>
          </div>
          <span className="text-[10px] font-bold tracking-tight text-gray-500 bg-gray-100 dark:bg-[#252525] px-2 py-1 rounded">Week</span>
        </div>

        <div className="flex gap-4 sm:gap-4 items-end">
          <div className="flex flex-col items-start min-w-[70px]">
             <span className="text-[28px] font-bold text-gray-900 dark:text-white leading-none mb-1.5 tracking-tight">123</span>
             <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                <span className="text-accent text-[9px] font-bold">+12%</span>
                <span className="text-gray-500 dark:text-[#888] text-[9px] font-bold tracking-tight">Vs Yesterday</span>
             </div>
          </div>

          <div className="flex-1 space-y-2.5 w-full">
            {detections.map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] font-bold tracking-tight text-[#666] dark:text-gray-500 w-24 truncate">{d.label}</span>
                <div className="flex-1 h-[2px] bg-gray-200 dark:bg-[#252525] rounded-none overflow-hidden">
                  <div className={cn("h-full rounded-none transition-all duration-1000", d.color)} style={{ width: d.width }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
