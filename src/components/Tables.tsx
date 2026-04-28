import React from 'react';
import { cn } from '../lib/utils';
import { Search, X, CheckCircle2, Layout } from 'lucide-react';

interface TableCardProps {
  title: string;
  tabs?: string[];
  columns: string[];
  data: any[];
  className?: string;
}

export const TableCard = ({ title, tabs, columns, data, className }: TableCardProps) => {
  return (
    <div className={cn("card-glass p-6 flex flex-col group/table shadow-sm", className)}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight capitalize">{title}</h3>
        {tabs && (
          <div className="flex gap-5 border-b border-gray-200 dark:border-white/[0.05]">
             {tabs.map((tab, i) => (
               <span key={tab} className={cn("text-xs font-semibold cursor-pointer relative pb-2 transition-colors", i === 0 ? "text-accent" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300")}>
                  {tab}
                  {i === 0 && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-t-full"></span>}
               </span>
             ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/[0.05]">
              {columns.map((col, i) => (
                <th key={col} className="pb-3 text-[10px] uppercase font-bold tracking-wider text-gray-500 pl-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 group/header cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 transition-colors">
                    {col}
                    <div className="flex flex-col opacity-0 group-hover/header:opacity-100 transition-opacity">
                       <ChevronDownIcon />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/[0.02]">
            {data.map((row, i) => (
              <tr key={i} className={cn("group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors", row.active ? "bg-accent/5 dark:bg-accent/10 relative" : "")}>
                {Object.values(row).map((val: any, j) => {
                  if (typeof val === 'string' || typeof val === 'number') {
                    if (row.active && j === 0) {
                       return (
                         <td key={j} className="py-3 pl-4 text-xs font-medium text-gray-900 dark:text-white flex items-center gap-2 relative">
                            {row.active && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent rounded-r-full"></div>}
                            {val}
                         </td>
                       )
                    }
                    return (
                      <td key={j} className={cn("py-3 pl-4 text-xs font-medium", row.active ? "text-gray-800 dark:text-gray-300" : "text-gray-500")}>
                        {row.active && j === 0 && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent rounded-r-full"></div>}
                        {val}
                      </td>
                    );
                  }
                  return <td key={j} className="py-3 pl-4">{val}</td>;
                })}
                <td className="py-3 text-right pr-4">
                   <button className="text-gray-500 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all">
                     <X size={12} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ChevronDownIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export const AnomalyTable = ({ isRow3 }: { isRow3?: boolean }) => {
  const data = [
    { object: 'Person', confidence: '98.5%', status: <CheckCircle2 size={14} className="text-[#00d1ff]" /> },
    { object: 'Vehicle', confidence: '92.1%', status: <CheckCircle2 size={14} className="text-[#00d1ff]" /> },
    { object: 'Vehicle', confidence: '88.3%', status: <CheckCircle2 size={14} className="text-[#00d1ff]" /> },
    { object: 'Bicycle', confidence: '74.2%', status: <div className="w-3.5 h-3.5 rounded-full border border-gray-300 dark:border-gray-600"></div> },
    { object: 'Person', confidence: '95.8%', status: <CheckCircle2 size={14} className="text-[#00d1ff]" /> },
  ];

  return (
    <TableCard 
      title="Anomaly Events" 
      columns={['Object', 'Confidence', 'Status']} 
      data={data}
      className={isRow3 ? "border-none shadow-none bg-transparent h-full pb-0" : "col-span-1 h-full"}
    />
  );
}

export const ImageAnnotationTable = ({ isRow3 }: { isRow3?: boolean }) => {
  const data = [
    { camera: 'Cam 03', target: 'Vehicle', duration: '12m 04s' },
    { camera: 'Cam 08', target: 'Person', duration: '02m 01s', active: true },
    { camera: 'Cam 01', target: 'Truck', duration: '45m 12s' },
    { camera: 'Cam 02', target: 'Person', duration: '01m 20s' },
    { camera: 'Cam 03', target: 'Vehicle', duration: '10m 05s' },
  ];

  return (
    <TableCard 
      title="Active Tracking" 
      tabs={['All', 'Vehicles', 'Persons']}
      columns={['Camera ID', 'Target', 'Duration']} 
      data={data}
      className={isRow3 ? "border-none shadow-none bg-transparent h-full pb-0" : "col-span-2 h-full"}
    />
  );
}

export const RequestList = () => {
  const data = [
    { from: 'Cam 01', time: <div className="flex items-center gap-3 text-xs text-gray-500">Processing <div className="w-16 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden"><div className="w-1/3 h-full bg-[#e34255]"></div></div></div>, sum: '12:45:03' },
    { from: 'Cam 04', time: <div className="flex items-center gap-3 text-xs text-accent">Tracking <div className="w-16 h-1 bg-accent/20 rounded-full overflow-hidden"><div className="w-2/3 h-full bg-accent"></div></div></div>, sum: '12:44:12' },
    { from: 'Cam 08', time: <div className="flex items-center gap-3 text-xs text-accent">Tracking <div className="w-16 h-1 bg-accent/20 rounded-full overflow-hidden"><div className="w-3/4 h-full bg-accent"></div></div></div>, sum: '12:42:55' },
  ];

  return (
    <div className="card-glass p-6 flex flex-col col-span-2 shadow-sm h-full">
       <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <Layout size={12} className="text-gray-500 dark:text-gray-400" />
             </div>
             <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight capitalize">Event Feed</h3>
          </div>
          <div className="flex gap-5 border-b border-gray-200 dark:border-white/[0.05]">
             <span className="text-xs font-semibold text-accent cursor-pointer relative pb-2 transition-colors">Alerts <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-t-full"></span></span>
             <span className="text-xs font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 cursor-pointer transition-colors pb-2">Logs</span>
          </div>
       </div>

       <div className="flex-1 overflow-auto custom-scrollbar">
         <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/[0.05]">
                 <th className="pb-3 text-[10px] uppercase font-bold tracking-wider text-gray-500 pl-2 whitespace-nowrap">
                   <div className="flex items-center gap-1.5 group/header cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Source<ChevronDownIcon /></div>
                 </th>
                 <th className="pb-3 text-[10px] uppercase font-bold tracking-wider text-gray-500 whitespace-nowrap">
                   <div className="flex items-center gap-1.5 group/header cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Status<ChevronDownIcon /></div>
                 </th>
                 <th className="pb-3 text-[10px] uppercase font-bold tracking-wider text-gray-500 whitespace-nowrap">
                   <div className="flex items-center gap-1.5 group/header cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Timestamp<ChevronDownIcon /></div>
                 </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.02]">
               {data.map((row, i) => (
                  <tr key={i} className="group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors rounded-lg">
                     <td className="py-3 pl-2 text-xs font-medium text-gray-700 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">{row.from}</td>
                     <td className="py-3 font-medium">{row.time}</td>
                     <td className="py-3 text-xs font-medium text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-400 transition-colors">{row.sum}</td>
                  </tr>
               ))}
            </tbody>
         </table>
       </div>
    </div>
  )
}
