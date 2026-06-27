export interface SceneObject {
  id: string;
  name: string;
  type: 'box' | 'obj' | 'gltf' | 'glb' | 'pin';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  objUrl?: string; // deprecated
  fileUrl?: string;
  fileType?: 'obj' | 'gltf' | 'glb';
  label?: string; // The label added to the object
  deviceCategory?: string; // Category like 'cctv', 'sensor', 'router'
  metadata?: {
    manufacturer?: string;
    modelNumber?: string;
    status?: 'online' | 'offline' | 'maintenance';
    installationDate?: string;
    lastMaintenance?: string;
    firmwareVersion?: string;
    ipAddress?: string;
  };
  iotConfig?: {
    endpoint?: string;
    refreshRate?: number;
    metrics?: string[];
  };
}

export type UsecaseCategory = 'office' | 'machine' | 'tower' | 'banking' | 'telco' | 'manufacturing' | 'agro';

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
    objectStyle?: 'normal' | 'futuristic' | '3tone';
  };
}
