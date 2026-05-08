import React, { useState, useRef } from 'react';
import { Play, Flame, Image as ImageIcon, Video as VideoIcon, Settings2, Download, Trash2, Maximize2, Loader2, Sparkles, Plus, Clock, Copy } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

interface GeneratedVideo {
  id: string;
  url: string;
  prompt: string;
  date: Date;
  status: 'generating' | 'completed' | 'failed';
  duration: string;
  thumbnail?: string;
}

const generateThumbnailFromVideoUrl = (videoUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous'; // Important for CORS if applicable
    video.src = videoUrl;
    // Wait for the video to load metadata
    video.onloadeddata = () => {
      // Seek to 1 second (or stay at 0)
      video.currentTime = 1;
    };
    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg'));
      } else {
        resolve('');
      }
    };
    video.onerror = () => {
      resolve(''); // Fallback to empty if error
    };
    video.load();
  });
};

const PAST_VIDEOS: GeneratedVideo[] = [
  {
    id: '1',
    url: 'https://cdn.pixabay.com/video/2021/08/04/83863-585149302_large.mp4',
    prompt: 'A futuristic city skyline at glowing sunset, cyberpunk style, flying cars.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: 'completed',
    duration: '0:05',
    thumbnail: 'https://images.unsplash.com/photo-1601460370845-812030d9fb88?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '2',
    url: 'https://cdn.pixabay.com/video/2019/08/25/26279-354964205_medium.mp4',
    prompt: 'Macro shot of water droplets on a neon green leaf, 4k ultra detailed.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: 'completed',
    duration: '0:03',
    thumbnail: 'https://images.unsplash.com/photo-1542385150-13f5c15f9b42?auto=format&fit=crop&q=80&w=400'
  }
];

export const VideoGeneration = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [videos, setVideos] = useState<GeneratedVideo[]>(PAST_VIDEOS);
  
  // Settings
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');
  const [resolution, setResolution] = useState<'1080p' | '720p' | '4k'>('1080p');
  
  const generateVideo = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt to generate a video');
      return;
    }
    
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const newId = Date.now().toString();
    const generatingVideo: GeneratedVideo = {
      id: newId,
      url: '',
      prompt: prompt,
      date: new Date(),
      status: 'generating',
      duration: '0:05'
    };
    
    setVideos(prev => [generatingVideo, ...prev]);
    
    // Simulate generation progress
    let iters = 0;
    const interval = setInterval(() => {
      iters++;
      setGenerationProgress(Math.min((iters / 20) * 100, 99)); // Cap at 99 until finished
      if (iters >= 20) {
        clearInterval(interval);
        setTimeout(async () => {
           const generatedUrl = 'https://cdn.pixabay.com/video/2019/11/17/29272-373809675_medium.mp4';
           const bgFallback = 'https://images.unsplash.com/photo-1542385150-13f5c15f9b42?auto=format&fit=crop&q=80&w=400';
           
           // Try to generate thumbnail, but don't block completion if it fails
           try {
             const thumbnail = await generateThumbnailFromVideoUrl(generatedUrl);
             setVideos(prev => 
               prev.map(v => 
                 v.id === newId 
                   ? { ...v, status: 'completed', url: generatedUrl, thumbnail: thumbnail || bgFallback } 
                   : v
               )
             );
           } catch (err) {
             setVideos(prev => 
               prev.map(v => 
                 v.id === newId 
                   ? { ...v, status: 'completed', url: generatedUrl, thumbnail: bgFallback } 
                   : v
               )
             );
           }
           setIsGenerating(false);
           toast.success('Video generation complete!');
        }, 500);
      }
    }, 300);
  };
  
  const currentMainVideo = videos[0];

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8 text-gray-800 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-gray-200 dark:border-[#222] pb-6">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mb-1 flex items-center gap-2">
            <VideoIcon size={16} className="text-[#52C5F3]" />
            Video Generation Engine
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Create stunning AI-generated videos with Veo 2.0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column: Input and Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] p-5 shadow-sm">
             <div className="flex items-center justify-between mb-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#52C5F3]" />
                    Prompt
                 </label>
             </div>
             
             <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder="Describe the video you want to create... Try to include style, camera motion, and subject details."
               className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-lg p-3 text-xs font-medium text-gray-900 dark:text-gray-300 min-h-[120px] outline-none focus:ring-1 focus:ring-[#52C5F3]/50 focus:border-[#52C5F3]/50 transition-all resize-none custom-scrollbar"
             />
             
             <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[#222] space-y-4">
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Aspect Ratio</label>
                    <div className="grid grid-cols-3 gap-2">
                       {['16:9', '9:16', '1:1'].map((ratio) => (
                           <button 
                             key={ratio}
                             onClick={() => setAspectRatio(ratio as any)}
                             className={cn(
                               "py-2 rounded-md border text-[11px] font-bold transition-all",
                               aspectRatio === ratio 
                                 ? "bg-[#52C5F3]/10 border-[#52C5F3]/30 text-[#52C5F3]" 
                                 : "bg-gray-50 dark:bg-[#161616] border-gray-200 dark:border-[#333] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#222]"
                             )}
                           >
                              {ratio}
                           </button>
                       ))}
                    </div>
                 </div>
                 
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Resolution</label>
                    <div className="grid grid-cols-3 gap-2">
                       {['720p', '1080p', '4k'].map((res) => (
                           <button 
                             key={res}
                             onClick={() => setResolution(res as any)}
                             className={cn(
                               "py-2 rounded-md border text-[11px] font-bold transition-all",
                               resolution === res 
                                 ? "bg-[#52C5F3]/10 border-[#52C5F3]/30 text-[#52C5F3]" 
                                 : "bg-gray-50 dark:bg-[#161616] border-gray-200 dark:border-[#333] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#222]"
                             )}
                           >
                              {res}
                           </button>
                       ))}
                    </div>
                 </div>
             </div>

             <div className="mt-6">
                <Button 
                  onClick={generateVideo} 
                  disabled={isGenerating || !prompt.trim()} 
                  className="w-full flex items-center justify-center gap-2 h-10"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Generating... {Math.round(generationProgress)}%
                    </>
                  ) : (
                    <>
                      <VideoIcon size={16} />
                      Generate Video
                    </>
                  )}
                </Button>
             </div>
          </div>
        </div>

        {/* Right Column: Preview and History */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* Main Display Area */}
           <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-[11px] overflow-hidden shadow-sm flex flex-col h-[400px]">
              {currentMainVideo ? (
                 <div className="relative w-full h-full flex items-center justify-center bg-black group">
                    {currentMainVideo.status === 'generating' ? (
                       <div className="flex flex-col items-center justify-center gap-4 text-[#52C5F3]">
                          <div className="relative w-16 h-16 flex items-center justify-center">
                             <div className="absolute inset-0 border-4 border-[#52C5F3]/20 rounded-full"></div>
                             <div 
                               className="absolute inset-0 border-4 border-[#52C5F3] rounded-full border-t-transparent animate-spin"
                             ></div>
                             <VideoIcon size={24} className="animate-pulse" />
                          </div>
                          <div className="text-center">
                            <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-1">Synthesizing</h3>
                            <p className="text-xs text-gray-400 max-w-[250px] truncate">{currentMainVideo.prompt}</p>
                          </div>
                       </div>
                    ) : (
                       <>
                          <video 
                             width="100%" 
                             height="100%" 
                             controls 
                             autoPlay 
                             loop 
                             poster={currentMainVideo.thumbnail}
                             className="w-full h-full object-contain"
                          >
                             <source src={currentMainVideo.url} type="video/mp4" />
                             Your browser does not support the video tag.
                          </video>
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-xs text-white/90 font-medium truncate mb-2">{currentMainVideo.prompt}</p>
                              <div className="flex items-center gap-2">
                                  <Button variant="ghost" className="h-8 bg-white/10 hover:bg-white/20 text-white border-none rounded-md px-3 text-[11px]">
                                     <Download size={14} className="mr-1.5" /> Download
                                  </Button>
                                  <Button variant="ghost" onClick={() => { setPrompt(currentMainVideo.prompt); toast.success("Prompt copied to input!"); }} className="h-8 bg-white/10 hover:bg-white/20 text-white border-none rounded-md px-3 text-[11px]">
                                     <Copy size={14} className="mr-1.5" /> Reuse Prompt
                                  </Button>
                              </div>
                          </div>
                       </>
                    )}
                 </div>
              ) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-[#161616]">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-[#222] flex items-center justify-center border border-gray-200 dark:border-[#333] shadow-sm mb-4">
                       <VideoIcon size={24} />
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">No Video Selected</p>
                    <p className="text-xs">Generate a new video or select from your history</p>
                 </div>
              )}
           </div>

           {/* History Grid */}
           <div>
              <div className="flex items-center justify-between mb-4">
                 <h2 className="text-xs font-black uppercase tracking-widest text-gray-500">Recent Generations</h2>
                 <span className="text-[10px] bg-[#52C5F3]/10 text-[#52C5F3] px-2 py-0.5 rounded font-bold border border-[#52C5F3]/20">{videos.filter(v => v.status === 'completed').length} Videos</span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                 {videos.map((video, idx) => (
                    <div 
                      key={video.id} 
                      className={cn(
                        "group relative aspect-video bg-gray-100 dark:bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-200 dark:border-[#222] cursor-pointer transition-all",
                        idx === 0 && currentMainVideo?.id === video.id ? "ring-2 ring-[#52C5F3] ring-offset-2 ring-offset-white dark:ring-offset-[#161616]" : "hover:border-gray-300 dark:hover:border-gray-600"
                      )}
                      onClick={() => {
                        if (video.status === 'completed') {
                            const newVideos = [...videos];
                            const selected = newVideos.splice(idx, 1)[0];
                            newVideos.unshift(selected);
                            setVideos(newVideos);
                        }
                      }}
                    >
                       {video.status === 'completed' ? (
                          <>
                             <video 
                                src={video.url} 
                                poster={video.thumbnail}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                             />
                             <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                <Clock size={10} /> {video.duration}
                             </div>
                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white">
                                   <Play size={14} className="ml-0.5" />
                                </div>
                             </div>
                          </>
                       ) : (
                          <div className="flex flex-col items-center justify-center h-full w-full gap-2">
                             <Loader2 size={16} className="animate-spin text-[#52C5F3]" />
                             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-[#52C5F3]">Processing</span>
                          </div>
                       )}
                       
                       <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                           <p className="text-[9px] text-white/90 truncate font-medium">{video.prompt}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </main>
  );
};
