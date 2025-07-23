import { getDatesString } from '~shared/utils/getDatesString';
import { Typography } from '../typography';
import styles from './EventCard.module.css';
import type { TEventCardProps } from './types';

export function EventCard({
  dateFrom,
  dateTo,
  onClick,
  title,
  description,
}: TEventCardProps) {
  return (
    <div className={styles.EventCard} onClick={onClick}>
      <Typography className={styles.Dates}>
        {getDatesString(dateFrom, dateTo)}
      </Typography>
      <Typography className={styles.Title} component="h3" weight="demiBold">
        {title}
      </Typography>
      <Typography className={styles.Description}>{description}</Typography>
    </div>
  );
}
