import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Dropdown } from '../components/ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChevronDown, Video, Activity, Info, VideoOff, PlaySquare, Maximize2, Zap, Cpu, Wifi, MapPin, Search, X, Server, LayoutTemplate, Clock, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

// Mock Data
const trendData = [
  { time: '00:00', car: 12, motorbike: 3 },
  { time: '04:00', car: 5, motorbike: 1 },
  { time: '08:00', car: 45, motorbike: 23 },
  { time: '12:00', car: 60, motorbike: 40 },
  { time: '16:00', car: 55, motorbike: 35 },
  { time: '20:00', car: 30, motorbike: 15 },
  { time: '24:00', car: 10, motorbike: 4 },
];

const historyData = [
  { id: 1, dateTime: '22 Jun 2026 08:23:43', roi: 'Right Zone', class: 'car', confidence: 0.89 },
  { id: 2, dateTime: '22 Jun 2026 08:02:39', roi: 'Right Zone', class: 'car', confidence: 0.92 },
  { id: 3, dateTime: '22 Jun 2026 07:41:22', roi: 'Left Zone', class: 'car', confidence: 0.75 },
  { id: 4, dateTime: '22 Jun 2026 07:11:01', roi: 'Right Zone', class: 'motorbike', confidence: 0.94 },
  { id: 5, dateTime: '22 Jun 2026 06:40:40', roi: 'Right Zone', class: 'car', confidence: 0.88 },
  { id: 6, dateTime: '22 Jun 2026 06:10:19', roi: 'Right Zone', class: 'motorbike', confidence: 0.91 },
  { id: 7, dateTime: '22 Jun 2026 05:39:58', roi: 'Left Zone', class: 'motorbike', confidence: 0.82 },
];

const generateRealtimeData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    i,
    received: +(4.5 + Math.random()).toFixed(1),
    inferred: +(4.4 + Math.random()).toFixed(1),
    latency: +(12 + Math.random() * 5).toFixed(0),
    streamOut: +(1100 + Math.random() * 200).toFixed(0),
    intelligenceRate: +(4000 + Math.random() * 300).toFixed(0),
  }));
};

const MiniChart = ({ data, dataKey, color, isDark }: { data: any[]; dataKey: string; color: string; isDark?: boolean }) => (
  <div className="h-12 w-full mt-2 -mb-2">
    <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
      <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`color-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={isDark ? 0.4 : 0.2}/>
            <stop offset="95%" stopColor={color} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey={dataKey} stroke={color} fillOpacity={1} fill={`url(#color-${dataKey})`} strokeWidth={2} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const OrchestrationDashboard = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [timeframe, setTimeframe] = useState('Last 24 hours');
  const [filters, setFilters] = useState<string[]>(['Time: Last 24 Hours']);
  const [selectedChannel, setSelectedChannel] = useState('001');
  const [selectedUseCase, setSelectedUseCase] = useState('parkir');
  const [selectedCamera, setSelectedCamera] = useState('cam-002');
  const [realtimeData, setRealtimeData] = useState(generateRealtimeData);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => {
        const newData = [...prev.slice(1), {
          i: prev[prev.length - 1].i + 1,
          received: +(4.5 + Math.random()).toFixed(1),
          inferred: +(4.4 + Math.random() * 0.5).toFixed(1),
          latency: +(12 + Math.random() * 5).toFixed(0),
          streamOut: +(1100 + Math.random() * 200).toFixed(0),
          intelligenceRate: +(4000 + Math.random() * 300).toFixed(0),
        }];
        return newData;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const latest = realtimeData[realtimeData.length - 1];

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-[#161616]/95 backdrop-blur-md border border-gray-100 dark:border-[#2a2a2a] text-gray-900 dark:text-white text-xs px-3 py-2 rounded-lg shadow-xl">
          {label && <div className="text-gray-500 font-medium mb-1.5 pb-1 border-b border-gray-100 dark:border-[#2a2a2a]">{label}</div>}
          <div className="space-y-1.5">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-[2px]" style={{ backgroundColor: entry.color || entry.payload?.fill }}></div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">{entry.name}</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-6 min-h-full">
        
        {/* Title & Tabs */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-1">Orchestration Overview</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Real-time pipeline performance, intelligence rate, and channel orchestration.</p>
          </div>
          
          {/* Action Bar */}
          <div className="flex items-center gap-3">
             <Button variant="outline" className="text-xs h-9 px-4 font-bold border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1e1e1e] hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors rounded-full text-gray-700 dark:text-gray-300">
               <MapPin className="w-3.5 h-3.5 mr-1.5" />
               View Topology
             </Button>
             <Button className="bg-[#52C5F3] hover:bg-[#52C5F3]/90 text-white text-xs h-9 px-5 font-bold rounded-full shadow-sm transition-colors border border-transparent">
               <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />
               Acknowledge Alerts
             </Button>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 flex-wrap p-2 rounded-xl bg-white/50 dark:bg-[#1e1e1e]/50 border border-gray-100 dark:border-[#222] shadow-sm backdrop-blur-sm">
            <div className="w-48 relative">
              <Select 
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="text-xs h-9 rounded-lg border-transparent bg-gray-50/80 dark:bg-[#252525]/80 text-gray-900 dark:text-white font-semibold focus:border-[#52C5F3] focus:ring-1 focus:ring-[#52C5F3] transition-all"
              >
                <option value="001">CH-001 • Main Gate</option>
                <option value="002">CH-002 • Perimeter</option>
                <option value="003">CH-003 • Loading Dock</option>
              </Select>
            </div>
            <div className="w-48 relative">
              <Select 
                value={selectedUseCase}
                onChange={(e) => setSelectedUseCase(e.target.value)}
                className="text-xs h-9 rounded-lg border-transparent bg-gray-50/80 dark:bg-[#252525]/80 text-gray-900 dark:text-white font-semibold focus:border-[#52C5F3] focus:ring-1 focus:ring-[#52C5F3] transition-all"
              >
                <option value="parkir">UC-01 • Parkir Liar</option>
                <option value="crowd">UC-02 • Crowd Detection</option>
                <option value="perimeter">UC-03 • Perimeter Breach</option>
              </Select>
            </div>
            <div className="w-56 relative">
              <Select 
                value={selectedCamera}
                onChange={(e) => setSelectedCamera(e.target.value)}
                className="text-xs h-9 rounded-lg border-transparent bg-gray-50/80 dark:bg-[#252525]/80 text-gray-900 dark:text-white font-semibold focus:border-[#52C5F3] focus:ring-1 focus:ring-[#52C5F3] transition-all"
              >
                <option value="cam-001">CAM-001 • North Gate PTZ</option>
                <option value="cam-002">CAM-002 • Main Entrance Fix</option>
                <option value="cam-003">CAM-003 • Parking Lot A</option>
              </Select>
            </div>
            
            <div className="w-px h-6 bg-gray-200 dark:bg-[#333] mx-1"></div>

            {filters.map(filter => (
              <span key={filter} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#52C5F3]/10 border border-[#52C5F3]/20 text-[#52C5F3] text-[10px] font-bold tracking-wide transition-all hover:bg-[#52C5F3]/15 cursor-default">
                {filter}
                <X size={12} className="cursor-pointer hover:text-[#52C5F3]/80 transition-colors ml-1" onClick={() => setFilters(filters.filter(f => f !== filter))} />
              </span>
            ))}

            <Dropdown 
              trigger={
                <Button variant="ghost" className="text-xs px-3 font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors rounded-lg">
                  + Add Filter
                </Button>
              }
              align="left"
              width="w-56"
              items={[
                 { id: 'time_24h', label: 'Time: Last 24 Hours', checked: filters.includes('Time: Last 24 Hours') },
                 { id: 'time_7d', label: 'Time: Last 7 Days', checked: filters.includes('Time: Last 7 Days') },
                 { id: 'status_online', label: 'Status: Online', checked: filters.includes('Status: Online') },
                 { id: 'cam_only', label: 'Camera: CAM-002 Only', checked: filters.includes('Camera: CAM-002 Only') }
              ]}
              onSelect={(item) => {
                 if (filters.includes(item.label)) {
                   setFilters(filters.filter(f => f !== item.label));
                 } else {
                   setFilters([...filters, item.label]);
                 }
              }}
            />

            <div className="relative group ml-auto h-9 w-64 hidden xl:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <Input 
                type="text"
                placeholder="Search cameras, zones, or channels..."
                className="pl-9 text-xs rounded-lg h-full border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#161616] text-gray-900 dark:text-white focus:border-[#52C5F3] transition-colors shadow-sm"
              />
            </div>
          </div>

          {/* Top Status Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

            {/* Realtime Metric: Public Area Intelligence */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/30 transition-all hover:shadow-md">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Activity className="w-20 h-20 text-purple-500" />
              </div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-[10px] uppercase font-black tracking-widest text-purple-600 dark:text-purple-400 truncate mr-2">Public Area Int.</span>
                <div className="p-1.5 bg-purple-50 dark:bg-purple-500/10 rounded-md border border-purple-100 dark:border-purple-500/20">
                   <Activity className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5 relative z-10">
                <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{latest.intelligenceRate.toLocaleString()}</span>
                <span className="text-[11px] text-purple-600/70 dark:text-purple-400/70 font-bold tracking-widest uppercase">Kbps</span>
              </div>
              <div className="relative z-10 mt-2">
                 <MiniChart data={realtimeData} dataKey="intelligenceRate" color={isDark ? '#a855f7' : '#9333ea'} isDark={isDark} />
              </div>
            </div>

            {/* Realtime Metric: Received */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/30 transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-[10px] uppercase font-black tracking-widest text-gray-500">Received Stream</span>
                <div className="p-1.5 bg-blue-50 dark:bg-blue-500/10 rounded-md border border-blue-100 dark:border-blue-500/20">
                   <Wifi className="w-3.5 h-3.5 text-blue-500" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5 relative z-10">
                <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{latest.received.toFixed(1)}</span>
                <span className="text-[11px] text-gray-500 font-bold tracking-widest uppercase">fps</span>
              </div>
              <div className="relative z-10 mt-2">
                 <MiniChart data={realtimeData} dataKey="received" color={isDark ? '#60a5fa' : '#3b82f6'} isDark={isDark} />
              </div>
            </div>

            {/* Realtime Metric: Inferred */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-[#52C5F3]/30 transition-all hover:shadow-md">
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#52C5F3]/5 rounded-full blur-2xl" />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-[10px] uppercase font-black tracking-widest text-[#52C5F3]">Inferred Output</span>
                <div className="p-1.5 bg-[#52C5F3]/10 rounded-md border border-[#52C5F3]/20">
                   <Cpu className="w-3.5 h-3.5 text-[#52C5F3]" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5 relative z-10">
                <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{latest.inferred.toFixed(1)}</span>
                <span className="text-[11px] text-[#52C5F3]/70 font-bold tracking-widest uppercase">fps</span>
              </div>
              <div className="relative z-10 mt-2">
                 <MiniChart data={realtimeData} dataKey="inferred" color="#52C5F3" isDark={isDark} />
              </div>
            </div>

            {/* Realtime Metric: Latency */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/30 transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-[10px] uppercase font-black tracking-widest text-amber-500">End-to-End Latency</span>
                <div className="p-1.5 bg-amber-50 dark:bg-amber-500/10 rounded-md border border-amber-100 dark:border-amber-500/20">
                   <Zap className="w-3.5 h-3.5 text-amber-500" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5 relative z-10">
                <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{latest.latency}</span>
                <span className="text-[11px] text-amber-500/70 font-bold tracking-widest uppercase">ms</span>
              </div>
              <div className="relative z-10 mt-2">
                 <MiniChart data={realtimeData} dataKey="latency" color="#eab308" isDark={isDark} />
              </div>
            </div>

            {/* System & Stream Info */}
            <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-[#10b981]/30 transition-all hover:shadow-md">
              <div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="text-[10px] uppercase font-black tracking-widest text-gray-500">Sys Status</span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-600 dark:text-green-400 font-bold tracking-widest text-[9px] uppercase">
                      Healthy
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-2 relative z-10 bg-gray-50 dark:bg-[#252525] p-2.5 rounded-lg border border-gray-100 dark:border-[#2a2a2a]">
                  <div className="text-[10px] font-semibold text-gray-500 tracking-wide">Engine</div>
                  <div className="text-[11px] text-right font-black text-gray-900 dark:text-white">TensorRT</div>
                  <div className="text-[10px] font-semibold text-gray-500 tracking-wide">Codec</div>
                  <div className="text-[11px] text-right font-black text-gray-900 dark:text-white">NVDEC</div>
                </div>
              </div>
              <div className="mt-3 flex items-end justify-between relative z-10">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-black tracking-widest text-gray-500 mb-1">Stream Out</span>
                  <div className="flex items-baseline gap-1">
                     <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{latest.streamOut}</span>
                     <span className="text-[10px] font-bold text-gray-500">Kbps</span>
                  </div>
                </div>
                <div className="w-16 h-8 opacity-70">
                   <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                     <AreaChart data={realtimeData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                       <Area type="monotone" dataKey="streamOut" stroke="#10b981" fillOpacity={0.15} fill="#10b981" strokeWidth={1.5} isAnimationActive={false} />
                     </AreaChart>
                   </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Column */}
        <div className="flex flex-col flex-1 min-w-0 gap-6 overflow-y-auto custom-scrollbar pb-4 pr-1">
          
          {/* Live Detection Video Player */}
          <div className="relative aspect-[21/9] lg:aspect-video xl:aspect-[21/9] rounded-xl overflow-hidden bg-[#0a0a0a] border border-gray-800 group flex-shrink-0 shadow-lg flex items-center justify-center">
            {/* Grid background for technical feel */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
            
            {/* Overlay simulation */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10 pointer-events-none" />
            
            <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-lg shadow-sm">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                <span className="text-white text-[10px] font-black tracking-widest uppercase">Live</span>
              </div>
              <div className="bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg shadow-sm">
                <span className="text-white/90 text-[10px] font-mono font-bold tracking-widest">CH-001 | 1920×1080 | 30 FPS</span>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
               <div className="bg-black/50 backdrop-blur-md border border-[#52C5F3]/30 px-3 py-1.5 rounded-lg shadow-sm">
                  <span className="text-[#52C5F3] text-[10px] font-mono font-black tracking-widest">MODEL: TENSOR-V4-OPT</span>
               </div>
            </div>

            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
              <button className="p-2 bg-black/50 hover:bg-black/80 rounded-lg backdrop-blur-md text-white transition-colors border border-white/10 hover:border-white/30 shadow-sm">
                 <Video className="w-4 h-4" />
              </button>
              <button className="p-2 bg-black/50 hover:bg-black/80 rounded-lg backdrop-blur-md text-white transition-colors border border-white/10 hover:border-white/30 shadow-sm">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-gray-800 font-black tracking-widest text-4xl sm:text-5xl lg:text-6xl z-0 select-none opacity-20">STREAMING</p>
            
            {/* Draw sample bounding boxes just for aesthetic preview */}
            <div className="absolute top-[25%] left-[30%] w-48 h-36 border-[2px] border-[#52C5F3] bg-[#52C5F3]/10 rounded-sm z-10 group-hover:border-[#52C5F3] transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)]">
               <div className="absolute -top-[22px] -left-[2px] bg-[#52C5F3] text-black text-[10px] font-black px-2 py-0.5 rounded-sm flex items-center gap-2">
                  <span>CAR</span>
                  <span className="opacity-70 font-mono">0.89</span>
               </div>
               <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#52C5F3]"></div>
               <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#52C5F3]"></div>
            </div>
            
            <div className="absolute bottom-[30%] right-[30%] w-28 h-44 border-[2px] border-yellow-500 bg-yellow-500/10 rounded-sm z-10 group-hover:border-yellow-500 transition-colors shadow-[0_0_15px_rgba(234,179,8,0.3)]">
               <div className="absolute -top-[22px] -left-[2px] bg-yellow-500 text-black text-[10px] font-black px-2 py-0.5 rounded-sm flex items-center gap-2">
                  <span>MOTORBIKE</span>
                  <span className="opacity-70 font-mono">0.94</span>
               </div>
               <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-yellow-500"></div>
               <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-yellow-500"></div>
            </div>
          </div>

          {/* Detection Trend */}
          <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl shadow-sm flex-shrink-0 flex flex-col">
            <div className="px-6 py-5 flex flex-row items-center justify-between border-b border-gray-100 dark:border-[#222]">
              <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg border border-indigo-100 dark:border-indigo-500/20">
                    <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                 </div>
                 <h2 className="text-sm font-black tracking-tight text-gray-900 dark:text-white">Detection Trend Profile</h2>
              </div>
              <div className="flex items-center gap-4">
                 <div className="hidden sm:flex items-center gap-4 mr-2">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-[#52C5F3]"></div>
                       <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Car</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                       <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Motorbike</span>
                    </div>
                 </div>
                 <div className="relative">
                   <select 
                     className="appearance-none bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:border-[#52C5F3] hover:border-gray-300 dark:hover:border-gray-500 transition-colors cursor-pointer"
                     value={timeframe}
                     onChange={(e) => setTimeframe(e.target.value)}
                   >
                     <option>Last 24 hours</option>
                     <option>Last 7 days</option>
                     <option>Last 30 days</option>
                   </select>
                   <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                 </div>
              </div>
            </div>
            <div className="p-6 pt-6 pb-4 h-[280px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#52C5F3" stopOpacity={isDark ? 0.4 : 0.2}/>
                      <stop offset="95%" stopColor="#52C5F3" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMotorbike" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={isDark ? 0.4 : 0.2}/>
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#e5e7eb'} strokeOpacity={0.5} vertical={false} />
                  <XAxis dataKey="time" stroke="#888" tick={{fill: '#888', fontSize: 11, fontWeight: 500}} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#888" tick={{fill: '#888', fontSize: 11, fontWeight: 500}} tickLine={false} axisLine={false} dx={-10} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: isDark ? '#444' : '#d1d5db', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area type="monotone" dataKey="car" name="Car" stroke="#52C5F3" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCar)" activeDot={{ r: 6, strokeWidth: 0, fill: '#52C5F3' }} />
                  <Area type="monotone" dataKey="motorbike" name="Motorbike" stroke="#eab308" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMotorbike)" activeDot={{ r: 6, strokeWidth: 0, fill: '#eab308' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detection History */}
          <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 flex flex-row items-center justify-between border-b border-gray-100 dark:border-[#222] bg-gray-50/50 dark:bg-transparent">
              <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg border border-emerald-100 dark:border-emerald-500/20">
                    <LayoutTemplate className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                 </div>
                 <h2 className="text-sm font-black tracking-tight text-gray-900 dark:text-white">Detection Log History</h2>
              </div>
              <button className="text-xs text-[#52C5F3] font-bold tracking-wide hover:text-[#52C5F3]/80 transition-colors">
                View All Records
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/80 dark:bg-[#1a1a1a] border-b border-gray-100 dark:border-[#222]">
                  <tr>
                    <th className="px-6 py-3.5 font-bold text-gray-500 uppercase tracking-widest text-[10px]">Date / Time</th>
                    <th className="px-6 py-3.5 font-bold text-gray-500 uppercase tracking-widest text-[10px]">Region of Interest</th>
                    <th className="px-6 py-3.5 font-bold text-gray-500 uppercase tracking-widest text-[10px]">Class Detected</th>
                    <th className="px-6 py-3.5 font-bold text-gray-500 uppercase tracking-widest text-[10px] text-right">Confidence Score</th>
                    <th className="px-6 py-3.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[#252525]">
                  {historyData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-[#252525]/40 transition-colors group">
                      <td className="px-6 py-3.5 font-mono text-gray-900 dark:text-gray-300 font-medium text-xs">{row.dateTime}</td>
                      <td className="px-6 py-3.5 text-gray-600 dark:text-gray-400 text-xs font-medium">{row.roi}</td>
                      <td className="px-6 py-3.5">
                        <span className={cn(
                          "px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border",
                          row.class === 'car' ? "bg-[#52C5F3]/10 text-[#52C5F3] border-[#52C5F3]/20" : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20"
                        )}>
                          {row.class}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right font-mono text-gray-600 dark:text-gray-400 font-medium text-xs">
                         <div className="flex items-center justify-end gap-2">
                           <div className="w-16 h-1.5 bg-gray-100 dark:bg-[#2a2a2a] rounded-full overflow-hidden">
                              <div className={cn("h-full rounded-full", row.class === 'car' ? "bg-[#52C5F3]" : "bg-yellow-500")} style={{ width: `${row.confidence * 100}%` }}></div>
                           </div>
                           <span>{(row.confidence * 100).toFixed(0)}%</span>
                         </div>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <button 
                          className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-xs font-bold uppercase"
                          onClick={() => navigate('/orchestration/detection-evidence')}
                        >
                          Details →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Recent Detections feed */}
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 flex flex-col bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] rounded-xl shadow-sm overflow-hidden h-[calc(100vh-22rem)] min-h-[600px] sticky top-0">
          <div className="p-5 border-b border-gray-100 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a] flex items-center gap-3">
             <div className="relative">
                <div className="absolute -inset-1 bg-red-500 rounded-full blur opacity-40 animate-pulse"></div>
                <div className="relative p-1.5 bg-red-500/20 rounded-lg border border-red-500/30">
                   <Clock className="w-4 h-4 text-red-500" />
                </div>
             </div>
             <div>
                <h3 className="text-sm font-black tracking-tight text-gray-900 dark:text-white leading-tight">Live Activity Feed</h3>
                <p className="text-[10px] font-bold text-gray-500 tracking-wide uppercase mt-0.5">Real-time object detection</p>
             </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 custom-scrollbar">
            {historyData.slice(0, 8).map((item, i) => (
              <div key={item.id} className="group cursor-pointer relative" onClick={() => navigate('/orchestration/detection-evidence')}>
                {/* Timeline connector */}
                {i !== historyData.slice(0, 8).length - 1 && (
                   <div className="absolute left-[3px] top-6 bottom-[-20px] w-px bg-gray-200 dark:bg-[#333] z-0"></div>
                )}
                
                <div className="flex gap-4 relative z-10">
                   <div className="w-2 h-2 rounded-full mt-2 shrink-0 shadow-[0_0_0_4px_var(--bg-color)]" 
                        style={{ 
                           backgroundColor: item.class === 'car' ? '#52C5F3' : '#eab308',
                           '--bg-color': isDark ? '#1e1e1e' : '#ffffff' 
                        } as any} 
                   />
                   
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border",
                          item.class === 'car' ? "bg-[#52C5F3]/10 text-[#52C5F3] border-[#52C5F3]/20" : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20"
                        )}>
                          {item.class}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500 font-bold bg-gray-50 dark:bg-[#252525] px-2 py-0.5 rounded">
                          {item.dateTime.split(' ')[2]}
                        </span>
                      </div>
                      
                      <div className="aspect-video bg-gray-100 dark:bg-[#161616] border border-gray-200 dark:border-[#2a2a2a] rounded-lg relative overflow-hidden group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-colors flex items-center justify-center shadow-sm">
                        <Video className="w-8 h-8 text-gray-300 dark:text-[#333] group-hover:text-gray-400 transition-colors" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                          <PlaySquare className="w-8 h-8 text-white/90 drop-shadow-md" />
                        </div>
                        {/* Mock bounding box for thumbnail */}
                        <div className={cn(
                           "absolute w-8 h-8 border-[1.5px] rounded-sm opacity-50",
                           item.class === 'car' ? "border-[#52C5F3] bg-[#52C5F3]/10" : "border-yellow-500 bg-yellow-500/10"
                        )}></div>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-gray-600 dark:text-gray-400">
                         <MapPin className="w-3 h-3" />
                         <span className="truncate">{item.roi}</span>
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      </div>
    </main>
  );
};

