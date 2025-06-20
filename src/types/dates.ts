export enum Weekday {
  'Sunday' = 0,
  'Monday' = 1,
  'Tuesday' = 2,
  'Wednesday' = 3,
  'Thursday' = 4,
  'Friday' = 5,
  'Saturday' = 6,
};

export type WeekdayUnionType = `${ keyof typeof Weekday }`;

export enum Month {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11,
};

export type MonthUnionType = `${ keyof typeof Month }`;

export type Year = number;

export type Day = {
  number: number;
  weekday: Weekday;
  month: Month;
  year: Year;
};

export type MonthSelectionKeys = 'month' | 'year';
export type MonthSelection = Pick<Day, MonthSelectionKeys>;
