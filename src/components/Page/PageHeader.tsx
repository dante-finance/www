import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PageNav } from './Nav/PageNav';

export function PageHeader(): JSX.Element {
  const { t } = useTranslation(['generic']);

  return (
    <header className="app-header">
      <Grid justifyContent="space-between" container>
        <Grid item>
          <Link to="/">{t('generic:site_title')}</Link>
        </Grid>

        <Grid item>
          <PageNav />
        </Grid>
      </Grid>
    </header>
  );
}
