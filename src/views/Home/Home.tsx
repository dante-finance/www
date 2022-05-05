import React from 'react';

import { Page } from 'components/Page/Page';

import { HomeWallet } from './HomeWallet';

export default function Home(): JSX.Element {
  return (
    <Page>
      <h1>Dante finance</h1>

      <HomeWallet />
    </Page>
  );
}
