import cn from 'classnames';
import { Typography } from '../typography';

import styles from './Checkbox.module.css';
import type { TCheckboxProps } from './types';

export function Checkbox({
  name,
  onChange,
  text,
  className,
  classNameWrap,
  checked,
  disabled,
  error,
  value,
  groupValues = [],
  children,
}: TCheckboxProps) {
  const isValueExist = groupValues?.find((group) => group.value === value);
  const filteredGroupsVals = groupValues?.filter(
    (group) => group.value !== value
  );

  return (
    <div className={cn(styles.Checkbox, classNameWrap)}>
      <input
        id={value}
        name={name}
        type="checkbox"
        className={cn(className, styles.Input, { [styles.InputError]: error })}
        onChange={(e) => {
          onChange(e);
          if (isValueExist && filteredGroupsVals) {
            onChange(
              isValueExist
                ? filteredGroupsVals
                : groupValues?.concat([
                    { label: text || '', value: value || '' },
                  ])
            );
          }
        }}
        checked={checked}
        disabled={disabled}
      />
      <label htmlFor={value} className={cn(styles.Label)}>
        <Typography component="span">{children || text}</Typography>
      </label>
    </div>
  );
}
