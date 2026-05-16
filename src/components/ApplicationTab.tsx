import React, { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { Activity, Video, Play, Pause, Settings, Box, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  Button,
  Badge,
  IconBadge,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "./ui";

const initialApplications = [
  {
    id: "APP-001",
    name: "Smart City Traffic Management",
    status: "Running",
    uptime: "99.9%",
    cameras: 124,
    models: ["Vehicle Detection", "ALPR", "Speed Analytics"],
    alertsToday: 45,
    lastUpdate: "2 mins ago",
  },
  {
    id: "APP-002",
    name: "Perimeter Security Sentinel",
    status: "Running",
    uptime: "100%",
    cameras: 32,
    models: ["Intrusion Detection", "Face Recognition"],
    alertsToday: 3,
    lastUpdate: "Just now",
  },
  {
    id: "APP-003",
    name: "Retail Customer Analytics",
    status: "Warning",
    uptime: "98.5%",
    cameras: 18,
    models: ["People Counter", "Heatmap Generator", "Demographics"],
    alertsToday: 12,
    lastUpdate: "1 hour ago",
  },
  {
    id: "APP-004",
    name: "Industrial Safety Monitor",
    status: "Stopped",
    uptime: "0%",
    cameras: 12,
    models: ["PPE Detection", "Hazard Area Monitor"],
    alertsToday: 0,
    lastUpdate: "2 days ago",
  },
];

const mockMoreApps = Array.from({ length: 42 }).map((_, i) => ({
  id: `APP-${(i + 5).toString().padStart(3, "0")}`,
  name: `Automated Vision System ${i + 5}`,
  status: i % 4 === 0 ? "Stopped" : i % 7 === 0 ? "Warning" : "Running",
  uptime: `${(90 + (i % 10)).toFixed(1)}%`,
  cameras: 8 + (i % 20),
  models: ["Object Detection", "Tracking"],
  alertsToday: i % 15,
  lastUpdate: `${(i % 5) + 1} hours ago`,
}));

const allInitialApplications = [...initialApplications, ...mockMoreApps];

export const ApplicationTab = ({
  searchQuery,
  viewMode,
}: {
  searchQuery: string;
  viewMode: "grid" | "list";
}) => {
  const [apps, setApps] = useState(allInitialApplications);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, viewMode]);

  const filteredApps = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.status.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const paginatedApps = filteredApps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Running":
        return "success";
      case "Warning":
        return "warning";
      case "Stopped":
        return "danger";
      default:
        return "ghost";
    }
  };

  const toggleStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setApps(
      apps.map((app) => {
        if (app.id === id) {
          return {
            ...app,
            status: app.status === "Running" ? "Stopped" : "Running",
          };
        }
        return app;
      }),
    );
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="flex items-center justify-between px-2 py-4 mt-2">
        <div className="text-xs text-gray-500 font-medium">
          Showing <span className="font-bold text-gray-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredApps.length)}</span> of <span className="font-bold text-gray-900 dark:text-white">{filteredApps.length}</span> applications
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            className="px-3"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </Button>
          <div className="flex items-center justify-center px-2 text-xs font-bold text-gray-900 dark:text-white">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            className="px-3"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    );
  };

  if (viewMode === "list") {
    return (
      <div className="flex flex-col">
        <Card>
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
              {paginatedApps.map((app) => (
                <TableRow key={app.id} className="group">
                  <TableCell>
                    <div className="font-bold text-xs text-gray-900 dark:text-white mb-0.5">
                      {app.name}
                    </div>
                    <div className="text-[9px] text-gray-500 font-mono">
                      ID: {app.id}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(app.status) as any} dot>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                        <Video size={12} />
                        <span className="text-[11px] font-bold">
                          {app.cameras}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">
                          Uptime: {app.uptime}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                      {app.models.slice(0, 2).map((m, i) => (
                        <Badge key={i} variant="secondary" className="text-[9px]">
                          <Box size={8} /> {m}
                        </Badge>
                      ))}
                      {app.models.length > 2 && (
                        <Badge variant="secondary" className="text-[9px]">
                          +{app.models.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        onClick={(e) => toggleStatus(app.id, e)}
                        className="px-3"
                      >
                        {app.status === "Running" ? (
                          <Pause size={12} />
                        ) : (
                          <Play size={12} />
                        )}
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
        {renderPagination()}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedApps.map((app) => (
          <Card
            key={app.id}
            className="p-5 flex flex-col group hover:border-gray-300 dark:hover:border-[#333] transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <IconBadge>
                <Activity size={20} />
              </IconBadge>
              <Badge variant={getBadgeVariant(app.status) as any} dot>
                {app.status}
              </Badge>
            </div>

            <div className="mb-4 flex-1">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                {app.name}
              </h3>
              <p className="text-[10px] text-gray-500 font-mono">ID: {app.id}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {app.models.map((m, i) => (
                <Badge key={i} variant="secondary" className="text-[9px]">
                  <Box size={8} /> {m}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-gray-100 dark:border-[#222] pt-4 mb-4">
              <div>
                <p className="text-[9px] font-black tracking-widest uppercase text-gray-500 mb-1">
                  Cameras
                </p>
                <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1">
                  <Video size={10} className="text-gray-400" /> {app.cameras}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-black tracking-widest uppercase text-gray-500 mb-1">
                  Alerts/Day
                </p>
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  {app.alertsToday}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-black tracking-widest uppercase text-gray-500 mb-1">
                  Uptime
                </p>
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  {app.uptime}
                </p>
              </div>
            </div>

            <div className="flex gap-2 relative z-10">
              <Button
                variant="outline"
                onClick={(e) => toggleStatus(app.id, e)}
                className="flex-1 gap-1.5"
              >
                {app.status === "Running" ? (
                  <Pause size={12} />
                ) : (
                  <Play size={12} />
                )}
                {app.status === "Running" ? "Stop" : "Start"}
              </Button>
              <Button variant="outline" className="px-3">
                <Settings size={12} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {renderPagination()}
    </div>
  );
};
