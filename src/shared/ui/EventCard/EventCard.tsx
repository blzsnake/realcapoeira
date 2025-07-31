import { getDatesStringForEventCard } from '~shared/utils/getDatesStringForEventCard';
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
    <article className={styles.EventCard} onClick={onClick}>
      <Typography className={styles.Dates}>
        {getDatesStringForEventCard(dateFrom, dateTo)}
      </Typography>
      <Typography className={styles.Title} component="h3" weight="demiBold">
        {title}
      </Typography>
      <Typography className={styles.Description}>{description}</Typography>
    </article>
  );
}
