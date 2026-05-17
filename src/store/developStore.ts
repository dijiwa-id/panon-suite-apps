import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

export interface Block {
  id: string;
  name: string;
  desc: string;
  version: string;
  type: 'sourceNode' | 'processorNode' | 'logicNode' | 'sinkNode';
  category: 'Sources' | 'Vision AI Processors' | 'Logic & Analytics' | 'Output & Integration';
}

export interface Pipeline {
  id: string;
  name: string;
  nodes: any[];
  edges: any[];
  updatedAt: string;
}

export interface Application {
  id: string;
  name: string;
  desc: string;
  status: 'running' | 'stopped';
  type: string;
  nodesCount: number;
  uptime: string;
  endpoint: string;
  pipelineId: string;
  inputStream: string;
  computeTarget: string;
}

interface DevelopState {
  blocks: Block[];
  addBlock: (block: Omit<Block, 'id'>) => void;
  pipelines: Pipeline[];
  savePipeline: (pipeline: Omit<Pipeline, 'id' | 'updatedAt'>) => void;
  applications: Application[];
  addApplication: (app: Omit<Application, 'id' | 'status' | 'uptime' | 'endpoint' | 'nodesCount'>) => void;
  toggleApplicationStatus: (id: string) => void;
  activePipelineId: string | null;
  setActivePipelineId: (id: string | null) => void;
}

const defaultBlocks: Block[] = [
  { id: 'b1', name: 'RTSP Stream', desc: 'Connect to live IP cameras via RTSP protocol.', version: '1.0.2', type: 'sourceNode', category: 'Sources' },
  { id: 'b2', name: 'Video File', desc: 'Upload or link an MP4/MKV video for batch processing.', version: '1.1.0', type: 'sourceNode', category: 'Sources' },
  { id: 'b3', name: 'Image Sequence', desc: 'Process a sequence of images frame by frame.', version: '1.0.0', type: 'sourceNode', category: 'Sources' },
  
  { id: 'b4', name: 'YOLOv8 Detection', desc: 'High-performance object detection using ONNX.', version: '2.3.1', type: 'processorNode', category: 'Vision AI Processors' },
  { id: 'b5', name: 'ResNet Classifier', desc: 'Image classification and feature extraction.', version: '1.4.0', type: 'processorNode', category: 'Vision AI Processors' },
  { id: 'b6', name: 'DeepSORT Tracker', desc: 'Multi-object tracking across sequential frames.', version: '2.0.0', type: 'processorNode', category: 'Vision AI Processors' },
  { id: 'b7', name: 'ALPR Engine', desc: 'License plate extraction and character recognition.', version: '3.1.2', type: 'processorNode', category: 'Vision AI Processors' },
  
  { id: 'b8', name: 'Line Crossing', desc: 'Trigger events when objects cross defined virtual lines.', version: '1.0.5', type: 'logicNode', category: 'Logic & Analytics' },
  { id: 'b9', name: 'Region Intrusion', desc: 'Detect presence inside a defined polygon ROI.', version: '1.2.0', type: 'logicNode', category: 'Logic & Analytics' },
  { id: 'b10', name: 'Dwell Timer', desc: 'Measure how long an object stays within an area.', version: '1.0.1', type: 'logicNode', category: 'Logic & Analytics' },
  
  { id: 'b11', name: 'Webhook Dispatcher', desc: 'Send JSON payloads via HTTP POST on events.', version: '2.1.0', type: 'sinkNode', category: 'Output & Integration' },
  { id: 'b12', name: 'PostgreSQL Sink', desc: 'Store structured event data directly to DB.', version: '1.0.3', type: 'sinkNode', category: 'Output & Integration' },
  { id: 'b13', name: 'Kafka Producer', desc: 'Stream analytics events to a Kafka topic.', version: '1.5.0', type: 'sinkNode', category: 'Output & Integration' },
];

const defaultPipelines: Pipeline[] = [
  {
    id: 'p1',
    name: 'Main Gate Security Pipeline',
    nodes: [
      { id: 'node-1', type: 'sourceNode', position: { x: 100, y: 150 }, data: { label: 'RTSP Stream', subLabel: 'rtsp://10.0.../stream' } },
      { id: 'node-2', type: 'processorNode', position: { x: 400, y: 150 }, data: { label: 'YOLOv8 Detection', details: ['Model: Security-v1.4'], muted: ['Conf: 0.8 / NMS: 0.4'] } },
      { id: 'node-3', type: 'logicNode', position: { x: 700, y: 300 }, data: { label: 'Region Intrusion', details: ['Type: Intrusion'] } },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2', animated: true, style: { stroke: '#52C5F3', strokeWidth: 2 } },
      { id: 'edge-2', source: 'node-2', target: 'node-3', animated: true, style: { stroke: '#EC3292', strokeWidth: 2 } },
    ],
    updatedAt: new Date().toISOString()
  }
];

const defaultApplications: Application[] = [
  { id: 'APP-01', name: 'Main Gate Security Tracker', desc: 'Main gate intrusion and detection', status: 'running', type: 'Intrusion Detection', nodesCount: 3, uptime: '14d 2h', endpoint: '/api/v1/gate-alerts', pipelineId: 'p1', inputStream: 'Cam-01 (Main Gate)', computeTarget: 'Edge Node Alpha' },
  { id: 'APP-02', name: 'Lobby Face Authentication', desc: 'Face recognition logic for lobby', status: 'running', type: 'Face Recognition', nodesCount: 4, uptime: '32d 5h', endpoint: '/api/v1/faces', pipelineId: 'p1', inputStream: 'Cam-02 (Lobby Entrance)', computeTarget: 'Cloud Cluster' },
  { id: 'APP-03', name: 'Parking Lot Monitor', desc: 'ALPR scanning', status: 'stopped', type: 'ALPR & Counting', nodesCount: 5, uptime: '-', endpoint: '-', pipelineId: 'p1', inputStream: 'Cam-03 (Perimeter North)', computeTarget: 'Edge Node Alpha' },
];

export const useDevelopStore = create<DevelopState>()(
  persist(
    (set) => ({
      blocks: defaultBlocks,
      pipelines: defaultPipelines,
      applications: defaultApplications,
      activePipelineId: null,

      addBlock: (block) => set((state) => ({
        blocks: [...state.blocks, { ...block, id: `b-${Date.now()}` }]
      })),

      savePipeline: (pipeline) => set((state) => {
        const existing = state.pipelines.find(p => p.name === pipeline.name);
        const now = new Date().toISOString();
        
        if (existing) {
          toast.success("Pipeline updated successfully");
          return {
            pipelines: state.pipelines.map(p => p.id === existing.id ? { ...p, ...pipeline, updatedAt: now } : p)
          };
        } else {
          const newId = `p-${Date.now()}`;
          toast.success("Pipeline created successfully");
          return {
            pipelines: [...state.pipelines, { ...pipeline, id: newId, updatedAt: now }]
          };
        }
      }),

      addApplication: (app) => set((state) => {
        const pipeline = state.pipelines.find(p => p.id === app.pipelineId);
        
        const newApp: Application = {
          ...app,
          id: `APP-0${state.applications.length + 1}`,
          status: 'stopped',
          uptime: '-',
          endpoint: `/api/v1/app-${Date.now().toString().slice(-4)}`,
          nodesCount: pipeline ? pipeline.nodes.length : 0,
        };
        
        return {
          applications: [newApp, ...state.applications]
        };
      }),

      toggleApplicationStatus: (id) => set((state) => ({
        applications: state.applications.map(app => 
          app.id === id 
            ? { ...app, status: app.status === 'running' ? 'stopped' : 'running', uptime: app.status === 'stopped' ? '0d 0h' : '-' } 
            : app
        )
      })),

      setActivePipelineId: (id) => set({ activePipelineId: id })
    }),
    {
      name: 'panon-develop-storage',
    }
  )
);
