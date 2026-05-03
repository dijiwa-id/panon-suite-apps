import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Camera, Search, Plus, Maximize2, MoreVertical, LayoutGrid, LayoutList, Signal, SignalHigh, SignalMedium, X, Link as LinkIcon, Server, MapPin, Settings, Power, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';
import { Button, Input, Card, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui';

// Dummy data for camera feeds
const INITIAL_CAMERAS = [
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
  const [cameras, setCameras] = useState(INITIAL_CAMERAS);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeZone, setActiveZone] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddCameraModalOpen, setIsAddCameraModalOpen] = useState(false);
  const [newCamera, setNewCamera] = useState({ name: '', url: '', zone: '', node: '' });
  
  const [maximizedCamera, setMaximizedCamera] = useState<any>(null);
  const [selectedCameraForSettings, setSelectedCameraForSettings] = useState<any>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleAddCamera = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCamera.name || !newCamera.url) {
      toast.error('Please fill required fields');
      return;
    }
    const newId = `cam-${Date.now()}`;
    const addedCamera = {
      id: newId,
      name: newCamera.name,
      ip: newCamera.url.replace('rtsp://', '').split('/')[0] || '127.0.0.1',
      zone: newCamera.zone || 'Unassigned',
      status: 'online',
      fps: 30,
      node: newCamera.node || 'Agent Node',
      image: 'https://images.unsplash.com/photo-1549880338-65dd4bd82f28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      stats: { violations: 0, detections: 0 },
      signal: 'excellent'
    };

    setCameras([addedCamera, ...cameras]);

    toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
      loading: 'Adding camera...',
      success: `${newCamera.name} added and connected successfully`,
      error: 'Failed to add camera',
    });
    setIsAddCameraModalOpen(false);
    setNewCamera({ name: '', url: '', zone: '', node: '' });
  };

  const toggleCameraStatus = (id: string) => {
     setCameras(cameras.map(cam => {
         if (cam.id === id) {
             const newStatus = cam.status === 'online' ? 'offline' : 'online';
             if (newStatus === 'offline') {
                 toast.success(`${cam.name} feed stopped`);
             } else {
                 toast.success(`${cam.name} feed started`);
             }
             return { ...cam, status: newStatus };
         }
         return cam;
     }));
  };

  const removeCamera = (id: string) => {
      if (confirm('Are you sure you want to remove this camera?')) {
          setCameras(cameras.filter(cam => cam.id !== id));
          toast.success('Camera removed successfully');
          setSelectedCameraForSettings(null);
      }
  };

  const filteredCameras = cameras.filter(cam => {
     const matchesZone = activeZone === 'All' || cam.zone === activeZone;
     const matchesSearch = cam.name.toLowerCase().includes(searchQuery.toLowerCase()) || cam.ip.includes(searchQuery);
     return matchesZone && matchesSearch;
  }).sort((a, b) => {
     if (!sortConfig) return 0;
     const { key, direction } = sortConfig;
     const multiplier = direction === 'asc' ? 1 : -1;
     
     if (a[key as keyof typeof a] < b[key as keyof typeof b]) return -1 * multiplier;
     if (a[key as keyof typeof a] > b[key as keyof typeof b]) return 1 * multiplier;
     return 0;
  });

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
           <Card className="flex flex-col sm:flex-row items-center justify-between gap-4 p-[10px] h-auto md:h-[60px] shrink-0">
             <div className="flex items-center gap-3 w-full sm:w-auto h-full">
               <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  <Input 
                    type="text" 
                    placeholder="Search camera..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
               </div>
               <div className="hidden sm:flex items-center bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl p-0.5">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "p-1.5 rounded-[8px] transition-colors",
                      viewMode === 'grid' ? "bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white shadow-sm" : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    )}
                  >
                    <LayoutGrid size={14} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={cn(
                      "p-1.5 rounded-[8px] transition-colors",
                      viewMode === 'list' ? "bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white shadow-sm" : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
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
               <Button onClick={() => setIsAddCameraModalOpen(true)} className="gap-1.5">
                  <Plus size={14} />
                  Add Camera
               </Button>
             </div>
           </Card>

           {/* Camera Grid View */}
           {viewMode === 'grid' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
               {filteredCameras.map((cam) => (
                 <div key={cam.id} className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] overflow-hidden shadow-sm group flex flex-col relative w-full transition-all hover:border-[#52C5F3]/30 hover:shadow-md">
                   {/* Video Container */}
                   <div className="relative aspect-video bg-[#111] overflow-hidden group/video border-b border-[#222]/50">
                      {cam.status === 'online' ? (
                        <>
                          <img src={cam.image} alt={cam.name} className="w-full h-full object-cover opacity-80 group-hover/video:opacity-100 group-hover/video:scale-[1.02] transition-all duration-700 cursor-pointer" onClick={() => setMaximizedCamera(cam)} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>
                          
                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                             <div className="flex gap-2">
                               <div className="bg-black/50 backdrop-blur-md border border-white/5 px-2 h-[25px] rounded flex items-center gap-1.5 shadow-sm">
                                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                 <span className="text-[10px] font-black tracking-widest text-white uppercase">Live</span>
                               </div>
                               <div className="bg-black/50 backdrop-blur-md border border-white/5 px-2 h-[25px] flex items-center justify-center rounded shadow-sm">
                                 <span className="text-[10px] font-black tracking-widest text-[#ececec]">{cam.zone}</span>
                               </div>
                             </div>
                             <div className="flex gap-2">
                               {cam.stats.violations > 0 && (
                                 <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 px-2 h-[25px] flex items-center justify-center rounded shadow-sm gap-1">
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
                                  <span className="bg-black/40 px-1.5 h-[20px] flex items-center justify-center rounded backdrop-blur border border-white/5">{cam.ip}</span>
                                  <span className="bg-black/40 px-1.5 h-[20px] flex items-center justify-center rounded backdrop-blur border border-white/5">Detects: {cam.stats.detections}</span>
                               </div>
                             </div>
                             <div className="bg-black/50 backdrop-blur-md border border-white/5 px-2 h-[25px] flex items-center justify-center rounded shadow-sm">
                               <span className="text-[10px] font-black tracking-widest text-[#52C5F3]">{cam.fps} FPS</span>
                             </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-[#111] relative">
                           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none"></div>
                           <Camera size={28} className="text-[#333] mb-3" />
                           <span className="text-[10px] font-black tracking-widest text-gray-500 capitalize bg-[#1a1a1a] px-3 py-1.5 rounded-[11px] border border-[#222] mb-3">Connection Lost</span>
                           <Button variant="outline" className="h-7 px-3 text-[10px] rounded-[6px] border-[#52C5F3]/30 text-[#52C5F3] hover:bg-[#52C5F3]/10" onClick={(e) => { e.stopPropagation(); toggleCameraStatus(cam.id); }}>
                             Reconnect
                           </Button>
                        </div>
                      )}
                   </div>
                   
                   {/* Bottom Info */}
                   <div className="px-4 h-[65px] bg-white dark:bg-[#1e1e1e] flex flex-col justify-center shrink-0">
                      <div className="flex items-center justify-between mb-1.5">
                         <div className="flex items-center gap-2">
                           <div className={cn(
                             "w-1.5 h-1.5 rounded-full shrink-0",
                             cam.status === 'online' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                           )}></div>
                           <h4 className="text-xs font-bold text-gray-900 dark:text-white tracking-tight leading-none group-hover:text-[#52C5F3] transition-colors truncate" title={cam.name}>{cam.name}</h4>
                         </div>
                         <div className="flex items-center gap-1 shrink-0">
                            <button onClick={() => setMaximizedCamera(cam)} className="p-1 rounded-[6px] text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all">
                               <Maximize2 size={12} />
                            </button>
                            <button onClick={() => setSelectedCameraForSettings(cam)} className="p-1 rounded-[6px] text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all">
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
             <Card className="p-0 overflow-hidden">
               <div className="overflow-x-auto">
                 <Table>
                   <TableHeader>
                     <TableRow>
                       <TableHead className="cursor-pointer hover:text-gray-900 dark:hover:text-white select-none group" onClick={() => handleSort('name')}>
                         <div className="flex items-center gap-1">Camera Name <ArrowUpDown size={12} className={cn("transition-opacity", sortConfig?.key === 'name' ? "opacity-100 text-[#52C5F3]" : "opacity-0 group-hover:opacity-100 text-gray-400")} /></div>
                       </TableHead>
                       <TableHead className="cursor-pointer hover:text-gray-900 dark:hover:text-white select-none group" onClick={() => handleSort('node')}>
                         <div className="flex items-center gap-1">Node <ArrowUpDown size={12} className={cn("transition-opacity", sortConfig?.key === 'node' ? "opacity-100 text-[#52C5F3]" : "opacity-0 group-hover:opacity-100 text-gray-400")} /></div>
                       </TableHead>
                       <TableHead className="cursor-pointer hover:text-gray-900 dark:hover:text-white select-none group" onClick={() => handleSort('zone')}>
                         <div className="flex items-center gap-1">Zone <ArrowUpDown size={12} className={cn("transition-opacity", sortConfig?.key === 'zone' ? "opacity-100 text-[#52C5F3]" : "opacity-0 group-hover:opacity-100 text-gray-400")} /></div>
                       </TableHead>
                       <TableHead className="cursor-pointer hover:text-gray-900 dark:hover:text-white select-none group" onClick={() => handleSort('status')}>
                         <div className="flex items-center gap-1">Status <ArrowUpDown size={12} className={cn("transition-opacity", sortConfig?.key === 'status' ? "opacity-100 text-[#52C5F3]" : "opacity-0 group-hover:opacity-100 text-gray-400")} /></div>
                       </TableHead>
                       <TableHead className="cursor-pointer hover:text-gray-900 dark:hover:text-white select-none group" onClick={() => handleSort('fps')}>
                         <div className="flex items-center gap-1">FPS <ArrowUpDown size={12} className={cn("transition-opacity", sortConfig?.key === 'fps' ? "opacity-100 text-[#52C5F3]" : "opacity-0 group-hover:opacity-100 text-gray-400")} /></div>
                       </TableHead>
                       <TableHead className="text-right">Actions</TableHead>
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {filteredCameras.map((cam) => (
                       <TableRow key={cam.id}>
                         <TableCell>
                           <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setMaximizedCamera(cam)}>
                             <div className={cn(
                               "w-1.5 h-1.5 rounded-full",
                               cam.status === 'online' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                             )}></div>
                             <div className="flex flex-col">
                               <span className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#52C5F3] transition-colors">{cam.name}</span>
                               <span className="text-xs text-gray-500">{cam.ip}</span>
                             </div>
                           </div>
                         </TableCell>
                         <TableCell>{cam.node}</TableCell>
                         <TableCell>
                           <span className="bg-gray-50 dark:bg-[#252525] text-gray-600 dark:text-gray-300 px-2 py-1 rounded-[6px] text-[10px] font-black tracking-widest uppercase border border-gray-200 dark:border-[#2a2a2a]">{cam.zone}</span>
                         </TableCell>
                         <TableCell>
                           {cam.status === 'online' ? (
                             <Badge variant="success">Live</Badge>
                           ) : (
                             <Badge variant="danger">Offline</Badge>
                           )}
                         </TableCell>
                         <TableCell>{cam.fps > 0 ? `${cam.fps} FPS` : '-'}</TableCell>
                         <TableCell className="text-right">
                           <div className="flex items-center justify-end gap-1">
                             <Button variant="ghost" className="px-2" onClick={() => setMaximizedCamera(cam)}>
                               <Maximize2 size={14} />
                             </Button>
                             <Button variant="ghost" className="px-2" onClick={() => setSelectedCameraForSettings(cam)}>
                               <MoreVertical size={14} />
                             </Button>
                           </div>
                         </TableCell>
                       </TableRow>
                     ))}
                   </TableBody>
                 </Table>
               </div>
             </Card>
           )}

        </div>

      </div>

      {/* Add Camera Modal */}
      {isAddCameraModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#161616] w-full max-w-md rounded-[11px] border border-gray-200 dark:border-[#222] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-[#222]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#2a2a2a] flex items-center justify-center">
                  <Camera size={16} className="text-gray-700 dark:text-gray-300" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight leading-none mb-1">Add Camera</h2>
                  <p className="text-[10px] font-medium text-gray-500">Register a new live feed stream.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddCameraModalOpen(false)}
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-[#252525]"
              >
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleAddCamera} className="p-6 space-y-5">
              <div>
                <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Camera Name *</label>
                <Input 
                  type="text" 
                  value={newCamera.name}
                  onChange={e => setNewCamera({...newCamera, name: e.target.value})}
                  placeholder="e.g. Main Gate Camera"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Stream URL *</label>
                <div className="relative">
                  <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input 
                    type="text" 
                    value={newCamera.url}
                    onChange={e => setNewCamera({...newCamera, url: e.target.value})}
                    className="pl-9"
                    placeholder="rtsp://..."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Processing Node</label>
                  <div className="relative">
                    <Server size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input 
                      type="text" 
                      value={newCamera.node}
                      onChange={e => setNewCamera({...newCamera, node: e.target.value})}
                      className="pl-9"
                      placeholder="e.g. Node 01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Zone</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input 
                      type="text" 
                      value={newCamera.zone}
                      onChange={e => setNewCamera({...newCamera, zone: e.target.value})}
                      className="pl-9"
                      placeholder="e.g. Zone A"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-200 dark:border-[#222]">
                <Button 
                  type="button"
                  onClick={() => setIsAddCameraModalOpen(false)}
                  variant="ghost"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  variant="default"
                >
                  Confirm Registration
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Maximized Camera Modal */}
      {maximizedCamera && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden border border-[#333] shadow-2xl flex flex-col items-center justify-center group animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setMaximizedCamera(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors border border-white/10"
            >
              <X size={20} />
            </button>
            {maximizedCamera.status === 'online' ? (
              <>
                 <img src={maximizedCamera.image} alt={maximizedCamera.name} className="w-full h-full object-cover" />
                 <div className="absolute top-4 left-4 flex gap-2">
                   <div className="bg-black/50 backdrop-blur-md border border-white/10 px-3 h-8 rounded-lg flex items-center gap-2 shadow-sm">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                     <span className="text-xs font-bold text-white leading-none uppercase tracking-wider">{maximizedCamera.name}</span>
                   </div>
                   <div className="bg-black/50 backdrop-blur-md border border-white/10 px-3 h-8 rounded-lg flex items-center shadow-sm">
                     <span className="text-xs font-bold text-[#52C5F3] leading-none uppercase tracking-wider">{maximizedCamera.fps} FPS</span>
                   </div>
                 </div>
              </>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#111]">
                   <Camera size={48} className="text-[#333] mb-4" />
                   <span className="text-sm font-bold tracking-widest text-gray-500 capitalize bg-[#1a1a1a] px-4 py-2 rounded-xl border border-[#222]">Connection Lost</span>
                </div>
            )}
          </div>
        </div>
      )}

      {/* Camera Settings Modal */}
      {selectedCameraForSettings && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-[#161616] w-full max-w-md rounded-[11px] border border-gray-200 dark:border-[#222] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                 <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-[#222]">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-[#52C5F3]/10 flex items-center justify-center">
                          <Settings size={16} className="text-[#52C5F3]" />
                       </div>
                       <div>
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight leading-none mb-1">Camera Configuration</h3>
                          <p className="text-[10px] text-gray-500">{selectedCameraForSettings.name}</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setSelectedCameraForSettings(null)}
                      className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-1"
                    >
                      <X size={18} />
                    </button>
                 </div>
                 <div className="p-5 flex flex-col gap-4">
                     <div className="p-4 rounded-xl border border-gray-100 dark:border-[#222] bg-gray-50 dark:bg-[#111]">
                         <div className="flex justify-between items-center mb-2">
                             <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">Status</span>
                             <Badge variant={selectedCameraForSettings.status === 'online' ? 'success' : 'danger'}>{selectedCameraForSettings.status}</Badge>
                         </div>
                         <div className="flex justify-between items-center mb-2">
                             <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">IP Address</span>
                             <span className="text-xs font-mono text-gray-900 dark:text-gray-300">{selectedCameraForSettings.ip}</span>
                         </div>
                         <div className="flex justify-between items-center mb-2">
                             <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">Zone</span>
                             <span className="text-xs font-medium text-gray-900 dark:text-gray-300">{selectedCameraForSettings.zone}</span>
                         </div>
                         <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">Node</span>
                             <span className="text-xs font-medium text-gray-900 dark:text-gray-300">{selectedCameraForSettings.node}</span>
                         </div>
                     </div>
                     <div className="grid grid-cols-2 gap-3 mt-2">
                         <Button 
                             variant={selectedCameraForSettings.status === 'online' ? "outline" : "primary"} 
                             className={cn("gap-2 w-full", selectedCameraForSettings.status === 'online' ? "border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-500/30 dark:text-orange-400 dark:hover:bg-orange-500/10" : "")}
                             onClick={() => toggleCameraStatus(selectedCameraForSettings.id)}
                         >
                             <Power size={14} />
                             {selectedCameraForSettings.status === 'online' ? 'Stop Feed' : 'Start Feed'}
                         </Button>
                         <Button 
                             variant="outline" 
                             className="gap-2 w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
                             onClick={() => removeCamera(selectedCameraForSettings.id)}
                         >
                             Remove
                         </Button>
                     </div>
                 </div>
              </div>
          </div>
      )}
    </main>
  );
};

