import React, { useState } from 'react';
import { AccuracyLineChart, AccuracyCircularCard } from './ChartCards';
import { StatsGrid } from './StatsGrid';
import { ImageAnnotationTable, AnomalyTable, RequestList, TableCard } from './Tables';
import { ApplicationTab } from './ApplicationTab';
import { ImageAnnotationDetail } from './ImageAnnotation';
import { Search, Grid, List, MoreVertical, Activity } from 'lucide-react';
import { cn } from '../lib/utils';


export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'application' | 'modules'>('modules');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="flex-1 overflow-y-auto bg-transparent text-gray-900 dark:text-white transition-colors p-6 md:p-8 custom-scrollbar">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
          <div className="flex-1">
            <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-5 tracking-tight">Analytic Dashboard</h2>
            <div className="flex gap-4 border-b border-gray-200 dark:border-[#222] pb-0">
              <button 
                onClick={() => setActiveTab('modules')}
                className={cn(
                  "text-[11px] tracking-tight font-bold transition-colors pb-2.5 relative flex flex-col items-center group",
                  activeTab === 'modules' ? "text-accent" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                Modules
                {activeTab === 'modules' && <span className="absolute bottom-[-1px] w-full h-[1px] bg-accent transition-transform"></span>}
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
            <button className="text-[11px] font-bold tracking-tight text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
               Add Module
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
    </main>
  );
};
