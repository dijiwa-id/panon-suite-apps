import React from 'react';
import { Search, Box, Copy, Download, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

const models = [
  { id: 'MOD-2026-001', name: 'Security-Cam-YoloV8', version: 'v1.4.2', architecture: 'YOLOv8-m', map: 0.824, param: '25.9M', size: '52 MB', status: 'ready', tags: ['Object Detection', 'Security'] },
  { id: 'MOD-2026-002', name: 'Lobby-Face-ResNet', version: 'v2.0.0', architecture: 'ResNet-50', map: 0.941, param: '23.5M', size: '48 MB', status: 'ready', tags: ['Face Recognition', 'Access Control'] },
  { id: 'MOD-2026-003', name: 'Parking-LPR-DBNet', version: 'v1.1.0', architecture: 'DBNet', map: 0.892, param: '18.2M', size: '36 MB', status: 'deployed', tags: ['OCR', 'LPR'] },
  { id: 'MOD-2026-004', name: 'Perimeter-Night', version: 'v0.9.1', architecture: 'YOLOv8-s', map: 0.450, param: '11.1M', size: '22 MB', status: 'investigating', tags: ['Object Detection', 'Night Vision'] },
];

export const AIModels = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#161616] p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors">
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
          <div className="flex w-full sm:w-auto">
             <div className="bg-gray-100 dark:bg-[#151515] px-4 py-2 rounded-xl border border-gray-200 dark:border-[#222] flex items-center gap-2 flex-1 sm:flex-none focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all">
                <Search className="text-gray-600 dark:text-gray-400" size={16} />
                <input type="text" placeholder="Search models by name or tag..." className="bg-transparent outline-none text-xs font-medium text-gray-800 dark:text-gray-200 w-full sm:w-64 placeholder-gray-600" />
             </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
                <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-transparent">
                <th className="px-5 py-4 whitespace-nowrap">Model Name & Ver</th>
                <th className="px-5 py-4 whitespace-nowrap">Architecture / Params</th>
                <th className="px-5 py-4 whitespace-nowrap">Evaluation (mAP)</th>
                <th className="px-5 py-4 whitespace-nowrap">Tags</th>
                <th className="px-5 py-4 whitespace-nowrap">State</th>
                <th className="px-5 py-4 whitespace-nowrap text-right">Export</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
              {models.map((model) => (
                <tr key={model.id} className="hover:bg-white/5 hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-4">
                      <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-gray-900 dark:text-white text-xs">{model.name}</span>
                          <span className="bg-gray-200 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 font-mono px-1.5 py-0.5 rounded text-[10px]">{model.version}</span>
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest font-black">{model.id}</div>
                  </td>
                  <td className="px-5 py-4">
                      <div className="text-gray-700 dark:text-gray-300 font-medium mb-0.5">{model.architecture}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">{model.param} params • {model.size}</div>
                  </td>
                  <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                          <div className={cn("text-xs font-bold font-mono", model.map > 0.8 ? "text-green-400" : model.map > 0.6 ? "text-orange-400" : "text-red-400")}>
                              {model.map.toFixed(3)}
                          </div>
                      </div>
                  </td>
                  <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                          {model.tags.map(t => (
                              <span key={t} className="bg-accent/10 border border-accent/20 text-accent px-1.5 py-0.5 rounded text-[10px] font-bold">{t}</span>
                          ))}
                      </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                         {model.status === 'ready' && <CheckCircle2 size={14} className="text-gray-600 dark:text-gray-400" />}
                         {model.status === 'deployed' && <CheckCircle2 size={14} className="text-green-500" />}
                         {model.status === 'investigating' && <AlertTriangle size={14} className="text-orange-500" />}
                         <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 capitalize">{model.status}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 flex justify-end gap-2">
                      <button onClick={() => console.log('Viewing details for', model.id)} className="p-1.5 bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] hover:bg-gray-200 dark:hover:bg-gray-200 dark:bg-[#2a2a2a] rounded-lg text-gray-600 dark:text-gray-400 transition-colors" title="View details">
                          <Info size={14} />
                      </button>
                      <button onClick={() => console.log('Exporting ONNX for', model.id)} className="p-1.5 bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] hover:text-white hover:bg-gray-200 dark:hover:bg-gray-200 dark:bg-[#2a2a2a] rounded-lg text-gray-600 dark:text-gray-400 transition-colors" title="Export ONNX">
                          <Download size={14} />
                      </button>
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
