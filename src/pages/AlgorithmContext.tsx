import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';

const algorithmContexts = [
  { id: 'PARKIR_LIAR', name: 'Parkir Liar', algorithm: 'Lingering', model: 'Model-2026-Security-80-001', class: 'Vehicle' },
  { id: 'PEOPLE_COUNT', name: 'People Count', algorithm: 'Enter-Count', model: 'Model-2026-Security-80-001', class: 'Person' },
  { id: 'WATER_LEVEL', name: 'Water Level', algorithm: 'Color Detection', model: 'Model-2026-PailScale-90-001', class: 'Pail Scale' },
  { id: 'AREA_VIOLATION', name: 'Area Violation', algorithm: 'Move-In', model: 'Model-2026-Security-80-001', class: 'Person' },
];

const AddContextModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <h2 className="text-xl font-black text-white mb-8 tracking-tight">Add Context</h2>
        <div className="space-y-6">
          {[
            { label: 'Context ID' },
            { label: 'Context Name' },
            { label: 'Algorithm', type: 'select', options: ['Lingering', 'Enter-Count', 'Color Detection', 'Move-In'] },
            { label: 'Model', type: 'select', options: ['Model-2026-Security-80-001', 'Model-2026-PailScale-90-001'] },
            { label: 'Class', type: 'select', options: ['Vehicle', 'Person', 'Pail Scale'] },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{field.label}</label>
              {field.type === 'select' ? (
                <select className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all">
                  <option value="">Pilih {field.label}</option>
                  {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder={field.label}
                  className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                />
              )}
            </div>
          ))}
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

export const AlgorithmContext = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto bg-[#161616] p-6 md:p-8 text-gray-200 transition-colors">
      <h1 className="text-xl font-black tracking-tight text-white mb-8">Algorithm Package &gt; Algorithm Context</h1>
      
      <div className="flex justify-between items-center mb-8">
        <div className="bg-[#1e1e1e] p-4 rounded-xl border border-[#2a2a2a] shadow-sm flex items-center gap-2 w-full max-w-sm">
          <Search className="text-gray-400" size={20} />
          <input type="text" placeholder="Search by Name..." className="bg-transparent flex-1 outline-none text-sm text-gray-200" />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#1c1c1c] border border-gray-700 h-[29px] text-white rounded-full text-xs font-bold uppercase tracking-wide px-6 hover:bg-[#2a2a2a] transition-colors leading-[12px]">
          <Plus size={16} /> New
        </button>
      </div>

      <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#151515] border-b border-[#2a2a2a] text-gray-500 uppercase tracking-widest font-black">
            <tr>
              {['ID', 'Name', 'Algorithm', 'Model', 'Class'].map(header => (
                <th key={header} className="px-6 py-4">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2a2a]">
            {algorithmContexts.map((ctx) => (
              <tr key={ctx.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-bold text-white">{ctx.id}</td>
                <td className="px-6 py-4 text-gray-300">{ctx.name}</td>
                <td className="px-6 py-4 text-gray-400">{ctx.algorithm}</td>
                <td className="px-6 py-4 font-mono text-gray-400">{ctx.model}</td>
                <td className="px-6 py-4 text-gray-300">{ctx.class}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddContextModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};
