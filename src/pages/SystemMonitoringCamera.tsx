import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, Grid, List, Activity, MapPin, Eye, Cpu, Signal, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

const generateInitialCameras = () => Array.from({ length: 50 }).map((_, i) => {
  const isOffline = Math.random() > 0.85;
  const areas = ['Main Entrance', 'Parking Area 1', 'Parking Area 2', 'Lobby 1', 'Lobby 2', 'Working Area 1', 'Working Area 2', 'Server Room', 'Cafeteria', 'Emergency Exit', 'Perimeter North', 'Perimeter South', 'Elevator Bank A', 'Elevator Bank B', 'Loading Dock'];
  const locations = ['Jl. Reog 39 Bandung', 'Jl. Asia Afrika Bandung', 'Jl. Sudirman Jakarta', 'Plaza Senayan Jakarta', 'Jl. Braga Bandung'];
  const id = `CAM-${(i + 1).toString().padStart(3, '0')}`;
  const encodings = ['H.264', 'H.265'];
  
  const randCondition = Math.random();
  const condition = isOffline ? 'Normal' : randCondition > 0.95 ? 'Critical' : randCondition > 0.8 ? 'Alert' : 'Normal';

  const bandwidthHistory = Array.from({ length: 20 }).map(() => ({ 
    value: isOffline ? 0 : Math.random() * 6 + 1 
  }));

  return {
    id,
    name: `${areas[Math.floor(Math.random() * areas.length)]} ${Math.floor(Math.random() * 3) + 1}`,
    location: locations[Math.floor(Math.random() * locations.length)],
    fps: isOffline ? 0 : [15, 24, 25, 30, 60][Math.floor(Math.random() * 5)],
    encoding: encodings[Math.floor(Math.random() * encodings.length)],
    bandwidthHistory,
    reader: isOffline ? 0 : Math.floor(Math.random() * 4), 
    status: isOffline ? 'Offline' : 'Online',
    condition
  };
});

export const SystemMonitoringCamera = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [cameras, setCameras] = useState(generateInitialCameras);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [listItemsPerPage, setListItemsPerPage] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      const rowHeight = 49;
      const headerSpace = 280; 
      const availableHeight = window.innerHeight - headerSpace;
      const estimatedRows = Math.max(5, Math.floor(availableHeight / rowHeight));
      setListItemsPerPage(estimatedRows);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Real-time update
  useEffect(() => {
    const interval = setInterval(() => {
      setCameras(prevCameras => prevCameras.map(cam => {
        if (cam.status === 'Offline') return cam;
        
        const newValue = Math.max(0.5, cam.bandwidthHistory[cam.bandwidthHistory.length - 1].value + (Math.random() * 2 - 1));
        const newHistory = [...cam.bandwidthHistory.slice(1), { value: newValue }];
        
        const randCond = Math.random();
        let newCondition = cam.condition;
        if (randCond > 0.95) {
           newCondition = Math.random() > 0.5 ? 'Critical' : 'Alert';
        } else if (randCond > 0.8) {
           newCondition = 'Normal';
        }

        return {
          ...cam,
          bandwidthHistory: newHistory,
          condition: newCondition
        };
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusDotColor = (status: string, condition: string) => {
    if (status === 'Offline') return "bg-gray-500 shadow-[0_0_8px_rgba(107,114,128,0.5)]";
    if (condition === 'Critical') return "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]";
    if (condition === 'Alert') return "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]";
    return "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]";
  }

  const getChartColor = (status: string, condition: string) => {
    if (status === 'Offline') return "#6b7280"; // gray-500
    if (condition === 'Critical') return "#ef4444"; // red-500
    if (condition === 'Alert') return "#eab308"; // yellow-500
    return "#52C5F3"; // blue accent
  }

  const filteredCameras = cameras.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, viewMode]);

  const itemsPerPage = viewMode === 'list' ? listItemsPerPage : 15;
  const totalPages = Math.max(1, Math.ceil(filteredCameras.length / itemsPerPage));
  const currentCameras = filteredCameras.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-[1600px] mx-auto min-h-full flex flex-col gap-8 lg:gap-10">
        {/* Title */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Camera Monitoring</h1>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Real-time status, bandwidth usage, and active readers for configured cameras.</p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <Input 
                placeholder="Search cameras..." 
                className="pl-9 h-8 text-xs bg-white dark:bg-[#1c1c1c] border-gray-200 dark:border-[#222]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="bg-white dark:bg-[#1c1c1c] p-0.5 rounded-lg border border-gray-200 dark:border-[#222] flex items-center shadow-sm">
                <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                        "p-1.5 rounded-md transition-colors",
                        viewMode === 'grid' 
                          ? "bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-white" 
                          : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    )}
                >
                    <Grid size={14} />
                </button>
                <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                        "p-1.5 rounded-md transition-colors",
                        viewMode === 'list' 
                          ? "bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-white" 
                          : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    )}
                >
                    <List size={14} />
                </button>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div 
               key="grid"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="flex flex-col flex-1"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start flex-1 mb-6">
                {currentCameras.map(cam => (
                    <Card key={cam.id} className="rounded-xl bg-white dark:bg-[#1c1c1c] border-gray-100 dark:border-[#222] shadow-sm flex flex-col hover:shadow-md transition-all group overflow-hidden">
                      <div className="p-3 border-b border-gray-100 dark:border-[#222] flex justify-between items-center bg-gray-50/50 dark:bg-[#1a1a1a]/50">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#252525] border border-gray-100 dark:border-[#333] flex items-center justify-center shadow-sm group-hover:border-[#52C5F3]/50 transition-colors">
                                <Video size={14} className={cn("transition-colors", cam.status === 'Online' ? "text-[#52C5F3]" : "text-gray-500")} />
                             </div>
                             <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-xs font-bold text-gray-900 dark:text-white font-mono tracking-tight">{cam.id}</h3>
                                  <div className={cn("w-1.5 h-1.5 rounded-full", getStatusDotColor(cam.status, cam.condition))}></div>
                                </div>
                                <p className="text-[10px] text-gray-500 font-medium mt-0.5 truncate w-32">{cam.name}</p>
                             </div>
                          </div>
                      </div>
                      
                      <div className="p-3 space-y-3 flex-1">
                        <div className="flex items-center gap-2 text-[11px] font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#151515] p-2 rounded-md border border-gray-100 dark:border-[#222]">
                          <MapPin size={12} className="text-gray-400" />
                          <span className="truncate">{cam.location}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div className="flex flex-col gap-1 bg-gray-50 dark:bg-[#151515] p-2 rounded-md border border-gray-100 dark:border-[#222]">
                             <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest flex items-center gap-1"><Activity size={9}/> FPS</span>
                             <span className="text-xs font-mono text-gray-900 dark:text-white font-medium">{cam.fps} <span className="text-[9px] text-gray-500 font-sans">fps</span></span>
                          </div>
                          <div className="flex flex-col gap-1 bg-gray-50 dark:bg-[#151515] p-2 rounded-md border border-gray-100 dark:border-[#222]">
                             <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest flex items-center gap-1"><Cpu size={9}/> Encoding</span>
                             <span className="text-xs font-mono text-gray-900 dark:text-white font-medium">{cam.encoding}</span>
                          </div>
                          <div className="flex flex-col gap-1 col-span-2 bg-gray-50 dark:bg-[#151515] p-2.5 rounded-md border border-gray-100 dark:border-[#222]">
                              <div className="flex items-center justify-between mb-1">
                               <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest flex items-center gap-1"><Signal size={9}/> Bandwidth</span>
                               <span className={cn("text-xs font-mono font-medium", cam.status === 'Online' ? "text-gray-900 dark:text-white" : "text-gray-500")} style={{ color: cam.status === 'Online' ? getChartColor(cam.status, cam.condition) : undefined }}>
                                  {cam.bandwidthHistory[cam.bandwidthHistory.length - 1].value.toFixed(3).replace('.', ',')} <span className="text-[9px] text-gray-500 font-sans">Kbps</span>
                               </span>
                             </div>
                             <div className="h-10 w-full -ml-1">
                               <ResponsiveContainer width="100%" height="100%">
                                 <AreaChart data={cam.bandwidthHistory} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                   <defs>
                                     <linearGradient id={`colorBandwidth-${cam.id}`} x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="5%" stopColor={getChartColor(cam.status, cam.condition)} stopOpacity={0.3}/>
                                       <stop offset="95%" stopColor={getChartColor(cam.status, cam.condition)} stopOpacity={0}/>
                                     </linearGradient>
                                   </defs>
                                   <YAxis domain={['auto', 'auto']} hide />
                                   <Area 
                                     type="monotone" 
                                     dataKey="value" 
                                     stroke={getChartColor(cam.status, cam.condition)} 
                                     fillOpacity={1}
                                     fill={cam.status === 'Online' ? `url(#colorBandwidth-${cam.id})` : "transparent"}
                                     strokeWidth={1.5} 
                                     isAnimationActive={false}
                                   />
                                 </AreaChart>
                               </ResponsiveContainer>
                             </div>
                          </div>
                          <div className="flex flex-col gap-1 col-span-2 bg-gray-50 dark:bg-[#151515] p-2 rounded-md border border-gray-100 dark:border-[#222]">
                             <div className="flex items-center justify-between">
                               <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest flex items-center gap-1"><Eye size={9}/> Reader</span>
                               <span className="text-xs font-mono text-gray-900 dark:text-white font-medium">{cam.reader} <span className="text-[9px] text-gray-500 font-sans">Active</span></span>
                             </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 rounded-[11px] border border-gray-100 dark:border-[#222] bg-white dark:bg-[#1e1e1e] shadow-sm mt-auto">
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
                  Showing {filteredCameras.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCameras.length)} of {filteredCameras.length} cameras
                </span>
                <div className="flex gap-1.5">
                  <Button 
                    variant="outline" 
                    className="h-7 w-7 p-0 bg-transparent border-gray-200 dark:border-[#222] text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#252525]" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  >
                    <ChevronLeft size={14} />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-7 w-7 p-0 bg-transparent border-gray-200 dark:border-[#222] text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#252525]" 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  >
                    <ChevronRight size={14} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
               key="list"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
            >
              <Card className="rounded-[11px] bg-white dark:bg-[#1e1e1e] border-gray-100 dark:border-[#222] flex-1 flex flex-col shadow-sm overflow-hidden">
                <div className="flex-1 overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-50 dark:bg-[#161616] border-b border-gray-100 dark:border-[#222]">
                      <tr>
                        <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">Camera Id</th>
                        <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">Camera Name</th>
                        <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">Location</th>
                        <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase text-center">FPS Config</th>
                        <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase text-center">Encoding</th>
                        <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase text-right">Bandwidth</th>
                        <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase text-center">Reader</th>
                        <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-[#252525]">
                       {currentCameras.map((cam) => (
                           <tr key={cam.id} className="hover:bg-gray-50/50 dark:hover:bg-[#252525]/30 transition-colors">
                              <td className="px-6 py-3.5 text-xs font-mono font-medium text-gray-900 dark:text-white">{cam.id}</td>
                              <td className="px-6 py-3.5 text-xs font-medium text-gray-900 dark:text-gray-300">
                                <div className="flex items-center gap-1.5"><Video size={12}/>{cam.name}</div>
                              </td>
                              <td className="px-6 py-3.5 text-xs text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1.5"><MapPin size={12}/>{cam.location}</div>
                              </td>
                              <td className="px-6 py-3.5 text-xs font-mono text-center text-gray-900 dark:text-gray-400">{cam.fps} <span className="text-[10px] text-gray-500 font-sans">fps</span></td>
                              <td className="px-6 py-3.5 text-xs font-mono text-center text-gray-900 dark:text-gray-400">{cam.encoding}</td>
                              <td className={cn("px-6 py-3.5 text-xs font-mono text-right font-medium")} style={{ color: cam.status === 'Online' ? getChartColor(cam.status, cam.condition) : undefined }}>
                                {cam.bandwidthHistory[cam.bandwidthHistory.length - 1].value.toFixed(3).replace('.', ',')} <span className="text-[10px] text-gray-500 font-sans">Kbps</span>
                              </td>
                              <td className="px-6 py-3.5 text-xs font-mono text-center text-gray-900 dark:text-gray-400">{cam.reader}</td>
                              <td className="px-6 py-3.5 text-xs text-gray-900 dark:text-white">
                                  <div className="flex items-center gap-2">
                                      <div className={cn("w-1.5 h-1.5 rounded-full", getStatusDotColor(cam.status, cam.condition))}></div>
                                      <span className="font-medium text-[11px]">{cam.status === 'Online' ? cam.condition : 'Offline'}</span>
                                  </div>
                              </td>
                           </tr>
                       ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-[#222] bg-white dark:bg-[#1e1e1e]">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
                    Showing {filteredCameras.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCameras.length)} of {filteredCameras.length} cameras
                  </span>
                  <div className="flex gap-1.5">
                    <Button 
                      variant="outline" 
                      className="h-7 w-7 p-0 bg-transparent border-gray-200 dark:border-[#222] text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#252525]" 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    >
                      <ChevronLeft size={14} />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-7 w-7 p-0 bg-transparent border-gray-200 dark:border-[#222] text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#252525]" 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    >
                      <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
};
