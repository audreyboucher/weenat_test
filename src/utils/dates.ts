import { Day, Weekday, MonthSelection } from '../types/dates';

export const weekdaysAmount = Object.keys(Weekday).filter((key) => Number.isNaN(+key));

export const isCurrentMonth = (toBeCompared?: MonthSelection): boolean => {
  if (!toBeCompared) return true;

  const currentDay = parseDate(new Date());
  return toBeCompared.year === currentDay.year && toBeCompared.month === currentDay.month;
};

export const getDaysPerMonth = ({ month, year }: MonthSelection): number => new Date(year, month + 1, 0).getDate();

export const getFirstDayOfMonth = ({ month, year }: MonthSelection): Day => parseDate(new Date(year, month, 1));

export const parseDate = (date: Date): Day => ({
  number: date.getDate(),
  weekday: date.getDay(),
  month: date.getMonth(),
  year: date.getFullYear(),
});

export const parseDays = ({ year, month }: MonthSelection, amount: number): number[][] =>
  new Array(amount)
    .fill(0)
    .map((_, index) => parseDate(new Date(year, month, index + 1)))
    .reduce((acc: number[][], cur) => {
      if (cur.weekday === 0) acc.push([cur.number]);
      else acc[acc.length - 1].push(cur.number);
      return acc;
    }, [[]]);
