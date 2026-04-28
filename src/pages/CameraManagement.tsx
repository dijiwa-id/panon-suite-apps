
import React, { useState } from 'react';
import { Search, Plus, Check, X } from 'lucide-react';
import { cn } from '../lib/utils';

const cameras = [
  { id: 'CAM-001', name: 'Camera 001', location: 'Perempatan Jalan', coordinate: '-6.9391256, 107.6284992', url: 'rtsp://admin:QRT.../av_stream', resolution: '1080p', fps: 15, onvif: true, active: false },
  { id: 'CAM-002', name: 'Camera 002', location: 'Depan Gedung A', coordinate: '-6.9391256, 107.6284992', url: 'rtsp://admin:QRT.../av_stream', resolution: '1080p', fps: 15, onvif: false, active: false },
  { id: 'CAM-003', name: 'Camera 003', location: 'Samping Pasar', coordinate: '-6.9391256, 107.6284992', url: 'rtsp://admin:QRT.../av_stream', resolution: '720p', fps: 15, onvif: true, active: true },
  { id: 'CAM-004', name: 'Camera 004', location: 'Belakang Ruko', coordinate: '-6.9391256, 107.6284992', url: 'rtsp://admin:QRT.../av_stream', resolution: '4K', fps: 15, onvif: false, active: true },
];

const AddCameraModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl shadow-2xl w-full max-w-4xl p-8">
        <h2 className="text-xl font-black text-white mb-8 tracking-tight">Add Camera</h2>
        
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
          {[
            { label: 'Camera URL' },
            { label: 'Camera ID' },
            { label: 'Camera Name' },
            { label: 'Location' },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{field.label}</label>
              <input type="text" placeholder={field.label} className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all" />
            </div>
          ))}
          </div>
          <div className="space-y-6">
            {[
              { label: 'Coordinates' },
              { label: 'Resolution' },
              { label: 'FPS' },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{field.label}</label>
                <input type="text" placeholder={field.label} className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="aspect-video bg-black rounded-xl border border-[#2a2a2a] flex items-center justify-center text-gray-500 text-xs">
            Camera Preview Placeholder
          </div>
          <div className="bg-[#161616] rounded-xl border border-[#2a2a2a] p-6 text-center">
             <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">H.265 / ONVIF</div>
             <div className="grid grid-cols-4 gap-3">
                {[...Array(12)].map((_, i) => <div key={i} className="w-10 h-10 rounded-lg bg-[#1e1e1e] border border-[#2a2a2a]"></div>)}
             </div>
          </div>
        </div>

        <div className="flex justify-between mt-8 items-center">
          <button onClick={onClose} className="text-gray-500 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="bg-[#1c1c1c] border border-gray-700 h-[29px] text-white rounded-full text-xs font-bold uppercase tracking-wide px-6 hover:bg-[#2a2a2a] transition-colors leading-[12px]">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export const CameraManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto bg-[#161616] p-6 md:p-8 text-gray-200 transition-colors">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black tracking-tight text-white">Camera Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#1c1c1c] border border-gray-700 h-[29px] text-white rounded-full text-xs font-bold uppercase tracking-wide w-24 leading-[12px] pl-5 hover:bg-[#2a2a2a] transition-colors"
        >
          <Plus size={16} /> New
        </button>
      </div>

      <AddCameraModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="bg-[#1e1e1e] p-4 rounded-xl border border-[#2a2a2a] mb-6 shadow-sm flex items-center gap-2">
        <Search className="text-gray-400" size={20} />
        <input type="text" placeholder="Search by Name..." className="bg-transparent flex-1 outline-none text-sm text-gray-200" />
      </div>

      <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#151515] border-b border-[#2a2a2a] text-gray-500 uppercase tracking-widest font-black">
            <tr>
              {['ID', 'Name', 'Location', 'Coordinate', 'URL', 'Resolution', 'FPS', 'ONVIF', 'Active'].map(header => (
                <th key={header} className="px-6 py-4">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2a2a]">
            {cameras.map((cam) => (
              <tr key={cam.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-bold text-white">{cam.id}</td>
                <td className="px-6 py-4 text-gray-300">{cam.name}</td>
                <td className="px-6 py-4 text-gray-400">{cam.location}</td>
                <td className="px-6 py-4 font-mono text-gray-400">{cam.coordinate}</td>
                <td className="px-6 py-4 font-mono text-gray-400 truncate max-w-[150px]">{cam.url}</td>
                <td className="px-6 py-4 text-gray-300">{cam.resolution}</td>
                <td className="px-6 py-4 text-gray-300">{cam.fps}</td>
                <td className="px-6 py-4">{cam.onvif ? <Check className="text-accent" size={16} /> : <X className="text-[#2a2a2a]" size={16} />}</td>
                <td className="px-6 py-4">{cam.active ? <Check className="text-accent" size={16} /> : <X className="text-[#2a2a2a]" size={16} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
