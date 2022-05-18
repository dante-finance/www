import React, { useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';

import config from 'config';
import DanteFinance from 'dante-finance';

import { DanteFinanceContext } from './DanteFinanceContext';

interface DanteFinanceProviderProps {
  children: React.ReactNode;
}

export function DanteFinanceProvider(
  props: DanteFinanceProviderProps,
): JSX.Element {
  const { children } = props;

  const { ethereum, account } = useWallet();
  const [danteFinance] = useState<DanteFinance>(() => new DanteFinance(config));

  useEffect(() => {
    if (account) {
      // wallet was unlocked at initialization
      danteFinance.unlockWallet(ethereum, account);
    } else {
      danteFinance.disconnectWallet();
    }
  }, [account, ethereum, danteFinance]);

  return (
    <DanteFinanceContext.Provider value={{ danteFinance }}>
      {children}
    </DanteFinanceContext.Provider>
  );
}
