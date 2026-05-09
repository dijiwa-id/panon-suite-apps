import React, { useState } from 'react';
import { BrainCircuit, Server, Activity, CheckCircle, Clock, X, AlertCircle, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Select } from '../components/ui';

const models = [
  { id: '1', name: 'Model-2026-Security-80-001', version: 'v1.4.2' },
  { id: '2', name: 'Model-2026-ALPR-60-001', version: 'v2.0.0' },
];

const nodes = [
  { id: 'WS-001', name: 'Edge-Gate-01', location: 'Main Gate' },
  { id: 'WS-002', name: 'Edge-Lobby-01', location: 'Lobby Entrance' },
];

export const ModelDeployment = () => {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<string>('');
  const [deployments, setDeployments] = useState([
    { id: 'DEP-001', model: 'Model-2026-Security-80-001', version: 'v1.4.2', node: 'Edge-Gate-01', status: 'deployed', lastUpdated: '10m ago' },
  ]);

  const deploy = () => {
    if (!selectedModel || !selectedNode) return;
    const newDeployment = {
      id: `DEP-${Math.floor(Math.random() * 1000)}`,
      model: models.find(m => m.id === selectedModel)?.name || 'Unknown',
      version: models.find(m => m.id === selectedModel)?.version || 'v1.0.0',
      node: nodes.find(n => n.id === selectedNode)?.name || 'Unknown',
      status: 'deploying',
      lastUpdated: 'Just now'
    };
    setDeployments([newDeployment, ...deployments]);
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="mb-8">
        <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Model Deployment</h1>
        <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Select a model and target compute node to initiate deployment.</p>
      </div>

      {/* Deployment Form */}
      <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Select Model</label>
                            <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
                <Select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] text-gray-900 dark:text-white outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all appearance-none cursor-pointer">
                  <option value="">Choose a model...</option>
                  {models.map(m => <option key={m.id} value={m.id}>{m.name} ({m.version})</option>)}
                </Select>
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Select Compute Node</label>
                            <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
                <Select value={selectedNode} onChange={(e) => setSelectedNode(e.target.value)} className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] text-gray-900 dark:text-white outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all appearance-none cursor-pointer">
                  <option value="">Choose a node...</option>
                  {nodes.map(n => <option key={n.id} value={n.id}>{n.name} ({n.location})</option>)}
                </Select>
              </div>
           </div>
        </div>
        <div className="mt-6 flex justify-end">
           <Button variant="primary" onClick={deploy} disabled={!selectedModel || !selectedNode}>Deploy Model</Button>
        </div>
      </div>

      {/* Deployment History */}
      <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 font-black">
            <Activity size={16} className="text-gray-500" /> Deployment History
          </h2>
        </div>
        <table className="w-full text-left text-xs">
           <thead>
              <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-transparent text-gray-500 dark:text-gray-400">
                  <th className="px-5 py-3 font-semibold uppercase tracking-wider">Deployment ID</th>
                  <th className="px-5 py-3 font-semibold uppercase tracking-wider">Model / Version</th>
                  <th className="px-5 py-3 font-semibold uppercase tracking-wider">Target Node</th>
                  <th className="px-5 py-3 font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 font-semibold uppercase tracking-wider">Last Updated</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
              {deployments.map(d => (
                <tr key={d.id}>
                    <td className="px-5 py-4 font-mono text-gray-600 dark:text-gray-300">{d.id}</td>
                    <td className="px-5 py-4">
                       <span className="font-semibold text-gray-900 dark:text-white">{d.model}</span>
                       <span className="ml-2 bg-gray-100 dark:bg-[#222] text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded text-[10px]">{d.version}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">{d.node}</td>
                    <td className="px-5 py-4">
                       <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", d.status === 'deployed' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400')}>
                          {d.status === 'deployed' ? <CheckCircle size={10} /> : <Clock size={10} />}
                          {d.status}
                       </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">{d.lastUpdated}</td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </main>
  );
};
