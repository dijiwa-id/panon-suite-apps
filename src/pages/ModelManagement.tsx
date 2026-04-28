import React, { useState } from 'react';
import { Search, Upload, Database, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const models = [
  { id: '1', filename: 'Model-2026-Security-80-001', class: 'Vehicle, Person, Weapon, Crowd', confidence: 0.8 },
  { id: '2', filename: 'Model-2026-ALPR-60-001', class: 'License Plate', confidence: 0.6 },
  { id: '3', filename: 'Model-2026-Sanitation-90-001', class: 'Person, Water, Vehicle', confidence: 0.9 },
  { id: '4', filename: 'Model-2026-Landscape-75-001', class: 'Tree, Person, Vehicle', confidence: 0.75 },
];

export const ModelManagement = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-[#161616] p-6 md:p-8 text-gray-200 transition-colors">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black tracking-tight text-white">Model Management</h1>
        <button className="flex items-center gap-2 bg-[#1c1c1c] border border-gray-700 h-[29px] text-white rounded-full text-xs font-bold uppercase tracking-wide px-6 hover:bg-[#2a2a2a] transition-colors leading-[12px]">
          <Upload size={16} /> Upload
        </button>
      </div>

      <div className="bg-[#1e1e1e] p-4 rounded-xl border border-[#2a2a2a] mb-6 shadow-sm flex items-center gap-2">
        <Search className="text-gray-400" size={20} />
        <input type="text" placeholder="Search by Name..." className="bg-transparent flex-1 outline-none text-sm text-gray-200" />
      </div>

      <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#151515] border-b border-[#2a2a2a] text-gray-500 uppercase tracking-widest font-black">
            <tr>
              {['Filename', 'Model Class', 'Confidence', 'Actions'].map(header => (
                <th key={header} className="px-6 py-4">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2a2a]">
            {models.map((model) => (
              <tr key={model.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-bold text-white">{model.filename}</td>
                <td className="px-6 py-4 text-gray-400">{model.class}</td>
                <td className="px-6 py-4 text-gray-300 font-mono">{model.confidence.toFixed(2)}</td>
                <td className="px-6 py-4 flex gap-3">
                  <Database className="text-accent cursor-pointer hover:opacity-80" size={16} />
                  <XCircle className="text-red-500 cursor-pointer hover:opacity-80" size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
