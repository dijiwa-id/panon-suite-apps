import React, { useState } from 'react';
import { Search, Plus, Filter, Database, Play, Pause, MoreVertical, UploadCloud, Image as ImageIcon, X, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { Card, Button, Input, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui';

const datasets = [
  { id: '1', name: 'Traffic Intersection A', source: 'CAM-001', collected: 15420, annotated: 12000, status: 'Collecting', type: 'Continuous' },
  { id: '2', name: 'Retail Store Entrance', source: 'CAM-042', collected: 8500, annotated: 8500, status: 'Completed', type: 'Batch' },
  { id: '3', name: 'Warehouse Safety Gear', source: 'Upload', collected: 3200, annotated: 150, status: 'Annotating', type: 'Manual' },
  { id: '4', name: 'Parking Lot Night Vision', source: 'CAM-015', collected: 4500, annotated: 0, status: 'Paused', type: 'Scheduled' },
];

const NewTaskModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-[#222] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-black text-gray-900 dark:text-white">New Collection Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        
        <form onSubmit={(e) => { 
          e.preventDefault(); 
          toast.success('Collection task created successfully');
          onClose(); 
        }} className="p-6 space-y-5">
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Task Name</label>
            <Input 
              type="text" 
              required
              placeholder="e.g. Morning Traffic Flow" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Source Camera</label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
                <select className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg pl-4 pr-9 h-[37px] text-[12px] font-bold text-gray-700 dark:text-gray-300 outline-none focus-visible:ring-1 focus-visible:ring-accent/50 transition-all appearance-none cursor-pointer">
                  <option>Select camera...</option>
                  <option>CAM-001</option>
                  <option>CAM-042</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Collection Type</label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
                <select className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg pl-4 pr-9 h-[37px] text-[12px] font-bold text-gray-700 dark:text-gray-300 outline-none focus-visible:ring-1 focus-visible:ring-accent/50 transition-all appearance-none cursor-pointer">
                  <option>Continuous</option>
                  <option>Scheduled</option>
                  <option>Batch</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Target Volume (Images)</label>
            <Input 
              type="number" 
              placeholder="10000" 
            />
          </div>

          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-[#222] items-center">
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="h-8">
              Create Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UploadDatasetModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-[#222] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-black text-gray-900 dark:text-white">Upload Dataset</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Dataset Name</label>
            <Input 
              type="text" 
              placeholder="e.g. Training Set July" 
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Dataset Files (ZIP only)</label>
            <div className="border-2 border-dashed border-gray-200 dark:border-[#222] rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-accent group transition-all bg-gray-50 dark:bg-[#161616]/50 cursor-pointer">
              <div className="w-12 h-12 bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:border-accent transition-all mb-4">
                <UploadCloud className="text-gray-500 group-hover:text-accent" size={24} />
              </div>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1">Click or drag & drop</p>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">ZIP Format (Max 2GB)</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-[#222] flex gap-3 justify-between items-center bg-gray-50/50 dark:bg-[#1a1a1a]">
           <Button variant="ghost" type="button" onClick={onClose}>
             Cancel
           </Button>
           <Button variant="primary" onClick={() => { 
                toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
                  loading: 'Uploading dataset...',
                  success: 'Dataset uploaded successfully',
                  error: 'Upload failed',
                });
                onClose(); 
              }} 
             className="h-8"
           >
             Start Upload
           </Button>
        </div>
      </div>
    </div>
  );
};

export const DataCollection = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto bg-transparent text-gray-900 dark:text-gray-200 transition-colors p-6 md:p-8 custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Train &gt; Data Collection</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Manage datasets, collection tasks, and annotation progress.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setIsUploadModalOpen(true)} className="gap-2 h-8 rounded-full">
            <UploadCloud size={14} /> Upload Dataset
          </Button>
          <Button variant="primary" onClick={() => setIsTaskModalOpen(true)} className="gap-2 h-8 rounded-full">
            <Plus size={14} /> New Collection Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {[
          { label: 'Total Datasets', value: '24', icon: <Database className="text-blue-400" size={20} /> },
          { label: 'Images Collected', value: '1.2M', icon: <ImageIcon className="text-green-400" size={20} /> },
          { label: 'Active Tasks', value: '8', icon: <Play className="text-accent" size={20} /> },
          { label: 'Pending Annotation', value: '45.2K', icon: <Filter className="text-orange-400" size={20} /> },
        ].map((stat, idx) => (
          <Card key={idx} className="p-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black text-gray-500 mb-1 uppercase tracking-widest">{stat.label}</div>
              <div className="text-[18px] font-bold text-gray-900 dark:text-white tracking-tight">{stat.value}</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] flex items-center justify-center">
              {stat.icon}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden flex flex-col">
        <div className="p-5 border-b border-gray-200 dark:border-[#222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Active Datasets</h2>
          <div className="flex gap-3 w-full sm:w-auto">
             <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                <Input type="text" placeholder="Search datasets..." className="pl-9 w-full sm:w-64" />
             </div>
             <Button variant="outline" className="p-0 w-[38px] h-[38px] flex items-center justify-center shrink-0">
                <Filter size={16} />
             </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="pl-5">Dataset Name</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Progress / Volume</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasets.map((ds) => (
                <TableRow key={ds.id} className="group cursor-pointer">
                  <TableCell className="pl-5">
                    <div className="font-semibold text-gray-900 dark:text-white text-xs mb-0.5">{ds.name}</div>
                    <div className="text-gray-500 text-[11px] font-medium">ID: DS-{ds.id.padStart(4, '0')}</div>
                  </TableCell>
                  <TableCell className="font-mono text-gray-600 dark:text-gray-400 text-xs">{ds.source}</TableCell>
                  <TableCell>
                    <span className="px-2.5 py-1 rounded bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium text-xs">{ds.type}</span>
                  </TableCell>
                  <TableCell className="min-w-[200px]">
                    <div className="flex justify-between text-[11px] mb-2 font-semibold">
                      <span className="text-accent">{ds.annotated.toLocaleString()} Annotated</span>
                      <span className="text-gray-500">{ds.collected.toLocaleString()} Total</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-[#151515] rounded-full h-1.5 overflow-hidden border border-gray-200 dark:border-[#222]">
                      <div className="bg-accent h-1.5 rounded-full" style={{ width: `${(ds.annotated / ds.collected) * 100 || 0}%` }}></div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {ds.status === 'Collecting' ? <Badge variant="success">Collecting</Badge> : 
                     ds.status === 'Completed' ? <Badge variant="primary" className="bg-blue-500 hover:bg-blue-600 text-white border-transparent">Completed</Badge> :
                     ds.status === 'Annotating' ? <Badge variant="secondary" className="bg-orange-500/20 text-orange-500 border-transparent dark:bg-orange-500/10">Annotating</Badge> :
                     <Badge variant="secondary">Paused</Badge>
                    }
                  </TableCell>
                  <TableCell className="pr-5">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {ds.status === 'Collecting' ? (
                          <Button variant="outline" className="px-2.5"><Pause size={14} className="text-yellow-500" /></Button>
                      ) : ds.status === 'Paused' ? (
                          <Button variant="outline" className="px-2.5"><Play size={14} className="text-green-500" /></Button>
                      ) : null}
                      <Button variant="outline" className="px-2.5 text-accent hover:text-accent/90"><Database size={14} /></Button>
                      <Button variant="outline" className="px-2.5"><MoreVertical size={14} /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      <NewTaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
      <UploadDatasetModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </main>
  );
};
