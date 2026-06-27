import React, { useRef, useState } from 'react';
import { Settings, UploadCloud, Edit3, Trash2, Layers, Eye, Sun, Box, MapPin, Database, Server } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'env' | 'elements'>('elements');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const fileName = file.name.toLowerCase();
      let fileType: 'obj' | 'gltf' | 'glb' = 'obj';
      
      if (fileName.endsWith('.gltf')) fileType = 'gltf';
      if (fileName.endsWith('.glb')) fileType = 'glb';

      const finalUrl = url + '#' + file.name;

      onAddObject({
        name: file.name,
        type: fileType,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        fileUrl: finalUrl,
        fileType,
        label: file.name.split('.')[0]
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const selectedObj = state.objects.find(o => o.id === state.selectedObjectId);

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onChangeMode('live');
    }, 800);
  };

  return (
    <div className="h-full bg-black/40 backdrop-blur-md border border-white/5 flex flex-col overflow-hidden rounded-xl text-gray-200 relative">
      {isSaving && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-xs font-bold text-accent tracking-widest uppercase animate-pulse">Saving Scene...</p>
        </div>
      )}
      {/* Tabs */}
      <div className="flex border-b border-white/10 shrink-0 bg-white/5">
        <button
          className={cn(
            "flex-1 py-3 text-[11px] font-bold flex items-center justify-center gap-2 tracking-wide transition-all uppercase",
            activeTab === 'elements' 
              ? "text-accent border-b-2 border-accent bg-white/5 shadow-inner" 
              : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
          onClick={() => setActiveTab('elements')}
        >
          <UploadCloud size={14} /> Elements
        </button>
        <button
          className={cn(
            "flex-1 py-3 text-[11px] font-bold flex items-center justify-center gap-2 tracking-wide transition-all uppercase",
            activeTab === 'env' 
              ? "text-accent border-b-2 border-accent bg-white/5 shadow-inner" 
              : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
          onClick={() => setActiveTab('env')}
        >
          <Settings size={14} /> Environment
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 hide-scrollbar">
        {activeTab === 'env' ? (
          <>
            <div className="space-y-5">
              <h3 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-white/10">
                <Settings size={12} className="text-accent" /> Environment Settings
              </h3>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase">3D Object Style</label>
                <select 
                  value={state.settings.objectStyle || 'normal'}
                  onChange={(e) => onUpdateSettings({ objectStyle: e.target.value as any })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-[11px] text-white outline-none focus:border-accent transition-all"
                >
                  <option value="normal">Normal Style</option>
                  <option value="futuristic">Futuristic Style</option>
                  <option value="3tone">3Tone Style</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-[11px] font-bold text-white tracking-wide">Show Grid Layout</span>
                <input 
                  type="checkbox" 
                  checked={state.settings.showGrid}
                  onChange={(e) => onUpdateSettings({ showGrid: e.target.checked })}
                  className="accent-accent w-4 h-4 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-[11px] font-bold text-white tracking-wide">Live Data Heatmap</span>
                <input 
                  type="checkbox" 
                  checked={state.settings.showHeatmap}
                  onChange={(e) => onUpdateSettings({ showHeatmap: e.target.checked })}
                  className="accent-accent w-4 h-4 rounded cursor-pointer"
                />
              </div>

              <div className="space-y-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white flex items-center gap-1.5"><Sun size={12} className="text-accent"/> Ambient Light</span>
                  <span className="text-[10px] font-mono text-gray-400 bg-black/50 px-2 py-0.5 rounded">{state.settings.ambientLightIntensity.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="2" step="0.1"
                  value={state.settings.ambientLightIntensity}
                  onChange={(e) => onUpdateSettings({ ambientLightIntensity: parseFloat(e.target.value) })}
                  className="w-full accent-accent h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 3D Editor Tab */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-white/10">
                <UploadCloud size={12} className="text-accent" /> Build Scene
              </h3>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-white/10 hover:bg-white/20 border border-white/10 h-10 text-white rounded-lg text-[11px] font-bold tracking-wide flex items-center justify-center gap-2 transition-all"
                >
                  <UploadCloud size={14} /> Upload Custom 3D
                </button>
                <input 
                  type="file" 
                  accept=".obj,.gltf,.glb" 
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
                  className="px-4 bg-white/5 border border-white/10 h-10 text-white rounded-lg flex items-center justify-center hover:bg-white/10 transition-all group"
                  title="Add Box Primitive"
                >
                  <Box size={14} className="group-hover:scale-110 transition-transform" />
                </button>
                <button 
                  onClick={() => onAddObject({
                    name: 'IoT Node',
                    type: 'pin',
                    position: [0,1,0],
                    rotation: [0,0,0],
                    scale: [1,1,1],
                    label: 'New Node',
                    deviceCategory: 'sensor',
                    iotConfig: { endpoint: '/api/v1/sensors/data', refreshRate: 5000, metrics: ['status'] }
                  })}
                  className="px-4 bg-accent/20 border border-accent/30 h-10 text-accent rounded-lg flex items-center justify-center hover:bg-accent hover:text-white transition-all group shadow-[0_0_15px_rgba(82,197,243,0.3)]"
                  title="Add IoT Node"
                >
                  <MapPin size={14} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10 flex-1 flex flex-col">
              <h3 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Layers size={12} className="text-gray-400" /> Hierarchy
              </h3>
              
              <div className="space-y-2 flex-1 overflow-y-auto hide-scrollbar pb-2">
                {state.objects.map(obj => (
                  <div 
                    key={obj.id}
                    onClick={() => onSelectObject(obj.id)}
                    className={cn(
                      "flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-all group",
                      obj.id === state.selectedObjectId 
                        ? "bg-accent/10 border-accent/50 text-accent font-bold" 
                        : "bg-white/5 border-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10"
                    )}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={cn(
                        "w-6 h-6 rounded flex items-center justify-center shrink-0",
                        obj.id === state.selectedObjectId ? "bg-accent/20" : "bg-black/40 text-gray-400 group-hover:text-white"
                      )}>
                        {obj.type === 'obj' ? <Layers size={12}/> : obj.type === 'pin' ? <MapPin size={12} /> : <Box size={12} />}
                      </div>
                      <span className="truncate tracking-wide">{obj.name}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveObject(obj.id);
                      }}
                      className="text-gray-500 hover:text-red-400 transition-colors p-1.5 rounded hover:bg-white/10 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                {state.objects.length === 0 && (
                  <div className="text-[11px] text-gray-500 text-center py-8 font-medium border border-dashed border-white/10 rounded-lg">
                    Scene is empty. Add elements above.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10 shrink-0">
        <button
          onClick={handleSave}
          className="w-full bg-accent hover:bg-accent/90 text-black h-10 rounded-lg text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(82,197,243,0.3)] transition-all flex items-center justify-center gap-2"
        >
          <Settings size={14} /> Save & Exit Editor
        </button>
      </div>
    </div>
  );
}
