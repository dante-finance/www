import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page/Page';

export default function Home(): JSX.Element {
  const { t } = useTranslation(['generic'] as const);

  return (
    <Page>
      <h1>Home</h1>
      <p>{t('generic:hello')}</p>
    </Page>
  );
}
