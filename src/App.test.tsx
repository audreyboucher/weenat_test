import React from 'react';

import { renderWithProviders } from './utils/tests';

import App from './App';

describe('App', () => {
  test('renders component', () => {
    const { getByRole } = renderWithProviders(<App />);
    expect(getByRole('main')).toBeInTheDocument();
  });
});
