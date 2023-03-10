import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Medal from 'pages/Medal';
import ApiProvider from 'providers/ApiProvider';

import './styles/index.scss';
import RefreshProvider from 'providers/RefreshProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RefreshProvider>
      <ApiProvider>
        <Medal />
      </ApiProvider>
    </RefreshProvider>
  </StrictMode>
);
