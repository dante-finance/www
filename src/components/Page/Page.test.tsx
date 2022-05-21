import { Suspense } from 'react';
import { render, screen } from '@testing-library/react';

import { setupI18nTest } from 'utils-test/setupI18nTest';

import { Page } from './Page';
import * as PageNavModule from './Nav/PageNav';

describe('<Page />', () => {
  beforeAll(setupI18nTest());

  beforeEach(() => {
    jest.spyOn(PageNavModule, 'PageNav').mockImplementation(() => <>PageNav</>);
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
