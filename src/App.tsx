import React, { Suspense, useMemo } from 'react';
import { QueryClientProvider } from 'react-query';
import { UseWalletProvider } from 'use-wallet';
import { BrowserRouter } from 'react-router-dom';

import config from 'config';

import { AppRoutes } from 'components/App/AppRoutes';
import { AppLoader } from 'components/App/AppLoader';

import { DanteFinanceProvider } from 'contexts/DanteFinance/DanteFinanceProvider';

import { AppQueryClient } from './queryClient';

import './App.css';

function Providers(props: { children: React.ReactNode }): JSX.Element {
  const { children } = props;

  const connectors = useMemo(
    () => ({
      injected: {
        chainId: [config.chainId],
      },
    }),
    [],
  );

  return (
    <UseWalletProvider autoConnect connectors={connectors}>
      <QueryClientProvider client={AppQueryClient}>
        <DanteFinanceProvider>{children}</DanteFinanceProvider>
      </QueryClientProvider>
    </UseWalletProvider>
  );
}

function App(): JSX.Element {
  return (
    <Providers>
      <Suspense fallback={<AppLoader />}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Suspense>
    </Providers>
  );
}

export default App;
