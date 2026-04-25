import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Interrapidisimo } from './Interrapidisimo.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Interrapidisimo />
  </StrictMode>,
)
