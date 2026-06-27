import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, Save, Trash2, Crosshair, Target, Shapes, MousePointer2, Check, X, Edit2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { Select } from '../components/ui';

type FeatureType = 'Perimeter' | 'Detection Area' | 'ROI Counting' | 'Heat Detection' | 'Crowd Detection' | 'Crowd Counting';

interface Point { x: number; y: number }

interface ROI {
  id: string;
  name: string;
  type: FeatureType;
  color: string;
  coordinates: Point[];
}

const CAMERAS = [
  { id: 'CAM-001', name: 'Main Gate Camera', url: 'https://cdn.pixabay.com/video/2019/11/17/29272-373809675_medium.mp4' },
  { id: 'CAM-002', name: 'Warehouse Entry', url: 'https://cdn.pixabay.com/video/2019/11/17/29272-373809675_medium.mp4' },
  { id: 'CAM-003', name: 'Assembly Line A', url: 'https://cdn.pixabay.com/video/2019/11/17/29272-373809675_medium.mp4' },
  { id: 'CAM-004', name: 'Loading Dock', url: 'https://cdn.pixabay.com/video/2019/11/17/29272-373809675_medium.mp4' },
];

const FEATURE_COLORS: Record<FeatureType, string> = {
  'Perimeter': '#ef4444',
  'Detection Area': '#3b82f6',
  'ROI Counting': '#10b981',
  'Heat Detection': '#f97316',
  'Crowd Detection': '#8b5cf6',
  'Crowd Counting': '#ec4899',
};

export const VideoGeneration = () => {
  const [selectedCamera, setSelectedCamera] = useState(CAMERAS[0].id);
  const [activeFeature, setActiveFeature] = useState<FeatureType>('Perimeter');
  const [rois, setRois] = useState<ROI[]>([
    {
      id: 'roi-1',
      name: 'Main Entrance Perimeter',
      type: 'Perimeter',
      color: '#ef4444',
      coordinates: [{ x: 10, y: 10 }, { x: 90, y: 10 }, { x: 90, y: 90 }, { x: 10, y: 90 }]
    }
  ]);
  
  // Interactive Editor State
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState<Point[]>([]);
  const [selectedRoiId, setSelectedRoiId] = useState<string | null>('roi-1');
  const [editingRoiNameId, setEditingRoiNameId] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mutable state for drag interactions to ensure smooth 60fps rendering without React state lag
  const dragState = useRef<{ nodeRoiId: string | null, nodeIndex: number | null, isDragging: boolean }>({
    nodeRoiId: null,
    nodeIndex: null,
    isDragging: false
  });
  const mousePos = useRef<Point>({ x: 0, y: 0 });

  const getCanvasPos = (clientX: number, clientY: number): Point => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100
    };
  };

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize to match display size for crisp rendering
    if (containerRef.current) {
        if (canvas.width !== containerRef.current.clientWidth || canvas.height !== containerRef.current.clientHeight) {
           canvas.width = containerRef.current.clientWidth;
           canvas.height = containerRef.current.clientHeight;
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const drawPolygon = (pts: Point[], color: string, isSelected: boolean, name?: string) => {
      if (pts.length === 0) return;
      
      ctx.beginPath();
      pts.forEach((p, i) => {
        const x = (p.x / 100) * canvas.width;
        const y = (p.y / 100) * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      
      // Close path if it's a finished ROI
      if (name !== undefined) {
         ctx.closePath();
      }

      ctx.fillStyle = isSelected ? `${color}40` : `${color}20`; // Hex alpha
      if (name !== undefined) ctx.fill();

      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.strokeStyle = color;
      
      // Dashed line if drawing
      if (name === undefined) {
          ctx.setLineDash([5, 5]);
      } else {
          ctx.setLineDash([]);
      }
      ctx.stroke();
      ctx.setLineDash([]); // Reset

      // Draw nodes
      pts.forEach((p, i) => {
        const x = (p.x / 100) * canvas.width;
        const y = (p.y / 100) * canvas.height;
        ctx.beginPath();
        // Slightly larger nodes for selected
        const radius = isSelected ? 5 : 4;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = isSelected ? 'white' : color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = isSelected ? color : 'white';
        ctx.stroke();
      });

      // Label
      if (name && pts.length > 0) {
        const startX = (pts[0].x / 100) * canvas.width;
        const startY = (pts[0].y / 100) * canvas.height;
        
        ctx.font = 'bold 11px Inter, sans-serif';
        const textWidth = ctx.measureText(name).width;
        
        // Label background
        ctx.fillStyle = isSelected ? color : '#000000CC';
        ctx.fillRect(startX - 2, startY - 22, textWidth + 12, 20);
        
        // Label text
        ctx.fillStyle = 'white';
        ctx.fillText(name, startX + 4, startY - 8);
      }
    };

    // Draw saved ROIs
    rois.forEach(roi => {
      drawPolygon(roi.coordinates, roi.color, roi.id === selectedRoiId, roi.name);
    });

    // Draw active drawing polygon + line to mouse
    if (isDrawingMode && currentPolygon.length > 0) {
      const activeColor = FEATURE_COLORS[activeFeature];
      drawPolygon(currentPolygon, activeColor, true);
      
      // Line from last point to mouse
      const lastPt = currentPolygon[currentPolygon.length - 1];
      ctx.beginPath();
      ctx.moveTo((lastPt.x / 100) * canvas.width, (lastPt.y / 100) * canvas.height);
      ctx.lineTo((mousePos.current.x / 100) * canvas.width, (mousePos.current.y / 100) * canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = `${activeColor}80`;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
    }
  }, [rois, isDrawingMode, currentPolygon, selectedRoiId, activeFeature]);

  // Initial draw and resize observer
  useEffect(() => {
    drawCanvas();
    window.addEventListener('resize', drawCanvas);
    return () => window.removeEventListener('resize', drawCanvas);
  }, [drawCanvas]);

  // Handle Canvas Mouse Events
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const pos = getCanvasPos(e.clientX, e.clientY);
    
    if (isDrawingMode) {
      // Add point
      if (currentPolygon.length >= 3 && Math.abs(pos.x - currentPolygon[0].x) < 3 && Math.abs(pos.y - currentPolygon[0].y) < 3) {
        // If clicked near the first point and we have at least 3 points, finish drawing
        finishDrawing();
      } else {
        setCurrentPolygon([...currentPolygon, pos]);
      }
      return;
    }

    // Check if clicking a node to drag
    let clickedNode = false;
    for (let roi of rois) {
      for (let i = 0; i < roi.coordinates.length; i++) {
        const p = roi.coordinates[i];
        if (Math.abs(p.x - pos.x) < 2.5 && Math.abs(p.y - pos.y) < 2.5) {
          dragState.current = { nodeRoiId: roi.id, nodeIndex: i, isDragging: true };
          setSelectedRoiId(roi.id);
          clickedNode = true;
          break;
        }
      }
      if (clickedNode) break;
    }

    // If not a node, check if clicking inside a polygon to select it
    if (!clickedNode) {
       let found = false;
       for (let roi of rois) {
          const xs = roi.coordinates.map(c => c.x);
          const ys = roi.coordinates.map(c => c.y);
          const minX = Math.min(...xs), maxX = Math.max(...xs);
          const minY = Math.min(...ys), maxY = Math.max(...ys);
          if (pos.x >= minX && pos.x <= maxX && pos.y >= minY && pos.y <= maxY) {
             setSelectedRoiId(roi.id);
             found = true;
             break;
          }
       }
       if (!found) setSelectedRoiId(null);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const pos = getCanvasPos(e.clientX, e.clientY);
    mousePos.current = pos;
    
    if (isDrawingMode) {
      drawCanvas(); // Trigger redraw to update the line to mouse
      return;
    }

    if (dragState.current.isDragging && dragState.current.nodeRoiId !== null && dragState.current.nodeIndex !== null) {
      const roisCopy = [...rois];
      const roiIdx = roisCopy.findIndex(r => r.id === dragState.current.nodeRoiId);
      if (roiIdx >= 0) {
         const coordsCopy = [...roisCopy[roiIdx].coordinates];
         coordsCopy[dragState.current.nodeIndex] = {
           x: Math.max(0, Math.min(100, pos.x)),
           y: Math.max(0, Math.min(100, pos.y))
         };
         
         const newRoi = { ...roisCopy[roiIdx], coordinates: coordsCopy };
         roisCopy[roiIdx] = newRoi;
         setRois(roisCopy); // State update handles redraw
      }
    }
  };

  const handlePointerUp = () => {
    dragState.current = { nodeRoiId: null, nodeIndex: null, isDragging: false };
  };

  // End Drawing Actions
  const finishDrawing = () => {
    if (currentPolygon.length >= 3) {
      const newRoi: ROI = {
        id: `roi-${Date.now()}`,
        name: `${activeFeature} ${rois.filter(r => r.type === activeFeature).length + 1}`,
        type: activeFeature,
        color: FEATURE_COLORS[activeFeature],
        coordinates: currentPolygon
      };
      setRois([...rois, newRoi]);
      setSelectedRoiId(newRoi.id);
      toast.success(`${activeFeature} added.`);
    } else {
      toast.error('A region must have at least 3 points.');
    }
    setCurrentPolygon([]);
    setIsDrawingMode(false);
  };

  const cancelDrawing = () => {
    setCurrentPolygon([]);
    setIsDrawingMode(false);
  };

  const removeROI = (id: string) => {
    setRois(rois.filter(r => r.id !== id));
    if (selectedRoiId === id) setSelectedRoiId(null);
    toast.success('Region removed.');
  };

  const saveConfiguration = () => {
    toast.success('Camera ROI configuration successfully saved to server.');
  };

  const updateRoiName = (id: string, newName: string) => {
    setRois(rois.map(r => r.id === id ? { ...r, name: newName } : r));
    setEditingRoiNameId(null);
  };

  return (
    <main className="flex-1 overflow-hidden bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-gray-200 dark:border-[#222] pb-6 shrink-0">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1 flex items-center gap-2">
            <Target size={16} className="text-[#52C5F3]" />
            Camera ROI Configuration
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">
            Draw and manage detection zones, perimeters, and specialized areas of interest for AI analysis.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#333] rounded-md px-3 py-1.5 flex items-center gap-2 shadow-sm">
            <Camera size={14} className="text-gray-500" />
            <Select 
              value={selectedCamera}
              onChange={e => setSelectedCamera(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-800 dark:text-gray-200 outline-none border-none cursor-pointer"
            >
              {CAMERAS.map(cam => (
                <option key={cam.id} value={cam.id} className="bg-white dark:bg-[#111]">{cam.name} ({cam.id})</option>
              ))}
            </Select>
          </div>
          <Button onClick={saveConfiguration}>
            <Save size={14} /> Deploy
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* Left Sidebar - Configuration Tools */}
        <div className="lg:col-span-3 flex flex-col h-full bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-sm overflow-hidden shrink-0">
          <div className="p-4 border-b border-gray-100 dark:border-[#222]">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Annotation Tools</h3>
             
             <div className="grid grid-cols-2 gap-2 mb-4">
               {(Object.keys(FEATURE_COLORS) as FeatureType[]).map(feature => (
                 <button
                   key={feature}
                   onClick={() => !isDrawingMode && setActiveFeature(feature)}
                   disabled={isDrawingMode}
                   className={cn(
                     "relative flex flex-col items-start p-3 rounded-lg text-left transition-all border",
                     activeFeature === feature
                       ? `bg-[${FEATURE_COLORS[feature]}]/5 border-[${FEATURE_COLORS[feature]}]/30 shadow-sm ring-1 ring-[${FEATURE_COLORS[feature]}]/20`
                       : "bg-gray-50 dark:bg-[#161616] border-gray-200 dark:border-[#333] hover:border-gray-300 dark:hover:border-gray-500",
                     isDrawingMode && activeFeature !== feature && "opacity-50 cursor-not-allowed grayscale"
                   )}
                 >
                   <div className="flex items-center gap-2 mb-1.5 w-full">
                     <span className="w-2.5 h-2.5 rounded-full shadow-sm shrink-0" style={{ backgroundColor: FEATURE_COLORS[feature] }} />
                     <span className={cn("text-xs font-bold leading-tight line-clamp-1", activeFeature === feature ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300")}>{feature}</span>
                   </div>
                 </button>
               ))}
             </div>

             {/* Action Button */}
             {!isDrawingMode ? (
                 <Button 
                   onClick={() => setIsDrawingMode(true)}
                   className="w-full"
                 >
                   <Crosshair size={14} /> Start {activeFeature}
                 </Button>
             ) : (
                <div className="flex gap-2">
                   <Button 
                     onClick={finishDrawing}
                     className="flex-1 text-[#52C5F3]"
                   >
                     <Check size={14} /> Finish
                   </Button>
                   <Button 
                     onClick={cancelDrawing}
                     variant="outline"
                     className="w-12 px-0 text-red-500 hover:text-red-600 border-gray-700 bg-[#1c1c1c] hover:bg-[#2a2a2a]"
                   >
                     <X size={14} />
                   </Button>
                </div>
             )}
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto custom-scrollbar bg-gray-50/50 dark:bg-[#161616]/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Configured Regions</h3>
              <span className="text-[10px] bg-gray-200 dark:bg-[#333] text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full font-bold">
                {rois.length} Total
              </span>
            </div>
            
            <div className="space-y-2">
              {rois.length === 0 ? (
                <div className="flex flex-col flex-1 items-center justify-center p-8 text-center border border-dashed border-gray-300 dark:border-[#444] rounded-[11px] h-40">
                  <Shapes size={24} className="text-gray-300 dark:text-gray-600 mb-2" />
                  <p className="text-xs font-bold text-gray-500">No ROIs configured</p>
                  <p className="text-[10px] text-gray-400 mt-1">Select a tool and start drawing</p>
                </div>
              ) : (
                rois.map((roi) => (
                  <div 
                    key={roi.id} 
                    onClick={() => !isDrawingMode && setSelectedRoiId(roi.id)}
                    className={cn(
                      "group flex flex-col gap-2 p-3 rounded-[11px] border transition-all cursor-pointer",
                      selectedRoiId === roi.id 
                        ? "bg-white dark:bg-[#222] border-blue-500/50 shadow-md ring-1 ring-blue-500/20" 
                        : "bg-white dark:bg-[#1a1a1a] border-gray-100 dark:border-[#2a2a2a] hover:border-gray-300 dark:hover:border-gray-600 shadow-sm"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                       <div className="flex items-center gap-2 flex-1 min-w-0">
                         <div className="w-3 h-3 rounded shadow-inner shrink-0" style={{ backgroundColor: roi.color }} />
                         
                         {editingRoiNameId === roi.id ? (
                            <input 
                              autoFocus
                              defaultValue={roi.name}
                              onBlur={(e) => updateRoiName(roi.id, e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') updateRoiName(roi.id, e.currentTarget.value);
                                if (e.key === 'Escape') setEditingRoiNameId(null);
                              }}
                              className="flex-1 bg-gray-100 dark:bg-[#111] border border-gray-300 dark:border-[#444] rounded px-1.5 py-0.5 text-xs font-bold text-gray-900 dark:text-white outline-none w-full"
                            />
                         ) : (
                            <p className="text-xs font-bold text-gray-900 dark:text-white truncate" title={roi.name}>{roi.name}</p>
                         )}
                       </div>
                       
                       <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                           onClick={(e) => { e.stopPropagation(); setEditingRoiNameId(roi.id); }}
                           className="p-1 text-gray-400 hover:text-blue-500 transition-colors rounded"
                         >
                           <Edit2 size={12} />
                         </button>
                         <button 
                           onClick={(e) => { e.stopPropagation(); removeROI(roi.id); }}
                           className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded"
                         >
                           <Trash2 size={12} />
                         </button>
                       </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[9px] font-bold bg-gray-100 dark:bg-[#111] text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded tracking-wide uppercase">
                         {roi.type}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                         {roi.coordinates.length} pts
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Area - Video Canvas Editor */}
        <div className="lg:col-span-9 flex flex-col h-full bg-[#0a0a0a] rounded-[11px] shadow-lg border border-gray-800 overflow-hidden relative">
          
          {/* Status Overlay */}
          <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-start pointer-events-none">
             <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-3 flex flex-col gap-1 inline-block pointer-events-auto shadow-2xl">
                <div className="flex items-center gap-3">
                   <div className="relative flex items-center justify-center w-4 h-4">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                   </div>
                   <span className="text-xs font-black text-white uppercase tracking-widest">LIVE STREAM</span>
                   <span className="text-[10px] text-gray-400 font-mono ml-2 border-l border-white/20 pl-3">1080p / 24fps / H264</span>
                </div>
             </div>

             {isDrawingMode && (
                <div className="bg-[#52C5F3] text-[#0a0a0a] px-4 py-2 rounded-full font-bold text-xs shadow-lg shadow-[#52C5F3]/20 flex items-center gap-2 animate-bounce flex-shrink-0">
                  <MousePointer2 size={14} /> 
                  {currentPolygon.length === 0 ? "Click to start drawing" : "Click to add points, click 'Finish' when done"}
                </div>
             )}
          </div>
          
          {/* Main Drawing Canvas Container */}
          <div 
            ref={containerRef} 
            className={cn(
               "flex-1 relative overflow-hidden w-full h-full",
               isDrawingMode ? "cursor-crosshair" : "cursor-default"
            )}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Background Simulated Video feed */}
            <video 
               key={selectedCamera}
               src={CAMERAS.find(c => c.id === selectedCamera)?.url || ''} 
               className={cn(
                 "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
                 isDrawingMode ? "opacity-40 grayscale-[30%]" : "opacity-80"
               )}
               autoPlay
               loop
               muted
               playsInline
            />
            {/* Editor grid overlay for precision context */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />
            
            {/* Interactive Canvas Layer */}
            <canvas 
              ref={canvasRef}
              className="absolute inset-0 w-full h-full z-20 touch-none"
              style={{ padding: 0 }}
            />
          </div>

          {/* Bottom Tooltip Bar */}
          <div className="h-8 bg-[#111] border-t border-gray-800 flex items-center px-4 justify-between z-30 shadow-inner">
             <p className="text-[10px] text-gray-500 flex items-center gap-2">
                {!isDrawingMode ? (
                   <>Drag nodes to adjust regions. Click a region to select it.</>
                ) : (
                   <>Feature: <strong style={{ color: FEATURE_COLORS[activeFeature] }}>{activeFeature}</strong></>
                )}
             </p>
             <p className="text-[10px] text-gray-500 font-mono">
                {selectedCamera}
             </p>
          </div>
        </div>
      </div>
    </main>
  );
};


