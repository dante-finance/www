import React from 'react';
import { render, screen } from '@testing-library/react';

import { Page } from './Page';

describe('<Page />', () => {
  it('should render content', () => {
    render(<Page>Test</Page>);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
