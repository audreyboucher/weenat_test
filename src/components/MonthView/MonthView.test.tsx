import React from 'react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../utils/tests';

import MonthView from './MonthView';

describe('MonthView', () => {
  test('renders component', () => {
    const { getByLabelText } = renderWithProviders(<MonthView />);
    expect(getByLabelText('calendar')).toBeInTheDocument();
  });

  test('prints current month', () => {
    const { getAllByLabelText, getByLabelText } = renderWithProviders(<MonthView />);
    const now = new Date();

    expect(getAllByLabelText('day').length).toBe(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
    expect(getByLabelText('calendar').querySelectorAll('.empty').length).toBe(new Date(now.getFullYear(), now.getMonth(), 1).getDay());
  });

  test('prints the chosen month', () => {
    const { getAllByLabelText, getByLabelText } = renderWithProviders(<MonthView />, {
      preloadedState: { view: { month: 0, year: 2025 } }
    });
  
    expect(getAllByLabelText('day').length).toBe(new Date(2025, 1, 0).getDate());
    expect(getByLabelText('calendar').querySelectorAll('.empty').length).toBe(new Date(2025, 0, 1).getDay());
  });

  test('highlights current day', () => {
    const { getByLabelText } = renderWithProviders(<MonthView />);
    expect(getByLabelText('calendar').querySelector('.current')).toHaveTextContent(new Date().getDate().toString());
  });

  test('selects a day on click on it', () => {
    const { getByText } = renderWithProviders(<MonthView />);

    userEvent.click(getByText('1').parentElement!.parentElement!);

    expect(getByText('1').parentElement!.parentElement).toHaveClass('selected');
  });

  test('does not select an empty day on click on it', () => {
    const { getByLabelText } = renderWithProviders(<MonthView  />, {
      preloadedState: { view: { month: 0, year: 2025 } }
    });

    userEvent.click(getByLabelText('calendar').querySelectorAll('.empty')[0]);

    expect(getByLabelText('calendar').querySelectorAll('.empty')[0]).not.toHaveClass('selected');
  });
});