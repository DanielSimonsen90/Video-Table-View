import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Medal from 'pages/Medal';
import ApiProvider from 'providers/ApiProvider';
import RefreshProvider from 'providers/RefreshProvider';

import ErrorBoundary from 'components/ErrorBoundary';

import './styles/index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <RefreshProvider>
      <ApiProvider>
        <Medal />
      </ApiProvider>
      </RefreshProvider>
    </ErrorBoundary>
  </StrictMode>
);
