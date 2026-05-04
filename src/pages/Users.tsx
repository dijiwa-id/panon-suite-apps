import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Settings, Mail, ShieldAlert, X, Edit2, Trash2, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { Card, Button, Input, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui';

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
            <Input 
              type="text" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. John Doe" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Email Address</label>
            <Input 
              type="email" 
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              placeholder="e.g. john@panon.com" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Role</label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg pl-4 pr-9 h-[37px] text-[12px] font-bold text-gray-700 dark:text-gray-300 outline-none focus-visible:ring-1 focus-visible:ring-accent/50 transition-all appearance-none cursor-pointer">
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
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg pl-4 pr-9 h-[37px] text-[12px] font-bold text-gray-700 dark:text-gray-300 outline-none focus-visible:ring-1 focus-visible:ring-accent/50 transition-all appearance-none cursor-pointer">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <div className="pt-4 flex gap-3">
             <Button variant="ghost" type="button" onClick={onClose} className="flex-1 w-full justify-center">
                Cancel
             </Button>
             <Button variant="primary" type="submit" className="flex-1 w-full justify-center">
                {user ? 'Save Changes' : 'Create User'}
             </Button>
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
            <Button variant="outline" className="gap-1.5 h-8">
              <Filter size={12} /> Filter
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(true)} className="gap-1.5 h-8">
              <Plus size={12} /> New User
            </Button>
          </div>
        </div>

        <Card className="p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-[#222] flex justify-between items-center bg-gray-50/50 dark:bg-[#1a1a1a]/50 rounded-t-xl">
             <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                <Input 
                  type="text" 
                  placeholder="Search users..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8" 
                />
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5">User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="pr-5 text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="group cursor-pointer">
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
                           <span className="text-accent text-[11px] font-black">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-bold text-xs text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-[9px] text-gray-500 font-mono flex items-center gap-1 mt-0.5"><Mail size={8} /> {user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[12px] font-bold text-gray-700 dark:text-gray-300">
                        {user.role === 'SysAdmin' && <ShieldAlert size={10} className="text-accent" />}
                        {user.role}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className={cn("w-1.5 h-1.5 rounded-full", user.status === 'Active' ? "bg-accent" : "bg-gray-400 dark:bg-gray-600")}></div>
                        <span className="text-[12px] font-medium text-gray-700 dark:text-gray-300">{user.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[10px] text-gray-500 dark:text-[#888] font-medium capitalize tracking-widest font-black">
                        {user.lastLogin}
                    </TableCell>
                    <TableCell className="pr-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="outline" onClick={(e) => { e.stopPropagation(); setEditingUser(user); setIsModalOpen(true); }} className="px-2.5">
                                <Edit2 size={12} />
                            </Button>
                            <Button variant="danger" onClick={(e) => handleDeleteUser(user.id, e)} className="px-2.5">
                                <Trash2 size={12} />
                            </Button>
                        </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
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
        </Card>
      </div>
      <UserModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingUser(null); }} user={editingUser} onSave={handleSaveUser} />
    </main>
  );
};
