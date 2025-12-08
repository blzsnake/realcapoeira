import { CoachAvatar } from 'src/routes/coaches/ui/CoachAvatar';
import { Typography } from '~shared/ui/typography';
import styles from './Quote.module.css';

export function Quote({
  quote,
  name,
  title,
  photo,
  level,
}: {
  quote: string;
  name: string;
  title: string;
  photo: string;
  level: string;
}) {
  return (
    <div className={styles.Wrap}>
      <div className={styles.Content}>
        <Typography className={styles.Quote} weight="medium">
          {quote}
        </Typography>
        <div className={styles.Column}>
          <CoachAvatar
            photo={photo}
            name={name}
            level={level}
            variant="micro"
          />
          <Typography weight="demiBold" className={styles.Name}>
            {name}
          </Typography>
          <Typography className={styles.Subtitle}>{title}</Typography>
        </div>
      </div>
    </div>
  );
}
