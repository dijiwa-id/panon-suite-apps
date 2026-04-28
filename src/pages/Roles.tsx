import React, { useState } from 'react';
import { Search, Plus, Settings } from 'lucide-react';

const roles = [
  { id: '1', name: 'SysAdmin', description: 'Role for SysAdmin' },
  { id: '2', name: 'Admin', description: 'Role for Admin' },
  { id: '3', name: 'User', description: 'Role for User' },
  { id: '4', name: 'Operator', description: 'Role for Operator' },
];

export const Roles = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-[#161616] p-6 md:p-8 text-gray-200 transition-colors">
      <h1 className="text-xl font-black tracking-tight text-white mb-8">User Management &gt; Roles</h1>
      
      <div className="flex justify-between items-center mb-8">
        <div className="bg-[#1e1e1e] p-4 rounded-xl border border-[#2a2a2a] shadow-sm flex items-center gap-2 w-full max-w-sm">
          <Search className="text-gray-400" size={20} />
          <input type="text" placeholder="Search by Name..." className="bg-transparent flex-1 outline-none text-sm text-gray-200" />
        </div>
        <button className="flex items-center gap-2 bg-[#1c1c1c] border border-gray-700 h-[29px] text-white rounded-full text-xs font-bold uppercase tracking-wide px-6 hover:bg-[#2a2a2a] transition-colors leading-[12px]">
          <Plus size={16} /> New
        </button>
      </div>

      <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#151515] border-b border-[#2a2a2a] text-gray-500 uppercase tracking-widest font-black">
            <tr>
              {['Name', 'Description', 'Setting'].map(header => (
                <th key={header} className="px-6 py-4">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2a2a]">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-bold text-white">{role.name}</td>
                <td className="px-6 py-4 text-gray-400">{role.description}</td>
                <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-accent transition-colors">
                        <Settings size={16} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
