import { BigNumber, utils } from 'ethers';
import React, { useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';

import { TransactionResponse } from '@ethersproject/providers';

import { VaultPool } from 'dante-finance/types';

import useDanteFinance from 'hooks/useDanteFinance';

import { VaultsAmountForm } from './VaultsAmountForm';

interface VaultsVaultWithdrawProps {
  vaultContract: VaultPool['contract'];
  shareBalance: BigNumber;
}

export function VaultsVaultWithdraw(
  props: VaultsVaultWithdrawProps,
): JSX.Element {
  const { vaultContract, shareBalance } = props;

  const danteFinance = useDanteFinance();

  const { data: pricePerShare = BigNumber.from('0') } = useQuery(
    ['vaults', 'sharePrice', vaultContract],
    () => danteFinance.getVaultPricePerFullShare(vaultContract),
    {
      refetchInterval: 10000,
    },
  );

  const handleSubmitRequest = useCallback(
    (amount: number) => {
      const pricePerShareFormatted = Number(utils.formatEther(pricePerShare));
      const withdrawAmount = (amount / pricePerShareFormatted).toString();
      return danteFinance.withdraw(
        utils.parseEther(withdrawAmount.toString()),
        vaultContract,
      );
    },
    [pricePerShare, danteFinance, vaultContract],
  );

  const handleSuccess = useCallback((value: TransactionResponse) => {
    console.log(value.hash);
  }, []);

  const maxValue = useMemo(() => {
    const shareFormatted = Number(utils.formatEther(shareBalance));
    const pricePerShareFormatted = Number(utils.formatEther(pricePerShare));

    return shareFormatted * pricePerShareFormatted;
  }, [shareBalance, pricePerShare]);

  return (
    <article>
      <VaultsAmountForm
        inputMax={maxValue}
        inputLabel="Withdraw amount"
        inputDesc={<span>Deposited: {maxValue.toFixed(4).toString()}</span>}
        submitLabel="Withdraw"
        handleSubmitRequest={handleSubmitRequest}
        onSuccess={handleSuccess}
      />
    </article>
  );
}
