import React, { useState, useEffect } from 'react';
import { X, MapPin, Database, Navigation, Sliders, Box, Tag, Server, CheckCircle2 } from 'lucide-react';
import { SceneObject, UsecaseCategory } from './types';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface PropertiesPopupProps {
  object: SceneObject;
  useCase: UsecaseCategory;
  onUpdate: (updates: Partial<SceneObject>) => void;
  onClose: () => void;
}

export const PropertiesPopup: React.FC<PropertiesPopupProps> = ({
  object,
  useCase,
  onUpdate,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'transform' | 'data'>('transform');

  // Helper to handle numeric array updates (pos, rot, scale)
  const handleArrayUpdate = (field: 'position' | 'rotation' | 'scale', index: number, value: string) => {
    const num = parseFloat(value) || 0;
    const newArray = [...object[field]] as [number, number, number];
    newArray[index] = num;
    onUpdate({ [field]: newArray });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      className="absolute top-6 right-6 w-[360px] bg-white/90 dark:bg-[#161616]/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl rounded-[16px] overflow-hidden pointer-events-auto z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed]">
            {object.type === 'pin' ? <MapPin size={14} /> : <Box size={14} />}
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900 dark:text-white tracking-tight">{object.name}</h3>
            <p className="text-[10px] text-gray-500 font-medium">ID: {object.id.substring(0,8)}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex px-4 pt-2 border-b border-gray-100 dark:border-white/5 gap-4">
        <button 
          onClick={() => setActiveTab('transform')}
          className={cn("text-xs font-bold px-2 py-2 border-b-2 transition-colors", activeTab === 'transform' ? "border-[#7c3aed] text-[#7c3aed]" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-300")}
        >
          <Navigation size={12} className="inline mr-1" /> Transform
        </button>
        <button 
          onClick={() => setActiveTab('data')}
          className={cn("text-xs font-bold px-2 py-2 border-b-2 transition-colors", activeTab === 'data' ? "border-[#7c3aed] text-[#7c3aed]" : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-300")}
        >
          <Database size={12} className="inline mr-1" /> Digital Twin Data
        </button>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[600px] overflow-y-auto custom-scrollbar">
        {activeTab === 'transform' && (
          <div className="space-y-4">
            {/* Position */}
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1 mb-2">
                <Navigation size={10} /> Position
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['X', 'Y', 'Z'].map((axis, i) => (
                  <div key={`pos-${axis}`} className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">{axis}</span>
                    <input type="number" step="0.1" value={object.position[i].toFixed(2)} onChange={(e) => handleArrayUpdate('position', i, e.target.value)} className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-[#333] rounded-[6px] pl-6 pr-2 py-1.5 text-xs text-gray-900 dark:text-white outline-none focus:border-[#7c3aed]" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Rotation */}
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1 mb-2">
                <Sliders size={10} /> Rotation
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['X', 'Y', 'Z'].map((axis, i) => (
                  <div key={`rot-${axis}`} className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">{axis}</span>
                    <input type="number" step="0.1" value={object.rotation[i].toFixed(2)} onChange={(e) => handleArrayUpdate('rotation', i, e.target.value)} className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-[#333] rounded-[6px] pl-6 pr-2 py-1.5 text-xs text-gray-900 dark:text-white outline-none focus:border-[#7c3aed]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Scale */}
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1 mb-2">
                <Box size={10} /> Scale
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['X', 'Y', 'Z'].map((axis, i) => (
                  <div key={`scale-${axis}`} className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">{axis}</span>
                    <input type="number" step="0.1" value={object.scale[i].toFixed(2)} onChange={(e) => handleArrayUpdate('scale', i, e.target.value)} className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-[#333] rounded-[6px] pl-6 pr-2 py-1.5 text-xs text-gray-900 dark:text-white outline-none focus:border-[#7c3aed]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Tag size={10} /> Label / Identity</label>
              <input 
                type="text" 
                value={object.label || ''}
                onChange={(e) => onUpdate({ label: e.target.value })}
                placeholder="e.g. Camera 1, Server Rack A"
                className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-[#333] rounded-[6px] px-3 py-1.5 text-xs text-gray-900 dark:text-white outline-none focus:border-[#7c3aed]"
              />
            </div>

            {object.type === 'pin' && (
              <div className="p-3 bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-[8px] space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Database size={14} className="text-[#7c3aed]" />
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">Twin Metadata</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500">Manufacturer</label>
                    <input 
                      type="text" 
                      value={object.metadata?.manufacturer || ''}
                      onChange={(e) => onUpdate({ metadata: { ...object.metadata, manufacturer: e.target.value } })}
                      placeholder="e.g. Cisco, Sony"
                      className="w-full bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] rounded-[6px] px-2 py-1.5 text-[11px] text-gray-900 dark:text-white outline-none focus:border-[#7c3aed]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500">Model Number</label>
                    <input 
                      type="text" 
                      value={object.metadata?.modelNumber || ''}
                      onChange={(e) => onUpdate({ metadata: { ...object.metadata, modelNumber: e.target.value } })}
                      placeholder="e.g. RTX-9000"
                      className="w-full bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] rounded-[6px] px-2 py-1.5 text-[11px] text-gray-900 dark:text-white outline-none focus:border-[#7c3aed]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500">Device Status</label>
                    <select 
                      value={object.metadata?.status || 'online'}
                      onChange={(e) => onUpdate({ metadata: { ...object.metadata, status: e.target.value as any } })}
                      className="w-full bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] rounded-[6px] px-2 py-1.5 text-[11px] text-gray-900 dark:text-white outline-none focus:border-[#7c3aed]"
                    >
                      <option value="online">Online / Active</option>
                      <option value="offline">Offline / Disconnected</option>
                      <option value="maintenance">Maintenance Mode</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500">Installation Date</label>
                    <input 
                      type="date" 
                      value={object.metadata?.installationDate || ''}
                      onChange={(e) => onUpdate({ metadata: { ...object.metadata, installationDate: e.target.value } })}
                      className="w-full bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] rounded-[6px] px-2 py-1.5 text-[11px] text-gray-900 dark:text-white outline-none focus:border-[#7c3aed]"
                    />
                  </div>
                </div>
              </div>
            )}

            {object.type === 'pin' && (
              <div className="p-3 bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-[8px] space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Server size={14} className="text-[#7c3aed]" />
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">IoT Integration Binding</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500">Category ({useCase})</label>
                    <select 
                      value={object.deviceCategory || 'sensor'}
                      onChange={(e) => onUpdate({ deviceCategory: e.target.value })}
                      className="w-full bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] rounded-[6px] px-2 py-1.5 text-[11px] text-gray-900 dark:text-white outline-none focus:border-[#7c3aed]"
                    >
                      {useCase === 'office' && (
                        <>
                          <option value="sensor">Air Quality Sensor</option>
                          <option value="cctv">CCTV Camera</option>
                          <option value="lighting">Smart Lighting</option>
                          <option value="router">Wi-Fi AP</option>
                          <option value="access">Access Gate</option>
                        </>
                      )}
                      {useCase === 'machine' && (
                        <>
                          <option value="sensor">Vibration Sensor</option>
                          <option value="temperature">Temperature Probe</option>
                          <option value="rpm">RPM Monitor</option>
                          <option value="actuator">Actuator Control</option>
                          <option value="cctv">Machine Vision</option>
                        </>
                      )}
                      {useCase === 'tower' && (
                        <>
                          <option value="transmitter">Signal Transmitter</option>
                          <option value="antenna">Sector Antenna</option>
                          <option value="weather">Weather Sensor</option>
                          <option value="power">Power Unit</option>
                          <option value="cctv">Security Camera</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500">Polling Rate (ms)</label>
                    <input 
                      type="number" 
                      value={object.iotConfig?.refreshRate || 5000}
                      onChange={(e) => onUpdate({ iotConfig: { ...object.iotConfig, refreshRate: parseInt(e.target.value) || 5000 } })}
                      className="w-full bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] rounded-[6px] px-2 py-1.5 text-[11px] text-gray-900 dark:text-white outline-none focus:border-[#7c3aed]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500">Telemetry Endpoint (REST/MQTT)</label>
                  <input 
                    type="text" 
                    value={object.iotConfig?.endpoint || ''}
                    onChange={(e) => onUpdate({ iotConfig: { ...object.iotConfig, endpoint: e.target.value } })}
                    placeholder="e.g. wss://iot.core/device/stream"
                    className="w-full bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] rounded-[6px] px-2 py-1.5 text-[11px] text-gray-900 dark:text-white outline-none focus:border-[#7c3aed] font-mono"
                  />
                </div>

                <div className="bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-[6px] p-2 flex items-start gap-2">
                  <CheckCircle2 size={12} className="text-[#7c3aed] mt-0.5 shrink-0" />
                  <p className="text-[9px] text-[#7c3aed] font-medium leading-relaxed">
                    Device configured for live twin synchronization. Ensure edge device is broadcasting to the specified endpoint with compatible payload structure.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
