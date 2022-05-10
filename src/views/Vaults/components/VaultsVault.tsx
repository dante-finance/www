import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

import { useQuery } from 'react-query';

import { VaultPool, VaultPoolDetails } from 'dante-finance/types';

import useDanteFinance from 'hooks/useDanteFinance';

import { VaultsVaultDeposit } from './VaultsVaultDeposit';
import { VaultsVaultWithdraw } from './VaultsVaultWithdraw';

interface VaultsVaultProps {
  vaultContract: VaultPool['contract'];
}

export function VaultsVault(props: VaultsVaultProps): JSX.Element {
  const { vaultContract } = props;

  const api = useDanteFinance();

  // we need to add api.myAccount to query key in order to get updated data when user changes account
  const { isLoading, error, data } = useQuery(
    ['vaults', 'info', vaultContract, api.myAccount],
    () => api.getVault(vaultContract),
  );

  if (isLoading) {
    return <Skeleton variant="rectangular" height={150} />;
  }

  if (error) {
    return <>An error occurred</>;
  }

  const vaultInfo = data as VaultPoolDetails;

  if (api.myAccount !== '') {
    return (
      <Grid container style={{ color: 'black' }}>
        <Grid item md={6}>
          <Box style={{ padding: '20px' }}>
            <VaultsVaultDeposit
              vaultContract={vaultContract}
              want={vaultInfo.want}
              wantBalance={vaultInfo.wantBalance}
            />
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box style={{ padding: '20px' }}>
            <VaultsVaultWithdraw
              vaultContract={vaultContract}
              shareBalance={vaultInfo.shareBalance}
            />
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <Box style={{ padding: '20px', textAlign: 'center' }}>
      Connect to wallet
    </Box>
  );
}
