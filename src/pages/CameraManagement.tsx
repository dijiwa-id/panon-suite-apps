
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col">
        
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a] bg-[#1a1a1a]">
            <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Camera className="text-accent" size={20} />
                    Register New Camera
                </h2>
                <p className="text-gray-400 text-xs font-medium mt-1">Configure connection and stream parameters.</p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-white bg-[#151515] border border-[#2a2a2a] rounded-xl transition-colors">
                <X size={18} />
            </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                <div className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5"><LinkIcon size={14}/> Camera URL (RTSP/HTTP)</label>
                        <input type="text" placeholder="e.g., rtsp://user:pass@192.168.1.100:554/stream" className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5"><Hash size={14}/> Camera ID</label>
                            <input type="text" placeholder="CAM-005" className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all uppercase outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5"><Camera size={14}/> Camera Name</label>
                            <input type="text" placeholder="Description/Location" className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5"><MapPin size={14}/> Location Details</label>
                        <input type="text" placeholder="e.g., Main Gate Entrance" className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all" />
                    </div>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5"><MapPin size={14}/> Geo Coordinates (Lat, Lng)</label>
                        <input type="text" placeholder="-6.9391256, 107.6284992" className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5"><Activity size={14}/> Target FPS</label>
                            <select className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm font-medium text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer">
                                <option>15 FPS (Default)</option>
                                <option>30 FPS</option>
                                <option>60 FPS (High Performance)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5"><Settings size={14}/> Resolution Limit</label>
                            <select className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm font-medium text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer">
                                <option>720p</option>
                                <option>1080p (FHD)</option>
                                <option>4K</option>
                            </select>
                        </div>
                    </div>
                    <div className="pt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input type="checkbox" className="peer appearance-none w-5 h-5 rounded border border-[#2a2a2a] bg-[#161616] checked:bg-accent checked:border-accent transition-colors cursor-pointer" />
                                <div className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2.5 6 5 8.5 9.5 3.5"></polyline></svg>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">Enable ONVIF Protocol</span>
                                <span className="text-[10px] text-gray-500">Auto-discover network features</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a]">
                <div className="aspect-video bg-black rounded-xl border border-[#2a2a2a] flex items-center justify-center text-gray-500 text-xs shadow-sm flex-col gap-2">
                    <Activity size={24} className="opacity-50" />
                    No Signal Preview
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="text-sm font-bold text-white mb-2">Connection Test</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">Click below to test the connection stream before saving. Make sure your RTSP URL is accessible from the server.</p>
                    <button className="self-start bg-[#161616] border border-[#2a2a2a] hover:bg-[#2a2a2a] text-gray-300 h-[32px] px-5 rounded-full text-xs font-bold transition-colors">
                        Test Connection
                    </button>
                </div>
            </div>
        </div>

        <div className="p-6 border-t border-[#2a2a2a] bg-[#1a1a1a] flex justify-end items-center gap-3">
          <button onClick={onClose} className="text-gray-400 hover:text-white font-semibold text-xs px-4 transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="bg-accent hover:bg-accent/90 text-black h-[36px] rounded-full text-xs font-bold px-8 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)]">
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
    <main className="flex-1 overflow-y-auto bg-[#161616] p-6 lg:p-8 text-gray-200 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white mb-1">Camera Management</h1>
          <p className="text-gray-400 text-xs font-medium">Manage and configure connected physical devices.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-accent hover:bg-accent/90 text-black h-[36px] rounded-full text-xs font-bold px-6 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]"
          >
            <Plus size={14} /> New Camera
          </button>
        </div>
      </div>

      <AddCameraModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="bg-[#1e1e1e] rounded-2xl border border-[#2a2a2a] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#2a2a2a] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Camera size={16} className="text-gray-500" /> Camera Inventory
          </h2>
          <div className="flex gap-3 w-full sm:w-auto">
             <div className="bg-[#151515] px-4 py-2 rounded-xl border border-[#2a2a2a] flex items-center gap-2 flex-1 sm:flex-none focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all">
                <Search className="text-gray-400" size={16} />
                <input type="text" placeholder="Search by name, ID..." className="bg-transparent outline-none text-xs font-medium text-gray-200 w-full sm:w-48 placeholder-gray-600" />
             </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151515]/90 border-b border-[#2a2a2a] text-gray-500 font-semibold sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="px-5 py-4 whitespace-nowrap">Status</th>
                <th className="px-5 py-4 whitespace-nowrap">Camera Details</th>
                <th className="px-5 py-4 whitespace-nowrap">Location & Coordinates</th>
                <th className="px-5 py-4 whitespace-nowrap">Stream Info</th>
                <th className="px-5 py-4 whitespace-nowrap">Features</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {cameras.map((cam) => (
                <tr key={cam.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-4">
                    <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider", cam.active ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400")}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", cam.active ? "bg-green-500" : "bg-red-500")} />
                        {cam.active ? "Online" : "Offline"}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-white text-sm mb-0.5">{cam.name}</div>
                    <div className="text-[11px] text-gray-500 font-mono">{cam.id}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-gray-300 font-medium mb-0.5">{cam.location}</div>
                    <div className="text-[11px] text-gray-500 font-mono flex items-center gap-1">
                        <MapPin size={10} /> {cam.coordinate}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2 mb-1">
                        <span className="bg-[#151515] border border-[#2a2a2a] px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-300 tracking-wide">{cam.resolution}</span>
                        <span className="bg-[#151515] border border-[#2a2a2a] px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-300 tracking-wide">{cam.fps} FPS</span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono truncate max-w-[150px]">{cam.url}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                        {cam.onvif && <span className="bg-accent/10 text-accent border border-accent/20 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide">ONVIF</span>}
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

