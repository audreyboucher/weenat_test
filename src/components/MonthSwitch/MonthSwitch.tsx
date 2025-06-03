import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import { useAppDispatch } from '../../store';
import { selectDisplayedMonth, updateDisplayedMonth, displayCurrentMonth, displayPreviousMonth, displayNextMonth } from '../../store/slice';

import { Icon, DatePicker, Button, ButtonType, ButtonVariant } from '../ui';
import { getMonthName } from '../../utils/dates';

import styles from './MonthSwitch.module.scss';

const DateSwitch: FC = () => {
  const dispatch = useAppDispatch();

  const view = useSelector(selectDisplayedMonth);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav>
          <Button
            theme={ButtonType.Reverse}
            variant={ButtonVariant.Outlined}
            text="Today"
            aria-label="Current month"
            onClick={() => dispatch(displayCurrentMonth())}
          />

          <div className={styles.navIconsContainer}>
            <Icon aria-label="Previous month" icon={MdNavigateBefore} size={24} onClick={() => dispatch(displayPreviousMonth())} />
            <Icon aria-label="Next month" icon={MdNavigateNext} size={24} onClick={() => dispatch(displayNextMonth())} />
          </div>

          <h1>{ getMonthName(view.month) } { view.year }</h1>
        </nav>

        <DatePicker value={view} onChange={(month) => dispatch(updateDisplayedMonth(month)) } />
      </div>
    </header>
  );
};

export default DateSwitch;
