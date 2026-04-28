import React from 'react';
import { cn } from '../lib/utils';
import { ArrowDownToLine } from 'lucide-react';

export const StatsGrid = () => {
  const stats = [
    { label: "Vehicle Rate", value: "160" },
    { label: "Total Vehicle", value: "222" },
    { label: "FPS", value: "30 %" },
    { label: "Stream", value: "23" },
  ];

  const detections = [
    { label: "People Detection", color: "bg-[#00d1ff]", width: "85%" },
    { label: "Lingerie", color: "bg-[#f59e0b]", width: "70%" },
    { label: "Anomaly", color: "bg-[#f97316]", width: "80%" },
    { label: "Etc", color: "bg-[#ec4899]", width: "25%" },
  ];

  return (
    <div className="card-glass flex flex-col justify-between h-full p-0">
      {/* Top Stats */}
      <div className="p-6 pb-5">
        <div className="grid grid-cols-4 gap-4 divide-x divide-gray-200 dark:divide-white/[0.05]">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <p className="text-[26px] font-bold text-gray-900 dark:text-white mb-2 leading-none tracking-tight">{stat.value}</p>
              <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium capitalize text-center">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-6 h-[1px] bg-gray-200 dark:bg-white/[0.05]"></div>

      {/* Detections */}
      <div className="p-6 pt-5 flex flex-col justify-between flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <div className="w-5 h-5 rounded-md flex items-center justify-center bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400">
                <ArrowDownToLine size={12} strokeWidth={2} />
             </div>
             <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight capitalize">Our Total Detection</h3>
          </div>
          <span className="text-[10px] font-medium text-gray-500 bg-gray-100 dark:bg-[#2a2a2a] px-3 py-1 rounded-md">Week</span>
        </div>

        <div className="flex gap-4 sm:gap-8 items-end">
          <div className="flex flex-col items-start min-w-[80px]">
             <span className="text-[40px] font-bold text-gray-900 dark:text-white leading-none mb-2 tracking-tight">123</span>
             <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                <span className="text-accent text-[11px] font-bold">+12%</span>
                <span className="text-gray-500 dark:text-gray-400 text-[10px] font-medium capitalize">Vs Yesterday</span>
             </div>
          </div>

          <div className="flex-1 space-y-3">
            {detections.map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 w-24 truncate capitalize">{d.label}</span>
                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all duration-1000", d.color)} style={{ width: d.width }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
