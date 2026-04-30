import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Settings, Mail, ShieldAlert, X, Edit2, Trash2, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const initialUsers = [
  { id: 'USR-001', name: 'M Iqbal', email: 'iqbal@panon.com', role: 'SysAdmin', status: 'Active', lastLogin: '2 mins ago' },
  { id: 'USR-002', name: 'John Doe', email: 'john@panon.com', role: 'Admin', status: 'Active', lastLogin: '1 hour ago' },
  { id: 'USR-003', name: 'Jane Smith', email: 'jane@panon.com', role: 'User', status: 'Inactive', lastLogin: '2 days ago' },
  { id: 'USR-004', name: 'Alex Wong', email: 'alex@panon.com', role: 'Operator', status: 'Active', lastLogin: '12 mins ago' },
  { id: 'USR-005', name: 'Sarah Lee', email: 'sarah@panon.com', role: 'User', status: 'Active', lastLogin: '5 mins ago' },
];

const UserModal = ({ isOpen, onClose, user, onSave }: { isOpen: boolean; onClose: () => void; user: any; onSave: (u: any) => void }) => {
  const [formData, setFormData] = useState(user || { name: '', email: '', role: 'User', status: 'Active' });

  React.useEffect(() => {
    setFormData(user || { name: '', email: '', role: 'User', status: 'Active' });
  }, [user, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-[#222] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-black text-gray-900 dark:text-white">{user ? 'Edit User' : 'New User'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-5">
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Full Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. John Doe" 
              className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-700" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              placeholder="e.g. john@panon.com" 
              className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-gray-700" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Role</label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] font-bold text-gray-700 dark:text-gray-300 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all appearance-none cursor-pointer">
                  <option>SysAdmin</option>
                  <option>Admin</option>
                  <option>User</option>
                  <option>Operator</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Status</label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] font-bold text-gray-700 dark:text-gray-300 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all appearance-none cursor-pointer">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <div className="pt-4 flex gap-3">
             <button type="button" onClick={onClose} className="flex-1 bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] h-[37px] text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold transition-colors hover:bg-gray-200 dark:hover:bg-[#2a2a2a]">
                Cancel
             </button>
             <button type="submit" className="flex-1 bg-accent hover:bg-accent/90 text-black h-[37px] rounded-xl text-xs font-bold transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)]">
                {user ? 'Save Changes' : 'Create User'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const handleSaveUser = (userData: any) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === userData.id ? userData : u));
    } else {
      setUsers([...users, { ...userData, id: `USR-${Math.floor(Math.random()*1000).toString().padStart(3, '0')}`, lastLogin: 'Never' }]);
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if(confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-y-auto bg-transparent text-gray-900 dark:text-gray-200 transition-colors p-6 md:p-8 custom-scrollbar relative">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-4">
          <div>
            <h1 className="text-sm font-black text-gray-900 dark:text-white mb-2 tracking-tight">System Users</h1>
            <p className="text-[10px] text-gray-500 font-black leading-none capitalize tracking-widest">User Management • {users.length} Users</p>
          </div>
          <div className="flex gap-2.5">
            <button className="bg-transparent border border-gray-300 dark:border-[#222] h-8 text-gray-700 dark:text-gray-300 rounded-full text-xs font-bold px-4 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors leading-[12px] flex items-center gap-1.5">
              <Filter size={12} /> Filter
            </button>
            <button onClick={() => setIsModalOpen(true)} className="bg-[#1c1c1c] border border-gray-700 h-8 text-white rounded-full text-xs font-bold tracking-wide px-6 leading-[12px] hover:bg-[#2a2a2a] transition-colors flex items-center gap-1.5">
              <Plus size={12} /> New User
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] shadow-sm flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-[#222] flex justify-between items-center bg-gray-50/50 dark:bg-[#1a1a1a]/50 rounded-t-xl">
             <div className="bg-gray-100 dark:bg-[#151515] px-4 py-2 rounded-xl border border-gray-200 dark:border-[#222] flex items-center gap-2 focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all w-full max-w-sm">
                <Search className="text-gray-600 dark:text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search users..." 
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
                  {['User', 'Role', 'Status', 'Last Login', ''].map((header, i) => (
                    <th key={header} className={cn(
                      "py-3 text-[10px] font-black tracking-widest capitalize text-gray-500 whitespace-nowrap",
                      i === 0 ? "pl-5" : "px-3",
                      i === 4 ? "pr-5 w-auto text-right" : ""
                    )}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-gray-50/50 dark:hover:bg-[#252525]/50 transition-colors cursor-pointer">
                    <td className="py-3.5 pl-5 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
                           <span className="text-accent text-[11px] font-black">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-bold text-xs text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-[9px] text-gray-500 font-mono flex items-center gap-1 mt-0.5"><Mail size={8} /> {user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[12px] font-bold text-gray-700 dark:text-gray-300">
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
                    <td className="py-3.5 px-3 text-[10px] text-gray-500 dark:text-[#888] font-medium capitalize tracking-widest font-black">
                        {user.lastLogin}
                    </td>
                    <td className="py-3.5 pr-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={(e) => { e.stopPropagation(); setEditingUser(user); setIsModalOpen(true); }} className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors bg-white dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded shadow-sm">
                                <Edit2 size={12} />
                            </button>
                            <button onClick={(e) => handleDeleteUser(user.id, e)} className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors bg-white dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded shadow-sm">
                                <Trash2 size={12} />
                            </button>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredUsers.length === 0 && (
              <div className="py-12 text-center flex flex-col items-center">
                 <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-[#252525] flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 mb-3">
                   <Search size={16} />
                 </div>
                 <p className="text-[11px] font-bold text-gray-900 dark:text-white mb-1">No users found</p>
                 <p className="text-[10px] text-gray-500 capitalize tracking-widest font-black">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <UserModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingUser(null); }} user={editingUser} onSave={handleSaveUser} />
    </main>
  );
};
