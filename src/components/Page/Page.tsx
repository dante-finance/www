import React from 'react';

interface PageProps {
  children: React.ReactNode;
}

export function Page(props: PageProps): JSX.Element {
  const { children } = props;
  return <main>{children}</main>;
}
