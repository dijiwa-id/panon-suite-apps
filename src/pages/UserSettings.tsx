import React, { useState } from 'react';
import { User, Mail, Shield, Save, Camera } from 'lucide-react';
import { cn } from '../lib/utils';

export const UserSettings = () => {
  const [name, setName] = useState('M Iqbal');
  const [email, setEmail] = useState('iqbal@panon.com');

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#161616] p-6 lg:p-12 text-gray-900 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-sm font-black text-gray-900 dark:text-white tracking-tight">Account Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your profile and system preferences.</p>
        </header>
        
        <div className="space-y-8">
          {/* Profile Section */}
          <section className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-100 dark:border-[#222] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
              <h2 className="text-[11px] font-black text-gray-900 dark:text-gray-300">Public Profile</h2>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="relative group">
                   <div className="w-24 h-24 rounded-2xl bg-accent/10 border-2 border-accent/20 flex items-center justify-center overflow-hidden shadow-inner">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" alt="avatar" className="w-20 h-20" />
                   </div>
                   <button className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-[#1c1c1c] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-all shadow-xl group-hover:scale-110">
                     <Camera size={14} />
                   </button>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{name}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold rounded">System Administrator</span>
                    <span className="text-gray-500 text-[10px] font-black tracking-widest uppercase">Member since April 2024</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 tracking-widest uppercase ml-1">Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 tracking-widest uppercase ml-1">Email Address</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all" 
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className="bg-white dark:bg-[#1e1e1e] rounded-[11px] border border-gray-100 dark:border-[#222] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-[#222] bg-gray-50/50 dark:bg-[#1a1a1a]">
              <h2 className="text-[11px] font-black text-gray-900 dark:text-gray-300">Security & Password</h2>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-accent/5 rounded-lg border border-accent/10">
                    <Shield size={18} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest font-black">Secure your account with an extra layer of protection.</p>
                  </div>
                </div>
                <button className="text-accent text-[10px] font-bold tracking-tight hover:underline">Enable</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 tracking-widest uppercase ml-1">Current Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••••••"
                    className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 tracking-widest uppercase ml-1">New Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••••••"
                    className="w-full bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-[#222] rounded-lg px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all" 
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-between items-center bg-gray-50/50 dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-[#222]">
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest font-black">Last updated on April 28, 2024</p>
            <button onClick={() => {}} className="bg-accent hover:bg-accent/90 text-black h-8 rounded-full text-xs font-bold px-5 transition-colors shadow-[0_0_15px_rgba(82,197,243,0.3)] flex items-center gap-2">
              <Save size={14} />
              Save Modifications
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
