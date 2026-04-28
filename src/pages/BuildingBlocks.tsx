import React from 'react';
import { Layers, Video, BrainCircuit, ShieldCheck, Zap, Server, Code, Upload } from 'lucide-react';
import { cn } from '../lib/utils';

export const BuildingBlocks = () => {
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
    <main className="flex-1 overflow-y-auto bg-[#161616] p-6 lg:p-8 text-gray-200 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white mb-1">Building Blocks</h1>
          <p className="text-gray-400 text-xs font-medium">Modular components for the vision AI pipeline.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-[#1c1c1c] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white h-[36px] rounded-full text-xs font-bold px-6 transition-colors leading-[12px]">
            <Upload size={14} /> Import Custom Node
          </button>
        </div>
      </div>

      <div className="space-y-10">
        {categories.map((cat, idx) => (
          <div key={idx}>
             <div className="flex items-center gap-3 mb-4">
                 <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
                     {cat.icon}
                 </div>
                 <h2 className="text-lg font-bold text-white tracking-tight">{cat.title}</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.blocks.map(block => (
                    <div key={block.name} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 hover:border-accent/40 hover:shadow-[0_0_15px_rgba(82,197,243,0.05)] transition-all group flex flex-col h-full cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-sm font-bold text-white group-hover:text-accent transition-colors">{block.name}</h3>
                            <span className="text-[9px] font-mono bg-[#161616] text-gray-500 px-1.5 py-0.5 rounded border border-[#2a2a2a]">v{block.version}</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4 flex-1">{block.desc}</p>
                        <div className="flex items-center justify-between border-t border-[#2a2a2a] pt-3 mt-auto">
                            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest group-hover:text-gray-400 transition-colors flex items-center gap-1">
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
