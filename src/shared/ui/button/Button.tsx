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
      className={`${className} ${styles.Button} ${styles[color]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
