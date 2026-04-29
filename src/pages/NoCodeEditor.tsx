import React, { useState, useCallback, useRef } from 'react';
import { Play, Save, Settings, Video, BrainCircuit, Server, Search, MousePointer2, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
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
  const glowClass = selected ? 'shadow-[0_0_20px_rgba(255,255,255,0.1)] ring-2 ring-white/50' : isProcessor ? 'shadow-[0_0_15px_rgba(82,197,243,0.05)]' : isSource ? 'shadow-blue-500/5' : isSink ? 'shadow-green-500/5' : 'shadow-[0_0_15px_rgba(236,50,146,0.05)]';

  return (
    <div className={cn(`w-52 bg-gray-50/50 dark:bg-[#1a1a1a] border-2 rounded-xl flex flex-col transition-all cursor-move`, glowClass, borderColorClass)}>
       {!isSource && <Handle type="target" position={Position.Left} className={cn(`!w-3.5 !h-3.5 !bg-gray-50 dark:bg-[#111] !border-2 !rounded-full !-ml-[9px]`, borderColorClass)} />}
       <div className="bg-gray-50 dark:bg-[#111] p-2.5 border-b border-gray-200 dark:border-[#222] rounded-t-xl flex justify-between items-center group">
           <span className="text-[11px] font-bold text-gray-900 dark:text-white flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${colorClass}`}></div> {data.label}
           </span>
           <Settings size={12} className="text-gray-500 cursor-pointer hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
       </div>
       <div className="p-3 bg-gray-50/50 dark:bg-[#1a1a1a] rounded-b-xl flex-1 flex flex-col justify-center">
           {data.subLabel && <div className="text-[10px] text-gray-500 font-mono truncate uppercase tracking-widest font-black">{data.subLabel}</div>}
           {data.details?.map((d: string, i: number) => <div key={i} className="text-[10px] text-gray-600 dark:text-gray-400 font-medium">{d}</div>)}
           {data.muted?.map((d: string, i: number) => <div key={i} className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-widest font-black">{d}</div>)}
       </div>
       {!isSink && <Handle type="source" position={Position.Right} className={cn(`!w-3.5 !h-3.5 !bg-gray-50 dark:bg-[#111] !border-2 !rounded-full !-mr-[9px]`, borderColorClass)} />}
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
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

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
    <main className="flex-1 overflow-hidden bg-gray-50 dark:bg-[#161616] flex flex-col text-gray-800 dark:text-gray-200">
      {/* Header Toolbar */}
      <div className="h-[60px] border-b border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#161616] flex items-center justify-between px-6 shrink-0 z-20">
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
          <button className="flex items-center gap-2 bg-gray-50/50 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#202020] text-gray-600 dark:text-gray-400 hover:text-white border border-gray-200 dark:border-[#222] h-[32px] rounded-lg text-xs font-bold px-4 transition-colors">
            <Save size={14} /> Save Pipeline
          </button>
          <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-black h-[32px] rounded-lg text-xs font-bold px-5 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)]">
            <Play size={14} className="fill-black" /> Deploy
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Nodes Palette */}
        <div className="w-64 border-r border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#161616] flex flex-col shrink-0 z-10">
          <div className="p-4 border-b border-gray-200 dark:border-[#222]">
             <div className="bg-gray-50 dark:bg-[#111] px-3 py-2 rounded-lg border border-gray-200 dark:border-[#222] flex items-center gap-2 focus-within:border-accent/50 transition-all">
                <Search className="text-gray-500" size={14} />
                <input type="text" placeholder="Search blocks..." className="bg-transparent outline-none text-xs font-medium text-gray-800 dark:text-gray-200 w-full placeholder-gray-600" />
             </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div>
                  <h3 className="text-[10px] font-black text-gray-500 mb-3 flex items-center gap-1.5 uppercase tracking-widest"><Video size={12}/> Sources</h3>
                  <div className="space-y-2">
                      <div onDragStart={(event) => onDragStart(event, 'sourceNode', 'RTSP Stream')} draggable className="bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:border-gray-500 p-2.5 rounded-lg cursor-grab flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div> RTSP Stream
                      </div>
                      <div onDragStart={(event) => onDragStart(event, 'sourceNode', 'Video File')} draggable className="bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:border-gray-500 p-2.5 rounded-lg cursor-grab flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div> Video File
                      </div>
                  </div>
              </div>
              <div>
                  <h3 className="text-[10px] font-black text-gray-500 mb-3 flex items-center gap-1.5 uppercase tracking-widest"><BrainCircuit size={12}/> Processors</h3>
                  <div className="space-y-2">
                      <div onDragStart={(event) => onDragStart(event, 'processorNode', 'YOLOv8 Detection')} draggable className="bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:border-gray-500 p-2.5 rounded-lg cursor-grab flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-accent"></div> YOLOv8 Detection
                      </div>
                      <div onDragStart={(event) => onDragStart(event, 'processorNode', 'DeepSORT Tracker')} draggable className="bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:border-gray-500 p-2.5 rounded-lg cursor-grab flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-accent"></div> DeepSORT Tracker
                      </div>
                      <div onDragStart={(event) => onDragStart(event, 'logicNode', 'Line Region Logic')} draggable className="bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:border-gray-500 p-2.5 rounded-lg cursor-grab flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-secondary"></div> Line Region Logic
                      </div>
                  </div>
              </div>
              <div>
                  <h3 className="text-[10px] font-black text-gray-500 mb-3 flex items-center gap-1.5 uppercase tracking-widest"><Server size={12}/> Sinks</h3>
                  <div className="space-y-2">
                      <div onDragStart={(event) => onDragStart(event, 'sinkNode', 'Webhook Event')} draggable className="bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:border-gray-500 p-2.5 rounded-lg cursor-grab flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
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
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                    fitView
                    className="bg-gray-50 dark:bg-[#161616]"
                    colorMode="dark"
                >
                    <Background color="#2a2a2a" gap={24} size={2} />
                    <Controls className="bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] fill-white" />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
      </div>
    </main>
  );
};

