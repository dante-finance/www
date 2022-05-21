import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { UISplash } from 'components/UI/UISplash/UISplash';

export function NotFound(): JSX.Element {
  const { t } = useTranslation(['generic']);

  return (
    <UISplash>
      <h1>{t('generic:not_found.title')}</h1>
      <Link to="/">{t('generic:not_found.back_action')}</Link>
    </UISplash>
  );
}
