import React from 'react';
import { useTranslation } from 'react-i18next';

import { PageNav } from './Nav/PageNav';

interface PageProps {
  children: React.ReactNode;
}

export function Page(props: PageProps): JSX.Element {
  const { children } = props;

  useTranslation(['generic']);

  return (
    <>
      <header className="app-header">
        <PageNav />
      </header>
      <main>{children}</main>
    </>
  );
}
