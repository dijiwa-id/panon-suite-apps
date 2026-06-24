import React, { useState } from 'react';
import { Card, Input, Button, Select } from '../components/ui';
import { ChevronRight, CheckCircle2, Circle, Settings, Building2, BrainCircuit, Server, Video, Factory, LayoutDashboard, BellRing, Cable, Cpu, ShieldCheck, CheckSquare, Zap, ChevronLeft, Store, Activity, HardHat, Warehouse, TestTube, Mountain, FileScan, Bus, Leaf, GraduationCap, Grip } from 'lucide-react';

const industryIcons: Record<string, any> = {
  'Retail': Store,
  'Manufacturing': Factory,
  'Smart City': Building2,
  'Warehouse': Warehouse,
  'Healthcare': Activity,
  'Mining': HardHat,
  'Hospitality': Server,
  'Banking': FileScan,
  'Transportation': Bus,
  'Agriculture': Leaf,
  'Education': GraduationCap,
  'Custom': Grip
};
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 1, title: 'Welcome & Organization', icon: Building2 },
  { id: 2, title: 'Industry & Use Case', icon: Factory },
  { id: 3, title: 'AI Model Selection', icon: BrainCircuit },
  { id: 4, title: 'Environment Setup', icon: Server },
  { id: 5, title: 'Camera Integration', icon: Video },
  { id: 6, title: 'Edge AI Provisioning', icon: Cpu },
  { id: 7, title: 'Analytics Dashboard', icon: LayoutDashboard },
  { id: 8, title: 'Alert & Automation', icon: BellRing },
  { id: 9, title: 'External Integration', icon: Cable },
  { id: 10, title: 'Pipeline Orchestration', icon: Settings },
  { id: 11, title: 'Security & Compliance', icon: ShieldCheck },
  { id: 12, title: 'Final Validation', icon: CheckSquare },
  { id: 13, title: 'Ready to Use', icon: Zap }
];

export const SetupGuide = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 13) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight mb-2">Welcome & Account Initialization</h2>
              <p className="text-xs text-gray-500">Configure your organization and workspace for Panon Suite deployment.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-5">
                 <div>
                   <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1.5 tracking-wider">Company Name</label>
                   <Input type="text" placeholder="e.g. Acme Corp" />
                 </div>
                 
                 <div>
                   <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1.5 tracking-wider">Deployment Type</label>
                   <div className="space-y-2">
                      {['Cloud Hosted', 'On-Premise', 'Hybrid Edge AI', 'Multi-site Enterprise'].map(type => (
                         <label key={type} className="flex items-center gap-3 p-3.5 border border-gray-200 dark:border-[#333] rounded-xl cursor-pointer hover:border-accent hover:bg-accent/5 transition-all">
                           <input type="radio" name="deployment" className="accent-accent w-4 h-4" />
                           <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{type}</span>
                         </label>
                      ))}
                   </div>
                 </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight mb-2">Industry & Use Case</h2>
              <p className="text-xs text-gray-500">Select your industry to load recommended AI and hardware configurations.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {['Retail', 'Manufacturing', 'Smart City', 'Warehouse', 'Healthcare', 'Mining', 'Hospitality', 'Banking', 'Transportation', 'Agriculture', 'Education', 'Custom'].map(ind => {
                const Icon = industryIcons[ind] || Factory;
                const isSelected = selectedIndustry === ind;
                return (
                  <div 
                    key={ind} 
                    onClick={() => setSelectedIndustry(ind)}
                    className={cn(
                      "p-5 border rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 group text-center",
                      isSelected 
                        ? "border-accent bg-accent/10 shadow-[0_4px_20px_rgba(82,197,243,0.15)]" 
                        : "border-gray-200 dark:border-[#333] hover:border-gray-300 dark:hover:border-[#444] bg-white dark:bg-[#111]"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                      isSelected ? "bg-accent text-white" : "bg-gray-50 dark:bg-[#1a1a1a] text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                    )}>
                       <Icon size={20} />
                    </div>
                    <span className={cn(
                      "text-xs font-bold tracking-tight",
                      isSelected ? "text-accent" : "text-gray-700 dark:text-gray-300"
                    )}>{ind}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight mb-2">AI Model Selection</h2>
              <p className="text-xs text-gray-500">Choose AI objects and analytics models mapped to your objectives. You can adjust this later.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
               {Object.entries({
                 'Detection Models': ['Person Detection', 'Vehicle Detection', 'Face Detection', 'Fire/Smoke Detection'],
                 'Behavioral Models': ['Fall Detection', 'Intrusion Detection', 'Violence Detection', 'Loitering Detection'],
                 'Analytics Models': ['Heatmap', 'Demographics', 'Dwell Time', 'Queue Analytics'],
                 'Industrial Models': ['Defect Detection', 'PPE Compliance', 'Forklift Detection']
               }).map(([category, models]) => (
                  <div key={category} className="p-5 border border-gray-200 dark:border-[#333] rounded-xl bg-white dark:bg-[#111]">
                     <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-4 bg-accent rounded-full"></div>
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200">{category}</h3>
                     </div>
                     <div className="space-y-3">
                       {models.map(model => {
                         const isSelected = selectedModels.includes(model);
                         return (
                           <label 
                             key={model} 
                             className={cn(
                               "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                               isSelected 
                                 ? "border-accent bg-accent/5" 
                                 : "border-gray-100 dark:border-[#222] hover:border-gray-200 dark:hover:border-[#333]"
                             )}
                           >
                             <input 
                               type="checkbox" 
                               className="accent-accent w-4 h-4 cursor-pointer" 
                               checked={isSelected}
                               onChange={(e) => {
                                 if (e.target.checked) setSelectedModels([...selectedModels, model]);
                                 else setSelectedModels(selectedModels.filter(m => m !== model));
                               }}
                             />
                             <span className={cn(
                               "text-xs font-bold transition-colors",
                               isSelected ? "text-accent" : "text-gray-700 dark:text-gray-300"
                             )}>{model}</span>
                           </label>
                         );
                       })}
                     </div>
                  </div>
               ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight mb-2">Infrastructure & Environment Setup</h2>
              <p className="text-xs text-gray-500">Select container services and AI runtime for your Panon Suite deployment.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div>
                  <div className="flex items-center gap-2 mb-4">
                     <div className="w-1.5 h-4 bg-accent rounded-full"></div>
                     <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200">Container Services</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     {['Docker', 'Kubernetes', 'Redis', 'PostgreSQL', 'MinIO', 'Kafka'].map(svc => (
                       <label key={svc} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-[#333] rounded-lg cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors">
                         <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" defaultChecked={['Docker', 'Redis', 'PostgreSQL'].includes(svc)} />
                         <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{svc}</span>
                       </label>
                     ))}
                  </div>
               </div>

               <div>
                  <div className="flex items-center gap-2 mb-4">
                     <div className="w-1.5 h-4 bg-accent rounded-full"></div>
                     <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200">AI Runtime</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     {['CUDA', 'TensorRT', 'OpenVINO', 'ONNX Runtime'].map(rt => (
                       <label key={rt} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-[#333] rounded-lg cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors">
                         <input type="radio" name="runtime" className="accent-accent w-4 h-4 cursor-pointer" defaultChecked={rt === 'TensorRT'} />
                         <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{rt}</span>
                       </label>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight mb-2">CCTV & Camera Integration Setup</h2>
              <p className="text-xs text-gray-500">Configure your video streams and supported protocols.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="space-y-5">
                 <div>
                   <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1.5 tracking-wider">Protocol Discovery</label>
                   <Select>
                      <option>RTSP / ONVIF Auto-Discovery</option>
                      <option>WebRTC Stream</option>
                      <option>USB Camera (Local)</option>
                      <option>DVR/NVR Integration</option>
                   </Select>
                 </div>
                 
                 <div>
                   <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1.5 tracking-wider">RTSP Stream URL</label>
                   <div className="flex gap-2">
                     <Input type="text" placeholder="rtsp://admin:pass@192.168.1.100:554/stream1" />
                     <Button variant="outline">Test</Button>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1.5 tracking-wider">Resolution</label>
                     <Select>
                        <option>1920x1080 (1080p)</option>
                        <option>1280x720 (720p)</option>
                        <option>3840x2160 (4K)</option>
                     </Select>
                   </div>
                   <div>
                     <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1.5 tracking-wider">Target FPS</label>
                     <Select>
                        <option>30 FPS</option>
                        <option>15 FPS</option>
                        <option>60 FPS</option>
                     </Select>
                   </div>
                 </div>
               </div>

               <div className="border border-gray-200 dark:border-[#333] rounded-xl overflow-hidden bg-[#111] flex flex-col">
                  <div className="bg-[#1c1c1c] p-2 flex items-center justify-between border-b border-[#333]">
                     <span className="text-[10px] font-bold text-gray-400">Stream Preview</span>
                     <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  </div>
                  <div className="flex-1 flex items-center justify-center p-8 text-center">
                     <Video size={48} className="text-gray-700 opacity-50 mb-3 mx-auto" />
                     <p className="text-xs font-bold text-gray-500">Awaiting stream configuration...</p>
                  </div>
               </div>
            </div>
          </div>
        );
      case 6:
        return (
           <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight mb-2">Edge AI Provisioning</h2>
              <p className="text-xs text-gray-500">Pair your local hardware to offload AI inference processing.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="space-y-5">
                 <div>
                   <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1.5 tracking-wider">Device Type</label>
                   <Select>
                      <option>NVIDIA Jetson ORIN Nano</option>
                      <option>Intel NUC Enterprise</option>
                      <option>Raspberry Pi 5 (Lite AI)</option>
                      <option>Google Coral TPU</option>
                   </Select>
                 </div>
                 
                 <div>
                   <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1.5 tracking-wider">Device Registration Token</label>
                   <div className="flex gap-2">
                     <Input type="text" readOnly value="PNN-EDGE-8A9X-L2Q4-M5N6" className="font-mono text-xs text-accent" />
                     <Button variant="outline">Copy</Button>
                   </div>
                   <p className="text-[10px] text-gray-500 mt-2">Run `panon-agent install --token PNN-EDGE-8A9X-L2Q4-M5N6` on your edge device.</p>
                 </div>

                 <div>
                   <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1.5 tracking-wider">Edge Features</label>
                   <div className="space-y-2">
                     {['Offline buffering', 'AI inference caching', 'OTA updates', 'Remote diagnostics'].map(feature => (
                       <label key={feature} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer">
                         <input type="checkbox" className="accent-accent w-4 h-4" defaultChecked />
                         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature}</span>
                       </label>
                     ))}
                   </div>
                 </div>
               </div>

               <div className="bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4 animate-pulse">
                     <Cpu size={32} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Waiting for Device Connection</h3>
                  <p className="text-xs text-gray-500 max-w-sm">Ensure your edge device is powered on, connected to the internet, and the Panon agent is running.</p>
               </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight mb-2">Analytics & Dashboard Initialization</h2>
              <p className="text-xs text-gray-500">Configure your dashboard modules and intelligence reporting outputs.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {Object.entries({
                 'Operational View': ['Live Camera Grid', 'Active Alerts', 'Device Health'],
                 'AI Analytics View': ['Object Statistics', 'Crowd Density', 'Vehicle Trends', 'Incident Timeline'],
                 'Executive Analytics': ['KPI Metrics', 'ROI Dashboard', 'Predictive Insights']
               }).map(([category, modules]) => (
                  <div key={category} className="p-5 border border-gray-200 dark:border-[#333] rounded-xl bg-white dark:bg-[#111]">
                     <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-4 bg-accent rounded-full"></div>
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200">{category}</h3>
                     </div>
                     <div className="space-y-3">
                       {modules.map(module => (
                         <label key={module} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-[#222] cursor-pointer hover:border-gray-200 dark:hover:border-[#333] transition-colors">
                           <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" defaultChecked />
                           <span className="text-xs font-bold text-gray-700 dark:text-gray-300 transition-colors">{module}</span>
                         </label>
                       ))}
                     </div>
                  </div>
               ))}
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight mb-2">Alert & Automation Setup</h2>
              <p className="text-xs text-gray-500">Configure notification channels and automation actions based on AI events.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div>
                  <div className="flex items-center gap-2 mb-4">
                     <div className="w-1.5 h-4 bg-accent rounded-full"></div>
                     <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200">Notification Channels</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     {['Email', 'WhatsApp', 'Telegram', 'Slack', 'Microsoft Teams', 'Webhook'].map(channel => (
                       <label key={channel} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-[#333] rounded-lg cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors">
                         <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" />
                         <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{channel}</span>
                       </label>
                     ))}
                  </div>
               </div>

               <div>
                  <div className="flex items-center gap-2 mb-4">
                     <div className="w-1.5 h-4 bg-accent rounded-full"></div>
                     <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200">Automation Actions</h3>
                  </div>
                  <div className="space-y-3">
                     {['Trigger Siren', 'Open Gate', 'Save Snapshot', 'Generate Incident', 'Send API Payload'].map(action => (
                       <label key={action} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-[#333] rounded-lg cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors">
                         <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" defaultChecked={['Save Snapshot', 'Generate Incident'].includes(action)} />
                         <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{action}</span>
                       </label>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight mb-2">REST API & External Integration</h2>
              <p className="text-xs text-gray-500">Enable APIs to allow third-party platforms to interface with Panon Suite.</p>
            </div>
            
            <div className="bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl overflow-hidden">
               <div className="p-4 border-b border-[#333] flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">API Configuration</h3>
                  <Button variant="outline" className="h-8 text-xs py-0 text-gray-900 dark:text-white">Generate Key</Button>
               </div>
               <div className="p-6 space-y-6">
                 <div>
                   <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1.5 tracking-wider">Production API Key</label>
                   <Input type="password" value="sk_panon_live_8f92j289fj89f2j3" readOnly className="font-mono text-xs text-gray-900 dark:text-white" />
                 </div>
                 
                 <div>
                   <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1.5 tracking-wider">Enabled API Modules</label>
                   <div className="grid grid-cols-2 gap-4">
                     {[
                       { name: 'Camera API', desc: 'GET/POST /api/cameras' },
                       { name: 'Detection API', desc: 'GET /api/events, GET /api/analytics' },
                       { name: 'Stream API', desc: 'GET /api/live-stream' },
                       { name: 'Alert API', desc: 'POST /api/notifications' }
                     ].map(api => (
                       <div key={api.name} className="flex items-start gap-3 p-3 border border-gray-200 dark:border-[#333] rounded-lg bg-gray-50 dark:bg-[#161616]">
                         <input type="checkbox" className="accent-accent w-4 h-4 mt-0.5 cursor-pointer" defaultChecked />
                         <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{api.name}</p>
                            <p className="text-[10px] text-gray-500 font-mono mt-1">{api.desc}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight mb-2">AI Pipeline Orchestration</h2>
              <p className="text-xs text-gray-500">Review your final AI data processing pipeline.</p>
            </div>
            
            <div className="flex flex-col gap-2">
              {['Camera Stream', 'Frame Extraction', 'Inference Engine', 'Object Tracking', 'Event Classification', 'Analytics Engine', 'Storage + Alert'].map((stage, i) => (
                <div key={stage} className="flex flex-col">
                  <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#333] p-4 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#222] flex items-center justify-center text-xs font-black text-gray-500 shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{stage}</span>
                    <CheckCircle2 size={16} className="text-green-500 ml-auto" />
                  </div>
                  {i < 6 && (
                    <div className="w-0.5 h-4 bg-gray-200 dark:bg-[#333] mx-auto my-1"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 11:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight mb-2">Security & Compliance Setup</h2>
              <p className="text-xs text-gray-500">Ensure data handling and access control meet organizational standards.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                  <div className="flex items-center gap-2 mb-4">
                     <div className="w-1.5 h-4 bg-accent rounded-full"></div>
                     <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200">Security Features</h3>
                  </div>
                  <div className="space-y-3">
                     {['RBAC (Role Based Access Control)', 'SSO/SAML Integration', 'OAuth2', 'Detailed Audit Logs', 'API Rate Limiting', 'End-to-End Encryption'].map(sec => (
                       <label key={sec} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-[#333] rounded-lg cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors">
                         <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" defaultChecked={sec.includes('RBAC') || sec.includes('Encryption')} />
                         <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{sec}</span>
                       </label>
                     ))}
                  </div>
               </div>

               <div>
                  <div className="flex items-center gap-2 mb-4">
                     <div className="w-1.5 h-4 bg-accent rounded-full"></div>
                     <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200">Compliance Frameworks</h3>
                  </div>
                  <div className="space-y-3">
                     {['GDPR Privacy Mode (Blur Faces)', 'ISO 27001 Readiness', 'SOC2 Reporting', 'HIPAA Mode'].map(comp => (
                       <label key={comp} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-[#333] rounded-lg cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors">
                         <input type="checkbox" className="accent-accent w-4 h-4 cursor-pointer" />
                         <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{comp}</span>
                       </label>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        );
      case 12:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight mb-2">Final Validation & Go Live</h2>
              <p className="text-xs text-gray-500">System is performing final health checks before launching Panon Suite.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
               {[
                 { title: 'AI Engine', items: ['Model weights loaded', 'Inference engine active', 'Detection confidence > 80%'] },
                 { title: 'Camera Stream', items: ['Cameras online', 'Stable FPS detected', 'Low latency < 200ms'] },
                 { title: 'Infrastructure', items: ['GPU acceleration confirmed', 'Storage drives mounted', 'Redundant backup enabled'] }
               ].map(test => (
                 <div key={test.title} className="p-5 border border-green-500/20 bg-green-500/5 rounded-xl">
                   <h3 className="text-sm font-black text-gray-900 dark:text-white mb-4">{test.title} Validation</h3>
                   <div className="space-y-3">
                      {test.items.map(item => (
                        <div key={item} className="flex items-center gap-2.5">
                           <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                           <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                   </div>
                 </div>
               ))}
            </div>

            <div className="mt-8 p-4 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-between">
               <div>
                  <h4 className="text-sm font-bold text-accent">All Systems Go</h4>
                  <p className="text-xs text-gray-500 mt-1">Validation passed successfully. You are ready to launch.</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-accent" />
               </div>
            </div>
          </div>
        );
      case 13:
        return (
          <div className="space-y-6 text-center py-10">
            <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
              <Zap size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Ready to Go Live</h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto">Your Panon Suite instance is fully configured. Live CCTV AI detection, analytics dashboards, and alerts are now operational.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 text-left mt-8 max-w-2xl mx-auto">
               {['Live CCTV AI Detection', 'Real-time Alerts', 'Analytics Dashboard', 'Export Reports', 'REST API Access', 'Multi-user'].map(feature => (
                 <div key={feature} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-[#111] rounded-lg border border-gray-100 dark:border-[#222]">
                   <CheckCircle2 size={16} className="text-green-500" />
                   <span className="text-xs font-bold">{feature}</span>
                 </div>
               ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-transparent text-gray-900 dark:text-white transition-colors p-6 md:p-8 custom-scrollbar">
      <div className="max-w-[1600px] mx-auto min-h-full flex flex-col max-w-[1600px] h-[calc(100vh-112px)] mx-auto">
        <div className="mb-8 shrink-0">
          <h1 className="text-[18px] font-black text-gray-900 dark:text-white tracking-tight">Panon Suite Installation Engine</h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">Enterprise-grade deployment wizard</p>
        </div>

        <div className="flex flex-1 gap-8 overflow-hidden min-h-0">
        {/* Sidebar Flow */}
        <div className="w-64 shrink-0 overflow-y-auto pr-4 hidden lg:block custom-scrollbar">
          <div className="space-y-1">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isPast = currentStep > step.id;
              
              return (
                <div 
                  key={step.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
                    isActive ? "bg-accent/10 border-accent/20 border" : "border border-transparent",
                    isPast ? "opacity-60" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                    isActive ? "bg-accent text-white shadow-[0_0_15px_rgba(82,197,243,0.4)]" :
                    isPast ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-[#222] text-gray-500"
                  )}>
                    {isPast ? <CheckCircle2 size={14} /> : <Icon size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-xs font-bold truncate",
                      isActive ? "text-accent" :
                      isPast ? "text-gray-500" : "text-gray-400"
                    )}>
                      {step.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <Card className="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#161616] border border-gray-200 dark:border-[#2a2a2a] overflow-hidden rounded-2xl shadow-sm">
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-[#2a2a2a] bg-gray-50/50 dark:bg-[#1c1c1c]/50 flex items-center justify-between shrink-0">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={cn(
                "h-[40px] px-6 text-xs transition-colors",
                currentStep === 1 && "opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronLeft size={14} className="mr-1.5" /> Previous
            </Button>
            
            <Button
              onClick={handleNext}
              className="h-[40px] px-8 text-xs bg-[#1c1c1c] dark:bg-accent text-white dark:text-gray-900 border border-gray-700 dark:border-accent hover:bg-[#2a2a2a] dark:hover:bg-accent/90"
            >
              {currentStep === 13 ? 'Launch Dashboard' : 'Continue'} <ChevronRight size={14} className="ml-1.5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
    </main>
  );
};
