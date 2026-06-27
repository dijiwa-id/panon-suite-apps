import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, ShieldAlert, Zap, Info, MapPin, Video, Search, Filter, Calendar, ChevronDown, Bell, Camera } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { cn } from '../../lib/utils';

type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

interface SpatialEvent {
  id: string;
  timestamp: string;
  type: string;
  message: string;
  severity: Severity;
  environment: string;
  zone: string;
  source: string;
  modelTrigger?: string;
  snapshot?: string;
  read: boolean;
}

const MOCK_EVENTS: SpatialEvent[] = [
  {
    id: 'EVT-9042',
    timestamp: '10:45:22 AM - Today',
    type: 'Intrusion Detection',
    message: 'Unauthorized person detected in restricted area.',
    severity: 'critical',
    environment: 'Smart Office HQ - Ext',
    zone: 'Server Room Corridor',
    source: 'CAM-012 (Dome PTZ)',
    modelTrigger: 'Security Perimeter v2.1',
    snapshot: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&q=80',
    read: false,
  },
  {
    id: 'EVT-9041',
    timestamp: '10:12:05 AM - Today',
    type: 'Environmental Alert',
    message: 'Temperature spike detected. Ambient 29°C exceeds threshold (24°C).',
    severity: 'high',
    environment: 'Logistics Center Alpha',
    zone: 'Cold Storage B',
    source: 'SNS-TH-04 (Thermal Sensor)',
    modelTrigger: 'Env Audit Rule',
    read: false,
  },
  {
    id: 'EVT-9040',
    timestamp: '09:30:00 AM - Today',
    type: 'System Status',
    message: 'Routine "Morning Sweep" completed successfully. No anomalies found.',
    severity: 'info',
    environment: 'Smart Office HQ - L1',
    zone: 'Multiple Zones',
    source: 'System Orchestrator',
    read: true,
  },
  {
    id: 'EVT-9039',
    timestamp: '08:45:12 AM - Today',
    type: 'Crowd Analytics',
    message: 'Lobby capacity reached 85%. Automated flow diversion suggested.',
    severity: 'medium',
    environment: 'Smart Office HQ - L1',
    zone: 'Main Lobby',
    source: 'CAM-002 (Lobby Wide)',
    modelTrigger: 'Crowd Density Estimation v1.5',
    read: true,
  },
  {
    id: 'EVT-9038',
    timestamp: '02:15:30 AM - Today',
    type: 'Motion Detected',
    message: 'Movement detected outside operating hours in yard.',
    severity: 'low',
    environment: 'Logistics Center Alpha',
    zone: 'Yard Loading Dock',
    source: 'CAM-105 (Bullet)',
    modelTrigger: 'Basic Motion Sensing',
    read: true,
  },
  {
    id: 'EVT-9037',
    timestamp: 'Yesterday, 11:20 PM',
    type: 'Device Offline',
    message: 'IoT Gateway Primary stopped responding to health checks.',
    severity: 'high',
    environment: 'Smart Office HQ - L1',
    zone: 'IT Comm Room',
    source: 'Health Monitor Agent',
    read: true,
  }
];

export default function SpatialActivity() {
  const [searchTerm, setSearchTerm] = useState('');

  const getSeverityStyles = (severity: Severity) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
      case 'low': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'info': return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getSeverityIcon = (severity: Severity) => {
    switch (severity) {
      case 'critical': return <ShieldAlert size={14} />;
      case 'high': return <ShieldAlert size={14} />;
      case 'medium': return <Zap size={14} />;
      case 'low': return <Activity size={14} />;
      case 'info': return <Info size={14} />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#161616]">
      <div className="max-w-[1600px] mx-auto min-h-full p-6 lg:p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Spatial Activity Log</h1>
            <p className="text-sm text-gray-400 mt-2 font-medium max-w-2xl">
              Centralized timeline of all events, detections, and system changes occurring within your mapped 3D environments.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <button className="bg-[#1e1e1e] border border-[#333] h-9 text-gray-300 rounded-full text-xs font-bold tracking-wide px-5 hover:bg-[#252525] transition-colors flex items-center gap-2">
              <Bell size={14} /> Mark All Read
            </button>
            <button className="bg-white text-black border border-white h-9 rounded-full text-xs font-bold tracking-wide px-5 hover:bg-gray-200 transition-colors">
              Export Log
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search events, messages, sources..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-[#1e1e1e] border border-[#333] rounded-full text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar w-full sm:w-auto">
             <button className="bg-[#1c1c1c] text-white border border-gray-700 h-9 rounded-full text-xs font-bold uppercase tracking-wider px-4 transition-colors whitespace-nowrap flex items-center gap-1.5">
              <Filter size={14} /> All Events
            </button>
            <button className="bg-[#1e1e1e] text-gray-400 border border-[#333] hover:bg-[#252525] h-9 rounded-full text-xs font-bold uppercase tracking-wider px-4 transition-colors whitespace-nowrap">
              Critical
            </button>
            <button className="bg-[#1e1e1e] text-gray-400 border border-[#333] hover:bg-[#252525] h-9 rounded-full text-xs font-bold uppercase tracking-wider px-4 transition-colors whitespace-nowrap">
              High
            </button>
             <div className="h-5 w-px bg-[#333] mx-1"></div>
            <button className="bg-[#1e1e1e] text-gray-400 border border-[#333] hover:bg-[#252525] h-9 rounded-full text-xs font-bold uppercase tracking-wider px-4 transition-colors whitespace-nowrap flex items-center gap-1.5">
              <Calendar size={14} /> Last 24 Hours <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          <div className="xl:col-span-2 space-y-4 relative">
             {/* Vertical Timeline Line */}
             <div className="absolute left-8 top-4 bottom-8 w-px bg-[#222] z-0 hidden md:block"></div>

            {MOCK_EVENTS.map((event, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={event.id}
                className="relative z-10 flex flex-col md:flex-row gap-4"
              >
                {/* Desktop Timestamp / Indicator */}
                <div className="hidden md:flex flex-col items-end w-32 pt-4 flex-shrink-0">
                  <span className="text-xs font-bold text-gray-400">{event.timestamp.split(' - ')[0]}</span>
                  <span className="text-[10px] font-medium text-gray-600 uppercase tracking-wider">{event.timestamp.split(' - ')[1]}</span>
                </div>
                
                {/* Desktop Line Node */}
                <div className="hidden md:flex flex-col items-center pt-5">
                   <div className={cn(
                     "w-3 h-3 rounded-full border-2 border-[#161616] ring-2 z-10",
                     event.severity === 'critical' ? "bg-red-500 ring-red-500/20" :
                     event.severity === 'high' ? "bg-orange-500 ring-orange-500/20" :
                     event.severity === 'medium' ? "bg-amber-400 ring-amber-400/20" :
                     event.severity === 'low' ? "bg-blue-400 ring-blue-400/20" :
                     "bg-gray-500 ring-gray-500/20"
                   )} />
                </div>

                <Card className={cn(
                  "flex-1 bg-[#1e1e1e] border hover:border-[#444] transition-colors overflow-hidden",
                  !event.read ? "border-l-2 border-[#333] border-l-accent" : "border-[#222]"
                )}>
                  <div className="p-5 flex flex-col sm:flex-row gap-5">
                    
                    <div className="flex-1">
                      {/* Mobile Timestamp */}
                      <div className="md:hidden text-xs font-medium text-gray-500 mb-2">
                        {event.timestamp}
                      </div>

                      <div className="flex items-center gap-3 mb-2">
                        <span className={cn(
                          "flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
                          getSeverityStyles(event.severity)
                        )}>
                          {getSeverityIcon(event.severity)}
                          {event.severity}
                        </span>
                        <span className="text-xs font-black tracking-widest text-gray-400 uppercase">{event.type}</span>
                        {!event.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse ml-auto" />
                        )}
                      </div>
                      
                      <p className="text-sm font-medium text-white leading-relaxed mb-4">
                        {event.message}
                      </p>

                      <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                         <div className="flex items-center gap-1.5 text-xs text-gray-400">
                           <MapPin size={14} className="text-gray-500" /> 
                           <span className="font-bold text-gray-300">{event.environment}</span> 
                           <span className="text-gray-600">/</span> {event.zone}
                         </div>
                         <div className="flex items-center gap-1.5 text-xs text-gray-400">
                           <Video size={14} className="text-gray-500" />
                           {event.source}
                         </div>
                         {event.modelTrigger && (
                           <div className="flex items-center gap-1.5 text-xs text-gray-400">
                             <Activity size={14} className="text-accent/70" />
                             <span className="text-accent/80 font-mono text-[10px]">{event.modelTrigger}</span>
                           </div>
                         )}
                      </div>
                    </div>

                    {/* Snapshot if available */}
                    {event.snapshot && (
                      <div className="w-full sm:w-32 h-24 sm:h-auto rounded-lg overflow-hidden border border-[#333] relative group flex-shrink-0">
                        <img src={event.snapshot} alt="Event Snapshot" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                           <Camera size={20} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
             <Card className="bg-[#1e1e1e] border border-[#222] p-5">
               <h3 className="text-xs font-black tracking-widest text-white uppercase mb-4">Event Summary (24h)</h3>
               
               <div className="space-y-4">
                 <div>
                   <div className="flex justify-between text-xs mb-1.5">
                     <span className="text-gray-400">Critical Alerts</span>
                     <span className="font-bold text-red-500">2</span>
                   </div>
                   <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
                     <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-xs mb-1.5">
                     <span className="text-gray-400">High Priority</span>
                     <span className="font-bold text-orange-500">14</span>
                   </div>
                   <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
                     <div className="h-full bg-orange-500 rounded-full" style={{ width: '35%' }}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-xs mb-1.5">
                     <span className="text-gray-400">Medium Priority</span>
                     <span className="font-bold text-amber-400">45</span>
                   </div>
                   <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
                     <div className="h-full bg-amber-400 rounded-full" style={{ width: '60%' }}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-xs mb-1.5">
                     <span className="text-gray-400">System Info</span>
                     <span className="font-bold text-gray-300">128</span>
                   </div>
                   <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
                     <div className="h-full bg-gray-500 rounded-full" style={{ width: '85%' }}></div>
                   </div>
                 </div>
               </div>
             </Card>

             <Card className="bg-gradient-to-br from-accent/10 to-[#1e1e1e] border border-accent/20 p-5">
               <h3 className="text-sm font-bold text-white mb-2">Automated Triggers</h3>
               <p className="text-xs text-gray-400 leading-relaxed mb-4">
                 Configure automated webhooks, SMS alerts, or system integrations based on spatial event severity and zones.
               </p>
               <button className="text-xs font-bold text-accent hover:text-white transition-colors">
                 Configure Automations →
               </button>
             </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
