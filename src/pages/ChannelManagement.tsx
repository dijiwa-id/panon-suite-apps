import React from 'react';
import { cn } from '../lib/utils';
import { Play } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const ChannelManagement = () => {
    const { "*": channelId } = useParams();
    const channelName = channelId ? `Channel ${channelId.replace('channel-', '')}` : 'Channel 01';

    return (
        <main className="flex-1 overflow-y-auto bg-[#161616] p-6 md:p-8 text-gray-200 transition-colors">
            <h1 className="text-xl font-black tracking-tight text-white mb-8">Channel Management &gt; {channelName}</h1>

            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl shadow-sm p-8 max-w-5xl">
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Camera ID</label>
                                <select className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all">
                                    <option>CAM-001</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Package</label>
                                <select className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all">
                                    <option>Security</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Camera URL</label>
                            <input type="text" defaultValue="rtsp://admin:QRT..." className="w-full bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-gray-200 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="aspect-video bg-black rounded-xl border border-[#2a2a2a] flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-20 border-2 border-green-500 bg-green-500/10"></div>
                        <Play className="text-gray-500" size={48} />
                    </div>
                    <div className="flex items-center gap-3">
                        <input type="checkbox" className="w-5 h-5 rounded border-[#2a2a2a] bg-[#161616] checked:bg-accent focus:ring-accent/50" />
                        <label className="text-sm font-bold text-gray-200">Enable Alert</label>
                    </div>
                </div>
            </div>
        </main>
    )
}
