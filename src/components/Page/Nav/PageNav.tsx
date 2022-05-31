import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PageNavConnect } from './PageNavConnect';

export function PageNav(): JSX.Element {
  const { t } = useTranslation(['generic']);

  return (
    <>
      <Link to="/vaults">{t('generic:page_header.navigation.vaults')}</Link>
      <PageNavConnect />
    </>
  );
}
