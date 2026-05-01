import React, { useState } from 'react';
import { AccuracyLineChart, AccuracyCircularCard } from './ChartCards';
import { StatsGrid } from './StatsGrid';
import { ImageAnnotationTable, AnomalyTable, RequestList, TableCard } from './Tables';
import { ApplicationTab } from './ApplicationTab';
import { ImageAnnotationDetail } from './ImageAnnotation';
import { Search, Grid, List, MoreVertical, Activity, X, GripVertical, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

const initialLayout = [
  { id: '1', name: 'Accuracy Timeline', type: 'chart' },
  { id: '2', name: 'Overall Accuracy', type: 'donut' },
  { id: '3', name: 'Key Statistics', type: 'stats' },
  { id: '4', name: 'Image Annotations', type: 'table' },
  { id: '5', name: 'Anomaly Detections', type: 'table' },
  { id: '6', name: 'Recent Requests', type: 'list' },
];

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'application' | 'dashboard'>('dashboard');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [layoutItems, setLayoutItems] = useState(initialLayout);
  
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardName, setNewCardName] = useState('');
  const [newCardType, setNewCardType] = useState('chart');

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;
    
    const currIndex = layoutItems.findIndex(i => i.id === draggedId);
    const targetIndex = layoutItems.findIndex(i => i.id === targetId);
    
    const newItems = [...layoutItems];
    const [removed] = newItems.splice(currIndex, 1);
    newItems.splice(targetIndex, 0, removed);
    
    setLayoutItems(newItems);
    setDraggedId(null);
  };

  const handleAddCard = () => {
    if (newCardName.trim()) {
      setLayoutItems([{ id: Date.now().toString(), name: newCardName, type: newCardType }, ...layoutItems]);
      setIsAddingCard(false);
      setNewCardName('');
      setNewCardType('chart');
    }
  };

  const handleRemoveCard = (id: string) => {
    setLayoutItems(layoutItems.filter(item => item.id !== id));
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent text-gray-900 dark:text-white transition-colors p-6 md:p-8 custom-scrollbar">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
          <div className="flex-1">
            <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-5 tracking-tight">Analytic Dashboard</h2>
            <div className="flex gap-4 border-b border-gray-200 dark:border-[#222] pb-0">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={cn(
                  "text-[11px] tracking-tight font-bold transition-colors pb-2.5 relative flex flex-col items-center group",
                  activeTab === 'dashboard' ? "text-accent" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                Dashboard
                {activeTab === 'dashboard' && <span className="absolute bottom-[-1px] w-full h-[1px] bg-accent transition-transform"></span>}
              </button>
              <button 
                onClick={() => setActiveTab('application')}
                className={cn(
                  "text-[11px] tracking-tight font-bold transition-colors pb-2.5 relative flex flex-col items-center group",
                  activeTab === 'application' ? "text-accent" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                Application
                {activeTab === 'application' && <span className="absolute bottom-[-1px] w-full h-[1px] bg-accent transition-transform"></span>}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 border-b border-transparent pb-2.5">
            <button 
              onClick={() => setIsCustomModalOpen(true)}
              className="text-[11px] flex items-center gap-1.5 font-bold tracking-tight text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
               <Plus size={12} /> Custom Dashboard
            </button>
            <div className="flex items-center gap-2 opacity-80">
               <Grid 
                 size={14} 
                 onClick={() => setViewMode('grid')}
                 className={cn("cursor-pointer transition-colors", viewMode === 'grid' ? "text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:hover:text-white")}
               />
               <List 
                 size={14} 
                 onClick={() => setViewMode('list')}
                 className={cn("cursor-pointer transition-colors", viewMode === 'list' ? "text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:hover:text-white")}
               />
               <div className="w-[1px] h-3 bg-gray-300 dark:bg-gray-700 mx-1"></div>
               <MoreVertical size={14} className="text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors"/>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2.5 mb-4">
          <button 
             onClick={() => setActiveTab('application')}
             className="bg-white dark:bg-[#1c1c1c] border border-gray-300 dark:border-gray-700 h-8 text-gray-900 dark:text-white rounded-full text-[11px] font-bold tracking-tight px-5 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors leading-[12px]"
          >
             Type All
          </button>
          <button className="bg-transparent border border-gray-300 dark:border-[#2a2a2a] h-8 text-gray-700 dark:text-gray-300 rounded-full text-[11px] font-bold tracking-tight px-4 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors leading-[12px]">+ Add Filter</button>
          <div className="relative group ml-1 h-8 w-48 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={10} />
            <input 
              type="text"
              placeholder="Search data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border border-gray-300 dark:border-[#2a2a2a] rounded-full h-full w-full pl-8 pr-3 text-[11px] font-medium text-gray-900 dark:text-white focus:outline-none focus:border-accent/50 dark:focus:border-[#3a3a3a] transition-colors placeholder:text-gray-500 tracking-tight"
            />
          </div>
        </div>

        {/* Main Content */}
        {activeTab === 'application' ? (
          <ApplicationTab searchQuery={searchQuery} viewMode={viewMode} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4">
            {/* Row 1 */}
            <div className="lg:col-span-2 h-full min-h-[220px]">
                <AccuracyLineChart />
            </div>
            <div className="lg:col-span-1 h-full min-h-[220px]">
                <AccuracyCircularCard />
            </div>
            <div className="lg:col-span-2 h-full min-h-[220px]">
                <StatsGrid />
            </div>

            {/* Row 2 */}
            <div className="lg:col-span-2 h-full">
              <ImageAnnotationTable />
            </div>
            <div className="lg:col-span-1 h-full">
              <AnomalyTable />
            </div>
            <div className="lg:col-span-2 h-full">
              <RequestList />
            </div>

            {/* Row 3 */}
            <div className="lg:col-span-2 h-full min-h-[300px]">
              <ImageAnnotationDetail />
            </div>
            <div className="lg:col-span-2 h-full min-h-[300px]">
              <ImageAnnotationTable isRow3 />
            </div>
            <div className="lg:col-span-1 h-full min-h-[300px]">
              <AnomalyTable isRow3 />
            </div>
          </div>
        )}
      </div>

      {/* Custom Dashboard Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#161616] w-full max-w-md rounded-[16px] shadow-2xl border border-gray-200 dark:border-[#2a2a2a] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-[#222]">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">Configure Custom Dashboard</h3>
              <button onClick={() => setIsCustomModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto w-full max-h-[60vh] custom-scrollbar">
              <p className="text-xs text-gray-500 mb-4 tracking-wide font-medium">Drag and drop the widgets below to reorder your dashboard layout.</p>
              
              {!isAddingCard ? (
                <button 
                  onClick={() => setIsAddingCard(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl mb-4 text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-[#222] transition-all"
                >
                  <Plus size={14} /> Add Card
                </button>
              ) : (
                <div className="bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-xl border border-gray-200 dark:border-[#222] mb-4">
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">Card Name</label>
                      <input 
                        type="text" 
                        value={newCardName}
                        onChange={(e) => setNewCardName(e.target.value)}
                        placeholder="e.g. Daily Anomalies"
                        className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-[8px] px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#52C5F3] focus:border-[#52C5F3] outline-none transition-all placeholder:text-gray-400"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-1.5">Card Type</label>
                      <select 
                        value={newCardType}
                        onChange={(e) => setNewCardType(e.target.value)}
                        className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-[8px] px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#52C5F3] focus:border-[#52C5F3] outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="chart">Line Chart</option>
                        <option value="donut">Donut Chart</option>
                        <option value="stats">Summary Stats</option>
                        <option value="table">Data Table</option>
                        <option value="list">Recent List</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                       <button 
                         onClick={() => setIsAddingCard(false)}
                         className="px-4 py-1.5 text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] rounded-lg transition-colors"
                       >
                         Cancel
                       </button>
                       <button 
                         onClick={handleAddCard}
                         disabled={!newCardName.trim()}
                         className="px-4 py-1.5 text-xs font-bold bg-[#1c1c1c] dark:bg-white text-white dark:text-black rounded-lg transition-colors hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                       >
                         Add Card
                       </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {layoutItems.map(item => (
                  <div 
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, item.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 bg-white dark:bg-[#1c1c1c] rounded-xl border transition-all cursor-grab active:cursor-grabbing",
                      draggedId === item.id ? "opacity-30 scale-[0.98] border-dashed border-gray-400 dark:border-gray-500 shadow-inner" : "border-gray-200 dark:border-[#2a2a2a] shadow-sm hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md"
                    )}
                  >
                    <div className="text-gray-300 dark:text-gray-600 hover:text-gray-500 transition-colors">
                      <GripVertical size={16} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">{item.name}</h4>
                      <p className="text-[10px] font-medium text-gray-500 tracking-wider uppercase mt-0.5">{item.type}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-4 rounded-full bg-[#52C5F3]/20 flex items-center p-0.5 pointer-events-none">
                        <div className="w-3 h-3 rounded-full bg-[#52C5F3] translate-x-4 shadow-[0_0_10px_rgba(82,197,243,0.5)]"></div>
                      </div>
                      <button 
                        onClick={() => handleRemoveCard(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove Card"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a] flex justify-end gap-3">
              <button 
                onClick={() => setIsCustomModalOpen(false)}
                className="px-4 h-8 text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#252525] rounded-full transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsCustomModalOpen(false)}
                className="px-6 h-8 text-xs font-bold bg-[#1c1c1c] dark:bg-white text-white dark:text-black rounded-full transition-colors hover:shadow-md"
              >
                Save Layout
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

