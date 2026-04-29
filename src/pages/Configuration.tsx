import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Save, Bell, Settings, Link, Server } from 'lucide-react';
import { cn } from '../lib/utils';

export const Configuration = () => {
  const [openSection, setOpenSection] = useState<string>('System Parameter');
  const [activeTab, setActiveTab] = useState<string>('Email');

  const [systemParams, setSystemParams] = useState({
    systemName: 'Panon Suite Alpha',
    timezone: 'UTC',
    retentionDays: '30',
    confidenceThreshold: '85',
    autoArchive: true
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    vmsType: 'Milestone',
    vmsHost: '',
    vmsUser: '',
    acsUrl: '',
    acsKey: ''
  });

  const [emailConfig, setEmailConfig] = useState({
    deliveryMethod: 'SMTP',
    smtpPort: '',
    useStartTLS: true,
    useSSL: false,
    smtpAuth: 'Login',
    smtpDomain: '',
    smtpServer: '',
    smtpUsername: '',
    smtpPassword: ''
  });

  const [errors, setErrors] = useState<{smtpPort?: string, smtpServer?: string, smtpDomain?: string, smtpUsername?: string, smtpPassword?: string}>({});

  const validate = () => {
    let isValid = true;
    const newErrors: typeof errors = {};
    if (!emailConfig.smtpPort) { newErrors.smtpPort = 'Port is required'; isValid = false; }
    if (!emailConfig.smtpDomain) { newErrors.smtpDomain = 'Domain is required'; isValid = false; }
    if (!emailConfig.smtpServer) { newErrors.smtpServer = 'Server is required'; isValid = false; }
    if (!emailConfig.smtpUsername) { newErrors.smtpUsername = 'Username is required'; isValid = false; }
    if (!emailConfig.smtpPassword) { newErrors.smtpPassword = 'Password is required'; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (openSection === 'Alert Configuration' && !validate()) {
       return;
    }
    console.log('Saving config for', openSection);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const tabs = ['Email', 'Whatsapp', 'Webhook', 'MQTT'];

  const inputClass = "w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2 text-xs text-gray-900 dark:text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all";
  const selectClass = "w-full bg-gray-100 dark:bg-[#151515] border border-gray-200 dark:border-[#222] rounded-xl pl-4 pr-9 h-[37px] text-[12px] text-gray-900 dark:text-white outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all appearance-none cursor-pointer";
  const labelClass = "block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1.5 capitalize tracking-wider";

  const SelectWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="relative">
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        <ChevronDown size={14} />
      </div>
      {children}
    </div>
  );

  return (
    <main className="flex-1 overflow-y-auto bg-transparent p-6 md:p-8 text-gray-800 dark:text-gray-200 custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-sm font-black text-gray-900 dark:text-white tracking-tight mb-1">System Configuration</h1>
          <p className="text-[10px] font-medium text-gray-500 capitalize tracking-widest font-black">Manage global parameters, external integrations, and alerting rules.</p>
        </div>

        <div className="space-y-4">
          {/* System Parameter */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] shadow-sm overflow-hidden">
            <button 
              onClick={() => toggleSection('System Parameter')}
              className={cn("w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors", openSection === 'System Parameter' && "bg-gray-50/50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#222]")}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Settings size={16} />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-gray-900 dark:text-white">System Parameter</span>
                  <span className="block text-[11px] font-medium text-gray-500">Global settings, timezone, and data retention policies.</span>
                </div>
              </div>
              {openSection === 'System Parameter' ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
            </button>
            {openSection === 'System Parameter' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>System Name</label>
                    <input type="text" value={systemParams.systemName} onChange={(e) => setSystemParams({...systemParams, systemName: e.target.value})} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Timezone</label>
                    <SelectWrapper>
                      <select value={systemParams.timezone} onChange={(e) => setSystemParams({...systemParams, timezone: e.target.value})} className={selectClass}>
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                        <option value="Asia/Jakarta">Jakarta (WIB)</option>
                      </select>
                    </SelectWrapper>
                  </div>
                  <div>
                    <label className={labelClass}>Data Retention (Days)</label>
                    <input type="number" value={systemParams.retentionDays} onChange={(e) => setSystemParams({...systemParams, retentionDays: e.target.value})} className={inputClass} />
                    <p className="text-[10px] text-gray-500 mt-1 font-medium capitalize tracking-widest font-black">Metadata older than this period will be physically deleted.</p>
                  </div>
                  <div>
                    <label className={labelClass}>Global Confidence Threshold (%)</label>
                    <input type="number" value={systemParams.confidenceThreshold} onChange={(e) => setSystemParams({...systemParams, confidenceThreshold: e.target.value})} className={inputClass} />
                  </div>
                  
                  <div className="md:col-span-2 pt-2 flex items-center gap-3">
                     <span className="relative inline-block w-10 h-5">
                       <input type="checkbox" className="peer sr-only" checked={systemParams.autoArchive} onChange={(e) => setSystemParams({...systemParams, autoArchive: e.target.checked})} id="autoArchive" />
                       <span className="block w-10 h-5 bg-gray-200 dark:bg-[#333] rounded-full peer-checked:bg-accent transition-colors"></span>
                       <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
                     </span>
                     <div>
                       <label htmlFor="autoArchive" className="text-xs font-bold text-gray-900 dark:text-white cursor-pointer">Enable Auto-Archive to Cold Storage</label>
                       <p className="text-[10px] text-gray-500 font-medium capitalize tracking-widest font-black">Automatically move older video snippets to cheaper storage tiers.</p>
                     </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                   <button onClick={handleSave} className="bg-[#1c1c1c] border border-gray-700 h-8 text-white rounded-full text-xs font-bold tracking-wide px-6 leading-[12px] hover:bg-[#2a2a2a] transition-colors flex items-center gap-1.5">
                     <Save size={14} />
                     Save Parameters
                   </button>
                </div>
              </div>
            )}
          </div>

          {/* Integration Settings */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] shadow-sm overflow-hidden">
            <button 
              onClick={() => toggleSection('Integration Settings')}
              className={cn("w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors", openSection === 'Integration Settings' && "bg-gray-50/50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#222]")}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Link size={16} />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-gray-900 dark:text-white">Integration Settings</span>
                  <span className="block text-[11px] font-medium text-gray-500">Connect with VMS, Access Control, and External Databases.</span>
                </div>
              </div>
              {openSection === 'Integration Settings' ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
            </button>
            {openSection === 'Integration Settings' && (
              <div className="p-6 space-y-8">
                {/* VMS Integration */}
                <div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-[#222] pb-2 mb-4 flex items-center gap-2">
                    <Server size={14} /> Video Management System (VMS)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>VMS Provider</label>
                      <SelectWrapper>
                        <select value={integrationSettings.vmsType} onChange={(e) => setIntegrationSettings({...integrationSettings, vmsType: e.target.value})} className={selectClass}>
                          <option value="Milestone">Milestone XProtect</option>
                          <option value="Genetec">Genetec Security Center</option>
                          <option value="None">None (Standalone)</option>
                        </select>
                      </SelectWrapper>
                    </div>
                    <div>
                      <label className={labelClass}>Endpoint Host / IP</label>
                      <input type="text" placeholder="https://192.168.1.100:8080" value={integrationSettings.vmsHost} onChange={(e) => setIntegrationSettings({...integrationSettings, vmsHost: e.target.value})} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>API Username / Token</label>
                      <input type="text" value={integrationSettings.vmsUser} onChange={(e) => setIntegrationSettings({...integrationSettings, vmsUser: e.target.value})} className={inputClass} />
                    </div>
                    <div className="flex items-end mb-1">
                      <button className="h-9 px-4 rounded-lg bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#222] text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors">
                        Test Connection
                      </button>
                    </div>
                  </div>
                </div>

                {/* ACS Integration */}
                <div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-[#222] pb-2 mb-4 flex items-center gap-2">
                    <Settings size={14} /> Access Control System (ACS)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Webhook URL</label>
                      <input type="text" placeholder="https://..." value={integrationSettings.acsUrl} onChange={(e) => setIntegrationSettings({...integrationSettings, acsUrl: e.target.value})} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Auth Key / Secret</label>
                      <input type="password" value={integrationSettings.acsKey} onChange={(e) => setIntegrationSettings({...integrationSettings, acsKey: e.target.value})} className={inputClass} />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                   <button onClick={handleSave} className="bg-[#1c1c1c] border border-gray-700 h-8 text-white rounded-full text-xs font-bold tracking-wide px-6 leading-[12px] hover:bg-[#2a2a2a] transition-colors flex items-center gap-1.5">
                     <Save size={14} />
                     Save Integrations
                   </button>
                </div>
              </div>
            )}
          </div>

          {/* Alert Configuration */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-200 dark:border-[#222] shadow-sm overflow-hidden">
            <button 
              onClick={() => toggleSection('Alert Configuration')}
              className={cn("w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors", openSection === 'Alert Configuration' && "bg-gray-50/50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#222]")}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Bell size={16} />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-gray-900 dark:text-white">Alert Configuration</span>
                  <span className="block text-[11px] font-medium text-gray-500">Manage Email, WhatsApp, Webhooks, and MQTT alerts.</span>
                </div>
              </div>
              {openSection === 'Alert Configuration' ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
            </button>
            
            {openSection === 'Alert Configuration' && (
              <div className="p-0">
                 <div className="flex border-b border-gray-200 dark:border-[#222] px-6 bg-gray-50/30 dark:bg-[#1a1a1a]/30">
                   {tabs.map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "px-6 py-3 text-xs font-bold transition-colors border-b-2",
                          activeTab === tab 
                            ? "border-accent text-gray-900 dark:text-white"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        )}
                      >
                        {tab}
                      </button>
                   ))}
                 </div>

                 <div className="p-6">
                   {activeTab === 'Email' && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                       <div className="space-y-4">
                          <div>
                            <label className={labelClass}>Delivery Method</label>
                            <SelectWrapper>
                              <select value={emailConfig.deliveryMethod} onChange={(e) => setEmailConfig({...emailConfig, deliveryMethod: e.target.value})} className={selectClass}>
                                <option>SMTP</option>
                                <option>API</option>
                              </select>
                            </SelectWrapper>
                          </div>
                          <div>
                            <label className={labelClass}>SMTP Authentication</label>
                            <SelectWrapper>
                              <select value={emailConfig.smtpAuth} onChange={(e) => setEmailConfig({...emailConfig, smtpAuth: e.target.value})} className={selectClass}>
                                <option>Login</option>
                                <option>Plain</option>
                                <option>None</option>
                              </select>
                            </SelectWrapper>
                          </div>
                          <div className="pt-2 space-y-3">
                            <label className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white cursor-pointer">
                              <input type="checkbox" checked={emailConfig.useStartTLS} onChange={(e) => setEmailConfig({...emailConfig, useStartTLS: e.target.checked})} className="rounded bg-transparent border-gray-300 dark:border-gray-600 text-accent focus:ring-accent" />
                              Use STARTTLS if available
                            </label>
                            <label className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white cursor-pointer">
                              <input type="checkbox" checked={emailConfig.useSSL} onChange={(e) => setEmailConfig({...emailConfig, useSSL: e.target.checked})} className="rounded bg-transparent border-gray-300 dark:border-gray-600 text-accent focus:ring-accent" />
                              Use SSL Connection
                            </label>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <div>
                            <label className={labelClass}>SMTP Domain</label>
                            <input type="text" placeholder="domain.com" value={emailConfig.smtpDomain} onChange={(e) => setEmailConfig({...emailConfig, smtpDomain: e.target.value})} className={cn(inputClass, errors.smtpDomain && "border-red-500")} />
                            {errors.smtpDomain && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.smtpDomain}</p>}
                          </div>
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <label className={labelClass}>SMTP Server</label>
                              <input type="text" placeholder="smtp.domain.com" value={emailConfig.smtpServer} onChange={(e) => setEmailConfig({...emailConfig, smtpServer: e.target.value})} className={cn(inputClass, errors.smtpServer && "border-red-500")} />
                            </div>
                            <div className="w-24">
                              <label className={labelClass}>Port</label>
                              <input type="text" placeholder="587" value={emailConfig.smtpPort} onChange={(e) => setEmailConfig({...emailConfig, smtpPort: e.target.value})} className={cn(inputClass, errors.smtpPort && "border-red-500")} />
                            </div>
                          </div>
                          <div>
                            <label className={labelClass}>SMTP Username</label>
                            <input type="text" placeholder="Username" value={emailConfig.smtpUsername} onChange={(e) => setEmailConfig({...emailConfig, smtpUsername: e.target.value})} className={cn(inputClass, errors.smtpUsername && "border-red-500")} />
                          </div>
                          <div>
                            <label className={labelClass}>SMTP Password</label>
                            <input type="password" placeholder="Password" value={emailConfig.smtpPassword} onChange={(e) => setEmailConfig({...emailConfig, smtpPassword: e.target.value})} className={cn(inputClass, errors.smtpPassword && "border-red-500")} />
                          </div>
                       </div>

                       <div className="md:col-span-2 pt-6 flex items-center justify-end gap-4 border-t border-gray-200 dark:border-[#222]">
                          <button className="text-xs font-bold text-accent hover:text-accent/80 transition-colors">
                            Send a test email
                          </button>
                          <button onClick={handleSave} className="bg-[#1c1c1c] border border-gray-700 h-8 text-white rounded-full text-xs font-bold tracking-wide px-6 leading-[12px] hover:bg-[#2a2a2a] transition-colors flex items-center gap-1.5">
                            <Save size={14} />
                            Save Email Config
                          </button>
                       </div>
                     </div>
                   )}

                   {activeTab !== 'Email' && (
                      <div className="py-12 border-2 border-dashed border-gray-200 dark:border-[#222] rounded-xl text-center">
                         <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-[#1a1a1a] flex items-center justify-center mx-auto mb-3">
                           <Bell className="text-gray-400" size={20} />
                         </div>
                         <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{activeTab} Integration</h4>
                         <p className="text-[10px] font-medium text-gray-500 capitalize tracking-widest font-black">Coming soon in the next system update.</p>
                      </div>
                   )}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

