import cn from 'classnames';
import { Typography } from '../typography';

import styles from './Checkbox.module.css';
import type { TCheckboxProps } from './types';

export function Checkbox({
  name,
  onChange,
  text,
  className,
  checked,
  disabled,
  error,
}: TCheckboxProps) {
  return (
    <div className={styles.Checkbox}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className={cn(className, styles.Input, { [styles.InputError]: error })}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <label htmlFor={name} className={cn(styles.Label)}>
        <Typography component="span">{text}</Typography>
      </label>
    </div>
  );
}
