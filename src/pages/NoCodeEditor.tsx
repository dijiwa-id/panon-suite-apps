import React, { useState, useCallback, useRef } from 'react';
import { Play, Save, Settings, Video, BrainCircuit, Server, Search, MousePointer2, Plus, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  ReactFlowProvider,
  Connection,
  Edge,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const CustomNode = ({ data, type, selected }: { data: any, type: string, selected?: boolean }) => {
  const isSource = type === 'sourceNode';
  const isSink = type === 'sinkNode';
  const isProcessor = type === 'processorNode';
  const colorClass = isSource ? 'bg-blue-500' : isSink ? 'bg-green-500' : isProcessor ? 'bg-accent' : 'bg-secondary';
  const borderColorClass = isSource ? 'border-blue-500' : isSink ? 'border-green-500' : isProcessor ? 'border-accent' : 'border-secondary';
  const glowClass = selected ? 'shadow-md ring-2 ring-gray-400 dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] dark:ring-white/50' : isProcessor ? 'shadow-sm dark:shadow-[0_0_15px_rgba(82,197,243,0.05)]' : isSource ? 'shadow-sm' : isSink ? 'shadow-sm' : 'shadow-sm dark:shadow-[0_0_15px_rgba(236,50,146,0.05)]';

   return (
    <div className={cn(`w-52 bg-white dark:bg-[#1a1a1a] border-2 rounded-xl flex flex-col transition-all cursor-move`, glowClass, borderColorClass)}>
       {!isSource && <Handle type="target" position={Position.Left} className={cn(`!w-3.5 !h-3.5 !bg-white dark:!bg-[#111] !border-2 !rounded-full !-ml-[9px]`, borderColorClass)} />}
       <div className="bg-gray-50 dark:bg-[#111] p-2.5 border-b border-gray-100 dark:border-[#222] rounded-t-xl flex justify-between items-center group">
           <span className="text-[11px] font-bold text-gray-800 dark:text-white flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${colorClass}`}></div> {data.label}
           </span>
           <Settings size={12} className="text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
       </div>
       <div className="p-3 bg-white dark:bg-[#1a1a1a] rounded-b-xl flex-1 flex flex-col justify-center gap-0.5">
           {data.subLabel && <div className="text-[10px] text-gray-500 dark:text-gray-500 font-mono truncate uppercase tracking-widest font-black mb-1">{data.subLabel}</div>}
           {data.details?.map((d: string, i: number) => <div key={i} className="text-[10px] text-gray-600 dark:text-gray-400 font-medium">{d}</div>)}
           {data.muted?.map((d: string, i: number) => <div key={i} className="text-[10px] text-gray-400 dark:text-gray-500 font-mono mt-1 uppercase tracking-widest font-black">{d}</div>)}
       </div>
       {!isSink && <Handle type="source" position={Position.Right} className={cn(`!w-3.5 !h-3.5 !bg-white dark:!bg-[#111] !border-2 !rounded-full !-mr-[9px]`, borderColorClass)} />}
    </div>
  );
};

const nodeTypes = {
  sourceNode: CustomNode,
  processorNode: CustomNode,
  logicNode: CustomNode,
  sinkNode: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: 'node-1',
    type: 'sourceNode',
    position: { x: 100, y: 150 },
    data: { label: 'RTSP Stream', subLabel: 'rtsp://10.0.../stream' },
  },
  {
    id: 'node-2',
    type: 'processorNode',
    position: { x: 400, y: 150 },
    data: { label: 'YOLOv8 Detection', details: ['Model: Security-v1.4'], muted: ['Conf: 0.8 / NMS: 0.4'] },
  },
  {
    id: 'node-3',
    type: 'logicNode',
    position: { x: 700, y: 300 },
    data: { label: 'Region Logic', details: ['Type: Intrusion'] },
  },
];

const initialEdges: Edge[] = [
  { id: 'edge-1', source: 'node-1', target: 'node-2', animated: true, style: { stroke: '#52C5F3', strokeWidth: 2 } },
  { id: 'edge-2', source: 'node-2', target: 'node-3', animated: true, style: { stroke: '#EC3292', strokeWidth: 2 } },
];

export const NoCodeEditor = () => {
  const { theme } = useTheme();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const updateNodeData = (key: string, value: any) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === selectedNodeId) {
          // Additional handling for sync fields if needed
          let additionalData = {};
          if (key === 'url') {
            additionalData = { subLabel: value };
          }
          if (key === 'confThreshold') {
             const currentMuted = Array.isArray(n.data.muted) ? n.data.muted : [];
             // Replace conf text if it exists
             additionalData = { muted: [`Conf: ${value}`, ...currentMuted.filter((m: string) => !m.startsWith('Conf:'))] };
          }
          if (key === 'modelPath') {
             additionalData = { details: [`Model: ${value}`] };
          }
          
          return {
            ...n,
            data: {
              ...n.data,
              [key]: value,
               ...additionalData,
            },
          };
        }
        return n;
      })
    );
  };

  const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const renderNodeConfig = () => {
    if (!selectedNode) return null;
    const { type, data } = selectedNode;

    return (
      <>
        <div className="space-y-3">
           <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Block Name</label>
           <input type="text" value={data.label || ''} onChange={(e) => updateNodeData('label', e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-[8px] px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-[#52C5F3] dark:focus:border-[#52C5F3] transition-colors shadow-sm" />
        </div>

        {type === 'sourceNode' && (
          <>
            <div className="space-y-3">
               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Stream URL / Path</label>
               <input type="text" value={data.url || data.subLabel || ''} onChange={(e) => updateNodeData('url', e.target.value)} placeholder="rtsp://..." className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-[8px] px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-[#52C5F3] dark:focus:border-[#52C5F3] transition-colors shadow-sm font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Frame Rate</label>
                  <select value={data.fps || '15'} onChange={(e) => updateNodeData('fps', e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-[8px] px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-[#52C5F3] dark:focus:border-[#52C5F3] transition-colors shadow-sm cursor-pointer">
                      <option value="15">15 FPS</option>
                      <option value="30">30 FPS</option>
                      <option value="60">60 FPS</option>
                  </select>
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Resolution</label>
                  <select value={data.resolution || '1080p'} onChange={(e) => updateNodeData('resolution', e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-[8px] px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-[#52C5F3] dark:focus:border-[#52C5F3] transition-colors shadow-sm cursor-pointer">
                      <option value="720p">720p</option>
                      <option value="1080p">1080p</option>
                      <option value="4k">4K (2160p)</option>
                  </select>
               </div>
            </div>
          </>
        )}

        {type === 'processorNode' && (
          <>
            <div className="space-y-3">
               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Model Selection/Path</label>
               <input type="text" value={data.modelPath || ''} onChange={(e) => updateNodeData('modelPath', e.target.value)} placeholder="e.g. models/yolov8_custom.pt" className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-[8px] px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-[#52C5F3] dark:focus:border-[#52C5F3] transition-colors shadow-sm" />
            </div>
            <div className="space-y-3">
               <div className="flex justify-between items-center bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-[#222] p-3 rounded-[8px]">
                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Conf. Threshold</label>
                   <span className="text-xs font-bold text-[#52C5F3] bg-[#52C5F3]/10 px-2 py-0.5 rounded-full">{data.confThreshold || 0.8}</span>
               </div>
               <input type="range" min="0.1" max="1.0" step="0.05" value={data.confThreshold || 0.8} onChange={(e) => updateNodeData('confThreshold', e.target.value)} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-[#52C5F3]" />
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Target Classes</label>
               <input type="text" value={data.classes || ''} onChange={(e) => updateNodeData('classes', e.target.value)} placeholder="person, car, truck..." className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-[8px] px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-[#52C5F3] dark:focus:border-[#52C5F3] transition-colors shadow-sm" />
               <p className="text-[10px] text-gray-400">Leave empty to use all model default classes.</p>
            </div>
          </>
        )}

        {type === 'sinkNode' && (
          <>
            <div className="space-y-3">
               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Output Protocol</label>
               <select value={data.sinkType || 'webhook'} onChange={(e) => updateNodeData('sinkType', e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-[8px] px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-[#52C5F3] dark:focus:border-[#52C5F3] transition-colors shadow-sm cursor-pointer">
                   <option value="webhook">Webhook (HTTP POST)</option>
                   <option value="mqtt">MQTT Publisher</option>
                   <option value="webrtc">WebRTC Stream</option>
               </select>
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Endpoint / Topic URL</label>
               <input type="text" value={data.endpoint || ''} onChange={(e) => updateNodeData('endpoint', e.target.value)} placeholder="https://..." className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-[8px] px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-[#52C5F3] dark:focus:border-[#52C5F3] transition-colors shadow-sm font-mono" />
            </div>
          </>
        )}

        {type === 'logicNode' && (
           <>
             <div className="space-y-3">
               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Rule Type</label>
               <select value={data.logicType || 'intrusion'} onChange={(e) => updateNodeData('logicType', e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-[8px] px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-[#52C5F3] dark:focus:border-[#52C5F3] transition-colors shadow-sm cursor-pointer">
                   <option value="line_cross">Line Crossing</option>
                   <option value="intrusion">Region Intrusion</option>
                   <option value="loitering">Loitering Detection</option>
               </select>
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Zone Coordinates</label>
               <input type="text" value={data.coordinates || ''} onChange={(e) => updateNodeData('coordinates', e.target.value)} placeholder="[[x1, y1], [x2, y2]...]" className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-[8px] px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-[#52C5F3] dark:focus:border-[#52C5F3] transition-colors shadow-sm font-mono" />
            </div>
           </>
        )}
      </>
    )
  }

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges],
  );

  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/reactflow-label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/reactflow-label');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      
      const newNode: Node = {
        id: `dndnode_${Math.random()}`,
        type,
        position,
        data: { label, details: ['Configure block'] },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  return (
    <main className="flex-1 overflow-hidden bg-transparent flex flex-col text-gray-800 dark:text-gray-200">
      {/* Header Toolbar */}
      <div className="h-[60px] border-b border-gray-200 dark:border-[#222] bg-white dark:bg-[#161616] flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(82,197,243,0.8)]"></span>
                Main Gate Security Pipeline
            </h1>
            <p className="text-[10px] text-gray-500 font-mono mt-0.5 uppercase tracking-widest font-black">draft-mode • unsaved changes</p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <button className="flex items-center gap-2 bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#202020] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-[#222] h-[32px] rounded-lg text-xs font-bold px-4 transition-colors shadow-sm">
            <Save size={14} /> Save Pipeline
          </button>
          <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-black h-[32px] rounded-lg text-xs font-bold px-5 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)]">
            <Play size={14} className="fill-black" /> Deploy
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Nodes Palette */}
        <div className="w-64 border-r border-gray-200 dark:border-[#222] bg-white dark:bg-[#161616] flex flex-col shrink-0 z-10">
          <div className="p-4 border-b border-gray-200 dark:border-[#222]">
             <div className="bg-white dark:bg-[#151515] px-4 py-2 rounded-xl border border-gray-200 dark:border-[#222] flex items-center gap-2 focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all shadow-sm">
                <Search className="text-gray-400 dark:text-gray-400" size={16} />
                <input type="text" placeholder="Search blocks..." className="bg-transparent outline-none text-xs font-medium text-gray-800 dark:text-gray-200 w-full placeholder-gray-400 dark:placeholder-gray-600" />
             </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              <div>
                  <h3 className="text-[10px] font-black text-gray-500 mb-3 flex items-center gap-1.5 uppercase tracking-widest"><Video size={12}/> Sources</h3>
                  <div className="space-y-2">
                      <div onDragStart={(event) => onDragStart(event, 'sourceNode', 'RTSP Stream')} draggable className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:border-gray-500 p-2.5 rounded-lg cursor-grab flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div> RTSP Stream
                      </div>
                      <div onDragStart={(event) => onDragStart(event, 'sourceNode', 'Video File')} draggable className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:border-gray-500 p-2.5 rounded-lg cursor-grab flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div> Video File
                      </div>
                  </div>
              </div>
              <div>
                  <h3 className="text-[10px] font-black text-gray-500 mb-3 flex items-center gap-1.5 uppercase tracking-widest"><BrainCircuit size={12}/> Processors</h3>
                  <div className="space-y-2">
                      <div onDragStart={(event) => onDragStart(event, 'processorNode', 'YOLOv8 Detection')} draggable className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:border-gray-500 p-2.5 rounded-lg cursor-grab flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-accent"></div> YOLOv8 Detection
                      </div>
                      <div onDragStart={(event) => onDragStart(event, 'processorNode', 'DeepSORT Tracker')} draggable className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:border-gray-500 p-2.5 rounded-lg cursor-grab flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-accent"></div> DeepSORT Tracker
                      </div>
                      <div onDragStart={(event) => onDragStart(event, 'logicNode', 'Line Region Logic')} draggable className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:border-gray-500 p-2.5 rounded-lg cursor-grab flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-secondary"></div> Line Region Logic
                      </div>
                  </div>
              </div>
              <div>
                  <h3 className="text-[10px] font-black text-gray-500 mb-3 flex items-center gap-1.5 uppercase tracking-widest"><Server size={12}/> Sinks</h3>
                  <div className="space-y-2">
                      <div onDragStart={(event) => onDragStart(event, 'sinkNode', 'Webhook Event')} draggable className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:border-gray-500 p-2.5 rounded-lg cursor-grab flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div> Webhook Event
                      </div>
                  </div>
              </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 relative bg-gray-50 dark:bg-[#161616] overflow-hidden" ref={reactFlowWrapper}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeDoubleClick={onNodeDoubleClick}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                    fitView
                    className="bg-gray-50 dark:bg-[#161616]"
                    colorMode={theme}
                >
                    <Background color={theme === 'dark' ? '#2a2a2a' : '#e5e7eb'} gap={24} size={2} />
                    <Controls className="bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222]" />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
      </div>

      {/* Editor Modal Overlay */}
      {selectedNode && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-[11px] w-full max-w-[380px] border border-gray-200 dark:border-[#2a2a2a] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 dark:border-[#222] bg-gray-50 dark:bg-[#161616] flex justify-between items-center shrink-0">
               <div className="flex items-center gap-3">
                   <div className={cn(
                       "w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0",
                       selectedNode.type === 'sourceNode' ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" :
                       selectedNode.type === 'processorNode' ? "bg-accent/10 text-accent border border-accent/20" :
                       selectedNode.type === 'logicNode' ? "bg-secondary/10 text-secondary border border-secondary/20" :
                       "bg-green-500/10 text-green-500 border border-green-500/20"
                   )}>
                       {selectedNode.type === 'sourceNode' ? <Video size={16} /> :
                        selectedNode.type === 'processorNode' ? <BrainCircuit size={16} /> :
                        selectedNode.type === 'logicNode' ? <Settings size={16} /> :
                        <Server size={16} />}
                   </div>
                   <div>
                     <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1">Configuration</h3>
                     <p className="text-[9px] text-gray-500 font-mono uppercase tracking-widest font-black leading-none">{selectedNode.type.replace('Node', '')}</p>
                   </div>
               </div>
               <button onClick={() => setSelectedNodeId(null)} className="p-1.5 rounded-[8px] text-gray-400 hover:text-gray-900 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm dark:hover:text-white dark:hover:bg-[#252525] dark:hover:border-[#333] transition-all">
                  <X size={16} />
               </button>
            </div>
            
            {/* Content */}
            <div className="p-5 space-y-6 flex-1 overflow-y-auto w-full custom-scrollbar">
               {renderNodeConfig()}
            </div>
            
            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-100 dark:border-[#222] bg-gray-50/50 dark:bg-[#161616] flex justify-end shrink-0">
               <button onClick={() => setSelectedNodeId(null)} className="bg-[#1c1c1c] border border-gray-700 h-8 flex items-center text-white rounded-full text-xs font-bold tracking-wide px-6 hover:bg-[#2a2a2a] transition-colors shadow-sm">
                  Apply Changes
               </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

