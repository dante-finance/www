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
  const [danteFinance, setDanteFinance] = useState<DanteFinance | null>(null);

  useEffect(() => {
    if (!danteFinance) {
      const api = new DanteFinance(config);
      if (account) {
        // wallet was unlocked at initialization
        api.unlockWallet(ethereum, account);
      }
      setDanteFinance(api);
    } else if (account) {
      danteFinance.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, danteFinance]);

  return (
    <DanteFinanceContext.Provider value={{ danteFinance }}>
      {children}
    </DanteFinanceContext.Provider>
  );
}
