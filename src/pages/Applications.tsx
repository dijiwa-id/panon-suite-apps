import React, { useState } from 'react';
import { Search, Plus, Play, ExternalLink, Activity, Server, ShieldCheck, Pause, Settings, X, Video, Cpu, Activity as ActivityIcon } from 'lucide-react';
import { cn } from '../lib/utils';

const apps = [
  { id: 'APP-01', name: 'Main Gate Security Tracker', status: 'running', type: 'Intrusion Detection', nodes: 3, uptime: '14d 2h', endpoint: '/api/v1/gate-alerts' },
  { id: 'APP-02', name: 'Lobby Face Authentication', status: 'running', type: 'Face Recognition', nodes: 4, uptime: '32d 5h', endpoint: '/api/v1/faces' },
  { id: 'APP-03', name: 'Parking Lot Monitor', status: 'stopped', type: 'ALPR & Counting', nodes: 5, uptime: '-', endpoint: '-' },
];

export const Applications = () => {
  const [isNewAppModalOpen, setIsNewAppModalOpen] = useState(false);
  
  const [appName, setAppName] = useState('');
  const [appDesc, setAppDesc] = useState('');
  const [inputStream, setInputStream] = useState('Cam-01 (Main Gate)');
  const [visionPipeline, setVisionPipeline] = useState('Main Gate Security Pipeline');
  const [computeTarget, setComputeTarget] = useState('Edge Node Alpha');

  const handleDeploy = () => {
    console.log('Deploying App:', { appName, appDesc, inputStream, visionPipeline, computeTarget });
    // Proceed with deployment logic
    setIsNewAppModalOpen(false);
    setAppName('');
    setAppDesc('');
  };

  return (
    <main className="flex-1 overflow-y-auto bg-[#161616] p-6 lg:p-8 text-gray-200 transition-colors relative">
      {/* Existing Content */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white mb-1">Deployed Applications</h1>
          <p className="text-gray-400 text-xs font-medium">Manage and monitor running vision pipelines.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsNewAppModalOpen(true)}
            className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-accent hover:bg-accent/90 text-black h-[36px] rounded-full text-xs font-bold px-6 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]"
          >
            <Plus size={14} /> New Application
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Running Apps', value: '2', icon: <Play size={20} className="text-green-500 fill-green-500/20" /> },
          { label: 'Total Inferences/hr', value: '45.2K', icon: <Activity size={20} className="text-accent" /> },
          { label: 'System Load', value: '34%', icon: <Server size={20} className="text-secondary" /> },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-white tracking-tight">{stat.value}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#151515] border border-[#2a2a2a] flex items-center justify-center shrink-0">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {apps.map((app) => (
              <div key={app.id} className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col hover:border-accent/30 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                      <div>
                          <div className="flex items-center gap-2 mb-2">
                              <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border", app.status === 'running' ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-gray-800 text-gray-400 border-gray-700")}>
                                  <span className={cn("w-1.5 h-1.5 rounded-full", app.status === 'running' ? "bg-green-500 animate-pulse" : "bg-gray-500")} />
                                  {app.status}
                              </span>
                          </div>
                          <h3 className="text-lg font-bold text-white tracking-tight">{app.name}</h3>
                          <p className="text-xs text-gray-500 font-mono mt-0.5">{app.id} • {app.type}</p>
                      </div>
                      <button className="text-gray-500 hover:text-white transition-colors bg-[#151515] p-2 rounded-lg border border-[#2a2a2a]"><Settings size={14}/></button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 mt-2">
                      <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-3">
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Nodes Count</div>
                          <div className="text-sm font-semibold text-white">{app.nodes} active blocks</div>
                      </div>
                      <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-3">
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Uptime</div>
                          <div className="text-sm font-semibold text-white font-mono">{app.uptime}</div>
                      </div>
                  </div>

                  <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-3 flex justify-between items-center mb-6">
                      <div className="text-xs font-mono text-gray-400 truncate pr-4">{app.endpoint}</div>
                      <ShieldCheck size={16} className="text-gray-600 shrink-0" />
                  </div>

                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#2a2a2a]">
                      {app.status === 'running' ? (
                          <button className="flex-1 flex justify-center items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#202020] text-red-400 h-[32px] rounded-lg text-xs font-bold transition-colors">
                              <Pause size={14} className="fill-red-400/20" /> Stop App
                          </button>
                      ) : (
                          <button className="flex-1 flex justify-center items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#202020] text-green-400 h-[32px] rounded-lg text-xs font-bold transition-colors">
                              <Play size={14} className="fill-green-400/20" /> Start App
                          </button>
                      )}
                      <button className="flex justify-center items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#202020] text-white h-[32px] px-4 rounded-lg text-xs font-bold transition-colors w-full sm:w-auto">
                          <ExternalLink size={14} /> View Dashboard
                      </button>
                  </div>
              </div>
          ))}
      </div>

      {/* New Application Modal */}
      {isNewAppModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsNewAppModalOpen(false)}
          ></div>
          <div className="relative w-full max-w-2xl bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-[#2a2a2a] bg-[#1a1a1a]">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(82,197,243,0.8)]"></div>
                Deploy New Application
              </h2>
              <button 
                onClick={() => setIsNewAppModalOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5"><ActivityIcon size={12}/> Application Info</h3>
                  <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Application Name</label>
                      <input 
                          type="text" 
                          placeholder="e.g. Production Gate Tracker"
                          value={appName}
                          onChange={(e) => setAppName(e.target.value)}
                          className="w-full bg-[#151515] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-xs text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all placeholder-gray-600 font-medium"
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Description (Optional)</label>
                      <textarea 
                          placeholder="Brief description of this deployment..."
                          value={appDesc}
                          onChange={(e) => setAppDesc(e.target.value)}
                          className="w-full h-20 bg-[#151515] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-xs text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all placeholder-gray-600 resize-none font-medium"
                      ></textarea>
                  </div>
              </div>

              {/* Source & Logic */}
              <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5"><Video size={12}/> Source & Logic</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1.5">Input Stream</label>
                          <select 
                              value={inputStream}
                              onChange={(e) => setInputStream(e.target.value)}
                              className="w-full bg-[#151515] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-xs text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all font-medium appearance-none"
                          >
                              <option>Cam-01 (Main Gate)</option>
                              <option>Cam-02 (Lobby Entrance)</option>
                              <option>Cam-03 (Perimeter North)</option>
                              <option>VMS Integration (Edge)</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1.5">Vision Pipeline</label>
                          <select 
                              value={visionPipeline}
                              onChange={(e) => setVisionPipeline(e.target.value)}
                              className="w-full bg-[#151515] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-xs text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all font-medium appearance-none"
                          >
                              <option>Main Gate Security Pipeline</option>
                              <option>Lobby Face Auth Pipeline</option>
                              <option>Night Intrusion Pipeline</option>
                          </select>
                      </div>
                  </div>
              </div>

              {/* Hardware Selection */}
              <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5"><Cpu size={12}/> Compute Target</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label 
                          onClick={() => setComputeTarget('Edge Node Alpha')}
                          className={cn("flex items-start gap-3 p-3 bg-[#151515] border rounded-xl cursor-pointer group transition-colors", computeTarget === 'Edge Node Alpha' ? 'border-accent' : 'border-[#2a2a2a] hover:border-accent/50')}
                      >
                          <input type="radio" name="compute" checked={computeTarget === 'Edge Node Alpha'} readOnly className="mt-0.5 accent-accent" />
                          <div>
                              <div className="text-xs font-bold text-white group-hover:text-accent transition-colors">Edge Node Alpha</div>
                              <div className="text-[10px] text-gray-500 mt-1">2x RTX 4090 • 32% Load</div>
                          </div>
                      </label>
                      <label 
                          onClick={() => setComputeTarget('Cloud Cluster')}
                          className={cn("flex items-start gap-3 p-3 bg-[#151515] border rounded-xl cursor-pointer group transition-colors", computeTarget === 'Cloud Cluster' ? 'border-accent' : 'border-[#2a2a2a] hover:border-accent/50')}
                      >
                          <input type="radio" name="compute" checked={computeTarget === 'Cloud Cluster'} readOnly className="mt-0.5 accent-accent" />
                          <div>
                              <div className="text-xs font-bold text-white group-hover:text-accent transition-colors">Cloud Cluster</div>
                              <div className="text-[10px] text-gray-500 mt-1">Auto-scaling GPU instances</div>
                          </div>
                      </label>
                  </div>
              </div>

            </div>

            <div className="p-5 border-t border-[#2a2a2a] bg-[#1a1a1a] flex justify-end gap-3 shrink-0">
               <button 
                  onClick={() => setIsNewAppModalOpen(false)}
                  className="px-5 py-2 rounded-full border border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#202020] transition-colors text-xs font-bold"
                >
                  Cancel
               </button>
               <button 
                 onClick={handleDeploy}
                 className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-black h-[36px] rounded-full text-xs font-bold px-6 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)]"
               >
                 <Play size={14} className="fill-black" /> Deploy Application
               </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
