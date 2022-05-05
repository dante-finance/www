import { useContext } from 'react';

import DanteFinance from 'dante-finance';

import { DanteFinanceContext } from 'contexts/DanteFinance';

const useDanteFinance = (): DanteFinance | null => {
  const { danteFinance } = useContext(DanteFinanceContext);
  return danteFinance;
};

export default useDanteFinance;
