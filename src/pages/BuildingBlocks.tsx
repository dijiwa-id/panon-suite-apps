import React, { useState, useRef } from 'react';
import { Layers, Video, BrainCircuit, ShieldCheck, Zap, Server, Code, Upload, X, Settings, Book, Activity, CheckCircle2, Play, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

export const BuildingBlocks = () => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [activeNode, setActiveNode] = useState<{name: string, desc: string, version: string, type: string, categoryIcon: React.ReactNode} | null>(null);
  const [activeTab, setActiveTab] = useState<'config' | 'docs' | 'metrics'>('config');
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    {
      title: "Input Nodes",
      type: "input",
      icon: <Video size={18} className="text-[#52C5F3]" />,
      blocks: [
        { name: "RTSP Stream", desc: "Connect to live IP cameras via RTSP protocol.", version: "1.0.2" },
        { name: "Video File", desc: "Upload or link an MP4/MKV video for batch processing.", version: "1.1.0" },
        { name: "Image Sequence", desc: "Process a sequence of images frame by frame.", version: "1.0.0" },
      ]
    },
    {
      title: "Vision AI Processors",
      type: "processor",
      icon: <BrainCircuit size={18} className="text-[#8b5cf6]" />,
      blocks: [
        { name: "YOLOv8 Detection", desc: "High-performance object detection using ONNX.", version: "2.3.1" },
        { name: "ResNet Classifier", desc: "Image classification and feature extraction.", version: "1.4.0" },
        { name: "DeepSORT Tracker", desc: "Multi-object tracking across sequential frames.", version: "2.0.0" },
        { name: "ALPR Engine", desc: "License plate extraction and character recognition.", version: "3.1.2" },
      ]
    },
    {
      title: "Logic & Analytics",
      type: "logic",
      icon: <Zap size={18} className="text-orange-400" />,
      blocks: [
        { name: "Line Crossing", desc: "Trigger events when objects cross defined virtual lines.", version: "1.0.5" },
        { name: "Region Intrusion", desc: "Detect presence inside a defined polygon ROI.", version: "1.2.0" },
        { name: "Dwell Timer", desc: "Measure how long an object stays within an area.", version: "1.0.1" },
      ]
    },
    {
      title: "Output & Integration",
      type: "output",
      icon: <Server size={18} className="text-[#10b981]" />,
      blocks: [
        { name: "Webhook Dispatcher", desc: "Send JSON payloads via HTTP POST on events.", version: "2.1.0" },
        { name: "PostgreSQL Sink", desc: "Store structured event data directly to DB.", version: "1.0.3" },
        { name: "Kafka Producer", desc: "Stream analytics events to a Kafka topic.", version: "1.5.0" },
      ]
    }
  ];

  const handleImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setImportSuccess(true);
      setTimeout(() => {
        setImportSuccess(false);
        setIsImportModalOpen(false);
      }, 1500);
    }, 2000);
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Building Blocks</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Modular components for the vision AI pipeline</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-white dark:bg-[#1c1c1c] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] border border-gray-200 dark:border-[#222] text-gray-900 dark:text-white h-9 rounded-lg text-xs font-bold px-5 transition-colors shadow-sm">
            <Upload size={14} /> <span>Import Custom Node</span>
          </button>
        </div>
      </div>

      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-200 dark:border-[#222] flex items-center justify-between">
              <h2 className="text-sm font-black text-gray-900 dark:text-white">Import Custom Node</h2>
              <button disabled={isImporting} onClick={() => setIsImportModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50">
                <X size={16} />
              </button>
            </div>
            
            <div className="p-8">
              {importSuccess ? (
                <div className="flex flex-col items-center justify-center py-6 animate-in zoom-in duration-300">
                   <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                     <CheckCircle2 size={32} />
                   </div>
                   <h3 className="text-base font-bold text-gray-900 dark:text-white">Import Successful!</h3>
                   <p className="text-xs text-gray-500 mt-2">The new component has been added to your library.</p>
                </div>
              ) : (
                <div 
                  onClick={handleFileSelect}
                  className={cn(
                    "border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all bg-gray-50 dark:bg-[#161616]/50",
                    isImporting ? "border-[#52C5F3]/50 opacity-70 pointer-events-none" : "border-gray-200 dark:border-[#333] hover:border-[#52C5F3] hover:bg-[#52C5F3]/5"
                  )}
                >
                    <input type="file" className="hidden" ref={fileInputRef} accept=".json,.zip" onChange={(e) => { if (e.target.files?.length) handleImport(); }} />
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-all", isImporting ? "bg-[#52C5F3]/20" : "bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] shadow-sm")}>
                      {isImporting ? (
                        <div className="w-5 h-5 border-2 border-[#52C5F3] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Code size={20} className="text-[#52C5F3]" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1">{isImporting ? 'Processing Manifest...' : 'Upload Component Manifest'}</p>
                      <p className="text-[10px] text-gray-500 font-black capitalize tracking-widest">{isImporting ? 'Please wait' : 'JSON or ZIP format'}</p>
                    </div>
                </div>
              )}
            </div>
            
            {!importSuccess && (
              <div className="p-5 border-t border-gray-200 dark:border-[#222] flex gap-3 justify-end items-center bg-gray-50 dark:bg-[#1a1a1a]">
                  <button disabled={isImporting} onClick={() => setIsImportModalOpen(false)} className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50">Cancel</button>
                  <button disabled={isImporting} onClick={handleImport} className="bg-[#52C5F3] hover:bg-[#3baee0] text-gray-900 disabled:opacity-50 disabled:hover:bg-[#52C5F3] h-9 rounded-lg text-xs font-bold px-6 transition-colors shadow-sm flex items-center gap-2">
                    {isImporting ? 'Importing...' : 'Select File'}
                  </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Node Properties Modal */}
      {activeNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
           <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
              
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-[#222] flex items-start justify-between relative bg-gradient-to-br from-gray-50 to-white dark:from-[#1a1a1a] dark:to-[#1e1e1e]">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#222] border border-gray-200 dark:border-[#333] flex items-center justify-center shadow-sm shrink-0">
                     {activeNode.categoryIcon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">{activeNode.name}</h2>
                      <span className="text-[10px] font-mono bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded border border-gray-200 dark:border-[#333]">v{activeNode.version}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{activeNode.desc}</p>
                  </div>
                </div>
                <button onClick={() => setActiveNode(null)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-white dark:bg-[#222] border border-gray-200 dark:border-[#333] p-1.5 rounded-lg shadow-sm">
                  <X size={16} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-[#222] px-6 pt-2 gap-6 bg-gray-50 dark:bg-[#1a1a1a]">
                 {[
                   { id: 'config', label: 'Configuration', icon: Settings },
                   { id: 'docs', label: 'Documentation', icon: Book },
                   { id: 'metrics', label: 'Performance', icon: Activity },
                 ].map(tab => (
                   <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id as 'config' | 'docs' | 'metrics')}
                     className={cn(
                       "flex items-center gap-2 pb-3 text-xs font-bold transition-all relative border-b-2 hover:text-gray-900 dark:hover:text-white",
                       activeTab === tab.id 
                         ? "text-[#52C5F3] border-[#52C5F3]" 
                         : "text-gray-500 border-transparent"
                     )}
                   >
                     <tab.icon size={14} />
                     <span className="capitalize tracking-widest text-[10px]">{tab.label}</span>
                   </button>
                 ))}
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex-1 bg-white dark:bg-[#1e1e1e] custom-scrollbar">
                 {activeTab === 'config' && (
                   <div className="space-y-6 animate-in fade-in duration-300">
                      {activeNode.type === 'input' && (
                        <>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-gray-500 tracking-widest capitalize">Connection URL</label>
                             <input type="text" defaultValue="rtsp://admin:admin@192.168.1.100:554/stream1" className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#333] rounded-lg px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-[#52C5F3]/50 focus:ring-1 focus:ring-[#52C5F3]/50 outline-none transition-all" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-gray-500 tracking-widest capitalize">Protocol</label>
                               <select className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#333] rounded-lg px-4 py-2.5 text-xs font-bold text-gray-900 dark:text-white outline-none">
                                 <option>TCP</option>
                                 <option>UDP</option>
                                 <option>Multicast</option>
                               </select>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-gray-500 tracking-widest capitalize">Buffering (ms)</label>
                               <input type="number" defaultValue="200" className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#333] rounded-lg px-4 py-2.5 text-xs font-bold text-gray-900 dark:text-white outline-none" />
                            </div>
                          </div>
                        </>
                      )}
                      
                      {activeNode.type === 'processor' && (
                        <>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-gray-500 tracking-widest capitalize">Model Path / URI</label>
                             <input type="text" defaultValue="internal://models/yolov8_n_best.onnx" className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#333] rounded-lg px-4 py-2.5 text-xs text-gray-900 dark:text-white outline-none" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-gray-500 tracking-widest capitalize">Confidence Threshold</label>
                               <div className="flex items-center gap-3">
                                 <input type="range" min="0" max="100" defaultValue="45" className="flex-1 accent-[#52C5F3]" />
                                 <span className="text-xs font-mono font-bold w-10 text-right">0.45</span>
                               </div>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-gray-500 tracking-widest capitalize">NMS Threshold</label>
                               <div className="flex items-center gap-3">
                                 <input type="range" min="0" max="100" defaultValue="30" className="flex-1 accent-[#52C5F3]" />
                                 <span className="text-xs font-mono font-bold w-10 text-right">0.30</span>
                               </div>
                            </div>
                          </div>
                          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-[#222]">
                            <label className="flex items-center gap-2 cursor-pointer">
                               <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#52C5F3] focus:ring-[#52C5F3]" />
                               <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Enable TensorRT acceleration</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                               <input type="checkbox" className="rounded border-gray-300 text-[#52C5F3] focus:ring-[#52C5F3]" />
                               <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Run completely in FP16 precision</span>
                            </label>
                          </div>
                        </>
                      )}

                      {(activeNode.type === 'logic' || activeNode.type === 'output') && (
                        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-[#161616] rounded-xl border border-gray-200 dark:border-[#333]">
                           <Lock size={24} className="text-gray-400 mb-3" />
                           <p className="text-xs font-bold text-gray-600 dark:text-gray-400 text-center">Node-specific configuration requires an active pipeline connection.</p>
                           <p className="text-[10px] text-gray-500 text-center mt-1">Add this node to the canvas to configure it.</p>
                        </div>
                      )}
                   </div>
                 )}

                 {activeTab === 'docs' && (
                   <div className="space-y-6 text-xs text-gray-700 dark:text-gray-300 leading-relaxed animate-in fade-in duration-300">
                     <div>
                       <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">Overview</h3>
                       <p>{activeNode.desc} This node is essential for the initial stages of any visual processing logic that involves standard industry protocols. It handles reconnects, packet loss recovery, and adaptive buffering.</p>
                     </div>
                     <div>
                       <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">Inputs & Outputs</h3>
                       <ul className="list-disc pl-4 space-y-1">
                         <li><strong>Input:</strong> None (Source Node)</li>
                         <li><strong>Output:</strong> RAW Video Frame (RGB / BGR tensor)</li>
                       </ul>
                     </div>
                     <div>
                       <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">Advanced Usage</h3>
                       <p className="bg-gray-50 dark:bg-[#161616] p-3 rounded-lg border border-gray-200 dark:border-[#333] font-mono text-[10px]">
                         # Example Pipeline CLI usage<br/>
                         panon-cli node add {activeNode.name.toLowerCase().replace(/ /g, '_')} --id src1 --url "rtsp://..."
                       </p>
                     </div>
                   </div>
                 )}

                 {activeTab === 'metrics' && (
                   <div className="animate-in fade-in duration-300 space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         <div className="bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#333] p-4 rounded-xl text-center">
                            <p className="text-[10px] font-black capitalize tracking-widest text-gray-500 mb-1">Avg Latency</p>
                            <p className="text-lg font-black text-gray-900 dark:text-white">12<span className="text-xs text-gray-500">ms</span></p>
                         </div>
                         <div className="bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#333] p-4 rounded-xl text-center">
                            <p className="text-[10px] font-black capitalize tracking-widest text-gray-500 mb-1">Throughput</p>
                            <p className="text-lg font-black text-gray-900 dark:text-white">60<span className="text-xs text-gray-500">fps</span></p>
                         </div>
                         <div className="bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#333] p-4 rounded-xl text-center">
                            <p className="text-[10px] font-black capitalize tracking-widest text-gray-500 mb-1">Mem Usage</p>
                            <p className="text-lg font-black text-gray-900 dark:text-white">142<span className="text-xs text-gray-500">mb</span></p>
                         </div>
                         <div className="bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#333] p-4 rounded-xl text-center">
                            <p className="text-[10px] font-black capitalize tracking-widest text-gray-500 mb-1">Reliability</p>
                            <p className="text-lg font-black text-gray-900 dark:text-white">99.9<span className="text-xs text-gray-500">%</span></p>
                         </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#333] rounded-xl h-40 flex items-center justify-center relative overflow-hidden">
                         {/* Mock Chart Area */}
                         <div className="absolute inset-x-0 bottom-0 top-10 flex items-end">
                            {Array.from({length: 40}).map((_, i) => (
                              <div key={i} className="flex-1 bg-[#52C5F3]/20 mx-[1px]" style={{ height: `${20 + Math.random() * 80}%` }}></div>
                            ))}
                         </div>
                         <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/50 to-transparent"></div>
                         <p className="text-[10px] font-black text-gray-500 tracking-widest capitalize z-10 relative">Execution Time Distribution</p>
                      </div>
                   </div>
                 )}
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-gray-200 dark:border-[#222] flex gap-3 justify-end items-center bg-gray-50 dark:bg-[#1a1a1a]">
                 <button onClick={() => setActiveNode(null)} className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Cancel</button>
                 <button onClick={() => { console.log('Saving config...'); setActiveNode(null); }} className="bg-[#52C5F3] hover:bg-[#3baee0] text-gray-900 h-9 rounded-lg text-xs font-bold px-6 transition-colors shadow-sm flex items-center gap-2">
                    <Play size={14} /> <span>Apply Configuration</span>
                 </button>
              </div>

           </div>
        </div>
      )}

      <div className="space-y-10">
        {categories.map((cat, idx) => (
          <div key={idx}>
             <div className="flex items-center gap-3 mb-4">
                 <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] flex items-center justify-center shadow-sm">
                     {cat.icon}
                 </div>
                 <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{cat.title}</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.blocks.map(block => (
                    <div 
                      key={block.name} 
                      onClick={() => {
                        setActiveNode({
                          ...block,
                          type: cat.type,
                          categoryIcon: cat.icon
                        });
                        setActiveTab('config');
                      }}
                      className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-xl p-5 hover:border-[#52C5F3]/50 hover:shadow-md transition-all group flex flex-col h-full cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#52C5F3]/0 to-[#52C5F3]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        <div className="flex justify-between items-start mb-3 relative z-10">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#52C5F3] transition-colors">{block.name}</h3>
                            <span className="text-[9px] font-mono font-bold bg-gray-100 dark:bg-[#2a2a2a] text-gray-500 px-1.5 py-0.5 rounded border border-gray-200 dark:border-[#222]">v{block.version}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4 flex-1 relative z-10">{block.desc}</p>
                        <div className="flex items-center justify-between border-t border-gray-100 dark:border-[#222] pt-4 mt-auto relative z-10">
                            <span className="text-[10px] font-bold text-gray-400 group-hover:text-[#52C5F3] transition-colors flex items-center gap-1.5 capitalize tracking-widest">
                                <Settings size={12} /> Configure
                            </span>
                        </div>
                    </div>
                ))}
             </div>
          </div>
        ))}
      </div>
    </main>
  );
};
