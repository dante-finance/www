import { createContext } from 'react';

import DanteFinance from 'dante-finance';

interface DanteFinanceContextData {
  danteFinance: DanteFinance;
}

export const DanteFinanceContext = createContext<DanteFinanceContextData>({
  danteFinance: null,
} as unknown as DanteFinanceContextData);
