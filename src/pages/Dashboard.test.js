import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import Dashboard from './Dashboard';

test('Dashboard: should show header', () => {
  render(
    <MemoryRouter initialEntries={['/dashboard/100']}>
      <Route path="/dashboard/:slotCount(\d+)">
        <Dashboard />
      </Route>
    </MemoryRouter>
  );

  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});
