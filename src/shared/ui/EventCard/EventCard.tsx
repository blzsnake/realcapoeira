import { Typography } from '../typography';
import styles from './EventCard.module.css';
import type { TEventCardProps } from './types';

export function EventCard({ onClick, title, description }: TEventCardProps) {
  return (
    <article className={styles.EventCard} onClick={onClick}>
      <Typography className={styles.Title} component="h3" weight="demiBold">
        {title}
      </Typography>
      <Typography className={styles.Description}>{description}</Typography>
    </article>
  );
}
