import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
let root = (container as any).__root;
if (!root) {
  root = createRoot(container);
  (container as any).__root = root;
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
