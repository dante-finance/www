import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('<App/>', () => {
  test('render Suspense during load', async () => {
    render(
      <React.Suspense fallback="test loading">
        <App />
      </React.Suspense>,
    );
    const loadingText = screen.getByText(/loading/i);
    expect(loadingText).toBeInTheDocument();

    await screen.findByText(/Dante finance/);
  });

  test('render app', async () => {
    render(
      <React.Suspense fallback="test loading">
        <App />
      </React.Suspense>,
    );

    const lazyElement = await screen.findByText(/Dante finance/);
    expect(lazyElement).toBeInTheDocument();
  });
});
