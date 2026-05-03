import React, { useState } from 'react';
import { Search, Plus, Play, ExternalLink, Activity, Server, ShieldCheck, Pause, Settings, X, Video, Cpu, Activity as ActivityIcon, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

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

  const [errors, setErrors] = useState<{appName?: string}>({});

  const validate = () => {
    let isValid = true;
    const newErrors: typeof errors = {};
    if (!appName.trim()) {
      newErrors.appName = 'Application Name is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleDeploy = () => {
    if (validate()) {
      // simulate deployment
      toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
        loading: 'Deploying application...',
        success: `${appName} deployed successfully to ${computeTarget}`,
        error: 'Deployment failed',
      });
      setIsNewAppModalOpen(false);
      setAppName('');
      setAppDesc('');
      setErrors({});
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors relative custom-scrollbar">
      {/* Existing Content */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Deployed Applications</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Manage and monitor running vision pipelines.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsNewAppModalOpen(true)}
            className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-accent hover:bg-accent/90 text-black h-8 rounded-full text-xs font-bold px-5 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]"
          >
            <Plus size={14} /> New Application
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {[
          { label: 'Running Apps', value: '2', icon: <Play size={20} className="text-green-500 fill-green-500/20" /> },
          { label: 'Total Inferences/hr', value: '45.2K', icon: <Activity size={20} className="text-accent" /> },
          { label: 'System Load', value: '34%', icon: <Server size={20} className="text-secondary" /> },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-[#1e1e1e] p-4 rounded-[11px] border border-gray-200 dark:border-[#222] shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-500 font-black tracking-widest uppercase mb-1">{stat.label}</p>
              <h3 className="text-[18px] font-black text-gray-900 dark:text-white tracking-tight">{stat.value}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] flex items-center justify-center shrink-0">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {apps.map((app) => (
              <div key={app.id} className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] p-6 flex flex-col hover:border-accent/30 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                      <div>
                          <div className="flex items-center gap-2 mb-2">
                              <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold border", app.status === 'running' ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700")}>
                                  <span className={cn("w-1.5 h-1.5 rounded-full", app.status === 'running' ? "bg-green-500 animate-pulse" : "bg-gray-500")} />
                                  {app.status}
                              </span>
                          </div>
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{app.name}</h3>
                          <p className="text-[10px] text-gray-500 font-mono mt-0.5 uppercase tracking-widest font-black">{app.id} • {app.type}</p>
                      </div>
                      <button className="text-gray-500 hover:text-white transition-colors bg-gray-100 dark:bg-[#151515] p-2 rounded-lg border border-gray-200 dark:border-[#222]"><Settings size={14}/></button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 mt-2">
                      <div className="bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl p-3">
                          <div className="text-[10px] text-gray-500 font-black mb-1 uppercase tracking-widest">Nodes Count</div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{app.nodes} active blocks</div>
                      </div>
                      <div className="bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl p-3">
                          <div className="text-[10px] text-gray-500 font-black mb-1 uppercase tracking-widest">Uptime</div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white font-mono">{app.uptime}</div>
                      </div>
                  </div>

                  <div className="bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl p-3 flex justify-between items-center mb-4">
                      <div className="text-xs font-mono text-gray-600 dark:text-gray-400 truncate pr-4">{app.endpoint}</div>
                      <ShieldCheck size={16} className="text-gray-600 shrink-0" />
                  </div>

                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-200 dark:border-[#222]">
                      {app.status === 'running' ? (
                          <button className="flex-1 flex justify-center items-center gap-2 bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:bg-gray-100 dark:hover:bg-[#202020] text-red-400 h-[32px] rounded-lg text-xs font-bold transition-colors">
                              <Pause size={14} className="fill-red-400/20" /> Stop App
                          </button>
                      ) : (
                          <button className="flex-1 flex justify-center items-center gap-2 bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:bg-gray-100 dark:hover:bg-[#202020] text-green-400 h-[32px] rounded-lg text-xs font-bold transition-colors">
                              <Play size={14} className="fill-green-400/20" /> Start App
                          </button>
                      )}
                      <button className="flex justify-center items-center gap-2 bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:bg-gray-100 dark:hover:bg-[#202020] text-gray-900 dark:text-white h-[32px] px-4 rounded-lg text-xs font-bold transition-colors w-full sm:w-auto">
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
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
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
                  <h3 className="text-[10px] font-black text-gray-500 flex items-center gap-1.5 uppercase tracking-widest"><ActivityIcon size={12}/> Application Info</h3>
                  <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Application Name</label>
                      <input 
                          type="text" 
                          placeholder="e.g. Production Gate Tracker"
                          value={appName}
                          onChange={(e) => setAppName(e.target.value)}
                          className={cn("w-full bg-gray-100 dark:bg-[#151515] border rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all placeholder-gray-600 font-medium", errors.appName ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 dark:border-[#222]")}
                      />
                      {errors.appName && <p className="text-red-500 text-[10px] mt-1.5 font-medium">{errors.appName}</p>}
                  </div>
                  <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description (Optional)</label>
                      <textarea 
                          placeholder="Brief description of this deployment..."
                          value={appDesc}
                          onChange={(e) => setAppDesc(e.target.value)}
                          className="w-full h-20 bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all placeholder-gray-600 resize-none font-medium"
                      ></textarea>
                  </div>
              </div>

              {/* Source & Logic */}
              <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-gray-500 flex items-center gap-1.5 uppercase tracking-widest"><Video size={12}/> Source & Logic</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Input Stream</label>
                          <div className="relative">
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                  <ChevronDown size={14} />
                              </div>
                              <select 
                                  value={inputStream}
                                  onChange={(e) => setInputStream(e.target.value)}
                                  className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] text-gray-900 dark:text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all font-medium appearance-none cursor-pointer"
                              >
                                  <option>Cam-01 (Main Gate)</option>
                                  <option>Cam-02 (Lobby Entrance)</option>
                                  <option>Cam-03 (Perimeter North)</option>
                                  <option>VMS Integration (Edge)</option>
                              </select>
                          </div>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Vision Pipeline</label>
                          <div className="relative">
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                  <ChevronDown size={14} />
                              </div>
                              <select 
                                  value={visionPipeline}
                                  onChange={(e) => setVisionPipeline(e.target.value)}
                                  className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] text-gray-900 dark:text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all font-medium appearance-none cursor-pointer"
                              >
                                  <option>Main Gate Security Pipeline</option>
                                  <option>Lobby Face Auth Pipeline</option>
                                  <option>Night Intrusion Pipeline</option>
                              </select>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Hardware Selection */}
              <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-gray-500 flex items-center gap-1.5 uppercase tracking-widest"><Cpu size={12}/> Compute Target</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label 
                          onClick={() => setComputeTarget('Edge Node Alpha')}
                          className={cn("flex items-start gap-3 p-3 bg-gray-100 dark:bg-[#151515] border rounded-xl cursor-pointer group transition-colors", computeTarget === 'Edge Node Alpha' ? 'border-accent' : 'border-gray-200 dark:border-[#222] hover:border-accent/50')}
                      >
                          <input type="radio" name="compute" checked={computeTarget === 'Edge Node Alpha'} readOnly className="mt-0.5 accent-accent" />
                          <div>
                              <div className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors">Edge Node Alpha</div>
                              <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-black">2x RTX 4090 • 32% Load</div>
                          </div>
                      </label>
                      <label 
                          onClick={() => setComputeTarget('Cloud Cluster')}
                          className={cn("flex items-start gap-3 p-3 bg-gray-100 dark:bg-[#151515] border rounded-xl cursor-pointer group transition-colors", computeTarget === 'Cloud Cluster' ? 'border-accent' : 'border-gray-200 dark:border-[#222] hover:border-accent/50')}
                      >
                          <input type="radio" name="compute" checked={computeTarget === 'Cloud Cluster'} readOnly className="mt-0.5 accent-accent" />
                          <div>
                              <div className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors">Cloud Cluster</div>
                              <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-black">Auto-scaling GPU instances</div>
                          </div>
                      </label>
                  </div>
              </div>

            </div>

            <div className="p-5 border-t border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a] flex justify-end gap-3 shrink-0">
               <button 
                  onClick={() => setIsNewAppModalOpen(false)}
                  className="px-5 py-2 rounded-full border border-gray-200 dark:border-[#222] text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gray-100 dark:hover:bg-[#202020] transition-colors text-xs font-bold"
                >
                  Cancel
               </button>
               <button 
                 onClick={handleDeploy}
                 className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-black h-8 rounded-full text-xs font-bold px-6 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)]"
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
