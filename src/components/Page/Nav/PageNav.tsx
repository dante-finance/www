import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

import { PageNavConnect } from './PageNavConnect';

export function PageNav(): JSX.Element {
  return (
    <Grid justifyContent="space-between" container>
      <Grid item>
        <Link to="/">Dante Finance</Link>
      </Grid>

      <Grid item>
        <Link to="/vaults">Vaults</Link>
        <PageNavConnect />
      </Grid>
    </Grid>
  );
}
