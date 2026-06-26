export interface SceneObject {
  id: string;
  name: string;
  type: 'box' | 'obj' | 'pin';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  objUrl?: string; // the blob URL for loaded obj
  label?: string; // The label added to the object
  deviceCategory?: string; // Category like 'cctv', 'sensor', 'router'
  metadata?: {
    manufacturer?: string;
    modelNumber?: string;
    status?: 'online' | 'offline' | 'maintenance';
    installationDate?: string;
  };
  iotConfig?: {
    endpoint?: string;
    refreshRate?: number;
    metrics?: string[];
  };
}

export type UsecaseCategory = 'office' | 'machine' | 'tower';

export interface VisualizerState {
  objects: SceneObject[];
  mode: 'live' | 'edit';
  selectedObjectId: string | null;
  useCase: UsecaseCategory;
  settings: {
    showGrid: boolean;
    showHeatmap: boolean;
    ambientLightIntensity: number;
    directionalLightIntensity: number;
  };
}
