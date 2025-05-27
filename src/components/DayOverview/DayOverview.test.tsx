import React from 'react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../utils/tests';

import DayOverview from './DayOverview';
import { parseDate, toDateFormat } from '../../utils/dates';
import { Event } from '../../store/types';

describe('DayOverview', () => {
  test('renders component', () => {
    const { getByRole } = renderWithProviders(<DayOverview />);

    expect(getByRole('complementary')).toBeInTheDocument();
    expect(getByRole('complementary')).not.toHaveClass('opened');
  });

  test('opens when a day is selected', () => {
    const today = parseDate(new Date());
    const { getByRole } = renderWithProviders(<DayOverview />,
      { preloadedState: { selected: today } },
    );

    expect(getByRole('complementary')).toHaveClass('opened');
    expect(getByRole('complementary').getElementsByTagName('h2')[0]).toHaveTextContent(toDateFormat(today));
  });

  test('closes on click on the cross', () => {
    const { getByRole } = renderWithProviders(<DayOverview />,
      { preloadedState: { selected: parseDate(new Date()) } },
    );

    expect(getByRole('complementary')).toHaveClass('opened');

    userEvent.click(getByRole('complementary').getElementsByClassName('close')[0]);

    expect(getByRole('complementary')).not.toHaveClass('opened');
  });

  test('closes on click on the overlay', () => {
    const { getByRole } = renderWithProviders(<DayOverview />,
      { preloadedState: { selected: parseDate(new Date()) } },
    );

    expect(getByRole('complementary')).toHaveClass('opened');

    userEvent.click(getByRole('complementary').getElementsByClassName('overlay')[0]);

    expect(getByRole('complementary')).not.toHaveClass('opened');
  });

  test('prints the day-related events', () => {
    const now = new Date();
    const today = parseDate(now);
    const another_day = parseDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() === 1 ? 2 : 1));

    const events: Event[] = [
      { id: '1', name: 'First event', day: today },
      { id: '2', name: 'Second event', day: today },
      { id: '3', name: 'Third event', day: another_day },
      { id: '4', name: 'Fourth event', day: today },
      { id: '5', name: 'Fifth event', day: another_day },
      { id: '6', name: 'Sixth event', day: another_day },
    ];
  
    const { getAllByRole, getByText } = renderWithProviders(<DayOverview />,
      { preloadedState: { selected: parseDate(new Date()), events } },
    );

    expect(getAllByRole('listitem')).toHaveLength(3);

    expect(getByText('First event')).toBeInTheDocument();
    expect(getByText('Second event')).toBeInTheDocument();
    expect(getByText('Fourth event')).toBeInTheDocument();

    expect(() => getByText('Third event')).toThrow('Unable to find an element');
    expect(() => getByText('Fifth event')).toThrow('Unable to find an element');
    expect(() => getByText('Sixth event')).toThrow('Unable to find an element');
  });

  test('prints error message if no name is specified on submitting form', () => {
    const { getByRole, getByLabelText } = renderWithProviders(<DayOverview />,
      { preloadedState: { selected: parseDate(new Date()) } },
    );

    userEvent.click(getByLabelText('create an event'));

    expect(getByRole('group')).toHaveTextContent('A name is required');
  });

  test('prints error message if no day is selected on submitting form', () => {
    const { getByRole, getByLabelText } = renderWithProviders(<DayOverview />);

    userEvent.click(getByLabelText('create an event'));

    expect(getByRole('group')).toHaveTextContent('No day is selected');
  });

  test('creates an event on submitting the form', () => {
    const { getByRole, getByLabelText, getAllByRole, getByText } = renderWithProviders(<DayOverview />,
      { preloadedState: { selected: parseDate(new Date()) } },
    );

    userEvent.type(getByRole('group').getElementsByTagName('input')[0], 'event name');
    userEvent.click(getByLabelText('create an event'));

    expect(getAllByRole('listitem')).toHaveLength(1);
    expect(getByText('event name')).toBeInTheDocument();
  });

  test('prints a success message on creating a new event', () => {
    const { getByRole, getByLabelText } = renderWithProviders(<DayOverview />,
      { preloadedState: { selected: parseDate(new Date()) } },
    );

    expect(getByRole('complementary').getElementsByClassName('success')[0]).not.toHaveClass('displayed');

    userEvent.type(getByRole('group').getElementsByTagName('input')[0], 'event name');
    userEvent.click(getByLabelText('create an event'));

    expect(getByRole('complementary').getElementsByClassName('success')[0]).toHaveClass('displayed');
  });

  test('removes the event on click on the delete icon', () => {
    const day = parseDate(new Date());

    const events: Event[] = [
      { id: '1', name: 'First event', day },
      { id: '2', name: 'Second event', day },
      { id: '3', name: 'Third event', day },
      { id: '4', name: 'Fourth event', day },
      { id: '5', name: 'Fifth event', day },
      { id: '6', name: 'Sixth event', day },
    ];

    const { getAllByRole, getAllByLabelText, getByText } = renderWithProviders(<DayOverview />,
      { preloadedState: { selected: parseDate(new Date()), events } },
    );

    expect(getAllByRole('listitem')).toHaveLength(6);

    expect(getByText('First event')).toBeInTheDocument();
    expect(getByText('Second event')).toBeInTheDocument();
    expect(getByText('Third event')).toBeInTheDocument();
    expect(getByText('Fourth event')).toBeInTheDocument();
    expect(getByText('Fifth event')).toBeInTheDocument();
    expect(getByText('Sixth event')).toBeInTheDocument();

    userEvent.click(getAllByLabelText('delete the event')[1]);

    expect(getAllByRole('listitem')).toHaveLength(5);
    expect(() => getByText('Second event')).toThrow('Unable to find an element');

    userEvent.click(getAllByLabelText('delete the event')[4]);

    expect(getAllByRole('listitem')).toHaveLength(4);
    expect(() => getByText('Sixth event')).toThrow('Unable to find an element');
  });
});
