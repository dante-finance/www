import { ethers } from 'ethers';

import config from '../config';
import { web3ProviderFrom } from '../dante-finance/ether-utils';

export function getDefaultProvider(): ethers.providers.Web3Provider {
  return new ethers.providers.Web3Provider(
    // @ts-expect-error  need investigation by english
    web3ProviderFrom(config.defaultProvider),
    config.chainId,
  );
}
