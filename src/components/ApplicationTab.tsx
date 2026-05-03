import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Activity, Video, Play, Pause, Settings, Box } from 'lucide-react';
import { Card, Button, Badge, Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from './ui';

const initialApplications = [
  {
    id: 'APP-001',
    name: 'Smart City Traffic Management',
    status: 'Running',
    uptime: '99.9%',
    cameras: 124,
    models: ['Vehicle Detection', 'ALPR', 'Speed Analytics'],
    alertsToday: 45,
    lastUpdate: '2 mins ago',
  },
  {
    id: 'APP-002',
    name: 'Perimeter Security Sentinel',
    status: 'Running',
    uptime: '100%',
    cameras: 32,
    models: ['Intrusion Detection', 'Face Recognition'],
    alertsToday: 3,
    lastUpdate: 'Just now',
  },
  {
    id: 'APP-003',
    name: 'Retail Customer Analytics',
    status: 'Warning',
    uptime: '98.5%',
    cameras: 18,
    models: ['People Counter', 'Heatmap Generator', 'Demographics'],
    alertsToday: 12,
    lastUpdate: '1 hour ago',
  },
  {
    id: 'APP-004',
    name: 'Industrial Safety Monitor',
    status: 'Stopped',
    uptime: '0%',
    cameras: 12,
    models: ['PPE Detection', 'Hazard Area Monitor'],
    alertsToday: 0,
    lastUpdate: '2 days ago',
  }
];

export const ApplicationTab = ({ searchQuery, viewMode }: { searchQuery: string, viewMode: 'grid' | 'list' }) => {
  const [apps, setApps] = useState(initialApplications);

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getBadgeVariant = (status: string) => {
    switch(status) {
      case 'Running': return 'success';
      case 'Warning': return 'warning';
      case 'Stopped': return 'danger';
      default: return 'ghost';
    }
  };

  const toggleStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setApps(apps.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status: app.status === 'Running' ? 'Stopped' : 'Running'
        }
      }
      return app;
    }));
  };

  if (viewMode === 'list') {
    return (
      <Card className="rounded-[11px] overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Metrics</TableHead>
              <TableHead>Active Models</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApps.map(app => (
              <TableRow key={app.id}>
                <TableCell>
                  <div className="font-bold text-xs text-gray-900 dark:text-white mb-0.5">{app.name}</div>
                  <div className="text-[9px] text-gray-500 font-mono">ID: {app.id}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(app.status) as any} className="gap-1.5">
                    {app.status === 'Running' && <Activity size={10} />}
                    {app.status === 'Warning' && <Activity size={10} />}
                    {app.status === 'Stopped' && <div className="w-2 h-2 rounded-full bg-red-500" />}
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                      <Video size={12} />
                      <span className="text-[11px] font-bold">{app.cameras}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 font-medium">Uptime: {app.uptime}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                    {app.models.slice(0, 2).map((m, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[9px] font-bold text-gray-600 dark:text-gray-300">
                        <Box size={8} /> {m}
                      </span>
                    ))}
                    {app.models.length > 2 && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[9px] font-bold text-gray-600 dark:text-gray-300">
                        +{app.models.length - 2}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" onClick={(e) => toggleStatus(app.id, e)} className="px-3">
                      {app.status === 'Running' ? <Pause size={12} /> : <Play size={12} />}
                    </Button>
                    <Button variant="outline" className="px-3">
                      <Settings size={12} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredApps.map(app => (
        <Card key={app.id} className="p-5 flex flex-col group hover:border-gray-300 dark:hover:border-[#333] transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] flex items-center justify-center text-accent">
              <Activity size={20} />
            </div>
            <Badge variant={getBadgeVariant(app.status) as any} className="gap-1.5">
              {app.status === 'Running' && <Activity size={10} />}
              {app.status === 'Warning' && <Activity size={10} />}
              {app.status === 'Stopped' && <div className="w-2 h-2 rounded-full bg-red-500" />}
              {app.status}
            </Badge>
          </div>

          <div className="mb-4 flex-1">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{app.name}</h3>
            <p className="text-[10px] text-gray-500 font-mono">ID: {app.id}</p>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-5">
             {app.models.map((m, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[9px] font-bold text-gray-600 dark:text-gray-300">
                  <Box size={8} /> {m}
                </span>
             ))}
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-gray-100 dark:border-[#222] pt-4 mb-4">
            <div>
              <p className="text-[9px] font-black tracking-widest uppercase text-gray-500 mb-1">Cameras</p>
              <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1">
                <Video size={10} className="text-gray-400" /> {app.cameras}
              </p>
            </div>
            <div>
              <p className="text-[9px] font-black tracking-widest uppercase text-gray-500 mb-1">Alerts/Day</p>
              <p className="text-xs font-bold text-gray-900 dark:text-white">{app.alertsToday}</p>
            </div>
            <div>
              <p className="text-[9px] font-black tracking-widest uppercase text-gray-500 mb-1">Uptime</p>
              <p className="text-xs font-bold text-gray-900 dark:text-white">{app.uptime}</p>
            </div>
          </div>

          <div className="flex gap-2 relative z-10">
            <Button variant="outline" onClick={(e) => toggleStatus(app.id, e)} className="flex-1 gap-1.5">
              {app.status === 'Running' ? <Pause size={12} /> : <Play size={12} />}
              {app.status === 'Running' ? 'Stop' : 'Start'}
            </Button>
            <Button variant="outline" className="px-3">
              <Settings size={12} />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

