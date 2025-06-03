import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { useAppDispatch } from '../../store';
import { selectDisplayedMonth, selectOpenedDay, selectDay } from '../../store/slice';

import { weekdays, isCurrentMonth, getDaysPerMonth, getFirstDayOfMonth, parseDate, parseDays } from '../../utils/dates';

import type { Day } from '../../types/dates';

import styles from './MonthView.module.scss';

type WeekRowProps = {
  week: number[];
  firstLine: boolean;
  currentMonth: boolean;
};

const WeekRow: FC<WeekRowProps> = ({ week, firstLine, currentMonth }) => {
  const dispatch = useAppDispatch();

  const view = useSelector(selectDisplayedMonth);
  const selected = useSelector(selectOpenedDay);

  const filledWeek = firstLine
    ? [ ...(new Array(weekdays.length - week.length).fill(0)), ...week ]
    : week;

  return (
    <tr className={styles.row} aria-label="week">
      {
        filledWeek
          .map((n, i) => (
            <td
              className={classNames(styles.column, {
                [styles.empty]: n === 0,
                [styles.current]: !!currentMonth && n === parseDate(new Date()).number,
                [styles.selected]: !!selected && n === selected.number,
              })}
              key={`day-${ n }-${ i }`}
              { ...(n > 0 ? { 
                'aria-label': "day",
                onClick: () => dispatch(selectDay({ ...view, number: n } as Day)),
              } : {}) }
            >
              { n > 0 ? <span><span>{ n }</span></span> : null }
            </td>
          ))
      }
    </tr>
  );
};

const MonthView: FC = () => {
  const view = useSelector(selectDisplayedMonth);

  const [daysAmount, setDaysAmount] = useState<number>();
  const [firstDay, setFirstDay] = useState<Day>();

  useEffect(() => {
    const currentDay = parseDate(new Date());

    setDaysAmount(getDaysPerMonth(view || currentDay));
    setFirstDay(getFirstDayOfMonth(view || currentDay));
  }, [view]);

  return (
    <table className={styles.mainContainer} role="grid" aria-label="calendar">
      <thead className={styles.container}>
        <tr className={classNames(styles.row, styles.head)} role="presentation">
          {
            weekdays.map((key, index) =>
              <th className={classNames(styles.column, styles.head)} key={index}>{ key.slice(0, 3) }</th>
            )
          }
        </tr>
      </thead>
      { daysAmount && firstDay && (
        <tbody className={styles.container} data-rows={parseDays(firstDay, daysAmount).length}>
          {
            parseDays(firstDay, daysAmount).map((week, index) =>
              <WeekRow {...{ week, firstLine: index === 0, currentMonth: isCurrentMonth(view) }} key={`week-${ index }`} />
            )
          }
        </tbody>
      ) }
    </table>
  );
};

export default MonthView;
