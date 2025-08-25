import cn from 'classnames';
import { Typography } from '../typography';

import styles from './Radio.module.css';
import type { TRadioProps } from './types';

export function Radio({
  name,
  onChange,
  text,
  className,
  checked,
}: TRadioProps) {
  return (
    <div className={styles.Radio}>
      <input
        name={name}
        type="radio"
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
