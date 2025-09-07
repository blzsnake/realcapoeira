import { Typography } from '~shared/ui/typography';
import type { FilterTabsToggleProps } from './types';
import styles from './FilterTabsToggle.module.css';

export function FilterTabsToggle({
  setActiveTab,
  city,
  age,
  coach,
}: FilterTabsToggleProps) {
  const onTabClickHandler = (tab: string) => () => setActiveTab(tab);

  return (
    <div className={styles.Tabs}>
      <div onClick={onTabClickHandler('Город')} className={styles.TabItem}>
        <Typography className={styles.TabText}>{city || 'Город'}</Typography>
      </div>
      <div
        onClick={onTabClickHandler('Возраст ученика')}
        className={styles.TabItem}
      >
        <Typography className={styles.TabText}>
          {age || 'Возраст ученика'}
        </Typography>
      </div>
      <div onClick={onTabClickHandler('Тренер')} className={styles.TabItem}>
        <Typography className={styles.TabText}>{coach || 'Тренер'}</Typography>
      </div>
    </div>
  );
}
