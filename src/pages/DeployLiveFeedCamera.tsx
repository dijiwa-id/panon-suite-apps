import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Camera, Search, Filter, Plus, Maximize2, MoreVertical, LayoutGrid, LayoutList, Signal, SignalHigh, SignalMedium } from 'lucide-react';

// Dummy data for camera feeds
const MOCK_CAMERAS = [
  {
    id: 'cam-01',
    name: 'Gate 1 - Main Entrance',
    ip: '192.168.1.101',
    zone: 'Zone A',
    status: 'online',
    fps: 30,
    node: 'Node 01',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    stats: { violations: 2, detections: 84 },
    signal: 'excellent'
  },
  {
    id: 'cam-02',
    name: 'Production Line B',
    ip: '192.168.1.102',
    zone: 'Zone B',
    status: 'online',
    fps: 28,
    node: 'Node 01',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    stats: { violations: 1, detections: 125 },
    signal: 'good'
  },
  {
    id: 'cam-03',
    name: 'Warehouse Section 2',
    ip: '192.168.1.105',
    zone: 'Zone C',
    status: 'online',
    fps: 30,
    node: 'Node 02',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a0a?auto=format&fit=crop&q=80&w=800',
    stats: { violations: 0, detections: 45 },
    signal: 'excellent'
  },
  {
    id: 'cam-04',
    name: 'Loading Dock A',
    ip: '192.168.1.110',
    zone: 'Zone C',
    status: 'online',
    fps: 24,
    node: 'Node 02',
    image: 'https://images.unsplash.com/photo-1605810710606-2cb6dcecba28?auto=format&fit=crop&q=80&w=800',
    stats: { violations: 5, detections: 210 },
    signal: 'fair'
  },
  {
    id: 'cam-05',
    name: 'Corridor North',
    ip: '192.168.1.112',
    zone: 'Zone A',
    status: 'offline',
    fps: 0,
    node: 'Node 01',
    image: '',
    stats: { violations: 0, detections: 0 },
    signal: 'none'
  },
  {
    id: 'cam-06',
    name: 'Production Line C',
    ip: '192.168.1.115',
    zone: 'Zone B',
    status: 'online',
    fps: 29,
    node: 'Node 03',
    image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=800',
    stats: { violations: 0, detections: 67 },
    signal: 'excellent'
  }
];

export const DeployLiveFeedCamera = () => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeZone, setActiveZone] = useState('All');

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="flex-1">
            <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Live Camera Feed</h1>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Monitor real-time footage and active zone deployments.</p>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex flex-col gap-6">
           
           {/* Toolbar */}
           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] p-4 rounded-[11px] shadow-sm shrink-0">
             <div className="flex items-center gap-3 w-full sm:w-auto">
               <div className="bg-gray-50 dark:bg-[#161616] px-3.5 py-1.5 rounded-[11px] border border-gray-200 dark:border-[#222] flex items-center gap-2 w-full sm:w-64 focus-within:border-[#52C5F3]/50 focus-within:ring-1 focus-within:ring-[#52C5F3]/50 transition-all">
                  <Search size={14} className="text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search camera..." 
                    className="bg-transparent outline-none text-xs font-medium text-gray-800 dark:text-gray-200 w-full placeholder-gray-500"
                  />
               </div>
               <div className="hidden sm:flex items-center bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-[11px] p-0.5">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "p-1.5 rounded-[8px] transition-colors",
                      viewMode === 'grid' ? "bg-white dark:bg-[#252525] text-gray-900 dark:text-white shadow-sm" : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    )}
                  >
                    <LayoutGrid size={14} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={cn(
                      "p-1.5 rounded-[8px] transition-colors",
                      viewMode === 'list' ? "bg-white dark:bg-[#252525] text-gray-900 dark:text-white shadow-sm" : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    )}
                  >
                    <LayoutList size={14} />
                  </button>
               </div>
             </div>
             
             <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
               <div className="flex items-center gap-1">
                  {['All', 'Zone A', 'Zone B', 'Zone C'].map(zone => (
                    <button
                      key={zone}
                      onClick={() => setActiveZone(zone)}
                      className={cn(
                        "text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-[11px] transition-colors border",
                        activeZone === zone 
                          ? "bg-[#52C5F3]/10 text-[#52C5F3] border-[#52C5F3]/20" 
                          : "bg-transparent text-gray-500 border-transparent hover:bg-gray-50 dark:hover:bg-[#252525] dark:hover:border-[#222] border-transparent"
                      )}
                    >
                      {zone}
                    </button>
                  ))}
               </div>
               <div className="w-px h-5 bg-gray-200 dark:bg-[#2a2a2a] hidden sm:block"></div>
               <button className="bg-[#1c1c1c] border border-gray-700 h-8 text-white rounded-full text-xs font-bold tracking-wide px-6 leading-[12px] hover:bg-[#2a2a2a] transition-colors flex items-center justify-center gap-1.5 shrink-0">
                  <Plus size={14} />
                  Add Camera
               </button>
             </div>
           </div>

           {/* Camera Grid View */}
           {viewMode === 'grid' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
               {MOCK_CAMERAS.map((cam) => (
                 <div key={cam.id} className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] overflow-hidden shadow-sm group flex flex-col relative w-full transition-all hover:border-[#52C5F3]/30 hover:shadow-md">
                   {/* Video Container */}
                   <div className="relative aspect-video bg-[#111] overflow-hidden group/video border-b border-[#222]/50">
                      {cam.status === 'online' ? (
                        <>
                          <img src={cam.image} alt={cam.name} className="w-full h-full object-cover opacity-80 group-hover/video:opacity-100 group-hover/video:scale-[1.02] transition-all duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>
                          
                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                             <div className="flex gap-2">
                               <div className="bg-black/50 backdrop-blur-md border border-white/5 py-1 px-2 rounded flex items-center gap-1.5 shadow-sm">
                                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                 <span className="text-[10px] font-black tracking-widest text-white uppercase">Live</span>
                               </div>
                               <div className="bg-black/50 backdrop-blur-md border border-white/5 py-1 px-2 rounded shadow-sm">
                                 <span className="text-[10px] font-black tracking-widest text-[#ececec]">{cam.zone}</span>
                               </div>
                             </div>
                             <div className="flex gap-2">
                               {cam.stats.violations > 0 && (
                                 <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 px-2 py-1 rounded shadow-sm flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                                    <span className="text-[10px] font-black tracking-widest text-red-400 capitalize">{cam.stats.violations} Alert{cam.stats.violations > 1 ? 's' : ''}</span>
                                 </div>
                               )}
                             </div>
                          </div>

                          {/* Bottom Stats Overlay */}
                          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end opacity-80 group-hover/video:opacity-100 transition-opacity">
                             <div className="flex flex-col gap-1">
                               <div className="flex items-center gap-2 text-[10px] font-medium text-gray-300">
                                  <span className="bg-black/40 px-1.5 py-0.5 rounded backdrop-blur border border-white/5">{cam.ip}</span>
                                  <span className="bg-black/40 px-1.5 py-0.5 rounded backdrop-blur border border-white/5">Detects: {cam.stats.detections}</span>
                               </div>
                             </div>
                             <div className="bg-black/50 backdrop-blur-md border border-white/5 px-2 py-1 rounded flex items-center shadow-sm">
                               <span className="text-[10px] font-black tracking-widest text-[#52C5F3]">{cam.fps} FPS</span>
                             </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-[#111] relative">
                           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none"></div>
                           <Camera size={28} className="text-[#333] mb-3" />
                           <span className="text-[10px] font-black tracking-widest text-gray-500 capitalize bg-[#1a1a1a] px-3 py-1.5 rounded-[11px] border border-[#222]">Connection Lost</span>
                        </div>
                      )}
                   </div>
                   
                   {/* Bottom Info */}
                   <div className="p-4 bg-white dark:bg-[#1e1e1e] flex flex-col justify-center shrink-0">
                      <div className="flex items-center justify-between mb-1.5">
                         <div className="flex items-center gap-2">
                           <div className={cn(
                             "w-1.5 h-1.5 rounded-full shrink-0",
                             cam.status === 'online' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                           )}></div>
                           <h4 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight leading-none group-hover:text-[#52C5F3] transition-colors truncate" title={cam.name}>{cam.name}</h4>
                         </div>
                         <div className="flex items-center gap-1 shrink-0">
                            <button className="p-1 rounded-[6px] text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all">
                               <Maximize2 size={12} />
                            </button>
                            <button className="p-1 rounded-[6px] text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all">
                               <MoreVertical size={14} />
                            </button>
                         </div>
                      </div>
                      <div className="flex items-center gap-2 pl-3.5">
                        <p className="text-[10px] font-medium text-gray-500">{cam.node}</p>
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-[#333]"></span>
                        <div className="flex items-center gap-1" title={`Signal: ${cam.signal}`}>
                          {cam.signal === 'excellent' && <SignalHigh size={10} className="text-green-500" />}
                          {cam.signal === 'good' && <SignalMedium size={10} className="text-yellow-500" />}
                          {cam.signal === 'fair' && <Signal size={10} className="text-orange-500" />}
                          {cam.signal === 'none' && <Signal size={10} className="text-red-500" />}
                          <span className="text-[10px] text-gray-500 capitalize">{cam.signal}</span>
                        </div>
                      </div>
                   </div>
                 </div>
               ))}
             </div>
           )}

           {/* List View */}
           {viewMode === 'list' && (
             <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-sm overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="border-b border-gray-100 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
                       <th className="px-5 py-3 text-[10px] font-black tracking-widest capitalize text-gray-500">Camera Name</th>
                       <th className="px-5 py-3 text-[10px] font-black tracking-widest capitalize text-gray-500">Node</th>
                       <th className="px-5 py-3 text-[10px] font-black tracking-widest capitalize text-gray-500">Zone</th>
                       <th className="px-5 py-3 text-[10px] font-black tracking-widest capitalize text-gray-500">Status</th>
                       <th className="px-5 py-3 text-[10px] font-black tracking-widest capitalize text-gray-500">FPS</th>
                       <th className="px-5 py-3 text-[10px] font-black tracking-widest capitalize text-gray-500 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100 dark:divide-[#222]">
                     {MOCK_CAMERAS.map((cam) => (
                       <tr key={cam.id} className="hover:bg-gray-50/50 dark:hover:bg-[#252525]/30 transition-colors group">
                         <td className="px-5 py-3.5">
                           <div className="flex items-center gap-3">
                             <div className={cn(
                               "w-1.5 h-1.5 rounded-full",
                               cam.status === 'online' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                             )}></div>
                             <div className="flex flex-col">
                               <span className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#52C5F3] transition-colors">{cam.name}</span>
                               <span className="text-xs text-gray-500">{cam.ip}</span>
                             </div>
                           </div>
                         </td>
                         <td className="px-5 py-3.5 text-xs text-gray-600 dark:text-gray-400 font-medium">{cam.node}</td>
                         <td className="px-5 py-3.5">
                           <span className="bg-gray-50 dark:bg-[#252525] text-gray-600 dark:text-gray-300 px-2 py-1 rounded-[6px] text-[10px] font-black tracking-widest uppercase border border-gray-200 dark:border-[#2a2a2a]">{cam.zone}</span>
                         </td>
                         <td className="px-5 py-3.5">
                           {cam.status === 'online' ? (
                             <span className="text-[10px] font-black tracking-widest uppercase text-green-500 bg-green-500/10 px-2 py-1 rounded-[6px] border border-green-500/20">Live</span>
                           ) : (
                             <span className="text-[10px] font-black tracking-widest uppercase text-red-500 bg-red-500/10 px-2 py-1 rounded-[6px] border border-red-500/20">Offline</span>
                           )}
                         </td>
                         <td className="px-5 py-3.5 text-xs text-gray-600 dark:text-gray-400 font-medium">{cam.fps > 0 ? `${cam.fps} FPS` : '-'}</td>
                         <td className="px-5 py-3.5 text-right">
                           <div className="flex items-center justify-end gap-1">
                             <button className="p-1.5 rounded-[6px] hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                               <Maximize2 size={14} />
                             </button>
                             <button className="p-1.5 rounded-[6px] hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                               <MoreVertical size={14} />
                             </button>
                           </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
           )}

        </div>

      </div>
    </main>
  );
};

