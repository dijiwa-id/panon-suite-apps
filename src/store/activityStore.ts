import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { safeStateStorage } from '../lib/safeStorage';

export interface ActivityLogEntry {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  user: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface ActivityState {
  logs: ActivityLogEntry[];
  addLog: (log: Omit<ActivityLogEntry, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      logs: [
        { id: '1', action: 'Model Deployed', description: 'Face Recognition v2.1 successfully deployed to Edge Node A.', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), user: 'System', type: 'success' },
        { id: '2', action: 'User Created', description: 'Administrator user created a new account for "John Doe".', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), user: 'Admin', type: 'info' },
        { id: '3', action: 'Data Collection Started', description: 'Data collection job #4451 started for Manufacturing line C.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), user: 'System', type: 'info' },
        { id: '4', action: 'Anomaly Detected', description: 'Multiple defects flagged on assembly line B. Confidence 94%.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), user: 'System', type: 'warning' },
        { id: '5', action: 'Maintenance Required', description: 'Camera CAM-12 disconnected on loading dock.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), user: 'System', type: 'error' }
      ],
      addLog: (log) => set((state) => {
        const newLog: ActivityLogEntry = {
          ...log,
          id: Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toISOString(),
        };
        // Keep last 100 logs
        const updatedLogs = [newLog, ...state.logs].slice(0, 100);
        return { logs: updatedLogs };
      }),
      clearLogs: () => set({ logs: [] }),
    }),
    {
      name: 'panon-activity-storage',
      storage: createJSONStorage(() => safeStateStorage),
    }
  )
);
