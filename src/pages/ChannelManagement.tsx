import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Play, Settings, Save, RefreshCw, Maximize, Video, Activity, Info, StopCircle, Eye, AlertTriangle, ChevronDown } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const ChannelManagement = () => {
    const { "*": channelId } = useParams();
    const channelName = channelId ? `Channel ${channelId.replace('channel-', '')}` : 'Channel 01';
    
    const [isPlaying, setIsPlaying] = useState(false);
    const [confidence, setConfidence] = useState(75);

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
                    <button onClick={() => console.log('Restarting stream...')} className="flex-1 lg:flex-none flex justify-center items-center gap-2 bg-white dark:bg-[#1c1c1c] border border-gray-300 dark:border-gray-700 h-[32px] text-gray-900 dark:text-white rounded-full text-xs font-bold px-5 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors leading-[12px]">
                        <RefreshCw size={14} /> Restart Stream
                    </button>
                    <button onClick={() => console.log('Saving changes...')} className="flex-1 lg:flex-none flex justify-center items-center gap-2 bg-accent hover:bg-accent/90 text-black h-[32px] rounded-full text-xs font-bold px-5 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] leading-[12px]">
                        <Save size={14} /> Save Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Left Column - Configuration */}
                <div className="lg:col-span-4 space-y-5">
                    {/* Basic Settings */}
                    <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-sm overflow-hidden">
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
                                    <select className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] font-medium text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer appearance-none">
                                        <option>CAM-001 (Main Gate)</option>
                                        <option>CAM-002 (Lobby)</option>
                                        <option>Custom RTSP URL</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Camera URL</label>
                                <input disabled type="text" defaultValue="rtsp://admin:panona123@192.168.1.100:554/cam/realmonitor" className="w-full bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#222] rounded-xl px-4 py-2.5 text-[10px] text-gray-500 outline-none uppercase tracking-widest font-black" />
                            </div>
                            <div className="flex items-center gap-3 pt-2">
                                <span className={cn("flex w-2.5 h-2.5 rounded-full relative", isPlaying ? "bg-green-500" : "bg-red-500")}>
                                    {isPlaying && <span className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-75"></span>}
                                </span>
                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Connection Status: {isPlaying ? 'Connected & Streaming' : 'Disconnected'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Analytics Settings */}
                    <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-sm overflow-hidden">
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
                                    <select className="w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] font-medium text-gray-800 dark:text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer appearance-none">
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
                                            <input type="checkbox" defaultChecked className="peer appearance-none w-4 h-4 rounded border border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#161616] checked:bg-accent checked:border-accent transition-colors cursor-pointer" />
                                            <div className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2.5 6 5 8.5 9.5 3.5"></polyline></svg>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-white transition-colors">Person Detection</span>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input type="checkbox" defaultChecked className="peer appearance-none w-4 h-4 rounded border border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#161616] checked:bg-accent checked:border-accent transition-colors cursor-pointer" />
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
                                            <input type="checkbox" className="peer appearance-none w-4 h-4 rounded border border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#161616] checked:bg-accent checked:border-accent transition-colors cursor-pointer" />
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
                    </div>
                </div>

                {/* Right Column - Preview & Regions */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                    {/* Live Preview */}
                    <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-sm overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
                            <div className="flex items-center gap-2">
                                <Eye size={16} className="text-gray-500" />
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Live AI Preview</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-white transition-colors bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-lg">
                                    <Maximize size={14} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-1 bg-gray-50/50 dark:bg-[#1a1a1a]">
                            <div className="aspect-video bg-black rounded-xl border border-gray-200 dark:border-[#222] flex flex-col items-center justify-center relative overflow-hidden group">
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
                    </div>
                    
                    {/* Insights & Logs */}
                    <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] shadow-sm overflow-hidden flex-1 flex flex-col">
                        <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
                            <AlertTriangle size={16} className="text-gray-500" />
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Real-Time Detections</h2>
                        </div>
                        <div className="p-0 overflow-y-auto max-h-48 min-h-[140px] bg-gray-50 dark:bg-[#161616]">
                            <table className="w-full text-left text-xs">
                                <thead>
                <tr className="border-b border-gray-200 dark:border-[#222] bg-gray-50/50 dark:bg-transparent">
                                        <th className="px-5 py-3 whitespace-nowrap">Timestamp</th>
                                        <th className="px-5 py-3 whitespace-nowrap">Class</th>
                                        <th className="px-5 py-3 whitespace-nowrap">Confidence</th>
                                        <th className="px-5 py-3 whitespace-nowrap">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-[#222]">
                                    {isPlaying ? (
                                        <>
                                            <tr className="hover:bg-white/5 transition-colors">
                                                <td className="px-5 py-2.5 font-mono text-gray-600 dark:text-gray-400 text-xs">10:45:02 AM</td>
                                                <td className="px-5 py-2.5 font-semibold text-gray-900 dark:text-white">Vehicle</td>
                                                <td className="px-5 py-2.5 font-mono text-gray-700 dark:text-gray-300 text-xs">0.94</td>
                                                <td className="px-5 py-2.5"><span className="text-green-400 font-medium">Tracked</span></td>
                                            </tr>
                                            <tr className="hover:bg-white/5 transition-colors">
                                                <td className="px-5 py-2.5 font-mono text-gray-600 dark:text-gray-400 text-xs">10:45:01 AM</td>
                                                <td className="px-5 py-2.5 font-semibold text-gray-900 dark:text-white">Person</td>
                                                <td className="px-5 py-2.5 font-mono text-gray-700 dark:text-gray-300 text-xs">0.89</td>
                                                <td className="px-5 py-2.5"><span className="text-green-400 font-medium">Tracked</span></td>
                                            </tr>
                                            <tr className="hover:bg-white/5 transition-colors">
                                                <td className="px-5 py-2.5 font-mono text-gray-600 dark:text-gray-400 text-xs">10:44:58 AM</td>
                                                <td className="px-5 py-2.5 font-semibold text-gray-900 dark:text-white">Unknown</td>
                                                <td className="px-5 py-2.5 font-mono text-gray-700 dark:text-gray-300 text-xs">0.45</td>
                                                <td className="px-5 py-2.5"><span className="text-orange-400 font-medium">Ignored</span></td>
                                            </tr>
                                        </>
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-5 py-10 text-center text-gray-500 font-medium">
                                                Start the stream to view real-time detections.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}

