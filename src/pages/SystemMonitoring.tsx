import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';
import { HardDrive, Cpu, Zap, Activity, Monitor, Network, ShieldCheck } from 'lucide-react';

const hardwareData = [
  { name: 'Memory Usage', color: '#52C5F3', data: [{ time: '04-13', value: 25 }, { time: '04-14', value: 28 }, { time: '04-15', value: 22 }, { time: '04-16', value: 26 }, { time: '04-17', value: 27 }, { time: '04-18', value: 25 }, { time: '04-19', value: 28 }, { time: '04-20', value: 25 }, { time: '04-21', value: 27 }] },
  { name: 'Disk Usage', color: '#EC3292', data: [{ time: '04-13', value: 20 }, { time: '04-14', value: 22 }, { time: '04-15', value: 18 }, { time: '04-16', value: 25 }, { time: '04-17', value: 24 }, { time: '04-18', value: 22 }, { time: '04-19', value: 26 }, { time: '04-20', value: 23 }, { time: '04-21', value: 25 }] },
];

const ProgressBar = ({ label, value, max, colorClass }: { label: string, value: number, max: number, colorClass: string }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-[11px] font-semibold text-gray-400">
      <span className="text-gray-300">{label}</span>
      <span>{value}% <span className="text-gray-500 font-medium">({(value * max / 100).toFixed(1)} / {max})</span></span>
    </div>
    <div className="w-full h-1.5 bg-[#151515] rounded-full overflow-hidden border border-[#2a2a2a]">
      <div className={cn("h-full rounded-full transition-all duration-500", colorClass)} style={{ width: `${value}%` }} />
    </div>
  </div>
);

export const SystemMonitoring = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-[#161616] p-6 md:p-8 text-gray-200 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white mb-1">System Monitoring</h1>
          <p className="text-gray-400 text-xs font-medium">Real-time performance and resource utilization.</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-[#151515] border border-[#2a2a2a] rounded-xl px-4 py-2 text-xs font-semibold text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer">
            <option>Analytic Workstation</option>
          </select>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] mb-4 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-[#2a2a2a] gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#151515] border border-[#2a2a2a] flex items-center justify-center">
              <Monitor className="text-accent" size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Analytic Workstation</h2>
              <p className="text-[11px] text-gray-500 font-medium">Uptime: 20 days 15:25:18</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-green-400">Online</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <ProgressBar label="CPU Usage" value={31.67} max={100} colorClass="bg-accent" />
          <ProgressBar label="RAM Usage" value={85.67} max={100} colorClass="bg-secondary" />
          <ProgressBar label="GPU Usage" value={75.48} max={100} colorClass="bg-secondary" />
          <ProgressBar label="FPS Usage" value={0.27} max={100} colorClass="bg-accent" />
          <ProgressBar label="NPU Usage" value={14.98} max={100} colorClass="bg-accent" />
          <ProgressBar label="HD Space" value={17.17} max={100} colorClass="bg-accent" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-[#2a2a2a]">
           <div>
             <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">Processor</div>
             <div className="text-xs font-semibold text-gray-300">Intel Core Ultra 5</div>
           </div>
           <div>
             <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">Graphics</div>
             <div className="text-xs font-semibold text-gray-300">Intel Graphics GPU</div>
           </div>
           <div>
             <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">NPU</div>
             <div className="text-xs font-semibold text-gray-300">Intel AI Boost</div>
           </div>
           <div>
             <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">Memory</div>
             <div className="text-xs font-semibold text-gray-300">32GB RAM</div>
           </div>
           <div>
             <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">Storage</div>
             <div className="text-xs font-semibold text-gray-300">1TB NVMe SSD</div>
           </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {hardwareData.map((chart) => (
          <div key={chart.name} className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] shadow-sm">
            <div className="flex items-center gap-2 mb-4">
               <Activity size={16} className="text-gray-500" />
               <h3 className="text-sm font-bold text-white">{chart.name}</h3>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chart.data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                  <XAxis dataKey="time" stroke="#4a4a4a" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4a4a4a" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#2a2a2a', borderRadius: '12px', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }} 
                  />
                  <Area type="monotone" dataKey="value" stroke={chart.color} strokeWidth={2} fill={`url(#colorUv-${chart.name})`} fillOpacity={1} />
                  <defs>
                    <linearGradient id={`colorUv-${chart.name}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chart.color} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={chart.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          { title: 'Channel Information', icon: <Network size={16} className="text-gray-500" />, items: [
            { label: 'IP Address', value: '192.168.1.105' },
            { label: 'Subnet Mask', value: '255.255.255.0' },
            { label: 'Gateway', value: '192.168.1.1' },
            { label: 'DNS Server', value: '8.8.8.8, 8.8.4.4' },
            { label: 'MAC Address', value: '00:1B:44:11:3A:B7' },
          ]},
          { title: 'Service Status', icon: <ShieldCheck size={16} className="text-gray-500" />, items: [
            { label: 'Analytic Engine', value: <span className="text-green-400 font-semibold text-xs">Running</span> },
            { label: 'Stream Server', value: <span className="text-green-400 font-semibold text-xs">Running</span> },
            { label: 'Database', value: <span className="text-green-400 font-semibold text-xs">Running</span> },
            { label: 'Cloud Sync', value: <span className="text-orange-400 font-semibold text-xs">Syncing</span> },
            { label: 'API Gateway', value: <span className="text-green-400 font-semibold text-xs">Running</span> },
          ]}
        ].map(table => (
          <div key={table.title} className="bg-[#1e1e1e] rounded-2xl border border-[#2a2a2a] overflow-hidden shadow-sm">
             <div className="p-5 border-b border-[#2a2a2a] bg-[#1a1a1a] flex items-center gap-2">
               {table.icon}
               <h3 className="text-sm font-bold text-white">{table.title}</h3>
             </div>
             <table className="w-full text-left text-xs">
               <tbody className="divide-y divide-[#2a2a2a]">
                  {table.items.map(row => (
                    <tr key={row.label} className="hover:bg-white/5 transition-colors group">
                       <td className="px-5 py-3 text-gray-500 font-semibold w-1/3">{row.label}</td>
                       <td className="px-5 py-3 text-gray-300 font-medium font-mono text-xs">{row.value}</td>
                    </tr>
                  ))}
               </tbody>
             </table>
          </div>
        ))}
      </div>
    </main>
  );
};
