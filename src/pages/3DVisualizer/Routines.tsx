import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Calendar, Clock, Map, Video, Brain, Plus, Search, Filter, MoreVertical, ShieldCheck, Route, Zap } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { cn } from '../../lib/utils';

type RoutineStatus = 'active' | 'paused' | 'running';

interface Routine {
  id: string;
  name: string;
  description: string;
  status: RoutineStatus;
  schedule: string;
  environment: string;
  zones: string[];
  models: string[];
  lastRun: string;
  nextRun: string;
}

const MOCK_ROUTINES: Routine[] = [
  {
    id: 'RTN-001',
    name: 'Night Perimeter Patrol',
    description: 'Sequentially activates perimeter cameras and runs intrusion detection.',
    status: 'active',
    schedule: 'Daily, 22:00 - 05:00',
    environment: 'Smart Office HQ - Ext',
    zones: ['Zone Alpha', 'Zone Beta', 'Gate A'],
    models: ['Intrusion Detection v2.1', 'Vehicle Recognition'],
    lastRun: 'Today, 05:00 AM',
    nextRun: 'Today, 10:00 PM',
  },
  {
    id: 'RTN-002',
    name: 'Lobby Crowd Density Analysis',
    description: 'Continuous monitoring of lobby occupancy and flow during peak hours.',
    status: 'running',
    schedule: 'Mon-Fri, 08:00 - 18:00',
    environment: 'Smart Office HQ - L1',
    zones: ['Main Lobby', 'Reception', 'Elevator Bank A'],
    models: ['Crowd Density Estimation', 'Face Detection'],
    lastRun: 'Started at 08:00 AM',
    nextRun: 'Continuous (Running)',
  },
  {
    id: 'RTN-003',
    name: 'Server Room Env Audit',
    description: 'Hourly check of thermal cameras and IoT sensors in data center.',
    status: 'active',
    schedule: 'Every Hour',
    environment: 'Smart Office HQ - L2',
    zones: ['Data Center Alpha'],
    models: ['Thermal Anomaly v1.0'],
    lastRun: '15 mins ago',
    nextRun: 'In 45 mins',
  },
  {
    id: 'RTN-004',
    name: 'Weekend Drone Sweep',
    description: 'Automated aerial survey of logistics yard using drone station.',
    status: 'paused',
    schedule: 'Sat-Sun, 12:00 & 18:00',
    environment: 'Logistics Center Alpha',
    zones: ['Yard A', 'Loading Dock 1-4'],
    models: ['Asset Tracking', 'Unauthorized Personnel'],
    lastRun: 'Last Sunday, 18:00',
    nextRun: 'Paused',
  }
];

export default function Routines() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoutines = MOCK_ROUTINES.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.environment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: RoutineStatus) => {
    switch (status) {
      case 'active': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'paused': return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
      case 'running': return 'text-green-400 bg-green-500/10 border-green-500/20';
    }
  };

  const getStatusIcon = (status: RoutineStatus) => {
    switch (status) {
      case 'active': return <Play size={12} className="fill-current" />;
      case 'paused': return <Pause size={12} className="fill-current" />;
      case 'running': return <Zap size={12} className="fill-current animate-pulse" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#161616]">
      <div className="max-w-[1600px] mx-auto min-h-full p-6 lg:p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Spatial Routines</h1>
            <p className="text-sm text-gray-400 mt-2 font-medium max-w-2xl">
              Automate monitoring tasks, schedule AI model deployments across specific zones, and manage spatial patrol logic.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white text-black border border-white h-9 rounded-full text-xs font-bold tracking-wide px-5 hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Plus size={16} /> Create Routine
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search routines, zones, or environments..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-[#1e1e1e] border border-[#333] rounded-full text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar w-full sm:w-auto pb-2 sm:pb-0">
             <button className="bg-[#252525] border border-[#333] h-9 text-gray-300 rounded-full text-xs font-bold tracking-wide px-4 hover:bg-[#2a2a2a] transition-colors flex items-center gap-2 whitespace-nowrap">
              <Filter size={14} /> Filter: All
            </button>
            <button className="bg-[#252525] border border-[#333] h-9 text-gray-300 rounded-full text-xs font-bold tracking-wide px-4 hover:bg-[#2a2a2a] transition-colors whitespace-nowrap">
              By Schedule
            </button>
            <button className="bg-[#252525] border border-[#333] h-9 text-gray-300 rounded-full text-xs font-bold tracking-wide px-4 hover:bg-[#2a2a2a] transition-colors whitespace-nowrap">
              By Environment
            </button>
          </div>
        </div>

        {/* Routine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRoutines.map((routine, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={routine.id}
            >
              <Card className="bg-[#1e1e1e] border border-[#222] hover:border-[#333] transition-all overflow-hidden flex flex-col h-full group">
                <div className="p-6 flex-1 flex flex-col">
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="p-3 bg-[#252525] rounded-xl text-accent border border-[#333] group-hover:border-accent/50 transition-colors">
                        <Route size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-white tracking-tight">{routine.name}</h3>
                        <p className="text-[10px] font-mono text-gray-500 mt-0.5">{routine.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider",
                        getStatusColor(routine.status)
                      )}>
                        {getStatusIcon(routine.status)}
                        {routine.status}
                      </div>
                      <button className="text-gray-500 hover:text-white transition-colors p-1">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-1">
                    {routine.description}
                  </p>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6">
                     <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-gray-500 uppercase mb-1.5">
                        <Map size={12} /> Target Environment
                      </div>
                      <p className="text-xs font-bold text-gray-200">{routine.environment}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-gray-500 uppercase mb-1.5">
                        <Calendar size={12} /> Schedule
                      </div>
                      <p className="text-xs font-bold text-gray-200">{routine.schedule}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                       <div className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-2">Target Zones</div>
                       <div className="flex flex-wrap gap-2">
                         {routine.zones.map(zone => (
                           <span key={zone} className="px-2 py-1 bg-[#252525] border border-[#333] rounded text-[10px] font-medium text-gray-300">
                             {zone}
                           </span>
                         ))}
                       </div>
                    </div>
                    <div>
                       <div className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-2">Deployed Models</div>
                       <div className="flex flex-wrap gap-2">
                         {routine.models.map(model => (
                           <span key={model} className="px-2 py-1 bg-accent/10 border border-accent/20 rounded text-[10px] font-medium text-accent flex items-center gap-1">
                             <Brain size={10} /> {model}
                           </span>
                         ))}
                       </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] border-t border-[#252525] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[10px] font-medium text-gray-400">
                    <span className="flex items-center gap-1.5"><Clock size={12} /> Last: {routine.lastRun}</span>
                    <span className="flex items-center gap-1.5"><Play size={12} /> Next: {routine.nextRun}</span>
                  </div>
                  <div className="flex gap-2">
                    {routine.status === 'paused' ? (
                       <button className="h-7 px-3 bg-[#252525] hover:bg-[#333] text-gray-300 rounded text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5">
                        <Play size={12} /> Resume
                      </button>
                    ) : (
                       <button className="h-7 px-3 bg-[#252525] hover:bg-[#333] text-gray-300 rounded text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5">
                        <Pause size={12} /> Pause
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
