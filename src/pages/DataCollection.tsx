import React, { useState } from 'react';
import { Search, Plus, Filter, Database, Play, Pause, MoreVertical, UploadCloud, Image as ImageIcon, X, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const datasets = [
  { id: '1', name: 'Traffic Intersection A', source: 'CAM-001', collected: 15420, annotated: 12000, status: 'Collecting', type: 'Continuous' },
  { id: '2', name: 'Retail Store Entrance', source: 'CAM-042', collected: 8500, annotated: 8500, status: 'Completed', type: 'Batch' },
  { id: '3', name: 'Warehouse Safety Gear', source: 'Upload', collected: 3200, annotated: 150, status: 'Annotating', type: 'Manual' },
  { id: '4', name: 'Parking Lot Night Vision', source: 'CAM-015', collected: 4500, annotated: 0, status: 'Paused', type: 'Scheduled' },
];

const NewTaskModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-[#222] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-black text-gray-900 dark:text-white">New Collection Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="p-6 space-y-5">
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Task Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Morning Traffic Flow" 
              className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-700" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Source Camera</label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
                <select className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] font-bold text-gray-700 dark:text-gray-300 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all appearance-none cursor-pointer">
                  <option>Select camera...</option>
                  <option>CAM-001</option>
                  <option>CAM-042</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Collection Type</label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
                <select className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] font-bold text-gray-700 dark:text-gray-300 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all appearance-none cursor-pointer">
                  <option>Continuous</option>
                  <option>Scheduled</option>
                  <option>Batch</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Target Volume (Images)</label>
            <input 
              type="number" 
              placeholder="10000" 
              className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-700" 
            />
          </div>

          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-[#222] items-center">
            <button 
              type="button"
              onClick={onClose} 
              className="text-gray-500 hover:text-white font-black text-[10px] transition-colors uppercase tracking-widest"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-accent hover:bg-accent/90 text-black h-[32px] rounded-full text-xs font-bold px-8 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UploadDatasetModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-[#222] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-black text-gray-900 dark:text-white">Upload Dataset</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Dataset Name</label>
            <input 
              type="text" 
              placeholder="e.g. Training Set July" 
              className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-700" 
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Dataset Files (ZIP only)</label>
            <div className="border-2 border-dashed border-gray-200 dark:border-[#222] rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-accent group transition-all bg-gray-50 dark:bg-[#161616]/50 cursor-pointer">
              <div className="w-12 h-12 bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:border-accent transition-all mb-4">
                <UploadCloud className="text-gray-500 group-hover:text-accent" size={24} />
              </div>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1">Click or drag & drop</p>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">ZIP Format (Max 2GB)</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-[#222] flex gap-3 justify-between items-center bg-gray-50/50 dark:bg-[#1a1a1a]">
          <button 
            type="button"
            onClick={onClose} 
            className="text-gray-500 hover:text-white font-black text-[10px] transition-colors uppercase tracking-widest"
          >
            Cancel
          </button>
          <button 
            onClick={() => { console.log('Uploading dataset...'); onClose(); }} 
            className="bg-accent hover:bg-accent/90 text-black h-[32px] rounded-full text-xs font-bold px-8 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]"
          >
            Start Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export const DataCollection = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto bg-transparent text-gray-900 dark:text-gray-200 transition-colors p-6 md:p-8 custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Train &gt; Data Collection</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Manage datasets, collection tasks, and annotation progress.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsUploadModalOpen(true)} className="flex items-center gap-2 bg-white dark:bg-[#1c1c1c] border border-gray-300 dark:border-gray-700 h-8 text-gray-900 dark:text-white rounded-full text-xs font-bold px-5 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors leading-[12px]">
            <UploadCloud size={14} /> Upload Dataset
          </button>
          <button onClick={() => setIsTaskModalOpen(true)} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-black h-8 rounded-full text-xs font-bold px-5 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]">
            <Plus size={14} /> New Collection Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {[
          { label: 'Total Datasets', value: '24', icon: <Database className="text-blue-400" size={20} /> },
          { label: 'Images Collected', value: '1.2M', icon: <ImageIcon className="text-green-400" size={20} /> },
          { label: 'Active Tasks', value: '8', icon: <Play className="text-accent" size={20} /> },
          { label: 'Pending Annotation', value: '45.2K', icon: <Filter className="text-orange-400" size={20} /> },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-[#1e1e1e] p-4 rounded-[11px] border border-gray-200 dark:border-[#222] shadow-sm flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black text-gray-500 mb-1 uppercase tracking-widest">{stat.label}</div>
              <div className="text-[18px] font-bold text-gray-900 dark:text-white tracking-tight">{stat.value}</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 dark:border-[#222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Active Datasets</h2>
          <div className="flex gap-3 w-full sm:w-auto">
             <div className="bg-gray-100 dark:bg-[#151515] px-4 py-2 rounded-xl border border-gray-200 dark:border-[#222] flex items-center gap-2 flex-1 sm:flex-none focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all">
                <Search className="text-gray-600 dark:text-gray-400" size={16} />
                <input type="text" placeholder="Search datasets..." className="bg-transparent outline-none text-xs font-medium text-gray-800 dark:text-gray-200 w-full sm:w-64 placeholder-gray-600" />
             </div>
             <button className="bg-gray-100 dark:bg-[#151515] p-3 rounded-xl border border-gray-200 dark:border-[#222] text-gray-600 dark:text-gray-400 hover:text-white transition-colors flex items-center justify-center">
                <Filter size={16} />
             </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
                <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-transparent">
                <th className="px-5 py-4 whitespace-nowrap">Dataset Name</th>
                <th className="px-5 py-4 whitespace-nowrap">Source</th>
                <th className="px-5 py-4 whitespace-nowrap">Type</th>
                <th className="px-5 py-4 whitespace-nowrap">Progress / Volume</th>
                <th className="px-5 py-4 whitespace-nowrap">Status</th>
                <th className="px-5 py-4 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
              {datasets.map((ds) => (
                <tr key={ds.id} className="hover:bg-white/5 hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-gray-900 dark:text-white text-xs mb-0.5">{ds.name}</div>
                    <div className="text-gray-500 text-[11px] font-medium">ID: DS-{ds.id.padStart(4, '0')}</div>
                  </td>
                  <td className="px-5 py-4 font-mono text-gray-600 dark:text-gray-400 text-xs">{ds.source}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded bg-white dark:bg-[#1c1c1c] border border-gray-800 text-gray-700 dark:text-gray-300 font-medium text-xs">{ds.type}</span>
                  </td>
                  <td className="px-5 py-4 min-w-[200px]">
                    <div className="flex justify-between text-[11px] mb-2 font-semibold">
                      <span className="text-accent">{ds.annotated.toLocaleString()} Annotated</span>
                      <span className="text-gray-500">{ds.collected.toLocaleString()} Total</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-[#151515] rounded-full h-1.5 overflow-hidden border border-gray-200 dark:border-[#222]">
                      <div className="bg-accent h-1.5 rounded-full" style={{ width: `${(ds.annotated / ds.collected) * 100 || 0}%` }}></div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold border",
                      ds.status === 'Collecting' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                      ds.status === 'Completed' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                      ds.status === 'Annotating' ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                      "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20"
                    )}>
                      {ds.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {ds.status === 'Collecting' ? (
                          <button className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-yellow-400 transition-colors bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-lg"><Pause size={14} /></button>
                      ) : ds.status === 'Paused' ? (
                          <button className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-green-400 transition-colors bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-lg"><Play size={14} /></button>
                      ) : null}
                      <button className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-lg"><Database size={14} /></button>
                      <button className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-white transition-colors bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-lg"><MoreVertical size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <NewTaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
      <UploadDatasetModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </main>
  );
};
