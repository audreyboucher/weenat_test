import React from 'react';

import { renderWithProviders } from '../../../utils/tests';

import Button, { Theme, Variant } from './Button';

describe('Button', () => {
  test('renders component', () => {
    const { getByRole } = renderWithProviders(<Button role="button" />);

    expect(getByRole('button')).toBeInTheDocument();
    expect(getByRole('button')).toHaveClass('primary');
    expect(getByRole('button')).toHaveClass('regular');
  });

  test('applies theme', () => {
    const { getByRole } = renderWithProviders(<Button role="button" theme={Theme.Secondary} />);
    expect(getByRole('button')).toHaveClass('secondary');
  });

  test('applies variant', () => {
    const { getByRole } = renderWithProviders(<Button role="button" variant={Variant.Outlined} />);
    expect(getByRole('button')).toHaveClass('outlined');
  });

  test('replaces children element with text when specified', () => {
    const { getByRole } = renderWithProviders(
      <Button role="button" text="Some text">
        Another text
      </Button>
    );

    expect(getByRole('button')).toHaveTextContent("Some text");
  });
});
