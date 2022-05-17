import { TransactionResponse } from '@ethersproject/providers';
import { BigNumber, utils } from 'ethers';
import { useCallback } from 'react';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { VaultPool } from 'dante-finance/types';

import { useVaultApprove, VaultApproveStatus } from 'hooks/useVaultApprove';
import useDanteFinance from 'hooks/useDanteFinance';

import { VaultsAmountForm } from './VaultsAmountForm';

interface VaultsVaultDepositProps {
  vaultContract: VaultPool['contract'];
  wantBalance: BigNumber;
  want: string;
}

export function VaultsVaultDeposit(
  props: VaultsVaultDepositProps,
): JSX.Element {
  const { vaultContract: contract, wantBalance: balance, want } = props;

  const danteFinance = useDanteFinance();
  const [approveStatus, approveVault] = useVaultApprove(want, contract);

  const handleSubmitRequest = useCallback(
    (amount: number) =>
      danteFinance.deposit(utils.parseEther(amount.toString()), contract),
    [contract, danteFinance],
  );

  const handleSuccess = useCallback((value: TransactionResponse) => {
    console.log(value.hash);
  }, []);

  if (approveStatus === VaultApproveStatus.PENDING) {
    return (
      <article>
        <CircularProgress />
      </article>
    );
  }

  if (approveStatus === VaultApproveStatus.APPROVED) {
    return (
      <article>
        <VaultsAmountForm
          inputMax={Number(utils.formatEther(balance))}
          inputLabel="Deposit amount"
          inputDesc={
            <span>
              Balance:{' '}
              {Number(utils.formatEther(balance)).toFixed(4).toString()}
            </span>
          }
          submitLabel="Deposit"
          handleSubmitRequest={handleSubmitRequest}
          onSuccess={handleSuccess}
        />
      </article>
    );
  }

  return (
    <article>
      <p>You need to approve {want} before depositing.</p>
      <Button color="primary" variant="contained" onClick={approveVault}>
        Approve
      </Button>
    </article>
  );
}
