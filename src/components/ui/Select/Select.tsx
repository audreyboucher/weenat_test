import React, { FC, useState, useEffect } from 'react';

import { months } from '../../../utils/dates';
import { MonthUnionType, Year } from '../../../types/dates';

import styles from './Select.module.scss';

interface ISelectProps<T extends string | number> {
  name: string;
  options: T[];
  selected: T;
  onChange: (value: T) => void;
};

interface ISpecificSelectProps<T extends MonthUnionType | Year> {
  selected: T;
  onChange: (value: T) => void;
};

type Props = (
  ISelectProps<any> |
  ISpecificSelectProps<MonthUnionType> & { type: 'month' } |
  ISpecificSelectProps<Year> & { type: 'year' }
);

const SelectComponent: FC<ISelectProps<any>> = ({ name, options, selected, onChange }) => (
  <fieldset name={name} className={styles.dropdown}>
    <select name={name} onChange={(event) => onChange(event.target.value)} value={selected}>
      { options.map((option, index) => <option key={`opt-${ name }-${ index }`}>{ option }</option>) }
    </select>
  </fieldset>
);

const MonthSelect: FC<ISpecificSelectProps<MonthUnionType>> = (props) =>
  <SelectComponent name="month_selector" options={months} {...props} />;

const YearSelect: FC<ISpecificSelectProps<Year>> = ({ selected, ...props }) => {
  const [options, setOptions] = useState<Year[]>([]);

  useEffect(() => {
    setOptions([
      ...new Array(10).fill(0).map((_, index) => selected - (10 - index)),
      selected,
      ...new Array(10).fill(0).map((_, index) => selected + (10 - index)).reverse(),
    ]);
  }, [selected]);

  return <SelectComponent name="year_selector" options={options} selected={selected} {...props} />;
};

const Select: FC<Props> = (props) =>
  !('type' in props)
    ? <SelectComponent {...(props as ISelectProps<any>)} />
    : props.type === 'month'
      ? <MonthSelect {...(props as ISpecificSelectProps<MonthUnionType>)} />
      : props.type === 'year'
        ? <YearSelect {...(props as ISpecificSelectProps<Year>)} />
        : null;

export default Select;
