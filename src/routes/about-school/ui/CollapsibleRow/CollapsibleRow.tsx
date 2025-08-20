// Components
import { Typography } from '~shared/ui/typography';
// Styles
// import { Button } from '~shared/ui/button/Button';
import { useState } from 'react';
import { Collapsible } from '~shared/ui/Collapsible';
import type { TCollapsibleRow } from './types';
import styles from './CollapsibleRow.module.css';

export function CollapsibleRow({ title, children }: TCollapsibleRow) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(true);
  const duration = 500;

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
    <div>
      <div className={styles.CollapsibleRow} onClick={handleClick}>
        <Typography weight="demiBold" className={styles.Title}>
          {title}
        </Typography>
        {/* <Button onClick={handleClick}>
          {isCollapsible ? 'Показать' : 'Скрыть'}
        </Button> */}
      </div>
      {isOpen && (
        <Collapsible isCollapsible={isCollapsible} duration={duration}>
          {children}
        </Collapsible>
      )}
    </div>
  );
}
