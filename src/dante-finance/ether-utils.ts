import Web3 from 'web3';

import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

import { defaultEthereumConfig, EthereumConfig } from './config';

export function web3ProviderFrom(
  endpoint: string,
  config?: EthereumConfig,
): InstanceType<typeof Web3.providers.HttpProvider> {
  const ethConfig = { ...defaultEthereumConfig, ...(config || {}) };

  const providerClass = Web3.providers.HttpProvider;

  return new providerClass(endpoint, {
    timeout: ethConfig.ethereumNodeTimeout,
  });
}

export function balanceToDecimal(s: string): string {
  return formatUnits(s);
}

export function decimalToBalance(d: string | number, decimals = 18): BigNumber {
  return parseUnits(String(d), decimals);
}
