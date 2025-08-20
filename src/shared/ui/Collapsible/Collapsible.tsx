// Modules
import cn from 'classnames';
import { useEffect, useRef } from 'react';
// Types
import type { TCollapsibleProps } from './types';
// Styles
import styles from './Collapsible.module.css';

export function Collapsible({
  children,
  isCollapsible,
  duration,
  className,
  style,
}: TCollapsibleProps) {
  const collapsibleRef = useRef<HTMLDivElement>(null);
  const collapsibleStyles = cn(
    styles.Collapsible,
    {
      [styles.Open]: !isCollapsible,
      [styles.Close]: isCollapsible,
    },
    className
  );

  useEffect(() => {
    if (collapsibleRef.current) {
      const el = collapsibleRef.current;
      const height = el.scrollHeight;

      el.style.setProperty('--height', `${height}px`);
      el.style.setProperty('--duration', `${duration}ms`);
    }
  }, [isCollapsible, duration]);

  return (
    <div style={style} ref={collapsibleRef} className={collapsibleStyles}>
      {children}
    </div>
  );
}
