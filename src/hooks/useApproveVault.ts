import { BigNumber, Contract, ethers } from 'ethers';
import { useCallback, useMemo, useState, useEffect } from 'react';

import useDanteFinance from './useDanteFinance';

import useInterval from './useInterval';

import ERC20 from '../dante-finance/ERC20';

const APPROVE_AMOUNT = ethers.constants.MaxUint256;
const APPROVE_BASE_AMOUNT = BigNumber.from('1000000000000000000000000');

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApproveVault(
  lp: string,
  vault: string,
): [ApprovalState, () => Promise<void>] {
  const danteFinance = useDanteFinance();

  const token: ERC20 = danteFinance.externalTokens[lp];
  const router: Contract = danteFinance.contracts[vault];

  const [pending, setPending] = useState(false);
  const [currentAllowance, setAllowance] = useState<BigNumber>(
    BigNumber.from(0),
  );

  useInterval(
    () => {
      fetchAllowance().catch((err) =>
        console.log(`Failed to fetch allowance: ${err.stack}`),
      );
    },
    // Delay in milliseconds or null to stop it
    currentAllowance != null &&
      currentAllowance.lt(APPROVE_BASE_AMOUNT) &&
      pending === true
      ? 1000
      : null,
  );

  const fetchAllowance = useCallback(async () => {
    const allowance = await token.allowance(
      danteFinance.myAccount,
      router.address,
    );
    setAllowance(allowance);
  }, [router.address, token, danteFinance.myAccount]);

  useEffect(() => {
    if (danteFinance.myAccount && token) {
      fetchAllowance().catch((err) =>
        console.log(`Failed to fetch allowance: ${err.stack}`),
      );
    }
  }, [token, fetchAllowance, danteFinance.myAccount]);

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!currentAllowance) return ApprovalState.UNKNOWN;

    if (pending === true && currentAllowance.gt(0)) {
      setPending(false);
    }

    return currentAllowance.lt(APPROVE_BASE_AMOUNT)
      ? pending
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [currentAllowance, pending]);

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily');
      return;
    }

    const response = await token.approve(router.address, APPROVE_AMOUNT);

    console.log(response.hash);

    setPending(true);
  }, [approvalState, token, router]);

  return [approvalState, approve];
}

export default useApproveVault;
