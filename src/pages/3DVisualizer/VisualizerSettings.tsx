import React, { useRef } from 'react';
import { Settings, UploadCloud, Edit3, Trash2, Layers, Eye, Sun, Box, MapPin, Database, Server } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { VisualizerState, SceneObject, UsecaseCategory } from './types';
import { cn } from '../../lib/utils';

interface VisualizerSettingsProps {
  state: VisualizerState;
  onUpdateSettings: (settings: Partial<VisualizerState['settings']>) => void;
  onUpdateUseCase: (useCase: UsecaseCategory) => void;
  onAddObject: (obj: Omit<SceneObject, 'id'>) => void;
  onUpdateObject: (id: string, updates: Partial<SceneObject>) => void;
  onRemoveObject: (id: string) => void;
  onSelectObject: (id: string | null) => void;
  onChangeMode: (mode: 'live' | 'edit') => void;
}

export default function VisualizerSettings({
  state,
  onUpdateSettings,
  onUpdateUseCase,
  onAddObject,
  onUpdateObject,
  onRemoveObject,
  onSelectObject,
  onChangeMode,
}: VisualizerSettingsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onAddObject({
        name: file.name,
        type: 'obj',
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        objUrl: url,
        label: 'New Object'
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const selectedObj = state.objects.find(o => o.id === state.selectedObjectId);

  return (
    <div className="h-full bg-white/70 dark:bg-[#1e1e1e]/70 border-none shadow-none flex flex-col overflow-hidden rounded-[16px]">
      {/* Tabs */}
      <div className="flex border-b border-gray-200/50 dark:border-white/10 shrink-0">
        <button
          className={cn(
            "flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 tracking-tight transition-colors",
            state.mode === 'live' 
              ? "text-[#7c3aed] border-b-2 border-[#7c3aed]" 
              : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
          )}
          onClick={() => onChangeMode('live')}
        >
          <Eye size={14} /> Live View Settings
        </button>
        <button
          className={cn(
            "flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 tracking-tight transition-colors",
            state.mode === 'edit' 
              ? "text-[#7c3aed] border-b-2 border-[#7c3aed]" 
              : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
          )}
          onClick={() => onChangeMode('edit')}
        >
          <Edit3 size={14} /> 3D Editor
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {state.mode === 'live' ? (
          <>
            <div className="space-y-4">
              <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <Settings size={12} /> Environment
              </h3>
              
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Use Case View</label>
                <select 
                  value={state.useCase}
                  onChange={(e) => onUpdateUseCase(e.target.value as UsecaseCategory)}
                  className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#333] rounded-[6px] px-3 py-2 text-xs text-gray-900 dark:text-white outline-none focus:border-[#7c3aed]"
                >
                  <option value="office">Office 3D Floorplan</option>
                  <option value="machine">Machine Map</option>
                  <option value="tower">Tower Map 3D</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Show Grid</span>
                <input 
                  type="checkbox" 
                  checked={state.settings.showGrid}
                  onChange={(e) => onUpdateSettings({ showGrid: e.target.checked })}
                  className="accent-[#7c3aed]"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Show Heatmap Data</span>
                <input 
                  type="checkbox" 
                  checked={state.settings.showHeatmap}
                  onChange={(e) => onUpdateSettings({ showHeatmap: e.target.checked })}
                  className="accent-[#7c3aed]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1"><Sun size={12}/> Ambient Light</span>
                  <span className="text-xs text-gray-400">{state.settings.ambientLightIntensity.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="2" step="0.1"
                  value={state.settings.ambientLightIntensity}
                  onChange={(e) => onUpdateSettings({ ambientLightIntensity: parseFloat(e.target.value) })}
                  className="w-full accent-[#7c3aed]"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 3D Editor Tab */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <UploadCloud size={12} /> Elements
              </h3>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-[#1c1c1c] border border-gray-700 h-8 text-white rounded-[6px] text-xs font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-[#2a2a2a] transition-colors"
                >
                  <UploadCloud size={14} /> Upload .OBJ
                </button>
                <input 
                  type="file" 
                  accept=".obj" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <button 
                  onClick={() => onAddObject({
                    name: 'Primitive Box',
                    type: 'box',
                    position: [0,0,0],
                    rotation: [0,0,0],
                    scale: [1,1,1],
                    label: 'Box'
                  })}
                  className="px-3 bg-gray-100 dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 h-8 text-gray-900 dark:text-white rounded-[6px] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#333] transition-colors"
                  title="Add Box Primitive"
                >
                  <Box size={14} />
                </button>
                <button 
                  onClick={() => onAddObject({
                    name: 'IoT Pin',
                    type: 'pin',
                    position: [0,1,0],
                    rotation: [0,0,0],
                    scale: [1,1,1],
                    label: 'New Pin',
                    deviceCategory: 'sensor',
                    iotConfig: { endpoint: '/api/v1/sensors/temp', refreshRate: 5000, metrics: ['temperature', 'humidity'] }
                  })}
                  className="px-3 bg-[#7c3aed]/10 border border-[#7c3aed]/20 h-8 text-[#7c3aed] rounded-[6px] flex items-center justify-center hover:bg-[#7c3aed]/20 transition-colors"
                  title="Add Pin Point"
                >
                  <MapPin size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <Layers size={12} /> Object Hierarchy
              </h3>
              
              <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                {state.objects.map(obj => (
                  <div 
                    key={obj.id}
                    onClick={() => onSelectObject(obj.id)}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-[6px] border text-xs cursor-pointer transition-colors",
                      obj.id === state.selectedObjectId 
                        ? "bg-[#7c3aed]/10 border-[#7c3aed] text-[#7c3aed] font-bold" 
                        : "bg-gray-50 dark:bg-[#252525]/50 border-gray-100 dark:border-[#222] text-gray-600 dark:text-gray-300 hover:border-[#7c3aed]/50"
                    )}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {obj.type === 'obj' ? <Layers size={12}/> : obj.type === 'pin' ? <MapPin size={12} /> : <Box size={12} />}
                      <span className="truncate">{obj.name}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveObject(obj.id);
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                {state.objects.length === 0 && (
                  <div className="text-xs text-gray-500 text-center py-4 italic">No objects in scene</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
