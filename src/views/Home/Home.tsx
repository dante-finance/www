import React from 'react';

import { useWallet } from 'use-wallet';

import { Page } from 'components/Page/Page';

export default function Home(): JSX.Element {
  const wallet = useWallet();

  return (
    <Page>
      <header className="App-header">
        <nav>
          <a href="/vaults">Vaults</a>
        </nav>

        <h1>Dante finance</h1>

        {wallet.status === 'connected' ? (
          <div>
            <div>Account: {wallet.account}</div>
            <div>Balance: {wallet.balance}</div>
            <button onClick={() => wallet.reset()}>disconnect</button>
          </div>
        ) : (
          <div>
            Connect:
            <button onClick={() => wallet.connect()}>MetaMask</button>
            <button onClick={() => wallet.connect('frame')}>Frame</button>
            <button onClick={() => wallet.connect('portis')}>Portis</button>
          </div>
        )}
      </header>
    </Page>
  );
}
