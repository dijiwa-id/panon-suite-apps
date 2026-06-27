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
  isEditMode?: boolean;
}

export const PropertiesPopup: React.FC<PropertiesPopupProps> = ({
  object,
  useCase,
  onUpdate,
  onClose,
  isEditMode = false
}) => {
  const [activeTab, setActiveTab] = useState<'transform' | 'data'>(isEditMode ? 'transform' : 'data');

  useEffect(() => {
    if (!isEditMode && activeTab === 'transform') {
      setActiveTab('data');
    }
  }, [isEditMode, activeTab]);

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
      className="absolute top-6 right-[380px] w-[360px] bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden pointer-events-auto z-50 flex flex-col transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent shadow-inner border border-accent/20">
            {object.type === 'pin' ? <MapPin size={14} /> : <Box size={14} />}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">{object.name}</h3>
            <p className="text-[10px] text-gray-400 font-medium font-mono">ID: {object.id.substring(0,8)}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex px-4 pt-2 border-b border-white/5 gap-6">
        {isEditMode && (
          <button 
            onClick={() => setActiveTab('transform')}
            className={cn("text-xs font-bold px-1 py-2 border-b-2 transition-all", activeTab === 'transform' ? "border-accent text-accent" : "border-transparent text-gray-500 hover:text-gray-300")}
          >
            <Navigation size={12} className="inline mr-1.5" /> Transform
          </button>
        )}
        <button 
          onClick={() => setActiveTab('data')}
          className={cn("text-xs font-bold px-1 py-2 border-b-2 transition-all", activeTab === 'data' ? "border-accent text-accent" : "border-transparent text-gray-500 hover:text-gray-300")}
        >
          <Database size={12} className="inline mr-1.5" /> Digital Twin
        </button>
      </div>

      {/* Content */}
      <div className="p-5 max-h-[600px] overflow-y-auto hide-scrollbar">
        {activeTab === 'transform' && (
          <div className="space-y-6">
            {/* Position */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                <Navigation size={12} /> Position
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['X', 'Y', 'Z'].map((axis, i) => (
                  <div key={`pos-${axis}`} className="relative group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-500 group-focus-within:text-accent transition-colors">{axis}</span>
                    <input type="number" step="0.1" value={object.position[i].toFixed(2)} onChange={(e) => handleArrayUpdate('position', i, e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-7 pr-2 py-2 text-xs text-white outline-none focus:border-accent focus:bg-white/10 transition-all text-right font-mono" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Rotation */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                <Sliders size={12} /> Rotation
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['X', 'Y', 'Z'].map((axis, i) => (
                  <div key={`rot-${axis}`} className="relative group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-500 group-focus-within:text-accent transition-colors">{axis}</span>
                    <input type="number" step="0.1" value={object.rotation[i].toFixed(2)} onChange={(e) => handleArrayUpdate('rotation', i, e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-7 pr-2 py-2 text-xs text-white outline-none focus:border-accent focus:bg-white/10 transition-all text-right font-mono" />
                  </div>
                ))}
              </div>
            </div>

            {/* Scale */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                <Box size={12} /> Scale
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['X', 'Y', 'Z'].map((axis, i) => (
                  <div key={`scale-${axis}`} className="relative group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-500 group-focus-within:text-accent transition-colors">{axis}</span>
                    <input type="number" step="0.1" value={object.scale[i].toFixed(2)} onChange={(e) => handleArrayUpdate('scale', i, e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-7 pr-2 py-2 text-xs text-white outline-none focus:border-accent focus:bg-white/10 transition-all text-right font-mono" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Tag size={12} /> Label / Identity</label>
              <input 
                type="text" 
                value={object.label || ''}
                onChange={(e) => onUpdate({ label: e.target.value })}
                placeholder="e.g. Camera 1, Server Rack A"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-accent focus:bg-white/10 transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
              <div className="flex items-center gap-2 mb-1 border-b border-white/5 pb-3">
                <Database size={14} className="text-accent" />
                <h4 className="text-[11px] font-bold text-white uppercase tracking-widest">Twin Metadata</h4>
              </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400">Manufacturer</label>
                    <input 
                      type="text" 
                      value={object.metadata?.manufacturer || ''}
                      onChange={(e) => onUpdate({ metadata: { ...object.metadata, manufacturer: e.target.value } })}
                      placeholder="e.g. Cisco"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white outline-none focus:border-accent transition-all placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400">Model Number</label>
                    <input 
                      type="text" 
                      value={object.metadata?.modelNumber || ''}
                      onChange={(e) => onUpdate({ metadata: { ...object.metadata, modelNumber: e.target.value } })}
                      placeholder="e.g. RTX-9000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white outline-none focus:border-accent transition-all placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400">Device Status</label>
                    <select 
                      value={object.metadata?.status || 'online'}
                      onChange={(e) => onUpdate({ metadata: { ...object.metadata, status: e.target.value as any } })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white outline-none focus:border-accent transition-all"
                    >
                      <option value="online">Online / Active</option>
                      <option value="offline">Offline / Disconnected</option>
                      <option value="maintenance">Maintenance Mode</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400">Installation Date</label>
                    <input 
                      type="date" 
                      value={object.metadata?.installationDate || ''}
                      onChange={(e) => onUpdate({ metadata: { ...object.metadata, installationDate: e.target.value } })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white outline-none focus:border-accent transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400">Last Maintenance</label>
                    <input 
                      type="date" 
                      value={object.metadata?.lastMaintenance || ''}
                      onChange={(e) => onUpdate({ metadata: { ...object.metadata, lastMaintenance: e.target.value } })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white outline-none focus:border-accent transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400">Firmware Version</label>
                    <input 
                      type="text" 
                      value={object.metadata?.firmwareVersion || ''}
                      onChange={(e) => onUpdate({ metadata: { ...object.metadata, firmwareVersion: e.target.value } })}
                      placeholder="v1.0.4"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white outline-none focus:border-accent transition-all font-mono placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400">IP Address</label>
                    <input 
                      type="text" 
                      value={object.metadata?.ipAddress || ''}
                      onChange={(e) => onUpdate({ metadata: { ...object.metadata, ipAddress: e.target.value } })}
                      placeholder="192.168.1.100"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white outline-none focus:border-accent transition-all font-mono placeholder:text-gray-600"
                    />
                  </div>
                </div>
              </div>

            {object.type === 'pin' && (
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
                <div className="flex items-center gap-2 mb-1 border-b border-white/5 pb-3">
                  <Server size={14} className="text-accent" />
                  <h4 className="text-[11px] font-bold text-white uppercase tracking-widest">IoT Binding</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400">Category ({useCase})</label>
                    <select 
                      value={object.deviceCategory || 'sensor'}
                      onChange={(e) => onUpdate({ deviceCategory: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white outline-none focus:border-accent transition-all"
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
                      {useCase === 'banking' && (
                        <>
                          <option value="atm">ATM Terminal</option>
                          <option value="cctv">Security Camera</option>
                          <option value="vault">Vault Sensor</option>
                        </>
                      )}
                      {useCase === 'telco' && (
                        <>
                          <option value="server">Core Server</option>
                          <option value="router">Edge Router</option>
                          <option value="cooling">Cooling Unit</option>
                        </>
                      )}
                      {useCase === 'manufacturing' && (
                        <>
                          <option value="robot">Robotic Arm</option>
                          <option value="conveyor">Conveyor Belt</option>
                          <option value="sensor">Quality Sensor</option>
                        </>
                      )}
                      {useCase === 'agro' && (
                        <>
                          <option value="soil">Soil Sensor</option>
                          <option value="irrigation">Irrigation Valve</option>
                          <option value="drone">Drone Station</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400">Polling Rate (ms)</label>
                    <input 
                      type="number" 
                      value={object.iotConfig?.refreshRate || 5000}
                      onChange={(e) => onUpdate({ iotConfig: { ...object.iotConfig, refreshRate: parseInt(e.target.value) || 5000 } })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white outline-none focus:border-accent transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400">Telemetry Endpoint</label>
                  <input 
                    type="text" 
                    value={object.iotConfig?.endpoint || ''}
                    onChange={(e) => onUpdate({ iotConfig: { ...object.iotConfig, endpoint: e.target.value } })}
                    placeholder="wss://iot.core/device/stream"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white outline-none focus:border-accent transition-all font-mono placeholder:text-gray-600"
                  />
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 flex items-start gap-3">
                  <CheckCircle2 size={14} className="text-accent mt-0.5 shrink-0" />
                  <p className="text-[10px] text-accent/90 font-medium leading-relaxed">
                    Live twin synchronization active. Endpoint receives formatted telemetry payload.
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
