import React, { useState } from 'react';
import { Play, Square, Activity, Database, Cpu, Clock, History, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { PerformanceLineChart } from '../components/ChartCards';
import { useTrain } from '../context/TrainContext';
import { Select, Input, Button } from '../components/ui';

const mockLoss = Array.from({ length: 40 }).map((_, i) => ({ val: Math.max(0.2, 2.5 * Math.exp(-i / 8) + (Math.random() * 0.2)) }));

const NewTrainingModal = ({ isOpen, onClose, datasets, onCreate }: any) => {
  const [name, setName] = useState('');
  const [dataset, setDataset] = useState(datasets[0]?.name || '');

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-[#222] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-black text-gray-900 dark:text-white">Start New Training</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        
        <form onSubmit={(e) => { 
          e.preventDefault(); 
          onCreate({ name, dataset });
          onClose(); 
        }} className="p-6 space-y-5">
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Model Name</label>
            <Input 
              type="text" 
              required
              placeholder="e.g. YOLOv8 Detection"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Select Dataset ({datasets.filter((d: any) => d.status === 'ready').length} Ready)</label>
            <Select 
               className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg pl-4 pr-9 h-[37px] text-[12px] font-bold text-gray-700 dark:text-gray-300 outline-none focus-visible:ring-1 focus-visible:ring-accent/50 transition-all cursor-pointer"
               value={dataset}
               onChange={(e) => setDataset(e.target.value)}
               required
            >
              {datasets.filter((d: any)=>d.status === 'ready').map((d: any) => (
                  <option key={d.id} value={d.name}>{d.name} ({d.annotations} annotations)</option>
              ))}
            </Select>
          </div>

          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-[#222] items-center">
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="h-8">
              Start Training
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ModelTraining = () => {
  const { theme } = useTheme();
  const { trainingJobs = [], datasets = [], addTrainingJob } = useTrain();
  const isDark = theme === 'dark';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeJob = (trainingJobs || []).find(job => job.status === 'training') || (trainingJobs || [])[0] || { id: 'empty', name: 'None', dataset: '', epoch: '0/100', map: 0, status: 'completed', timeRemaining: '-' };

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1e1e] border border-[#222] text-white text-[10px] px-2.5 py-1.5 rounded shadow-md font-bold">
          <div style={{ color: payload[0].color || '#EC3292' }}>
            Loss: {payload[0].value.toFixed(4)}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-[1600px] mx-auto min-h-full flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Model Training</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Configure hyper-parameters and orchestrate training jobs.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="primary" onClick={() => setIsModalOpen(true)} className="flex-1 md:flex-none px-5">
            <Play size={14} className="fill-black" /> Start New Training
          </Button>
        </div>
      </div>

      {/* Active Training Dashboard */}
      {activeJob && (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="card-glass col-span-1 lg:col-span-2 bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-100 dark:border-[#222] p-6 shadow-sm overflow-hidden flex flex-col">
          <div className="flex justify-between items-start mb-4 shrink-0">
                 <div>
                     <div className="flex items-center gap-2 mb-1">
                         <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(82,197,243,0.8)]"></div>
                         <span className="text-xs font-bold text-accent">Training Active</span>
                     </div>
                     <h2 className="text-sm font-bold text-gray-900 dark:text-white">{activeJob.name}</h2>
                     <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-mono">{activeJob.id} • Started recently</p>
                 </div>
                 <Button variant="danger" className="h-8">
                     <Square size={12} className="fill-red-500" /> Stop Job
                 </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-100 dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#222] p-4 text-center">
                    <span className="block text-[10px] text-gray-500 font-black mb-1 uppercase tracking-widest">Epoch</span>
                    <span className="text-xl font-mono text-gray-900 dark:text-white">{activeJob.epoch}</span>
                </div>
                <div className="bg-gray-100 dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#222] p-4 text-center">
                    <span className="block text-[10px] text-gray-500 font-black mb-1 uppercase tracking-widest">mAP@0.5</span>
                    <span className="text-xl font-mono text-accent">{activeJob.map.toFixed(3)}</span>
                </div>
                <div className="bg-gray-100 dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#222] p-4 text-center">
                    <span className="block text-[10px] text-gray-500 font-black mb-1 uppercase tracking-widest">Loss</span>
                    <span className="text-xl font-mono text-secondary">{(1.2 - (activeJob.map || 0.5) * 0.95).toFixed(3)}</span>
                </div>
            </div>

            <div className="min-h-0 min-w-0 flex-1 min-h-[160px] relative mt-auto pb-2">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <AreaChart data={mockLoss} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EC3292" stopOpacity={0.15}/>
                                <stop offset="95%" stopColor="#EC3292" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2a2a' : '#e5e7eb'} vertical={false} />
                        <Tooltip 
                           cursor={{ stroke: isDark ? '#333' : '#e5e7eb', strokeWidth: 1, strokeDasharray: '3 3' }}
                           content={<CustomTooltip />}
                        />
                        <Area type="monotone" dataKey="val" stroke="#EC3292" strokeWidth={2} fill="url(#lossGradient)" animationDuration={1000} />
                    </AreaChart>
                </ResponsiveContainer>
                <div className="absolute top-2 right-2 text-[10px] text-gray-500 font-black uppercase tracking-widest bg-white/50 dark:bg-[#1e1e1e]/50 backdrop-blur-sm px-2 py-0.5 rounded">Loss Curve</div>
            </div>
        </div>

        <div className="card-glass col-span-1 bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-100 dark:border-[#222] p-6 shadow-sm flex flex-col">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 shrink-0">
                <Cpu size={16} className="text-gray-500" /> Hardware Allocation
            </h3>
            
            <div className="space-y-6">
                <div>
                     <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        <span>GPU 0 (RTX 4090)</span>
                        <span className="text-secondary font-mono">98%</span>
                     </div>
                     <div className="h-2 w-full bg-gray-100 dark:bg-[#151515] rounded-full overflow-hidden border border-gray-200 dark:border-[#222]">
                         <div className="h-full bg-secondary" style={{ width: '98%' }}></div>
                     </div>
                </div>
                <div>
                     <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        <span>GPU 1 (RTX 4090)</span>
                        <span className="text-secondary font-mono">95%</span>
                     </div>
                     <div className="h-2 w-full bg-gray-100 dark:bg-[#151515] rounded-full overflow-hidden border border-gray-200 dark:border-[#222]">
                         <div className="h-full bg-secondary" style={{ width: '95%' }}></div>
                     </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200 dark:border-[#222]">
                     <div className="flex items-center justify-between text-xs mb-3">
                         <span className="text-gray-500 font-medium">VRAM Usage</span>
                         <span className="text-gray-900 dark:text-white font-mono font-bold">42.5 / 48 GB</span>
                     </div>
                     <div className="flex items-center justify-between text-xs mb-3">
                         <span className="text-gray-500 font-medium">System RAM</span>
                         <span className="text-gray-900 dark:text-white font-mono font-bold">64 / 128 GB</span>
                     </div>
                     <div className="flex items-center justify-between text-xs">
                         <span className="text-gray-500 font-medium">Est. Remaining</span>
                         <span className="text-gray-900 dark:text-white font-mono font-bold">~2h 15m</span>
                     </div>
                </div>
            </div>
        </div>
      </div>
      )}

      <div className="mb-4">
        <PerformanceLineChart />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 dark:border-[#222] flex items-center gap-2 bg-gray-50/50 dark:bg-[#1a1a1a]">
          <History size={16} className="text-gray-500" />
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Recent Training Jobs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
                <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-transparent">
                <th className="px-5 py-4 whitespace-nowrap">Job Task</th>
                <th className="px-5 py-4 whitespace-nowrap">Dataset Used</th>
                <th className="px-5 py-4 whitespace-nowrap">Progress (Epoch)</th>
                <th className="px-5 py-4 whitespace-nowrap">Best mAP</th>
                <th className="px-5 py-4 whitespace-nowrap text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
              {trainingJobs.map((job) => (
                <tr key={job.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4">
                      <div className="font-semibold text-gray-900 dark:text-white text-xs mb-0.5">{job.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest font-black">{job.id}</div>
                  </td>
                  <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                          <Database size={12} className="text-gray-500" /> {job.dataset}
                      </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-gray-700 dark:text-gray-300">{job.epoch}</td>
                  <td className="px-5 py-4 font-mono text-gray-700 dark:text-gray-300">{job.map}</td>
                  <td className="px-5 py-4 text-right">
                    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold", 
                        job.status === 'completed' ? "bg-green-500/10 border-green-500/20 text-green-400" : 
                        job.status === 'training' ? "bg-accent/10 border-accent/20 text-accent" :
                        "bg-red-500/10 border-red-500/20 text-red-400"
                    )}>
                        {job.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <NewTrainingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} datasets={datasets} onCreate={addTrainingJob} />
      </div>
    </main>
  );
};
