import React from 'react';
import { MdClose } from 'react-icons/md';

import { renderWithProviders } from '../../../utils/tests';

import Icon from './Icon';

describe('Icon', () => {
  test('renders component', () => {
    const { getByRole } = renderWithProviders(<Icon icon={MdClose} />);
    expect(getByRole('icon')).toBeInTheDocument();
  });

  test('applies custom props', () => {
    const { getByRole } = renderWithProviders(<Icon icon={MdClose} size={32} />);

    expect(getByRole('icon')).toHaveAttribute('width', "32");
    expect(getByRole('icon')).toHaveAttribute('height', "32");
  });
});
