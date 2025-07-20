import styles from './Button.module.css';
import type { TButtonProps } from './types';

export function Button({
  color = 'black',
  onClick,
  children,
  className,
}: TButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.Button} ${styles[color]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
