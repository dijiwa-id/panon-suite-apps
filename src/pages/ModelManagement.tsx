import React, { useState } from 'react';
import { Search, Upload, Database, CheckCircle, BrainCircuit, Box, Trash2, ShieldCheck, FileCheck, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';

const initialModels = [
  { id: '1', filename: 'Model-2026-Security-80-001', type: 'Intrusion & Weapon', classes: ['Vehicle', 'Person', 'Weapon', 'Crowd'], confidence: 0.8 },
  { id: '2', filename: 'Model-2026-ALPR-60-001', type: 'LPR / Vehicle', classes: ['License Plate'], confidence: 0.6 },
  { id: '3', filename: 'Model-2026-Sanitation-90-001', type: 'Environmental', classes: ['Person', 'Water', 'Vehicle'], confidence: 0.9 },
  { id: '4', filename: 'Model-2026-Landscape-75-001', type: 'Property Monitoring', classes: ['Tree', 'Person', 'Vehicle'], confidence: 0.75 },
];

export const ModelManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [models, setModels] = useState(initialModels);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (uploadedFile) {
      setModels([...models, {
        id: Math.random().toString(),
        filename: uploadedFile.name.replace('.onnx', ''),
        type: 'Custom Import',
        classes: ['Custom Object'],
        confidence: 0.7
      }]);
    }
    setUploadedFile(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this custom model?')) {
      setModels(models.filter(m => m.id !== id));
    }
  };

  const filteredModels = models.filter(m => 
    m.filename.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-[1600px] mx-auto min-h-full flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Model Management</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Upload, manage, and verify AI models for edge inferences.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="primary" onClick={() => setIsModalOpen(true)} className="flex-1 md:flex-none px-5">
            <Upload size={14} /> Upload Custom Model (.onnx)
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-[#222] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]">
              <h2 className="text-sm font-black text-gray-900 dark:text-white">Upload Custom Model</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Import your pre-compiled .onnx model file for edge deployment.</p>
              
              <label className="border-2 border-dashed border-gray-200 dark:border-[#222] rounded-xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-accent group transition-all bg-gray-50 dark:bg-[#161616]/50">
                  <input type="file" accept=".onnx" onChange={(e) => setUploadedFile(e.target.files?.[0] || null)} className="hidden" />
                  <div className={cn(
                    "w-12 h-12 border border-gray-200 dark:border-[#222] rounded-full flex items-center justify-center transition-all",
                    uploadedFile ? "bg-accent/20 border-accent/40" : "bg-gray-50/50 dark:bg-[#1a1a1a] group-hover:scale-110 group-hover:border-accent"
                  )}>
                     {uploadedFile ? <CheckCircle size={20} className="text-accent" /> : <Upload size={20} className="text-gray-500 group-hover:text-accent" />}
                  </div>
                  <div className="text-center">
                    {uploadedFile ? (
                      <p className="text-sm font-bold text-accent mb-1">{uploadedFile.name}</p>
                    ) : (
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1">Click or drag & drop</p>
                    )}
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">ONNX File Only (Max 256MB)</p>
                  </div>
              </label>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-[#222] flex gap-3 justify-between items-center bg-gray-50/50 dark:bg-[#1a1a1a]">
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white font-black text-[10px] transition-colors uppercase tracking-widest leading-none">Cancel</button>
                <Button variant="primary" disabled={!uploadedFile} onClick={handleUpload}>Upload Model</Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 dark:border-[#222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BrainCircuit size={16} className="text-gray-500" /> Compiled Models Library
          </h2>
          <div className="flex gap-3 w-full sm:w-auto">
             <div className="bg-gray-100 dark:bg-[#151515] px-4 py-2 rounded-xl border border-gray-200 dark:border-[#222] flex items-center gap-2 flex-1 sm:flex-none focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all">
                <Search className="text-gray-600 dark:text-gray-400" size={16} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, tags..." 
                  className="bg-transparent outline-none text-xs font-medium text-gray-800 dark:text-gray-200 w-full sm:w-64 placeholder-gray-600" 
                />
             </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
                <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-transparent">
                <th className="px-5 py-4 whitespace-nowrap">File Identifier</th>
                <th className="px-5 py-4 whitespace-nowrap">Detected Classes (Objects)</th>
                <th className="px-5 py-4 whitespace-nowrap">Min. Confidence</th>
                <th className="px-5 py-4 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
              {filteredModels.map((model) => (
                <tr key={model.id} className="hover:bg-white/5 hover:bg-gray-50 transition-colors group">
                  <td className="px-5 py-4">
                      <div className="flex items-center gap-2 mb-1">
                          <FileCheck size={14} className="text-accent" />
                          <span className="font-semibold text-gray-900 dark:text-white text-xs">{model.filename}</span>
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono pl-5 uppercase tracking-widest font-black">{model.type}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {model.classes.map(c => 
                            <span key={c} className="bg-gray-100 dark:bg-[#151515] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#222] px-2 py-0.5 rounded text-[10px] font-medium">
                                {c}
                            </span>
                        )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                          <div className="w-16 h-1.5 bg-gray-100 dark:bg-[#151515] rounded-full overflow-hidden border border-gray-200 dark:border-[#222]">
                              <div className="h-full bg-accent" style={{ width: `${model.confidence * 100}%` }}></div>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 font-mono text-[11px]">{Math.round(model.confidence * 100)}%</span>
                      </div>
                  </td>
                  <td className="px-5 py-4 flex gap-2 justify-end">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-white transition-colors bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-lg text-[10px] font-bold">
                      <Database size={12} /> Assign to Edge
                    </button>
                    <button onClick={() => handleDelete(model.id)} className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-lg">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </main>
  );
};
