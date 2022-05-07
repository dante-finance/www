import Grid from '@mui/material/Grid';

import { PageNavConnect } from './PageNavConnect';

export function PageNav(): JSX.Element {
  return (
    <Grid justifyContent="space-between" container>
      <Grid item>Dante Finance</Grid>

      <Grid item>
        <a href="/vaults">Vaults</a>
        <PageNavConnect />
      </Grid>
    </Grid>
  );
}
