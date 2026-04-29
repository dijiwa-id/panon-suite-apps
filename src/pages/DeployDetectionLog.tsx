import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Filter, Calendar, ChevronDown, Eye } from 'lucide-react';

const MOCK_LOGS = [
  { id: 'THA1A-testing-20260429152512', time: '29 Apr 2026, 15:25:12', category: 'APD', module: 'ERM', camera: 'Rastek', cameraId: 'THA1A', personName: 'not recognized' },
  { id: 'THA1A-testing-20260429152411', time: '29 Apr 2026, 15:24:11', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized' },
  { id: 'THA1A-testing-20260429152409', time: '29 Apr 2026, 15:24:09', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized' },
  { id: 'THA1A-testing-20260429152257', time: '29 Apr 2026, 15:22:57', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized' },
  { id: 'THA1A-testing-20260429152243', time: '29 Apr 2026, 15:22:43', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized' },
  { id: 'THA1A-testing-20260429152239', time: '29 Apr 2026, 15:22:39', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized' },
  { id: 'THA1A-testing-20260429152224', time: '29 Apr 2026, 15:22:24', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized' },
  { id: 'THA1A-testing-20260429152131', time: '29 Apr 2026, 15:21:31', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized' },
  { id: 'THA1A-testing-20260429152115', time: '29 Apr 2026, 15:21:15', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized' },
  { id: 'THA1A-testing-20260429152110', time: '29 Apr 2026, 15:21:10', category: 'APD', module: 'ERM', camera: 'RASTEK', cameraId: 'THA1A', personName: 'not recognized' },
];

export const DeployDetectionLog = () => {
  const location = useLocation();

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#161616] p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
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
           <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-xl p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                 <div className="flex items-center gap-2 pr-4 border-r border-gray-200 dark:border-[#222]">
                   <Filter size={14} className="text-gray-400" />
                   <span className="text-[11px] font-black capitalize tracking-widest text-gray-500">Filters</span>
                 </div>
                 
                 <div className="flex items-center gap-3">
                   <div className="relative">
                     <select className="appearance-none bg-white dark:bg-[#161616] border border-gray-200 dark:border-[#222] text-gray-700 dark:text-gray-300 text-xs rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-[#52C5F3] min-w-[120px]">
                       <option>all</option>
                       <option>APD</option>
                       <option>Intrusion</option>
                     </select>
                     <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                   </div>
                   
                   <div className="relative">
                     <select className="appearance-none bg-white dark:bg-[#161616] border border-gray-200 dark:border-[#222] text-gray-700 dark:text-gray-300 text-xs rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-[#52C5F3] min-w-[120px]">
                       <option>all</option>
                       <option>ERM</option>
                       <option>Safety</option>
                     </select>
                     <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                   </div>
                   
                   <div className="relative">
                     <select className="appearance-none bg-white dark:bg-[#161616] border border-gray-200 dark:border-[#222] text-gray-700 dark:text-gray-300 text-xs rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-[#52C5F3] min-w-[120px]">
                       <option>all</option>
                       <option>RASTEK</option>
                     </select>
                     <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                   </div>
                 </div>
              </div>
              
              <div className="flex items-center gap-3">
                 <button className="flex items-center gap-2 bg-white dark:bg-[#161616] border border-gray-200 dark:border-[#222] px-3 py-2 rounded-lg text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors">
                   <Calendar size={14} className="text-gray-400" />
                   <span>Apr 01, 2026 - Apr 29, 2026</span>
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
                         <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#52C5F3]/10 text-[#52C5F3] rounded text-[11px] font-bold tracking-wide hover:bg-[#52C5F3]/20 transition-colors">
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
    </main>
  );
};
