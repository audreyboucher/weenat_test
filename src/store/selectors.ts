import { createSelector } from '@reduxjs/toolkit';

import { selectAllEvents, selectOpenedDay } from './slice';

export const selectEventsBySelectedDay = createSelector(selectAllEvents, selectOpenedDay, (events, openedDay) => {
  if (!openedDay) return [];

  return events.filter(({ day }) => (
    day.number === openedDay.number &&
    day.month === openedDay.month &&
    day.year === openedDay.year
  ));
});
