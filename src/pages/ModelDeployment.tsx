import React, { useState } from 'react';
import { BrainCircuit, Server, Activity, CheckCircle, Clock, X, AlertCircle, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Select } from '../components/ui';
import { useTrain } from '../context/TrainContext';

const nodes = [
  { id: 'WS-001', name: 'Edge-Gate-01', location: 'Main Gate' },
  { id: 'WS-002', name: 'Edge-Lobby-01', location: 'Lobby Entrance' },
];

export const ModelDeployment = () => {
  const { models = [] } = useTrain();
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<string>('');
  const [deployments, setDeployments] = useState([
    { id: 'DEP-001', model: 'Security-Cam-YoloV8', version: 'v1.4.2', node: 'Edge-Gate-01', status: 'deployed', lastUpdated: '10m ago' },
  ]);

  const deploy = () => {
    if (!selectedModel || !selectedNode) return;
    const selectedModelObj = models.find(m => m.id === selectedModel);
    const newDeployment = {
      id: `DEP-${Math.floor(Math.random() * 899 + 100)}`,
      model: selectedModelObj?.name || 'Unknown',
      version: selectedModelObj?.version || 'v1.0.0',
      node: nodes.find(n => n.id === selectedNode)?.name || 'Unknown',
      status: 'deploying',
      lastUpdated: 'Just now'
    };
    setDeployments([newDeployment, ...deployments]);
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-[1600px] mx-auto min-h-full flex flex-col gap-8">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Model Deployment</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Select a model and target compute node to initiate deployment.</p>
        </div>

        {/* Deployment Form */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Select Model</label>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    <ChevronDown size={14} />
                  </div>
                  <Select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] font-bold text-gray-900 dark:text-white outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all appearance-none cursor-pointer">
                    <option value="">Choose a model...</option>
                    {models.map(m => <option key={m.id} value={m.id}>{m.name} ({m.version})</option>)}
                  </Select>
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Select Compute Node</label>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    <ChevronDown size={14} />
                  </div>
                  <Select value={selectedNode} onChange={(e) => setSelectedNode(e.target.value)} className="w-full bg-gray-50 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] font-bold text-gray-900 dark:text-white outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all appearance-none cursor-pointer">
                    <option value="">Choose a node...</option>
                    {nodes.map(n => <option key={n.id} value={n.id}>{n.name} ({n.location})</option>)}
                  </Select>
                </div>
             </div>
          </div>
          <div className="mt-6 flex justify-end">
             <Button variant="primary" onClick={deploy} disabled={!selectedModel || !selectedNode} className="h-9 px-6 font-bold tracking-wide">
               Deploy Model
             </Button>
          </div>
        </div>

        {/* Deployment History */}
        <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] overflow-hidden shadow-sm flex-1">
          <div className="p-5 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
            <h2 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Activity size={16} className="text-gray-500" /> Deployment History
            </h2>
          </div>
          <table className="w-full text-left text-xs">
             <thead>
                <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-transparent text-gray-500 dark:text-gray-400">
                    <th className="px-5 py-3 font-black uppercase tracking-widest text-[10px]">Deployment ID</th>
                    <th className="px-5 py-3 font-black uppercase tracking-widest text-[10px]">Model / Version</th>
                    <th className="px-5 py-3 font-black uppercase tracking-widest text-[10px]">Target Node</th>
                    <th className="px-5 py-3 font-black uppercase tracking-widest text-[10px]">Status</th>
                    <th className="px-5 py-3 font-black uppercase tracking-widest text-[10px]">Last Updated</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
                {deployments.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50/50 dark:hover:bg-[#252525]/30 transition-colors">
                      <td className="px-5 py-4 font-mono font-bold text-gray-600 dark:text-gray-300">{d.id}</td>
                      <td className="px-5 py-4">
                         <span className="font-bold text-gray-900 dark:text-white">{d.model}</span>
                         <span className="ml-2 bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border border-gray-200 dark:border-[#333]">{d.version}</span>
                      </td>
                      <td className="px-5 py-4 text-gray-600 dark:text-gray-300 font-medium">{d.node}</td>
                      <td className="px-5 py-4">
                         <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1c1c1c] text-white border border-gray-700 font-bold uppercase tracking-widest text-[9px]", d.status === 'deployed' ? 'bg-[#10b981]/10 text-green-500 border-green-500/30' : 'bg-[#eab308]/10 text-yellow-500 border-yellow-500/30')}>
                            {d.status === 'deployed' ? <CheckCircle size={10} /> : <Clock size={10} />}
                            {d.status}
                         </span>
                      </td>
                      <td className="px-5 py-4 text-gray-600 dark:text-gray-300 font-medium">{d.lastUpdated}</td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
