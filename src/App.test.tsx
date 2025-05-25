import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders component', () => {
  const { getByRole } = render(<App />);
  expect(getByRole('main')).toBeInTheDocument();
});
