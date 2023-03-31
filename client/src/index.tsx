import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Medal from 'pages/Medal';
import ApiProvider from 'providers/ApiProvider';
import RefreshProvider from 'providers/RefreshProvider';

import ErrorBoundary from 'components/ErrorBoundary';

import './styles/index.scss';
import ModalProvider from 'providers/ModalProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <RefreshProvider>
      <ApiProvider>
      <ModalProvider>
        <Medal />
      </ModalProvider>
      </ApiProvider>
      </RefreshProvider>
    </ErrorBoundary>
  </StrictMode>
);
