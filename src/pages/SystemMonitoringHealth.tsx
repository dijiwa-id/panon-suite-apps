import React, { useState, useEffect } from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';
import { Activity, Database, Server, Cpu, Thermometer, HardDrive, Clock, CheckCircle2, ChevronDown, Monitor, AlertTriangle, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Select } from '../components/ui/select';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui';
import { motion } from 'motion/react';
import { SystemLoadHeatmap } from '../components/SystemLoadHeatmap';
import { ThresholdConfigPanel, Thresholds } from '../components/ThresholdConfigPanel';

const generateInitialSystemData = () => {
  const now = new Date();
  return Array.from({length: 30}).map((_, i) => {
    const d = new Date(now.getTime() - (29 - i) * 2000);
    return {
      time: d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      cpuUtil: Math.floor(Math.random() * 30) + 40,
      cpuMin: Math.floor(Math.random() * 20) + 20,
      cpuMax: Math.floor(Math.random() * 20) + 70,
      memUtil: Math.floor(Math.random() * 20) + 40,
      memMin: Math.floor(Math.random() * 10) + 30,
      memMax: Math.floor(Math.random() * 10) + 60,
      tempAvg: Math.floor(Math.random() * 10) + 55,
      tempMin: Math.floor(Math.random() * 10) + 45,
      tempMax: Math.floor(Math.random() * 10) + 65,
    };
  });
};

const ChartContainer = ({ title, subtitle, children }: { title: string, subtitle?: string, children: React.ReactNode }) => (
  <div className="flex flex-col h-full bg-white/50 dark:bg-[#1a1a1a]/50 p-4 rounded-xl border border-gray-100 dark:border-[#222] shadow-sm">
    <div className="text-center mb-4 shrink-0">
      <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">{title}</div>
      {subtitle && <div className="text-[9px] text-gray-500 font-medium mt-0.5">{subtitle}</div>}
    </div>
    <div className="flex-1 w-full relative min-h-[100px]">
      {children}
    </div>
  </div>
);

const SectionHeader = ({ title, rightElement }: { title: string, rightElement?: React.ReactNode }) => (
  <div className="flex items-center justify-between bg-gray-200/50 dark:bg-[#1a1a1a] px-4 py-2 border border-gray-300/50 dark:border-[#222] text-sm font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4 rounded-lg shadow-sm">
    <span>{title}</span>
    {rightElement}
  </div>
);

const MetricItem = ({ label, value, icon: Icon, unit, delay = 0 }: { label: string, value: number, icon?: any, unit: string, delay?: number }) => {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setHighlight(true);
    const timer = setTimeout(() => setHighlight(false), 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay }}
      className="flex items-center justify-between p-3 bg-white dark:bg-[#1c1c1c] rounded-lg border border-gray-100 dark:border-[#222] shadow-sm relative overflow-hidden group"
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r from-transparent via-[#52C5F3]/5 to-transparent -translate-x-full transition-transform duration-500 ease-out",
        highlight && "translate-x-full"
      )} />
      <div className="flex items-center gap-2 relative z-10">
         {Icon && <Icon size={14} className="text-[#52C5F3]" />}
         <span className="text-gray-500 font-bold text-[11px] uppercase tracking-widest">{label}</span>
      </div>
      <div className="flex items-baseline gap-1 relative z-10">
         <span className={cn(
             "text-gray-900 dark:text-white font-mono font-bold text-sm transition-colors duration-300",
             highlight && "text-[#52C5F3] dark:text-[#52C5F3]"
         )}>
            {value.toFixed(1)}
         </span>
         <span className="text-gray-500 text-[10px] font-bold">{unit}</span>
      </div>
    </motion.div>
  );
};

const QuickViewModal = ({ isOpen, onClose, data }: any) => {
  if (!isOpen || !data) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
       <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-red-500/30">
          <div className="bg-red-500/10 border-b border-red-500/20 p-4 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <AlertTriangle size={20} className="text-red-500 animate-pulse" />
                <h3 className="text-sm font-black text-red-600 dark:text-red-400 uppercase tracking-widest">Critical Alert</h3>
             </div>
             <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
                <X size={18} />
             </button>
          </div>
          <div className="p-6">
             <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2">{data.title}</h4>
             <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{data.message}</p>
             
             <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-[#222]">
                   <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Source</span>
                   <span className="text-sm font-medium text-gray-900 dark:text-white">{data.source}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-[#222]">
                   <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Metric</span>
                   <span className="text-sm font-black text-red-500">{data.metric}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-[#222]">
                   <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Time</span>
                   <span className="text-sm font-medium text-gray-900 dark:text-white">{data.time}</span>
                </div>
             </div>
             <div className="mt-8 flex justify-end gap-3">
                <Button variant="outline" onClick={onClose} className="border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] text-xs h-9 px-4 rounded-full font-bold">Dismiss</Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white border-transparent text-xs h-9 px-4 rounded-full font-bold">Acknowledge</Button>
             </div>
          </div>
       </div>
    </div>
  );
};

export const SystemMonitoringHealth = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [data, setData] = useState<any[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState({
    cpu: 48.0,
    memory: 48.1,
    disk: 21.6,
    temp: 58.0
  });

  const [lastCheckTime, setLastCheckTime] = useState("");
  const [criticalAlert, setCriticalAlert] = useState<any>(null);

  const [thresholds, setThresholds] = useState<Thresholds>({
    "W95MDOVI": { cpu: 90, ram: 85, network: 80 },
    "APLLBZzz": { cpu: 90, ram: 85, network: 80 },
    "IQHWCEHS": { cpu: 90, ram: 85, network: 80 },
  });

  const [wsMetrics, setWsMetrics] = useState({
    "W95MDOVI": { cpu: 45, ram: 50, network: 30 },
    "APLLBZzz": { cpu: 65, ram: 70, network: 40 },
    "IQHWCEHS": { cpu: 95, ram: 88, network: 85 },
  });

  useEffect(() => {
    setData(generateInitialSystemData());
    setLastCheckTime(new Date().toLocaleTimeString());
    
    // Simulate a critical alert after 5 seconds
    const timeout = setTimeout(() => {
       setCriticalAlert({
          title: "GPU Thermal Critical Limit",
          message: "Workstation 1 GPU 0 temperature has exceeded the maximum safety threshold of 95°C. Immediate action required to prevent hardware damage.",
          source: "Workstation 1 (0OIS5X7W)",
          metric: "98.5 °C (Threshold: 95°C)",
          time: new Date().toLocaleTimeString()
       });
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        
        const newCpu = Math.max(20, Math.min(90, last.cpuUtil + (Math.random() * 10 - 5)));
        const newMem = Math.max(30, Math.min(80, last.memUtil + (Math.random() * 4 - 2)));
        const newTemp = Math.max(45, Math.min(80, last.tempAvg + (Math.random() * 4 - 2)));

        setCurrentMetrics(prev => ({
            cpu: newCpu,
            memory: newMem,
            disk: Math.max(0, prev.disk + (Math.random() * 0.2 - 0.1)),
            temp: newTemp
        }));

        setWsMetrics(prev => ({
           "W95MDOVI": { 
               cpu: Math.max(10, Math.min(100, prev["W95MDOVI"].cpu + (Math.random() * 4 - 2))),
               ram: Math.max(10, Math.min(100, prev["W95MDOVI"].ram + (Math.random() * 2 - 1))),
               network: Math.max(10, Math.min(100, prev["W95MDOVI"].network + (Math.random() * 6 - 3)))
           },
           "APLLBZzz": { 
               cpu: Math.max(10, Math.min(100, prev["APLLBZzz"].cpu + (Math.random() * 4 - 2))),
               ram: Math.max(10, Math.min(100, prev["APLLBZzz"].ram + (Math.random() * 2 - 1))),
               network: Math.max(10, Math.min(100, prev["APLLBZzz"].network + (Math.random() * 6 - 3)))
           },
           "IQHWCEHS": { 
               cpu: Math.max(10, Math.min(100, prev["IQHWCEHS"].cpu + (Math.random() * 4 - 2))),
               ram: Math.max(10, Math.min(100, prev["IQHWCEHS"].ram + (Math.random() * 2 - 1))),
               network: Math.max(10, Math.min(100, prev["IQHWCEHS"].network + (Math.random() * 6 - 3)))
           }
        }));

        newData.push({
          time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          cpuUtil: newCpu,
          cpuMin: newCpu - Math.random() * 10,
          cpuMax: newCpu + Math.random() * 10,
          memUtil: newMem,
          memMin: newMem - Math.random() * 5,
          memMax: newMem + Math.random() * 5,
          tempAvg: newTemp,
          tempMin: newTemp - Math.random() * 5,
          tempMax: newTemp + Math.random() * 5,
        });
        return newData;
      });

      setLastCheckTime(new Date().toISOString().replace('T', ' ').substring(0, 19));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-[#1e1e1e]/95 backdrop-blur-md border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white text-xs px-3 py-2.5 rounded-lg shadow-xl font-medium z-50 min-w-[140px]">
          <div className="text-gray-500 dark:text-gray-400 mb-2 border-b border-gray-100 dark:border-[#333] pb-1.5 flex justify-between items-center gap-4">
            <span className="font-bold text-[9px] uppercase tracking-wider">Timestamp</span>
            <span className="font-mono text-[10px]">{label}</span>
          </div>
          <div className="space-y-1.5">
            {payload.map((entry, idx) => (
               <div key={idx} className="flex items-center justify-between gap-4">
                 <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                   <span className="font-medium text-gray-600 dark:text-gray-300 capitalize">{entry.name}</span>
                 </div>
                 <span className="font-mono font-bold text-gray-900 dark:text-white">
                   {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
                 </span>
               </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const colors = {
    primary: '#52C5F3',
    secondary: '#EC3292',
    tertiary: '#8B5CF6',
    quaternary: '#10B981',
    grid: isDark ? '#2a2a2a' : '#e5e7eb',
    text: isDark ? '#888' : '#666',
  };

  const services = [
    { name: "Panon Orchestration Server", status: "Online", detail: "" },
    { name: "Panon API Server", status: "Online", detail: "" },
    { name: "Panon Datafeed", status: "Online", detail: "" },
    { name: "Panon Telemetry", status: "Online", detail: "" },
    { name: "PostgreSQL / TimescaleDB", status: "Online", detail: "" },
    { name: "RabbitMQ", status: "Online", detail: "connections: 5" },
    { name: "MediaMTX", status: "Online", detail: "active paths: 1" },
    { name: "MinIO", status: "Online", detail: "" },
  ];

  const workstations = [
    { id: "W95MDOVI", name: "Workstation Testing", type: "Analytic", ip: "10.240.137.8", status: "Online" },
    { id: "APLLBZzz", name: "Workstation Ultra 7", type: "Analytic", ip: "10.240.137.11", status: "Online" },
    { id: "IQHWCEHS", name: "Workstation 3090", type: "Analytic", ip: "10.240.137.17", status: "Online" },
  ];

  return (
    <>
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-[1600px] mx-auto min-h-full flex flex-col">
        <header className="mb-6 flex justify-between items-end">
           <div>
             <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">System Health</h1>
             <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Real-time health monitoring for system and associated services.</p>
           </div>
           <Button
             variant="outline"
             onClick={() => setCriticalAlert({
               title: "GPU Thermal Critical Limit",
               message: "Workstation 1 GPU 0 temperature has exceeded the maximum safety threshold of 95°C. Immediate action required to prevent hardware damage.",
               source: "Workstation 1 (0OIS5X7W)",
               metric: "98.5 °C (Threshold: 95°C)",
               time: new Date().toLocaleTimeString()
             })}
             className="text-xs h-8 px-4 rounded-full font-bold border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10"
           >
             Simulate Critical Alert
           </Button>
        </header>

        <ThresholdConfigPanel 
           workstations={workstations} 
           thresholds={thresholds} 
           onSave={(newThresholds) => setThresholds(newThresholds)} 
        />

        {/* Workstation Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
           {workstations.map(ws => {
             const metrics = wsMetrics[ws.id as keyof typeof wsMetrics];
             const th = thresholds[ws.id];
             
             if (!metrics || !th) return null;

             const cpuAlert = metrics.cpu >= th.cpu;
             const ramAlert = metrics.ram >= th.ram;
             const netAlert = metrics.network >= th.network;
             
             const hasAlert = cpuAlert || ramAlert || netAlert;

             return (
               <Card key={ws.id} className={cn("overflow-hidden border shadow-sm rounded-lg relative transition-colors duration-300", hasAlert ? "border-red-500/50 dark:border-red-500/50 bg-red-50/30 dark:bg-red-900/10" : "border-gray-200 dark:border-[#222]")}>
                  <div className="p-4 border-b border-gray-100 dark:border-[#222] flex items-center justify-between">
                     <div>
                        <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2">
                           <Server size={14} className={hasAlert ? "text-red-500" : "text-[#52C5F3]"} />
                           {ws.name}
                        </h3>
                        <div className="text-[10px] text-gray-500 font-mono mt-1">{ws.id} • {ws.ip}</div>
                     </div>
                     {hasAlert ? (
                       <span className="flex h-2 w-2 relative">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                       </span>
                     ) : (
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                     )}
                  </div>
                  <div className="p-4 space-y-3">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                          <Cpu size={14} /> CPU
                        </div>
                        <div className="flex items-center gap-2">
                           <span className={cn("text-xs font-mono font-bold", cpuAlert ? "text-red-500" : "text-gray-900 dark:text-white")}>
                             {metrics.cpu.toFixed(1)}%
                           </span>
                           <span className="text-[9px] text-gray-400">/ {th.cpu}%</span>
                        </div>
                     </div>
                     <div className="w-full bg-gray-200 dark:bg-[#333] rounded-full h-1.5 mt-1 overflow-hidden">
                        <div className={cn("h-1.5 rounded-full transition-all duration-300", cpuAlert ? "bg-red-500" : "bg-[#52C5F3]")} style={{ width: `${metrics.cpu}%` }}></div>
                     </div>

                     <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                          <Database size={14} /> RAM
                        </div>
                        <div className="flex items-center gap-2">
                           <span className={cn("text-xs font-mono font-bold", ramAlert ? "text-red-500" : "text-gray-900 dark:text-white")}>
                             {metrics.ram.toFixed(1)}%
                           </span>
                           <span className="text-[9px] text-gray-400">/ {th.ram}%</span>
                        </div>
                     </div>
                     <div className="w-full bg-gray-200 dark:bg-[#333] rounded-full h-1.5 mt-1 overflow-hidden">
                        <div className={cn("h-1.5 rounded-full transition-all duration-300", ramAlert ? "bg-red-500" : "bg-[#52C5F3]")} style={{ width: `${metrics.ram}%` }}></div>
                     </div>

                     <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                          <Activity size={14} /> Network
                        </div>
                        <div className="flex items-center gap-2">
                           <span className={cn("text-xs font-mono font-bold", netAlert ? "text-red-500" : "text-gray-900 dark:text-white")}>
                             {metrics.network.toFixed(1)}%
                           </span>
                           <span className="text-[9px] text-gray-400">/ {th.network}%</span>
                        </div>
                     </div>
                     <div className="w-full bg-gray-200 dark:bg-[#333] rounded-full h-1.5 mt-1 overflow-hidden">
                        <div className={cn("h-1.5 rounded-full transition-all duration-300", netAlert ? "bg-red-500" : "bg-[#52C5F3]")} style={{ width: `${metrics.network}%` }}></div>
                     </div>
                  </div>
               </Card>
             );
           })}
        </div>

        {/* System Section */}
        <SectionHeader 
            title="System" 
            rightElement={
                <div className="relative w-40">
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                         <ChevronDown size={14} />
                    </div>
                    <Select className="w-full bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#222] rounded pl-3 pr-8 h-7 text-[11px] font-bold text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer appearance-none">
                       <option>Last 24 hours</option>
                       <option>Last 7 days</option>
                       <option>Last 30 days</option>
                    </Select>
                </div>
            }
        />

         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch p-4">
           <ChartContainer title="CPU CHART" subtitle="Average, Min, Max">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="cpuMax" name="Max" stroke={colors.secondary} fill="none" strokeWidth={1.5} isAnimationActive={false} />
                  <Area type="monotone" dataKey="cpuUtil" name="Avg" stroke={colors.primary} fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} isAnimationActive={false} />
                  <Area type="monotone" dataKey="cpuMin" name="Min" stroke={colors.tertiary} fill="none" strokeWidth={1} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
           </ChartContainer>

           <ChartContainer title="MEMORY CHART" subtitle="Average, Min, Max">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="memMax" name="Max" stroke={colors.secondary} fill="none" strokeWidth={1.5} isAnimationActive={false} />
                  <Area type="monotone" dataKey="memUtil" name="Avg" stroke={colors.primary} fillOpacity={1} fill="url(#colorMem)" strokeWidth={2} isAnimationActive={false} />
                  <Area type="monotone" dataKey="memMin" name="Min" stroke={colors.tertiary} fill="none" strokeWidth={1} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
           </ChartContainer>

           <ChartContainer title="TEMPERATURE CHART" subtitle="Average, Min, Max">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="tempMax" name="Max" stroke={colors.secondary} fill="none" strokeWidth={1.5} isAnimationActive={false} />
                  <Area type="monotone" dataKey="tempAvg" name="Avg" stroke="#F59E0B" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={2} isAnimationActive={false} />
                  <Area type="monotone" dataKey="tempMin" name="Min" stroke={colors.tertiary} fill="none" strokeWidth={1} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
           </ChartContainer>

           <div className="flex flex-col gap-2">
              <MetricItem label="Utilization" value={currentMetrics.cpu} unit="%" icon={Cpu} delay={0.1} />
              <MetricItem label="Memory" value={currentMetrics.memory} unit="%" icon={Server} delay={0.2} />
              <MetricItem label="Disk Usage" value={currentMetrics.disk} unit="%" icon={HardDrive} delay={0.3} />
              <MetricItem label="Temperature" value={currentMetrics.temp} unit="C" icon={Thermometer} delay={0.4} />
           </div>
        </div>

        {/* System Load Heatmap Section */}
        <SectionHeader title="System Load Heatmap" />
        <Card className="p-4 rounded-[11px] bg-white dark:bg-[#1e1e1e] border-gray-100 dark:border-[#222] shadow-sm mb-6 overflow-x-auto custom-scrollbar">
           <div className="min-w-[600px]">
              <SystemLoadHeatmap />
           </div>
        </Card>

        {/* System Services Section */}
        <SectionHeader title="System Services" />
        <Card className="rounded-[11px] bg-white dark:bg-[#1e1e1e] border-gray-100 dark:border-[#222] overflow-hidden shadow-sm">
           <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-[#161616] border-b border-gray-100 dark:border-[#222]">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">Service Name</th>
                    <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">Detail</th>
                    <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase text-right">Last Check</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#252525]">
                 {services.map((svc, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-[#252525]/30 transition-colors">
                        <td className="px-6 py-3.5 text-[11px] font-bold text-gray-900 dark:text-white">{svc.name}</td>
                        <td className="px-6 py-3.5">
                           <div className="flex items-center gap-1.5 text-xs text-gray-900 dark:text-white font-medium">
                              <CheckCircle2 size={14} className="text-green-500" />
                              {svc.status}
                           </div>
                        </td>
                        <td className="px-6 py-3.5 text-[11px] text-gray-600 dark:text-gray-400 font-mono">{svc.detail || '-'}</td>
                        <td className="px-6 py-3.5 text-[11px] font-mono text-gray-500 text-right">
                           <motion.span
                             key={lastCheckTime}
                             initial={{ opacity: 0.5 }}
                             animate={{ opacity: 1 }}
                           >
                             {lastCheckTime}
                           </motion.span>
                        </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </Card>

        {/* Workstation Section */}
        <SectionHeader title="Workstation" />
        <Card className="rounded-[11px] bg-white dark:bg-[#1e1e1e] border-gray-100 dark:border-[#222] overflow-hidden shadow-sm mb-12">
           <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-[#161616] border-b border-gray-100 dark:border-[#222]">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">IP Address</th>
                    <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">Status</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#252525]">
                 {workstations.map((ws, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-[#252525]/30 transition-colors">
                        <td className="px-6 py-3.5 text-xs font-mono font-medium text-gray-900 dark:text-white">{ws.id}</td>
                        <td className="px-6 py-3.5 text-xs font-bold text-gray-900 dark:text-white">{ws.name}</td>
                        <td className="px-6 py-3.5 text-[11px] text-gray-600 dark:text-gray-400 capitalize">{ws.type}</td>
                        <td className="px-6 py-3.5 text-xs font-mono text-gray-600 dark:text-gray-400">{ws.ip}</td>
                        <td className="px-6 py-3.5 text-xs text-gray-900 dark:text-white">
                           <div className="flex items-center gap-1.5 font-medium">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                              {ws.status}
                           </div>
                        </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </Card>

      </div>
    </main>
    <QuickViewModal isOpen={!!criticalAlert} onClose={() => setCriticalAlert(null)} data={criticalAlert} />
    </>
  );
};
