import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, LayoutGrid, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { Card, Button } from '../components/ui';

const initialRoleModules = [
  { 
    id: 'RM-001', 
    role: 'SysAdmin', 
    modules: ['Dashboard', 'System Monitoring', 'Workstation Management', 'Camera Management', 'Role Management'] 
  },
  { 
    id: 'RM-002', 
    role: 'Admin', 
    modules: ['Dashboard', 'Camera Management', 'Data Collection', 'Data Set', 'Applications'] 
  },
  { 
    id: 'RM-003', 
    role: 'User', 
    modules: ['Dashboard', 'Applications', 'Notifications'] 
  },
  { 
    id: 'RM-004', 
    role: 'Operator', 
    modules: ['Dashboard', 'System Monitoring'] 
  },
];

const allModules = [
  'Dashboard', 'Notifications', 'System Monitoring', 'Workstation Management', 
  'Camera Management', 'Data Collection', 'Data Set', 'Image Annotation', 
  'Model Training', 'Applications', 'Role Management'
];

export const RoleModules = () => {
  const [roleModules, setRoleModules] = useState(initialRoleModules);
  const [activeRole, setActiveRole] = useState(roleModules[0].role);

  const activeRoleData = roleModules.find(rm => rm.role === activeRole);

  const toggleModule = (moduleName: string) => {
    setRoleModules(prev => prev.map(rm => {
      if (rm.role === activeRole) {
        const hasModule = rm.modules.includes(moduleName);
        return {
          ...rm,
          modules: hasModule ? rm.modules.filter(m => m !== moduleName) : [...rm.modules, moduleName]
        };
      }
      return rm;
    }));
  };

  const handleSave = () => {
    toast.success(`Permissions saved for ${activeRole}!`);
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent text-gray-900 dark:text-gray-200 transition-colors p-6 md:p-8 custom-scrollbar relative">
      <div className="max-w-[1600px] mx-auto h-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-4 shrink-0">
          <div>
            <h1 className="text-sm font-black text-gray-900 dark:text-white mb-2 tracking-tight">Role Modules Mapping</h1>
            <p className="text-[10px] text-gray-500 font-black leading-none capitalize tracking-widest">User Management • Modifiers</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0 relative">
           {/* Sidebar array of Roles */}
           <div className="w-full lg:w-64 shrink-0 flex flex-col bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] shadow-sm rounded-[11px] overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]/50">
                <h3 className="text-[10px] font-bold text-gray-900 dark:text-white">Select Role</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                 {roleModules.map((rm) => (
                    <button 
                      key={rm.id}
                      onClick={() => setActiveRole(rm.role)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors mb-1",
                        activeRole === rm.role 
                          ? "bg-accent/10 border border-accent/20 text-accent font-bold" 
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 font-medium border border-transparent"
                      )}
                    >
                       <span className="text-xs tracking-wide">{rm.role}</span>
                       <span className="text-[9px] bg-gray-200 dark:bg-black/40 px-1.5 py-0.5 rounded text-gray-700 dark:text-gray-300 font-mono">
                         {rm.modules.length} mods
                       </span>
                    </button>
                 ))}
              </div>
           </div>

           {/* Modules Checklist */}
           <Card className="flex-1 p-0 flex flex-col overflow-hidden">
               <div className="p-4 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]/50 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                     <LayoutGrid size={14} className="text-gray-500" />
                     <h2 className="text-[12px] font-bold tracking-wide">Access For: <span className="text-accent">{activeRole}</span></h2>
                  </div>
                  <Button variant="primary" onClick={handleSave} className="h-8">
                    Save Changes
                  </Button>
               </div>

               <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                     {allModules.map(moduleName => {
                        const hasAccess = activeRoleData?.modules.includes(moduleName);
                        return (
                          <div 
                            key={moduleName}
                            onClick={() => toggleModule(moduleName)}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer group",
                              hasAccess 
                                ? "bg-accent/5 border-accent/20 hover:bg-accent/10" 
                                : "bg-gray-50/50 dark:bg-[#151515] border-gray-200 dark:border-[#222] hover:border-gray-300 dark:hover:border-gray-600"
                            )}
                          >
                             {hasAccess ? (
                               <CheckCircle2 size={16} className="text-accent shrink-0" />
                             ) : (
                               <Circle size={16} className="text-gray-600 dark:text-gray-400 group-hover:text-gray-500 transition-colors shrink-0" />
                             )}
                             <div>
                               <div className={cn(
                                  "text-xs tracking-wide mb-0.5", 
                                  hasAccess ? "font-bold text-gray-900 dark:text-white" : "font-medium text-gray-600 dark:text-gray-400"
                               )}>
                                  {moduleName}
                               </div>
                               <div className="text-[9px] text-gray-500">
                                  {hasAccess ? "Access granted" : "Access denied"}
                               </div>
                             </div>
                          </div>
                        );
                     })}
                  </div>
               </div>
           </Card>
        </div>
      </div>
    </main>
  );
};
