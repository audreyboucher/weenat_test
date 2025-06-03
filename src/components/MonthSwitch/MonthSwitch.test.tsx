import React from 'react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../utils/tests';
import { getMonthName, parseDate } from '../../utils/dates';

import MonthSwitch from './MonthSwitch';

describe('MonthSwitch', () => {
  test('renders component', () => {
    const { getByRole } = renderWithProviders(<MonthSwitch />);

    expect(getByRole('navigation')).toBeInTheDocument();
  });

  test('prints the selected month/year', () => {
    const { getByRole } = renderWithProviders(<MonthSwitch />, {
      preloadedState: { view: parseDate(new Date(2025, 5, 1)) }
    });

    expect(getByRole('heading')).toHaveTextContent("June 2025");
  });

  test('navigates to the previous month on click on the prev arrow', () => {
    const { getByRole, getByLabelText } = renderWithProviders(<MonthSwitch />, {
      preloadedState: { view: parseDate(new Date(2025, 5, 1)) }
    });

    expect(getByRole('heading')).toHaveTextContent("June 2025");

    userEvent.click(getByLabelText("Previous month"));

    expect(getByRole('heading')).toHaveTextContent("May 2025");
  });

  test('navigates to the next month on click on the next arrow', () => {
    const { getByRole, getByLabelText } = renderWithProviders(<MonthSwitch />, {
      preloadedState: { view: parseDate(new Date(2025, 5, 1)) }
    });

    expect(getByRole('heading')).toHaveTextContent("June 2025");

    userEvent.click(getByLabelText("Next month"));

    expect(getByRole('heading')).toHaveTextContent("July 2025");
  });

  test('goes back to the current month/year on click on the Today button', () => {
    const { getByRole, getByLabelText } = renderWithProviders(<MonthSwitch />, {
      preloadedState: { view: parseDate(new Date(2025, 0, 1)) }
    });

    expect(getByRole('heading')).toHaveTextContent("January 2025");

    userEvent.click(getByLabelText("Current month"));

    expect(getByRole('heading')).toHaveTextContent(`${ getMonthName(new Date().getMonth()) } ${ new Date().getFullYear() }`);
  });

  test('goes to the wanted month/year on using the datepicker', () => {
    const { getByRole, getAllByRole } = renderWithProviders(<MonthSwitch />, {
      preloadedState: { view: parseDate(new Date(2025, 5, 1)) }
    });

    expect(getByRole('heading')).toHaveTextContent("June 2025");

    userEvent.selectOptions(getAllByRole('combobox')[0], ["November"]);
    userEvent.selectOptions(getAllByRole('combobox')[1], ["2027"]);
    userEvent.click(getAllByRole('button')[1]);

    expect(getByRole('heading')).toHaveTextContent("November 2027");
  });
});
