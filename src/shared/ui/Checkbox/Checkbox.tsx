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
}: TCheckboxProps) {
  return (
    <div className={styles.Checkbox}>
      <input
        name={name}
        type="checkbox"
        className={cn(className, styles.Input)}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={name} className={cn(styles.Label)}>
        <Typography component="span">{text}</Typography>
      </label>
    </div>
  );
}
