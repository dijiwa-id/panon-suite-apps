import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Camera, Video, AlertTriangle } from 'lucide-react';

const cvBarData = [
  { name: 'Cam 1', detections: 400, latency: 45 },
  { name: 'Cam 2', detections: 700, latency: 52 },
  { name: 'Cam 3', detections: 500, latency: 48 },
  { name: 'Cam 4', detections: 900, latency: 60 },
];

const cvPieData = [
  { name: 'Active', value: 65 },
  { name: 'Standby', value: 25 },
  { name: 'Offline', value: 10 },
];

const DATA_COLOR = '#52C5F3'; // Panon Suite Primary
const SECONDARY_COLOR = '#EC3292'; // Panon Suite Secondary
const TERTIARY_COLOR = '#4a4a4a';

export const SystemAdminDashboard = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-[#161616] p-6 md:p-8 text-gray-200 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white mb-1">Dashboard Overview</h1>
          <p className="text-gray-400 text-xs font-medium">Quick stats and general system health.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Cameras', value: '1,240', icon: <Camera size={20} className="text-accent" /> },
          { label: 'Total Inferences', value: '45.2M', icon: <Video size={20} className="text-purple-400" /> },
          { label: 'Avg Latency', value: '45ms', icon: <Activity size={20} className="text-green-400" /> },
          { label: 'System Alerts', value: '3', icon: <AlertTriangle size={20} className="text-secondary" /> },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#1e1e1e] p-4 rounded-xl border border-[#2a2a2a] shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-[#151515] border border-[#2a2a2a] flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Bar Chart */}
        <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} className="text-gray-500" />
            <h2 className="text-sm font-bold text-white">Inference Detections vs Latency</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cvBarData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis dataKey="name" stroke="#4a4a4a" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#4a4a4a" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#ffffff05' }} contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#2a2a2a', color: '#fff', fontSize: '12px', borderRadius: '12px', padding: '8px' }} />
                <Bar dataKey="detections" fill={DATA_COLOR} radius={[2, 2, 0, 0]} barSize={12} />
                <Bar dataKey="latency" fill={SECONDARY_COLOR} radius={[2, 2, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-[#2a2a2a] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
             <Camera size={16} className="text-gray-500" />
             <h2 className="text-sm font-bold text-white">Camera Global Status</h2>
          </div>
          <div className="h-64 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={cvPieData} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                  <Cell fill={DATA_COLOR} />
                  <Cell fill={SECONDARY_COLOR} />
                  <Cell fill={TERTIARY_COLOR} />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#2a2a2a', color: '#fff', fontSize: '12px', borderRadius: '12px', padding: '8px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#2a2a2a] bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-white">Recent Alerts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151515]/80 border-b border-[#2a2a2a] text-gray-500 font-semibold text-xs">
              <tr>
                <th className="px-5 py-4 whitespace-nowrap">Time</th>
                <th className="px-5 py-4 whitespace-nowrap">Source</th>
                <th className="px-5 py-4 whitespace-nowrap">Severity</th>
                <th className="px-5 py-4 whitespace-nowrap">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {[1, 2, 3, 4].map((row) => (
                <tr key={row} className="hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-4 font-mono text-gray-400 text-xs">10:4{row}:00 AM</td>
                  <td className="px-5 py-4 font-semibold text-white">Camera 0{row}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded bg-secondary/10 border border-secondary/20 text-secondary font-bold text-[10px] uppercase tracking-wider">Warning</span>
                  </td>
                  <td className="px-5 py-4 text-gray-400">High latency detected randomly on stream.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
