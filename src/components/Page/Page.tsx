import React from 'react';

import { PageNav } from './Nav/PageNav';

interface PageProps {
  children: React.ReactNode;
}

export function Page(props: PageProps): JSX.Element {
  const { children } = props;

  return (
    <>
      <header className="app-header">
        <PageNav />
      </header>
      <main>{children}</main>
    </>
  );
}
