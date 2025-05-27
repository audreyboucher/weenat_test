import React, { FC, DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  htmlFor: string;
  label: string;
  error?: string;
};

const Input: FC<Props> = ({ htmlFor, label, error, ...props }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <fieldset
      className={classNames(styles.input, {
        [styles.focus]: isFocused,
        [styles.error]: !!error?.length,
        [styles.disabled]: !!props.disabled,
      })}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      role="group"
    >
      { !!error?.length && <p className={styles.errorMessage}>{ error }</p> }
      <label htmlFor={htmlFor}>{ label }</label>
      <input id={htmlFor} name={htmlFor} {...props} />
    </fieldset>
  );
};

export default Input;
