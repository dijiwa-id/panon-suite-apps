import { createContext, useContext, useEffect, useState } from 'react';
import { useAppStore } from '../store';

export function useTheme() {
  const theme = useAppStore(state => state.theme);
  const toggleTheme = useAppStore(state => state.toggleTheme);
  
  return { theme, toggleTheme };
}
