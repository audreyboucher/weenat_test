import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { parseDate } from '../utils/dates';

import type { Event, Error } from './types';
import { Day, MonthSelection, Month } from '../types/dates';

export type State = {
  view: MonthSelection;
  selected: Day | null;
  events: Event[];
  errors: Error[];
};

export const initialState: State = {
  view: parseDate(new Date()),
  selected: null,
  events: [],
  errors: [],
};

const createError = (errors: State['errors'], message: string): State['errors'] => ([
  ...errors,
  {
    message,
    timestamp: new Date().getTime(),
  }
]);

const calendarSlice = createSlice({
  name: 'Calendar',
  initialState,
  reducers: {
    updateDisplayedMonth: (state, action: PayloadAction<MonthSelection>) => {
      if (!('payload' in action) || !('month' in action.payload) || !('year' in action.payload)) {
        state.errors = createError(state.errors, "Information is missing from the new selected month to display");
        return;
      }

      state.view = parseDate(new Date(action.payload.year, action.payload.month, 1));
      state.selected = null;
    },
    displayPreviousMonth: (state) => {
      state.view = parseDate(new Date(
        state.view.month === Month.January ? state.view.year - 1 : state.view.year,
        state.view.month === Month.January ? Month.December : state.view.month - 1,
        1
      ));

      state.selected = null;
    },
    displayNextMonth: (state) => {
      state.view = parseDate(new Date(
        state.view.month === Month.December ? state.view.year + 1 : state.view.year,
        state.view.month === Month.December ? Month.January : state.view.month + 1,
        1
      ));

      state.selected = null;
    },
    selectDay: (state, action: PayloadAction<Day>) => {
      if (!('payload' in action) || !('number' in action.payload) || !('month' in action.payload) || !('year' in action.payload)) {
        state.errors = createError(state.errors, "Information is missing from the day to select");
        return;
      }

      state.selected = action.payload;
    },
    unselectDay: (state) => { state.selected = null; },
    createEvent: (state, action: PayloadAction<Omit<Event, 'id'>>) => {
      if (!('payload' in action) || !('name' in action.payload) || !('date' in action.payload)) {
        state.errors = createError(state.errors, "Information is missing from the new event");
        return;
      }

      state.events = [
        ...state.events,
        {
          id: uuidv4(),
          ...action.payload,
        }
      ];
    },
    removeEvent: (state, action: PayloadAction<Pick<Event, 'id'>>) => {
      if (!('payload' in action) || !('id' in action.payload)) {
        state.errors = createError(state.errors, "Information regarding the event that's about to be removed is missing");
        return;
      }

      if (!state.events.map(({ id }) => id).includes(action.payload.id)) {
        state.errors = createError(state.errors, "Cannot remove an event that doesn't exist");
        return;
      }

      state.events = state.events.filter(({ id }) => id !== action.payload.id);
    },
  },
  selectors: {
    selectDisplayedMonth: (state) => state.view,
    selectOpenedDay: (state) => state.selected,
    selectAllEvents: (state) => state.events,
    selectEventsByMonth: (state, { month, year }: Day) =>
      state.events.filter(({ day }) => day.month === month && day.year === year),
    selectEventsByDay: (state, { number, month, year }: Day) =>
      state.events.filter(({ day }) => day.number === number && day.month === month && day.year === year),
    selectAllErrors: (state) => state.errors,
  },
});

export const {
  updateDisplayedMonth,
  displayPreviousMonth,
  displayNextMonth,
  selectDay,
  unselectDay,
  createEvent,
  removeEvent,
} = calendarSlice.actions;

export const {
  selectDisplayedMonth,
  selectOpenedDay,
  selectAllEvents,
  selectEventsByMonth,
  selectEventsByDay,
  selectAllErrors,
} = calendarSlice.selectors;

export default calendarSlice.reducer;
