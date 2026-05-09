import React, { useState } from 'react';
import { Search, Plus, Check, X, Server, Network, Shield, Cpu, Activity, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';

const workstations = [
  { id: 'WS-001 / Analytic Edge', status: 'Running', credential: '************', description: 'Primary edge analytics for main gate', ip: '192.168.1.10', spec: 'Core Ultra 5 125U', gpu: true, npu: false, load: '45%' },
  { id: 'WS-002 / FR Node', status: 'Stopped', credential: '************', description: 'Dedicated facial recognition processing', ip: '192.168.1.11', spec: 'Core Ultra 5 125U', gpu: false, npu: false, load: '0%' },
  { id: 'WS-003 / Heavy Vision', status: 'Running', credential: '************', description: 'High-density traffic analysis', ip: '192.168.1.12', spec: 'Core Ultra 5 125U', gpu: true, npu: true, load: '82%' },
  { id: 'WS-004 / ALPR Node', status: 'Running', credential: '************', description: 'License plate recognition node', ip: '192.168.1.13', spec: 'Core Ultra 5 125U', gpu: false, npu: true, load: '30%' },
];

const AddWorkstationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
            <div>
                <h2 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                    <Server className="text-accent" size={16} />
                    Register Workstation Node
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-[10px] font-bold mt-1">Add a new edge processing node to the cluster.</p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors">
                <X size={18} />
            </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[70vh] bg-white dark:bg-[#1e1e1e]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest">Node ID / Identifier</label>
                        <input type="text" placeholder="e.g., WS-005 / ALPR Node" className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-700" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><Network size={12}/> IP Address</label>
                        <input type="text" placeholder="192.168.1.x" className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-mono placeholder:text-gray-700" />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><Info size={12}/> Description / Purpose</label>
                        <input type="text" placeholder="Enter node purpose..." className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-700" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-500 mb-2 flex items-center gap-2 uppercase tracking-widest"><Shield size={12}/> Access Credential (Token/Key)</label>
                        <input type="password" placeholder="••••••••••••" className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-mono placeholder:text-gray-700" />
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 dark:bg-[#151515] p-6 rounded-xl border border-gray-200 dark:border-[#222]">
                <h3 className="text-[10px] font-black text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                    <Cpu size={14} className="text-gray-500" /> Auto-Discovered Hardware
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     <div className="bg-gray-50/50 dark:bg-[#1a1a1a] p-3 rounded-lg border border-gray-200 dark:border-[#222]">
                         <div className="text-[9px] text-gray-500 font-black mb-1.5">Architecture</div>
                         <div className="text-[11px] font-bold text-gray-700 dark:text-gray-300">x86_64</div>
                     </div>
                     <div className="bg-gray-50/50 dark:bg-[#1a1a1a] p-3 rounded-lg border border-gray-200 dark:border-[#222]">
                         <div className="text-[9px] text-gray-500 font-black mb-1.5">Processor</div>
                         <div className="text-[11px] font-bold text-gray-700 dark:text-gray-300">Pending Scan</div>
                     </div>
                     <div className="bg-gray-50/50 dark:bg-[#1a1a1a] p-3 rounded-lg border border-gray-200 dark:border-[#222]">
                         <div className="text-[9px] text-gray-500 font-black mb-1.5">GPU Compute</div>
                         <div className="text-[11px] font-bold text-gray-700 dark:text-gray-300">Pending Scan</div>
                     </div>
                     <div className="bg-gray-50/50 dark:bg-[#1a1a1a] p-3 rounded-lg border border-gray-200 dark:border-[#222]">
                         <div className="text-[9px] text-gray-500 font-black mb-1.5">NPU Engine</div>
                         <div className="text-[11px] font-bold text-gray-700 dark:text-gray-300">Pending Scan</div>
                     </div>
                </div>
            </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a] flex justify-between items-center">
          <button onClick={onClose} className="text-gray-500 hover:text-white font-black text-[10px] transition-colors uppercase tracking-widest">
            Cancel
          </button>
          <Button variant="primary" onClick={onClose} >
            Provision Node
          </Button>
        </div>
      </div>
    </div>
  );
};

export const WorkstationManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Workstation Management</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Manage and monitor processing edge nodes.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none px-5"
          >
            <Plus size={14} /> New Workstation
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 dark:border-[#222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Server size={16} className="text-gray-500" /> Cluster Nodes
          </h2>
          <div className="flex gap-3 w-full sm:w-auto">
             <div className="bg-gray-100 dark:bg-[#151515] px-4 py-2 rounded-xl border border-gray-200 dark:border-[#222] flex items-center gap-2 flex-1 sm:flex-none focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all">
                <Search className="text-gray-600 dark:text-gray-400" size={16} />
                <input type="text" placeholder="Search by ID, IP..." className="bg-transparent outline-none text-xs font-medium text-gray-800 dark:text-gray-200 w-full sm:w-64 placeholder-gray-600" />
             </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
                <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-transparent">
                <th className="px-5 py-4 whitespace-nowrap">Status</th>
                <th className="px-5 py-4 whitespace-nowrap">Node Identity</th>
                <th className="px-5 py-4 whitespace-nowrap">Hardware Spec</th>
                <th className="px-5 py-4 whitespace-nowrap">Compute Features</th>
                <th className="px-5 py-4 whitespace-nowrap text-right">Sys Load</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
              {workstations.map((ws) => (
                <tr key={ws.id} className="hover:bg-white/5 hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-bold", ws.status === 'Running' ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400")}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", ws.status === 'Running' ? "bg-green-500" : "bg-red-500")} />
                        {ws.status}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-gray-900 dark:text-white text-xs mb-0.5">{ws.id.split(' / ')[1]}</div>
                    <div className="text-[11px] text-gray-500 font-mono mb-1">{ws.id.split(' / ')[0]} • {ws.ip}</div>
                    <div className="text-[10px] text-gray-600 dark:text-gray-400">{ws.description}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-gray-700 dark:text-gray-300 font-medium">{ws.spec}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                        {ws.gpu && <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide">GPU</span>}
                        {ws.npu && <span className="bg-accent/10 text-accent border border-accent/20 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide">NPU</span>}
                        {!ws.gpu && !ws.npu && <span className="text-gray-600 text-[10px] font-medium tracking-wide">CPU Only</span>}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="font-mono text-xs text-gray-700 dark:text-gray-300">{ws.load}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddWorkstationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};
