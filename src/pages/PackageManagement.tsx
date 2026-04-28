import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';

const packages = [
  { id: 'SECURITY', name: 'Security', context: 'Parkir Liar' },
  { id: 'WORK_SAFETY', name: 'Work Safety', context: 'People Count' },
  { id: 'TRAFFIC_MANAGEMENT', name: 'Traffic Management', context: 'Kemacetan' },
  { id: 'WATER_MANAGEMENT', name: 'Water Management', context: 'Water Level' },
];

const AddPackageModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <h2 className="text-xl font-black text-white mb-8 tracking-tight">Add Package</h2>
        <div className="space-y-6">
          {[
            { label: 'Package ID' },
            { label: 'Package Name' },
            { label: 'Context', type: 'select', options: ['Parkir Liar', 'People Count', 'Kemacetan', 'Water Level'] },
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

export const PackageManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto bg-[#161616] p-6 md:p-8 text-gray-200 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white mb-1">Algorithm Package &gt; Package Management</h1>
          <p className="text-gray-400 text-xs font-medium">Manage algorithm packages and configurations.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-black h-[32px] rounded-full text-xs font-bold px-5 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]">
            <Plus size={14} /> New Package
          </button>
        </div>
      </div>

      <div className="bg-[#1e1e1e] rounded-2xl border border-[#2a2a2a] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#2a2a2a] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-white">Algorithm Packages</h2>
          <div className="flex gap-3 w-full sm:w-auto">
             <div className="bg-[#151515] px-4 py-2 rounded-xl border border-[#2a2a2a] flex items-center gap-2 flex-1 sm:flex-none">
                <Search className="text-gray-400" size={16} />
                <input type="text" placeholder="Search by Name..." className="bg-transparent outline-none text-xs font-medium text-gray-200 w-full sm:w-48" />
             </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151515]/80 border-b border-[#2a2a2a] text-gray-500 font-semibold text-xs">
              <tr>
                {['ID', 'Name', 'Context'].map(header => (
                  <th key={header} className="px-5 py-4 whitespace-nowrap">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-4 font-semibold text-white">{pkg.id}</td>
                  <td className="px-5 py-4 text-gray-300">{pkg.name}</td>
                  <td className="px-5 py-4 text-gray-400">{pkg.context}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddPackageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};
