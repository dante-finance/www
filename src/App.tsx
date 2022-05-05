import React, { Suspense, lazy, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { UseWalletProvider } from 'use-wallet';

import { DanteFinanceProvider } from 'contexts/DanteFinance/DanteFinanceProvider';

import config from 'config';

import { App404 } from 'components/App/App404';
import { AppLoader } from 'components/App/AppLoader';

import { AppQueryClient } from './queryClient';
import './App.css';

const Home = lazy(async () => import('views/Home/Home'));
const Vaults = lazy(async () => import('views/Vaults/Vaults'));

function App(): JSX.Element {
  return (
    <Providers>
      <BrowserRouter>
        <Suspense fallback={<AppLoader />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/vaults" element={<Vaults />} />
            <Route path="*" element={<App404 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Providers>
  );
}

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
    <UseWalletProvider connectors={connectors}>
      <QueryClientProvider client={AppQueryClient}>
        <DanteFinanceProvider>{children}</DanteFinanceProvider>
      </QueryClientProvider>
    </UseWalletProvider>
  );
}

export default App;
