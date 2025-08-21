import { useState } from 'react';
// Components
import { Typography } from '~shared/ui/typography';
import { Collapsible } from '~shared/ui/Collapsible';
// Assets
import Plus from '~app/assets/Plus.svg?react';
import Close from '~app/assets/Close.svg?react';
// Utils
import cn from 'classnames';
// Types
import type { TCollapsibleRow } from './types';
// Styles
import styles from './CollapsibleRow.module.css';

export function CollapsibleRow({ title, children }: TCollapsibleRow) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(true);
  const duration = 700;

  const handleClick = () => {
    if (isOpen) {
      setIsCollapsible(true);
      setTimeout(() => {
        setIsOpen(false);
      }, duration);
    } else {
      setIsOpen(true);
      setIsCollapsible(false);
    }
  };

  return (
    <div className={styles.Content}>
      <div
        className={cn(styles.CollapsibleRow, {
          [styles.BorderBottom]: !isOpen,
        })}
        onClick={handleClick}
      >
        <Typography weight="demiBold" className={styles.Title}>
          {title}
        </Typography>
        {isOpen ? (
          <Close className={styles.Icon} onClick={handleClick} />
        ) : (
          <Plus className={styles.Icon} onClick={handleClick} />
        )}
      </div>
      {isOpen && (
        <Collapsible
          isCollapsible={isCollapsible}
          duration={duration}
          className={cn(styles.CollapsibleChildren, {
            [styles.BorderBottom]: isOpen,
          })}
        >
          {children}
        </Collapsible>
      )}
    </div>
  );
}
