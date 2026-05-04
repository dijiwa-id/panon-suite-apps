import React, { useState } from 'react';
import { Search, Plus, Settings, Filter, MoreVertical, X, Edit2, Trash2, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { Card, Button, Input, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui';

const initialRoles = [
  { id: '1', name: 'SysAdmin', users: 2, status: 'Active', description: 'System Administrator with full access' },
  { id: '2', name: 'Admin', users: 5, status: 'Active', description: 'General administrative role' },
  { id: '3', name: 'User', users: 124, status: 'Active', description: 'Standard user with base permissions' },
  { id: '4', name: 'Operator', users: 45, status: 'Inactive', description: 'Operator for specific modules' },
];

const RoleModal = ({ isOpen, onClose, role, onSave }: { isOpen: boolean; onClose: () => void; role: any; onSave: (r: any) => void }) => {
  const [formData, setFormData] = useState(role || { name: '', description: '', status: 'Active', users: 0 });

  React.useEffect(() => {
    setFormData(role || { name: '', description: '', status: 'Active', users: 0 });
  }, [role, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-[#222] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-black text-gray-900 dark:text-white">{role ? 'Edit Role' : 'New Role'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="p-6 space-y-5">
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Role Name</label>
            <Input 
              type="text" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Moderator" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Description</label>
            <textarea 
              rows={3}
              required
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Brief description of this role's permissions..." 
              className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-800 dark:text-gray-200 outline-none focus-visible:ring-1 focus-visible:ring-accent/50 transition-all placeholder:text-gray-700 resize-none" 
            />
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
          
          <div className="pt-4 flex gap-3">
             <Button variant="ghost" type="button" onClick={onClose} className="flex-1 w-full justify-center">
                Cancel
             </Button>
             <Button variant="primary" type="submit" className="flex-1 w-full justify-center">
                {role ? 'Save Changes' : 'Create Role'}
             </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const Roles = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any>(null);

  const handleSaveRole = (roleData: any) => {
    if (editingRole) {
      setRoles(roles.map(r => r.id === roleData.id ? roleData : r));
    } else {
      setRoles([...roles, { ...roleData, id: `${roles.length + 1}`, users: 0 }]);
    }
    setIsModalOpen(false);
    setEditingRole(null);
  };

  const handleDeleteRole = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if(confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(r => r.id !== id));
    }
  };

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
            <Button variant="outline" className="gap-1.5 h-8">
              <Filter size={12} /> Filter
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(true)} className="gap-1.5 h-8">
              <Plus size={12} /> New Role
            </Button>
          </div>
        </div>

        <Card className="p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-[#222] flex justify-between items-center bg-gray-50/50 dark:bg-[#1a1a1a]/50 rounded-t-xl">
             <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                <Input 
                  type="text" 
                  placeholder="Search roles..." 
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
                  <TableHead className="pl-5">Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-5 text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role.id} className="group cursor-pointer">
                    <TableCell className="pl-5">
                      <div className="font-bold text-xs text-gray-900 dark:text-white mb-0.5">{role.name}</div>
                      <div className="text-[9px] text-gray-500 font-mono">ID: {role.id}</div>
                    </TableCell>
                    <TableCell className="text-[12px] text-gray-600 dark:text-[#888] font-medium max-w-md truncate">
                      {role.description}
                    </TableCell>
                    <TableCell>
                      <div className="inline-flex items-center justify-center min-w-[24px] h-[20px] rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[9px] font-bold text-gray-700 dark:text-gray-300">
                        {role.users}
                      </div>
                    </TableCell>
                    <TableCell>
                      {role.status === 'Active' ? <Badge variant="success">Active</Badge> : <Badge variant="default">Inactive</Badge>}
                    </TableCell>
                    <TableCell className="pr-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="outline" onClick={(e) => { e.stopPropagation(); setEditingRole(role); setIsModalOpen(true); }} className="px-2.5">
                                <Edit2 size={12} />
                            </Button>
                            <Button variant="danger" onClick={(e) => handleDeleteRole(role.id, e)} className="px-2.5">
                                <Trash2 size={12} />
                            </Button>
                        </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
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
        </Card>
      </div>
      <RoleModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingRole(null); }} role={editingRole} onSave={handleSaveRole} />
    </main>
  );
};

