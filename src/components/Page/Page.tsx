import React from 'react';

interface PageProps {
  children: React.ReactNode;
}

export function Page(props: PageProps): JSX.Element {
  const { children } = props;

  return (
    <>
      <header className="App-header">
        <nav>
          <a href="/vaults">Vaults</a>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
