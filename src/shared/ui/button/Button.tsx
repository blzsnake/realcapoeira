import cn from 'classnames';

import styles from './Button.module.css';
import type { TButtonProps } from './types';

export function Button({
  color = 'black',
  size = 'medium',
  onClick,
  children,
  className,
}: TButtonProps) {
  return (
    <button
      type="button"
      className={cn(className, styles.Button, styles[color], styles[size])}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
