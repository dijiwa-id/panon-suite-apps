import React, { useState } from 'react';
import { Search, Plus, Filter, Database, Play, Pause, MoreVertical, UploadCloud, Image as ImageIcon, X } from 'lucide-react';
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
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#2a2a2a] rounded-2xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white tracking-tight">New Collection Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Task Name</label>
            <input type="text" placeholder="Enter task name" className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Source Camera</label>
              <select className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all">
                <option>Select camera...</option>
                <option>CAM-001</option>
                <option>CAM-042</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Collection Type</label>
              <select className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all">
                <option>Continuous</option>
                <option>Scheduled</option>
                <option>Batch</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Target Volume</label>
              <input type="number" placeholder="10000" className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-5 py-2 rounded-full text-xs font-bold text-gray-400 hover:text-white transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="bg-accent text-black px-6 py-2 rounded-full text-xs font-bold hover:bg-accent/90 transition-colors">
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

const UploadDatasetModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#2a2a2a] rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white tracking-tight">Upload Dataset</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Dataset Name</label>
            <input type="text" placeholder="Enter dataset name" className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all" />
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold text-gray-400 mb-2">Dataset Files (ZIP only)</label>
            <div className="border-2 border-dashed border-[#2a2a2a] rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer">
              <UploadCloud className="text-gray-500 mb-3" size={32} />
              <p className="text-sm text-gray-300 font-medium mb-1">Click or drag files to upload</p>
              <p className="text-xs text-gray-500">Max size 2GB.</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-5 py-2 rounded-full text-xs font-bold text-gray-400 hover:text-white transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="bg-[#1c1c1c] border border-gray-700 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-[#2a2a2a] transition-colors">
            Upload
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
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#161616] text-gray-900 dark:text-gray-200 transition-colors p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white mb-1">Train &gt; Data Collection</h1>
          <p className="text-gray-400 text-xs font-medium">Manage datasets, collection tasks, and annotation progress.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsUploadModalOpen(true)} className="flex items-center gap-2 bg-[#1c1c1c] border border-gray-700 h-[32px] text-white rounded-full text-xs font-bold px-5 hover:bg-[#2a2a2a] transition-colors leading-[12px]">
            <UploadCloud size={14} /> Upload Dataset
          </button>
          <button onClick={() => setIsTaskModalOpen(true)} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-black h-[32px] rounded-full text-xs font-bold px-5 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]">
            <Plus size={14} /> New Collection Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Datasets', value: '24', icon: <Database className="text-blue-400" size={20} /> },
          { label: 'Images Collected', value: '1.2M', icon: <ImageIcon className="text-green-400" size={20} /> },
          { label: 'Active Tasks', value: '8', icon: <Play className="text-accent" size={20} /> },
          { label: 'Pending Annotation', value: '45.2K', icon: <Filter className="text-orange-400" size={20} /> },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-[#1e1e1e] p-5 rounded-2xl border border-gray-200 dark:border-[#2a2a2a] shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-[#151515] border border-[#2a2a2a] flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl border border-gray-200 dark:border-[#2a2a2a] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#2a2a2a] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-white">Active Datasets</h2>
          <div className="flex gap-3 w-full sm:w-auto">
             <div className="bg-[#151515] px-4 py-2 rounded-xl border border-[#2a2a2a] flex items-center gap-2 flex-1 sm:flex-none">
                <Search className="text-gray-400" size={16} />
                <input type="text" placeholder="Search datasets..." className="bg-transparent outline-none text-xs font-medium text-gray-200 w-full sm:w-48" />
             </div>
             <button className="bg-[#151515] p-3 rounded-xl border border-[#2a2a2a] text-gray-400 hover:text-white transition-colors flex items-center justify-center">
                <Filter size={16} />
             </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151515]/80 border-b border-[#2a2a2a] text-gray-500 font-semibold text-xs">
              <tr>
                <th className="px-5 py-4 whitespace-nowrap">Dataset Name</th>
                <th className="px-5 py-4 whitespace-nowrap">Source</th>
                <th className="px-5 py-4 whitespace-nowrap">Type</th>
                <th className="px-5 py-4 whitespace-nowrap">Progress / Volume</th>
                <th className="px-5 py-4 whitespace-nowrap">Status</th>
                <th className="px-5 py-4 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {datasets.map((ds) => (
                <tr key={ds.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-white text-[13px] mb-0.5">{ds.name}</div>
                    <div className="text-gray-500 text-[11px] font-medium">ID: DS-{ds.id.padStart(4, '0')}</div>
                  </td>
                  <td className="px-5 py-4 font-mono text-gray-400 text-xs">{ds.source}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded bg-[#1c1c1c] border border-gray-800 text-gray-300 font-medium text-xs">{ds.type}</span>
                  </td>
                  <td className="px-5 py-4 min-w-[200px]">
                    <div className="flex justify-between text-[11px] mb-2 font-semibold">
                      <span className="text-accent">{ds.annotated.toLocaleString()} Annotated</span>
                      <span className="text-gray-500">{ds.collected.toLocaleString()} Total</span>
                    </div>
                    <div className="w-full bg-[#151515] rounded-full h-1.5 overflow-hidden border border-[#2a2a2a]">
                      <div className="bg-accent h-1.5 rounded-full" style={{ width: `${(ds.annotated / ds.collected) * 100 || 0}%` }}></div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold border",
                      ds.status === 'Collecting' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                      ds.status === 'Completed' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                      ds.status === 'Annotating' ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                      "bg-gray-500/10 text-gray-400 border-gray-500/20"
                    )}>
                      {ds.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {ds.status === 'Collecting' ? (
                          <button className="p-1.5 text-gray-400 hover:text-yellow-400 transition-colors bg-[#151515] border border-[#2a2a2a] rounded-lg"><Pause size={14} /></button>
                      ) : ds.status === 'Paused' ? (
                          <button className="p-1.5 text-gray-400 hover:text-green-400 transition-colors bg-[#151515] border border-[#2a2a2a] rounded-lg"><Play size={14} /></button>
                      ) : null}
                      <button className="p-1.5 text-gray-400 hover:text-accent transition-colors bg-[#151515] border border-[#2a2a2a] rounded-lg"><Database size={14} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-white transition-colors bg-[#151515] border border-[#2a2a2a] rounded-lg"><MoreVertical size={14} /></button>
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
