import { BigNumber, Contract, ethers } from 'ethers';

import { TransactionResponse } from '@ethersproject/providers';

import { Configuration } from './config';
import { VaultPool, VaultPoolDetails, Vault } from './types';

import ERC20 from './ERC20';

import { getDefaultProvider } from '../utils/provider';
import { vaultDefinitions } from '../config';

/**
 * An API module of Tomb Finance contracts.
 * All contract-interacting domain logic should be defined in here.
 *
 * @todo make logger to avoid print console logs in production
 */
export class DanteFinance {
  myAccount: string;
  provider: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  externalTokens: { [name: string]: ERC20 };

  constructor(cfg: Configuration) {
    const { deployments, externalTokens } = cfg;
    const provider = getDefaultProvider();

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new Contract(
        deployment.address,
        deployment.abi,
        provider,
      );
    }
    this.externalTokens = {};
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(
        address,
        provider,
        symbol,
        decimal,
      );
    }

    this.myAccount = '';
    this.config = cfg;
    this.provider = provider;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(
    provider: ethers.providers.ExternalProvider,
    account: string,
  ): void {
    const newProvider = new ethers.providers.Web3Provider(
      provider,
      this.config.chainId,
    );

    this.signer = newProvider.getSigner(0);
    this.myAccount = account;

    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }

    for (const token of Object.values(this.externalTokens)) {
      token.connect(this.signer);
    }

    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);
  }

  disconnectWallet(): void {
    this.myAccount = '';

    //@todo check how to disconnect contracts
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  /* VAULTS APIs */

  /**
   * Deposit an amount of LP tokens in a vault
   * @param want LP token to deposit
   * @param vault vault contract
   */
  async deposit(want: BigNumber, vault: string): Promise<TransactionResponse> {
    const contract = this.contracts[vault];
    return await contract.deposit(want);
  }

  /**
   * Deposit all LP tokens in a vault
   * @param vault vault contract
   */
  async depositAll(vault: string): Promise<TransactionResponse> {
    const contract = this.contracts[vault];
    return await contract.depositAll();
  }

  /**
   * Withdraw a certain amount of LP from vault based on shares
   * @param shares amount of vault shares
   * @param vault vault contract
   */
  async withdraw(
    shares: BigNumber,
    vault: string,
  ): Promise<TransactionResponse> {
    const contract = this.contracts[vault];
    return await contract.withdraw(shares);
  }

  /**
   * Withdraw all LP from vault
   * @param vault vault contract
   */
  async withdrawAll(vault: string): Promise<TransactionResponse> {
    const contract = this.contracts[vault];
    return await contract.withdrawAll();
  }

  /**
   * Get all available vault pools
   */
  getVaults(): VaultPool[] {
    return Object.values(vaultDefinitions).map(
      (vaultInfo) =>
        ({
          contract: vaultInfo.contract,
          name: vaultInfo.poolName,
        } as VaultPool),
    );
  }

  /**
   * Get the latest price per share in the specified vault
   * @param vault name of contract
   */
  async getVaultPricePerFullShare(vault: string): Promise<BigNumber> {
    const contract = this.contracts[vault];
    return await contract.getPricePerFullShare();
  }

  /**
   * Get detailed info about a pool
   */
  async getVault(vault: string): Promise<VaultPoolDetails> {
    // get contract of vault
    const contract = this.contracts[vault];

    // get definition of vault
    const definition: Vault = vaultDefinitions[vault];

    // get want erc20
    const want = this.externalTokens[definition.wantTokenName];

    // get share erc20
    const share = this.externalTokens[definition.shareTokenName];

    // get LP price per share
    const pricePerShare: BigNumber = await contract.getPricePerFullShare();

    // get tvl
    const tvl: BigNumber = await contract.balance();

    // get allowance value of sending want tokens to vault
    const allowance =
      this.myAccount !== ''
        ? await want.allowance(this.myAccount, contract.address)
        : BigNumber.from('0');

    // get want balance
    const wantBalance =
      this.myAccount !== ''
        ? await want.balanceOf(this.myAccount)
        : BigNumber.from('0');

    // get share balance
    const shareBalance =
      this.myAccount !== ''
        ? await share.balanceOf(this.myAccount)
        : BigNumber.from('0');

    // @todo
    // calculate APY
    const apy = 0;

    const result = {
      contract: definition.contract,
      name: definition.poolName,
      want: want.symbol,
      wantBalance: wantBalance,
      share: share.symbol,
      shareBalance: shareBalance,
      allowance: allowance,
      pricePerFullShare: pricePerShare,
      apy: apy,
      tvl: tvl,
    };

    return result;
  }
}
