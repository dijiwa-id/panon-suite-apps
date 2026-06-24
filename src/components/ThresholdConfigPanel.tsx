import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui';
import { Settings, Save, Server, Cpu, HardDrive, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface Thresholds {
  [workstationId: string]: {
    cpu: number;
    ram: number;
    network: number;
  }
}

interface ThresholdConfigPanelProps {
  workstations: { id: string; name: string }[];
  thresholds: Thresholds;
  onSave: (thresholds: Thresholds) => void;
}

export const ThresholdConfigPanel: React.FC<ThresholdConfigPanelProps> = ({ workstations, thresholds, onSave }) => {
  const [localThresholds, setLocalThresholds] = useState<Thresholds>(thresholds);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = (id: string, field: keyof Thresholds[string], value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0 || numValue > 100) return;
    
    setLocalThresholds(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: numValue
      }
    }));
  };

  const handleSave = () => {
    onSave(localThresholds);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="flex justify-end mb-4">
        <Button 
           variant="outline" 
           onClick={() => setIsOpen(true)}
           className="border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] text-xs h-9 px-4 rounded-full font-bold flex items-center gap-2"
        >
          <Settings size={14} />
          Configure Alert Thresholds
        </Button>
      </div>
    );
  }

  return (
    <Card className="p-6 rounded-[11px] bg-white dark:bg-[#1e1e1e] border-gray-100 dark:border-[#222] shadow-sm mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
           <h3 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
             <Settings size={16} className="text-[#52C5F3]" />
             Alert Threshold Configuration
           </h3>
           <p className="text-xs text-gray-500 mt-1">Set maximum percentage before critical alerts are triggered.</p>
        </div>
        <div className="flex gap-2">
           <Button 
              variant="outline" 
              onClick={() => {
                setLocalThresholds(thresholds);
                setIsOpen(false);
              }}
              className="text-xs h-8 px-4 rounded-full font-bold"
           >
             Cancel
           </Button>
           <Button 
              onClick={handleSave}
              className="bg-[#52C5F3] hover:bg-[#3eaedb] text-white text-xs h-8 px-4 rounded-full font-bold flex items-center gap-1.5"
           >
             <Save size={14} />
             Save Changes
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workstations.map(ws => (
          <div key={ws.id} className="bg-gray-50/50 dark:bg-[#1a1a1a]/50 border border-gray-100 dark:border-[#222] rounded-lg p-4">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-[#333]">
              {ws.name} <span className="text-gray-400 font-mono ml-2">({ws.id})</span>
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                 <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Cpu size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest text-[10px]">CPU Limit (%)</span>
                 </div>
                 <input 
                    type="number"
                    min="0"
                    max="100"
                    value={localThresholds[ws.id]?.cpu || 90}
                    onChange={(e) => handleUpdate(ws.id, 'cpu', e.target.value)}
                    className="w-16 bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#333] rounded px-2 py-1 text-xs font-mono text-gray-900 dark:text-white outline-none focus:border-[#52C5F3] focus:ring-1 focus:ring-[#52C5F3]"
                 />
              </div>

              <div className="flex items-center justify-between gap-4">
                 <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Server size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest text-[10px]">RAM Limit (%)</span>
                 </div>
                 <input 
                    type="number"
                    min="0"
                    max="100"
                    value={localThresholds[ws.id]?.ram || 85}
                    onChange={(e) => handleUpdate(ws.id, 'ram', e.target.value)}
                    className="w-16 bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#333] rounded px-2 py-1 text-xs font-mono text-gray-900 dark:text-white outline-none focus:border-[#52C5F3] focus:ring-1 focus:ring-[#52C5F3]"
                 />
              </div>

              <div className="flex items-center justify-between gap-4">
                 <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Activity size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest text-[10px]">Net Limit (%)</span>
                 </div>
                 <input 
                    type="number"
                    min="0"
                    max="100"
                    value={localThresholds[ws.id]?.network || 80}
                    onChange={(e) => handleUpdate(ws.id, 'network', e.target.value)}
                    className="w-16 bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#333] rounded px-2 py-1 text-xs font-mono text-gray-900 dark:text-white outline-none focus:border-[#52C5F3] focus:ring-1 focus:ring-[#52C5F3]"
                 />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
