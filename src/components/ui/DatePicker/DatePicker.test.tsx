import React from 'react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../utils/tests';

import { parseDate } from '../../../utils/dates';

import DatePicker from './DatePicker';

describe('DatePicker', () => {
  test('renders component', () => {
    const { getByRole } = renderWithProviders(<DatePicker value={parseDate(new Date(2025, 5, 1))} onChange={() => {}} />);

    expect(getByRole('presentation')).toBeInTheDocument();
  });

  test('selects the right month/year', () => {
    const { getAllByRole } = renderWithProviders(<DatePicker value={parseDate(new Date(2025, 5, 1))} onChange={() => {}} />);

    expect(getAllByRole('combobox')[0]).toHaveAttribute('name', 'month_selector');
    expect(getAllByRole('combobox')[0]).toHaveValue("June");

    expect(getAllByRole('combobox')[1]).toHaveAttribute('name', 'year_selector');
    expect(getAllByRole('combobox')[1]).toHaveValue("2025");
  });

  test('updates month/year on click on confirm button', () => {
    const mockOnChange = jest.fn();
    const { getByRole, getAllByRole } = renderWithProviders(
      <DatePicker value={parseDate(new Date(2025, 5, 1))} onChange={mockOnChange} />
    );

    expect(getAllByRole('combobox')[0]).toHaveValue("June");
    expect(getAllByRole('combobox')[1]).toHaveValue("2025");

    userEvent.selectOptions(getAllByRole('combobox')[0], ["November"]);
    userEvent.selectOptions(getAllByRole('combobox')[1], ["2027"]);
    userEvent.click(getByRole('button'));

    expect(mockOnChange).toHaveBeenCalledWith({ number: 1, weekday: 0, month: 10, year: 2027 });
  });
});
