import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Settings, ShieldAlert, UserCheck, Activity, Video, Map, Bell, Eye, Thermometer, PenTool, Search, Layers, Zap, MoreHorizontal, MicOff, Maximize, Crosshair, ChevronUp, ChevronDown, Lightbulb, Wind } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { VisualizerState, SceneObject } from './types';
import VisualizerCanvas from './VisualizerCanvas';
import VisualizerSettings from './VisualizerSettings';
import { PropertiesPopup } from './PropertiesPopup';

const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) => (
  <button 
    onClick={() => onChange(!enabled)}
    className={cn(
      "w-8 h-4 rounded-full transition-colors relative",
      enabled ? "bg-[#7c3aed]" : "bg-gray-300 dark:bg-gray-600"
    )}
  >
    <motion.div 
      className="w-3 h-3 bg-white rounded-full absolute top-0.5 shadow-sm"
      animate={{ left: enabled ? '18px' : '2px' }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  </button>
);

const CollapsibleCard = ({ title, subtitle, icon: Icon, children, defaultOpen = true, rightAction, isOpen: controlledIsOpen, onToggle }: any) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <Card className="bg-white/70 dark:bg-[#1e1e1e]/70 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-xl rounded-[16px] overflow-hidden pointer-events-auto">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/20 dark:hover:bg-white/5 transition-colors"
        onClick={handleToggle}
      >
        <div className="flex items-start justify-between w-full">
          <div>
            <h3 className="text-[14px] font-black text-gray-900 dark:text-white tracking-tight">{title}</h3>
            {subtitle && <p className="text-[11px] text-gray-500 font-medium mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            {rightAction && <div onClick={(e) => e.stopPropagation()}>{rightAction}</div>}
            <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default function LiveView() {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'cctv';

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    cam1: true,
    cam2: true,
    accessGate: false,
    ergonomics: true,
    spatialIsolation: true,
    vipTracker: true
  });

  const [activeRightCard, setActiveRightCard] = useState<string>('spatial');

  const [visualizerState, setVisualizerState] = useState<VisualizerState>({
    objects: [],
    mode: 'live',
    selectedObjectId: null,
    useCase: 'office',
    settings: {
      showGrid: true,
      showHeatmap: false,
      ambientLightIntensity: 0.5,
      directionalLightIntensity: 1,
    }
  });

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
    <div className="relative flex-1 w-full h-full min-w-0 bg-[#eef0f6] dark:bg-[#121212] overflow-hidden font-sans">
      
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <VisualizerCanvas 
          state={visualizerState}
          onObjectUpdate={handleUpdateObject}
          onObjectSelect={(id) => setVisualizerState(prev => ({ ...prev, selectedObjectId: id }))}
        />
      </div>

      {/* Floating UI Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">
        {/* Top Header Floating */}
        <div className="p-6 pb-0 flex items-start justify-between w-full">
          <div className="flex flex-col gap-6 w-80">
            {/* Top Logo / Title Card */}
            <div className="bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-lg rounded-full px-5 py-3 flex items-center gap-3 pointer-events-auto">
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#3b82f6] flex items-center justify-center text-white shadow-sm shrink-0">
                  <span className="font-bold font-serif italic text-sm">i</span>
               </div>
               <h1 className="text-[16px] font-black text-gray-900 dark:text-white tracking-tight flex-1">
                 {visualizerState.useCase === 'office' ? 'Live Office Floorplan' : 
                  visualizerState.useCase === 'machine' ? 'Industrial Machine Map' : 
                  'Tower Map 3D'}
               </h1>
            </div>

            {/* Collapsible Left Panels based on currentTab */}
            {currentTab === 'cctv' && (
              <CollapsibleCard 
                title="CCTVs" 
                subtitle="2 Devices" 
                rightAction={<button className="text-[10px] text-[#7c3aed] font-bold tracking-tight hover:underline">View all</button>}
              >
                 <div className="space-y-3 pr-1">
                   {/* Camera 1 */}
                   <div className="flex gap-3">
                     <div className="w-[84px] h-[56px] bg-gray-200 dark:bg-[#333] rounded-[8px] overflow-hidden shrink-0">
                       <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200" alt="Outdoor Camera" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 flex flex-col justify-between py-0.5">
                       <div className="flex items-start justify-between">
                         <h3 className="text-[12px] font-bold text-gray-900 dark:text-white">Outdoor Camera1</h3>
                         <MicOff size={12} className="text-gray-400" />
                       </div>
                       <p className="text-[10px] text-gray-500">Outdoor view</p>
                       <div className="flex items-center justify-between mt-auto">
                         <span className="inline-flex items-center gap-1.5 text-[#7c3aed] text-[10px] font-bold tracking-tight">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-pulse"></span> Live
                         </span>
                         <ToggleSwitch enabled={toggles.cam1} onChange={() => handleToggle('cam1')} />
                       </div>
                     </div>
                   </div>

                   {/* Camera 2 */}
                   <div className="flex gap-3 pt-3 border-t border-gray-100 dark:border-white/5">
                     <div className="w-[84px] h-[56px] bg-gray-200 dark:bg-[#333] rounded-[8px] overflow-hidden shrink-0">
                       <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=200" alt="Indoor Camera" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 flex flex-col justify-between py-0.5">
                       <div className="flex items-start justify-between">
                         <h3 className="text-[12px] font-bold text-gray-900 dark:text-white">Workspace Design</h3>
                         <MicOff size={12} className="text-gray-400" />
                       </div>
                       <p className="text-[10px] text-gray-500">Indoor view</p>
                       <div className="flex items-center justify-between mt-auto">
                         <span className="inline-flex items-center gap-1.5 text-[#7c3aed] text-[10px] font-bold tracking-tight">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-pulse"></span> Live
                         </span>
                         <ToggleSwitch enabled={toggles.cam2} onChange={() => handleToggle('cam2')} />
                       </div>
                     </div>
                   </div>
                 </div>
              </CollapsibleCard>
            )}

            {currentTab === 'air' && (
              <CollapsibleCard 
                title="Air Quality" 
                subtitle="Workspace Sensor" 
                rightAction={<span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Good</span>}
              >
                <div className="pt-2 flex flex-col items-center">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="44" fill="none" stroke="currentColor" className="text-gray-200 dark:text-[#333]" strokeWidth="4" />
                      <circle cx="48" cy="48" r="44" fill="none" stroke="currentColor" className="text-emerald-500" strokeWidth="4" strokeDasharray="276" strokeDashoffset="50" />
                    </svg>
                    <div className="text-2xl font-black text-gray-900 dark:text-white">42</div>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-2 font-medium">AQI Level</div>
                </div>
              </CollapsibleCard>
            )}

            {currentTab === 'lighting' && (
              <CollapsibleCard 
                title="Smart Lighting" 
                subtitle="All Zones" 
                rightAction={<button className="text-[10px] text-[#7c3aed] font-bold tracking-tight hover:underline">Manage</button>}
              >
                <div className="pt-2">
                  <div className="bg-gray-50 dark:bg-[#252525]/50 p-3 rounded-[8px] border border-gray-100 dark:border-[#222]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300">Overall Intensity</span>
                      <span className="text-[11px] font-bold text-gray-900 dark:text-white">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-[#161616] rounded-full h-1.5 overflow-hidden">
                      <div className="h-full bg-amber-400 w-[85%] rounded-full shadow-[0_0_8px_#fbbf24]"></div>
                    </div>
                  </div>
                </div>
              </CollapsibleCard>
            )}

            {currentTab === 'robots' && (
              <CollapsibleCard 
                title="Robot Cleaners" 
                subtitle="Active Fleet" 
                rightAction={<span className="text-[10px] font-bold text-[#7c3aed]">2 Online</span>}
              >
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-[6px] border border-gray-100 dark:border-[#222]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse"></div>
                      <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">RoboVac 01</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500">Cleaning</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-[6px] border border-gray-100 dark:border-[#222]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">RoboVac 02</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500">Docked (100%)</span>
                  </div>
                </div>
              </CollapsibleCard>
            )}
          </div>

          <div className="flex flex-col gap-6 w-[340px] items-end pointer-events-auto">
            {/* Top Right Action Bar */}
            <div className="flex items-center gap-3">
               <button 
                 onClick={() => setVisualizerState(prev => ({ ...prev, mode: prev.mode === 'edit' ? 'live' : 'edit' }))}
                 className="w-10 h-10 rounded-full bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-md flex items-center justify-center text-gray-600 hover:text-[#7c3aed] transition-colors"
               >
                 <PenTool size={16} />
               </button>
               <button className="bg-[#5c4cfc] text-white rounded-full px-6 h-10 text-xs font-bold tracking-wide shadow-lg hover:bg-[#4a3ecc] transition-colors">
                 Add Device
               </button>
               <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white shadow-md overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full object-cover" />
               </div>
            </div>

            {/* Settings Overlay - Conditionally Rendered if Edit Mode */}
            {visualizerState.mode === 'edit' ? (
              <div className="w-full mt-2 h-[calc(100vh-140px)] pointer-events-auto relative">
                <div className="absolute inset-0 bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-xl shadow-2xl rounded-[16px] border border-white/50 overflow-hidden flex flex-col">
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
              </div>
            ) : (
              /* Right Side Data Widgets (Live Mode) */
              <div className="w-full flex flex-col gap-4 max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar pr-2 pb-10">
                 <CollapsibleCard 
                   title="Spatial Isolation" 
                   subtitle="Data Center Sector 4"
                   isOpen={activeRightCard === 'spatial'}
                   onToggle={() => setActiveRightCard(activeRightCard === 'spatial' ? '' : 'spatial')}
                   rightAction={<ToggleSwitch enabled={toggles.spatialIsolation} onChange={() => handleToggle('spatialIsolation')} />}
                 >
                   <div className="flex flex-col items-center py-2">
                     <div className="relative w-full h-24 mb-2 bg-[#111] rounded-[8px] overflow-hidden border border-[#222] flex items-center justify-center shadow-inner">
                        {/* Grid Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]" style={{ backgroundSize: '10px 10px' }}></div>
                        
                        {/* Radar effect */}
                        {toggles.spatialIsolation && (
                          <>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15)_0%,transparent_70%)]"></div>
                            <div className="w-[120px] h-[120px] border border-[#7c3aed]/30 rounded-full absolute animate-[spin_4s_linear_infinite]" style={{ borderTopColor: '#7c3aed', borderRightColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}></div>
                          </>
                        )}
                        <div className="z-10 flex flex-col items-center bg-black/40 backdrop-blur-md px-4 py-2 rounded-[8px] border border-white/10">
                           <ShieldAlert size={16} className={cn("mb-1 transition-colors", toggles.spatialIsolation ? "text-[#7c3aed]" : "text-gray-500")} />
                           <div className={cn("font-mono text-[11px] font-bold tracking-widest", toggles.spatialIsolation ? "text-[#7c3aed]" : "text-gray-500")}>SECURE ZONE</div>
                           <div className="text-gray-400 text-[9px] mt-1 text-center font-medium">Virtual Geofence</div>
                        </div>
                     </div>
                     <div className="w-full flex justify-between items-center bg-gray-50 dark:bg-[#252525]/50 p-2.5 rounded-[8px] border border-gray-100 dark:border-[#222]">
                        <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300">Geofence Status</span>
                        {toggles.spatialIsolation ? (
                          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Monitoring
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-gray-500">Disabled</span>
                        )}
                     </div>
                   </div>
                 </CollapsibleCard>

                 <CollapsibleCard 
                   title="Threat Trajectory" 
                   subtitle="VIP Recognition"
                   isOpen={activeRightCard === 'threat'}
                   onToggle={() => setActiveRightCard(activeRightCard === 'threat' ? '' : 'threat')}
                   rightAction={<ToggleSwitch enabled={toggles.vipTracker} onChange={() => handleToggle('vipTracker')} />}
                 >
                   <div className="flex flex-col pt-2 space-y-3">
                     <div className={cn("flex items-center justify-between p-2.5 rounded-[8px] border transition-colors", toggles.vipTracker ? "bg-amber-500/5 border-amber-500/20" : "bg-gray-50 dark:bg-[#252525]/50 border-gray-100 dark:border-[#222]")}>
                        <div className="flex items-center gap-3">
                           <div className="w-9 h-9 rounded-[6px] bg-gray-200 dark:bg-[#333] overflow-hidden opacity-90">
                              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" alt="VIP" className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <div className="text-[11px] font-black tracking-tight text-gray-900 dark:text-white">Indra P***</div>
                              <div className={cn("text-[9px] font-bold mt-0.5", toggles.vipTracker ? "text-amber-500" : "text-gray-500")}>Platinum Priority</div>
                           </div>
                        </div>
                        {toggles.vipTracker && <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">Active</span>}
                     </div>
                     
                     <div className="bg-gray-50 dark:bg-[#252525]/50 p-3 rounded-[8px] border border-gray-100 dark:border-[#222]">
                        <div className="flex justify-between text-[10px] font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                           <span>Prediction Confidence</span>
                           <span className="font-mono text-gray-900 dark:text-white font-bold">{toggles.vipTracker ? "98.5%" : "--"}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-[#161616] rounded-full h-1.5 overflow-hidden border border-gray-300/50 dark:border-[#333]">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: toggles.vipTracker ? '98.5%' : 0 }}
                             transition={{ duration: 1, delay: 0.2 }}
                             className={cn("h-full rounded-full", toggles.vipTracker ? "bg-amber-500 shadow-[0_0_10px_#f59e0b]" : "bg-transparent")}
                           ></motion.div>
                        </div>
                        <div className="mt-2.5 flex justify-between text-[9px] text-gray-400">
                           <span>Current: Lobby</span>
                           <span>Predicted: Vault</span>
                        </div>
                     </div>
                   </div>
                 </CollapsibleCard>

                 <CollapsibleCard 
                   title="Ergonomic & PPE" 
                   subtitle="Assembly Zone 1"
                   isOpen={activeRightCard === 'ergonomic'}
                   onToggle={() => setActiveRightCard(activeRightCard === 'ergonomic' ? '' : 'ergonomic')}
                   rightAction={<ToggleSwitch enabled={toggles.ergonomics} onChange={() => handleToggle('ergonomics')} />}
                 >
                   <div className="flex gap-3 pt-2">
                     <div className="w-[72px] h-24 bg-gray-50 dark:bg-[#222430] rounded-[8px] border border-gray-100 dark:border-white/5 flex flex-col items-center justify-center relative p-1 overflow-hidden shrink-0">
                       {/* Skeletal mock overlay */}
                       {toggles.ergonomics && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent opacity-60"></div>}
                       <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=100" alt="Worker" className={cn("absolute inset-0 w-full h-full object-cover transition-opacity duration-500", toggles.ergonomics ? "opacity-30 mix-blend-luminosity" : "opacity-80")} />
                       {toggles.ergonomics && (
                         <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 z-10 drop-shadow-[0_0_2px_red]">
                           <line x1="50" y1="20" x2="50" y2="50" stroke="red" strokeWidth="2" />
                           <line x1="50" y1="30" x2="30" y2="60" stroke="red" strokeWidth="2" />
                           <line x1="50" y1="30" x2="70" y2="60" stroke="red" strokeWidth="2" />
                           <circle cx="50" cy="20" r="4" fill="red" />
                           <circle cx="30" cy="60" r="3" fill="red" />
                           <circle cx="70" cy="60" r="3" fill="red" />
                         </svg>
                       )}
                       <span className={cn("absolute bottom-1 right-1 text-[7px] font-mono font-bold bg-black/50 px-1 rounded", toggles.ergonomics ? "text-red-500" : "text-gray-300")}>CAM_04</span>
                     </div>
                     <div className="flex-1 flex flex-col gap-1.5 justify-center">
                       <div className="bg-gray-50 dark:bg-[#252525]/50 p-2 rounded-[6px] border border-gray-100 dark:border-[#222] flex justify-between items-center">
                         <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">Safety Helmet</span>
                         {toggles.ergonomics ? <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">Detected</span> : <span className="text-[9px] font-bold text-gray-400">--</span>}
                       </div>
                       <div className="bg-gray-50 dark:bg-[#252525]/50 p-2 rounded-[6px] border border-gray-100 dark:border-[#222] flex justify-between items-center">
                         <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">Safety Boots</span>
                         {toggles.ergonomics ? <span className="text-[9px] font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded-full">Missing</span> : <span className="text-[9px] font-bold text-gray-400">--</span>}
                       </div>
                       <div className={cn("p-2 rounded-[6px] border flex justify-between items-center transition-colors", toggles.ergonomics ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20" : "bg-gray-50 dark:bg-[#252525]/50 border-gray-100 dark:border-[#222]")}>
                         <span className={cn("text-[10px] font-bold", toggles.ergonomics ? "text-red-600 dark:text-red-400" : "text-gray-500")}>RULA Score</span>
                         <span className={cn("text-[11px] font-black", toggles.ergonomics ? "text-red-600 dark:text-red-400" : "text-gray-500")}>{toggles.ergonomics ? "8 (High Risk)" : "--"}</span>
                       </div>
                     </div>
                   </div>
                 </CollapsibleCard>
              </div>
            )}
          </div>
        </div>

        {/* Properties Popup for selected object */}
        <AnimatePresence>
          {visualizerState.mode === 'edit' && visualizerState.selectedObjectId && (
            <PropertiesPopup
              object={visualizerState.objects.find(o => o.id === visualizerState.selectedObjectId)!}
              useCase={visualizerState.useCase}
              onUpdate={handleUpdateObject.bind(null, visualizerState.selectedObjectId)}
              onClose={() => setVisualizerState(prev => ({ ...prev, selectedObjectId: null }))}
            />
          )}
        </AnimatePresence>
        
        {/* Bottom Left Floating Panel (Alert Log) */}
        <div className="absolute bottom-8 left-6 pointer-events-auto">
          <div className="bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-lg rounded-[16px] p-3 w-72 flex items-center gap-3 relative overflow-hidden">
             {/* Glow effect if active */}
             <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-red-500/20 blur-xl rounded-full pointer-events-none"></div>
             
             <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
               <Bell size={16} />
             </div>
             <div className="flex-1 pr-2">
               <h3 className="text-[12px] font-black text-gray-900 dark:text-white tracking-tight flex items-center justify-between">
                 <span>Intrusion Alert</span>
                 <span className="text-[9px] font-bold text-red-500">Just now</span>
               </h3>
               <p className="text-[10px] text-gray-500 font-medium truncate">Unauthorized access at Server Room B</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

