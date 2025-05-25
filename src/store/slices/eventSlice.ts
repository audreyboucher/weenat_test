import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { Event, Error } from '../types';

type State = {
  events: Event[];
  errors: Error[];
};

const initialState: State = {
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

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
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
});

export const { actions } = eventSlice;
export default eventSlice.reducer;
