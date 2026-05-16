import React, { useState } from 'react';
import { Search, Box, Copy, Download, Info, CheckCircle2, AlertTriangle, Loader } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { useTrain } from '../context/TrainContext';
import { Select } from '../components/ui';

export const AIModels = () => {
  const { models } = useTrain();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');

  const allTags = Array.from(new Set(models.flatMap((m: any) => m.tags)));

  const handleExport = (model: any) => {
    toast.promise(new Promise<void>(resolve => {
      setTimeout(() => {
        const content = `Mock ONNX model artifact for ${model.name} (${model.version})`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${model.name}-${model.version}.onnx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        resolve();
      }, 1000);
    }), { 
        loading: `Exporting ONNX for ${model.name}...`, 
        success: `Export completed for ${model.name}`,
        error: `Failed to export ${model.name}`
    });
  };

  const filteredModels = models.filter((model: any) => {
     const matchQuery = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        model.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
     const matchStatus = selectedStatus === 'All' || model.status.toLowerCase() === selectedStatus.toLowerCase();
     const matchTag = selectedTag === 'All' || model.tags.includes(selectedTag);
     return matchQuery && matchStatus && matchTag;
  });

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">AI Models Workspace</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Review, evaluate, and export trained model artifacts.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 dark:border-[#222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Box size={16} className="text-gray-500" /> Trained Artifacts
          </h2>
          <div className="flex w-full sm:w-auto gap-3 flex-wrap sm:flex-nowrap">
             <div className="flex items-center gap-2 w-full sm:w-auto">
               <Select 
                 className="w-full sm:w-auto bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl px-3 h-[36px] text-xs font-bold text-gray-700 dark:text-gray-300 outline-none focus-visible:ring-1 focus-visible:ring-accent/50 transition-all"
                 value={selectedStatus}
                 onChange={(e) => setSelectedStatus(e.target.value)}
               >
                 <option value="All">All Statuses</option>
                 <option value="ready">Ready</option>
                 <option value="deployed">Deployed</option>
                 <option value="investigating">Investigating</option>
               </Select>

               <Select 
                 className="w-full sm:w-auto bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl px-3 h-[36px] text-xs font-bold text-gray-700 dark:text-gray-300 outline-none focus-visible:ring-1 focus-visible:ring-accent/50 transition-all"
                 value={selectedTag}
                 onChange={(e) => setSelectedTag(e.target.value)}
               >
                 <option value="All">All Tags</option>
                 {allTags.map(tag => (
                   <option key={tag as string} value={tag as string}>{tag as string}</option>
                 ))}
               </Select>
             </div>
             <div className="bg-gray-100 dark:bg-[#151515] px-4 py-2 rounded-xl border border-gray-200 dark:border-[#222] flex items-center gap-2 flex-1 sm:flex-none focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all">
                <Search className="text-gray-600 dark:text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search models by name or tag..." 
                  className="bg-transparent outline-none text-xs font-medium text-gray-800 dark:text-gray-200 w-full sm:w-64 placeholder-gray-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
                <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-transparent">
                <th className="px-5 py-4 whitespace-nowrap">Model Name & Ver</th>
                <th className="px-5 py-4 whitespace-nowrap">Model Details</th>
                <th className="px-5 py-4 whitespace-nowrap">Evaluation (mAP)</th>
                <th className="px-5 py-4 whitespace-nowrap">Tags</th>
                <th className="px-5 py-4 whitespace-nowrap">State</th>
                <th className="px-5 py-4 whitespace-nowrap text-right">Export</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
              {filteredModels.map((model: any) => (
                <tr key={model.id} className="hover:bg-gray-50 dark:hover:bg-[#252525]/30 transition-colors group">
                  <td className="px-5 py-4" title={`Model Name: ${model.name}\nVersion: ${model.version}\nID: ${model.id}`}>
                      <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-gray-900 dark:text-white text-[13px] tracking-tight">{model.name}</span>
                          <span className="bg-gray-100 dark:bg-[#222] text-gray-700 dark:text-gray-300 font-mono px-1.5 py-0.5 rounded text-[10px] font-bold">{model.version}</span>
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest font-black leading-none">{model.id}</div>
                  </td>
                  <td className="px-5 py-4" title={`Architecture: ${model.architecture}\nParameters: ${model.param}\nSize: ${model.size}`}>
                      <div className="text-[13px] text-gray-900 dark:text-white font-medium tracking-tight mb-0.5">{model.architecture}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold leading-none">{model.param} params • {model.size}</div>
                  </td>
                  <td className="px-5 py-4" title={`Mean Average Precision (mAP): ${model.map.toFixed(3)}`}>
                      <div className={cn("text-[13px] font-black font-mono tracking-tight", model.map > 0.8 ? "text-green-500" : model.map > 0.6 ? "text-orange-500" : "text-red-500")}>
                          {model.map.toFixed(3)}
                      </div>
                  </td>
                  <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                          {model.tags.map((t: string) => (
                              <span key={t} className="bg-accent/10 border border-accent/20 text-accent px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide">{t}</span>
                          ))}
                      </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase",
                      model.status === 'ready' && "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20",
                      model.status === 'deployed' && "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
                      model.status === 'investigating' && "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20"
                    )}>
                         {model.status === 'ready' && <CheckCircle2 size={12} />}
                         {model.status === 'deployed' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                         {model.status === 'investigating' && <Loader size={12} className="animate-spin" />}
                         {model.status}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => toast.info(`Viewing details for ${model.name}`)} className="p-1.5 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white/70 hover:text-white hover:bg-[#2a2a2a] transition-all" title="View details">
                          <Info size={14} />
                      </button>
                      <button onClick={() => handleExport(model)} className="p-1.5 bg-[#1c1c1c] border border-accent/20 rounded-lg text-accent hover:bg-accent hover:text-[#161616] transition-all shadow-sm" title="Export ONNX">
                          <Download size={14} />
                      </button>
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
