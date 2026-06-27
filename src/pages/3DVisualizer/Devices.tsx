import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Video, Thermometer, Cpu, Router, AlertTriangle, CheckCircle2, Battery, Wifi, Activity, MapPin, MoreVertical } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { cn } from '../../lib/utils';

type DeviceStatus = 'online' | 'offline' | 'warning';
type DeviceType = 'camera' | 'sensor' | 'gateway' | 'edge_node';

interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  location: string;
  coordinates: { x: number, y: number, z: number };
  battery?: number;
  signal?: number;
  lastPing: string;
  firmware: string;
  metrics?: { label: string; value: string }[];
}

const MOCK_DEVICES: Device[] = [
  {
    id: 'CAM-001',
    name: 'Main Gate PTZ Camera',
    type: 'camera',
    status: 'online',
    location: 'Smart Office HQ - Ext',
    coordinates: { x: 12.5, y: 5.0, z: -8.2 },
    signal: 98,
    lastPing: 'Just now',
    firmware: 'v2.4.1',
    metrics: [{ label: 'FPS', value: '60' }, { label: 'Resolution', value: '4K' }]
  },
  {
    id: 'CAM-002',
    name: 'Lobby Dome Camera',
    type: 'camera',
    status: 'online',
    location: 'Smart Office HQ - L1',
    coordinates: { x: 0.0, y: 3.5, z: 2.1 },
    signal: 100,
    lastPing: 'Just now',
    firmware: 'v2.4.1',
    metrics: [{ label: 'FPS', value: '30' }, { label: 'Resolution', value: '1080p' }]
  },
  {
    id: 'SNS-TH-01',
    name: 'Server Room Env Sensor',
    type: 'sensor',
    status: 'warning',
    location: 'Smart Office HQ - L2',
    coordinates: { x: -5.2, y: 3.0, z: -1.5 },
    battery: 15,
    signal: 82,
    lastPing: '2m ago',
    firmware: 'v1.1.0',
    metrics: [{ label: 'Temp', value: '26°C' }, { label: 'Humid', value: '45%' }]
  },
  {
    id: 'EDG-NX-01',
    name: 'Edge Inference Node A',
    type: 'edge_node',
    status: 'online',
    location: 'Smart Office HQ - L2',
    coordinates: { x: -5.0, y: 0.5, z: -1.0 },
    lastPing: 'Just now',
    firmware: 'Jetpack 5.1',
    metrics: [{ label: 'CPU', value: '45%' }, { label: 'GPU', value: '88%' }]
  },
  {
    id: 'GTW-ZIG-01',
    name: 'IoT Gateway Primary',
    type: 'gateway',
    status: 'offline',
    location: 'Smart Office HQ - L1',
    coordinates: { x: 2.5, y: 2.5, z: 0.0 },
    lastPing: '1h 15m ago',
    firmware: 'v3.0.2',
  },
  {
    id: 'SNS-OC-01',
    name: 'Meeting Room A Occupancy',
    type: 'sensor',
    status: 'online',
    location: 'Smart Office HQ - L1',
    coordinates: { x: 8.0, y: 3.0, z: 5.5 },
    battery: 88,
    signal: 95,
    lastPing: '1m ago',
    firmware: 'v1.2.5',
    metrics: [{ label: 'State', value: 'Occupied' }]
  }
];

export default function Devices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<DeviceType | 'all'>('all');

  const filteredDevices = MOCK_DEVICES.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) || device.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || device.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: DeviceStatus) => {
    switch (status) {
      case 'online': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'offline': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'warning': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    }
  };

  const getStatusIcon = (status: DeviceStatus) => {
    switch (status) {
      case 'online': return <CheckCircle2 size={14} />;
      case 'offline': return <AlertTriangle size={14} />;
      case 'warning': return <AlertTriangle size={14} />;
    }
  };

  const getTypeIcon = (type: DeviceType) => {
    switch (type) {
      case 'camera': return <Video size={16} />;
      case 'sensor': return <Thermometer size={16} />;
      case 'gateway': return <Router size={16} />;
      case 'edge_node': return <Cpu size={16} />;
    }
  };

  const stats = [
    { label: 'Total Devices', value: MOCK_DEVICES.length },
    { label: 'Online', value: MOCK_DEVICES.filter(d => d.status === 'online').length },
    { label: 'Requires Attention', value: MOCK_DEVICES.filter(d => d.status === 'warning' || d.status === 'offline').length },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[1600px] mx-auto min-h-full p-6 lg:p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Spatial Devices</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">Manage hardware, sensors, and compute nodes mapped to 3D environments.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] h-10 text-gray-700 dark:text-gray-300 rounded-full text-xs font-bold tracking-wide px-6 hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors flex items-center gap-2">
              <MapPin size={16} /> Auto-Discovery
            </button>
            <button className="bg-[#1c1c1c] border border-gray-700 h-10 text-white rounded-full text-xs font-bold tracking-wide px-6 hover:bg-[#2a2a2a] transition-colors">
              Provision Device
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={stat.label}
            >
              <Card className="bg-white dark:bg-[#1e1e1e] p-5 border border-gray-100 dark:border-[#222]">
                <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-2">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by device name, ID, or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-full text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            <Filter size={18} className="text-gray-400 mr-2 flex-shrink-0" />
            {(['all', 'camera', 'sensor', 'edge_node', 'gateway'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={cn(
                  "px-4 h-9 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors flex-shrink-0",
                  filterType === type 
                    ? "bg-[#1c1c1c] text-white border border-gray-700" 
                    : "bg-white dark:bg-[#1e1e1e] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#252525]"
                )}
              >
                {type === 'all' ? 'All' : type.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Device Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDevices.map((device, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={device.id}
            >
              <Card className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#222] overflow-hidden group">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gray-50 dark:bg-[#252525] rounded-xl text-gray-600 dark:text-gray-300">
                        {getTypeIcon(device.type)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{device.name}</h3>
                        <p className="text-[10px] font-mono text-gray-500 mt-0.5">{device.id}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-5">
                    <div className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider",
                      getStatusColor(device.status)
                    )}>
                      {getStatusIcon(device.status)}
                      {device.status}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500">
                      <Activity size={12} /> Last ping: {device.lastPing}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1">Location</p>
                      <p className="text-xs text-gray-800 dark:text-gray-200 truncate">{device.location}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1">Coordinates</p>
                      <p className="text-xs font-mono text-gray-800 dark:text-gray-200">
                        x:{device.coordinates.x} y:{device.coordinates.y} z:{device.coordinates.z}
                      </p>
                    </div>
                  </div>

                  {device.metrics && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {device.metrics.map(m => (
                        <div key={m.label} className="bg-gray-50 dark:bg-[#161616] px-3 py-1.5 rounded-lg border border-gray-100 dark:border-[#333] flex items-center gap-2">
                          <span className="text-[10px] font-bold text-gray-500 uppercase">{m.label}</span>
                          <span className="text-xs font-mono text-gray-900 dark:text-white">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-[#252525] mt-auto">
                    <div className="flex items-center gap-4">
                      {device.battery !== undefined && (
                        <div className={cn(
                          "flex items-center gap-1.5 text-xs font-medium",
                          device.battery < 20 ? "text-red-500" : "text-gray-500"
                        )}>
                          <Battery size={14} /> {device.battery}%
                        </div>
                      )}
                      {device.signal !== undefined && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                          <Wifi size={14} /> {device.signal}%
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono">
                      {device.firmware}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {filteredDevices.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-[#1e1e1e] mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No devices found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}

      </div>
    </div>
  );
}
