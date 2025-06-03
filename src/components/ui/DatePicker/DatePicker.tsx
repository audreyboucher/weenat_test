import React, { FC, useState, useEffect, FormEventHandler } from 'react';
import classNames from 'classnames';

import { Button, ButtonType, Select } from '..';

import { Month, MonthSelection, MonthUnionType, Year } from '../../../types/dates';

import styles from './DatePicker.module.scss';

type DatePickerProps = {
  value: MonthSelection;
  onChange: (value: MonthSelection) => void;
  containerClassName?: string;
};

const DatePicker: FC<DatePickerProps> = ({ value, onChange, containerClassName }) => {
  const [selected, setSelected] = useState<MonthSelection>(value);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onChange(selected);
  };

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <form
      className={classNames(styles.container, containerClassName)}
      onSubmit={onSubmit}
      role="presentation"
    >
      <Select
        type="month"
        selected={Object.entries(Month).find(([_, value]) => value === selected.month)![0] as MonthUnionType}
        onChange={(month: MonthUnionType) => setSelected((tmp) => ({ ...tmp, month: Month[month] }))}
      />

      <Select
        type="year"
        selected={selected.year as Year}
        onChange={(year: Year) => setSelected((tmp) => ({ ...tmp, year: Number(year) }))}
      />

      <Button theme={ButtonType.Secondary} text="Confirm" type="submit" className={styles.button} />
    </form>
  );
};

export default DatePicker;
