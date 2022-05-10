import React, { Suspense, useMemo } from 'react';
import { QueryClientProvider } from 'react-query';
import { UseWalletProvider } from 'use-wallet';
import { BrowserRouter } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import config from 'config';

import { AppRoutes } from 'components/App/AppRoutes';
import { AppLoader } from 'components/App/AppLoader';

import { DanteFinanceProvider } from 'contexts/DanteFinance/DanteFinanceProvider';

import { i18n, i18nInitOptions } from './i18n';
import { AppQueryClient } from './queryClient';

import './App.scss';

i18n.init(i18nInitOptions);

function Providers(props: { children: React.ReactNode }): JSX.Element {
  const { children } = props;

  useTranslation(['generic']);

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
    <Suspense fallback={<AppLoader />}>
      <Providers>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Providers>
    </Suspense>
  );
}

export default App;
