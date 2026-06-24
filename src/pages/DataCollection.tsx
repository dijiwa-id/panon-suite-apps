import React, { useState } from 'react';
import { Search, Plus, Filter, Database, Play, Pause, MoreVertical, UploadCloud, Image as ImageIcon, X, ChevronDown, Link as LinkIcon, Cloud, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { Select, Card, Button, Input, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui';
import { useTrain, type Dataset } from '../context/TrainContext';

const DatasetDetailModal = ({ isOpen, onClose, dataset }: { isOpen: boolean; onClose: () => void; dataset: Dataset | null }) => {
  const navigate = useNavigate();

  if (!isOpen || !dataset) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-[#222] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-black text-gray-900 dark:text-white">Dataset Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">ID</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{dataset.id}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Status</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">{dataset.status}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Name</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{dataset.name}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Type</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{dataset.type}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Size</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{dataset.size}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Samples</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{dataset.samples.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Annotations</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{dataset.annotations.toLocaleString()}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Last Updated</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{dataset.lastUpdated}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-[#222] flex justify-between items-center bg-gray-50/50 dark:bg-[#1a1a1a]">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              navigate('/image-annotation');
              onClose();
            }}
          >
            Start Annotation
          </Button>
        </div>
      </div>
    </div>
  );
};

const NewTaskModal = ({ isOpen, onClose, onCreate }: { isOpen: boolean; onClose: () => void; onCreate: (name: string, source: string) => void }) => {
  const [name, setName] = useState('');
  const [source, setSource] = useState('CAM-001');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-[#222] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-black text-gray-900 dark:text-white">New Collection Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors" disabled={isSubmitting}>
            <X size={16} />
          </button>
        </div>
        
        <form onSubmit={(e) => { 
          e.preventDefault(); 
          setIsSubmitting(true);
          setTimeout(() => {
            onCreate(name, source);
            toast.success("Collection task created successfully!");
            setIsSubmitting(false);
            setName('');
            setSource('CAM-001');
            onClose(); 
          }, 800);
        }} className="p-6 space-y-5">
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Task Name</label>
            <Input 
              type="text" 
              required
              placeholder="e.g. Morning Traffic Flow"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Source Camera</label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
                <Select 
                   className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg pl-4 pr-9 h-[37px] text-[12px] font-bold text-gray-700 dark:text-gray-300 outline-none focus-visible:ring-1 focus-visible:ring-accent/50 transition-all appearance-none cursor-pointer"
                   value={source}
                   onChange={(e) => setSource(e.target.value)}
                >
                  <option value="CAM-001">CAM-001</option>
                  <option value="CAM-042">CAM-042</option>
                  <option value="CAM-015">CAM-015</option>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Collection Type</label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <ChevronDown size={14} />
                </div>
                <Select className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg pl-4 pr-9 h-[37px] text-[12px] font-bold text-gray-700 dark:text-gray-300 outline-none focus-visible:ring-1 focus-visible:ring-accent/50 transition-all appearance-none cursor-pointer">
                  <option>Continuous</option>
                  <option>Scheduled</option>
                  <option>Batch</option>
                </Select>
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
            <Button variant="ghost" type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="h-8 gap-2" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 size={14} className="animate-spin" /> Creating...</> : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UploadDatasetModal = ({ isOpen, onClose, onUpload }: { isOpen: boolean; onClose: () => void; onUpload: (name: string, source: string) => void }) => {
  const [uploadType, setUploadType] = useState<'local' | 'url' | 'cloud'>('local');
  const [datasetName, setDatasetName] = useState('');
  const [datasetUrl, setDatasetUrl] = useState('');

  if (!isOpen) return null;

  const handleStartUpload = () => {
    if (!datasetName) {
      toast.error('Please enter a dataset name');
      return;
    }
    
    let source = 'Uploaded (Local)';
    if (uploadType === 'url') {
      if (!datasetUrl) {
         toast.error('Please enter a valid URL');
         return;
      }
      source = `URL: ${datasetUrl}`;
    } else if (uploadType === 'cloud') {
      source = 'Cloud Storage';
    }

    toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
      loading: 'Uploading dataset...',
      success: 'Dataset uploaded successfully',
      error: 'Upload failed',
    });

    onUpload(datasetName, source);
    onClose(); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-200 dark:border-[#222] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-black text-gray-900 dark:text-white">Upload Dataset</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Dataset Name</label>
              <Input 
                type="text" 
                placeholder="e.g. Training Set July" 
                value={datasetName}
                onChange={(e) => setDatasetName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Source</label>
              <div className="flex bg-gray-100 dark:bg-[#111] p-1 rounded-lg">
                <button 
                  onClick={() => setUploadType('local')}
                  className={cn("flex-1 text-xs font-bold py-1.5 rounded-md flex items-center justify-center gap-2 transition-all", uploadType === 'local' ? "bg-white dark:bg-[#222] text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300")}
                >
                  <UploadCloud size={14} /> Local
                </button>
                <button 
                  onClick={() => setUploadType('url')}
                  className={cn("flex-1 text-xs font-bold py-1.5 rounded-md flex items-center justify-center gap-2 transition-all", uploadType === 'url' ? "bg-white dark:bg-[#222] text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300")}
                >
                  <LinkIcon size={14} /> URL
                </button>
                <button 
                  onClick={() => setUploadType('cloud')}
                  className={cn("flex-1 text-xs font-bold py-1.5 rounded-md flex items-center justify-center gap-2 transition-all", uploadType === 'cloud' ? "bg-white dark:bg-[#222] text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300")}
                >
                  <Cloud size={14} /> Storage
                </button>
              </div>
            </div>
            
            {uploadType === 'local' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Dataset Files (ZIP only)</label>
                <div className="border-2 border-dashed border-gray-200 dark:border-[#222] rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-accent group transition-all bg-gray-50 dark:bg-[#161616]/50 cursor-pointer">
                  <div className="w-12 h-12 bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:border-accent transition-all mb-4">
                    <UploadCloud className="text-gray-500 group-hover:text-accent" size={24} />
                  </div>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1">Click or drag & drop</p>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">ZIP Format (Max 2GB)</p>
                </div>
              </div>
            )}

            {uploadType === 'url' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Public URL</label>
                  <Input 
                    type="url" 
                    placeholder="https://example.com/dataset.zip" 
                    value={datasetUrl}
                    onChange={(e) => setDatasetUrl(e.target.value)}
                  />
                  <p className="text-[10px] text-gray-500 mt-2">Must be a direct link to a ZIP file.</p>
                </div>
              </div>
            )}

            {uploadType === 'cloud' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Bucket URI</label>
                  <Input 
                    type="text" 
                    placeholder="s3://my-bucket/dataset/ or gs://..." 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Access Key ID (Optional)</label>
                  <Input 
                    type="text" 
                    placeholder="Leave empty if public" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest">Secret Access Key (Optional)</label>
                  <Input 
                    type="password" 
                    placeholder="Leave empty if public" 
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-[#222] flex gap-3 justify-between items-center bg-gray-50/50 dark:bg-[#1a1a1a] shrink-0">
           <Button variant="ghost" type="button" onClick={onClose}>
             Cancel
           </Button>
           <Button variant="primary" onClick={handleStartUpload} className="h-8">
             Start Upload
           </Button>
        </div>
      </div>
    </div>
  );
};

export const DataCollection = () => {
  const { datasets = [], addDataset, incrementDatasetSamples } = useTrain();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  const handleCreateTask = (name: string, source: string) => {
    addDataset({
      name,
      type: 'Object Detection',
      source: source
    } as any);
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent text-gray-900 dark:text-gray-200 transition-colors p-6 md:p-8 custom-scrollbar">
      <div className="max-w-[1600px] mx-auto min-h-full flex flex-col gap-4">
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
          { label: 'Total Datasets', value: datasets.length.toString(), icon: <Database className="text-blue-400" size={20} /> },
          { label: 'Images Collected', value: datasets.reduce((a, b) => a + b.samples, 0).toLocaleString(), icon: <ImageIcon className="text-green-400" size={20} /> },
          { label: 'Active Tasks', value: datasets.filter(ds => ds.status === 'collecting').length.toString(), icon: <Play className="text-accent" size={20} /> },
          { label: 'Pending Annotation', value: (datasets.reduce((a, b) => a + b.samples, 0) - datasets.reduce((a, b) => a + b.annotations, 0)).toLocaleString(), icon: <Filter className="text-orange-400" size={20} /> },
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
                <TableRow key={ds.id} className="group cursor-pointer" onClick={() => setSelectedDataset(ds)}>
                  <TableCell className="pl-5">
                    <div className="font-semibold text-gray-900 dark:text-white text-xs mb-0.5">{ds.name}</div>
                    <div className="text-gray-500 text-[11px] font-medium">ID: {ds.id}</div>
                  </TableCell>
                  <TableCell className="font-mono text-gray-600 dark:text-gray-400 text-xs">{(ds as any).source || 'Uploaded'}</TableCell>
                  <TableCell>
                    <span className="px-2.5 py-1 rounded bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium text-xs">{ds.type}</span>
                  </TableCell>
                  <TableCell className="min-w-[200px]">
                    <div className="flex justify-between text-[11px] mb-2 font-semibold">
                      <span className="text-accent">{ds.annotations.toLocaleString()} Annotated</span>
                      <span className="text-gray-500">{ds.samples.toLocaleString()} Total</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-[#151515] rounded-full h-1.5 overflow-hidden border border-gray-200 dark:border-[#222]">
                      <div className="bg-accent h-1.5 rounded-full" style={{ width: `${(ds.annotations / Math.max(ds.samples, 1)) * 100 || 0}%` }}></div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {ds.status === 'collecting' ? <Badge variant="success">Collecting</Badge> : 
                     ds.status === 'ready' ? <Badge variant="default" className="bg-blue-500 hover:bg-blue-600 text-white border-transparent">Completed</Badge> :
                     ds.status === 'annotating' ? <Badge variant="default" className="bg-orange-500/20 text-orange-500 border-transparent dark:bg-orange-500/10">Annotating</Badge> :
                     <Badge variant="default">{ds.status}</Badge>
                    }
                  </TableCell>
                  <TableCell className="pr-5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {ds.status === 'collecting' ? (
                          <Button variant="outline" className="px-2.5"><Pause size={14} className="text-yellow-500" /></Button>
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
      <NewTaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} onCreate={handleCreateTask} />
      <UploadDatasetModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} onUpload={handleCreateTask} />
      <DatasetDetailModal isOpen={!!selectedDataset} onClose={() => setSelectedDataset(null)} dataset={selectedDataset} />
      </div>
    </main>
  );
};
