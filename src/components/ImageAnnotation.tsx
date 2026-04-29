import React from 'react';

export const ImageAnnotationDetail = () => {
  return (
    <div className="card-glass p-0 col-span-3 h-full flex flex-col min-h-[300px] overflow-hidden relative shadow-sm border border-gray-200 dark:border-[#222] bg-white dark:bg-[#1e1e1e]">
      <div className="p-4 bg-white/5 border-b border-[#222]/40 shrink-0 backdrop-blur-md absolute top-0 z-10 w-full flex justify-between items-center">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight leading-none">Live Camera Feed</h3>
        <span className="bg-secondary/20 text-secondary border border-secondary/30 px-2 py-0.5 rounded text-[8px] font-bold animate-pulse">Live</span>
      </div>

      <div className="relative flex-1 bg-gray-50 dark:bg-[#111] w-full h-full">
         <img 
            src="https://images.unsplash.com/photo-1573356070624-9b88d3f18a28?auto=format&fit=crop&q=80&w=1600" 
            alt="cctv feed parking lot"
            className="w-full h-full object-cover opacity-70 pointer-events-none mix-blend-luminosity mix-blend-opacity"
            draggable={false}
            referrerPolicy="no-referrer"
         />
         
         <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/40 pointer-events-none"></div>

         <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md font-mono border border-white/10 px-3 py-1 rounded text-[10px] font-bold text-gray-700 dark:text-gray-300 tracking-wider">
           REC • 03:00:24
         </div>

         {/* Tracking Line & Points */}
         <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full">
              <polyline 
                points="10%,90% 30%,70% 60%,50%" 
                fill="none" 
                stroke="#EC3292" 
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-70"
              />
              <polyline 
                points="60%,50% 80%,40%" 
                fill="none" 
                stroke="#EC3292" 
                strokeWidth="1.5"
              />
            </svg>
            
            {/* Target Box 1 */}
            <div className="absolute left-[30%] top-[70%] -translate-x-1/2 -translate-y-1/2 border border-accent bg-accent/10 w-16 h-12 rounded-sm flex flex-col justify-end">
               <div className="bg-accent text-black text-[7px] font-bold px-1 m-[-1px] rounded-tl-sm rounded-br-sm w-fit">V-302</div>
            </div>
            
             {/* Target Box 2 */}
            <div className="absolute left-[60%] top-[50%] -translate-x-1/2 -translate-y-1/2 border-[1.5px] border-accent bg-accent/20 w-12 h-10 rounded-sm flex flex-col justify-end shadow-[0_0_15px_rgba(0,209,255,0.4)]">
               <div className="bg-accent text-black text-[7px] font-bold px-1 m-[-1.5px] rounded-tl-sm rounded-br-sm w-fit">V-881</div>
            </div>
            
            {/* Target Box 3 */}
            <div className="absolute left-[80%] top-[40%] -translate-x-1/2 -translate-y-1/2 border border-accent bg-accent/10 w-10 h-8 rounded-sm flex flex-col justify-end">
               <div className="bg-accent text-black text-[7px] font-bold px-1 m-[-1px] rounded-tl-sm rounded-br-sm w-fit">V-904</div>
            </div>
         </div>

         {/* Tooltip on overlay */}
         <div className="absolute bottom-4 right-4 bg-white dark:bg-[#1e1e1e]/90 backdrop-blur-md border border-gray-200 dark:border-[#2a2a2a] px-3 py-1.5 rounded-[11px] shadow-xl flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#252525] transition-colors pointer-events-auto">
            <div className="flex gap-0.5 opacity-60">
               <div className="w-[3px] h-3 bg-white rounded-full"></div>
               <div className="w-[3px] h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-[9px] font-bold text-gray-900 dark:text-white">Disable</span>
         </div>
      </div>
    </div>
  );
};
