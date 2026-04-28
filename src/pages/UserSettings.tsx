import React, { useState } from 'react';
import { User, Mail, Shield, Save, Camera } from 'lucide-react';
import { cn } from '../lib/utils';

export const UserSettings = () => {
  const [name, setName] = useState('M Iqbal');
  const [email, setEmail] = useState('iqbal@panon.com');

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#161616] p-6 md:p-8 text-gray-900 dark:text-gray-200 transition-colors custom-scrollbar">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-bold text-white mb-6">User Settings</h1>
        
        <div className="bg-[#1e1e1e] rounded-2xl border border-[#2a2a2a] p-6 space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" alt="avatar" className="w-20 h-20 rounded-2xl bg-accent/20 border border-accent/30" />
               <button className="absolute bottom-0 right-0 p-1.5 bg-accent text-black rounded-full hover:scale-105 transition-transform">
                 <Camera size={14} />
               </button>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{name}</h2>
              <p className="text-sm text-gray-400">SysAdmin • ID: USR-001</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white focus:border-accent outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#151515] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white focus:border-accent outline-none" />
            </div>
          </div>

          <div className="pt-6 border-t border-[#2a2a2a] flex justify-end">
            <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-black h-[32px] rounded-lg text-xs font-bold px-5 transition-shadow shadow-[0_0_15px_rgba(82,197,243,0.2)]">
              <Save size={14} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
