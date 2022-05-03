import React from 'react';
import { Page } from '../../components/Page/Page';

export default function Home(): JSX.Element {
  return (
    <Page>
      <header className="App-header">
        <h1>Dante finance</h1>

        <nav>
          <a href="/vaults">Vaults</a>
        </nav>
      </header>
    </Page>
  );
}
