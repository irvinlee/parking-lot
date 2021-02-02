import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Routes from './Routes';

test('Routes: load homepage for route: "/"', () => {
  const history = createMemoryHistory();
  history.push('/');
  render(<Routes history={history} />);
  expect(screen.getByText(/Homepage/i)).toBeInTheDocument();
});

test('Routes: load Dashboard for route: "/dashboard/:id"', () => {
  const history = createMemoryHistory();
  history.push('/dashboard/4');
  render(<Routes history={history} />);
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});

test('Routes: redirects to 404 page when the slot count is invalid"', () => {
  const history = createMemoryHistory();
  history.push('/dashboard/123asdas');
  render(<Routes history={history} />);
  expect(
    screen.getByText(/The requested resource cannot be found/i)
  ).toBeInTheDocument();
});

test('Routes: invalid URL should redirect to 404 page', () => {
  const history = createMemoryHistory();
  history.push('/some-invalid-url');
  render(<Routes history={history} />);
  expect(
    screen.getByText(/The requested resource cannot be found/i)
  ).toBeInTheDocument();
});
