// Modules
import cn from 'classnames';
// Types
import type { TRadiobuttonProps } from './types';
// Styles
import styles from './Radiobutton.module.css';

export function Radiobutton({
  className,
  checked = false,
  disabled,
  ...props
}: TRadiobuttonProps) {
  const checkboxStyles = cn(styles.Radiobutton, {
    [styles.Checked]: checked,
    [styles.RadiobuttonDisabledAndChecked]: disabled && checked,
    [styles.RadiobuttonDisabled]: disabled && !checked,
  });

  const RadiobuttonContent = (
    <div className={checkboxStyles}>
      {checked && <span className={styles.CheckIcon} />}
    </div>
  );

  return (
    <label className={cn(styles.Container, className)}>
      {RadiobuttonContent}
      <input
        readOnly
        type="radio"
        className={styles.Hidden}
        checked={checked}
        disabled={disabled}
        onClick={(e) => e.stopPropagation()}
        {...props}
      />
    </label>
  );
}
