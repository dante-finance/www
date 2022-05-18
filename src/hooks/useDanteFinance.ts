import { useContext } from 'react';

import DanteFinance from 'dante-finance';

import { DanteFinanceContext } from 'contexts/DanteFinance/DanteFinanceContext';

const useDanteFinance = (): DanteFinance => {
  const { danteFinance } = useContext(DanteFinanceContext);
  return danteFinance;
};

export default useDanteFinance;
