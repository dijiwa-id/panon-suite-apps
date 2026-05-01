import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Filter, Calendar, ChevronDown, Eye, X, Download, RefreshCw, AlertCircle, Clock, Video } from 'lucide-react';

const MOCK_LOGS = [
  { id: 'THA1A-testing-20260429152512', time: '29 Apr 2026, 15:25:12', category: 'APD', module: 'ERM', camera: 'Rastek', cameraId: 'THA1A', personName: 'not recognized', image: 'https://images.unsplash.com/photo-1549880338-65dd4bd82f28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'THA1A-testing-20260429152411', time: '29 Apr 2026, 15:24:11', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized', image: 'https://images.unsplash.com/photo-1549880338-65dd4bd82f28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'THA1A-testing-20260429152409', time: '29 Apr 2026, 15:24:09', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized', image: 'https://images.unsplash.com/photo-1549880338-65dd4bd82f28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'THA1A-testing-20260429152257', time: '29 Apr 2026, 15:22:57', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized', image: 'https://images.unsplash.com/photo-1549880338-65dd4bd82f28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'THA1A-testing-20260429152243', time: '29 Apr 2026, 15:22:43', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized', image: 'https://images.unsplash.com/photo-1549880338-65dd4bd82f28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'THA1A-testing-20260429152239', time: '29 Apr 2026, 15:22:39', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized', image: 'https://images.unsplash.com/photo-1549880338-65dd4bd82f28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'THA1A-testing-20260429152224', time: '29 Apr 2026, 15:22:24', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized', image: 'https://images.unsplash.com/photo-1549880338-65dd4bd82f28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'THA1A-testing-20260429152131', time: '29 Apr 2026, 15:21:31', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized', image: 'https://images.unsplash.com/photo-1549880338-65dd4bd82f28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'THA1A-testing-20260429152115', time: '29 Apr 2026, 15:21:15', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized', image: 'https://images.unsplash.com/photo-1549880338-65dd4bd82f28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'THA1A-testing-20260429152110', time: '29 Apr 2026, 15:21:10', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized', image: 'https://images.unsplash.com/photo-1549880338-65dd4bd82f28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

export const DeployDetectionLog = () => {
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="flex-1">
            <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Detection Logs</h1>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Comprehensive record of all identified system events and violations.</p>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex flex-col gap-6">
           
           {/* Filters Bar */}
           <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] h-[60px] p-[10px] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                 <div className="flex items-center gap-2 pr-4 border-r border-gray-200 dark:border-[#222]">
                   <Filter size={14} className="text-gray-400" />
                   <span className="text-[11px] font-black capitalize tracking-widest text-gray-500">Filters</span>
                 </div>
                 
                 <div className="flex items-center gap-3">
                   <div className="relative">
                     <select className="appearance-none bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] text-gray-700 dark:text-gray-300 text-[10px] uppercase font-bold h-[30px] rounded-[6px] pl-2 pr-6 focus:outline-none focus:ring-1 focus:ring-[#52C5F3] min-w-[80px] cursor-pointer">
                       <option>all</option>
                       <option>APD</option>
                       <option>Intrusion</option>
                     </select>
                     <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                   </div>
                   
                   <div className="relative">
                     <select className="appearance-none bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] text-gray-700 dark:text-gray-300 text-[10px] uppercase font-bold h-[30px] rounded-[6px] pl-2 pr-6 focus:outline-none focus:ring-1 focus:ring-[#52C5F3] min-w-[80px] cursor-pointer">
                       <option>all</option>
                       <option>ERM</option>
                       <option>Safety</option>
                     </select>
                     <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                   </div>
                   
                   <div className="relative">
                     <select className="appearance-none bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] text-gray-700 dark:text-gray-300 text-[10px] uppercase font-bold h-[30px] rounded-[6px] pl-2 pr-6 focus:outline-none focus:ring-1 focus:ring-[#52C5F3] min-w-[80px] cursor-pointer">
                       <option>all</option>
                       <option>RASTEK</option>
                     </select>
                     <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                   </div>
                 </div>
              </div>
              
              <div className="flex items-center gap-3">
                 <button className="flex items-center gap-2 bg-white dark:bg-[#161616] border border-gray-200 dark:border-[#222] px-3 h-[30px] rounded-[8px] text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors shadow-sm">
                   <Calendar size={14} className="text-gray-400" />
                   <span>Apr 01, 2026 - Apr 29, 2026</span>
                 </button>
                 <button 
                    onClick={handleRefresh}
                    className={cn(
                      "flex items-center justify-center w-[30px] h-[30px] rounded-[8px] bg-white dark:bg-[#161616] border border-gray-200 dark:border-[#222] text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all shadow-sm",
                      isRefreshing ? "opacity-70 cursor-not-allowed" : ""
                    )} 
                    title="Refresh"
                    disabled={isRefreshing}
                 >
                    <RefreshCw size={14} className={isRefreshing ? "animate-spin text-[#52C5F3]" : ""} />
                 </button>
                 <button className="bg-[#1c1c1c] border border-gray-700 h-[30px] text-white rounded-[8px] text-xs font-bold tracking-wide px-4 leading-[12px] hover:bg-[#2a2a2a] transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <Download size={14} />
                    Export
                 </button>
              </div>
           </div>

           {/* Table */}
           <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-xl shadow-sm overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="border-b border-gray-100 dark:border-[#222]">
                     <th className="px-5 py-4 text-[10px] font-black tracking-widest capitalize text-gray-500 whitespace-nowrap">Detection ID</th>
                     <th className="px-5 py-4 text-[10px] font-black tracking-widest capitalize text-gray-500 whitespace-nowrap">Time</th>
                     <th className="px-5 py-4 text-[10px] font-black tracking-widest capitalize text-gray-500 whitespace-nowrap">Category</th>
                     <th className="px-5 py-4 text-[10px] font-black tracking-widest capitalize text-gray-500 whitespace-nowrap">Module</th>
                     <th className="px-5 py-4 text-[10px] font-black tracking-widest capitalize text-gray-500 whitespace-nowrap">Camera</th>
                     <th className="px-5 py-4 text-[10px] font-black tracking-widest capitalize text-gray-500 whitespace-nowrap">Camera ID</th>
                     <th className="px-5 py-4 text-[10px] font-black tracking-widest capitalize text-gray-500 whitespace-nowrap">Person Name</th>
                     <th className="px-5 py-4 text-[10px] font-black tracking-widest capitalize text-gray-500 text-right whitespace-nowrap">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100 dark:divide-[#222]">
                   {MOCK_LOGS.map((log, idx) => (
                     <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-[#252525]/30 transition-colors">
                       <td className="px-5 py-4">
                         <span className="text-[11px] font-bold text-[#52C5F3] cursor-pointer hover:underline">{log.id}</span>
                       </td>
                       <td className="px-5 py-4 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{log.time}</td>
                       <td className="px-5 py-4">
                         <span className="bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-[10px] font-black tracking-widest capitalize">{log.category}</span>
                       </td>
                       <td className="px-5 py-4 text-xs font-medium text-gray-800 dark:text-gray-200">{log.module}</td>
                       <td className="px-5 py-4 text-xs font-black text-gray-800 dark:text-gray-200 capitalize tracking-wide">{log.camera}</td>
                       <td className="px-5 py-4 text-xs text-gray-500">{log.cameraId}</td>
                       <td className="px-5 py-4 text-xs italic text-gray-500">{log.personName}</td>
                       <td className="px-5 py-4 text-right">
                         <button 
                           onClick={() => setSelectedLog(log)}
                           className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#52C5F3]/10 text-[#52C5F3] rounded-[6px] text-[11px] font-bold tracking-wide hover:bg-[#52C5F3]/20 transition-colors"
                         >
                           <Eye size={14} />
                           Detail
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>

        </div>
      </div>

      {/* Detail Dialog Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-[11px] w-full max-w-[450px] border border-gray-200 dark:border-[#2a2a2a] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 dark:border-[#222] bg-gray-50 dark:bg-[#161616] flex justify-between items-center shrink-0">
               <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 bg-red-500/10 text-red-500 border border-red-500/20">
                       <AlertCircle size={16} />
                   </div>
                   <div>
                     <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1">Detection Details</h3>
                     <p className="text-[9px] text-gray-500 font-mono uppercase tracking-widest font-black leading-none">{selectedLog.id}</p>
                   </div>
               </div>
               <button onClick={() => setSelectedLog(null)} className="p-1.5 rounded-[8px] text-gray-400 hover:text-gray-900 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm dark:hover:text-white dark:hover:bg-[#252525] dark:hover:border-[#333] transition-all">
                  <X size={16} />
               </button>
            </div>
            
            {/* Content */}
            <div className="p-5 space-y-5 flex-1 overflow-y-auto custom-scrollbar max-h-[70vh]">
               {/* Evidence Image */}
               <div className="relative w-full aspect-video rounded-[8px] overflow-hidden bg-[#111] border border-gray-100 dark:border-[#2a2a2a]">
                 <img src={selectedLog.image} alt="Detection Snapshot" className="w-full h-full object-cover" />
                 <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded-[4px] shadow-sm animate-pulse">
                   Violations Detected
                 </div>
               </div>
               
               {/* Detail Items */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <span className="text-[10px] uppercase font-black text-gray-500 tracking-widest flex items-center gap-1.5"><Clock size={12}/> Time of Event</span>
                     <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">{selectedLog.time}</p>
                  </div>
                  <div className="space-y-1">
                     <span className="text-[10px] uppercase font-black text-gray-500 tracking-widest flex items-center gap-1.5"><AlertCircle size={12}/> Category</span>
                     <p className="text-xs font-semibold text-[#52C5F3] bg-[#52C5F3]/10 w-fit px-2 py-0.5 rounded-[4px] border border-[#52C5F3]/20 uppercase">{selectedLog.category}</p>
                  </div>
                  <div className="space-y-1">
                     <span className="text-[10px] uppercase font-black text-gray-500 tracking-widest flex items-center gap-1.5"><Video size={12}/> Camera source</span>
                     <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase">{selectedLog.camera} <span className="text-gray-400 font-normal">({selectedLog.cameraId})</span></p>
                  </div>
                  <div className="space-y-1">
                     <span className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Module</span>
                     <p className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#252525] w-fit px-2 py-0.5 rounded-[4px] border border-gray-200 dark:border-[#333] uppercase">{selectedLog.module}</p>
                  </div>
               </div>
               
               <div className="space-y-1 pt-4 border-t border-gray-100 dark:border-[#222]">
                  <span className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Identity</span>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 italic">{selectedLog.personName}</p>
               </div>
            </div>
            
            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-100 dark:border-[#222] bg-gray-50/50 dark:bg-[#161616] flex justify-end shrink-0">
                <button 
                  onClick={() => setSelectedLog(null)}
                  className="bg-[#1c1c1c] border border-gray-700 h-8 flex flex-row items-center gap-2 text-white rounded-full text-xs font-bold tracking-wide px-6 hover:bg-[#2a2a2a] transition-colors shadow-sm"
                >
                  <Download size={14}/>
                  Export Report
                </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
