import React, { useState, useEffect } from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';
import { ChevronDown, Monitor, Cpu, Activity, Zap, Clock, HardDrive, Server, Thermometer } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Select } from '../components/ui/select';
import { Card } from '../components/ui/card';
import { motion } from 'motion/react';

const generateInitialData = () => {
  const now = new Date();
  return Array.from({length: 30}).map((_, i) => {
    const d = new Date(now.getTime() - (29 - i) * 2000);
    return {
      time: d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      avg: Math.floor(Math.random() * 40) + 40,
      min: Math.floor(Math.random() * 10) + 20,
      max: Math.floor(Math.random() * 20) + 70,
      utilization: Math.floor(Math.random() * 50) + 30,
      decoder: Math.floor(Math.random() * 30) + 10,
      encoder: Math.floor(Math.random() * 30) + 20,
      memory: Math.floor(Math.random() * 40) + 40,
      batchAvg: Math.floor(Math.random() * 5) + 3,
      batchMin: Math.floor(Math.random() * 2) + 1,
      batchMax: Math.floor(Math.random() * 4) + 6,
      queueDepth: Math.floor(Math.random() * 5),
      batchPerSec: Number((Math.random() * 5 + 2).toFixed(2)),
      windowSec: Math.floor(Math.random() * 20) + 50,
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

const MetricItem = ({ label, value, icon: Icon, unit = "", delay = 0, isNumber = false }: { label: string, value: string | number, icon?: any, unit?: string, delay?: number, isNumber?: boolean }) => {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (isNumber) {
        setHighlight(true);
        const timer = setTimeout(() => setHighlight(false), 300);
        return () => clearTimeout(timer);
    }
  }, [value, isNumber]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay }}
      className="flex items-center justify-between p-3 bg-white dark:bg-[#1c1c1c] rounded-lg border border-gray-100 dark:border-[#222] shadow-sm relative overflow-hidden group mb-2"
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
            {isNumber && typeof value === 'number' ? value.toFixed(unit === 'fps' || unit === '' ? 1 : 1) : value}
         </span>
         {unit && <span className="text-gray-500 text-[10px] font-bold">{unit}</span>}
      </div>
    </motion.div>
  );
};

export const SystemMonitoring = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [data, setData] = useState<any[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState({
      sysCpu: 48.0,
      sysMem: 48.1,
      sysDisk: 21.6,
      sysTemp: 58.0,
      gpu0Fps: 211.4,
      gpu0Util: 48.1,
      gpu0Dec: 21.6,
      gpu0Enc: 25.3,
      gpu0Temp: 58.0,
      gpu1Fps: 205.1,
      gpu1Util: 45.1,
      gpu1Dec: 19.4,
      gpu1Enc: 23.8,
      gpu1Temp: 55.0,
      yolo11nBatch: 4.39,
      yolo11nQueue: 0,
      yolo11nWindow: 60,
      yolov8nBatch: 4.21,
      yolov8nQueue: 0,
      yolov8nWindow: 60,
  });

  useEffect(() => {
    setData(generateInitialData());
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        
        const newAvg = Math.max(20, Math.min(90, last.avg + (Math.random() * 10 - 5)));
        const newUtil = Math.max(30, Math.min(80, last.utilization + (Math.random() * 6 - 3)));
        const newTemp = Math.max(45, Math.min(80, newAvg + 15));
        
        setCurrentMetrics(m => ({
            ...m,
            sysCpu: newAvg,
            sysMem: Math.max(30, Math.min(80, m.sysMem + (Math.random() * 2 - 1))),
            sysTemp: newTemp,
            gpu0Fps: Math.max(150, m.gpu0Fps + (Math.random() * 10 - 5)),
            gpu0Util: newUtil,
            gpu0Dec: Math.max(10, Math.min(50, m.gpu0Dec + (Math.random() * 4 - 2))),
            gpu0Enc: Math.max(10, Math.min(50, m.gpu0Enc + (Math.random() * 4 - 2))),
            gpu0Temp: newTemp - 2,
            gpu1Fps: Math.max(150, m.gpu1Fps + (Math.random() * 10 - 5)),
            gpu1Util: newUtil - 5,
            gpu1Dec: Math.max(10, Math.min(50, m.gpu1Dec + (Math.random() * 4 - 2))),
            gpu1Enc: Math.max(10, Math.min(50, m.gpu1Enc + (Math.random() * 4 - 2))),
            gpu1Temp: newTemp - 4,
            yolo11nBatch: Math.max(2, m.yolo11nBatch + (Math.random() * 0.4 - 0.2)),
            yolov8nBatch: Math.max(2, m.yolov8nBatch + (Math.random() * 0.4 - 0.2)),
        }));

        newData.push({
          time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          avg: newAvg,
          min: newAvg - Math.random() * 10,
          max: newAvg + Math.random() * 10,
          utilization: newUtil,
          decoder: Math.max(10, Math.min(50, last.decoder + (Math.random() * 4 - 2))),
          encoder: Math.max(10, Math.min(50, last.encoder + (Math.random() * 4 - 2))),
          memory: Math.max(30, Math.min(80, last.memory + (Math.random() * 4 - 2))),
          batchAvg: Math.max(1, last.batchAvg + Math.floor(Math.random() * 3 - 1)),
          batchMin: 1,
          batchMax: 8,
          queueDepth: Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0,
          batchPerSec: Number((Math.random() * 5 + 2).toFixed(2)),
          windowSec: 60,
        });
        return newData;
      });
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

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 md:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-[1600px] mx-auto min-h-full flex flex-col">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-4">Workstation Monitoring</h1>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative w-full sm:w-80">
               <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    <ChevronDown size={14} />
               </div>
               <Select className="w-full bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#222] rounded-lg pl-4 pr-9 h-[34px] text-[12px] font-semibold text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer appearance-none">
                  <option>0OIS5X7W - Workstation 1</option>
               </Select>
            </div>
            
            <div className="relative w-full sm:w-48">
               <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    <ChevronDown size={14} />
               </div>
               <Select className="w-full bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#222] rounded-lg pl-4 pr-9 h-[34px] text-[12px] font-semibold text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer appearance-none">
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
               </Select>
            </div>
          </div>
        </header>

        {/* Info Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
           <Card className="overflow-hidden border border-gray-200 dark:border-[#222] shadow-sm rounded-lg">
             <table className="w-full text-[11px]">
                <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
                   <tr className="bg-white dark:bg-[#1c1c1c]">
                      <td className="px-4 py-2.5 text-gray-500 font-black tracking-widest uppercase border-r border-gray-200 dark:border-[#222] w-1/3">ID</td>
                      <td className="px-4 py-2.5 font-mono text-gray-900 dark:text-white font-medium">0OIS5X7W</td>
                   </tr>
                   <tr className="bg-gray-50/50 dark:bg-[#1a1a1a]/50">
                      <td className="px-4 py-2.5 text-gray-500 font-black tracking-widest uppercase border-r border-gray-200 dark:border-[#222]">Name</td>
                      <td className="px-4 py-2.5 text-gray-900 dark:text-white font-medium">Workstation 1</td>
                   </tr>
                   <tr className="bg-white dark:bg-[#1c1c1c]">
                      <td className="px-4 py-2.5 text-gray-500 font-black tracking-widest uppercase border-r border-gray-200 dark:border-[#222]">Type</td>
                      <td className="px-4 py-2.5 text-gray-900 dark:text-white font-medium">analytic</td>
                   </tr>
                   <tr className="bg-gray-50/50 dark:bg-[#1a1a1a]/50">
                      <td className="px-4 py-2.5 text-gray-500 font-black tracking-widest uppercase border-r border-gray-200 dark:border-[#222]">Specification</td>
                      <td className="px-4 py-2.5 text-gray-900 dark:text-white font-medium">13th Gen Intel(R) Core(TM) i7-1355U</td>
                   </tr>
                </tbody>
             </table>
           </Card>

           <Card className="overflow-hidden border border-gray-200 dark:border-[#222] shadow-sm rounded-lg">
             <table className="w-full text-[11px]">
                <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
                   <tr className="bg-white dark:bg-[#1c1c1c]">
                      <td className="px-4 py-2.5 text-gray-500 font-black tracking-widest uppercase border-r border-gray-200 dark:border-[#222] w-1/3">Memory (MB)</td>
                      <td className="px-4 py-2.5 font-mono text-gray-900 dark:text-white font-medium">8,192</td>
                   </tr>
                   <tr className="bg-gray-50/50 dark:bg-[#1a1a1a]/50">
                      <td className="px-4 py-2.5 text-gray-500 font-black tracking-widest uppercase border-r border-gray-200 dark:border-[#222]">IP Address</td>
                      <td className="px-4 py-2.5 font-mono text-gray-900 dark:text-white font-medium">10.240.137.8</td>
                   </tr>
                   <tr className="bg-white dark:bg-[#1c1c1c]">
                      <td className="px-4 py-2.5 text-gray-500 font-black tracking-widest uppercase border-r border-gray-200 dark:border-[#222]">Max FPS</td>
                      <td className="px-4 py-2.5 font-mono text-gray-900 dark:text-white font-medium">650</td>
                   </tr>
                   <tr className="bg-gray-50/50 dark:bg-[#1a1a1a]/50">
                      <td className="px-4 py-2.5 text-gray-500 font-black tracking-widest uppercase border-r border-gray-200 dark:border-[#222]">Max Channels</td>
                      <td className="px-4 py-2.5 font-mono text-gray-900 dark:text-white font-medium">120</td>
                   </tr>
                </tbody>
             </table>
           </Card>
        </div>

        {/* System Section */}
        <SectionHeader title="System" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch p-4">
           {/* CPU Chart */}
           <ChartContainer title="CPU CHART" subtitle="Average, Min, Max">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSysCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="max" stroke={colors.secondary} fill="none" strokeWidth={1.5} isAnimationActive={false} />
                  <Area type="monotone" dataKey="avg" stroke={colors.primary} fillOpacity={1} fill="url(#colorSysCpu)" strokeWidth={2} isAnimationActive={false} />
                  <Area type="monotone" dataKey="min" stroke={colors.tertiary} fill="none" strokeWidth={1} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
           </ChartContainer>

           {/* Memory Chart */}
           <ChartContainer title="MEMORY CHART">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSysMem" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.quaternary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={colors.quaternary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="stepAfter" dataKey="memory" stroke={colors.quaternary} fillOpacity={1} fill="url(#colorSysMem)" strokeWidth={2} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
           </ChartContainer>

           {/* Temperature Chart */}
           <ChartContainer title="TEMPERATURE CHART" subtitle="Average, Min, Max">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSysTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="max" stroke={colors.secondary} fill="none" strokeWidth={1.5} isAnimationActive={false} />
                  <Area type="monotone" dataKey="avg" stroke="#F59E0B" fillOpacity={1} fill="url(#colorSysTemp)" strokeWidth={2} isAnimationActive={false} />
                  <Area type="monotone" dataKey="min" stroke={colors.tertiary} fill="none" strokeWidth={1} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
           </ChartContainer>

           <div className="flex flex-col gap-2">
              <MetricItem label="Utilization" value={currentMetrics.sysCpu} unit="%" icon={Cpu} delay={0.1} isNumber />
              <MetricItem label="Memory" value={currentMetrics.sysMem} unit="%" icon={Server} delay={0.2} isNumber />
              <MetricItem label="Disk Usage" value={currentMetrics.sysDisk} unit="%" icon={HardDrive} delay={0.3} isNumber />
              <MetricItem label="Temperature" value={currentMetrics.sysTemp} unit="C" icon={Thermometer} delay={0.4} isNumber />
           </div>
        </div>

        {/* Accelerators Section */}
        <SectionHeader title="Accelerators" />
        
        {/* GPU 0 */}
        <div className="text-xs font-bold text-gray-900 dark:text-white px-4 py-2 border-b border-gray-100 dark:border-[#222]">
           GPU NVIDIA GeForce RTX 3090 (gpu:0)
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center p-4 border-b border-gray-200/50 dark:border-[#222]/50">
           {/* FPS Chart */}
           <ChartContainer title="FPS CHART" subtitle="Average, Min, Max">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGpu0Fps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="max" stroke={colors.secondary} fill="none" strokeWidth={1.5} isAnimationActive={false} />
                  <Area type="monotone" dataKey="avg" stroke={colors.primary} fillOpacity={1} fill="url(#colorGpu0Fps)" strokeWidth={2} isAnimationActive={false} />
                  <Area type="monotone" dataKey="min" stroke={colors.tertiary} fill="none" strokeWidth={1} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
           </ChartContainer>

           {/* Utilization Chart */}
           <ChartContainer title="UTILIZATION CHART (4 lines)" subtitle="Utilisation, Decoder, Encoder, Memory">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="utilization" name="Utilisation" stroke={colors.primary} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="decoder" name="Decoder" stroke={colors.secondary} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="encoder" name="Encoder" stroke={colors.tertiary} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="memory" name="Memory" stroke={colors.quaternary} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
           </ChartContainer>

           {/* Temperature Chart */}
           <ChartContainer title="TEMPERATURE CHART" subtitle="Average, Min, Max">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGpu0Temp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="max" stroke={colors.secondary} fill="none" strokeWidth={1.5} isAnimationActive={false} />
                  <Area type="monotone" dataKey="avg" stroke="#F59E0B" fillOpacity={1} fill="url(#colorGpu0Temp)" strokeWidth={2} isAnimationActive={false} />
                  <Area type="monotone" dataKey="min" stroke={colors.tertiary} fill="none" strokeWidth={1} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
           </ChartContainer>

           {/* GPU Metrics */}
           <div className="flex flex-col gap-2">
              <MetricItem label="Current FPS" value={currentMetrics.gpu0Fps} unit="fps" icon={Activity} delay={0.1} isNumber />
              <MetricItem label="Utilization" value={currentMetrics.gpu0Util} unit="%" icon={Cpu} delay={0.2} isNumber />
              <MetricItem label="Decoder" value={currentMetrics.gpu0Dec} unit="%" icon={Server} delay={0.3} isNumber />
              <MetricItem label="Temperature" value={currentMetrics.gpu0Temp} unit="C" icon={Thermometer} delay={0.4} isNumber />
           </div>
        </div>

        {/* GPU 1 */}
        <div className="text-xs font-bold text-gray-900 dark:text-white px-4 py-2 border-b border-gray-100 dark:border-[#222]">
           GPU NVIDIA GeForce RTX 3090 (gpu:1)
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center p-4 border-b border-gray-200/50 dark:border-[#222]/50">
           {/* FPS Chart */}
           <ChartContainer title="FPS CHART" subtitle="Average, Min, Max">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGpu1Fps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="max" stroke={colors.secondary} fill="none" strokeWidth={1.5} isAnimationActive={false} />
                  <Area type="monotone" dataKey="avg" stroke={colors.primary} fillOpacity={1} fill="url(#colorGpu1Fps)" strokeWidth={2} isAnimationActive={false} />
                  <Area type="monotone" dataKey="min" stroke={colors.tertiary} fill="none" strokeWidth={1} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
           </ChartContainer>

           {/* Utilization Chart */}
           <ChartContainer title="UTILIZATION CHART (4 lines)" subtitle="Utilisation, Decoder, Encoder, Memory">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="utilization" name="Utilisation" stroke={colors.primary} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="decoder" name="Decoder" stroke={colors.secondary} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="encoder" name="Encoder" stroke={colors.tertiary} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="memory" name="Memory" stroke={colors.quaternary} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
           </ChartContainer>

           {/* Temperature Chart */}
           <ChartContainer title="TEMPERATURE CHART" subtitle="Average, Min, Max">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGpu1Temp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="max" stroke={colors.secondary} fill="none" strokeWidth={1.5} isAnimationActive={false} />
                  <Area type="monotone" dataKey="avg" stroke="#F59E0B" fillOpacity={1} fill="url(#colorGpu1Temp)" strokeWidth={2} isAnimationActive={false} />
                  <Area type="monotone" dataKey="min" stroke={colors.tertiary} fill="none" strokeWidth={1} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
           </ChartContainer>

           <div className="flex flex-col gap-2">
              <MetricItem label="Current FPS" value={currentMetrics.gpu1Fps} unit="fps" icon={Activity} delay={0.1} isNumber />
              <MetricItem label="Utilization" value={currentMetrics.gpu1Util} unit="%" icon={Cpu} delay={0.2} isNumber />
              <MetricItem label="Decoder" value={currentMetrics.gpu1Dec} unit="%" icon={Server} delay={0.3} isNumber />
              <MetricItem label="Temperature" value={currentMetrics.gpu1Temp} unit="C" icon={Thermometer} delay={0.4} isNumber />
           </div>
        </div>

        {/* Inference Thread Section */}
        <SectionHeader title="Inference Thread" />
        
        {/* yolo11n */}
        <div className="text-xs font-bold text-gray-900 dark:text-white px-4 py-2 border-b border-gray-100 dark:border-[#222]">
           yolo11n@gpu:0
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch p-4 border-b border-gray-200/50 dark:border-[#222]/50">
           {/* BATCH Chart */}
           <ChartContainer title="BATCH CHART" subtitle="Average, Min, Max, Queue Depth">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="batchMax" name="Max" stroke={colors.secondary} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="batchAvg" name="Avg" stroke={colors.primary} strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="batchMin" name="Min" stroke={colors.tertiary} strokeWidth={1} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="queueDepth" name="Queue Depth" stroke={colors.quaternary} strokeWidth={1.5} strokeDasharray="3 3" dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
           </ChartContainer>

           {/* BATCH / SEC Chart */}
           <ChartContainer title="BATCH / SEC CHART">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBatchSec1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.tertiary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={colors.tertiary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="batchPerSec" name="Batch/Sec" stroke={colors.tertiary} fillOpacity={1} fill="url(#colorBatchSec1)" strokeWidth={2} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
           </ChartContainer>

           {/* WINDOW SEC Chart */}
           <ChartContainer title="WINDOW SEC CHART">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="stepAfter" dataKey="windowSec" name="Window Sec" stroke="#F59E0B" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
           </ChartContainer>

           {/* Inference Metrics */}
           <div className="flex flex-col gap-2">
              <MetricItem label="Model" value="yolo11n" icon={Activity} />
              <MetricItem label="Batch per sec" value={currentMetrics.yolo11nBatch} unit="bps" icon={Zap} delay={0.1} isNumber />
              <MetricItem label="Queue depth" value={currentMetrics.yolo11nQueue} icon={Server} delay={0.2} isNumber />
              <MetricItem label="Window sec" value={currentMetrics.yolo11nWindow} unit="s" icon={Clock} delay={0.3} isNumber />
           </div>
        </div>

        {/* yolov8n */}
        <div className="text-xs font-bold text-gray-900 dark:text-white px-4 py-2 border-b border-gray-100 dark:border-[#222]">
           yolov8n@gpu:0
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch p-4">
           {/* BATCH Chart */}
           <ChartContainer title="BATCH CHART" subtitle="Average, Min, Max, Queue Depth">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="batchMax" name="Max" stroke={colors.secondary} strokeWidth={1.5} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="batchAvg" name="Avg" stroke={colors.primary} strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="batchMin" name="Min" stroke={colors.tertiary} strokeWidth={1} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="queueDepth" name="Queue Depth" stroke={colors.quaternary} strokeWidth={1.5} strokeDasharray="3 3" dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
           </ChartContainer>

           {/* BATCH / SEC Chart */}
           <ChartContainer title="BATCH / SEC CHART">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBatchSec2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.tertiary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={colors.tertiary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="batchPerSec" name="Batch/Sec" stroke={colors.tertiary} fillOpacity={1} fill="url(#colorBatchSec2)" strokeWidth={2} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
           </ChartContainer>

           {/* WINDOW SEC Chart */}
           <ChartContainer title="WINDOW SEC CHART">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: colors.text}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="stepAfter" dataKey="windowSec" name="Window Sec" stroke="#F59E0B" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
           </ChartContainer>

           {/* Inference Metrics */}
           <div className="flex flex-col gap-2">
              <MetricItem label="Model" value="yolov8n" icon={Activity} />
              <MetricItem label="Batch per sec" value={currentMetrics.yolov8nBatch} unit="bps" icon={Zap} delay={0.1} isNumber />
              <MetricItem label="Queue depth" value={currentMetrics.yolov8nQueue} icon={Server} delay={0.2} isNumber />
              <MetricItem label="Window sec" value={currentMetrics.yolov8nWindow} unit="s" icon={Clock} delay={0.3} isNumber />
           </div>
        </div>

      </div>
    </main>
  );
};
