import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
const SECONDARY_COLOR = '#f59e0b';
const TERTIARY_COLOR = '#9ca3af';

export const SystemAdminDashboard = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-[#f1f1f1] dark:bg-[#151515] p-6 md:p-8 text-gray-900 dark:text-white transition-colors">
      <h1 className="text-2xl font-black mb-8 tracking-tight">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl border border-gray-100 dark:border-[#2a2a2a] shadow-sm transition-all duration-300 hover:border-accent/20 dark:hover:border-accent/20 hover:shadow-md">
          <h2 className="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 mb-6 uppercase">Inference Detections</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cvBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} className="dark:stroke-[#2a2e39]" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', color: '#fff', fontSize: '12px', borderRadius: '8px', padding: '8px' }} />
                <Bar dataKey="detections" fill={DATA_COLOR} radius={[2, 2, 2, 2]} barSize={12} />
                <Bar dataKey="latency" fill={SECONDARY_COLOR} radius={[2, 2, 2, 2]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl border border-gray-100 dark:border-[#2a2a2a] shadow-sm transition-all duration-300 hover:border-accent/20 dark:hover:border-accent/20 hover:shadow-md">
          <h2 className="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 mb-6 uppercase">Camera Status</h2>
          <div className="h-64 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={cvPieData} innerRadius={60} outerRadius={80} paddingAngle={0} dataKey="value" stroke="none">
                  <Cell fill={DATA_COLOR} />
                  <Cell fill={SECONDARY_COLOR} />
                  <Cell fill={TERTIARY_COLOR} />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', color: '#fff', fontSize: '12px', borderRadius: '8px', padding: '8px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl border border-gray-200 dark:border-[#2a2a2a] overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
          <thead className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-[#2a2a2a]">
            <tr>
              <th className="px-6 py-4">Header 1</th>
              <th className="px-6 py-4">Header 2</th>
              <th className="px-6 py-4">Header 3</th>
              <th className="px-6 py-4">Header 4</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-[#2a2a2a]">
            {[1, 2, 3, 4].map((row) => (
              <tr key={row} className="hover:bg-gray-50/50 dark:hover:bg-[#252525]/30 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">row {row}, cell 1</td>
                <td className="px-6 py-4">row {row}, cell 2</td>
                <td className="px-6 py-4">row {row}, cell 3</td>
                <td className="px-6 py-4">row {row}, cell 4</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
