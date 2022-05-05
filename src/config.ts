// import { ChainId } from '@pancakeswap-libs/sdk';
//import { ChainId } from '@spookyswap/sdk';
import { Configuration } from './dante-finance/config';
import { BankInfo, Vault } from './dante-finance';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 250,
    networkName: 'Fantom Opera',
    ftmscanUrl: 'https://ftmscan.com/',
    defaultProvider: 'https://rpc.ftm.tools/',
    deployments: require('./dante-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      'd-R-DAN-TOM': ['0x6a457e84efec41a4aec0ca0d8357fc05f749ace9', 18],
      'DANTE-TOMB-LP': ['0xac32e07c25cb18266841ed7035390744cd3b1155', 18],
    },
    refreshInterval: 10000,
  },
  production: {
    chainId: 250,
    networkName: 'Fantom Opera',
    ftmscanUrl: 'https://ftmscan.com/',
    defaultProvider: 'https://rpc.ftm.tools/',
    deployments: require('./dante-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      'd-R-DAN-TOM': ['0x6a457e84efec41a4aec0ca0d8357fc05f749ace9', 18],
      'DANTE-TOMB-LP': ['0xac32e07c25cb18266841ed7035390744cd3b1155', 18],
    },
    refreshInterval: 10000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {};

export const vaultDefinitions: { [contractName: string]: Vault } = {
  DanteTombVault: {
    contract: 'DanteTombVault',
    shareTokenName: 'd-R-DAN-TOM',
    wantTokenName: 'DANTE-TOMB-LP',
    poolName: 'Dante-Tomb Vault',
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
