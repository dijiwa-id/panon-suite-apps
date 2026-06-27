import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Box, Activity, Video, Map, Layers, Zap, ArrowRight, ShieldAlert, Thermometer, Cpu, Network, RadioReceiver } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export default function Home() {
  const navigate = useNavigate();

  const environments = [
    {
      id: 'office',
      name: 'Smart Office HQ',
      type: 'Corporate',
      cameras: 12,
      sensors: 45,
      compute: '8 Nodes',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'warehouse',
      name: 'Logistics Center Alpha',
      type: 'Industrial',
      cameras: 34,
      sensors: 120,
      compute: '24 Nodes',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'retail',
      name: 'Downtown Flagship Store',
      type: 'Retail',
      cameras: 8,
      sensors: 15,
      compute: '4 Nodes',
      status: 'Offline',
      image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=800&auto=format&fit=crop',
    }
  ];

  const quickStats = [
    { label: 'Spatial Environments', value: '3', icon: Layers, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Active Data Streams', value: '2.4M', icon: RadioReceiver, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Connected Devices', value: '234', icon: Network, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'AI Inference Load', value: '78%', icon: Cpu, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ];

  const recentAlerts = [
    { id: 1, env: 'Smart Office HQ', message: 'Unauthorized access detected at Server Room', time: '5m ago', severity: 'high' },
    { id: 2, env: 'Logistics Center Alpha', message: 'Temperature anomaly in Zone B', time: '12m ago', severity: 'medium' },
    { id: 3, env: 'Smart Office HQ', message: 'Crowd density exceeded threshold in Lobby', time: '1h ago', severity: 'low' },
    { id: 4, env: 'Downtown Flagship Store', message: 'Edge node connection lost', time: '2h ago', severity: 'high' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#161616]">
      <div className="max-w-[1600px] mx-auto min-h-full p-6 lg:p-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Spatial Twin Visualizer</h1>
            <p className="text-sm text-gray-400 mt-2 font-medium max-w-2xl">
              Monitor, manage, and interact with real-time digital twins of your physical spaces. 
              Integrated with AI compute nodes and IoT sensor networks for full situational awareness.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#1e1e1e] border border-[#333] h-9 text-white rounded-full text-xs font-bold tracking-wide px-5 hover:bg-[#252525] transition-colors flex items-center gap-2">
              <Activity size={14} className="text-accent" /> System Health
            </button>
            <button className="bg-white text-black border border-white h-9 rounded-full text-xs font-bold tracking-wide px-5 hover:bg-gray-200 transition-colors">
              Deploy New Twin
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {quickStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={stat.label}
              >
                <Card className="bg-[#1e1e1e] p-5 flex items-center justify-between border border-[#222] hover:border-[#333] transition-colors group">
                  <div>
                    <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-1.5">{stat.label}</p>
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                  </div>
                  <div className={cn("p-3.5 rounded-xl transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                    <Icon size={22} />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Environments List */}
          <div className="xl:col-span-2 space-y-5">
            <div className="flex items-center justify-between border-b border-[#222] pb-3">
              <h2 className="text-xs font-black tracking-widest text-white uppercase flex items-center gap-2">
                <Map size={16} className="text-accent" /> Active Environments
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {environments.map((env, i) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  key={env.id}
                >
                  <Card className="overflow-hidden bg-[#1e1e1e] border border-[#222] group cursor-pointer hover:border-[#444] transition-all" onClick={() => navigate(`/3d-visualizer/live-view?env=${env.id}`)}>
                    <div className="h-40 relative overflow-hidden">
                      <img 
                        src={env.image} 
                        alt={env.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-[#1e1e1e]/40 to-transparent opacity-90" />
                      
                      <div className="absolute top-4 right-4">
                        <div className={cn(
                          "flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-full border backdrop-blur-md",
                          env.status === 'Active' ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                        )}>
                          <div className={cn("w-1.5 h-1.5 rounded-full", env.status === 'Active' ? "bg-green-400 animate-pulse" : "bg-red-400")} />
                          {env.status}
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-5 right-5">
                        <span className="inline-block text-[10px] font-black tracking-widest text-accent uppercase mb-1">
                          {env.type}
                        </span>
                        <h3 className="text-xl font-black text-white tracking-tight leading-tight">{env.name}</h3>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-1">Cameras</p>
                          <p className="text-sm font-medium text-gray-200 flex items-center gap-1.5"><Video size={14} className="text-gray-400" /> {env.cameras}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-1">Sensors</p>
                          <p className="text-sm font-medium text-gray-200 flex items-center gap-1.5"><Thermometer size={14} className="text-gray-400" /> {env.sensors}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-1">Compute</p>
                          <p className="text-sm font-medium text-gray-200 flex items-center gap-1.5"><Cpu size={14} className="text-gray-400" /> {env.compute}</p>
                        </div>
                      </div>
                      
                      <button className="w-full bg-[#252525] group-hover:bg-accent group-hover:text-black text-gray-300 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-2">
                        Enter Spatial View <ArrowRight size={14} />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Activity / Alerts Panel */}
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-[#222] pb-3">
              <h2 className="text-xs font-black tracking-widest text-white uppercase flex items-center gap-2">
                <ShieldAlert size={16} className="text-red-400" /> Recent Spatial Alerts
              </h2>
            </div>
            
            <Card className="bg-[#1e1e1e] border border-[#222] overflow-hidden">
              <div className="divide-y divide-[#252525]">
                {recentAlerts.map((alert, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.4 }}
                    key={alert.id} 
                    className="p-4 hover:bg-[#252525]/50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={cn(
                        "mt-0.5 p-2 rounded-lg flex-shrink-0 border",
                        alert.severity === 'high' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                        alert.severity === 'medium' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                        "bg-blue-500/10 text-blue-500 border-blue-500/20"
                      )}>
                        <Activity size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase truncate">{alert.env}</p>
                          <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2">{alert.time}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-200 leading-snug group-hover:text-accent transition-colors">{alert.message}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-3 bg-[#1a1a1a] border-t border-[#252525]">
                <button className="w-full text-xs font-bold text-gray-400 hover:text-white transition-colors">
                  View Alert Center
                </button>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-accent/10 via-[#1e1e1e] to-[#1e1e1e] border border-accent/20 p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
              <div className="flex flex-col h-full relative z-10">
                <div className="p-3 bg-accent/20 text-accent rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                  <Layers size={24} />
                </div>
                <h3 className="text-base font-black text-white tracking-tight mb-2">Spatial Editor Studio</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-5 flex-1">
                  Design digital twins, map camera POVs, plot sensor coordinates, and define virtual zones for AI detection algorithms.
                </p>
                <button className="text-xs font-bold text-accent flex items-center gap-1.5 hover:gap-2 transition-all">
                  Launch Studio <ArrowRight size={14} />
                </button>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
