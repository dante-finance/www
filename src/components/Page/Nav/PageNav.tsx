import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PageNavConnect } from './PageNavConnect';

export function PageNav(): JSX.Element {
  const { t } = useTranslation(['generic']);

  return (
    <Grid justifyContent="space-between" container>
      <Grid item>
        <Link to="/">{t('generic:site_title')}</Link>
      </Grid>

      <Grid item>
        <Link to="/vaults">{t('generic:page_header.navigation.vaults')}</Link>
        <PageNavConnect />
      </Grid>
    </Grid>
  );
}
