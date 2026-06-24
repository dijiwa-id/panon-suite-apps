import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MapPin, Video, Image as ImageIcon, Activity, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DetectionEvidence = () => {
  const navigate = useNavigate();

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-6 min-h-full">
        {/* Title & Navigation */}
        <header className="mb-0 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Button 
                variant="outline" 
                className="h-6 w-6 p-0 rounded-full bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a] text-gray-500 hover:text-gray-900 dark:hover:text-white"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft size={12} />
              </Button>
              <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">Detection Evidence</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs font-medium ml-8">Detailed view of individual detection event and metadata.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Time</span>
            <span className="text-xs font-mono font-medium text-gray-900 dark:text-white bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#2a2a2a] px-3 py-1.5 rounded-md">22 Jun 2026 07:41:22</span>
          </div>
        </header>

        {/* Top Meta Info Banner */}
        <Card className="rounded-[11px] bg-[#1e1e1e] border-[#222]">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#222]">
              {/* Box 1 */}
              <div className="p-4 flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-widest text-[#52C5F3] uppercase">Parkir Liar</span>
                <span className="text-xs font-medium text-gray-300">Public Area Intelligence</span>
                <span className="text-xs text-gray-500">Channel 002</span>
              </div>
              {/* Box 2 */}
              <div className="p-4 flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">CAM-002</span>
                <span className="text-xs font-medium text-gray-300">Main Entrance</span>
                <span className="text-xs text-gray-500">Jl. Reog No 39 Bandung</span>
              </div>
              {/* Box 3 */}
              <div className="p-4 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Region of Interest</span>
                  <span className="text-xs font-bold text-gray-200">Right Zone</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Classes</span>
                  <span className="text-xs font-bold text-[#52C5F3]">car</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Confidence</span>
                  <span className="text-xs font-bold text-green-400">0.4</span>
                </div>
              </div>
              {/* Box 4 - Empty or Action Box */}
              <div className="p-4 flex flex-col items-center justify-center gap-2">
                <Button className="w-full bg-[#1c1c1c] border border-gray-700 hover:bg-[#2a2a2a] text-xs h-8 text-white rounded-[8px]">
                  Export Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2x2 Grid for Media Evidence */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Image Evidence */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold text-gray-400 ml-1">Image Evidence</h3>
            <Card className="rounded-[11px] overflow-hidden bg-black border-[#222]">
              <div className="aspect-video relative flex items-center justify-center flex-col gap-3 group">
                <ImageIcon className="w-12 h-12 text-[#333] group-hover:text-gray-500 transition-colors duration-500" />
                <span className="text-[#333] font-black tracking-widest uppercase opacity-50 group-hover:opacity-100 group-hover:text-gray-500 transition-colors duration-500">Detection Image</span>
                {/* Simulated bounding boxes would go here */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] to-transparent pointer-events-none opacity-50" />
              </div>
            </Card>
          </div>

          {/* Video Evidence */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold text-gray-400 ml-1">Video Evidence</h3>
            <Card className="rounded-[11px] overflow-hidden bg-black border-[#222]">
              <div className="aspect-video relative flex flex-col items-center justify-center gap-3 group">
                <Video className="w-12 h-12 text-[#333] group-hover:text-gray-500 transition-colors duration-500" />
                <span className="text-[#333] font-black tracking-widest uppercase opacity-50 group-hover:opacity-100 group-hover:text-gray-500 transition-colors duration-500">Detection Video</span>
                <div className="absolute bottom-4 left-4 right-4 h-1 bg-[#222] rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1/3 h-full bg-[#52C5F3] rounded-full" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] to-transparent pointer-events-none opacity-50" />
              </div>
            </Card>
          </div>

          {/* Location Map */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold text-gray-400 ml-1">Location</h3>
            <Card className="rounded-[11px] overflow-hidden bg-[#1a1a1a] border-[#222]">
              <div className="aspect-video relative flex flex-col items-center justify-center gap-3">
                <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/107.6191,-6.9175,14,0/600x400?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjazBwNnhjMTMwM25xM2Nxa215b3c5cDUzIn0.example')] bg-cover bg-center opacity-20 grayscale" />
                
                <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-300 font-bold uppercase tracking-widest">MAP</span>
                    <span className="text-gray-500 text-[10px]">(camera coordinate)</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Live Detection Stream Container */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold text-gray-400 ml-1">Live Detection</h3>
            <Card className="rounded-[11px] overflow-hidden bg-black border-[#222]">
              <div className="aspect-video relative flex flex-col items-center justify-center gap-3 group">
                 <Activity className="w-12 h-12 text-[#333] group-hover:text-accent/50 transition-colors duration-500 animate-pulse" />
                 <span className="text-[#333] font-black tracking-widest uppercase opacity-50 group-hover:opacity-100 group-hover:text-gray-500 transition-colors duration-500">Live Detection</span>
                 
                 {/* Live overlay UI */}
                 <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-[#333]">
                   <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                   <span className="text-[10px] font-bold text-white tracking-wider">LIVE</span>
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-[#161616] to-transparent pointer-events-none opacity-50" />
              </div>
            </Card>
          </div>

        </div>

        {/* Detection Metadata Table */}
        <div className="mt-2">
          <h3 className="text-xs font-bold text-gray-400 mb-2 ml-1">Detection Metadata</h3>
          <Card className="rounded-[11px] bg-[#1e1e1e] border-[#222] overflow-hidden">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <tbody className="divide-y divide-[#222]">
                <tr className="hover:bg-[#252525]/30 transition-colors">
                  <td className="w-48 px-6 py-3 text-xs text-gray-400">Detection Id</td>
                  <td className="px-6 py-3 text-xs font-medium text-gray-200">7b249fca-c843-4aaf-a4cf-3c9422ad030a</td>
                </tr>
                <tr className="hover:bg-[#252525]/30 transition-colors bg-[#1a1a1a]/30">
                  <td className="w-48 px-6 py-3 text-xs text-gray-400">Workstation</td>
                  <td className="px-6 py-3 text-xs font-medium text-gray-200">A79DVNOD</td>
                </tr>
                <tr className="hover:bg-[#252525]/30 transition-colors">
                  <td className="w-48 px-6 py-3 text-xs text-gray-400">Channel</td>
                  <td className="px-6 py-3 text-xs font-medium text-gray-200">002</td>
                </tr>
                <tr className="hover:bg-[#252525]/30 transition-colors bg-[#1a1a1a]/30">
                  <td className="w-48 px-6 py-3 text-xs text-gray-400">Camera</td>
                  <td className="px-6 py-3 text-xs font-medium text-gray-200">CAM-002 Main Entrance</td>
                </tr>
                <tr className="hover:bg-[#252525]/30 transition-colors">
                  <td className="w-48 px-6 py-3 text-xs text-gray-400">Context</td>
                  <td className="px-6 py-3 text-xs font-medium text-gray-200">29 - Parkir Liar</td>
                </tr>
                <tr className="hover:bg-[#252525]/30 transition-colors bg-[#1a1a1a]/30">
                  <td className="w-48 px-6 py-3 text-xs text-gray-400">Region of Interest</td>
                  <td className="px-6 py-3 text-xs font-medium text-gray-200">2 - Right Zone</td>
                </tr>
                <tr className="hover:bg-[#252525]/30 transition-colors">
                  <td className="w-48 px-6 py-3 text-xs text-gray-400">Classes</td>
                  <td className="px-6 py-3 text-xs font-medium text-[#52C5F3]">car</td>
                </tr>
                <tr className="hover:bg-[#252525]/30 transition-colors bg-[#1a1a1a]/30">
                  <td className="w-48 px-6 py-3 text-xs text-gray-400">Confidence</td>
                  <td className="px-6 py-3 text-xs font-medium text-gray-200">0.3726</td>
                </tr>
                <tr className="hover:bg-[#252525]/30 transition-colors">
                  <td className="w-48 px-6 py-3 text-xs text-gray-400">Bounding Box</td>
                  <td className="px-6 py-3 text-xs font-mono text-gray-300">[327.375, 482.75, 481.625, 585.25]</td>
                </tr>
                <tr className="hover:bg-[#252525]/30 transition-colors bg-[#1a1a1a]/30">
                  <td className="w-48 px-6 py-3 text-xs text-gray-400">Track Id</td>
                  <td className="px-6 py-3 text-xs font-medium text-gray-200">8</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>

      </div>
    </main>
  );
};
