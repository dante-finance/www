import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page/Page';

export default function Home(): JSX.Element {
  const { t } = useTranslation(['generic']);

  return (
    <Page>
      <h1>{t('generic:home.title')}</h1>
    </Page>
  );
}
