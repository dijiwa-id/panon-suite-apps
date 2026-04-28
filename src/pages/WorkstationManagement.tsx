import React, { useState } from 'react';
import { Search, Plus, Check, X } from 'lucide-react';
import { cn } from '../lib/utils';

const workstations = [
  { id: 'Analytic WS 01', status: 'Running', credential: '************', description: 'Lorem ipsum dolor sit amet', ip: '192.168.1.10', spec: 'Core Ultra 5 125U', gpu: true, npu: false },
  { id: 'FR WS 01', status: 'Stopped', credential: '************', description: 'Lorem ipsum dolor sit amet', ip: '192.168.1.11', spec: 'Core Ultra 5 125U', gpu: false, npu: false },
  { id: 'Analytic WS 02', status: 'Running', credential: '************', description: 'Lorem ipsum dolor sit amet', ip: '192.168.1.12', spec: 'Core Ultra 5 125U', gpu: true, npu: true },
  { id: 'ALPR WS 01', status: 'Running', credential: '************', description: 'Lorem ipsum dolor sit amet', ip: '192.168.1.13', spec: 'Core Ultra 5 125U', gpu: false, npu: true },
];

const AddWorkstationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <h2 className="text-xl font-black text-white mb-8 tracking-tight">Add Workstation</h2>
        <div className="space-y-6">
          {[
            { label: 'Workstation ID' },
            { label: 'Credential' },
            { label: 'Description' },
            { label: 'IP Address' },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{field.label}</label>
              <input
                type="text"
                placeholder={field.label}
                className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
              />
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

export const WorkstationManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto bg-[#161616] p-6 md:p-8 text-gray-900 dark:text-gray-200 transition-colors">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black tracking-tight text-white">Workstation Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#1c1c1c] border border-gray-700 h-[29px] text-white rounded-full text-xs font-bold uppercase tracking-wide w-24 leading-[12px] pl-5 hover:bg-[#2a2a2a] transition-colors"
        >
          <Plus size={16} /> New
        </button>
      </div>

      <div className="bg-[#1e1e1e] p-4 rounded-xl border border-[#2a2a2a] mb-6 shadow-sm flex items-center gap-2">
        <Search className="text-gray-400" size={20} />
        <input type="text" placeholder="Search by ID..." className="bg-transparent flex-1 outline-none text-sm text-gray-200" />
      </div>

      <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#151515] border-b border-[#2a2a2a] text-gray-500 uppercase tracking-widest font-black">
            <tr>
              {['ID', 'Status', 'Credential', 'Description', 'IP Address', 'Specification', 'GPU', 'NPU'].map(header => (
                <th key={header} className="px-6 py-4">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2a2a]">
            {workstations.map((ws) => (
              <tr key={ws.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-bold text-white">{ws.id}</td>
                <td className="px-6 py-4">
                  <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold uppercase", ws.status === 'Running' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500")}>
                    {ws.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-gray-400">{ws.credential}</td>
                <td className="px-6 py-4 text-gray-400">{ws.description}</td>
                <td className="px-6 py-4 font-mono text-gray-300">{ws.ip}</td>
                <td className="px-6 py-4 text-gray-300">{ws.spec}</td>
                <td className="px-6 py-4">{ws.gpu ? <Check className="text-accent" size={16} /> : <X className="text-[#2a2a2a]" size={16} />}</td>
                <td className="px-6 py-4">{ws.npu ? <Check className="text-accent" size={16} /> : <X className="text-[#2a2a2a]" size={16} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddWorkstationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};
