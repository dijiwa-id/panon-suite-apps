import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Play, Settings, Save, RefreshCw, Maximize, Video, Activity, Info, StopCircle, Eye, AlertTriangle, ChevronDown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, Button, Input, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui';

type DetectionLog = {
    id: number;
    timestamp: string;
    objectClass: string;
    confidence: number;
    status: 'Tracked' | 'Ignored' | 'Alert';
};

const DUMMY_CLASSES = ['Person', 'Vehicle', 'Unknown', 'Bag', 'Animal'];
const STATUSES: ('Tracked' | 'Ignored' | 'Alert')[] = ['Tracked', 'Ignored', 'Alert'];

export const ChannelManagement = () => {
    const { "*": channelId } = useParams();
    const channelName = channelId ? `Channel ${channelId.replace('channel-', '')}` : 'Channel 01';
    
    const [isPlaying, setIsPlaying] = useState(false);
    const [confidence, setConfidence] = useState(75);
    const [sourceCamera, setSourceCamera] = useState('CAM-001 (Main Gate)');
    const [cameraUrl, setCameraUrl] = useState('rtsp://admin:panona123@192.168.1.100:554/cam/realmonitor');
    const [capabilities, setCapabilities] = useState({
        personTracking: true,
        lineCrossing: true,
        loitering: false
    });
    const [algoPackage, setAlgoPackage] = useState('Security & Intrusion');
    const [logs, setLogs] = useState<DetectionLog[]>([]);

    const videoContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setLogs(prev => {
                    const newLog: DetectionLog = {
                        id: Date.now(),
                        timestamp: new Date().toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                        objectClass: DUMMY_CLASSES[Math.floor(Math.random() * DUMMY_CLASSES.length)],
                        confidence: Number((Math.random() * 0.5 + 0.5).toFixed(2)),
                        status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
                    };
                    const newLogs = [newLog, ...prev];
                    return newLogs.slice(0, 15); // keep max 15
                });
            }, 2000); // add new log every 2 seconds
        } else {
            setLogs([]);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoContainerRef.current?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const handleSave = () => {
        const settings = {
            sourceCamera,
            cameraUrl,
            algoPackage,
            capabilities,
            confidence
        };
        toast.success(`Settings saved for ${channelName}`);
    };

    const handleRestart = () => {
        setIsPlaying(false);
        setTimeout(() => setIsPlaying(true), 1500);
    };

    const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setSourceCamera(val);
        if (val === 'CAM-001 (Main Gate)') setCameraUrl('rtsp://admin:panona123@192.168.1.100:554/cam/realmonitor');
        else if (val === 'CAM-002 (Lobby)') setCameraUrl('rtsp://admin:panona123@192.168.1.200:554/cam/lobbymonitor');
        else setCameraUrl('');
    };

    return (
        <main className="flex-1 overflow-y-auto bg-transparent p-6 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                <div>
                    <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                        <Video size={20} className="text-accent" />
                        {channelName} Configuration
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Manage pipeline, ROIs, and model settings for this video stream.</p>
                </div>
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <Button variant="outline" onClick={handleRestart} className="flex-1 lg:flex-none gap-2 h-8">
                        <RefreshCw size={14} className={cn(isPlaying ? "animate-spin" : "")} /> Restart Stream
                    </Button>
                    <Button variant="primary" onClick={handleSave} className="flex-1 lg:flex-none gap-2 h-8">
                        <Save size={14} /> Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Left Column - Configuration */}
                <div className="lg:col-span-4 space-y-5">
                    {/* Basic Settings */}
                    <Card className="p-0 overflow-hidden">
                        <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
                            <Settings size={16} className="text-gray-500" />
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Stream Source</h2>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Source Camera</label>
                                <div className="relative">
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                        <ChevronDown size={14} />
                                    </div>
                                    <select value={sourceCamera} onChange={handleSourceChange} className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg pl-4 pr-9 h-[37px] text-[12px] font-medium text-gray-800 dark:text-gray-200 outline-none focus-visible:ring-1 focus-visible:ring-accent/50 transition-all cursor-pointer appearance-none">
                                        <option>CAM-001 (Main Gate)</option>
                                        <option>CAM-002 (Lobby)</option>
                                        <option>Custom RTSP URL</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Camera URL</label>
                                <Input disabled={sourceCamera !== 'Custom RTSP URL'} type="text" value={cameraUrl} onChange={(e) => setCameraUrl(e.target.value)} className="uppercase tracking-widest font-black" />
                            </div>
                            <div className="flex items-center gap-3 pt-2">
                                <span className={cn("flex w-2.5 h-2.5 rounded-full relative", isPlaying ? "bg-green-500" : "bg-red-500")}>
                                    {isPlaying && <span className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-75"></span>}
                                </span>
                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Connection Status: {isPlaying ? 'Connected & Streaming' : 'Disconnected'}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Analytics Settings */}
                    <Card className="p-0 overflow-hidden">
                        <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
                            <Activity size={16} className="text-gray-500" />
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Analytics Engine</h2>
                        </div>
                        <div className="p-5 space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Algorithm Package</label>
                                <div className="relative">
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                        <ChevronDown size={14} />
                                    </div>
                                    <select value={algoPackage} onChange={e => setAlgoPackage(e.target.value)} className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg pl-4 pr-9 h-[37px] text-[12px] font-medium text-gray-800 dark:text-gray-200 outline-none focus-visible:ring-1 focus-visible:ring-accent/50 transition-all cursor-pointer appearance-none">
                                        <option>Security & Intrusion</option>
                                        <option>Workplace Safety (PPE)</option>
                                        <option>Traffic Monitoring</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="pt-2 border-t border-gray-200 dark:border-[#222]">
                                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3">Active Capabilities</label>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input type="checkbox" checked={capabilities.personTracking} onChange={(e) => setCapabilities({...capabilities, personTracking: e.target.checked})} className="peer appearance-none w-4 h-4 rounded border border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#161616] checked:bg-accent checked:border-accent transition-colors cursor-pointer" />
                                            <div className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2.5 6 5 8.5 9.5 3.5"></polyline></svg>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-white transition-colors">Person Tracking</span>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input type="checkbox" checked={capabilities.lineCrossing} onChange={(e) => setCapabilities({...capabilities, lineCrossing: e.target.checked})} className="peer appearance-none w-4 h-4 rounded border border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#161616] checked:bg-accent checked:border-accent transition-colors cursor-pointer" />
                                            <div className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2.5 6 5 8.5 9.5 3.5"></polyline></svg>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-white transition-colors">Line Crossing Alert</span>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input type="checkbox" checked={capabilities.loitering} onChange={(e) => setCapabilities({...capabilities, loitering: e.target.checked})} className="peer appearance-none w-4 h-4 rounded border border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#161616] checked:bg-accent checked:border-accent transition-colors cursor-pointer" />
                                            <div className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2.5 6 5 8.5 9.5 3.5"></polyline></svg>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-white transition-colors">Loitering Detection</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="pt-2 border-t border-gray-200 dark:border-[#222]">
                                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Confidence Threshold</label>
                                <div className="flex items-center gap-4">
                                    <input type="range" min="0" max="100" value={confidence} onChange={(e) => setConfidence(parseInt(e.target.value))} className="flex-1 h-1 bg-gray-200 dark:bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-accent" />
                                    <span className="text-xs font-mono font-bold text-accent w-8 text-right">{confidence}%</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column - Preview & Regions */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                    {/* Live Preview */}
                    <Card className="p-0 overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
                            <div className="flex items-center gap-2">
                                <Eye size={16} className="text-gray-500" />
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Live AI Preview</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" onClick={handleFullscreen} className="p-1.5 h-auto rounded-lg" title="Maximize">
                                    <Maximize size={14} />
                                </Button>
                            </div>
                        </div>
                        
                        <div className="p-1 bg-gray-50/50 dark:bg-[#1a1a1a]" ref={videoContainerRef}>
                            <div className="aspect-video w-full h-full bg-black rounded-xl border border-gray-200 dark:border-[#222] flex flex-col items-center justify-center relative overflow-hidden group">
                                {!isPlaying ? (
                                    <>
                                        <div className="absolute inset-20 border-2 border-accent/30 border-dashed rounded-3xl bg-accent/5 opacity-50"></div>
                                        <button onClick={() => setIsPlaying(true)} className="relative z-10 flex flex-col items-center justify-center gap-3 text-gray-500 hover:text-accent transition-colors group-hover:scale-105 duration-300">
                                            <Play size={64} className="opacity-80" />
                                            <span className="text-xs font-bold opacity-80">Start Stream</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542385151-efd5e4b2dcd8?q=80&w=2698&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
                                        {/* Mock Bounding Boxes */}
                                        <div className="absolute top-[30%] left-[40%] w-24 h-48 border-2 border-secondary bg-secondary/10">
                                            <div className="absolute -top-6 -left-0.5 bg-secondary text-gray-900 dark:text-white text-[10px] font-bold px-1 py-0.5">Person 0.89</div>
                                        </div>
                                        <div className="absolute top-[45%] left-[20%] w-40 h-24 border-2 border-accent bg-accent/10">
                                            <div className="absolute -top-6 -left-0.5 bg-accent text-black text-[10px] font-bold px-1 py-0.5">Vehicle 0.94</div>
                                        </div>
                                        {/* Overlay controls */}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <div className="bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-white flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div> LIVE
                                            </div>
                                            <div className="bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-white">
                                                30 FPS
                                            </div>
                                            <div className="bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-white">
                                                1080p
                                            </div>
                                        </div>
                                        <div className="absolute bottom-4 right-4 flex gap-2">
                                            <button onClick={() => setIsPlaying(false)} className="bg-black/80 hover:bg-black text-white p-2 rounded-lg transition-colors border border-gray-800">
                                                <StopCircle size={18} className="text-red-500" />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        <div className="p-3 bg-gray-50/50 dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-[#222] flex items-center gap-3">
                            <Info size={14} className="text-accent flex-shrink-0" />
                            <p className="text-[11px] text-gray-600 dark:text-gray-400 font-medium">Draw ROI (Region of Interest) by clicking and dragging on the video feed while streaming is paused.</p>
                        </div>
                    </Card>
                    
                    {/* Insights & Logs */}
                    <Card className="p-0 overflow-hidden flex-1 flex flex-col">
                        <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
                            <AlertTriangle size={16} className="text-gray-500" />
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Real-Time Detections</h2>
                        </div>
                        <div className="p-0 overflow-y-auto max-h-48 min-h-[140px] bg-gray-50 dark:bg-[#161616]">
                            <Table>
                                <TableHeader>
                                  <TableRow>
                                        <TableHead>Timestamp</TableHead>
                                        <TableHead>Class</TableHead>
                                        <TableHead>Confidence</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isPlaying ? (
                                        logs.map(log => (
                                            <TableRow key={log.id} className="animate-in fade-in slide-in-from-top-2 duration-300">
                                                <TableCell className="font-mono text-gray-600 dark:text-gray-400 text-xs">{log.timestamp}</TableCell>
                                                <TableCell className="font-semibold text-gray-900 dark:text-white">{log.objectClass}</TableCell>
                                                <TableCell className={cn("font-mono text-xs", log.confidence >= 0.8 ? "text-green-500" : "text-orange-500")}>{log.confidence}</TableCell>
                                                <TableCell>
                                                    <span className={cn(
                                                        "font-medium",
                                                        log.status === 'Tracked' ? 'text-green-400' :
                                                        log.status === 'Alert' ? 'text-red-400' : 'text-orange-400'
                                                    )}>
                                                        {log.status}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="py-10 text-center text-gray-500 font-medium">
                                                Start the stream to view real-time detections.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>

                </div>
            </div>
        </main>
    )
}

