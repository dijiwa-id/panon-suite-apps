import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress known benign Vite WebSocket & Hydration errors in development
const suppressError = (msg: any) => {
  if (!msg) return false;
  const str = typeof msg === 'string' ? msg : (msg.message || msg.toString());
  return str.includes('failed to connect to websocket') ||
         str.includes('WebSocket closed without opened') ||
         str.includes('Hydration');
};

const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  if (args.some(suppressError)) return;
  originalConsoleError(...args);
};

const originalConsoleLog = console.log;
console.log = (...args: any[]) => {
  if (args.some(suppressError)) return;
  originalConsoleLog(...args);
};

const originalConsoleWarn = console.warn;
console.warn = (...args: any[]) => {
  if (args.some(suppressError)) return;
  originalConsoleWarn(...args);
};

window.addEventListener('error', (event) => {
  if (suppressError(event.message) || suppressError(event.error)) {
    event.preventDefault();
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (suppressError(event.reason)) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
