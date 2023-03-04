import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Medal from './pages/Medal';
import ApiProvider from './providers/ApiProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ApiProvider>
      <Medal />
    </ApiProvider>
  </StrictMode>
);