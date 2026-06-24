import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ChevronLeft, ChevronRight, Filter, Play, Pause } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Select } from '../components/ui/select';

// Mock Data Initializer
const generateMockData = () => Array.from({ length: 50 }).map((_, i) => ({
  id: `det-${i}`,
  datetime: `2026-06-${Math.floor(Math.random() * 14 + 1).toString().padStart(2, '0')} 21:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
  context: ['Parkir Liar', 'Safety Helmet', 'Intrusion'][Math.floor(Math.random() * 3)],
  camera: ['CAM-001 Front Gate', 'CAM-002 Main Entrance', 'CAM-003 Assembly Line'][Math.floor(Math.random() * 3)],
  roi: ['Left Zone', 'Right Zone', 'Center', 'Perimeter'][Math.floor(Math.random() * 4)],
  classes: ['car', 'motorbike', 'person', 'truck'][Math.floor(Math.random() * 4)],
  channel: ['001', '002', '003'][Math.floor(Math.random() * 3)],
})).sort((a, b) => b.datetime.localeCompare(a.datetime));

export const DetectionHistory = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState(() => generateMockData());
  const [isLiveView, setIsLiveView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Live View Simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLiveView) {
      interval = setInterval(() => {
        const now = new Date();
        const newDetection = {
          id: `det-live-${Date.now()}`,
          datetime: now.toISOString().replace('T', ' ').substring(0, 19),
          context: ['Parkir Liar', 'Safety Helmet', 'Intrusion'][Math.floor(Math.random() * 3)],
          camera: ['CAM-001 Front Gate', 'CAM-002 Main Entrance', 'CAM-003 Assembly Line'][Math.floor(Math.random() * 3)],
          roi: ['Left Zone', 'Right Zone', 'Center', 'Perimeter'][Math.floor(Math.random() * 4)],
          classes: ['car', 'motorbike', 'person', 'truck'][Math.floor(Math.random() * 4)],
          channel: ['001', '002', '003'][Math.floor(Math.random() * 3)],
        };
        setHistoryData(prev => [newDetection, ...prev]);
        setCurrentPage(1); // Auto-scroll to top when live
      }, 5000); // 5 seconds for demonstration purposes
    }
    return () => clearInterval(interval);
  }, [isLiveView]);
  
  const [filterContext, setFilterContext] = useState('all');
  const [filterCamera, setFilterCamera] = useState('all');
  const [filterChannel, setFilterChannel] = useState('all');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  const [activeFilters, setActiveFilters] = useState({
    context: 'all',
    camera: 'all',
    channel: 'all',
    dateFrom: '',
    dateTo: ''
  });

  const handleApplyFilters = () => {
    setActiveFilters({
      context: filterContext,
      camera: filterCamera,
      channel: filterChannel,
      dateFrom: filterDateFrom,
      dateTo: filterDateTo
    });
    setCurrentPage(1);
  };

  const filteredData = historyData.filter(item => {
    if (activeFilters.context !== 'all') {
      if (activeFilters.context === 'parkir' && item.context !== 'Parkir Liar') return false;
      if (activeFilters.context === 'helmet' && item.context !== 'Safety Helmet') return false;
    }
    if (activeFilters.camera !== 'all') {
      if (activeFilters.camera === 'cam-001' && !item.camera.includes('CAM-001')) return false;
      if (activeFilters.camera === 'cam-002' && !item.camera.includes('CAM-002')) return false;
    }
    if (activeFilters.channel !== 'all' && item.channel !== activeFilters.channel) return false;
    
    if (activeFilters.dateFrom) {
      if (new Date(item.datetime) < new Date(activeFilters.dateFrom)) return false;
    }
    if (activeFilters.dateTo) {
      if (new Date(item.datetime) > new Date(activeFilters.dateTo)) return false;
    }
    
    return true;
  });

  const itemsPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-[1600px] mx-auto min-h-full flex flex-col gap-8 lg:gap-10">
        {/* Title */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1">Detection History</h1>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Browse, filter, and review comprehensive detection logs.</p>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1.5 w-40">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Date From</label>
            <Input 
              type="datetime-local" 
              className="h-8 text-xs bg-white dark:bg-[#1c1c1c] border-gray-200 dark:border-[#222]" 
              value={filterDateFrom}
              onChange={(e) => setFilterDateFrom(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5 w-40">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Date To</label>
            <Input 
              type="datetime-local" 
              className="h-8 text-xs bg-white dark:bg-[#1c1c1c] border-gray-200 dark:border-[#222]" 
              value={filterDateTo}
              onChange={(e) => setFilterDateTo(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5 w-48">
             <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Context</label>
             <Select 
               className="h-8 text-xs bg-white dark:bg-[#1c1c1c] border-gray-200 dark:border-[#222]"
               value={filterContext}
               onChange={(e) => setFilterContext(e.target.value)}
             >
                <option value="all">All Contexts</option>
                <option value="parkir">Parkir Liar</option>
                <option value="helmet">Safety Helmet</option>
             </Select>
          </div>
          <div className="flex flex-col gap-1.5 w-48">
             <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Camera</label>
             <Select 
               className="h-8 text-xs bg-white dark:bg-[#1c1c1c] border-gray-200 dark:border-[#222]"
               value={filterCamera}
               onChange={(e) => setFilterCamera(e.target.value)}
             >
                <option value="all">All Cameras</option>
                <option value="cam-001">CAM-001 Front Gate</option>
                <option value="cam-002">CAM-002 Main Entrance</option>
             </Select>
          </div>
          <div className="flex flex-col gap-1.5 w-32">
             <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Channel</label>
             <Select 
               className="h-8 text-xs bg-white dark:bg-[#1c1c1c] border-gray-200 dark:border-[#222]"
               value={filterChannel}
               onChange={(e) => setFilterChannel(e.target.value)}
             >
                <option value="all">All Channels</option>
                <option value="001">001</option>
                <option value="002">002</option>
             </Select>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button
              variant={isLiveView ? "default" : "outline"}
              className={cn(
                "h-8 rounded-full text-xs font-bold px-4 flex items-center gap-2 tracking-wide leading-[12px] transition-colors",
                isLiveView 
                  ? "bg-red-500 hover:bg-red-600 text-white border-transparent" 
                  : "bg-white dark:bg-[#1c1c1c] border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a]"
              )}
              onClick={() => setIsLiveView(!isLiveView)}
            >
              {isLiveView ? (
                <>
                  <Pause size={12} fill="currentColor" />
                  Live (Pause)
                </>
              ) : (
                <>
                  <Play size={12} fill="currentColor" />
                  Live View
                </>
              )}
            </Button>
            <Button 
              className="h-8 bg-[#1c1c1c] border border-gray-700 text-white rounded-full text-xs font-bold px-6 hover:bg-[#2a2a2a] transition-colors flex items-center gap-2 tracking-wide leading-[12px]"
              onClick={handleApplyFilters}
            >
              <Filter size={12} />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Table */}
        <Card className="rounded-[11px] bg-white dark:bg-[#1e1e1e] border-gray-100 dark:border-[#222] flex-1 flex flex-col shadow-sm overflow-hidden">
          <div className="flex-1 overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-[#161616] border-b border-gray-100 dark:border-[#222]">
                <tr>
                  <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">Date / Time</th>
                  <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">Context</th>
                  <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">Camera</th>
                  <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">RoI</th>
                  <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase">Classes</th>
                  <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase text-center">Channel</th>
                  <th className="px-6 py-3 text-[10px] font-black tracking-widest text-gray-500 uppercase text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#252525]">
                {currentItems.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-[#252525]/30 transition-colors">
                    <td className="px-6 py-3.5 text-xs font-mono font-medium text-gray-900 dark:text-gray-300">{item.datetime}</td>
                    <td className="px-6 py-3.5 text-xs font-medium text-gray-900 dark:text-gray-300">{item.context}</td>
                    <td className="px-6 py-3.5 text-xs text-gray-900 dark:text-gray-400">{item.camera}</td>
                    <td className="px-6 py-3.5 text-xs text-gray-600 dark:text-gray-500">{item.roi}</td>
                    <td className="px-6 py-3.5 text-xs font-medium text-[#52C5F3]">{item.classes}</td>
                    <td className="px-6 py-3.5 text-xs font-mono text-center text-gray-900 dark:text-gray-400">{item.channel}</td>
                    <td className="px-6 py-3.5 text-right">
                       <button 
                         className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors text-[10px] font-black tracking-widest uppercase translate-y-[1px]"
                         onClick={() => navigate('/orchestration/detection-evidence')}
                       >
                         [ view ]
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-[#222] bg-white dark:bg-[#1a1a1a]">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
              Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
            </span>
            <div className="flex gap-1.5">
              <Button 
                variant="outline" 
                className="h-7 w-7 p-0 bg-transparent border-gray-200 dark:border-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222]" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                <ChevronLeft size={14} />
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let displayPage = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  displayPage = currentPage - 2 + i;
                  if (displayPage > totalPages) {
                    displayPage = totalPages - 5 + i + 1;
                  }
                }
                
                return (
                  <Button
                    key={displayPage}
                    variant={currentPage === displayPage ? 'default' : 'outline'}
                    className={cn(
                      "h-7 w-7 p-0 text-[10px] font-bold rounded-md", 
                      currentPage === displayPage 
                        ? "bg-[#52C5F3] text-black hover:bg-[#40a0c6] border-transparent" 
                        : "bg-transparent border-gray-200 dark:border-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222]"
                    )}
                    onClick={() => setCurrentPage(displayPage)}
                  >
                    {displayPage}
                  </Button>
                )
              })}
              <Button 
                variant="outline" 
                className="h-7 w-7 p-0 bg-transparent border-gray-200 dark:border-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222]" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              >
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
};
