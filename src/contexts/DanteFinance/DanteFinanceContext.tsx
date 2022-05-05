import { createContext } from 'react';

import DanteFinance from 'dante-finance';

interface DanteFinanceContextData {
  danteFinance: DanteFinance | null;
}

export const DanteFinanceContext = createContext<DanteFinanceContextData>({
  danteFinance: null,
});
