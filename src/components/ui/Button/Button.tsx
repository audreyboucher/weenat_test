import React, { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

export enum Theme {
  Primary = 'primary',
  Secondary = 'secondary',
  Reverse = 'reverse',
};

export enum Variant {
  Regular = 'regular',
  Light = 'light',
  Outlined = 'outlined',
}

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  text?: string;
  theme?: Theme;
  variant?: Variant;
};

const Button: FC<Props> = ({ text, theme = Theme.Primary, variant = Variant.Regular, className, children, ...props }) => (
  <button className={classNames(styles.button, className, styles[theme as string], styles[variant as string])} {...props}>
    <span>{ text || children }</span>
  </button>
);

export default Button;
