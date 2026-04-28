import React, { useState } from 'react';
import { Search, Upload, Database, CheckCircle, BrainCircuit, Box, Trash2, ShieldCheck, FileCheck } from 'lucide-react';
import { cn } from '../lib/utils';

const models = [
  { id: '1', filename: 'Model-2026-Security-80-001', type: 'Intrusion & Weapon', classes: ['Vehicle', 'Person', 'Weapon', 'Crowd'], confidence: 0.8 },
  { id: '2', filename: 'Model-2026-ALPR-60-001', type: 'LPR / Vehicle', classes: ['License Plate'], confidence: 0.6 },
  { id: '3', filename: 'Model-2026-Sanitation-90-001', type: 'Environmental', classes: ['Person', 'Water', 'Vehicle'], confidence: 0.9 },
  { id: '4', filename: 'Model-2026-Landscape-75-001', type: 'Property Monitoring', classes: ['Tree', 'Person', 'Vehicle'], confidence: 0.75 },
];

export const ModelManagement = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-[#161616] p-6 lg:p-8 text-gray-200 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white mb-1">Model Management</h1>
          <p className="text-gray-400 text-xs font-medium">Upload, manage, and verify AI models for edge inferences.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-accent hover:bg-accent/90 text-black h-[36px] rounded-full text-xs font-bold px-6 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]">
            <Upload size={14} /> Upload Custom Model (.onnx)
          </button>
        </div>
      </div>

      <div className="bg-[#1e1e1e] rounded-2xl border border-[#2a2a2a] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#2a2a2a] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <BrainCircuit size={16} className="text-gray-500" /> Compiled Models Library
          </h2>
          <div className="flex gap-3 w-full sm:w-auto">
             <div className="bg-[#151515] px-4 py-2 rounded-xl border border-[#2a2a2a] flex items-center gap-2 flex-1 sm:flex-none focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all">
                <Search className="text-gray-400" size={16} />
                <input type="text" placeholder="Search by name, tags..." className="bg-transparent outline-none text-xs font-medium text-gray-200 w-full sm:w-48 placeholder-gray-600" />
             </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151515]/90 border-b border-[#2a2a2a] text-gray-500 font-semibold sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="px-5 py-4 whitespace-nowrap">File Identifier</th>
                <th className="px-5 py-4 whitespace-nowrap">Detected Classes (Objects)</th>
                <th className="px-5 py-4 whitespace-nowrap">Min. Confidence</th>
                <th className="px-5 py-4 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {models.map((model) => (
                <tr key={model.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-4">
                      <div className="flex items-center gap-2 mb-1">
                          <FileCheck size={14} className="text-accent" />
                          <span className="font-semibold text-white text-sm">{model.filename}</span>
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono pl-5">{model.type}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {model.classes.map(c => 
                            <span key={c} className="bg-[#151515] text-gray-300 border border-[#2a2a2a] px-2 py-0.5 rounded text-[10px] font-medium tracking-wide">
                                {c}
                            </span>
                        )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                          <div className="w-16 h-1.5 bg-[#151515] rounded-full overflow-hidden border border-[#2a2a2a]">
                              <div className="h-full bg-accent" style={{ width: `${model.confidence * 100}%` }}></div>
                          </div>
                          <span className="text-gray-300 font-mono text-[11px]">{Math.round(model.confidence * 100)}%</span>
                      </div>
                  </td>
                  <td className="px-5 py-4 flex gap-2 justify-end">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-gray-400 hover:text-white transition-colors bg-[#151515] border border-[#2a2a2a] rounded-lg text-[10px] font-bold">
                      <Database size={12} /> Assign to Edge
                    </button>
                    <button className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors bg-[#151515] border border-[#2a2a2a] rounded-lg">
                      <Trash2 size={14} />
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
