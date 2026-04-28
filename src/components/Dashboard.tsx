import React from 'react';
import { AccuracyLineChart, AccuracyCircularCard } from './ChartCards';
import { StatsGrid } from './StatsGrid';
import { ImageAnnotationTable, AnomalyTable, RequestList, TableCard } from './Tables';
import { ImageAnnotationDetail } from './ImageAnnotation';
import { Search, Grid, List, MoreVertical } from 'lucide-react';
import { cn } from '../lib/utils';

export const Dashboard = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-[#f1f1f1] dark:bg-[#151515] text-gray-900 dark:text-white transition-colors p-6 md:p-8 custom-scrollbar">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="flex-1">
            <h2 className="text-[26px] font-normal text-gray-900 dark:text-white mb-6">Analytic Dashboard</h2>
            <div className="flex gap-8 border-b border-gray-200 dark:border-white/5 pb-0">
              <button className="text-sm font-medium text-gray-700 dark:text-white pb-3 cursor-pointer hover:text-accent transition-colors">
                Application
              </button>
              <button className="text-sm font-medium text-accent pb-3 cursor-pointer relative flex flex-col items-center">
                Modules
                <span className="absolute bottom-0 w-8 h-0.5 bg-accent rounded-t-full"></span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 border-b border-transparent pb-3">
            <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
               Add module
            </button>
            <div className="flex items-center gap-1.5 opacity-60">
               <Grid size={16} className="text-gray-700 dark:text-white"/>
               <List size={16} className="text-gray-500"/>
               <MoreVertical size={16} className="text-gray-700 dark:text-white"/>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 mb-6">
          <button className="btn-secondary min-w-[80px]">Type All</button>
          <button className="btn-secondary !bg-transparent border-gray-300 dark:border-white/10 hover:!bg-gray-200 dark:hover:!bg-[#2a2a2a]">+ Add a Filter</button>
          <div className="relative group ml-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={12} />
            <input 
              type="text"
              placeholder="Search"
              className="bg-transparent border border-gray-300 dark:border-white/[0.08] rounded-full h-[35px] w-24 pl-8 text-[15px] font-normal font-sans text-gray-900 dark:text-white focus:outline-none focus:border-accent/50 dark:focus:border-white/20 transition-colors placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
          {/* Row 1 */}
          <div className="lg:col-span-2 h-full">
              <AccuracyLineChart />
          </div>
          <div className="lg:col-span-1 h-full">
              <AccuracyCircularCard />
          </div>
          <div className="lg:col-span-2 h-full">
              <StatsGrid />
          </div>

          {/* Row 2 */}
          <div className="lg:col-span-2">
            <ImageAnnotationTable />
          </div>
          <div className="lg:col-span-1">
            <AnomalyTable />
          </div>
          <div className="lg:col-span-2">
            <RequestList />
          </div>

          {/* Row 3 */}
          <div className="lg:col-span-2 h-full">
            <ImageAnnotationDetail />
          </div>
          <div className="lg:col-span-2 h-full">
            <ImageAnnotationTable isRow3 />
          </div>
          <div className="lg:col-span-1 h-full">
            <AnomalyTable isRow3 />
          </div>
        </div>
      </div>
    </main>
  );
};
