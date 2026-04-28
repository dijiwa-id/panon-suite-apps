import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Search, X, CheckCircle2, Layout, ArrowUpDown } from 'lucide-react';

interface TableCardProps {
  title: string;
  tabs?: string[];
  columns: string[];
  data: any[];
  className?: string;
}

export const TableCard = ({ title, tabs, columns, data, className }: TableCardProps) => {
  const [activeTab, setActiveTab] = useState(tabs?.[0] || '');
  const [sortCol, setSortCol] = useState(columns[0]);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const colKeys = Object.keys(a);
    const colIndex = columns.indexOf(sortCol);
    if (colIndex === -1 || colIndex >= colKeys.length) return 0;
    
    // Attempt to map column index back to data key
    // We assume data objects preserve key order which matches column order, 
    // or we can sort by Object.values(item)[colIndex]
    const aVal = Object.values(a)[colIndex];
    const bVal = Object.values(b)[colIndex];
    
    if (aVal === bVal) return 0;
    
    // Basic string comparison, handle numbers appropriately if needed
    const compare = String(aVal).localeCompare(String(bVal), undefined, {numeric: true});
    return sortAsc ? compare : -compare;
  });

  return (
    <div className={cn("card-glass p-5 flex flex-col group/table shadow-sm border border-gray-200 dark:border-[#1f232d] bg-white dark:bg-[#1e1e1e]", className)}>
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-widest leading-none">{title}</h3>
        {tabs && (
          <div className="flex gap-4 border-b border-gray-200 dark:border-[#1f232d]">
             {tabs.map((tab, i) => (
               <span 
                 key={tab} 
                 onClick={() => setActiveTab(tab)}
                 className={cn("text-[9px] font-bold uppercase tracking-widest cursor-pointer relative pb-1.5 transition-colors", activeTab === tab ? "text-accent" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300")}
               >
                  {tab}
                  {activeTab === tab && <span className="absolute bottom-[-1px] left-0 w-full h-[1px] bg-accent transition-all duration-300"></span>}
               </span>
             ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar relative">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white/95 dark:bg-[#1e1e1e]/95 backdrop-blur-sm z-10">
            <tr className="border-b border-gray-200 dark:border-[#1f232d]">
              {columns.map((col, i) => (
                <th key={col} className="pb-2 text-[9px] uppercase font-bold tracking-widest text-gray-400 pl-3 whitespace-nowrap select-none">
                  <div 
                    onClick={() => handleSort(col)}
                    className="flex items-center gap-1.5 group/header cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 transition-colors w-fit"
                  >
                    {col}
                    <ArrowUpDown size={10} className={cn("transition-opacity", sortCol === col ? "text-accent opacity-100" : "opacity-0 group-hover/header:opacity-50")} />
                  </div>
                </th>
              ))}
              <th className="pb-2 w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-[#1f232d]/60">
            {sortedData.map((row, i) => (
              <tr key={i} className={cn("group hover:bg-gray-50/50 dark:hover:bg-[#252525]/30 transition-colors cursor-pointer", row.active ? "bg-accent/5 dark:bg-accent/[0.03] relative" : "")}>
                {Object.values(row).map((val: any, j) => {
                  if (typeof val === 'string' || typeof val === 'number') {
                    if (row.active && j === 0) {
                       return (
                         <td key={j} className="py-2.5 pl-3 text-[10px] font-medium text-gray-900 dark:text-white flex items-center gap-2 relative">
                            {row.active && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent"></div>}
                            {val}
                         </td>
                       )
                    }
                    return (
                      <td key={j} className={cn("py-2.5 pl-3 text-[10px] font-medium transition-colors", row.active ? "text-gray-800 dark:text-gray-300" : "text-gray-500 dark:text-[#888] group-hover:text-gray-700 dark:group-hover:text-gray-300")}>
                        {row.active && j === 0 && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent"></div>}
                        {val}
                      </td>
                    );
                  }
                  return <td key={j} className="py-2.5 pl-3">{val}</td>;
                })}
                <td className="py-2.5 text-right pr-3 shrink-0">
                   <button className="text-gray-400 hover:text-accent dark:hover:text-accent bg-gray-100 dark:bg-[#1a1a1a] hover:bg-accent/10 border border-transparent hover:border-accent/20 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all">
                     <X size={10} />
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
    { object: 'Person', confidence: '98.5%', status: <CheckCircle2 size={12} className="text-secondary" /> },
    { object: 'Vehicle', confidence: '92.1%', status: <CheckCircle2 size={12} className="text-accent" /> },
    { object: 'Vehicle', confidence: '88.3%', status: <CheckCircle2 size={12} className="text-accent" /> },
    { object: 'Bicycle', confidence: '74.2%', status: <div className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-500"></div> },
    { object: 'Person', confidence: '95.8%', status: <CheckCircle2 size={12} className="text-secondary" /> },
  ];

  return (
    <TableCard 
      title="Anomaly Events" 
      columns={['Object', 'Confidence', 'Status']} 
      data={data}
      className={isRow3 ? "border-none shadow-none bg-transparent h-full pb-0 dark:bg-transparent" : "col-span-1 h-full"}
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
      className={isRow3 ? "border-none shadow-none bg-transparent h-full pb-0 dark:bg-transparent" : "col-span-2 h-full"}
    />
  );
}

export const RequestList = () => {
  const [activeTab, setActiveTab] = useState('Alerts');
  const [sortCol, setSortCol] = useState('Timestamp');
  const [sortAsc, setSortAsc] = useState(false);

  const data = [
    { from: 'Cam 01', time: <div className="flex items-center gap-3 text-[10px] text-gray-500">Processing <div className="w-16 h-[2px] bg-gray-200 dark:bg-[#2a2a2a] rounded-none overflow-hidden"><div className="w-1/3 h-full bg-secondary"></div></div></div>, sum: '12:45:03' },
    { from: 'Cam 04', time: <div className="flex items-center gap-3 text-[10px] text-accent">Tracking <div className="w-16 h-[2px] bg-accent/20 rounded-none overflow-hidden"><div className="w-2/3 h-full bg-accent"></div></div></div>, sum: '12:44:12' },
    { from: 'Cam 08', time: <div className="flex items-center gap-3 text-[10px] text-accent">Tracking <div className="w-16 h-[2px] bg-accent/20 rounded-none overflow-hidden"><div className="w-3/4 h-full bg-accent"></div></div></div>, sum: '12:42:55' },
  ];

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
  };

  const sortedData = [...data].sort((a, b) => {
     let aVal, bVal;
     if (sortCol === 'Source') { aVal = a.from; bVal = b.from; }
     else if (sortCol === 'Status') { return 0; } // Assuming we don't sort by the JSX element for now
     else { aVal = a.sum; bVal = b.sum; }
     
     const compare = String(aVal).localeCompare(String(bVal), undefined, {numeric: true});
     return sortAsc ? compare : -compare;
  });

  return (
    <div className="card-glass p-5 flex flex-col col-span-2 shadow-sm h-full border border-gray-200 dark:border-[#1f232d] bg-white dark:bg-[#1e1e1e]">
       <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <div className="w-5 h-5 flex items-center justify-center rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <Layout size={10} className="text-gray-500 dark:text-gray-400" />
             </div>
             <h3 className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-widest leading-none">Event Feed</h3>
          </div>
          <div className="flex gap-4 border-b border-gray-200 dark:border-[#1f232d]">
             <span 
               onClick={() => setActiveTab('Alerts')}
               className={cn("text-[9px] font-bold uppercase tracking-widest cursor-pointer relative pb-1.5 transition-colors", activeTab === 'Alerts' ? "text-accent" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300")}
             >
                Alerts
                {activeTab === 'Alerts' && <span className="absolute bottom-[-1px] left-0 w-full h-[1px] bg-accent transition-all duration-300"></span>}
             </span>
             <span 
               onClick={() => setActiveTab('Logs')}
               className={cn("text-[9px] font-bold uppercase tracking-widest cursor-pointer relative pb-1.5 transition-colors", activeTab === 'Logs' ? "text-accent" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300")}
             >
                Logs
                {activeTab === 'Logs' && <span className="absolute bottom-[-1px] left-0 w-full h-[1px] bg-accent transition-all duration-300"></span>}
             </span>
          </div>
       </div>

       <div className="flex-1 overflow-auto custom-scrollbar relative">
         <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white/95 dark:bg-[#1e1e1e]/95 backdrop-blur-sm z-10">
              <tr className="border-b border-gray-200 dark:border-[#1f232d]">
                 <th className="pb-2 text-[9px] uppercase font-bold tracking-widest text-gray-400 pl-2 whitespace-nowrap">
                   <div onClick={() => handleSort('Source')} className="flex items-center gap-1.5 group/header cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 transition-colors w-fit select-none">
                     Source
                     <ArrowUpDown size={10} className={cn("transition-opacity", sortCol === 'Source' ? "text-accent opacity-100" : "opacity-0 group-hover/header:opacity-50")} />
                   </div>
                 </th>
                 <th className="pb-2 text-[9px] uppercase font-bold tracking-widest text-gray-400 whitespace-nowrap">
                   <div onClick={() => handleSort('Status')} className="flex items-center gap-1.5 group/header cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 transition-colors w-fit select-none">
                     Status
                     <ArrowUpDown size={10} className={cn("transition-opacity", sortCol === 'Status' ? "text-accent opacity-100" : "opacity-0 group-hover/header:opacity-50")} />
                   </div>
                 </th>
                 <th className="pb-2 text-[9px] uppercase font-bold tracking-widest text-gray-400 whitespace-nowrap">
                   <div onClick={() => handleSort('Timestamp')} className="flex items-center gap-1.5 group/header cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 transition-colors w-fit select-none">
                     Timestamp
                     <ArrowUpDown size={10} className={cn("transition-opacity", sortCol === 'Timestamp' ? "text-accent opacity-100" : "opacity-0 group-hover/header:opacity-50")} />
                   </div>
                 </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#1f232d]/60">
               {sortedData.map((row, i) => (
                  <tr key={i} className="group hover:bg-gray-50/50 dark:hover:bg-[#252525]/30 transition-colors cursor-pointer">
                     <td className="py-2.5 pl-2 text-[10px] font-bold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{row.from}</td>
                     <td className="py-2.5 font-medium">{row.time}</td>
                     <td className="py-2.5 text-[10px] font-medium text-gray-500 dark:text-[#888] transition-colors">{row.sum}</td>
                  </tr>
               ))}
            </tbody>
         </table>
       </div>
    </div>
  )
}
