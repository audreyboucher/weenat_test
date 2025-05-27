import React, { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

export enum Theme {
  Primary = 'primary',
  Secondary = 'secondary',
};

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  text?: string;
  theme?: Theme;
};

const Button: FC<Props> = ({ text, theme = Theme.Primary, className, children, ...props }) => (
  <button className={classNames(styles.button, className, styles[theme as string])} {...props}>
    <span>{ text || children }</span>
  </button>
);

export default Button;
