import React, { useState } from 'react';
import { User, Shield, Save, Camera, Bell, Monitor, Globe, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

export const UserSettings = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [name, setName] = useState('M Iqbal');
  const [email, setEmail] = useState('iqbal@panon.com');

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#161616] p-6 lg:p-8 text-gray-900 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">Settings</h2>

          </div>
          
          <div className="flex items-center gap-3 shrink-0 mb-3">
             <button className="flex items-center gap-2 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] px-4 py-2 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-red-500 hover:border-red-500/30 dark:hover:text-red-400 dark:hover:border-red-500/30 transition-colors shadow-sm">
               <LogOut size={14} />
               <span>Log Out</span>
             </button>
             <button className="bg-[#52C5F3] hover:bg-[#3baee0] text-gray-900 transition-colors px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm">
               <Save size={14} />
               <span>Save Changes</span>
             </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           {/* Sidebar Navigation */}
           <div className="hidden lg:block lg:col-span-1">
             <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-xl p-4 shadow-sm flex flex-col gap-1">
               <button onClick={() => setActiveTab('Profile')} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors w-full text-left", activeTab === 'Profile' ? "bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-white" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-[#222] hover:text-gray-900 dark:hover:text-gray-300")}>
                 <User size={16} />
                 <span>Public Profile</span>
               </button>
               <button onClick={() => setActiveTab('Preferences')} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors w-full text-left", activeTab === 'Preferences' ? "bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-white" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-[#222] hover:text-gray-900 dark:hover:text-gray-300")}>
                 <Monitor size={16} />
                 <span>Preferences</span>
               </button>
               <button onClick={() => setActiveTab('Security')} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors w-full text-left", activeTab === 'Security' ? "bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-white" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-[#222] hover:text-gray-900 dark:hover:text-gray-300")}>
                 <Shield size={16} />
                 <span>Security</span>
               </button>
               <button onClick={() => setActiveTab('Notifications')} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors w-full text-left", activeTab === 'Notifications' ? "bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-white" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-[#222] hover:text-gray-900 dark:hover:text-gray-300")}>
                 <Bell size={16} />
                 <span>Notifications</span>
               </button>
             </div>
           </div>

           {/* Panels */}
           <div className="lg:col-span-3 flex flex-col gap-6">
              
              {activeTab === 'Profile' && (
                <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="p-6 border-b border-gray-100 dark:border-[#222]">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">Public Profile</h3>
                    <p className="text-[11px] text-gray-500 mt-1">Manage how your profile appears to other users.</p>
                  </div>
                  <div className="p-6 space-y-8">
                     <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                       <div className="relative group">
                          <div className="w-24 h-24 rounded-2xl bg-[#52C5F3]/10 border-2 border-[#52C5F3]/20 flex items-center justify-center overflow-hidden shadow-inner">
                             <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200" alt="avatar" className="w-24 h-24 object-cover" />
                          </div>
                          <button className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-[#1c1c1c] text-gray-900 dark:text-white border border-gray-200 dark:border-[#333] rounded-full hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all shadow-md group-hover:scale-110">
                            <Camera size={14} />
                          </button>
                       </div>
                       
                       <div className="flex-1">
                         <h4 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{name}</h4>
                         <div className="flex flex-wrap items-center gap-3 mt-2">
                           <span className="px-2 py-1 bg-[#52C5F3]/10 border border-[#52C5F3]/20 text-[#52C5F3] text-[10px] font-bold tracking-wide rounded">System Administrator</span>
                           <span className="text-gray-500 text-[10px] font-black tracking-widest uppercase">Member since April 2024</span>
                         </div>
                       </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-500 tracking-widest uppercase ml-1">Full Name</label>
                         <input 
                           type="text" 
                           value={name} 
                           onChange={(e) => setName(e.target.value)} 
                           className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-[#52C5F3]/50 focus:ring-1 focus:ring-[#52C5F3]/50 outline-none transition-all" 
                         />
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-500 tracking-widest uppercase ml-1">Email Address</label>
                         <input 
                           type="email" 
                           value={email} 
                           onChange={(e) => setEmail(e.target.value)} 
                           className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-[#52C5F3]/50 focus:ring-1 focus:ring-[#52C5F3]/50 outline-none transition-all" 
                         />
                       </div>
                     </div>

                     <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-500 tracking-widest uppercase ml-1">Bio</label>
                         <textarea 
                           rows={3}
                           placeholder="Tell us a little bit about yourself"
                           className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-[#52C5F3]/50 focus:ring-1 focus:ring-[#52C5F3]/50 outline-none transition-all resize-none" 
                         ></textarea>
                     </div>
                  </div>
                </div>
              )}

              {activeTab === 'Preferences' && (
                <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="p-6 border-b border-gray-100 dark:border-[#222]">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">System Preferences</h3>
                    <p className="text-[11px] text-gray-500 mt-1">Customize your platform experience.</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-xl hover:border-gray-300 dark:hover:border-[#333] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-[#52C5F3]/10 rounded-lg border border-[#52C5F3]/20">
                          <Globe size={18} className="text-[#52C5F3]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">Language & Region</h4>
                          <p className="text-[10px] font-medium text-gray-500 mt-1">Currently set to English (US), PST Timezone.</p>
                        </div>
                      </div>
                      <button className="text-[11px] font-black tracking-widest uppercase text-[#52C5F3] hover:text-[#3baee0] transition-colors">Change</button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-xl hover:border-gray-300 dark:hover:border-[#333] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                          <Monitor size={18} className="text-purple-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">Theme</h4>
                          <p className="text-[10px] font-medium text-gray-500 mt-1">System default (Auto Dark/Light).</p>
                        </div>
                      </div>
                      <select className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] text-xs font-bold text-gray-700 dark:text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none">
                        <option>System Default</option>
                        <option>Dark Mode</option>
                        <option>Light Mode</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Security' && (
                <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="p-6 border-b border-gray-100 dark:border-[#222]">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">Security & Password</h3>
                    <p className="text-[11px] text-gray-500 mt-1">Keep your account safe and secure.</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                          <Shield size={18} className="text-green-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">Two-Factor Authentication</h4>
                          <p className="text-[10px] font-medium text-gray-500 mt-1">Secure your account with an extra layer of protection.</p>
                        </div>
                      </div>
                      <button className="text-[11px] font-black tracking-widest uppercase text-[#52C5F3] hover:text-[#3baee0] transition-colors">Enable</button>
                    </div>

                    <div className="pt-2 border-t border-gray-100 dark:border-[#222]">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight mb-4 mt-2">Change Password</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 tracking-widest uppercase ml-1">Current Password</label>
                          <input 
                            type="password" 
                            placeholder="••••••••••••"
                            className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-[#52C5F3]/50 focus:ring-1 focus:ring-[#52C5F3]/50 outline-none transition-all" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-500 tracking-widest uppercase ml-1">New Password</label>
                          <input 
                            type="password" 
                            placeholder="••••••••••••"
                            className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-[#52C5F3]/50 focus:ring-1 focus:ring-[#52C5F3]/50 outline-none transition-all" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Notifications' && (
                <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#222] rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="p-6 border-b border-gray-100 dark:border-[#222]">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">Notification Alerts</h3>
                    <p className="text-[11px] text-gray-500 mt-1">Choose what you get notified about.</p>
                  </div>
                  <div className="p-6 space-y-4">
                     {[
                       { title: "Critical System Alerts", description: "Get notified when a camera goes offline or a critical error occurs.", active: true },
                       { title: "Violation Detections", description: "Receive immediate updates on PPE or safety violations.", active: true },
                       { title: "Weekly Reports", description: "A summary of the previous week's performance metrics.", active: false },
                       { title: "New Features", description: "Updates on Panon Suite platform features and changes.", active: false }
                     ].map((notif, idx) => (
                        <div key={idx} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-xl">
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{notif.title}</h4>
                            <p className="text-[10px] font-medium text-gray-500 mt-1">{notif.description}</p>
                          </div>
                          <button className={cn("relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#52C5F3] focus:ring-offset-2", notif.active ? "bg-[#52C5F3]" : "bg-gray-300 dark:bg-[#333]")}>
                             <span className="sr-only">Use setting</span>
                             <span aria-hidden="true" className={cn("pointer-events-none absolute left-0 inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out", notif.active ? "translate-x-4" : "translate-x-1")} />
                          </button>
                        </div>
                     ))}
                  </div>
                </div>
              )}

           </div>
        </div>

      </div>
    </main>
  );
};
