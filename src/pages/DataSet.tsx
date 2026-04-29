import React, { useState } from 'react';
import { Search, Plus, HardDrive, Filter, Clock, CheckCircle2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const initialDatasets = [
  { id: 'DS-2026-001', name: 'Main Gate Vehicles', type: 'Object Detection', samples: 12500, annotations: 45000, size: '4.2 GB', lastUpdated: '2 hours ago', status: 'ready' },
  { id: 'DS-2026-002', name: 'Lobby Faces', type: 'Face Recognition', samples: 8300, annotations: 8300, size: '2.1 GB', lastUpdated: '5 hours ago', status: 'annotating' },
  { id: 'DS-2026-003', name: 'Perimeter Intrusion', type: 'Object Detection', samples: 24000, annotations: 32000, size: '8.5 GB', lastUpdated: '1 day ago', status: 'ready' },
  { id: 'DS-2026-004', name: 'Parking Lot LPR', type: 'Optical Character Recognition', samples: 5400, annotations: 6800, size: '1.2 GB', lastUpdated: '2 days ago', status: 'uploading' },
];

export const DataSet = () => {
  const [datasets, setDatasets] = useState(initialDatasets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDataset, setNewDataset] = useState({ name: '', type: 'Object Detection', description: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleCreate = () => {
    if (newDataset.name.trim()) {
      const newEntry = {
        id: `DS-2026-00${datasets.length + 1}`,
        name: newDataset.name,
        type: newDataset.type,
        samples: 0,
        annotations: 0,
        size: '0 MB',
        lastUpdated: 'Just now',
        status: 'uploading'
      };
      setDatasets([newEntry, ...datasets]);
      setIsModalOpen(false);
      setNewDataset({ name: '', type: 'Object Detection', description: '' });
    }
  };

  const filteredDatasets = datasets.filter(ds => 
      ds.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ds.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDatasets = datasets.length;
  const totalSamples = datasets.reduce((acc, ds) => acc + ds.samples, 0);
  const totalAnnotated = datasets.reduce((acc, ds) => acc + ds.annotations, 0);
  
  const parseSize = (sizeStr: string) => {
    const val = parseFloat(sizeStr.split(' ')[0]) || 0;
    const unit = sizeStr.split(' ')[1] || 'MB';
    if (unit === 'GB') return val * 1024;
    return val;
  };

  const totalStorageMB = datasets.reduce((acc, ds) => acc + parseSize(ds.size), 0);
  const totalStorageStr = totalStorageMB >= 1024 ? `${(totalStorageMB / 1024).toFixed(1)} GB` : `${totalStorageMB.toFixed(1)} MB`;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#161616] p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Data Sets</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Manage and organize data collections for model training.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 bg-white dark:bg-[#1c1c1c] border border-gray-300 dark:border-gray-700 h-8 text-gray-900 dark:text-white rounded-full text-xs font-bold px-5 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors leading-[12px]">
            <Filter size={14} /> Filter
          </button>
          <button 
             onClick={() => setIsModalOpen(true)}
             className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-accent hover:bg-accent/90 text-black h-8 rounded-full text-xs font-bold px-5 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]"
          >
            <Plus size={14} /> New Data Set
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {[
          { label: 'Total Datasets', value: totalDatasets.toString(), icon: <HardDrive size={20} className="text-accent" /> },
          { label: 'Total Samples', value: formatNumber(totalSamples), icon: <div className="text-secondary font-bold text-lg">S</div> },
          { label: 'Annotated', value: formatNumber(totalAnnotated), icon: <CheckCircle2 size={20} className="text-green-500" /> },
          { label: 'Storage Used', value: totalStorageStr, icon: <Clock size={20} className="text-purple-400" /> },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-[#1e1e1e] p-4 rounded-[11px] border border-gray-200 dark:border-[#222] shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-500 font-black tracking-widest uppercase mb-1">{stat.label}</p>
              <h3 className="text-[18px] font-black text-gray-900 dark:text-white tracking-tight">{stat.value}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] flex items-center justify-center shrink-0">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 dark:border-[#222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Dataset Overview
          </h2>
          <div className="flex w-full sm:w-auto">
             <div className="bg-gray-100 dark:bg-[#151515] px-4 py-2 rounded-xl border border-gray-200 dark:border-[#222] flex items-center gap-2 flex-1 sm:flex-none focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all">
                <Search className="text-gray-600 dark:text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search datasets..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-xs font-medium text-gray-800 dark:text-gray-200 w-full sm:w-64 placeholder-gray-600" 
                />
             </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
                <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-transparent">
                <th className="px-5 py-4 whitespace-nowrap">Dataset Name</th>
                <th className="px-5 py-4 whitespace-nowrap">Task Type</th>
                <th className="px-5 py-4 whitespace-nowrap">Size & Volume</th>
                <th className="px-5 py-4 whitespace-nowrap">Status</th>
                <th className="px-5 py-4 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
              {filteredDatasets.map((ds) => (
                <tr 
                  key={ds.id} 
                  className="hover:bg-white/5 hover:bg-gray-50 transition-colors group cursor-pointer"
                  onClick={() => navigate('/train/image-annotation')}
                >
                  <td className="px-5 py-4">
                      <div className="font-semibold text-gray-900 dark:text-white text-xs mb-0.5">{ds.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono tracking-wide uppercase tracking-widest font-black">{ds.id} • {ds.lastUpdated}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    <span className="bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] px-2 py-1 rounded text-[10px] font-medium tracking-wide">
                        {ds.type}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-4">
                        <div>
                            <div className="text-gray-900 dark:text-white font-medium">{ds.samples.toLocaleString()} items</div>
                            <div className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest font-black">{ds.annotations.toLocaleString()} labels</div>
                        </div>
                        <div className="font-mono text-gray-600 dark:text-gray-400 text-xs tracking-wider border-l border-gray-200 dark:border-[#222] pl-4">{ds.size}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold", 
                        ds.status === 'ready' ? "bg-green-500/10 border-green-500/20 text-green-400" : 
                        ds.status === 'annotating' ? "bg-accent/10 border-accent/20 text-accent" :
                        "bg-orange-500/10 border-orange-500/20 text-orange-400"
                    )}>
                        {ds.status}
                    </div>
                  </td>
                  <td className="px-5 py-4 flex gap-2 justify-end">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/train/image-annotation');
                      }}
                      className="px-3 py-1.5 text-black bg-white hover:bg-gray-200 transition-colors border border-gray-200 dark:border-[#222] rounded-lg text-[10px] font-bold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Dataset Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(82,197,243,0.8)]"></div>
                New Data Set
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
               <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Dataset Name</label>
                  <input 
                      type="text" 
                      placeholder="e.g. Lobby Entrance Validation"
                      value={newDataset.name}
                      onChange={(e) => setNewDataset({ ...newDataset, name: e.target.value })}
                      className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all placeholder-gray-600 font-medium"
                  />
               </div>
               <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Task Type</label>
                  <select 
                      value={newDataset.type}
                      onChange={(e) => setNewDataset({ ...newDataset, type: e.target.value })}
                      className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all font-medium appearance-none"
                  >
                      <option value="Object Detection">Object Detection</option>
                      <option value="Face Recognition">Face Recognition</option>
                      <option value="Optical Character Recognition">Optical Character Recognition</option>
                      <option value="Image Classification">Image Classification</option>
                      <option value="Instance Segmentation">Instance Segmentation</option>
                  </select>
               </div>
               <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description (Optional)</label>
                  <textarea 
                      placeholder="Brief description of this dataset..."
                      value={newDataset.description}
                      onChange={(e) => setNewDataset({ ...newDataset, description: e.target.value })}
                      className="w-full h-20 bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all placeholder-gray-600 resize-none font-medium"
                  ></textarea>
               </div>
            </div>

            <div className="p-5 border-t border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a] flex justify-end gap-3">
               <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-full border border-gray-200 dark:border-[#222] text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gray-100 dark:hover:bg-[#202020] transition-colors text-xs font-bold"
                >
                  Cancel
               </button>
               <button 
                 onClick={handleCreate}
                 disabled={!newDataset.name.trim()}
                 className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-black h-8 rounded-full text-xs font-bold px-6 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 Create Dataset
               </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
