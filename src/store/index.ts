import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AppState {
  // Theme State
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;

  // Auth State
  isAuthenticated: boolean;
  user: User | null;
  adminCredentials: { email: string; pass: string; isFirstLogin: boolean };
  login: (user: User) => void;
  logout: () => void;
  updateAdminCredentials: (pass: string) => void;

  // Navigation State
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  activePath: string;
  setActivePath: (path: string) => void;

  // Global Settings State
  platformName: string;
  platformLogo: string | null;
  setPlatformConfiguration: (name: string, logo: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Theme initial state
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),

      // Auth initial state
      isAuthenticated: false,
      user: null,
      adminCredentials: {
        email: 'admin@panonsuite.com',
        pass: 'admin123',
        isFirstLogin: true
      },
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
      updateAdminCredentials: (pass) => set((state) => ({
        adminCredentials: { ...state.adminCredentials, pass, isFirstLogin: false }
      })),

      // Navigation initial state
      isSidebarOpen: true,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
      activePath: '/',
      setActivePath: (activePath) => set({ activePath }),

      // Global Settings
      platformName: 'PT Rastek Teknologi Indonesia',
      platformLogo: null,
      setPlatformConfiguration: (name, logo) => set({ platformName: name, platformLogo: logo }),
    }),
    {
      name: 'panon-suite-storage',
      partialize: (state) => ({ 
        theme: state.theme, 
        isAuthenticated: state.isAuthenticated, 
        user: state.user,
        adminCredentials: state.adminCredentials,
        platformName: state.platformName,
        platformLogo: state.platformLogo
      }),
    }
  )
);
