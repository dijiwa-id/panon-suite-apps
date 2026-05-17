import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

export interface Dataset {
  id: string;
  name: string;
  type: string;
  samples: number;
  annotations: number;
  size: string;
  lastUpdated: string;
  status: 'ready' | 'annotating' | 'uploading' | 'collecting';
}

export interface TrainingJob {
  id: string;
  name: string;
  dataset: string;
  epoch: string;
  map: number;
  status: 'training' | 'completed' | 'failed';
  timeRemaining: string;
}

export interface Model {
  id: string;
  name: string;
  version: string;
  architecture: string;
  map: number;
  param: string;
  size: string;
  status: 'ready' | 'deployed' | 'investigating' | 'training';
  tags: string[];
}

interface TrainState {
  datasets: Dataset[];
  addDataset: (ds: Omit<Dataset, 'id' | 'samples' | 'annotations' | 'size' | 'lastUpdated' | 'status'>) => void;
  updateDatasetStatus: (id: string, status: Dataset['status']) => void;
  incrementDatasetSamples: (id: string, numFrames: number) => void;
  incrementDatasetAnnotations: (id: string, count: number) => void;

  trainingJobs: TrainingJob[];
  addTrainingJob: (job: Omit<TrainingJob, 'id' | 'status' | 'timeRemaining' | 'epoch' | 'map'>) => void;

  models: Model[];
}

const defaultDatasets: Dataset[] = [
  { id: 'DS-2026-001', name: 'Main Gate Vehicles', type: 'Object Detection', samples: 12500, annotations: 45000, size: '4.2 GB', lastUpdated: '2 hours ago', status: 'ready' },
  { id: 'DS-2026-002', name: 'Lobby Faces', type: 'Face Recognition', samples: 8300, annotations: 8300, size: '2.1 GB', lastUpdated: '5 hours ago', status: 'annotating' },
  { id: 'DS-2026-003', name: 'Perimeter Intrusion', type: 'Object Detection', samples: 24000, annotations: 32000, size: '8.5 GB', lastUpdated: '1 day ago', status: 'ready' },
  { id: 'DS-2026-004', name: 'Parking Lot LPR', type: 'Optical Character Recognition', samples: 5400, annotations: 6800, size: '1.2 GB', lastUpdated: '2 days ago', status: 'uploading' },
];

const defaultJobs: TrainingJob[] = [
  { id: 'TR-092', name: 'Security-Cam-YoloV8', dataset: 'Main Gate Vehicles', epoch: '45/100', map: 0.82, status: 'training', timeRemaining: '2h 15m' },
  { id: 'TR-091', name: 'Lobby-Face-ResNet', dataset: 'Lobby Faces', epoch: '100/100', map: 0.94, status: 'completed', timeRemaining: '-' },
  { id: 'TR-090', name: 'Perimeter-Night', dataset: 'Perimeter Intrusion', epoch: '12/50', map: 0.45, status: 'failed', timeRemaining: '-' },
];

const defaultModels: Model[] = [
  { id: 'MOD-2026-001', name: 'Security-Cam-YoloV8', version: 'v1.4.2', architecture: 'YOLOv8-m', map: 0.824, param: '25.9M', size: '52 MB', status: 'ready', tags: ['Object Detection', 'Security'] },
  { id: 'MOD-2026-002', name: 'Lobby-Face-ResNet', version: 'v2.0.0', architecture: 'ResNet-50', map: 0.941, param: '23.5M', size: '48 MB', status: 'ready', tags: ['Face Recognition', 'Access Control'] },
  { id: 'MOD-2026-003', name: 'Parking-LPR-DBNet', version: 'v1.1.0', architecture: 'DBNet', map: 0.892, param: '18.2M', size: '36 MB', status: 'deployed', tags: ['OCR', 'LPR'] },
  { id: 'MOD-2026-004', name: 'Perimeter-Night', version: 'v0.9.1', architecture: 'YOLOv8-s', map: 0.450, param: '11.1M', size: '22 MB', status: 'investigating', tags: ['Object Detection', 'Night Vision'] },
];

export const useTrainStore = create<TrainState>()(
  persist(
    (set) => ({
      datasets: defaultDatasets,
      trainingJobs: defaultJobs,
      models: defaultModels,

      addDataset: (ds) => set((state) => {
        const newEntry: Dataset = {
          ...ds,
          id: `DS-2026-00${state.datasets.length + 1}`,
          samples: 0,
          annotations: 0,
          size: '0 MB',
          lastUpdated: 'Just now',
          status: 'collecting'
        };
        toast.success("Dataset created successfully");
        return { datasets: [newEntry, ...state.datasets] };
      }),

      updateDatasetStatus: (id, status) => set((state) => ({
        datasets: state.datasets.map(ds => ds.id === id ? { ...ds, status } : ds)
      })),

      incrementDatasetSamples: (id, numFrames) => set((state) => ({
        datasets: state.datasets.map(ds => {
          if (ds.id === id) {
            return {
              ...ds,
              samples: ds.samples + numFrames,
              size: `${((ds.samples + numFrames) * 0.5).toFixed(1)} MB`,
              lastUpdated: 'Just now'
            }
          }
          return ds;
        })
      })),

      incrementDatasetAnnotations: (id, count) => set((state) => ({
        datasets: state.datasets.map(ds => {
          if (ds.id === id) {
            return {
              ...ds,
              annotations: ds.annotations + count,
              lastUpdated: 'Just now',
              status: 'annotating'
            }
          }
          return ds;
        })
      })),

      addTrainingJob: (job) => set((state) => {
        const newJob: TrainingJob = {
          ...job,
          id: `TR-09${state.trainingJobs.length + 3}`,
          status: 'training',
          timeRemaining: 'Calculating...',
          epoch: '0/100',
          map: 0.0
        };
        toast.success(`Training job ${newJob.name} started`);
        
        const newModel: Model = {
          id: `MOD-2026-00${state.models.length + 1}`,
          name: newJob.name,
          version: 'v1.0.0',
          architecture: 'YOLOv8-m',
          map: 0,
          param: '25.9M',
          size: '50 MB',
          status: 'training',
          tags: [newJob.dataset]
        };
        
        return {
          trainingJobs: [newJob, ...state.trainingJobs],
          models: [newModel, ...state.models]
        };
      })
    }),
    {
      name: 'panon-train-storage'
    }
  )
);
