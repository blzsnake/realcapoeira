// Modules
import cn from 'classnames';
import { memo } from 'react';
// Components
// Types
import type { TModalTitleProps } from './types';
// Styles
import styles from './ModalTitle.module.css';

export const ModalTitle = memo(function ModalTitle({
  children,
  className,
  style,
}: TModalTitleProps) {
  const modalTitleStyles = cn(styles.ModalTitle, className);
  return (
    <div className={modalTitleStyles} style={style}>
      {children}
    </div>
  );
});

ModalTitle.displayName = 'ModalTitle';
