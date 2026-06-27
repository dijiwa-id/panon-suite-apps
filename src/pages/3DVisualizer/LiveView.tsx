import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Settings, ShieldAlert, UserCheck, Activity, Video, Map, Bell, Eye, Thermometer, PenTool, Search, Layers, Zap, MoreHorizontal, MicOff, Maximize, Crosshair, ChevronUp, ChevronDown, Lightbulb, Wind, Building, Radio, Factory, Sprout, Box, X } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { VisualizerState, SceneObject, UsecaseCategory } from './types';
import VisualizerCanvas from './VisualizerCanvas';
import VisualizerSettings from './VisualizerSettings';
import { PropertiesPopup } from './PropertiesPopup';

const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) => (
  <button 
    onClick={() => onChange(!enabled)}
    className={cn(
      "w-8 h-4 rounded-full transition-colors relative",
      enabled ? "bg-accent" : "bg-gray-600"
    )}
  >
    <motion.div 
      className="w-3 h-3 bg-white rounded-full absolute top-0.5 shadow-sm"
      animate={{ left: enabled ? '18px' : '2px' }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  </button>
);

const TransparentCard = ({ title, subtitle, icon: Icon, children, rightAction }: any) => {
  return (
    <Card className="bg-black/30 backdrop-blur-md border border-white/10 shadow-2xl rounded-xl overflow-hidden pointer-events-auto">
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={14} className="text-accent" />}
          <div>
            <h3 className="text-xs font-black text-white tracking-tight">{title}</h3>
            {subtitle && <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">{subtitle}</p>}
          </div>
        </div>
        <div>
          {rightAction}
        </div>
      </div>
      <div className="p-3">
        {children}
      </div>
    </Card>
  );
};

export default function LiveView() {
  const location = useLocation();
  const activeUseCase = (new URLSearchParams(location.search).get('usecase') as UsecaseCategory) || 'banking';

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    cam1: true,
    cam2: true,
    fraudDetection: true,
    vaultAccess: false,
    towerSignal: true,
    powerGrid: true,
    defectScan: true,
    ergonomics: true,
    cropHealth: true,
    dronePatrol: false,
  });

  const [visualizerState, setVisualizerState] = useState<VisualizerState>({
    objects: [],
    mode: 'live',
    selectedObjectId: null,
    useCase: activeUseCase,
    settings: {
      showGrid: true,
      showHeatmap: false,
      ambientLightIntensity: 0.5,
      directionalLightIntensity: 1,
      objectStyle: 'futuristic',
    }
  });

  // Sync state with URL parameter if it changes from outside
  useEffect(() => {
    setVisualizerState(prev => ({ ...prev, useCase: activeUseCase }));
  }, [activeUseCase]);

  const handleToggle = (key: string) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddObject = (obj: Omit<SceneObject, 'id'>) => {
    const newObj: SceneObject = { ...obj, id: Math.random().toString(36).substring(7) };
    setVisualizerState(prev => ({ ...prev, objects: [...prev.objects, newObj], selectedObjectId: newObj.id }));
  };

  const handleUpdateObject = (id: string, updates: Partial<SceneObject>) => {
    setVisualizerState(prev => ({
      ...prev,
      objects: prev.objects.map(obj => obj.id === id ? { ...obj, ...updates } : obj)
    }));
  };

  const handleRemoveObject = (id: string) => {
    setVisualizerState(prev => ({
      ...prev,
      objects: prev.objects.filter(obj => obj.id !== id),
      selectedObjectId: prev.selectedObjectId === id ? null : prev.selectedObjectId
    }));
  };

  const handleUpdateSettings = (settings: Partial<VisualizerState['settings']>) => {
    setVisualizerState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings }
    }));
  };

  return (
    <div className="relative flex-1 w-full h-full min-w-0 bg-[#0a0a0a] overflow-hidden font-sans">
      
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <VisualizerCanvas 
          state={visualizerState}
          onObjectUpdate={handleUpdateObject}
          onObjectSelect={(id) => setVisualizerState(prev => ({ ...prev, selectedObjectId: id }))}
        />
        {/* Subtle vignette/gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      </div>

      {/* Floating UI Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none p-6 flex flex-col justify-between overflow-hidden">
        
        {/* Top Header Floating */}
        <div className="flex items-start justify-between w-full flex-1 min-h-0">
          
          <div className="flex flex-col gap-4 w-80 max-h-full overflow-y-auto hide-scrollbar pb-20 pointer-events-auto">
            {/* Top Logo / Title Card */}

            <div className="bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl rounded-full px-5 py-3 flex items-center gap-3 pointer-events-auto">
               <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent shadow-sm shrink-0 border border-accent/30">
                  <span className="font-bold font-serif italic text-sm">3D</span>
               </div>
               <div className="flex-1">
                 <h1 className="text-sm font-black text-white tracking-tight leading-none">Spatial Twin</h1>
                 <p className="text-[9px] text-gray-400 font-medium uppercase tracking-widest mt-1">Live Monitoring</p>
               </div>
            </div>

            {/* Left Panels based on useCase */}
            {visualizerState.useCase === 'banking' && (
              <TransparentCard 
                title="Branch Security" 
                subtitle="CCTV Network" 
                icon={Video}
                rightAction={<span className="text-[9px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">Active</span>}
              >
                 <div className="space-y-3">
                   <div className="flex gap-3 items-center">
                     <div className="w-16 h-12 bg-[#1a1a1a] rounded overflow-hidden shrink-0 border border-white/10 relative">
                       <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=200" alt="Lobby" className="w-full h-full object-cover opacity-70" />
                       <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                     </div>
                     <div className="flex-1">
                       <h3 className="text-[11px] font-bold text-white">Main Lobby</h3>
                       <p className="text-[9px] text-gray-400 mb-1">Queue: 12 persons</p>
                       <ToggleSwitch enabled={toggles.cam1} onChange={() => handleToggle('cam1')} />
                     </div>
                   </div>
                   <div className="flex gap-3 items-center border-t border-white/10 pt-3">
                     <div className="w-16 h-12 bg-[#1a1a1a] rounded overflow-hidden shrink-0 border border-white/10 relative">
                       <img src="https://images.unsplash.com/photo-1629837593630-f6cb38692694?auto=format&fit=crop&q=80&w=200" alt="ATM" className="w-full h-full object-cover opacity-70" />
                       <div className="absolute inset-0 bg-accent/20 mix-blend-overlay" />
                     </div>
                     <div className="flex-1">
                       <h3 className="text-[11px] font-bold text-white">ATM Center</h3>
                       <p className="text-[9px] text-gray-400 mb-1">Loitering detected</p>
                       <ToggleSwitch enabled={toggles.cam2} onChange={() => handleToggle('cam2')} />
                     </div>
                   </div>
                 </div>
              </TransparentCard>
            )}

            {visualizerState.useCase === 'telco' && (
              <TransparentCard 
                title="Tower Health" 
                subtitle="BTS Alpha-9" 
                icon={Activity}
                rightAction={<span className="text-[9px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">Warning</span>}
              >
                 <div className="space-y-3">
                   <div className="flex justify-between items-center text-xs">
                     <span className="text-gray-400 font-medium">Signal Strength</span>
                     <span className="text-white font-bold">85%</span>
                   </div>
                   <div className="w-full bg-white/10 rounded-full h-1.5">
                     <div className="h-full bg-blue-400 w-[85%] rounded-full shadow-[0_0_8px_#60a5fa]"></div>
                   </div>
                   
                   <div className="flex justify-between items-center text-xs pt-2">
                     <span className="text-gray-400 font-medium">Temperature (RU)</span>
                     <span className="text-amber-400 font-bold">78°C</span>
                   </div>
                   <div className="w-full bg-white/10 rounded-full h-1.5">
                     <div className="h-full bg-amber-400 w-[78%] rounded-full shadow-[0_0_8px_#fbbf24]"></div>
                   </div>
                 </div>
              </TransparentCard>
            )}

            {visualizerState.useCase === 'manufacturing' && (
              <TransparentCard 
                title="Production Line" 
                subtitle="Assembly Sector A" 
                icon={Settings}
                rightAction={<span className="text-[9px] text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">Running</span>}
              >
                 <div className="flex flex-col gap-3">
                   <div className="bg-white/5 p-2 rounded border border-white/5 flex justify-between items-center">
                     <span className="text-[10px] text-gray-300">Throughput</span>
                     <span className="text-[11px] font-bold text-white">450 units/hr</span>
                   </div>
                   <div className="bg-white/5 p-2 rounded border border-white/5 flex justify-between items-center">
                     <span className="text-[10px] text-gray-300">Defect Rate</span>
                     <span className="text-[11px] font-bold text-emerald-400">0.02%</span>
                   </div>
                 </div>
              </TransparentCard>
            )}

            {visualizerState.useCase === 'agro' && (
              <TransparentCard 
                title="Field Sensors" 
                subtitle="Sector 4 (Corn)" 
                icon={Thermometer}
                rightAction={<span className="text-[9px] text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/20">Optimal</span>}
              >
                 <div className="grid grid-cols-2 gap-2">
                   <div className="bg-white/5 p-2 rounded border border-white/5 flex flex-col">
                     <span className="text-[9px] text-gray-400 mb-1">Soil Moisture</span>
                     <span className="text-[12px] font-bold text-blue-400">42%</span>
                   </div>
                   <div className="bg-white/5 p-2 rounded border border-white/5 flex flex-col">
                     <span className="text-[9px] text-gray-400 mb-1">Nitrogen Level</span>
                     <span className="text-[12px] font-bold text-emerald-400">High</span>
                   </div>
                   <div className="bg-white/5 p-2 rounded border border-white/5 flex flex-col">
                     <span className="text-[9px] text-gray-400 mb-1">Temperature</span>
                     <span className="text-[12px] font-bold text-amber-400">28°C</span>
                   </div>
                   <div className="bg-white/5 p-2 rounded border border-white/5 flex flex-col">
                     <span className="text-[9px] text-gray-400 mb-1">UV Index</span>
                     <span className="text-[12px] font-bold text-white">7.2</span>
                   </div>
                 </div>
              </TransparentCard>
            )}

          </div>

          <div className="flex flex-col gap-4 w-[340px] items-end pointer-events-auto max-h-full min-h-0 h-full">
            {/* Top Right Action Bar */}

            <div className="flex items-center gap-3">
               <button 
                 onClick={() => setVisualizerState(prev => ({ ...prev, mode: prev.mode === 'edit' ? 'live' : 'edit' }))}
                 className={cn(
                   "w-9 h-9 rounded-full backdrop-blur-md border shadow-lg flex items-center justify-center transition-all",
                   visualizerState.mode === 'edit' 
                     ? "bg-accent text-black border-accent/50 shadow-[0_0_15px_rgba(82,197,243,0.3)]" 
                     : "bg-black/40 border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                 )}
                 title={visualizerState.mode === 'edit' ? "Exit Editor" : "Enter Editor"}
               >
                 {visualizerState.mode === 'edit' ? <X size={14} /> : <PenTool size={14} />}
               </button>
               <button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-full px-5 h-9 text-[11px] font-bold tracking-wide shadow-lg transition-all flex items-center gap-2">
                 <MoreHorizontal size={14} /> Options
               </button>
            </div>

            {/* Right Side Data Widgets (Live Mode) */}
            {visualizerState.mode === 'live' && (
              <div className="w-full flex flex-col gap-4 max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar pr-2 pb-10">
                 
                 {visualizerState.useCase === 'banking' && (
                   <>
                     <TransparentCard 
                       title="Fraud Detection" 
                       subtitle="AI Behavioral Analysis"
                       icon={ShieldAlert}
                       rightAction={<ToggleSwitch enabled={toggles.fraudDetection} onChange={() => handleToggle('fraudDetection')} />}
                     >
                       <div className="flex flex-col py-1">
                         <div className="relative w-full h-24 mb-3 bg-[#111] rounded overflow-hidden border border-white/5 flex items-center justify-center">
                            {/* Grid Background */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" style={{ backgroundSize: '10px 10px' }}></div>
                            
                            {/* Radar effect */}
                            {toggles.fraudDetection && (
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(82,197,243,0.15)_0%,transparent_70%)]"></div>
                            )}
                            <div className="z-10 flex flex-col items-center">
                               <ShieldAlert size={20} className={cn("mb-2 transition-colors", toggles.fraudDetection ? "text-accent" : "text-gray-600")} />
                               <div className={cn("font-mono text-[10px] font-bold tracking-widest", toggles.fraudDetection ? "text-accent" : "text-gray-500")}>MONITORING ACTIVE</div>
                            </div>
                         </div>
                         <div className="text-[10px] text-gray-400 leading-relaxed">
                           Scanning for prolonged loitering, masked faces, and unauthorized tandem access at ATM vestibules.
                         </div>
                       </div>
                     </TransparentCard>

                     <TransparentCard 
                       title="Vault Access" 
                       subtitle="Biometric Gateway"
                       icon={UserCheck}
                       rightAction={<ToggleSwitch enabled={toggles.vaultAccess} onChange={() => handleToggle('vaultAccess')} />}
                     >
                       <div className="flex items-center justify-between bg-white/5 p-2.5 rounded border border-white/5">
                         <span className="text-[11px] font-medium text-gray-300">Gateway Status</span>
                         {toggles.vaultAccess ? (
                           <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded border border-red-400/20">Unlocked</span>
                         ) : (
                           <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">Secured</span>
                         )}
                       </div>
                     </TransparentCard>
                   </>
                 )}

                 {visualizerState.useCase === 'telco' && (
                   <>
                     <TransparentCard 
                       title="Network Topology" 
                       subtitle="Microwave Links"
                       icon={Layers}
                       rightAction={<ToggleSwitch enabled={toggles.towerSignal} onChange={() => handleToggle('towerSignal')} />}
                     >
                       <div className="flex flex-col py-1">
                         <div className="relative w-full h-24 mb-3 bg-[#111] rounded overflow-hidden border border-white/5 flex items-center justify-center">
                            {toggles.towerSignal && (
                              <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 z-10 drop-shadow-[0_0_4px_#a855f7]">
                                <path d="M20,50 Q50,20 80,50" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_1s_linear_infinite]" />
                                <circle cx="20" cy="50" r="4" fill="#a855f7" />
                                <circle cx="80" cy="50" r="4" fill="#a855f7" />
                              </svg>
                            )}
                         </div>
                         <div className="flex justify-between text-[10px] text-gray-400">
                           <span>Latency: <strong className="text-white">12ms</strong></span>
                           <span>Bandwidth: <strong className="text-white">1.2 Gbps</strong></span>
                         </div>
                       </div>
                     </TransparentCard>
                     <TransparentCard 
                       title="Power Grid" 
                       subtitle="Backup Systems"
                       icon={Zap}
                       rightAction={<ToggleSwitch enabled={toggles.powerGrid} onChange={() => handleToggle('powerGrid')} />}
                     >
                       <div className="bg-white/5 p-3 rounded border border-white/5">
                         <div className="flex justify-between text-[10px] font-medium text-gray-400 mb-1.5">
                            <span>Battery Reserve</span>
                            <span className="font-mono text-emerald-400 font-bold">94%</span>
                         </div>
                         <div className="w-full bg-black rounded-full h-1.5 overflow-hidden border border-white/10">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '94%' }}
                              className="h-full rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
                            ></motion.div>
                         </div>
                       </div>
                     </TransparentCard>
                   </>
                 )}

                 {visualizerState.useCase === 'manufacturing' && (
                   <>
                     <TransparentCard 
                       title="Defect Detection" 
                       subtitle="Computer Vision Scan"
                       icon={Eye}
                       rightAction={<ToggleSwitch enabled={toggles.defectScan} onChange={() => handleToggle('defectScan')} />}
                     >
                       <div className="flex flex-col py-1 space-y-3">
                         <div className="flex items-center gap-3 bg-white/5 p-2 rounded border border-white/5">
                           <div className="w-10 h-10 bg-black rounded shrink-0 flex items-center justify-center border border-white/10 relative overflow-hidden">
                             {toggles.defectScan && <div className="absolute inset-0 bg-accent/20 animate-pulse" />}
                             <Box size={16} className={toggles.defectScan ? "text-accent" : "text-gray-600"} />
                           </div>
                           <div className="flex-1">
                             <div className="text-[10px] text-gray-400">Current Item</div>
                             <div className="text-xs font-bold text-white">Engine Block V8</div>
                           </div>
                           <div className="text-[10px] font-bold text-emerald-400">PASS</div>
                         </div>
                         <div className="text-[10px] text-gray-400 flex justify-between">
                           <span>Scanned today: 1,204</span>
                           <span>Defects: 3</span>
                         </div>
                       </div>
                     </TransparentCard>
                     <TransparentCard 
                       title="Ergonomic & PPE" 
                       subtitle="Worker Safety AI"
                       icon={Crosshair}
                       rightAction={<ToggleSwitch enabled={toggles.ergonomics} onChange={() => handleToggle('ergonomics')} />}
                     >
                       <div className="flex flex-col gap-2 pt-1">
                         <div className="bg-white/5 p-2 rounded border border-white/5 flex justify-between items-center">
                           <span className="text-[10px] font-medium text-gray-400">Safety Helmet Compliance</span>
                           {toggles.ergonomics ? <span className="text-[9px] font-bold text-emerald-400">100%</span> : <span className="text-[9px] font-bold text-gray-600">--</span>}
                         </div>
                         <div className="bg-white/5 p-2 rounded border border-white/5 flex justify-between items-center">
                           <span className="text-[10px] font-medium text-gray-400">Posture Risk (RULA)</span>
                           {toggles.ergonomics ? <span className="text-[9px] font-bold text-amber-400">Moderate</span> : <span className="text-[9px] font-bold text-gray-600">--</span>}
                         </div>
                       </div>
                     </TransparentCard>
                   </>
                 )}

                 {visualizerState.useCase === 'agro' && (
                   <>
                     <TransparentCard 
                       title="NDVI Analysis" 
                       subtitle="Crop Health Map"
                       icon={Map}
                       rightAction={<ToggleSwitch enabled={toggles.cropHealth} onChange={() => handleToggle('cropHealth')} />}
                     >
                       <div className="flex flex-col py-1">
                         <div className="relative w-full h-24 mb-2 bg-[#111] rounded overflow-hidden border border-white/5 flex items-center justify-center">
                            {toggles.cropHealth && (
                              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-yellow-500/20 to-red-500/20 mix-blend-overlay" />
                            )}
                            <Map size={24} className={toggles.cropHealth ? "text-white/50" : "text-gray-600"} />
                         </div>
                         <div className="text-[10px] text-gray-400 text-center">
                           Multispectral analysis indicates slight nitrogen deficiency in North-West quadrant.
                         </div>
                       </div>
                     </TransparentCard>
                     <TransparentCard 
                       title="Drone Patrol" 
                       subtitle="Automated Survey"
                       icon={Wind}
                       rightAction={<ToggleSwitch enabled={toggles.dronePatrol} onChange={() => handleToggle('dronePatrol')} />}
                     >
                       <div className="flex items-center justify-between bg-white/5 p-2.5 rounded border border-white/5">
                         <span className="text-[11px] font-medium text-gray-300">Fleet Status</span>
                         {toggles.dronePatrol ? (
                           <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">In Flight</span>
                         ) : (
                           <span className="text-[10px] font-bold text-gray-400 bg-gray-400/10 px-2 py-0.5 rounded border border-gray-400/20">Docked</span>
                         )}
                       </div>
                     </TransparentCard>
                   </>
                 )}

              </div>
            )}
            
            {/* Settings Overlay - Conditionally Rendered if Edit Mode */}
            {visualizerState.mode === 'edit' && (
              <div className="w-full flex-1 min-h-0 pointer-events-auto flex flex-col overflow-hidden pb-4">
                <VisualizerSettings 
                  state={visualizerState}
                  onUpdateSettings={handleUpdateSettings}
                  onUpdateUseCase={(useCase) => setVisualizerState(prev => ({ ...prev, useCase }))}
                  onAddObject={handleAddObject}
                  onUpdateObject={handleUpdateObject}
                  onRemoveObject={handleRemoveObject}
                  onSelectObject={(id) => setVisualizerState(prev => ({ ...prev, selectedObjectId: id }))}
                  onChangeMode={(mode) => setVisualizerState(prev => ({ ...prev, mode }))}
                />
              </div>
            )}

          </div>
        </div>

        {/* Properties Popup for selected object */}
        <AnimatePresence>
          {visualizerState.selectedObjectId && (
            <PropertiesPopup
              object={visualizerState.objects.find(o => o.id === visualizerState.selectedObjectId)!}
              useCase={visualizerState.useCase}
              onUpdate={(updates) => handleUpdateObject(visualizerState.selectedObjectId!, updates)}
              onClose={() => setVisualizerState(prev => ({ ...prev, selectedObjectId: null }))}
              isEditMode={visualizerState.mode === 'edit'}
            />
          )}
        </AnimatePresence>
        
        {/* Bottom Left Floating Panel (Alert Log) */}
        <div className="absolute bottom-6 left-6 pointer-events-auto">
          <div className="bg-black/50 backdrop-blur-md border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)] rounded-xl p-3 w-72 flex items-center gap-3 relative overflow-hidden group hover:border-red-500/50 transition-colors cursor-pointer">
             <div className="w-9 h-9 rounded bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
               <ShieldAlert size={16} />
             </div>
             <div className="flex-1 pr-2">
               <h3 className="text-[11px] font-black text-white tracking-tight flex items-center justify-between">
                 <span>Critical Alert</span>
                 <span className="text-[9px] font-bold text-red-400 animate-pulse">Live</span>
               </h3>
               <p className="text-[10px] text-gray-300 font-medium truncate mt-0.5">
                 {visualizerState.useCase === 'banking' ? 'Unauthorized Vault Proximity' :
                  visualizerState.useCase === 'telco' ? 'Generator Fail at Alpha-9' :
                  visualizerState.useCase === 'manufacturing' ? 'Machine Stop: Sector A' :
                  'Perimeter Breach: North Gate'}
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
