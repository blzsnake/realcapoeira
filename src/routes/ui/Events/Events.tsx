import { Typography } from '~shared/typography';
import styles from './Events.module.css';

export function Events() {
  return (
    <div className={styles.Events}>
      <Typography component="h2" size={28} weight="demiBold">
        События
      </Typography>
    </div>
  );
}
