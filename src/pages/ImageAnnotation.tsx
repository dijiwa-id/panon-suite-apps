import React, { useState, useRef } from 'react';
import { MousePointer2, Square, Hexagon, Maximize, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Save, Settings, Trash2, Plus, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTrain } from '../context/TrainContext';
import { toast } from 'sonner';

interface AnnotationClass {
  id: string;
  name: string;
  color: string;
}

const initialClasses: AnnotationClass[] = [
  { id: '1', name: 'Person', color: '#52C5F3' },
  { id: '2', name: 'Vehicle', color: '#EC3292' },
  { id: '3', name: 'License Plate', color: '#f59e0b' },
  { id: '4', name: 'Weapon', color: '#e11d48' },
];

interface Annotation {
  id: string;
  classId: string;
  x: number; // percentage
  y: number; // percentage
  width: number; // percentage
  height: number; // percentage
}

export const ImageAnnotation = () => {
  const { datasets, incrementDatasetAnnotations } = useTrain();
  const datasetTarget = datasets.length > 0 ? datasets[0].id : null; 
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    { url: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=2000&auto=format&fit=crop', name: 'IMG_20260428_1023.jpg', w: 1920, h: 1080 },
    { url: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=2000&auto=format&fit=crop', name: 'IMG_20260428_1024.jpg', w: 1920, h: 1080 },
    { url: 'https://images.unsplash.com/photo-1542151522-a72eb3c46e38?q=80&w=2000&auto=format&fit=crop', name: 'IMG_20260428_1025.jpg', w: 1920, h: 1080 },
  ];
  const currentImage = images[currentImageIndex];

  const handleNext = () => {
      if (currentImageIndex < images.length - 1) {
          setCurrentImageIndex(prev => prev + 1);
          setAnnotations([]);
          setSelectedAnnotationId(null);
      }
  };

  const handlePrev = () => {
      if (currentImageIndex > 0) {
          setCurrentImageIndex(prev => prev - 1);
          setAnnotations([]);
          setSelectedAnnotationId(null);
      }
  };

  const handleSaveNext = () => {
      if (datasetTarget) {
          incrementDatasetAnnotations(datasetTarget, annotations.length);
      }
      toast.success('Annotations saved successfully');
      handleNext();
  };

  const handleSaveProgress = () => {
      // In a real scenario, this would post to a backend
      localStorage.setItem(`annotations_progress_${currentImage.name}`, JSON.stringify(annotations));
      toast.success('Progress saved');
  };

  const [classes, setClasses] = useState<AnnotationClass[]>(initialClasses);
  const [activeTool, setActiveTool] = useState('box');
  const [activeClass, setActiveClass] = useState('1');
  
  const [annotations, setAnnotations] = useState<Annotation[]>([
    { id: 'a1', classId: '1', x: 30, y: 20, width: 20, height: 40 },
    { id: 'a2', classId: '2', x: 60, y: 60, width: 15, height: 15 }
  ]);
  
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(100);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassColor, setNewClassColor] = useState('#10b981');
  const [annotationToDelete, setAnnotationToDelete] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const saved = localStorage.getItem(`annotations_progress_${currentImage.name}`);
    if (saved) {
      try {
        setAnnotations(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved annotations", e);
      }
    } else {
      // Assuming initial annotations for the first image or empty array
      setAnnotations(currentImageIndex === 0 ? [
        { id: 'a1', classId: '1', x: 30, y: 20, width: 20, height: 40 },
        { id: 'a2', classId: '2', x: 60, y: 60, width: 15, height: 15 }
      ] : []);
    }
    setSelectedAnnotationId(null);
  }, [currentImage.name, currentImageIndex]);

  const handleAddClass = () => {
    if (newClassName.trim()) {
      const newClass = {
        id: Math.random().toString(36).substr(2, 6),
        name: newClassName.trim(),
        color: newClassColor
      };
      setClasses([...classes, newClass]);
      setActiveClass(newClass.id);
      setNewClassName('');
      setNewClassColor('#10b981');
      setIsAddingClass(false);
    }
  };

  const confirmDelete = () => {
    if (annotationToDelete) {
      setAnnotations(annotations.filter(a => a.id !== annotationToDelete));
      if (selectedAnnotationId === annotationToDelete) setSelectedAnnotationId(null);
      setAnnotationToDelete(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool === 'select') {
      setSelectedAnnotationId(null);
      return;
    }
    
    if (activeTool !== 'box' || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setStartPos({ x, y });
    setCurrentPos({ x, y });
    setIsDrawing(true);
    setSelectedAnnotationId(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;
    
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));

    setCurrentPos({ x, y });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    const width = Math.abs(currentPos.x - startPos.x);
    const height = Math.abs(currentPos.y - startPos.y);
    const x = Math.min(currentPos.x, startPos.x);
    const y = Math.min(currentPos.y, startPos.y);
    
    // Ignore very small boxes
    if (width > 1 && height > 1) {
      const newAnnotation: Annotation = {
        id: Math.random().toString(36).substr(2, 9),
        classId: activeClass,
        x,
        y,
        width,
        height
      };
      setAnnotations([...annotations, newAnnotation]);
      setSelectedAnnotationId(newAnnotation.id);
      setActiveTool('select');
    }
  };



  const getClassDetails = (classId: string) => {
    return classes.find(c => c.id === classId) || classes[0];
  };

  // Helper for rendering drawing rect
  const drawingRect = isDrawing ? {
    x: Math.min(currentPos.x, startPos.x),
    y: Math.min(currentPos.y, startPos.y),
    width: Math.abs(currentPos.x - startPos.x),
    height: Math.abs(currentPos.y - startPos.y)
  } : null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleZoomReset = () => setZoom(100);

  return (
    <main className="flex-1 overflow-hidden bg-transparent flex flex-col text-gray-800 dark:text-gray-200">
      {/* Header Toolbar */}
      <div className="h-[60px] border-b border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#161616] flex items-center justify-between px-6 shrink-0 z-40 relative">
        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrev}
            disabled={currentImageIndex === 0}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-white bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="text-center w-40">
            <h1 className="text-sm font-bold text-gray-900 dark:text-white truncate">{currentImage.name}</h1>
            <p className="text-[10px] text-gray-500 font-mono mt-0.5 uppercase tracking-widest font-black">{currentImageIndex + 1} of {images.length} • {currentImage.w}x{currentImage.h}</p>
          </div>
          <button 
            onClick={handleNext}
            disabled={currentImageIndex === images.length - 1}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-white bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 bg-gray-50/50 dark:bg-[#1a1a1a] p-1 rounded-xl border border-gray-200 dark:border-[#222]">
          {[
            { id: 'select', icon: <MousePointer2 size={14} />, label: 'Select' },
            { id: 'box', icon: <Square size={14} />, label: 'Box' },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={cn(
                "p-2 rounded-lg flex items-center gap-2 transition-all text-xs font-semibold select-none",
                activeTool === tool.id ? "bg-gray-200 dark:bg-[#2a2a2a] text-gray-900 dark:text-white shadow-sm" : "hover:bg-gray-100 dark:hover:bg-[#202020] text-gray-600 dark:text-gray-400"
              )}
            >
              {tool.icon} {tool.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button 
             onClick={handleSaveProgress}
             className="flex items-center gap-2 bg-gray-50/50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:bg-gray-100 dark:hover:bg-[#202020] text-gray-900 dark:text-gray-300 h-[32px] rounded-lg text-xs font-bold px-4 transition-colors"
          >
            <Save size={14} /> Save Progress
          </button>
          <button 
             onClick={handleSaveNext}
             disabled={currentImageIndex === images.length - 1}
             className="flex items-center gap-2 bg-secondary/10 border border-secondary/20 hover:bg-secondary/20 text-secondary h-[32px] rounded-lg text-xs font-bold px-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={14} /> Save & Next
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Canvas Area */}
        <div className="flex-1 relative bg-gray-50 dark:bg-[#161616] overflow-hidden flex items-center justify-center p-8 overflow-y-auto">
            <div className="absolute inset-0 pattern-dots pattern-gray-800 pattern-bg-transparent pattern-size-4 pattern-opacity-40"></div>
            
            {/* Mock Image container */}
            <div 
              ref={containerRef}
              className="relative w-full max-w-4xl aspect-video bg-gray-50/50 dark:bg-[#1a1a1a] shadow-2xl rounded-sm ring-1 ring-white/5 transition-transform origin-center"
              style={{ transform: `scale(${zoom / 100})`, cursor: activeTool === 'box' ? 'crosshair' : 'default' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-70"
                  style={{ backgroundImage: `url('${currentImage.url}')` }}
                ></div>
                
                {/* Dynamically Rendered Annotations */}
                {annotations.map((annotation) => {
                  const itemClass = getClassDetails(annotation.classId);
                  const isSelected = selectedAnnotationId === annotation.id;
                  return (
                    <div 
                      key={annotation.id}
                      onClick={(e) => {
                        if (activeTool === 'select') {
                           e.stopPropagation();
                           setSelectedAnnotationId(annotation.id);
                        }
                      }}
                      className={cn(
                        "absolute border-2 transition-colors",
                         isSelected ? "bg-white/10 z-20" : "bg-transparent/10 z-10 hover:bg-white/10"
                      )}
                      style={{ 
                        left: `${annotation.x}%`, 
                        top: `${annotation.y}%`, 
                        width: `${annotation.width}%`, 
                        height: `${annotation.height}%`,
                        borderColor: itemClass.color,
                        backgroundColor: `${itemClass.color}15`,
                        boxShadow: isSelected ? `0 0 0 2px white, 0 0 15px ${itemClass.color}80` : 'none',
                        cursor: activeTool === 'select' ? 'pointer' : 'crosshair'
                      }}
                    >
                      <div 
                        className="absolute -top-6 -left-[2px] text-black text-[10px] font-bold px-1.5 py-0.5 whitespace-nowrap"
                        style={{ backgroundColor: itemClass.color }}
                      >
                        {itemClass.name}
                      </div>

                      {/* Handles for selected annotation */}
                      {isSelected && ['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map(pos => (
                          <div key={pos} className={`absolute w-2 h-2 bg-white border border-black ${pos} -mt-1 -ml-1`}></div>
                      ))}
                    </div>
                  );
                })}

                {/* Drawing rect (temporary annotation while drawing) */}
                {isDrawing && drawingRect && (
                  <div 
                    className="absolute border-2 border-dashed bg-white/10 z-30 pointer-events-none"
                    style={{
                      left: `${drawingRect.x}%`,
                      top: `${drawingRect.y}%`,
                      width: `${drawingRect.width}%`,
                      height: `${drawingRect.height}%`,
                      borderColor: getClassDetails(activeClass).color
                    }}
                  />
                )}
            </div>

            {/* Canvas Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gray-50 dark:bg-[#161616]/90 backdrop-blur-md p-1.5 rounded-full border border-gray-200 dark:border-[#222] shadow-xl z-40">
                <button onClick={handleZoomOut} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-200 dark:bg-[#2a2a2a] rounded-full text-gray-600 dark:text-gray-400 hover:text-white transition-colors"><ZoomOut size={16} /></button>
                <button onClick={handleZoomReset} className="text-xs font-mono font-medium text-gray-900 dark:text-white px-2 hover:text-accent transition-colors">{zoom}%</button>
                <button onClick={handleZoomIn} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-200 dark:bg-[#2a2a2a] rounded-full text-gray-600 dark:text-gray-400 hover:text-white transition-colors"><ZoomIn size={16} /></button>
                <div className="w-px h-4 bg-gray-200 dark:bg-[#2a2a2a] mx-1"></div>
                <button onClick={handleZoomReset} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-200 dark:bg-[#2a2a2a] rounded-full text-gray-600 dark:text-gray-400 hover:text-white transition-colors"><Maximize size={16} /></button>
            </div>
        </div>

        {/* Right Sidebar - Classes & Instances */}
        <div className="w-80 border-l border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#161616] flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-200 dark:border-[#222]">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Label Classes</h2>
            <div className="space-y-1.5">
              {classes.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveClass(c.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-2 rounded-lg transition-all text-sm",
                    activeClass === c.id ? "bg-gray-200 dark:bg-[#2a2a2a] text-gray-900 dark:text-white select-none" : "hover:bg-[#1a1a1a] text-gray-600 dark:text-gray-400"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-sm border border-white/20" style={{ backgroundColor: c.color }}></div>
                    <span className="font-medium">{c.name}</span>
                  </div>
                  <span className="bg-gray-50/50 dark:bg-[#1a1a1a] text-[10px] font-mono px-2 py-0.5 rounded text-gray-500 border border-gray-200 dark:border-[#222] uppercase tracking-widest font-black">
                    {c.id}
                  </span>
                </button>
              ))}
            </div>
            
            {isAddingClass ? (
              <div className="mt-3 bg-gray-50/50 dark:bg-[#1a1a1a] p-2 rounded-lg border border-gray-200 dark:border-[#222]">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="color"
                    value={newClassColor}
                    onChange={(e) => setNewClassColor(e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0"
                  />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Class name..."
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddClass()}
                    className="flex-1 bg-transparent border-none text-xs text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none min-w-0"
                  />
                  <button onClick={() => setIsAddingClass(false)} className="text-gray-500 hover:text-white p-1 shrink-0">
                    <X size={12} />
                  </button>
                </div>
                <button 
                  onClick={handleAddClass}
                  className="w-full bg-accent text-black font-bold text-xs py-1.5 rounded-md hover:bg-accent/90 transition-colors"
                >
                  Save
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAddingClass(true)}
                className="w-full mt-3 border border-dashed border-gray-200 dark:border-[#222] hover:border-accent hover:text-accent hover:bg-accent/5 text-gray-500 rounded-lg py-2 text-[10px] font-black transition-all flex items-center justify-center gap-1.5 uppercase tracking-widest"
              >
                  <Plus size={14} /> Add Class
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
             <div className="flex items-center justify-between mb-4">
                 <h2 className="text-sm font-bold text-gray-900 dark:text-white">Instances ({annotations.length})</h2>
                 <button className="text-gray-500 hover:text-white"><Settings size={14}/></button>
             </div>
             
             <div className="space-y-2">
                 {annotations.map((annotation, index) => {
                   const itemClass = getClassDetails(annotation.classId);
                   const isSelected = selectedAnnotationId === annotation.id;

                   return (
                     <div 
                       key={annotation.id}
                       onClick={() => {
                          setSelectedAnnotationId(annotation.id);
                          setActiveTool('select');
                       }}
                       className={cn(
                           "bg-gray-50/50 dark:bg-[#1a1a1a] p-3 rounded-xl border transition-colors group cursor-pointer",
                           isSelected ? "border-white" : "border-gray-200 dark:border-[#222] hover:border-gray-500"
                       )}
                     >
                         <div className="flex justify-between items-center mb-2">
                             <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: itemClass.color }}></div>
                                <span className={cn("text-sm font-semibold selection:bg-accent/30", isSelected ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300")}>{itemClass.name} {index + 1}</span>
                             </div>
                             <button 
                               onClick={(e) => { e.stopPropagation(); setAnnotationToDelete(annotation.id); }}
                               className={cn("text-gray-600 hover:text-red-500 transition-opacity", isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100")}
                             >
                                <Trash2 size={14}/>
                             </button>
                         </div>
                         <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest font-black">BBox [{Math.round(annotation.x)}%, {Math.round(annotation.y)}%, {Math.round(annotation.width)}%, {Math.round(annotation.height)}%]</div>
                     </div>
                   );
                 })}
                 {annotations.length === 0 && (
                     <div className="text-center py-6 border border-gray-200 dark:border-[#222] border-dashed rounded-xl">
                         <div className="text-[10px] text-gray-500 font-medium uppercase tracking-widest font-black">No instances added yet.</div>
                     </div>
                 )}
                 
                 {/* Delete Confirmation Modal */}
                 {annotationToDelete && (
                   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                     <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-2xl p-6 w-full max-w-sm">
                       <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Delete Annotation</h2>
                       <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Are you sure you want to delete this annotation? This action cannot be undone.</p>
                       <div className="flex gap-3 justify-end">
                         <button onClick={() => setAnnotationToDelete(null)} className="px-4 py-2 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-200 dark:bg-[#2a2a2a] transition-colors">Cancel</button>
                         <button onClick={confirmDelete} className="px-4 py-2 rounded-lg text-sm font-bold bg-red-600 text-gray-900 dark:text-white hover:bg-red-700 transition-colors">Delete</button>
                       </div>
                     </div>
                   </div>
                 )}
             </div>
          </div>
        </div>
      </div>
    </main>
  );
};
