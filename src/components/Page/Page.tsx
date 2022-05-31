import React from 'react';

import { PageHeader } from './PageHeader';

interface PageProps {
  children: React.ReactNode;
}

export function Page(props: PageProps): JSX.Element {
  const { children } = props;

  return (
    <>
      <PageHeader />
      <main>{children}</main>
    </>
  );
}
