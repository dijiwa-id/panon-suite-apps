import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Camera } from 'lucide-react';

export const DeployLiveFeedCamera = () => {
  const location = useLocation();

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#161616] p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div className="flex-1">
            <h2 className="text-[16px] font-bold text-gray-900 dark:text-white mb-5 tracking-tight">Deploy Dashboard</h2>
            <div className="flex gap-4 border-b border-gray-200 dark:border-[#222] pb-0">
              {[
                { label: 'Overview', path: '/deploy/dashboard' },
                { label: 'Live Feed', path: '/deploy/live-feed-camera' },
                { label: 'Detection Log', path: '/deploy/detection-log' },
                { label: 'Report', path: '/deploy/report' }
              ].map(tab => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={cn(
                    "text-[11px] tracking-tight font-bold transition-colors pb-2.5 relative flex flex-col items-center group",
                    location.pathname === tab.path ? "text-accent" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  {tab.label}
                  {location.pathname === tab.path && <span className="absolute bottom-[-1px] w-full h-[1px] bg-accent transition-transform"></span>}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex flex-col gap-4">
           {/* Section Title */}
           <div className="flex items-center gap-2 mb-2">
              <Camera size={18} className="text-gray-500" />
              <h3 className="text-lg font-black tracking-tight text-gray-900 dark:text-white">Live Feed Camera</h3>
           </div>
           
           <div className="card-glass bg-white dark:bg-[#1e1e1e] p-6 rounded-[11px] border border-gray-100 dark:border-[#222] shadow-sm flex flex-col items-center justify-center h-[500px]">
             <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mb-4 text-gray-400">
                <Camera size={24} />
             </div>
             <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">No Cameras Connected</h4>
             <p className="text-gray-500 text-xs text-center max-w-sm">Connect a camera stream to start monitoring realtime inference.</p>
           </div>
        </div>

      </div>
    </main>
  );
};
