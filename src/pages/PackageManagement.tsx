import React, { useState } from 'react';
import { Search, Plus, X, ChevronDown } from 'lucide-react';

const packages = [
  { id: 'SECURITY', name: 'Security', context: 'Parkir Liar' },
  { id: 'WORK_SAFETY', name: 'Work Safety', context: 'People Count' },
  { id: 'TRAFFIC_MANAGEMENT', name: 'Traffic Management', context: 'Kemacetan' },
  { id: 'WATER_MANAGEMENT', name: 'Water Management', context: 'Water Level' },
];

const AddPackageModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    context: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting package...', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-[#222] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-black text-gray-900 dark:text-white">New Algorithm Package</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Package ID</label>
            <input
              type="text"
              required
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              placeholder="e.g. TRAFFIC_DETECTION"
              className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-700"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Package Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Traffic Detection System"
              className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-700"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Context</label>
            <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
                <select 
                  required
                  value={formData.context}
                  onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-white dark:bg-[#1e1e1e]">Select Context</option>
                  {['Parkir Liar', 'People Count', 'Kemacetan', 'Water Level'].map(opt => (
                    <option key={opt} value={opt} className="bg-white dark:bg-[#1e1e1e]">{opt}</option>
                  ))}
                </select>
            </div>
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
              className="bg-accent hover:bg-accent/90 text-black h-[32px] rounded-full text-xs font-bold px-6 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]"
            >
              Create Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const PackageManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 md:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Algorithm Package &gt; Package Management</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Manage algorithm packages and configurations.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-black h-8 rounded-full text-xs font-bold px-5 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]">
            <Plus size={14} /> New Package
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 dark:border-[#222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Algorithm Packages</h2>
          <div className="flex gap-3 w-full sm:w-auto">
             <div className="bg-gray-100 dark:bg-[#151515] px-4 py-2 rounded-xl border border-gray-200 dark:border-[#222] flex items-center gap-2 flex-1 sm:flex-none focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all">
                <Search className="text-gray-600 dark:text-gray-400" size={16} />
                <input type="text" placeholder="Search by Name..." className="bg-transparent outline-none text-xs font-medium text-gray-800 dark:text-gray-200 w-full sm:w-64 placeholder-gray-600" />
             </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
                <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-transparent">
                {['ID', 'Name', 'Context'].map(header => (
                  <th key={header} className="px-5 py-4 whitespace-nowrap">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-white/5 hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-4 font-semibold text-gray-900 dark:text-white">{pkg.id}</td>
                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">{pkg.name}</td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{pkg.context}</td>
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
