import React, { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Skeleton from '@mui/material/Skeleton';

import { useQuery } from 'react-query';

import { VaultPool } from 'dante-finance/types';

import { Page } from 'components/Page/Page';

import useDanteFinance from 'hooks/useDanteFinance';

import { VaultsVault } from './components/VaultsVault';

export default function Vaults(): JSX.Element {
  const [expandedItemID, setExpandedItemID] = useState<VaultPool['contract']>();

  const danteFinance = useDanteFinance();

  const { isLoading, data, error } = useQuery(['vaults', 'list'], () =>
    danteFinance.getVaults(),
  );

  if (isLoading) {
    return (
      <Page>
        <Skeleton variant="rectangular" height={150} />
        <Skeleton variant="rectangular" height={150} />
        <Skeleton variant="rectangular" height={150} />
      </Page>
    );
  }

  if (error) {
    return <>An error occurred</>;
  }

  const vaults = data as VaultPool[];

  return (
    <Page>
      <h2>Dante Vaults</h2>

      {vaults.map((vault) => (
        <Accordion
          key={vault.contract}
          expanded={vault.contract === expandedItemID}
          onChange={(): void => {
            if (vault.contract === expandedItemID) {
              setExpandedItemID(undefined);
            } else {
              setExpandedItemID(vault.contract);
            }
          }}
        >
          <AccordionSummary>
            <h5>{vault.name}</h5>
          </AccordionSummary>
          {vault.contract === expandedItemID && (
            <VaultsVault vaultContract={vault.contract} />
          )}
        </Accordion>
      ))}
    </Page>
  );
}
