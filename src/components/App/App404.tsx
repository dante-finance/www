import React from 'react';

export function App404(): JSX.Element {
  return (
    <article
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}
    >
      <h1>URL Not Found.</h1>
      <a href="/">Go back home.</a>
    </article>
  );
}
