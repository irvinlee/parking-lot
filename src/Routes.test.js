import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Routes from './Routes';

test('load homepage for route: "/"', () => {
  const history = createMemoryHistory();
  history.push('/');
  render(<Routes history={history} />);
  expect(screen.getByText(/Homepage/i)).toBeInTheDocument();
});

test('load Dashboard for route: "/dashboard/:id"', () => {
  const history = createMemoryHistory();
  history.push('/dashboard/:id');
  render(<Routes history={history} />);
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});
