import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { NotFound } from 'views/NotFound/NotFound';

const Home = lazy(async () => import('views/Home/Home'));
const Vaults = lazy(async () => import('views/Vaults/Vaults'));

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/vaults" element={<Vaults />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
