import { useMemo, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { useMutation, useQuery } from 'react-query';

import useDanteFinance from './useDanteFinance';

const APPROVE_AMOUNT = ethers.constants.MaxUint256;
const APPROVE_BASE_AMOUNT = BigNumber.from('1000000000000000000000000');

export enum VaultApproveStatus {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

type UseVaultApproveResult = [VaultApproveStatus, () => Promise<true>];

/**
 * This hook provides
 * - a variable indicating the status of the approval
 * - a function to request an approval or early returns if it is not necessary
 */
function useVaultApprove(lp: string, vault: string): UseVaultApproveResult {
  const danteFinance = useDanteFinance();

  const token = useMemo(
    () => danteFinance.externalTokens[lp],
    [danteFinance.externalTokens, lp],
  );
  const router = useMemo(
    () => danteFinance.contracts[vault],
    [danteFinance.contracts, vault],
  );

  const [currentAllowance, setCurrentAllowance] = useState(BigNumber.from(0));

  const {
    mutateAsync: approve,
    data: pendingApproval,
    reset: resetApproval,
  } = useMutation<boolean, Error, never>(async () => {
    if (approvalStatus !== VaultApproveStatus.NOT_APPROVED) {
      console.error('approve was called unnecessarily');
      return true;
    }

    const response = await token.approve(router.address, APPROVE_AMOUNT);

    console.log(response.hash);

    return true;
  });

  const refetchInterval = useMemo(() => {
    // If user has performed an approve request and the value is still 0 we need
    // to enable periodic request to fetch uo-to-date information
    if (pendingApproval && currentAllowance.lt(APPROVE_BASE_AMOUNT)) {
      return 1000;
    }

    return false;
  }, [pendingApproval, currentAllowance]);

  useQuery(
    ['vaults', 'allowance', danteFinance.myAccount, router.address],
    () => token.allowance(danteFinance.myAccount, router.address),
    {
      onSuccess(res) {
        if (pendingApproval && res.gt(0)) {
          resetApproval();
        }
        setCurrentAllowance(res);
      },
      refetchInterval,
    },
  );

  // check the current approval status
  const approvalStatus: VaultApproveStatus = useMemo(() => {
    if (!currentAllowance) return VaultApproveStatus.UNKNOWN;

    if (currentAllowance.gte(APPROVE_BASE_AMOUNT))
      return VaultApproveStatus.APPROVED;

    if (pendingApproval) return VaultApproveStatus.PENDING;

    return VaultApproveStatus.NOT_APPROVED;
  }, [currentAllowance, pendingApproval]);

  return useMemo(
    () => [approvalStatus, approve] as UseVaultApproveResult,
    [approvalStatus, approve],
  );
}

export { useVaultApprove };
