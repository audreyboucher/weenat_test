import React from 'react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../utils/tests';

import Select from './Select';

describe('Select', () => {
  test('renders component', () => {
    const { getByRole } = renderWithProviders(<Select name="test" options={[1, 2, 3]} selected={1} onChange={() => {}} />);

    expect(getByRole('group')).toBeInTheDocument();
    expect(getByRole('group')).toHaveProperty('name', 'test');
  });

  test('selects the right option', () => {
    const { getByRole } = renderWithProviders(<Select name="test" options={[1, 2, 3]} selected={1} onChange={() => {}} />);

    expect(getByRole('combobox')).toBeInTheDocument();
    expect(getByRole('combobox')).toHaveValue("1");
  });

  test('contains all the options', () => {
    const { getAllByRole } = renderWithProviders(<Select name="test" options={[1, 2, 3]} selected={1} onChange={() => {}} />);

    expect(getAllByRole('option')).toHaveLength(3);
    expect(getAllByRole('option')[0]).toHaveValue("1");
    expect(getAllByRole('option')[1]).toHaveValue("2");
    expect(getAllByRole('option')[2]).toHaveValue("3");
  });

  test('updates the selected option on it', () => {
    const mockOnChange = jest.fn();
    const { getByRole } = renderWithProviders(<Select name="test" options={[1, 2, 3]} selected={1} onChange={mockOnChange} />);

    expect(getByRole('combobox')).toHaveValue("1");

    userEvent.selectOptions(getByRole('combobox'), ["3"]);

    expect(mockOnChange).toHaveBeenCalledWith("3");
  });

  describe('Select/Month', () => {
    test('renders component', () => {
      const { getByRole } = renderWithProviders(<Select type="month" selected={"March"} onChange={() => {}} />);

      expect(getByRole('group')).toBeInTheDocument();
      expect(getByRole('group')).toHaveProperty('name', 'month_selector');
    });

    test('selects the right option', () => {
      const { getByRole } = renderWithProviders(<Select type="month" selected={"March"} onChange={() => {}} />);

      expect(getByRole('combobox')).toBeInTheDocument();
      expect(getByRole('combobox')).toHaveValue("March");
    });

    test('contains all months as options', () => {
      const { getAllByRole } = renderWithProviders(<Select type="month" selected={"March"} onChange={() => {}} />);

      expect(getAllByRole('option')).toHaveLength(12);
      expect(getAllByRole('option')[0]).toHaveValue("January");
      expect(getAllByRole('option')[2]).toHaveValue("March");
      expect(getAllByRole('option')[11]).toHaveValue("December");
    });

    test('updates the selected option on it', () => {
      const mockOnChange = jest.fn();
      const { getByRole } = renderWithProviders(<Select type="month" selected={"March"} onChange={mockOnChange} />);

      expect(getByRole('combobox')).toHaveValue("March");

      userEvent.selectOptions(getByRole('combobox'), ["April"]);

      expect(mockOnChange).toHaveBeenCalledWith("April");
    });
  });

  describe('Select/Year', () => {
    test('renders component', () => {
      const { getByRole } = renderWithProviders(<Select type="year" selected={2025} onChange={() => {}} />);

      expect(getByRole('group')).toBeInTheDocument();
      expect(getByRole('group')).toHaveProperty('name', 'year_selector');
    });

    test('selects the right option', () => {
      const { getByRole } = renderWithProviders(<Select type="year" selected={2025} onChange={() => {}} />);

      expect(getByRole('combobox')).toBeInTheDocument();
      expect(getByRole('combobox')).toHaveValue("2025");
    });

    test('contains 10 years before/after the selected year as options', () => {
      const { getAllByRole } = renderWithProviders(<Select type="year" selected={2025} onChange={() => {}} />);

      expect(getAllByRole('option')).toHaveLength(21);
      expect(getAllByRole('option')[0]).toHaveValue("2015");
      expect(getAllByRole('option')[10]).toHaveValue("2025");
      expect(getAllByRole('option')[20]).toHaveValue("2035");
    });

    test('updates the selected option on it', () => {
      const mockOnChange = jest.fn();
      const { getByRole } = renderWithProviders(<Select type="year" selected={2025} onChange={mockOnChange} />);

      expect(getByRole('combobox')).toHaveValue("2025");

      userEvent.selectOptions(getByRole('combobox'), ["2027"]);

      expect(mockOnChange).toHaveBeenCalledWith("2027");
    });
  });
});
