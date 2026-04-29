import React, { useState } from 'react';
import { Layers, Video, BrainCircuit, ShieldCheck, Zap, Server, Code, Upload, X } from 'lucide-react';
import { cn } from '../lib/utils';

export const BuildingBlocks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = [
    {
      title: "Input Nodes",
      icon: <Video size={18} className="text-secondary" />,
      blocks: [
        { name: "RTSP Stream", desc: "Connect to live IP cameras via RTSP protocol.", version: "1.0.2" },
        { name: "Video File", desc: "Upload or link an MP4/MKV video for batch processing.", version: "1.1.0" },
        { name: "Image Sequence", desc: "Process a sequence of images frame by frame.", version: "1.0.0" },
      ]
    },
    {
      title: "Vision AI Processors",
      icon: <BrainCircuit size={18} className="text-accent" />,
      blocks: [
        { name: "YOLOv8 Detection", desc: "High-performance object detection using ONNX.", version: "2.3.1" },
        { name: "ResNet Classifier", desc: "Image classification and feature extraction.", version: "1.4.0" },
        { name: "DeepSORT Tracker", desc: "Multi-object tracking across sequential frames.", version: "2.0.0" },
        { name: "ALPR Engine", desc: "License plate extraction and character recognition.", version: "3.1.2" },
      ]
    },
    {
      title: "Logic & Analytics",
      icon: <Zap size={18} className="text-orange-400" />,
      blocks: [
        { name: "Line Crossing", desc: "Trigger events when objects cross defined virtual lines.", version: "1.0.5" },
        { name: "Region Intrusion", desc: "Detect presence inside a defined polygon ROI.", version: "1.2.0" },
        { name: "Dwell Timer", desc: "Measure how long an object stays within an area.", version: "1.0.1" },
      ]
    },
    {
      title: "Output & Integration",
      icon: <Server size={18} className="text-green-400" />,
      blocks: [
        { name: "Webhook Dispatcher", desc: "Send JSON payloads via HTTP POST on events.", version: "2.1.0" },
        { name: "PostgreSQL Sink", desc: "Store structured event data directly to DB.", version: "1.0.3" },
        { name: "Kafka Producer", desc: "Stream analytics events to a Kafka topic.", version: "1.5.0" },
      ]
    }
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#161616] p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Building Blocks</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Modular components for the vision AI pipeline.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-white dark:bg-[#1c1c1c] hover:bg-gray-200 dark:hover:bg-[#2a2a2a] border border-gray-200 dark:border-[#222] text-gray-900 dark:text-white h-8 rounded-full text-xs font-bold px-5 transition-colors leading-[12px]">
            <Upload size={14} /> Import Custom Node
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-[#222] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]">
              <h2 className="text-sm font-black text-gray-900 dark:text-white">Import Custom Node</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="border-2 border-dashed border-gray-200 dark:border-[#222] rounded-xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-accent group transition-all bg-gray-50 dark:bg-[#161616]/50">
                  <div className="w-12 h-12 bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:border-accent transition-all">
                    <Code size={20} className="text-gray-500 group-hover:text-accent" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1">Upload Component Manifest</p>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">JSON or ZIP format</p>
                  </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-[#222] flex gap-3 justify-between items-center bg-gray-50/50 dark:bg-[#1a1a1a]">
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white font-black text-[10px] transition-colors uppercase tracking-widest">Cancel</button>
                <button onClick={() => { console.log('Importing node...'); setIsModalOpen(false); }} className="bg-accent hover:bg-accent/90 text-black h-[32px] rounded-full text-xs font-bold px-8 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]">Import Node</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-10">
        {categories.map((cat, idx) => (
          <div key={idx}>
             <div className="flex items-center gap-3 mb-4">
                 <div className="w-8 h-8 rounded-lg bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] flex items-center justify-center">
                     {cat.icon}
                 </div>
                 <h2 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{cat.title}</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.blocks.map(block => (
                    <div key={block.name} className="bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-xl p-5 hover:border-accent/40 hover:shadow-[0_0_15px_rgba(82,197,243,0.05)] transition-all group flex flex-col h-full cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors">{block.name}</h3>
                            <span className="text-[9px] font-mono bg-gray-50 dark:bg-[#161616] text-gray-500 px-1.5 py-0.5 rounded border border-gray-200 dark:border-[#222]">v{block.version}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">{block.desc}</p>
                        <div className="flex items-center justify-between border-t border-gray-200 dark:border-[#222] pt-3 mt-auto">
                            <span className="text-[10px] font-bold text-gray-600 group-hover:text-gray-400 transition-colors flex items-center gap-1">
                                <Code size={12} /> View Source
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
