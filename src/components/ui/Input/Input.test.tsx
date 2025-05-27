import React from 'react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../utils/tests';

import Input from './Input';

describe('Input', () => {
  test('renders component', () => {
    const { getByRole } = renderWithProviders(<Input htmlFor="name" label="Enter a name" />);

    expect(getByRole('group')).toBeInTheDocument();

    expect(getByRole('group').getElementsByTagName('label')[0]).toHaveAttribute('for', "name");
    expect(getByRole('group').getElementsByTagName('label')[0]).toHaveTextContent("Enter a name");

    expect(getByRole('group').getElementsByTagName('input')[0]).toHaveAttribute('id', "name");
    expect(getByRole('group').getElementsByTagName('input')[0]).toHaveAttribute('name', "name");
  });

  test('prints error messages', () => {
    const { getByRole } = renderWithProviders(
      <Input
        htmlFor="name"
        label="Enter a name"
        error="Something went wrong"
      />
    );

    expect(getByRole('group')).toHaveClass('error');
    expect(getByRole('group').getElementsByClassName('errorMessage')[0]).toBeInTheDocument();
    expect(getByRole('group').getElementsByClassName('errorMessage')[0]).toHaveTextContent("Something went wrong");
  });

  test('handles disabled state', () => {
    const { getByRole } = renderWithProviders(<Input htmlFor="name" label="Enter a name" disabled />);

    expect(getByRole('group')).toHaveClass('disabled');
  });

  test('focuses on user action', () => {
    const { getByRole } = renderWithProviders(<Input htmlFor="name" label="Enter a name" />);

    expect(getByRole('group')).not.toHaveClass('focus');

    userEvent.type(getByRole('group').getElementsByTagName('input')[0], 'value');

    expect(getByRole('group')).toHaveClass('focus');
  });
});
