import React, { Suspense } from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import * as HomeModule from 'views/Home/Home';
import * as VaultsModule from 'views/Vaults/Vaults';
import * as NotFoundModule from 'views/NotFound/NotFound';

import { AppRoutes } from './AppRoutes';

describe('<AppRouter />', () => {
  beforeEach(() => {
    jest.spyOn(HomeModule, 'default').mockImplementation(() => <>Home</>);
    jest.spyOn(VaultsModule, 'default').mockImplementation(() => <>Vaults</>);
    jest
      .spyOn(NotFoundModule, 'NotFound')
      .mockImplementation(() => <>App404</>);
  });

  function renderAppRouter(routerInitialEntries: string[]): RenderResult {
    return render(
      <Suspense fallback={<>Test</>}>
        <MemoryRouter initialEntries={routerInitialEntries}>
          <AppRoutes />
        </MemoryRouter>
      </Suspense>,
    );
  }

  it('should render Home', async () => {
    renderAppRouter(['/']);
    expect(await screen.findByText('Home')).toBeInTheDocument();
  });

  it('should render Vaults', async () => {
    renderAppRouter(['/vaults']);
    expect(await screen.findByText('Vaults')).toBeInTheDocument();
  });

  it('should render 404', async () => {
    renderAppRouter(['/not-found']);
    expect(await screen.findByText('App404')).toBeInTheDocument();
  });
});
