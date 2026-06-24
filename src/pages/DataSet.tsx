import React, { useState } from 'react';
import { Search, Plus, HardDrive, Filter, Clock, CheckCircle2, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Select, Card, Button, Input, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui';
import { useTrain } from '../context/TrainContext';

export const DataSet = () => {
  const { datasets = [], addDataset } = useTrain();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDataset, setNewDataset] = useState({ name: '', type: 'Object Detection', description: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleCreate = () => {
    if (newDataset.name.trim()) {
      addDataset({
        name: newDataset.name,
        type: newDataset.type,
      });
      setIsModalOpen(false);
      setNewDataset({ name: '', type: 'Object Detection', description: '' });
    }
  };

  const filteredDatasets = datasets.filter(ds => 
      ds.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ds.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDatasets = datasets.length;
  const totalSamples = datasets.reduce((acc, ds) => acc + ds.samples, 0);
  const totalAnnotated = datasets.reduce((acc, ds) => acc + ds.annotations, 0);
  
  const parseSize = (sizeStr: string) => {
    const val = parseFloat(sizeStr.split(' ')[0]) || 0;
    const unit = sizeStr.split(' ')[1] || 'MB';
    if (unit === 'GB') return val * 1024;
    return val;
  };

  const totalStorageMB = datasets.reduce((acc, ds) => acc + parseSize(ds.size), 0);
  const totalStorageStr = totalStorageMB >= 1024 ? `${(totalStorageMB / 1024).toFixed(1)} GB` : `${totalStorageMB.toFixed(1)} MB`;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors relative custom-scrollbar">
      <div className="max-w-[1600px] mx-auto min-h-full flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Data Sets</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Manage and organize data collections for model training.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="gap-2 w-full md:w-auto">
            <Filter size={14} /> Filter
          </Button>
          <Button 
             variant="primary"
             onClick={() => setIsModalOpen(true)}
             className="gap-2 w-full md:w-auto"
          >
            <Plus size={14} /> New Data Set
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {[
          { label: 'Total Datasets', value: totalDatasets.toString(), icon: <HardDrive size={20} className="text-accent" /> },
          { label: 'Total Samples', value: formatNumber(totalSamples), icon: <div className="text-secondary font-bold text-lg">S</div> },
          { label: 'Annotated', value: formatNumber(totalAnnotated), icon: <CheckCircle2 size={20} className="text-green-500" /> },
          { label: 'Storage Used', value: totalStorageStr, icon: <Clock size={20} className="text-purple-400" /> },
        ].map((stat, idx) => (
          <Card key={idx} className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-500 font-black tracking-widest uppercase mb-1">{stat.label}</p>
              <h3 className="text-[18px] font-black text-gray-900 dark:text-white tracking-tight">{stat.value}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] flex items-center justify-center shrink-0">
              {stat.icon}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-[#222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Dataset Overview
          </h2>
          <div className="flex w-full sm:w-auto">
             <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                <Input 
                  type="text" 
                  placeholder="Search datasets..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8" 
                />
             </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Dataset Name</TableHead>
                <TableHead>Task Type</TableHead>
                <TableHead>Size & Volume</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDatasets.map((ds) => (
                <TableRow 
                  key={ds.id} 
                  className="group cursor-pointer"
                  onClick={() => navigate('/train/image-annotation')}
                >
                  <TableCell>
                      <div className="font-semibold text-gray-900 dark:text-white text-xs mb-0.5">{ds.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono tracking-wide uppercase tracking-widest font-black">{ds.id} • {ds.lastUpdated}</div>
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    <span className="bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] px-2 py-1 rounded text-[10px] font-medium tracking-wide">
                        {ds.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                        <div>
                            <div className="text-gray-900 dark:text-white font-medium">{ds.samples.toLocaleString()} items</div>
                            <div className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest font-black">{ds.annotations.toLocaleString()} labels</div>
                        </div>
                        <div className="font-mono text-gray-600 dark:text-gray-400 text-xs tracking-wider border-l border-gray-200 dark:border-[#222] pl-4">{ds.size}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {ds.status === 'ready' && <Badge variant="success">ready</Badge>}
                     {ds.status === 'annotating' && <Badge className="bg-accent/10 border-accent/20 text-accent hover:bg-accent/20">annotating</Badge>}
                    {ds.status === 'uploading' && <Badge variant="warning">uploading</Badge>}
                    {ds.status === 'collecting' && <Badge className="bg-blue-500/10 border-blue-500/20 text-blue-500 hover:bg-blue-500/20">collecting</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/train/image-annotation');
                      }}
                      className="px-3"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* New Dataset Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(82,197,243,0.8)]"></div>
                New Data Set
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
               <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Dataset Name</label>
                  <Input 
                      type="text" 
                      placeholder="e.g. Lobby Entrance Validation"
                      value={newDataset.name}
                      onChange={(e) => setNewDataset({ ...newDataset, name: e.target.value })}
                  />
               </div>
               <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Task Type</label>
                  <div className="relative">
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                          <ChevronDown size={14} />
                      </div>
                      <Select 
                          value={newDataset.type}
                          onChange={(e) => setNewDataset({ ...newDataset, type: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg pl-4 pr-9 h-[37px] text-[12px] text-gray-900 dark:text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all font-medium appearance-none cursor-pointer"
                      >
                          <option value="Object Detection">Object Detection</option>
                          <option value="Face Recognition">Face Recognition</option>
                          <option value="Optical Character Recognition">Optical Character Recognition</option>
                          <option value="Image Classification">Image Classification</option>
                          <option value="Instance Segmentation">Instance Segmentation</option>
                      </Select>
                  </div>
               </div>
               <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description (Optional)</label>
                  <textarea 
                      placeholder="Brief description of this dataset..."
                      value={newDataset.description}
                      onChange={(e) => setNewDataset({ ...newDataset, description: e.target.value })}
                      className="w-full h-20 bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all placeholder-gray-600 resize-none font-medium"
                  ></textarea>
               </div>
            </div>

            <div className="p-5 border-t border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a] flex justify-end gap-3">
               <Button 
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
               </Button>
               <Button 
                 variant="primary"
                 onClick={handleCreate}
                 disabled={!newDataset.name.trim()}
               >
                 Create Dataset
               </Button>
            </div>
          </div>
        </div>
      )}
      </div>
    </main>
  );
};
