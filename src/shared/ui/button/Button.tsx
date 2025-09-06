import cn from 'classnames';
import { Link } from '@tramvai/module-router';

import styles from './Button.module.css';
import type { TButtonProps } from './types';

export function Button({
  color = 'black',
  size = 'medium',
  onClick,
  children,
  disabled,
  className,
  url,
}: TButtonProps) {
  return !url ? (
    <button
      type="button"
      disabled={disabled}
      className={cn(className, styles.Button, styles[color], styles[size])}
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <Link
      className={cn(className, styles.Button, styles[color], styles[size])}
      url={url}
      target="_blank"
      viewTransition
    >
      {children}
    </Link>
  );
}
