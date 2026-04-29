import React, { useState } from 'react';
import { Search, Plus, Settings, Filter, MoreVertical } from 'lucide-react';
import { cn } from '../lib/utils';

const roles = [
  { id: '1', name: 'SysAdmin', users: 2, status: 'Active', description: 'System Administrator with full access' },
  { id: '2', name: 'Admin', users: 5, status: 'Active', description: 'General administrative role' },
  { id: '3', name: 'User', users: 124, status: 'Active', description: 'Standard user with base permissions' },
  { id: '4', name: 'Operator', users: 45, status: 'Inactive', description: 'Operator for specific modules' },
];

export const Roles = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-y-auto bg-transparent text-gray-900 dark:text-gray-200 transition-colors p-6 md:p-8 custom-scrollbar relative">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-4">
          <div>
            <h1 className="text-sm font-black text-gray-900 dark:text-white mb-2 tracking-tight">System Roles</h1>
            <p className="text-[10px] text-gray-500 font-black leading-none capitalize tracking-widest">User Management • {roles.length} Roles</p>
          </div>
          <div className="flex gap-2.5">
            <button className="bg-transparent border border-gray-300 dark:border-[#222] h-8 text-gray-700 dark:text-gray-300 rounded-full text-xs font-bold px-4 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors leading-[12px] flex items-center gap-1.5">
              <Filter size={12} /> Filter
            </button>
            <button className="bg-[#1c1c1c] border border-gray-700 h-8 text-white rounded-full text-xs font-bold tracking-wide px-6 leading-[12px] hover:bg-[#2a2a2a] transition-colors flex items-center gap-1.5">
              <Plus size={12} /> New Role
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] shadow-sm flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-[#222] flex justify-between items-center bg-gray-50/50 dark:bg-[#1a1a1a]/50 rounded-t-xl">
             <div className="bg-gray-100 dark:bg-[#151515] px-4 py-2 rounded-xl border border-gray-200 dark:border-[#222] flex items-center gap-2 focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all w-full max-w-sm">
                <Search className="text-gray-600 dark:text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search roles..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-xs font-medium text-gray-800 dark:text-gray-200 w-full placeholder-gray-600" 
                />
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-transparent">
                  {['Name', 'Description', 'Users', 'Status', ''].map((header, i) => (
                    <th key={header} className={cn(
                      "py-3 text-[10px] font-black tracking-widest capitalize text-gray-500 whitespace-nowrap",
                      i === 0 ? "pl-5" : "px-3",
                      i === 4 ? "pr-5 w-10 text-right" : ""
                    )}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
                {filteredRoles.map((role) => (
                  <tr key={role.id} className="group hover:bg-gray-50/50 dark:hover:bg-[#252525]/50 transition-colors cursor-pointer">
                    <td className="py-3.5 pl-5 pr-3">
                      <div className="font-bold text-xs text-gray-900 dark:text-white mb-0.5">{role.name}</div>
                      <div className="text-[9px] text-gray-500 font-mono">ID: {role.id}</div>
                    </td>
                    <td className="py-3.5 px-3 text-[12px] text-gray-600 dark:text-[#888] font-medium max-w-md truncate">
                      {role.description}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="inline-flex items-center justify-center min-w-[24px] h-[20px] rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[9px] font-bold text-gray-700 dark:text-gray-300">
                        {role.users}
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className={cn("w-1.5 h-1.5 rounded-full", role.status === 'Active' ? "bg-accent" : "bg-gray-400 dark:bg-gray-600")}></div>
                        <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">{role.status}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-5 text-right">
                        <button className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors bg-white dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded shadow-sm opacity-0 group-hover:opacity-100">
                            <Settings size={12} />
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredRoles.length === 0 && (
              <div className="py-12 text-center flex flex-col items-center">
                 <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-[#252525] flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 mb-3">
                   <Search size={16} />
                 </div>
                 <p className="text-[11px] font-bold text-gray-900 dark:text-white mb-1">No roles found</p>
                 <p className="text-[10px] text-gray-500 capitalize tracking-widest font-black">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

