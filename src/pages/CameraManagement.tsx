
import React, { useState } from 'react';
import { Search, Plus, Check, X, Camera, MapPin, Hash, Link as LinkIcon, Settings, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

const cameras = [
  { id: 'CAM-001', name: 'Camera 001 / Main Gate', location: 'Perempatan Jalan', coordinate: '-6.9391256, 107.6284992', url: 'rtsp://admin:QRT.../av_stream', resolution: '1080p', fps: 15, onvif: true, active: false },
  { id: 'CAM-002', name: 'Camera 002 / Lobby', location: 'Depan Gedung A', coordinate: '-6.9391256, 107.6284992', url: 'rtsp://admin:QRT.../av_stream', resolution: '1080p', fps: 30, onvif: false, active: true },
  { id: 'CAM-003', name: 'Camera 003 / Parking', location: 'Samping Pasar', coordinate: '-6.9391256, 107.6284992', url: 'rtsp://admin:QRT.../av_stream', resolution: '720p', fps: 15, onvif: true, active: true },
  { id: 'CAM-004', name: 'Camera 004 / Perimeter', location: 'Belakang Ruko', coordinate: '-6.9391256, 107.6284992', url: 'rtsp://admin:QRT.../av_stream', resolution: '4K', fps: 60, onvif: false, active: true },
];

const AddCameraModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    url: '',
    id: '',
    name: '',
    location: '',
    coordinates: '',
    fps: '30 FPS',
    resolution: '1080p',
    onvif: false
  });
  const [errors, setErrors] = useState<{url?: string, id?: string, name?: string, location?: string}>({});

  const validate = () => {
    let isValid = true;
    const newErrors: typeof errors = {};
    if (!formData.url) { newErrors.url = 'URL is required'; isValid = false; }
    else if (!/^(rtsp|http):\/\//.test(formData.url)) { newErrors.url = 'Must be valid rtsp:// or http:// URL'; isValid = false; }
    if (!formData.id) { newErrors.id = 'ID is required'; isValid = false; }
    if (!formData.name) { newErrors.name = 'Name is required'; isValid = false; }
    if (!formData.location) { newErrors.location = 'Location is required'; isValid = false; }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = () => {
    if (validate()) {
      console.log('Registering camera:', formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
            <div>
                <h2 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                    <Camera className="text-accent" size={16} />
                    Register New Camera
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-[10px] font-bold mt-1">Configure connection and stream parameters.</p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors">
                <X size={18} />
            </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[70vh] bg-white dark:bg-[#1e1e1e]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><LinkIcon size={12}/> Camera URL (RTSP/HTTP)</label>
                        <input 
                            type="text" 
                            value={formData.url}
                            onChange={(e) => setFormData({...formData, url: e.target.value})}
                            placeholder="rtsp://user:pass@192.168.1.100:554/stream" 
                            className={cn("w-full bg-gray-50 dark:bg-[#161616] border rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-mono placeholder:text-gray-700", errors.url ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 dark:border-[#222]")} 
                        />
                        {errors.url && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.url}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><Hash size={12}/> Camera ID</label>
                            <input 
                                type="text" 
                                value={formData.id}
                                onChange={(e) => setFormData({...formData, id: e.target.value})}
                                placeholder="CAM-005" 
                                className={cn("w-full bg-gray-50 dark:bg-[#161616] border rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-700", errors.id ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 dark:border-[#222]")} 
                            />
                            {errors.id && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.id}</p>}
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><Camera size={12}/> Camera Name</label>
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="e.g. Main Entrance" 
                                className={cn("w-full bg-gray-50 dark:bg-[#161616] border rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-700", errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 dark:border-[#222]")} 
                            />
                            {errors.name && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.name}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><MapPin size={12}/> Location Details</label>
                        <input 
                            type="text" 
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            placeholder="e.g. Building A Northwest" 
                            className={cn("w-full bg-gray-50 dark:bg-[#161616] border rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-700", errors.location ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 dark:border-[#222]")} 
                        />
                        {errors.location && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.location}</p>}
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><MapPin size={12}/> Geo Coordinates</label>
                        <input 
                            type="text" 
                            value={formData.coordinates}
                            onChange={(e) => setFormData({...formData, coordinates: e.target.value})}
                            placeholder="-6.9391, 107.6284" 
                            className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-mono placeholder:text-gray-700" 
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><Activity size={12}/> Target FPS</label>
                            <select 
                                value={formData.fps}
                                onChange={(e) => setFormData({...formData, fps: e.target.value})}
                                className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer appearance-none"
                            >
                                <option>15 FPS</option>
                                <option>30 FPS</option>
                                <option>60 FPS</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><Settings size={12}/> Resolution</label>
                            <select 
                                value={formData.resolution}
                                onChange={(e) => setFormData({...formData, resolution: e.target.value})}
                                className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer appearance-none"
                            >
                                <option>720p</option>
                                <option>1080p</option>
                                <option>4K</option>
                            </select>
                        </div>
                    </div>
                    <div className="pt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input 
                                    type="checkbox" 
                                    checked={formData.onvif}
                                    onChange={(e) => setFormData({...formData, onvif: e.target.checked})}
                                    className="peer appearance-none w-5 h-5 rounded border border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#161616] checked:bg-accent checked:border-accent transition-colors cursor-pointer" 
                                />
                                <div className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                                    <Check size={14} />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] font-black text-gray-800 dark:text-gray-200">Enable ONVIF Protocol</span>
                                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest font-black">Auto-discover network features</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-gray-100 dark:bg-[#151515] p-6 rounded-xl border border-gray-200 dark:border-[#222]">
                <div className="aspect-video bg-black rounded-lg border border-gray-200 dark:border-[#222] flex items-center justify-center text-gray-600 text-[10px] font-black shadow-inner flex-col gap-3">
                    <div className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center">
                        <Activity size={20} className="opacity-20" />
                    </div>
                    No Signal Preview
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="text-xs font-black text-gray-900 dark:text-white mb-2">Connection Test</h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-4 font-medium">Test current RTSP stream reachability before finalizing registration.</p>
                    <button onClick={() => console.log('Testing connection...')} className="self-start bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] hover:bg-gray-100 dark:hover:bg-[#252525] text-gray-700 dark:text-gray-300 h-[32px] px-6 rounded-[11px]-full text-[10px] font-black transition-all">
                        Run Diagnostics
                    </button>
                </div>
            </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a] flex justify-between items-center">
          <button onClick={onClose} className="text-gray-500 hover:text-white font-black text-[10px] transition-colors uppercase tracking-widest">
            Cancel
          </button>
          <button onClick={handleCreate} className="bg-accent hover:bg-accent/90 text-black h-[32px] rounded-full text-xs font-bold px-8 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)]">
            Register Camera
          </button>
        </div>
      </div>
    </div>
  );
};

export const CameraManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#161616] p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Camera Management</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Manage and configure connected physical devices.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-accent hover:bg-accent/90 text-black h-8 rounded-full text-xs font-bold px-5 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]"
          >
            <Plus size={14} /> New Camera
          </button>
        </div>
      </div>

      <AddCameraModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 dark:border-[#222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Camera size={16} className="text-gray-500" /> Camera Inventory
          </h2>
          <div className="flex gap-3 w-full sm:w-auto">
             <div className="bg-gray-100 dark:bg-[#151515] px-4 py-2 rounded-xl border border-gray-200 dark:border-[#222] flex items-center gap-2 flex-1 sm:flex-none focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all">
                <Search className="text-gray-600 dark:text-gray-400" size={16} />
                <input type="text" placeholder="Search by name, ID..." className="bg-transparent outline-none text-xs font-medium text-gray-800 dark:text-gray-200 w-full sm:w-48 placeholder-gray-600" />
             </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
                <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-transparent">
                <th className="px-5 py-4 whitespace-nowrap">Status</th>
                <th className="px-5 py-4 whitespace-nowrap">Camera Details</th>
                <th className="px-5 py-4 whitespace-nowrap">Location & Coordinates</th>
                <th className="px-5 py-4 whitespace-nowrap">Stream Info</th>
                <th className="px-5 py-4 whitespace-nowrap">Features</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
              {cameras.map((cam) => (
                <tr key={cam.id} className="hover:bg-white/5 hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-bold", cam.active ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400")}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", cam.active ? "bg-green-500" : "bg-red-500")} />
                        {cam.active ? "Online" : "Offline"}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-gray-900 dark:text-white text-xs mb-0.5">{cam.name}</div>
                    <div className="text-[11px] text-gray-500 font-mono">{cam.id}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-gray-700 dark:text-gray-300 font-medium mb-0.5">{cam.location}</div>
                    <div className="text-[11px] text-gray-500 font-mono flex items-center gap-1">
                        <MapPin size={10} /> {cam.coordinate}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2 mb-1">
                        <span className="bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-700 dark:text-gray-300">{cam.resolution}</span>
                        <span className="bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-700 dark:text-gray-300">{cam.fps} FPS</span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono truncate max-w-[150px] uppercase tracking-widest font-black">{cam.url}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                        {cam.onvif && <span className="bg-accent/10 text-accent border border-accent/20 px-1.5 py-0.5 rounded text-[10px] font-bold">ONVIF</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

