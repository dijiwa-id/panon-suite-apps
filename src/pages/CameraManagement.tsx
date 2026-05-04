
import React, { useState } from 'react';
import { Search, Plus, Check, X, Camera, MapPin, Hash, Link as LinkIcon, Settings, Activity, ChevronDown, Pencil, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { Card, Button, Input, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui';

const initialCameras = [
  { id: 'CAM-001', name: 'Camera 001 / Main Gate', location: 'Perempatan Jalan', coordinate: '-6.9391256, 107.6284992', url: 'rtsp://admin:QRT.../av_stream', resolution: '1080p', fps: 15, onvif: true, active: false },
  { id: 'CAM-002', name: 'Camera 002 / Lobby', location: 'Depan Gedung A', coordinate: '-6.9391256, 107.6284992', url: 'rtsp://admin:QRT.../av_stream', resolution: '1080p', fps: 30, onvif: false, active: true },
  { id: 'CAM-003', name: 'Camera 003 / Parking', location: 'Samping Pasar', coordinate: '-6.9391256, 107.6284992', url: 'rtsp://admin:QRT.../av_stream', resolution: '720p', fps: 15, onvif: true, active: true },
  { id: 'CAM-004', name: 'Camera 004 / Perimeter', location: 'Belakang Ruko', coordinate: '-6.9391256, 107.6284992', url: 'rtsp://admin:QRT.../av_stream', resolution: '4K', fps: 60, onvif: false, active: true },
];

const CameraModal = ({ isOpen, onClose, onSave, editingCamera }: { isOpen: boolean; onClose: () => void; onSave: (camera: any) => void; editingCamera?: any }) => {
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

  React.useEffect(() => {
    if (editingCamera) {
      setFormData({
        url: editingCamera.url || '',
        id: editingCamera.id || '',
        name: editingCamera.name || '',
        location: editingCamera.location || '',
        coordinates: editingCamera.coordinate || '',
        fps: editingCamera.fps ? `${editingCamera.fps} FPS` : '30 FPS',
        resolution: editingCamera.resolution || '1080p',
        onvif: editingCamera.onvif || false
      });
    } else {
      setFormData({
        url: '', id: '', name: '', location: '', coordinates: '', fps: '30 FPS', resolution: '1080p', onvif: false
      });
    }
    setErrors({});
  }, [editingCamera, isOpen]);

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
      onSave({
        ...formData,
        coordinate: formData.coordinates,
        fps: parseInt(formData.fps),
      });
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
                    {editingCamera ? 'Edit Camera' : 'Register New Camera'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-[10px] font-bold mt-1">Configure connection and stream parameters.</p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors">
                <X size={18} />
            </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[70vh] bg-white dark:bg-[#1e1e1e] custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><LinkIcon size={12}/> Camera URL (RTSP/HTTP)</label>
                        <Input 
                            type="text" 
                            value={formData.url}
                            onChange={(e) => setFormData({...formData, url: e.target.value})}
                            placeholder="rtsp://user:pass@192.168.1.100:554/stream" 
                            className={cn("font-mono", errors.url ? "border-red-500 focus-visible:ring-red-500/20" : "")} 
                        />
                        {errors.url && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.url}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><Hash size={12}/> Camera ID</label>
                            <Input 
                                type="text" 
                                value={formData.id}
                                onChange={(e) => setFormData({...formData, id: e.target.value})}
                                placeholder="CAM-005" 
                                className={cn("", errors.id ? "border-red-500 focus-visible:ring-red-500/20" : "")} 
                            />
                            {errors.id && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.id}</p>}
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><Camera size={12}/> Camera Name</label>
                            <Input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="e.g. Main Entrance" 
                                className={cn("", errors.name ? "border-red-500 focus-visible:ring-red-500/20" : "")} 
                            />
                            {errors.name && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.name}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><MapPin size={12}/> Location Details</label>
                        <Input 
                            type="text" 
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            placeholder="e.g. Building A Northwest" 
                            className={cn("", errors.location ? "border-red-500 focus-visible:ring-red-500/20" : "")} 
                        />
                        {errors.location && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.location}</p>}
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><MapPin size={12}/> Geo Coordinates</label>
                        <Input 
                            type="text" 
                            value={formData.coordinates}
                            onChange={(e) => setFormData({...formData, coordinates: e.target.value})}
                            placeholder="-6.9391, 107.6284" 
                            className="font-mono" 
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><Activity size={12}/> Target FPS</label>
                            <div className="relative">
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                    <ChevronDown size={14} />
                                </div>
                                <select 
                                    value={formData.fps}
                                    onChange={(e) => setFormData({...formData, fps: e.target.value})}
                                    className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] font-bold text-gray-700 dark:text-gray-300 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer appearance-none"
                                >
                                    <option>15 FPS</option>
                                    <option>30 FPS</option>
                                    <option>60 FPS</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><Settings size={12}/> Resolution</label>
                            <div className="relative">
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                    <ChevronDown size={14} />
                                </div>
                                <select 
                                    value={formData.resolution}
                                    onChange={(e) => setFormData({...formData, resolution: e.target.value})}
                                    className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] font-bold text-gray-700 dark:text-gray-300 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer appearance-none"
                                >
                                    <option>720p</option>
                                    <option>1080p</option>
                                    <option>4K</option>
                                </select>
                            </div>
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
                    <button onClick={() => toast.promise(new Promise(r => setTimeout(r, 1000)), { loading: 'Testing connection...', success: 'Connection successful' })} className="self-start bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] hover:bg-gray-100 dark:hover:bg-[#252525] text-gray-700 dark:text-gray-300 h-[32px] px-6 rounded-[11px]-full text-[10px] font-black transition-all">
                        Run Diagnostics
                    </button>
                </div>
            </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a] flex justify-between items-center">
          <Button variant="ghost" onClick={onClose} className="uppercase tracking-widest">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            {editingCamera ? 'Update Camera' : 'Register Camera'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CameraManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cameraList, setCameraList] = useState(initialCameras);
  const [editingCamera, setEditingCamera] = useState<any>(null);

  const handleCreateOrUpdate = (cam: any) => {
    if (editingCamera) {
      setCameraList(prev => prev.map(c => c.id === cam.id ? { ...c, ...cam } : c));
    } else {
      setCameraList(prev => [{ ...cam, active: true }, ...prev]);
    }
  };

  const handleDelete = (id: string) => {
    setCameraList(prev => prev.filter(c => c.id !== id));
  };

  const openNewModal = () => {
    setEditingCamera(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cam: any) => {
    setEditingCamera(cam);
    setIsModalOpen(true);
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Camera Management</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Manage and configure connected physical devices.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="primary" onClick={openNewModal} className="w-full md:w-auto gap-2">
            <Plus size={14} /> New Camera
          </Button>
        </div>
      </div>

      <CameraModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleCreateOrUpdate}
        editingCamera={editingCamera}
      />

      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-[#222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Camera size={16} className="text-gray-500" /> Camera Inventory
          </h2>
          <div className="flex gap-3 w-full sm:w-auto">
             <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                <Input type="text" placeholder="Search by name, ID..." className="pl-8" />
             </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Camera Details</TableHead>
                <TableHead>Location & Coordinates</TableHead>
                <TableHead>Stream Info</TableHead>
                <TableHead>Features</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cameraList.map((cam) => (
                <TableRow key={cam.id} className="group">
                  <TableCell>
                    {cam.active ? (
                        <Badge variant="success">Online</Badge>
                    ) : (
                        <Badge variant="danger">Offline</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-gray-900 dark:text-white text-xs mb-0.5">{cam.name}</div>
                    <div className="text-[11px] text-gray-500 font-mono">{cam.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-700 dark:text-gray-300 font-medium mb-0.5 text-xs">{cam.location}</div>
                    <div className="text-[11px] text-gray-500 font-mono flex items-center gap-1">
                        <MapPin size={10} /> {cam.coordinate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 mb-1">
                        <span className="bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-700 dark:text-gray-300">{cam.resolution}</span>
                        <span className="bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-700 dark:text-gray-300">{cam.fps} FPS</span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono truncate max-w-[150px] uppercase tracking-widest font-black">{cam.url}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        {cam.onvif && <span className="bg-[#52C5F3]/10 text-[#52C5F3] border border-[#52C5F3]/20 px-1.5 py-0.5 rounded text-[10px] font-bold">ONVIF</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="outline" className="px-3" onClick={() => openEditModal(cam)}>
                        <Pencil size={12} />
                      </Button>
                      <Button variant="danger" className="px-3" onClick={() => handleDelete(cam.id)}>
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </main>
  );
};

