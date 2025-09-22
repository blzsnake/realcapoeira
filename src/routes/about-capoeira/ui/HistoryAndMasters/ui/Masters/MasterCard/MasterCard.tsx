import { Typography } from '~shared/ui/typography';
import Brazil from '~app/assets/masters/Brazil.png';
import styles from './MasterCard.module.css';

export function MasterCard({
  image,
  title,
  subtitle,
}: {
  image: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className={styles.MasterCard}>
      <div className={styles.ImageContainer}>
        <img src={image} className={styles.Image} alt={title} />
        <img src={Brazil} className={styles.Brazil} alt="Флаг" />
      </div>
      <div className={styles.TextContainer}>
        <Typography
          color="white"
          className={styles.Title}
          component="h3"
          weight="demiBold"
        >
          {title}
        </Typography>
        <Typography color="white" className={styles.Subtitle}>
          {subtitle}
        </Typography>
      </div>
    </div>
  );
}
