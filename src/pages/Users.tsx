import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Settings, Mail, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';

const users = [
  { id: 'USR-001', name: 'M Iqbal', email: 'iqbal@panon.com', role: 'SysAdmin', status: 'Active', lastLogin: '2 mins ago' },
  { id: 'USR-002', name: 'John Doe', email: 'john@panon.com', role: 'Admin', status: 'Active', lastLogin: '1 hour ago' },
  { id: 'USR-003', name: 'Jane Smith', email: 'jane@panon.com', role: 'User', status: 'Inactive', lastLogin: '2 days ago' },
  { id: 'USR-004', name: 'Alex Wong', email: 'alex@panon.com', role: 'Operator', status: 'Active', lastLogin: '12 mins ago' },
  { id: 'USR-005', name: 'Sarah Lee', email: 'sarah@panon.com', role: 'User', status: 'Active', lastLogin: '5 mins ago' },
];

export const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-y-auto bg-[#161616] text-gray-900 dark:text-gray-200 transition-colors p-6 md:p-8 custom-scrollbar relative">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <h1 className="text-xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">System Users</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">User Management • {users.length} Users</p>
          </div>
          <div className="flex gap-2.5">
            <button className="bg-transparent border border-gray-300 dark:border-[#2a2a2a] h-[29px] text-gray-700 dark:text-gray-300 rounded-full text-[10px] font-bold uppercase tracking-wide px-4 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors leading-[12px] flex items-center gap-1.5">
              <Filter size={12} /> Filter
            </button>
            <button className="bg-[#1c1c1c] border border-gray-700 h-[29px] text-white rounded-full text-[10px] font-bold uppercase tracking-wide px-5 hover:bg-[#2a2a2a] transition-colors leading-[12px] flex items-center gap-1.5">
              <Plus size={12} /> New User
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-200 dark:border-[#1f232d] shadow-sm flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-[#1f232d] flex justify-between items-center bg-gray-50/50 dark:bg-[#1a1a1a]/50 rounded-t-xl">
             <div className="relative group w-full max-w-sm h-[29px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={12} />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white dark:bg-[#151515] border border-gray-300 dark:border-[#2a2a2a] rounded-full h-full w-full pl-8 pr-4 text-[10px] font-medium text-gray-900 dark:text-white focus:outline-none focus:border-accent/50 transition-colors uppercase tracking-wide" 
                />
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-[#1f232d]">
                  {['User', 'Role', 'Status', 'Last Login', ''].map((header, i) => (
                    <th key={header} className={cn(
                      "py-3 text-[10px] uppercase font-black tracking-widest text-gray-500 whitespace-nowrap",
                      i === 0 ? "pl-5" : "px-3",
                      i === 4 ? "pr-5 w-10 text-right" : ""
                    )}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#1f232d]/60">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-gray-50/50 dark:hover:bg-[#252525]/30 transition-colors cursor-pointer">
                    <td className="py-3.5 pl-5 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
                           <span className="text-accent text-[11px] font-black">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-bold text-[11px] text-gray-900 dark:text-white tracking-wide">{user.name}</div>
                          <div className="text-[9px] text-gray-500 font-mono flex items-center gap-1 mt-0.5"><Mail size={8} /> {user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[9px] font-bold text-gray-700 dark:text-gray-300">
                        {user.role === 'SysAdmin' && <ShieldAlert size={10} className="text-accent" />}
                        {user.role}
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className={cn("w-1.5 h-1.5 rounded-full", user.status === 'Active' ? "bg-accent" : "bg-gray-400 dark:bg-gray-600")}></div>
                        <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">{user.status}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-[10px] text-gray-500 dark:text-[#888] font-medium">
                        {user.lastLogin}
                    </td>
                    <td className="py-3.5 pr-5 text-right">
                        <button className="p-1.5 text-gray-400 hover:text-accent transition-colors bg-white dark:bg-[#151515] border border-gray-200 dark:border-[#2a2a2a] rounded shadow-sm opacity-0 group-hover:opacity-100">
                            <Settings size={12} />
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredUsers.length === 0 && (
              <div className="py-12 text-center flex flex-col items-center">
                 <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-[#252525] flex flex-col items-center justify-center text-gray-400 mb-3">
                   <Search size={16} />
                 </div>
                 <p className="text-[11px] font-bold text-gray-900 dark:text-white mb-1">No users found</p>
                 <p className="text-[10px] text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
