import { type StateStorage } from 'zustand/middleware';

// An in-memory fallback storage for when window.localStorage is blocked/restricted.
const memoryStorage: Record<string, string> = {};

let isLocalStorageAvailable = false;
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    const testKey = '__storage_test_key__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    isLocalStorageAvailable = true;
  }
} catch (e) {
  isLocalStorageAvailable = false;
}

/**
 * A safe StateStorage wrapper suited for Zustand persist middleware.
 * Prevents throwing SecurityError or other DOM exceptions in sandboxed iframes.
 */
export const safeStateStorage: StateStorage = {
  getItem: (name: string): string | null => {
    if (!isLocalStorageAvailable) {
      return memoryStorage[name] || null;
    }
    try {
      return window.localStorage.getItem(name);
    } catch (e) {
      return memoryStorage[name] || null;
    }
  },
  setItem: (name: string, value: string): void => {
    if (!isLocalStorageAvailable) {
      memoryStorage[name] = value;
      return;
    }
    try {
      window.localStorage.setItem(name, value);
    } catch (e) {
      memoryStorage[name] = value;
    }
  },
  removeItem: (name: string): void => {
    if (!isLocalStorageAvailable) {
      delete memoryStorage[name];
      return;
    }
    try {
      window.localStorage.removeItem(name);
    } catch (e) {
      delete memoryStorage[name];
    }
  }
};

/**
 * A safe general-purpose localStorage clone to use throughout the application.
 */
export const safeLocalStorage = {
  getItem: (name: string): string | null => {
    if (!isLocalStorageAvailable) {
      return memoryStorage[name] || null;
    }
    try {
      return window.localStorage.getItem(name);
    } catch (e) {
      return memoryStorage[name] || null;
    }
  },
  setItem: (name: string, value: string): void => {
    if (!isLocalStorageAvailable) {
      memoryStorage[name] = value;
      return;
    }
    try {
      window.localStorage.setItem(name, value);
    } catch (e) {
      memoryStorage[name] = value;
    }
  },
  removeItem: (name: string): void => {
    if (!isLocalStorageAvailable) {
      delete memoryStorage[name];
      return;
    }
    try {
      window.localStorage.removeItem(name);
    } catch (e) {
      delete memoryStorage[name];
    }
  },
  clear: (): void => {
    if (!isLocalStorageAvailable) {
      Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
      return;
    }
    try {
      window.localStorage.clear();
    } catch (e) {
      Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
    }
  }
};
