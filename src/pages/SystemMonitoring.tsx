import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';
import { HardDrive, Cpu, Zap, Activity, Monitor } from 'lucide-react';

const hardwareData = [
  { name: 'Memory Usage', data: [{ time: '04-13', value: 25 }, { time: '04-14', value: 28 }, { time: '04-15', value: 22 }, { time: '04-16', value: 26 }, { time: '04-17', value: 27 }, { time: '04-18', value: 25 }, { time: '04-19', value: 28 }, { time: '04-20', value: 25 }, { time: '04-21', value: 27 }] },
  { name: 'Disk Usage', data: [{ time: '04-13', value: 20 }, { time: '04-14', value: 22 }, { time: '04-15', value: 18 }, { time: '04-16', value: 25 }, { time: '04-17', value: 24 }, { time: '04-18', value: 22 }, { time: '04-19', value: 26 }, { time: '04-20', value: 23 }, { time: '04-21', value: 25 }] },
];

const ProgressBar = ({ label, value, max, colorClass }: { label: string, value: number, max: number, colorClass: string }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs text-gray-400">
      <span>{label}</span>
      <span>{value}% ({value * max / 100} / {max})</span>
    </div>
    <div className="w-full h-2 bg-[#1e1e1e] rounded-full overflow-hidden">
      <div className={cn("h-full rounded-full", colorClass)} style={{ width: `${value}%` }} />
    </div>
  </div>
);

export const SystemMonitoring = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-[#f1f1f1] dark:bg-[#151515] p-6 md:p-8 text-gray-900 dark:text-white transition-colors">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black tracking-tight">System Monitoring</h1>
        <select className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-4 py-2 text-sm text-white">
          <option>Analytic Workstation</option>
        </select>
      </div>

      {/* Summary Card */}
      <div className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2a2a2a] mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-semibold">Analytic Workstation (uptime: 20 days 15:25:18)</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Online</span>
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 mb-8">
          <ProgressBar label="CPU Usage" value={31.67} max={100} colorClass="bg-blue-500" />
          <ProgressBar label="RAM Usage" value={85.67} max={100} colorClass="bg-orange-500" />
          <ProgressBar label="GPU Usage" value={75.48} max={100} colorClass="bg-orange-500" />
          <ProgressBar label="FPS Usage" value={0.27} max={100} colorClass="bg-blue-500" />
          <ProgressBar label="NPU Usage" value={14.98} max={100} colorClass="bg-blue-500" />
          <ProgressBar label="HD Space" value={17.17} max={100} colorClass="bg-blue-500" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
           <p>Processor: <span className="text-white">Intel Core Ultra 5 125U</span></p>
           <p>Graphics: <span className="text-white">Intel Graphics GPU</span></p>
           <p>NPU(s): <span className="text-white">Intel AI Boost</span></p>
           <p>Memory: <span className="text-white">32GB</span></p>
           <p>Storage: <span className="text-white">1TB SSD</span></p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {hardwareData.map((chart) => (
          <div key={chart.name} className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2a2a2a] shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-6">{chart.name}</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chart.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="time" stroke="#4a4a4a" fontSize={10} />
                  <YAxis stroke="#4a4a4a" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }} />
                  <Area type="monotone" dataKey="value" stroke="#52C5F3" fill="#52C5F3" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* Tables */}
      <div className="grid grid-cols-2 gap-6">
        {['Channel Information', 'Service Status'].map(table => (
          <div key={table} className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] overflow-hidden">
             <h3 className="p-4 text-xs font-semibold uppercase tracking-wide text-gray-400 border-b border-[#2a2a2a]">{table}</h3>
             <table className="w-full text-left text-xs text-white">
               <tbody>
                  {['IP Address', 'Processor', 'Memory', 'Storage', 'Type'].map(row => (
                    <tr key={row} className="border-b border-[#2a2a2a] last:border-0 hover:bg-white/[0.02]">
                       <td className="p-4 text-gray-400">{row}</td>
                       <td className="p-4">row content</td>
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
