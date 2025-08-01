// Modules
import { forwardRef } from 'react';
import cn from 'classnames';
// Types
import type { TModalBodyProps } from './types';
// Styles
import styles from './ModalBody.module.css';

export const ModalBody = forwardRef<HTMLDivElement, TModalBodyProps>(
  ({ children, className, style, scroll = 'scroll' }, ref) => {
    const bodyStyles = cn(
      styles.Body,
      className,
      scroll === 'scroll' && styles.Scroll,
      scroll === 'inner' && styles.ScrollInner
    );

    return (
      <div ref={ref} className={bodyStyles} style={style}>
        {children}
      </div>
    );
  }
);

ModalBody.displayName = 'ModalBody';
