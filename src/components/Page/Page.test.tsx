import { Suspense } from 'react';
import { render, screen } from '@testing-library/react';

import { setupI18nTest } from 'utils-test/setupI18nTest';

import { Page } from './Page';
import * as PageHeaderModule from './PageHeader';

describe('<Page />', () => {
  beforeAll(setupI18nTest());

  beforeEach(() => {
    jest
      .spyOn(PageHeaderModule, 'PageHeader')
      .mockImplementation(() => <>PageNav</>);
  });

  it('should render content', () => {
    render(
      <Suspense fallback="test loading">
        <Page>Test</Page>
      </Suspense>,
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
