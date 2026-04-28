import React from 'react';
import { Play, Square, Activity, Database, Cpu, Clock, History } from 'lucide-react';
import { cn } from '../lib/utils';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

const jobs = [
  { id: 'TR-092', name: 'Security-Cam-YoloV8', dataset: 'Main Gate Vehicles', epoch: '45/100', map: 0.82, status: 'training', timeRemaining: '2h 15m' },
  { id: 'TR-091', name: 'Lobby-Face-ResNet', dataset: 'Lobby Faces', epoch: '100/100', map: 0.94, status: 'completed', timeRemaining: '-' },
  { id: 'TR-090', name: 'Perimeter-Night', dataset: 'Perimeter Intrusion', epoch: '12/50', map: 0.45, status: 'failed', timeRemaining: '-' },
];

const mockLoss = Array.from({ length: 40 }).map((_, i) => ({ val: Math.max(0.2, 2.5 * Math.exp(-i / 8) + (Math.random() * 0.2)) }));

export const ModelTraining = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-[#161616] p-6 lg:p-8 text-gray-200 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white mb-1">Model Training</h1>
          <p className="text-gray-400 text-xs font-medium">Configure hyper-parameters and orchestrate training jobs.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-accent hover:bg-accent/90 text-black h-[36px] rounded-full text-xs font-bold px-6 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]">
            <Play size={14} className="fill-black" /> Start New Training
          </button>
        </div>
      </div>

      {/* Active Training Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 lg:col-span-2 bg-[#1e1e1e] rounded-2xl border border-[#2a2a2a] p-6 shadow-sm overflow-hidden flex flex-col">
            <div className="flex justify-between items-start mb-6">
                 <div>
                     <div className="flex items-center gap-2 mb-1">
                         <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(82,197,243,0.8)]"></div>
                         <span className="text-xs font-bold text-accent tracking-widest uppercase">Training Active</span>
                     </div>
                     <h2 className="text-lg font-bold text-white">Security-Cam-YoloV8</h2>
                     <p className="text-xs text-gray-400 mt-1 font-mono">TR-092 • Started 4h 12m ago</p>
                 </div>
                 <button className="px-4 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-xs font-bold transition-colors flex items-center gap-2">
                     <Square size={12} className="fill-red-500" /> Stop Job
                 </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-[#151515] rounded-xl border border-[#2a2a2a] p-4 text-center">
                    <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Epoch</span>
                    <span className="text-xl font-mono text-white">45<span className="text-gray-500 text-sm">/100</span></span>
                </div>
                <div className="bg-[#151515] rounded-xl border border-[#2a2a2a] p-4 text-center">
                    <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">mAP@0.5</span>
                    <span className="text-xl font-mono text-accent">0.824</span>
                </div>
                <div className="bg-[#151515] rounded-xl border border-[#2a2a2a] p-4 text-center">
                    <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Loss</span>
                    <span className="text-xl font-mono text-secondary">0.412</span>
                </div>
            </div>

            <div className="flex-1 min-h-[160px] relative mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockLoss}>
                        <defs>
                            <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EC3292" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#EC3292" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Tooltip 
                           contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px' }}
                           itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                           labelStyle={{ display: 'none' }}
                        />
                        <Area type="monotone" dataKey="val" stroke="#EC3292" strokeWidth={2} fill="url(#lossGradient)" />
                    </AreaChart>
                </ResponsiveContainer>
                <div className="absolute top-2 right-2 text-[10px] text-gray-500 font-bold uppercase">Loss Curve</div>
            </div>
        </div>

        <div className="col-span-1 bg-[#1e1e1e] rounded-2xl border border-[#2a2a2a] p-6 shadow-sm flex flex-col">
            <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                <Cpu size={16} className="text-gray-500" /> Hardware Allocation
            </h3>
            
            <div className="space-y-6">
                <div>
                     <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
                        <span>GPU 0 (RTX 4090)</span>
                        <span className="text-secondary font-mono">98%</span>
                     </div>
                     <div className="h-2 w-full bg-[#151515] rounded-full overflow-hidden border border-[#2a2a2a]">
                         <div className="h-full bg-secondary" style={{ width: '98%' }}></div>
                     </div>
                </div>
                <div>
                     <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
                        <span>GPU 1 (RTX 4090)</span>
                        <span className="text-secondary font-mono">95%</span>
                     </div>
                     <div className="h-2 w-full bg-[#151515] rounded-full overflow-hidden border border-[#2a2a2a]">
                         <div className="h-full bg-secondary" style={{ width: '95%' }}></div>
                     </div>
                </div>
                
                <div className="pt-6 border-t border-[#2a2a2a]">
                     <div className="flex items-center justify-between text-xs mb-3">
                         <span className="text-gray-500 font-medium">VRAM Usage</span>
                         <span className="text-white font-mono font-bold">42.5 / 48 GB</span>
                     </div>
                     <div className="flex items-center justify-between text-xs mb-3">
                         <span className="text-gray-500 font-medium">System RAM</span>
                         <span className="text-white font-mono font-bold">64 / 128 GB</span>
                     </div>
                     <div className="flex items-center justify-between text-xs">
                         <span className="text-gray-500 font-medium">Est. Remaining</span>
                         <span className="text-white font-mono font-bold">~2h 15m</span>
                     </div>
                </div>
            </div>
        </div>
      </div>

      <div className="bg-[#1e1e1e] rounded-2xl border border-[#2a2a2a] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#2a2a2a] flex items-center gap-2 bg-[#1a1a1a]">
          <History size={16} className="text-gray-500" />
          <h2 className="text-sm font-bold text-white">Recent Training Jobs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151515]/90 border-b border-[#2a2a2a] text-gray-500 font-semibold sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="px-5 py-4 whitespace-nowrap">Job Task</th>
                <th className="px-5 py-4 whitespace-nowrap">Dataset Used</th>
                <th className="px-5 py-4 whitespace-nowrap">Progress (Epoch)</th>
                <th className="px-5 py-4 whitespace-nowrap">Best mAP</th>
                <th className="px-5 py-4 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4">
                      <div className="font-semibold text-white text-sm mb-0.5">{job.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono tracking-wide">{job.id}</div>
                  </td>
                  <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-gray-300">
                          <Database size={12} className="text-gray-500" /> {job.dataset}
                      </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-gray-300">{job.epoch}</td>
                  <td className="px-5 py-4 font-mono text-gray-300">{job.map}</td>
                  <td className="px-5 py-4">
                    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider", 
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
    </main>
  );
};
