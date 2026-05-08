import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppStore } from '../store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // ThemeProvider is now just a dummy component, no longer needed since AppLayout uses ThemeSync
  return (
    <>{children}</>
  );
}

export function useTheme() {
  const theme = useAppStore(state => state.theme);
  const toggleTheme = useAppStore(state => state.toggleTheme);
  
  return { theme, toggleTheme };
}
