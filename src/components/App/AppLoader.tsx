import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';

import { UISplash } from 'components/UI/UISplash/UISplash';

export function AppLoader(): JSX.Element {
  const { t, ready } = useTranslation('generic', {
    /** This component is used as a {@link React.SuspenseProps.fallback} */
    useSuspense: false,
  });

  /**
   * i18n might be not ready when rendering this component on page load
   * so we need a fallback title
   */
  const title = useMemo(() => {
    return ready ? t('generic:app_loader.title') : 'Loading';
  }, [ready, t]);

  return (
    <UISplash>
      <h1>{title}</h1>
      <CircularProgress size="100" color="info" />
    </UISplash>
  );
}
