import React, { useState } from 'react';
import { Settings, Save, Cpu, Layers, BarChart3, Wifi } from 'lucide-react';
import { cn } from '../lib/utils';

export const Configuration = () => {
  const [model, setModel] = useState('YOLOv8-Small');
  const [threshold, setThreshold] = useState(0.75);
  const [useGPU, setUseGPU] = useState(true);
  const [streamURL, setStreamURL] = useState('rtsp://vision-edge-01.local:554/stream');

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#161616] p-6 md:p-8 text-gray-900 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-xl font-bold text-white mb-2">Edge System Configuration</h1>
              <p className="text-gray-400 text-xs font-medium">Manage AI inference and processing parameters</p>
            </div>
            <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-black h-[32px] rounded-lg text-xs font-bold px-5 transition-shadow shadow-[0_0_15px_rgba(82,197,243,0.2)]">
              <Save size={14} /> Save Configuration
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Model Config */}
          <div className="bg-[#1e1e1e] rounded-2xl border border-[#2a2a2a] p-6 space-y-4">
            <div className="flex items-center gap-3 text-white font-bold mb-4">
              <Cpu size={20} className="text-accent" /> AI Model Engine
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Inference Model</label>
              <select value={model} onChange={(e) => setModel(e.target.value)} className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white focus:border-accent outline-none">
                 <option>YOLOv8-Small</option>
                 <option>YOLOv8-Medium</option>
                 <option>YOLOv8-Large</option>
                 <option>RT-DETR</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Confidence Threshold ({threshold})</label>
              <input type="range" min="0" max="1" step="0.05" value={threshold} onChange={(e) => setThreshold(parseFloat(e.target.value))} className="w-full accent-accent" />
            </div>
          </div>

          {/* Processing Config */}
          <div className="bg-[#1e1e1e] rounded-2xl border border-[#2a2a2a] p-6 space-y-4">
            <div className="flex items-center gap-3 text-white font-bold mb-4">
              <Layers size={20} className="text-accent" /> Processing Engine
            </div>
             <div className="flex items-center justify-between">
                <span className="text-sm">Hardware Acceleration (GPU)</span>
                <button onClick={() => setUseGPU(!useGPU)} className={cn("w-10 h-6 rounded-full transition-colors", useGPU ? "bg-accent" : "bg-[#2a2a2a]")}>
                   <div className={cn("w-4 h-4 rounded-full bg-white transition-transform mx-1", useGPU ? "translate-x-4" : "translate-x-0")}></div>
                </button>
             </div>
             <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Batch Size</label>
              <input type="number" defaultValue={1} className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white focus:border-accent outline-none" />
            </div>
          </div>

          {/* Integration Config */}
          <div className="bg-[#1e1e1e] rounded-2xl border border-[#2a2a2a] p-6 space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 text-white font-bold mb-4">
              <Wifi size={20} className="text-accent" /> Stream & Integration
            </div>
             <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Primary Stream Source</label>
              <input type="text" value={streamURL} onChange={(e) => setStreamURL(e.target.value)} className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white focus:border-accent outline-none" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
